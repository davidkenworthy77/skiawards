import { useEffect } from "react";

export const SITE = {
  name: "The Ski Awards",
  origin: "https://www.theskiawards.com",
  defaultDescription:
    "The definitive 2026 ski and snowboard resort rankings. Independent scores for terrain, snow quality, lift efficiency, and terrain parks across the world's top 10 mountains.",
  defaultImage: "https://www.theskiawards.com/og-default.jpg",
};

interface SEOOptions {
  title: string;
  description?: string;
  /** Path beginning with "/" — used to build canonical + og:url */
  path: string;
  image?: string;
  type?: "website" | "article" | "product";
  /** Optional JSON-LD object(s) to inject under id="seo-jsonld-page" */
  jsonLd?: object | object[];
}

function upsertMeta(
  key: "name" | "property",
  value: string,
  content: string,
): void {
  const selector = `meta[${key}="${value}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(key, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: object | object[]): void {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * Updates the document head for the current route.
 * SPA-safe: runs on mount and whenever inputs change.
 */
export function useSEO(opts: SEOOptions): void {
  const {
    title,
    description = SITE.defaultDescription,
    path,
    image = SITE.defaultImage,
    type = "website",
    jsonLd,
  } = opts;

  useEffect(() => {
    const url = SITE.origin + path;

    document.title = title;

    upsertMeta("name", "description", description);
    upsertLink("canonical", url);

    // Open Graph
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:site_name", SITE.name);
    upsertMeta("property", "og:image", image);

    // Twitter
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    // Per-page JSON-LD
    if (jsonLd) {
      upsertJsonLd("seo-jsonld-page", jsonLd);
    } else {
      const existing = document.getElementById("seo-jsonld-page");
      if (existing) existing.remove();
    }
  }, [title, description, path, image, type, JSON.stringify(jsonLd)]);
}
