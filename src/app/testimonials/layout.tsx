import type { Metadata } from "next";

const TITLE = "Testimonials";
const DESCRIPTION =
  "Read what parents and students say about their experience with Volz Method in-home piano lessons across Utah and Idaho. 5.0-star Google rating.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/testimonials" },
  openGraph: {
    title: `${TITLE} | Volz Method Piano Lessons`,
    description: DESCRIPTION,
    url: "/testimonials",
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
