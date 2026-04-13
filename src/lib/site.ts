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
  "https://volzpiano.com";
