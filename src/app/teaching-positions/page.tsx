import Link from "next/link";
import StubPage from "@/app/components/StubPage";
import { APPLY_URL, JOB_OPENINGS, payLabel } from "@/lib/jobs";
import MusicNotesHero from "./MusicNotesHero";

export default function TeachingPositionsPage() {
  return (
    <StubPage
      badge="Teaching Positions"
      title="Become a"
      highlight="Volz Piano Teacher"
      description="We hire dedicated piano teachers across Utah. Every teacher is trained for three months in the Volz Method as they begin teaching."
      primaryCta={{
        href: APPLY_URL,
        label: "Apply to Teach",
      }}
      heroBackground={<MusicNotesHero />}
      body={
        <div>
          {/* Open Positions */}
          <h2 className="mb-4 text-xl font-bold text-zinc-900">
            Open Positions
          </h2>
          {JOB_OPENINGS.length === 0 && (
            <p className="leading-relaxed text-zinc-600">
              We don&rsquo;t have any open positions right now, but we&rsquo;re
              always glad to hear from great teachers.
            </p>
          )}
          <div className="space-y-4">
            {JOB_OPENINGS.map((pos) => (
              <div
                key={pos.slug}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
                    Now Hiring
                  </span>
                  <span className="text-xs text-zinc-500">
                    Part-time
                  </span>
                </div>
                <h3 className="mb-3 text-lg font-extrabold text-zinc-900">
                  {pos.title}
                </h3>
                <dl className="space-y-2 text-sm text-zinc-600">
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-semibold text-zinc-900">Pay:</dt>
                    <dd>{payLabel(pos)}</dd>
                  </div>
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-semibold text-zinc-900">Cities:</dt>
                    <dd>{pos.cities.join(", ")}</dd>
                  </div>
                </dl>
                <Link
                  href={`/jobs/${pos.slug}`}
                  className="mt-4 inline-block text-sm font-bold text-accent underline-offset-4 hover:underline"
                >
                  See job details<span className="sr-only"> for {pos.city}</span> &rarr;
                </Link>
              </div>
            ))}
          </div>

          {/* What we look for */}
          <h2 className="mt-10 mb-4 text-xl font-bold text-zinc-900">
            What we look for
          </h2>
          <ul className="list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
            <li>Strong musicianship and at least intermediate piano skills</li>
            <li>Genuine love of working with children</li>
            <li>Reliable transportation (you&rsquo;ll drive to students&rsquo; homes)</li>
            <li>Patience, adaptability, and a growth mindset</li>
          </ul>
          <p className="mt-6 leading-relaxed text-zinc-600">
            Click the button below to fill out our teaching application. We
            review every submission and reach out as openings come up in your
            area.
          </p>
        </div>
      }
    />
  );
}
