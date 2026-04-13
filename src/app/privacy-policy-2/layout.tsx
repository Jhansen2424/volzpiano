import type { Metadata } from "next";

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "Privacy policy for Volz Method Piano Lessons. Learn how we collect, use, and protect your personal data.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy-policy-2" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${TITLE} | Volz Method Piano Lessons`,
    description: DESCRIPTION,
    url: "/privacy-policy-2",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
