import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { serializeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Volz Method Piano Lessons | In-Home Piano Lessons in Utah",
    template: "%s | Volz Method Piano Lessons",
  },
  description:
    "In-home piano lessons across Utah and Idaho. Our teachers drive to your house. The Volz Method tailors every lesson to how your child naturally learns — reading, composing, hearing, and arranging. Lessons $29–$52 per half hour.",
  applicationName: "Volz Method Piano Lessons",
  authors: [{ name: "Volz Method Piano Lessons" }],
  generator: "Next.js",
  keywords: [
    "in-home piano lessons",
    "piano lessons Utah",
    "piano lessons Salt Lake County",
    "piano lessons Utah County",
    "kids piano lessons",
    "piano teacher comes to you",
    "Volz Method",
    "mobile piano lessons",
    "private piano lessons",
    "Utah Fits All Scholarship piano",
  ],
  category: "Education",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Volz Method Piano Lessons",
    title: "Volz Method Piano Lessons | In-Home Piano Lessons in Utah",
    description:
      "In-home piano lessons across Utah and Idaho. Our teachers drive to your house. The Volz Method meets every child where they are.",
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Volz Method Piano Lessons — in-home piano lessons in Utah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Volz Method Piano Lessons | In-Home Piano Lessons in Utah",
    description:
      "In-home piano lessons across Utah and Idaho. The Volz Method teaches the music your child wants to play.",
    images: ["/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": ["MusicSchool", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: "Volz Method Piano Lessons",
    alternateName: "Volz Piano",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    image: `${SITE_URL}/hero-bg.jpg`,
    description:
      "In-home piano lessons across Utah and Idaho. The Volz Method tailors every lesson to how each child naturally learns — reading, composing, hearing, and arranging.",
    areaServed: [
      { "@type": "State", name: "Utah" },
      { "@type": "State", name: "Idaho" },
      { "@type": "AdministrativeArea", name: "Salt Lake County" },
      { "@type": "AdministrativeArea", name: "Utah County" },
    ],
    serviceType: "In-home piano lessons",
    priceRange: "$29–$52 per half hour",
    makesOffer: {
      "@type": "Offer",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: "29",
        maxPrice: "52",
        priceCurrency: "USD",
        unitText: "per half hour",
      },
      description:
        "In-home piano lesson, half hour. Multi-student discounts available.",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      ratingCount: "134",
    },
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
