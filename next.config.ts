import type { NextConfig } from "next";
import { nextRedirects } from "./src/lib/redirects";

// Content Security Policy. We allow:
//   - 'unsafe-inline' on style-src because Tailwind 4 + Next.js inject inline styles
//   - 'unsafe-inline' on script-src because Next.js bootstraps with inline scripts
//     (an alternative is per-page nonces, but that requires server components only)
//   - calendly.com for the inline scheduling widget
//   - youtube.com for the testimonial video iframes
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com https://app.mymusicstaff.com https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://assets.calendly.com https://fonts.googleapis.com https://app.mymusicstaff.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com https://assets.calendly.com https://app.mymusicstaff.com",
  "frame-src 'self' https://calendly.com https://www.youtube.com https://www.youtube-nocookie.com https://app.mymusicstaff.com https://td.doubleclick.net",
  "connect-src 'self' https://calendly.com https://api.groq.com https://app.mymusicstaff.com https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://www.google.com https://td.doubleclick.net",
  "media-src 'self' https://www.youtube.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://calendly.com https://app.mymusicstaff.com",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // Every legacy page and blog URL is still served by a real route at its exact
  // slug (enforced by src/__tests__/legacy-url-coverage.test.tsx). The
  // redirects cover only URLs with nothing left to serve: old WordPress/Wix
  // city pages, job posts and offer pages, plus blog posts folded into a
  // landing page. See src/lib/redirects.ts.
  async redirects() {
    return nextRedirects();
  },
};

export default nextConfig;
