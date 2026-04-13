import type { Metadata } from "next";
import { serializeJsonLd } from "@/lib/json-ld";

const TITLE = "What Is the Best Age to Start Piano Lessons?";
const DESCRIPTION =
  "Ages 5–9 are the sweet spot for starting piano lessons, but readiness matters more than age. A practical guide for parents on when to begin.";
const SLUG = "best-age-to-start-piano-lessons";
const CANONICAL = `/${SLUG}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  author: {
    "@type": "Organization",
    name: "Volz Method Piano Lessons",
    url: "https://volzpiano.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Volz Method Piano Lessons",
    url: "https://volzpiano.com",
    logo: {
      "@type": "ImageObject",
      url: "https://volzpiano.com/icon.svg",
    },
  },
  mainEntityOfPage: `https://volzpiano.com${CANONICAL}`,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />
      {children}
    </>
  );
}
