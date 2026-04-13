import type { Metadata } from "next";

const TITLE = "Teaching Positions";
const DESCRIPTION =
  "Apply to teach piano with the Volz Method in Utah or Idaho. We hire and train teachers in each geographic area we serve.";

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
