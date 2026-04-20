import type { Metadata } from "next";

const TITLE = "Teaching Positions";
const DESCRIPTION =
  "Now hiring in-home piano teachers in Sandy, Draper, Cottonwood Heights, and Midvale. $35–$45/hour while teaching. Apply to teach with the Volz Method.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/teaching-positions" },
  openGraph: {
    title: `${TITLE} | Volz Method Piano Lessons`,
    description: DESCRIPTION,
    url: "/teaching-positions",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
