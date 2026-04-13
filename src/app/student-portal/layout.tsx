import type { Metadata } from "next";

const TITLE = "Student Portal";
const DESCRIPTION =
  "Access your lesson materials, track progress, and stay connected with your Volz Piano instructor.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/student-portal" },
  robots: { index: false, follow: true },
  openGraph: {
    title: `${TITLE} | Volz Method Piano Lessons`,
    description: DESCRIPTION,
    url: "/student-portal",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
