import type { Metadata } from "next";

const TITLE = "Thank You";
const DESCRIPTION =
  "Your free consultation with Volz Method Piano Lessons is confirmed. Here's what to expect next.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/thank-you" },
  // Confirmation page — don't index in search results.
  robots: { index: false, follow: true },
  openGraph: {
    title: `${TITLE} | Volz Method Piano Lessons`,
    description: DESCRIPTION,
    url: "/thank-you",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
