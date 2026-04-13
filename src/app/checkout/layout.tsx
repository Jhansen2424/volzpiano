import type { Metadata } from "next";

const TITLE = "Checkout";
const DESCRIPTION = "Checkout for Volz Piano recommendations.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
