/**
 * Post-build prerender step.
 *
 * Spins up a tiny static server (with SPA fallback) over the freshly built
 * `dist/` directory, then drives Puppeteer through every known route, waits
 * for the DOM and head to settle, and writes the rendered HTML back into
 * `dist/<route>/index.html`.
 *
 * Vercel's filesystem priority means it serves the prerendered file for that
 * exact path, so non-JS crawlers (LLM bots, social-media unfurlers, basic
 * search bots) see real content, real titles, real OG tags, and real JSON-LD.
 *
 * Real users still get React on top — `vercel.json`'s rewrite is now only the
 * fallback for paths we didn't prerender.
 */

import { createReadStream, existsSync, statSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { homedir } from "node:os";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  Browser,
  computeExecutablePath,
  detectBrowserPlatform,
  install,
  resolveBuildId,
} from "@puppeteer/browsers";
import puppeteer from "puppeteer-core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = join(ROOT, "dist");
const PORT = 4317; // arbitrary; avoids the dev server on 3002
const ORIGIN = `http://127.0.0.1:${PORT}`;
const SETTLE_MS = 1500; // give Motion animations time to complete

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

/**
 * Resolves the Chrome executable + launch args to use.
 *
 * On Vercel (or any serverless build env where VERCEL is set), Vercel's build
 * sandbox is missing GUI system libs that vanilla Chrome needs (libnspr4 etc).
 * @sparticuz/chromium ships a Chromium binary with those libs bundled — it's
 * the standard fix for this exact scenario.
 *
 * Locally, prefer system Chrome (fast, zero install). If none, fall back to
 * downloading a stable Chrome via @puppeteer/browsers.
 *
 * Returns { executablePath, args, headless }.
 */
async function resolveBrowser() {
  const baseArgs = ["--no-sandbox", "--disable-setuid-sandbox"];

  // Serverless / CI build env — use the bundled Sparticuz binary
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const { default: chromium } = await import("@sparticuz/chromium");
    return {
      executablePath: await chromium.executablePath(),
      args: [...chromium.args, ...baseArgs],
      headless: chromium.headless,
    };
  }

  // Honor explicit override (handy for debugging)
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return {
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      args: baseArgs,
      headless: true,
    };
  }

  // Local dev — prefer system Chrome
  const systemCandidates = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
  ];
  for (const p of systemCandidates) {
    if (existsSync(p)) {
      return { executablePath: p, args: baseArgs, headless: true };
    }
  }

  // Last resort — download Chrome via @puppeteer/browsers
  const cacheDir =
    process.env.PUPPETEER_CACHE_DIR ?? join(homedir(), ".cache", "puppeteer");
  const platform = detectBrowserPlatform();
  if (!platform) {
    throw new Error("Could not detect browser platform for puppeteer");
  }
  const buildId = await resolveBuildId(Browser.CHROME, platform, "stable");
  const expectedPath = computeExecutablePath({
    browser: Browser.CHROME,
    buildId,
    cacheDir,
  });
  if (!existsSync(expectedPath)) {
    console.log(`Chrome not found locally — installing ${buildId} to ${cacheDir}`);
    await install({ browser: Browser.CHROME, buildId, cacheDir });
  }
  return { executablePath: expectedPath, args: baseArgs, headless: true };
}

function startStaticServer() {
  const server = createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    const candidates = [
      join(DIST, urlPath),
      join(DIST, urlPath, "index.html"),
    ];
    for (const filePath of candidates) {
      try {
        const st = statSync(filePath);
        if (st.isFile()) {
          const ext = extname(filePath).toLowerCase();
          res.writeHead(200, {
            "Content-Type": MIME[ext] || "application/octet-stream",
          });
          createReadStream(filePath).pipe(res);
          return;
        }
      } catch {
        // not found, try next candidate
      }
    }
    // SPA fallback — let React Router handle the path
    res.writeHead(200, { "Content-Type": MIME[".html"] });
    createReadStream(join(DIST, "index.html")).pipe(res);
  });

  return new Promise((resolveServer, rejectServer) => {
    server.once("error", rejectServer);
    server.listen(PORT, "127.0.0.1", () => resolveServer(server));
  });
}

async function deriveRoutes() {
  const constantsPath = join(ROOT, "src/constants.ts");
  const src = await readFile(constantsPath, "utf8");
  const slugs = [...src.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
  if (slugs.length === 0) {
    throw new Error("Could not parse any resort slugs from src/constants.ts");
  }
  return [
    "/",
    "/rankings",
    "/report",
    ...slugs.map((s) => `/resort/${s}`),
    "/404", // any path the catch-all handles
  ];
}

function outputPathFor(route) {
  if (route === "/") return join(DIST, "index.html");
  return join(DIST, route.replace(/^\//, ""), "index.html");
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(30000);

  // Quiet the console unless something errors
  page.on("pageerror", (err) => {
    console.error(`  ! page error on ${route}:`, err.message);
  });

  try {
    await page.goto(ORIGIN + route, { waitUntil: "networkidle2" });
    // Wait for the React tree to settle and Motion's initial animations to finish.
    await page.evaluate(
      (ms) => new Promise((r) => setTimeout(r, ms)),
      SETTLE_MS,
    );
    // Sanity check: the body shouldn't be empty
    const bodySize = await page.evaluate(() => document.body.innerText.length);
    if (bodySize < 50) {
      throw new Error(`Body looks empty (${bodySize} chars) — render likely failed`);
    }
    const html = await page.content();
    const outPath = outputPathFor(route);
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, html, "utf8");
    return { route, outPath, bodySize };
  } finally {
    await page.close();
  }
}

async function main() {
  const routes = await deriveRoutes();
  console.log(`\nPrerendering ${routes.length} routes:`);
  for (const r of routes) console.log(`  - ${r}`);

  const server = await startStaticServer();
  console.log(`\nStatic server listening at ${ORIGIN}`);

  const launchOpts = await resolveBrowser();
  console.log(`Using Chrome at: ${launchOpts.executablePath}`);
  const browser = await puppeteer.launch(launchOpts);

  let failed = 0;
  try {
    for (const route of routes) {
      try {
        const { outPath, bodySize } = await prerenderRoute(browser, route);
        const rel = outPath.replace(ROOT + "/", "");
        console.log(`  ✓ ${route.padEnd(38)} → ${rel} (${bodySize} chars)`);
      } catch (err) {
        failed++;
        console.error(`  ✗ ${route} — ${err.message}`);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  if (failed > 0) {
    console.error(`\nPrerender finished with ${failed} failure(s).`);
    process.exit(1);
  }
  console.log(`\nPrerender complete: ${routes.length} routes written.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
