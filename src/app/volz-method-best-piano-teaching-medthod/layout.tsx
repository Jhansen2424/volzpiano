import type { Metadata } from "next";

const TITLE = "The Volz Method";
const DESCRIPTION =
  "The Volz Method is a personalized piano teaching approach built on four pillars: Reading, Composing, Hearing, and Arranging. Each lesson is tailored to how your child naturally learns.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/volz-method-best-piano-teaching-medthod" },
  openGraph: {
    title: `${TITLE} | Piano Teaching Method for Kids`,
    description: DESCRIPTION,
    url: "/volz-method-best-piano-teaching-medthod",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Piano Teaching Method for Kids`,
    description: DESCRIPTION,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
