import type { NextConfig } from "next";

// Content Security Policy. We allow:
//   - 'unsafe-inline' on style-src because Tailwind 4 + Next.js inject inline styles
//   - 'unsafe-inline' on script-src because Next.js bootstraps with inline scripts
//     (an alternative is per-page nonces, but that requires server components only)
//   - calendly.com for the inline scheduling widget
//   - youtube.com for the testimonial video iframes
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com https://app.mymusicstaff.com",
  "style-src 'self' 'unsafe-inline' https://assets.calendly.com https://fonts.googleapis.com https://app.mymusicstaff.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com https://assets.calendly.com https://app.mymusicstaff.com",
  "frame-src 'self' https://calendly.com https://www.youtube.com https://www.youtube-nocookie.com https://app.mymusicstaff.com",
  "connect-src 'self' https://calendly.com https://api.groq.com https://app.mymusicstaff.com",
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
  // No redirects: every legacy URL from the old WordPress site is now served
  // by a real route at the same exact slug. Slug parity is enforced by
  // src/__tests__/legacy-url-coverage.test.tsx.
};

export default nextConfig;
