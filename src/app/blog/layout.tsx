import type { Metadata } from "next";

const TITLE = "Blog";
const DESCRIPTION =
  "Tips, insights, and guides for parents navigating their child's piano journey. Expert advice from Volz Piano instructors on practice, motivation, methods, and more.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `${TITLE} | Volz Method Piano Lessons`,
    description: DESCRIPTION,
    url: "/blog",
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
