import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StubPage from "@/app/components/StubPage";
import MusicNotesHero from "@/app/teaching-positions/MusicNotesHero";
import { serializeJsonLd } from "@/lib/json-ld";
import { OG_IMAGES } from "@/lib/site";
import {
  APPLY_URL,
  DRIVING,
  JOB_OPENINGS,
  PERKS,
  REQUIREMENTS,
  SCHEDULE,
  getJob,
  isJobActive,
  jobPostingJsonLd,
  payLabel,
  type JobOpening,
} from "@/lib/jobs";

// Only listed openings exist; a filled job removed from src/lib/jobs.ts 404s.
export const dynamicParams = false;
// Re-render daily so an opening with a validThrough date stops emitting its
// JobPosting markup once that date passes.
export const revalidate = 86400;

export function generateStaticParams() {
  return JOB_OPENINGS.map((job) => ({ slug: job.slug }));
}

function metaDescription(job: JobOpening): string {
  return `Hiring a part-time in-home piano teacher in ${job.cities.join(", ")}. $${job.payMin}–$${job.payMax}/hr while teaching, paid training, no teaching experience needed.`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};
  const title = `Piano Teacher Job in ${job.city}, UT`;
  const description = metaDescription(job);
  return {
    // Absolute because jobs/layout.tsx sets a plain string title, which
    // switches off the root "%s | Volz Method Piano Lessons" template below it.
    title: { absolute: `${title} | Volz Method Piano Lessons` },
    description,
    alternates: { canonical: `/jobs/${job.slug}` },
    openGraph: {
      title: `${title} | Volz Method Piano Lessons`,
      description,
      url: `/jobs/${job.slug}`,
      type: "website",
      images: OG_IMAGES,
    },
  };
}

const sectionHeading = "mt-10 mb-4 text-xl font-bold text-zinc-900";
const bodyText = "leading-relaxed text-zinc-600";

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  const facts: [string, string][] = [
    ["Pay", payLabel(job)],
    ["Type", "Part-time employee"],
    ...(job.startingStudents ? [["Students", job.startingStudents] as [string, string]] : []),
    ["Cities", job.cities.join(", ")],
    ["Experience", "No teaching experience required"],
  ];

  return (
    <>
      {isJobActive(job) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jobPostingJsonLd(job)) }}
        />
      )}
      <StubPage
        badge="Now Hiring"
        title="Piano Teacher in"
        highlight={`${job.city}, UT`}
        description={`Teach piano in students' homes in ${job.cities.join(", ")}. $${job.payMin}–$${job.payMax} an hour while teaching, paid training, and no teaching experience required.`}
        primaryCta={{ href: APPLY_URL, label: "Apply Now" }}
        heroBackground={<MusicNotesHero />}
        body={
          <div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <dl className="space-y-2 text-sm text-zinc-600">
                {facts.map(([label, value]) => (
                  <div key={label} className="flex flex-wrap gap-x-2">
                    <dt className="font-semibold text-zinc-900">{label}:</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={APPLY_URL}
                className="mt-5 inline-flex items-center justify-center rounded-full bg-cta px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-cta-hover"
              >
                Apply Now
              </a>
            </div>

            <h2 className={sectionHeading}>The job</h2>
            <p className={bodyText}>
              You drive to each family and teach one-on-one on the piano in
              their own home. We provide all the students, so you can focus on
              teaching. Lessons follow the Volz Method, which mixes reading
              music, composing, playing by ear and arranging, tailored to how
              each child learns.
            </p>

            <h2 className={sectionHeading}>Schedule</h2>
            <p className={bodyText}>{SCHEDULE}</p>

            <h2 className={sectionHeading}>Where you&rsquo;ll teach</h2>
            <p className={bodyText}>
              {job.cities.join(", ")}. {DRIVING}
            </p>

            <h2 className={sectionHeading}>Pay and perks</h2>
            <ul className={`list-disc space-y-2 pl-6 ${bodyText}`}>
              <li>{payLabel(job)}</li>
              {PERKS.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>

            <h2 className={sectionHeading}>What you need</h2>
            <ul className={`list-disc space-y-2 pl-6 ${bodyText}`}>
              {REQUIREMENTS.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>

            <h2 className={sectionHeading}>How to apply</h2>
            <p className={bodyText}>
              Fill out our short application using the button below. We review
              every submission and reach out to applicants.
            </p>
          </div>
        }
      />
    </>
  );
}
