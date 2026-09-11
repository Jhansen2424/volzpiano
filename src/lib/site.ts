/**
 * Single source of truth for the canonical site URL. Reads from
 * `NEXT_PUBLIC_SITE_URL` so preview deployments can override it without
 * accidentally leaking the production URL into canonical/OG tags.
 *
 * Falls back to the production URL so the site still works without env vars
 * in dev / CI.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.volzpiano.com";

/**
 * Default Open Graph / Twitter preview image.
 *
 * Next.js does not deep-merge `openGraph`: a page declaring its own
 * `openGraph` block replaces the root layout's entirely, and the site default
 * image goes with it. Every page that sets `openGraph` has to spread this in,
 * or its link previews render with no image at all.
 *
 * Purpose-built at the 1.91:1 ratio the platforms crop to (70 KB). The
 * previous default was the full-resolution `hero-bg.jpg` — 7008x4672 and
 * 10.4 MB, past Facebook's 8 MB and X's 5 MB ceilings, so those platforms
 * showed no card at all. OG images are fetched raw by the scrapers and never
 * go through next/image, so the source file size is what counts here.
 */
export const OG_IMAGE = {
  url: "/og-card.jpg",
  width: 1200,
  height: 630,
  alt: "Volz Method Piano Lessons — in-home piano lessons in Utah",
} as const;

/** Spread into a page's `openGraph.images` to keep the default preview card. */
export const OG_IMAGES = [OG_IMAGE];

/**
 * Google Business Profile rating, quoted both in the LocalBusiness JSON-LD and
 * in visible copy on the landing pages. Kept here because those two used to
 * hold their own hardcoded copies — the structured data claiming one number
 * while the page on screen claimed another is exactly the kind of mismatch
 * that gets structured data ignored. Update in this one place.
 *
 * Note that Google does not render star snippets from a business's own
 * AggregateRating markup for LocalBusiness — the stars shown in search come
 * from the Business Profile itself. This markup is for entity understanding,
 * not for rich results.
 */
export const RATING = "5.0";
export const REVIEW_COUNT = "134";

/**
 * GA4 measurement ID, e.g. "G-ABC1234567".
 *
 * The site already loads gtag.js for Google Ads (AW-755139969) but has never
 * had an analytics property attached, so there is no record of which pages or
 * queries bring people in. Setting `NEXT_PUBLIC_GA_ID` in Vercel adds a second
 * `gtag('config', ...)` to the tag that is already on every page — no extra
 * request, and the CSP already allows google-analytics.com. Unset, this is
 * `null` and nothing is emitted.
 *
 * The value is interpolated into an inline script, so it is format-checked
 * rather than trusted: anything that is not a well-formed measurement ID is
 * ignored instead of being written into the page.
 */
const rawGaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
export const GA_ID =
  rawGaId && /^G-[A-Z0-9]{4,20}$/.test(rawGaId) ? rawGaId : null;
