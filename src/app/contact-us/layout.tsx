import type { Metadata } from "next";

const TITLE = "Contact Us";
const DESCRIPTION =
  "Get in touch with Volz Method Piano Lessons. Schedule a free 15-minute phone consultation to ask questions and get an exact price for your area.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: `${TITLE} | Volz Method Piano Lessons`,
    description: DESCRIPTION,
    url: "/contact-us",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
