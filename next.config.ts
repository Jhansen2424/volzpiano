import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/volz-method-best-piano-teaching-medthod",
        destination: "/volz-method",
        permanent: true,
      },
      {
        source: "/volz-method-best-piano-teaching-medthod/:path*",
        destination: "/volz-method/:path*",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/volz-method/how-it-works",
        permanent: true,
      },
      {
        source: "/core-values",
        destination: "/volz-method/core-values",
        permanent: true,
      },
      {
        source: "/digital-piano",
        destination: "/digital-piano-deal",
        permanent: true,
      },
      {
        source: "/privacy-policy-2",
        destination: "/privacy-policy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
