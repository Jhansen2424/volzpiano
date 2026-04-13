import type { Metadata } from "next";

const TITLE = "Shop";
const DESCRIPTION =
  "Shop our recommended digital pianos and accessories for Volz Method students. Curated by our teachers for at-home practice.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/shop" },
  openGraph: {
    title: `${TITLE} | Volz Method Piano Lessons`,
    description: DESCRIPTION,
    url: "/shop",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
