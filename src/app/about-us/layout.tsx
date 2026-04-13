import type { Metadata } from "next";

const TITLE = "About Us";
const DESCRIPTION =
  "About Volz Method Piano Lessons — in-home piano teachers serving Utah and Idaho families with the four-pillar Volz Method.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: `${TITLE} | Volz Method Piano Lessons`,
    description: DESCRIPTION,
    url: "/about-us",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
