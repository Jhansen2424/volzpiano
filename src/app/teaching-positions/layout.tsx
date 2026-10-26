import type { Metadata } from "next";
import { OG_IMAGES } from "@/lib/site";

const TITLE = "Teaching Positions";
const DESCRIPTION =
  "Now hiring an in-home piano teacher for Eagle Mountain, Saratoga Springs, Lehi, and Cedar Fort. $35–$50/hour while teaching. Apply to teach with the Volz Method.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/teaching-positions" },
  openGraph: {
    title: `${TITLE} | Volz Method Piano Lessons`,
    description: DESCRIPTION,
    url: "/teaching-positions",
    type: "website",
    images: OG_IMAGES,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
