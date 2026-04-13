import type { Metadata } from "next";

const TITLE = "My Account";
const DESCRIPTION =
  "Sign in to your Volz Piano student portal to access lesson materials and track progress.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/my-account" },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
