import type { Metadata } from "next";

const TITLE = "Cart";
const DESCRIPTION =
  "Your shopping cart for Volz Piano recommendations.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/cart" },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
