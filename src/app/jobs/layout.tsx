import type { Metadata } from "next";

const TITLE = "Jobs at Volz Piano";
const DESCRIPTION =
  "Interested in teaching piano with the Volz Method in Utah or Idaho? Reach out and we'll let you know when openings are available.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/jobs" },
  openGraph: {
    title: `${TITLE} | Volz Method Piano Lessons`,
    description: DESCRIPTION,
    url: "/jobs",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
