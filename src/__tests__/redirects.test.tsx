/**
 * Guards the permanent redirects in src/lib/redirects.ts (wired up in
 * next.config.ts).
 *
 * Next.js runs redirects before it looks at pages, so a redirect whose source
 * matches a live route would silently replace that page. These tests make sure
 * every redirect points at a real page, never shadows one, and that posts folded
 * into a landing page drop out of the blog listings.
 */
import fs from "fs";
import path from "path";
import csvPosts from "@/content/blog-posts.json";
import extraPosts from "@/content/blog-posts-extra.json";
import { getPublishedPosts } from "@/lib/blog";
import {
  CONSOLIDATED_POST_REDIRECTS,
  LEGACY_CITY_REDIRECTS,
  LEGACY_PAGE_REDIRECTS,
  nextRedirects,
} from "@/lib/redirects";

const APP_DIR = path.join(process.cwd(), "src", "app");

function routeExists(urlPath: string): boolean {
  if (urlPath === "/") return fs.existsSync(path.join(APP_DIR, "page.tsx"));
  return fs.existsSync(path.join(APP_DIR, urlPath.replace(/^\//, ""), "page.tsx"));
}

const allPostSlugs = new Set(
  [...(csvPosts as { slug: string }[]), ...(extraPosts as { slug: string }[])].map((p) => p.slug)
);

describe("permanent redirects", () => {
  const redirects = nextRedirects();

  it("are all permanent and point at a page that exists", () => {
    for (const r of redirects) {
      expect(r.permanent).toBe(true);
      expect({ source: r.source, ok: routeExists(r.destination) }).toEqual({ source: r.source, ok: true });
    }
  });

  it("never shadow a live page route", () => {
    for (const r of redirects) {
      if (r.source.includes(":")) continue; // pattern sources (/job/:path*) have no page dir
      expect({ source: r.source, shadows: routeExists(r.source) }).toEqual({ source: r.source, shadows: false });
    }
  });

  it("only shadow blog posts that were deliberately consolidated", () => {
    const consolidated = new Set(Object.keys(CONSOLIDATED_POST_REDIRECTS));
    const legacy = [...Object.keys(LEGACY_CITY_REDIRECTS), ...Object.keys(LEGACY_PAGE_REDIRECTS)];
    for (const slug of legacy) expect({ slug, isPost: allPostSlugs.has(slug) }).toEqual({ slug, isPost: false });
    for (const slug of consolidated) expect({ slug, isPost: allPostSlugs.has(slug) }).toEqual({ slug, isPost: true });
  });

  it("cover all 23 legacy WordPress city pages", () => {
    expect(Object.keys(LEGACY_CITY_REDIRECTS)).toHaveLength(23);
  });

  it("hide consolidated posts from the blog index and related posts", () => {
    const listed = new Set(getPublishedPosts().map((p) => p.slug));
    for (const slug of Object.keys(CONSOLIDATED_POST_REDIRECTS)) {
      expect({ slug, listed: listed.has(slug) }).toEqual({ slug, listed: false });
    }
  });
});
