import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog | Volz Method Piano Lessons",
  description: "Tips, insights, and guides for parents navigating their child's piano journey. Expert advice from Volz Piano instructors.",
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
