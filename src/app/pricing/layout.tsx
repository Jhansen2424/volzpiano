import type { Metadata } from "next";
import { serializeJsonLd } from "@/lib/json-ld";
import { SITE_URL, OG_IMAGES } from "@/lib/site";
import { SERVICE_AREAS } from "@/lib/areas";
const TITLE = "How It Works & Pricing";
const DESCRIPTION =
  "How Volz Method in-home piano lessons work and what they cost: $29–$52 per half hour, multi-student discounts, and no long-term contract.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: `${TITLE} | Volz Method Piano Lessons`,
    description: DESCRIPTION,
    url: "/pricing",
    type: "article",
    images: OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Volz Method Piano Lessons`,
    description: DESCRIPTION,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much is a 30-minute piano lesson?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 30-minute Volz Method lesson in your home costs $29–$52, depending on your city and how many students are in your home. Families with more than one student get a multi-student discount.",
      },
    },
    {
      "@type": "Question",
      name: "Are 30-minute piano lessons worth it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most kids, yes. A focused, engaging 30-minute lesson beats a 60-minute session that loses a child halfway through, and every Volz Method lesson ends with a practice plan for the week.",
      },
    },
    {
      "@type": "Question",
      name: "How much do Volz Method piano lessons cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Volz Method in-home piano lessons range from $29 to $52 per half hour, depending on your location and the number of students in your home. Multi-student discounts are available for families with more than one student.",
      },
    },
    {
      "@type": "Question",
      name: "Where do you offer in-home piano lessons?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our teachers drive to students' homes across Utah, including Salt Lake, Utah and Davis counties.",
      },
    },
    {
      "@type": "Question",
      name: "Are there any long-term contracts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Volz Method lessons are month-to-month with no long-term contracts. Only a 30-day notice is required if a family decides to stop lessons.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get started?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Schedule a free 15-minute phone consultation. We answer questions, give an accurate price quote based on your city and number of students, and if you're ready, sign your family up.",
      },
    },
    {
      "@type": "Question",
      name: "Do you accept the Utah Fits All Scholarship?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Volz Method Piano Lessons accepts the Utah Fits All Scholarship, which can help eligible families offset the cost of lessons.",
      },
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "In-home piano lessons",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: [
    { "@type": "State", name: "Utah" },
    ...SERVICE_AREAS.map((a) => ({ "@type": "AdministrativeArea", name: `${a.county}, Utah` })),
  ],
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "29",
    highPrice: "52",
    offerCount: "1",
    description: "Half-hour in-home piano lesson",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceJsonLd) }}
      />
      {children}
    </>
  );
}
