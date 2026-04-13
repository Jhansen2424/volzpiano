import type { Metadata } from "next";

const TITLE = "Our Core Values";
const DESCRIPTION =
  "The core values that guide every Volz Method piano lesson: meeting students where they are, celebrating each child's strengths, and making music joyful.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/core-values" },
  openGraph: {
    title: `${TITLE} | Volz Method Piano Lessons`,
    description: DESCRIPTION,
    url: "/core-values",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Volz Method Piano Lessons`,
    description: DESCRIPTION,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
