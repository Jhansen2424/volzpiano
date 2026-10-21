import Link from "next/link";
import { SERVICE_AREAS } from "@/lib/areas";
import { RATING, REVIEW_COUNT } from "@/lib/site";

const LESSON_TYPES = [
  { href: "/preschool-piano-lessons", label: "Preschoolers (ages 3–5)" },
  { href: "/homeschool-piano-lessons-utah", label: "Homeschool families" },
  { href: "/piano-lessons-special-needs", label: "Kids with special needs" },
  { href: "/utah-fits-all-piano-lessons", label: "Utah Fits All Scholarship" },
];

/**
 * The homepage's hub for in-home lessons: the counties served, the price and
 * the proof, with links down to each area and lesson-type page. This is what
 * makes the homepage the main page for "in-home piano lessons Utah" and passes
 * internal links to the landing pages.
 */
export default function ServiceAreasSection() {
  return (
    <section aria-labelledby="areas-heading" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="areas-heading" className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
            In-home piano lessons across Utah
          </h2>
          <p className="mt-5 text-lg text-zinc-700">
            Our teachers drive to homes in Salt Lake, Utah and Davis counties. Lessons are $29–$52 per half hour,
            month-to-month, and rated {RATING} stars across {REVIEW_COUNT} Google reviews.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICE_AREAS.map((area) => (
            <li key={area.slug}>
              <Link
                href={`/${area.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-[#efe6d8] bg-white p-7 shadow-warm transition-all hover:-translate-y-0.5 hover:shadow-warm-lg"
              >
                <span className="text-xl font-bold text-zinc-900">{area.county}</span>
                <span className="mt-2 flex-1 text-zinc-600">
                  {area.zones
                    .flatMap((z) => z.cities)
                    .slice(0, 5)
                    .join(", ")}{" "}
                  and more
                </span>
                <span className="mt-5 font-semibold text-brand-ink underline underline-offset-2 group-hover:no-underline">
                  Piano lessons in {area.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <p className="font-semibold text-zinc-900">Lessons for every kind of learner</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-3">
            {LESSON_TYPES.map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="inline-block rounded-full border border-zinc-300 bg-white px-5 py-2 text-sm font-semibold text-zinc-800 transition-colors hover:border-accent hover:text-accent"
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link href="/areas-we-serve" className="font-semibold text-brand-ink underline underline-offset-2 hover:no-underline">
              See every city we serve
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
