import type { Metadata } from "next";

const TITLE = "Schedule a Call to Enroll";
const DESCRIPTION =
  "Schedule a free 15-minute consultation to enroll your child in personalized in-home piano lessons with the Volz Method in Utah and Idaho.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/schedule-call" },
  openGraph: {
    title: `${TITLE} | Volz Method Piano Lessons`,
    description: DESCRIPTION,
    url: "/schedule-call",
    type: "website",
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
