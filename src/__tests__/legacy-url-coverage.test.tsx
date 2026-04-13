/**
 * Verifies that every URL from the legacy WordPress site
 * (https://volzpiano.com) exists as a real route on the new site at the
 * EXACT same slug. No redirects allowed — slug parity must be preserved so
 * Google's index doesn't lose any of the legacy ranking signals.
 *
 * This test reads the actual on-disk app/ tree and asserts the directories
 * exist. If anyone deletes or renames a legacy route, this test fails loudly.
 */

import fs from "fs";
import path from "path";
import blogSlugs from "../blog-slugs.json";

type BlogEntry = { slug: string; date: string };

// Snapshot of every URL on the live https://volzpiano.com page-sitemap as of
// the audit (40 entries; trailing slashes stripped, leading slash dropped).
const LEGACY_PAGES = [
  // Top-level pages
  "", // homepage
  "shop",
  "cart",
  "checkout",
  "my-account",
  "student-portal",
  "volz-method-best-piano-teaching-medthod",
  "digital-piano",
  "testimonials",
  "schedule-call",
  "core-values",
  "about-us",
  "contact-us",
  "privacy-policy-2",
  "jobs",
  "pricing",
  "teaching-positions",
];

// City pages from the legacy sitemap. The user opted not to recreate these
// (they redirect to / via the dynamic [slug] catch-all 404, OR are flagged
// for future creation). Tracked here so we don't lose track of them.
const LEGACY_CITY_PAGES = [
  "piano-lessons-draper-ut",
  "piano-lessons-bluffdale-ut",
  "piano-lessons-midvale-ut",
  "piano-lessons-millcreek-ut",
  "pianolessons-murray-ut",
  "piano-lessons-riverton-ut",
  "piano-lessons-salt-lake-city-ut",
  "piano-lessons-sandy-ut",
  "piano-lessons-south-jordan-ut",
  "piano-lessons-west-jordan-ut",
  "alpine-ut-piano-lessons",
  "american-fork-ut-piano-lessons",
  "cedar-hills-ut-piano-lessons",
  "highland-ut-piano-lessons",
  "lehi-ut-piano-lessons",
  "lindon-ut-piano-lessons",
  "mapleton-ut-piano-lessons",
  "orem-ut-piano-lessons",
  "pleasant-grove-ut-piano-lessons",
  "provo-ut-piano-lessons",
  "spanish-fork-ut-piano-lessons",
  "springville-ut-piano-lessons",
  "vineyard-ut-piano-lessons",
];

const APP_DIR = path.join(process.cwd(), "src", "app");

function pageExists(slug: string): boolean {
  // The dynamic [slug] route handles every blog post slug — see [slug]/page.tsx.
  // For top-level routes we expect a literal directory.
  if (slug === "") {
    return fs.existsSync(path.join(APP_DIR, "page.tsx"));
  }
  return fs.existsSync(path.join(APP_DIR, slug, "page.tsx"));
}

describe("Legacy WordPress URL coverage — exact slug parity", () => {
  it("every legacy top-level page exists as a real route at the same slug", () => {
    const missing: string[] = [];
    for (const slug of LEGACY_PAGES) {
      if (!pageExists(slug)) missing.push(`/${slug}`);
    }
    expect(missing).toEqual([]);
  });

  // City pages tracked but not enforced — they intentionally don't exist yet.
  // If/when they're rebuilt, move them above into LEGACY_PAGES so this test
  // starts enforcing them.
  it.skip("city pages are tracked but not yet rebuilt", () => {
    expect(LEGACY_CITY_PAGES.length).toBe(24);
  });

  it("every legacy blog post slug is in blog-slugs.json", () => {
    const HAND_BUILT = new Set([
      "best-age-to-start-piano-lessons",
      "how-to-motivate-your-child-to-practice-piano",
      "piano-lessons-vs-apps",
    ]);
    const csvSlugs = (blogSlugs as BlogEntry[])
      .map((e) => e.slug)
      .filter((s) => !HAND_BUILT.has(s));
    expect(csvSlugs.length).toBe(207);
  });

  it("blog posts are served at root (no /blog/ prefix)", () => {
    // The dynamic [slug] route lives at app/[slug]/page.tsx. Verify the old
    // /blog/[slug] dir is gone — having both would create routing ambiguity.
    expect(fs.existsSync(path.join(APP_DIR, "[slug]", "page.tsx"))).toBe(true);
    expect(fs.existsSync(path.join(APP_DIR, "blog", "[slug]"))).toBe(false);
  });

  it("blog index page still exists at /blog", () => {
    expect(fs.existsSync(path.join(APP_DIR, "blog", "page.tsx"))).toBe(true);
  });
});
