import type { Metadata } from "next";
import { serializeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";
const TITLE = "Digital Piano Deal";
const DESCRIPTION =
  "Get the recommended digital piano setup for your child's lessons. Budget and upgraded options curated by Volz Piano teachers — fully weighted keys, sustain pedal, stand, and bench.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/digital-piano" },
  openGraph: {
    title: `${TITLE} | Volz Method Piano Lessons`,
    description: DESCRIPTION,
    url: "/digital-piano",
    type: "website",
    images: ["/digital-piano/piano-cheapest.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Volz Method Piano Lessons`,
    description: DESCRIPTION,
    images: ["/digital-piano/piano-cheapest.png"],
  },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Recommended Digital Pianos and Accessories",
  description:
    "Volz Method's recommended digital piano setups for at-home practice — fully weighted keys with sustain pedal, stand, and bench.",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "Digital Piano (with Sustain Pedal)",
        description:
          "Fully weighted keys with a sustain pedal — the must-have feature for proper piano technique.",
        image: `${SITE_URL}/digital-piano/piano-cheapest.png`,
        url: "https://amzn.to/3R0egZT",
        category: "Musical Instrument",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "X Stand",
        description:
          "Affordable, adjustable stand that holds the piano at the perfect height.",
        image: `${SITE_URL}/digital-piano/x-stand.png`,
        url: "https://amzn.to/4aGILva",
        category: "Musical Instrument Accessory",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Product",
        name: "Padded Piano Bench",
        description:
          "Inexpensive padded bench for comfortable practice sessions.",
        image: `${SITE_URL}/digital-piano/bench-cheapest.png`,
        url: "https://amzn.to/4axe63d",
        category: "Musical Instrument Accessory",
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Product",
        name: "Digital Piano with Built-in Legs",
        description:
          "The same piano as the cheapest option, but with built-in legs — looks nicer and more stable.",
        image: `${SITE_URL}/digital-piano/piano-upgraded.png`,
        url: "https://amzn.to/3yu89Xj",
        category: "Musical Instrument",
      },
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListJsonLd) }}
      />
      {children}
    </>
  );
}
