import type { Metadata } from "next";
import { OG_IMAGES } from "@/lib/site";

// The page itself says "We don't sell instruments directly — we point you to
// the exact gear our teachers recommend". The old title and description
// promised a storefront, so anyone arriving from search hit an immediate
// mismatch. Say what the page actually does.
const TITLE = "Digital Pianos We Recommend";
const DESCRIPTION =
  "We don't sell instruments — we point you to the exact digital piano setups our teachers recommend for at-home practice, so you can buy from a trusted retailer.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/shop" },
  openGraph: {
    title: `${TITLE} | Volz Method Piano Lessons`,
    description: DESCRIPTION,
    url: "/shop",
    type: "website",
    images: OG_IMAGES,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
