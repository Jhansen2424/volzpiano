import type { Metadata } from "next";
import { serializeJsonLd } from "@/lib/json-ld";

const TITLE = "Piano Lessons vs. Piano Apps: What Actually Works for Kids?";
const DESCRIPTION =
  "An honest comparison of real piano teachers versus apps like Simply Piano and Yousician — including cost, technique, and long-term skill development.";
const SLUG = "piano-lessons-vs-apps";
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
