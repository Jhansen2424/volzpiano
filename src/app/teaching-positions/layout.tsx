import type { Metadata } from "next";
import { OFFICE_JOBS, TEACHER_JOBS } from "@/lib/jobs";
import { OG_IMAGES } from "@/lib/site";

const TITLE = "Teaching Positions";

/** "A", "A and B", "A, B and C". */
function joinList(items: string[]): string {
  return items.length <= 2
    ? items.join(" and ")
    : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

// Built from the openings so it can't go stale when one is added or filled.
const teacherCities = joinList(TEACHER_JOBS.map((j) => j.city));
const DESCRIPTION = [
  TEACHER_JOBS.length > 0
    ? `Now hiring in-home piano teachers in ${teacherCities}, Utah. Paid training, no teaching experience needed.`
    : "Teach piano in Utah with the Volz Method. Paid training, no teaching experience needed.",
  OFFICE_JOBS.length > 0 ? "Plus a remote customer service and admin role." : "",
]
  .filter(Boolean)
  .join(" ");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/teaching-positions" },
  openGraph: {
    title: `${TITLE} | Volz Method Piano Lessons`,
    description: DESCRIPTION,
    url: "/teaching-positions",
    type: "website",
    images: OG_IMAGES,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
