import type { MetadataRoute } from "next";
import blogSlugs from "../blog-slugs.json";
import { SITE_URL } from "@/lib/site";
import { getPublishedPosts } from "@/lib/blog";

type BlogEntry = { slug: string; date: string };
const blogEntries = blogSlugs as BlogEntry[];

// Re-generate the sitemap hourly so scheduled posts appear without redeploy.
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/volz-method-best-piano-teaching-medthod`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/core-values`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/schedule-call`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { url: `${SITE_URL}/testimonials`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/digital-piano`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about-us`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/contact-us`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/teaching-positions`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/jobs`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/privacy-policy-2`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Build the blog URL list from two sources:
  //   1. blog-slugs.json — every CSV-imported post + the 3 hand-built posts
  //      (those have their own static page.tsx files, not JSON entries)
  //   2. getPublishedPosts() — adds any new scheduled posts from the extras
  //      file once their publishDate has passed
  // Future-dated scheduled posts are excluded automatically because the
  // helper filters them out, and they're not in blog-slugs.json yet either.
  const dateBySlug = new Map(blogEntries.map((e) => [e.slug, e.date]));
  const publishedSlugs = new Set(getPublishedPosts(now).map((p) => p.slug));
  // Slugs we should include: union of (slugs in blog-slugs.json that are
  // either hand-built or currently published) ∪ (slugs from the helper)
  const sitemapSlugs = new Set<string>();
  for (const entry of blogEntries) {
    // Legacy slugs always go in (they're real existing pages with no
    // future-publish gating). The 3 hand-built posts have empty `date` and
    // are also always in.
    sitemapSlugs.add(entry.slug);
  }
  for (const slug of publishedSlugs) sitemapSlugs.add(slug);
  // Filter out any slugs that are in blog-slugs.json but represent
  // future-dated entries (this shouldn't happen for legacy posts, but is a
  // safety net if a slug ever appears in both with a future publishDate).
  const allPosts = getPublishedPosts(now);
  const futureSlugsFromExtras = new Set(
    allPosts
      .filter((p) => p.publishDate && new Date(p.publishDate) > now)
      .map((p) => p.slug)
  );
  for (const s of futureSlugsFromExtras) sitemapSlugs.delete(s);

  const blogRoutes: MetadataRoute.Sitemap = Array.from(sitemapSlugs).map(
    (slug) => {
      const recordedDate = dateBySlug.get(slug);
      return {
        url: `${SITE_URL}/${slug}`,
        lastModified: recordedDate ? new Date(recordedDate) : now,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      };
    }
  );

  return [...staticRoutes, ...blogRoutes];
}
