/**
 * Permanent redirects for URLs the site no longer serves.
 *
 * Two kinds:
 *
 * 1. Legacy URLs from the old WordPress and Wix sites (city pages, job posts,
 *    old offer pages). Recovered from the Wayback Machine. Without these they
 *    fell through to the [slug] catch-all and returned errors, discarding
 *    whatever links and rankings they still carried.
 *
 * 2. Blog posts consolidated into a landing page. A post that ranks for the
 *    same search as a new landing page is folded into that page and its URL
 *    redirected in, so the ranking carries over instead of two pages competing.
 *    These slugs are also hidden from the blog index, related posts and the
 *    sitemap (see src/lib/blog.ts).
 *
 * Imported by next.config.ts, so keep this file free of runtime-only imports.
 */

const SALT_LAKE = "/piano-lessons-salt-lake-county";
const UTAH_COUNTY = "/piano-lessons-utah-county";

/** Old WordPress city pages → the county page that now covers them. */
export const LEGACY_CITY_REDIRECTS: Record<string, string> = {
  "piano-lessons-draper-ut": SALT_LAKE,
  "piano-lessons-bluffdale-ut": SALT_LAKE,
  "piano-lessons-midvale-ut": SALT_LAKE,
  "piano-lessons-millcreek-ut": SALT_LAKE,
  "pianolessons-murray-ut": SALT_LAKE,
  "piano-lessons-riverton-ut": SALT_LAKE,
  "piano-lessons-salt-lake-city-ut": SALT_LAKE,
  "piano-lessons-sandy-ut": SALT_LAKE,
  "piano-lessons-south-jordan-ut": SALT_LAKE,
  "piano-lessons-west-jordan-ut": SALT_LAKE,
  "alpine-ut-piano-lessons": UTAH_COUNTY,
  "american-fork-ut-piano-lessons": UTAH_COUNTY,
  "cedar-hills-ut-piano-lessons": UTAH_COUNTY,
  "highland-ut-piano-lessons": UTAH_COUNTY,
  "lehi-ut-piano-lessons": UTAH_COUNTY,
  "lindon-ut-piano-lessons": UTAH_COUNTY,
  "mapleton-ut-piano-lessons": UTAH_COUNTY,
  "orem-ut-piano-lessons": UTAH_COUNTY,
  "pleasant-grove-ut-piano-lessons": UTAH_COUNTY,
  "provo-ut-piano-lessons": UTAH_COUNTY,
  "spanish-fork-ut-piano-lessons": UTAH_COUNTY,
  "springville-ut-piano-lessons": UTAH_COUNTY,
  "vineyard-ut-piano-lessons": UTAH_COUNTY,
};

/** Other legacy pages with a clear modern equivalent. */
export const LEGACY_PAGE_REDIRECTS: Record<string, string> = {
  "piano-lessons": "/areas-we-serve",
  "piano-lessons-sign-up": "/schedule-call",
  pianofreetrial: "/schedule-call",
  "plans-pricing": "/pricing",
  "volz-method": "/volz-method-best-piano-teaching-medthod",
  "privacy-policy": "/privacy-policy-2",
  "home-1": "/",
  "blog-1": "/blog",
  "best-way-to-learn-piano-piano-teachers-that-drive-to-you": "/areas-we-serve",
  "piano-lessons-near-me-unlock-your-childs-musical-potential-with-volz-piano": "/areas-we-serve",
  "the-ultimate-guide-to-learn-piano-for-beginners": "/blog",
};

/** Blog posts folded into a landing page (they ranked for its search). */
export const CONSOLIDATED_POST_REDIRECTS: Record<string, string> = {
  // #2 on Google for "piano teacher that comes to your house utah" (Oct 2026)
  "piano-tutor-that-comes-to-your-home-in-home-kids-piano-lessons-across-utah": "/areas-we-serve",
  // #1 on Google for "piano lessons for kids with autism utah" (Oct 2026)
  "piano-teacher-for-special-needs-students-at-home-utah-in-home-lessons-for-kids-with-the-volz-piano-method":
    "/piano-lessons-special-needs",
  // Same topic as the homeschool landing page, and its URL named Idaho
  "homeschool-piano-lessons-utah-idaho-parent-guide": "/homeschool-piano-lessons-utah",
};

/** Slugs that must not appear in blog listings or the sitemap. */
export const REDIRECTED_SLUGS = new Set<string>([
  ...Object.keys(LEGACY_CITY_REDIRECTS),
  ...Object.keys(LEGACY_PAGE_REDIRECTS),
  ...Object.keys(CONSOLIDATED_POST_REDIRECTS),
]);

/**
 * volzpiano.com/review → the Google review form for the Business Profile.
 * A short link for review requests (texts, emails, a QR code on a card).
 * Place ID found in Google's results for the business (Oct 2026); it decodes
 * to the same listing id Google's brand panel uses. Temporary (307) so it can
 * be repointed without browsers caching it.
 */
export const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJN3sKiXWaTYcRO8MW-bw9p5Y";

type NextRedirect = { source: string; destination: string; permanent: boolean };

export function nextRedirects(): NextRedirect[] {
  const single = { ...LEGACY_CITY_REDIRECTS, ...LEGACY_PAGE_REDIRECTS, ...CONSOLIDATED_POST_REDIRECTS };
  return [
    ...Object.entries(single).map(([slug, destination]) => ({
      source: `/${slug}`,
      destination,
      permanent: true as const,
    })),
    // Old WordPress job postings, e.g. /job/piano-teacher-in-layton-ut
    { source: "/job/:path*", destination: "/teaching-positions", permanent: true },
    { source: "/review", destination: GOOGLE_REVIEW_URL, permanent: false },
  ];
}
