/**
 * Generates the default Open Graph image at public/og-default.jpg.
 *
 * Renders a static HTML template at 1200×630 (standard OG dimensions) using
 * Puppeteer and screenshots it as a JPG. Re-run any time you want to tweak
 * the design or the copy:
 *
 *     node scripts/generate-og.mjs
 *
 * The output file is committed to the repo and shipped from /public, so social
 * platforms (LinkedIn, Slack, Twitter, iMessage, Facebook) will fetch it as
 * https://www.theskiawards.com/og-default.jpg without any runtime cost.
 */

import { existsSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
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
const OUT_PATH = join(ROOT, "public", "og-default.jpg");
const WIDTH = 1200;
const HEIGHT = 630;

const HTML = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html, body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    overflow: hidden;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #0a0a0a;
    color: white;
    -webkit-font-smoothing: antialiased;
  }

  .container {
    position: relative;
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    overflow: hidden;
  }

  .bg-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.4;
    transform: scale(1.05);
    filter: contrast(1.1) saturate(0.9);
  }

  .gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(110deg, #0a0a0a 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0.85) 100%);
  }

  .vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 30% 50%, transparent 0%, rgba(10,10,10,0.5) 100%);
  }

  .grain {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 3px 3px;
    mix-blend-mode: overlay;
    opacity: 0.6;
  }

  .content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 72px 88px;
  }

  .top-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .mountain {
    width: 36px;
    height: 36px;
    fill: white;
  }

  .brand {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.92);
  }

  .kicker {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    margin-bottom: 28px;
  }

  .title {
    font-size: 132px;
    font-weight: 900;
    letter-spacing: -0.045em;
    line-height: 0.92;
    color: white;
  }

  .title .gradient-text {
    background: linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.45) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 24px;
    font-weight: 400;
    color: rgba(255,255,255,0.75);
    max-width: 760px;
    margin-top: 28px;
    line-height: 1.4;
  }

  .footer-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .url {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 22px;
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 9999px;
    background: rgba(255,255,255,0.06);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.85);
  }

  .star {
    width: 12px;
    height: 12px;
    fill: #facc15;
  }
</style>
</head>
<body>
  <div class="container">
    <img class="bg-image"
         src="https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=85&w=2400&auto=format&fit=crop"
         crossorigin="anonymous" />
    <div class="gradient"></div>
    <div class="vignette"></div>
    <div class="grain"></div>

    <div class="content">
      <div class="top-row">
        <svg class="mountain" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
        </svg>
        <span class="brand">The Ski Awards</span>
      </div>

      <div>
        <p class="kicker">2026 Edition · Independent Rankings</p>
        <h1 class="title">
          Ski &amp; Snowboard<br/>
          <span class="gradient-text">Resort Rankings</span>
        </h1>
        <p class="subtitle">
          The definitive 2026 evaluation of the world's premier mountain destinations —
          terrain, snow, lifts, and parks.
        </p>
      </div>

      <div class="footer-row">
        <div class="badge">
          <svg class="star" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
          Top 10 Worldwide
        </div>
        <div class="url">theskiawards.com</div>
      </div>
    </div>
  </div>
</body>
</html>`;

async function resolveBrowser() {
  const baseArgs = ["--no-sandbox", "--disable-setuid-sandbox"];

  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return {
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      args: baseArgs,
      headless: true,
    };
  }

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

  const cacheDir =
    process.env.PUPPETEER_CACHE_DIR ?? join(homedir(), ".cache", "puppeteer");
  const platform = detectBrowserPlatform();
  if (!platform) throw new Error("Could not detect browser platform");
  const buildId = await resolveBuildId(Browser.CHROME, platform, "stable");
  const expectedPath = computeExecutablePath({
    browser: Browser.CHROME,
    buildId,
    cacheDir,
  });
  if (!existsSync(expectedPath)) {
    console.log(`Installing Chrome ${buildId} → ${cacheDir}`);
    await install({ browser: Browser.CHROME, buildId, cacheDir });
  }
  return { executablePath: expectedPath, args: baseArgs, headless: true };
}

async function main() {
  const launchOpts = await resolveBrowser();
  console.log(`Using Chrome at: ${launchOpts.executablePath}`);

  const browser = await puppeteer.launch(launchOpts);
  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: 2, // render at 2x then write at 1x for crisp output
    });
    await page.setContent(HTML, { waitUntil: "networkidle0" });
    // Give web fonts a moment to settle so the title renders correctly
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

    mkdirSync(dirname(OUT_PATH), { recursive: true });
    await page.screenshot({
      path: OUT_PATH,
      type: "jpeg",
      quality: 92,
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
    });
    console.log(`✓ wrote ${OUT_PATH.replace(ROOT + "/", "")}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
