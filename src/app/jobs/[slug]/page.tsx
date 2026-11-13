import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StubPage from "@/app/components/StubPage";
import MusicNotesHero from "@/app/teaching-positions/MusicNotesHero";
import { serializeJsonLd } from "@/lib/json-ld";
import { OG_IMAGES } from "@/lib/site";
import {
  DRIVING,
  JOB_OPENINGS,
  PERKS,
  REQUIREMENTS,
  SCHEDULE,
  applyUrl,
  getJob,
  isJobActive,
  jobPostingJsonLd,
  payLabel,
  type JobOpening,
  type OfficeJob,
  type TeacherJob,
} from "@/lib/jobs";

// Only listed openings exist; a filled job removed from src/lib/jobs.ts 404s.
export const dynamicParams = false;
// Re-render daily so an opening with a validThrough date stops emitting its
// JobPosting markup once that date passes.
export const revalidate = 86400;

export function generateStaticParams() {
  return JOB_OPENINGS.map((job) => ({ slug: job.slug }));
}

function pageTitle(job: JobOpening): string {
  return job.kind === "teacher"
    ? `Piano Teacher Job in ${job.city}, UT`
    : `${job.title} Job (${job.locationLabel})`;
}

function metaDescription(job: JobOpening): string {
  return job.kind === "teacher"
    ? `Hiring a part-time in-home piano teacher in ${job.cities.join(", ")}. $${job.payMin}–$${job.payMax}/hr while teaching, paid training, no teaching experience needed.`
    : `Hiring a part-time ${job.title.toLowerCase()}, ${job.locationLabel.toLowerCase()}. $${job.payMin}–$${job.payMax}/hr, ${job.hoursPerWeek} hours a week, paid training, no experience needed.`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};
  const title = pageTitle(job);
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
const bulletList = `list-disc space-y-2 pl-6 ${bodyText}`;

function FactsCard({ job, facts }: { job: JobOpening; facts: [string, string][] }) {
  return (
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
        href={applyUrl(job)}
        className="mt-5 inline-flex items-center justify-center rounded-full bg-cta px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-cta-hover"
      >
        Apply Now
      </a>
    </div>
  );
}

function TeacherJobBody({ job }: { job: TeacherJob }) {
  const facts: [string, string][] = [
    ["Pay", payLabel(job)],
    ["Type", "Part-time employee"],
    ...(job.startingStudents ? [["Students", job.startingStudents] as [string, string]] : []),
    [job.cities.length === 1 ? "City" : "Cities", job.cities.join(", ")],
    ["Experience", "No teaching experience required"],
  ];

  return (
    <div>
      <FactsCard job={job} facts={facts} />

      <h2 className={sectionHeading}>The job</h2>
      <p className={bodyText}>
        You drive to each family and teach one-on-one on the piano in their own
        home. We provide all the students, so you can focus on teaching. Lessons
        follow the Volz Method, which mixes reading music, composing, playing by
        ear and arranging, tailored to how each child learns.
      </p>

      <h2 className={sectionHeading}>Schedule</h2>
      <p className={bodyText}>{SCHEDULE}</p>

      <h2 className={sectionHeading}>Where you&rsquo;ll teach</h2>
      <p className={bodyText}>
        {job.cities.join(", ")}. {DRIVING}
      </p>

      <h2 className={sectionHeading}>Pay and perks</h2>
      <ul className={bulletList}>
        <li>{payLabel(job)}</li>
        {PERKS.map((perk) => (
          <li key={perk}>{perk}</li>
        ))}
      </ul>

      <h2 className={sectionHeading}>What you need</h2>
      <ul className={bulletList}>
        {REQUIREMENTS.map((req) => (
          <li key={req}>{req}</li>
        ))}
      </ul>

      <h2 className={sectionHeading}>How to apply</h2>
      <p className={bodyText}>
        Fill out our short application using the button below. We review every
        submission and reach out to applicants.
      </p>
    </div>
  );
}

function OfficeJobBody({ job }: { job: OfficeJob }) {
  const facts: [string, string][] = [
    ["Pay", payLabel(job)],
    ["Type", "Part-time employee"],
    ["Hours", `${job.hoursPerWeek} hours a week, you choose when`],
    ["Location", job.locationLabel],
    ["Experience", "None required, and no music knowledge needed"],
  ];

  return (
    <div>
      <FactsCard job={job} facts={facts} />

      <h2 className={sectionHeading}>The job</h2>
      <p className={bodyText}>{job.summary}</p>

      <h2 className={sectionHeading}>What you&rsquo;ll do</h2>
      {job.duties.map((group) => (
        <div key={group.heading} className="mt-6">
          <h3 className="mb-2 font-bold text-zinc-900">{group.heading}</h3>
          <ul className={bulletList}>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2 className={sectionHeading}>Where and when</h2>
      <p className={bodyText}>
        {job.locationLabel}. The work is primarily remote, with occasional local
        errands. Part-time, {job.hoursPerWeek} hours a week, and you choose your
        own hours.
      </p>

      <h2 className={sectionHeading}>Pay and perks</h2>
      <ul className={bulletList}>
        <li>
          {payLabel(job)}
          {job.payNote && <>. {job.payNote}</>}
        </li>
        {job.perks.map((perk) => (
          <li key={perk}>{perk}</li>
        ))}
      </ul>

      <h2 className={sectionHeading}>What you need</h2>
      <ul className={bulletList}>
        {job.requirements.map((req) => (
          <li key={req}>{req}</li>
        ))}
      </ul>

      {job.niceToHave && job.niceToHave.length > 0 && (
        <>
          <h2 className={sectionHeading}>Nice to have</h2>
          <ul className={bulletList}>
            {job.niceToHave.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}

      <h2 className={sectionHeading}>How to apply</h2>
      <p className={bodyText}>{job.applyNote}</p>
    </div>
  );
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  const hero =
    job.kind === "teacher"
      ? {
          title: "Piano Teacher in",
          highlight: `${job.city}, UT`,
          description: `Teach piano in students' homes in ${job.cities.join(", ")}. $${job.payMin}–$${job.payMax} an hour while teaching, paid training, and no teaching experience required.`,
        }
      : {
          title: job.title,
          highlight: job.locationLabel,
          description: `Work from home ${job.hoursPerWeek} hours a week supporting our piano families and teachers. $${job.payMin}–$${job.payMax} an hour, paid training, and no music knowledge needed.`,
        };

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
        title={hero.title}
        highlight={hero.highlight}
        description={hero.description}
        primaryCta={{ href: applyUrl(job), label: "Apply Now" }}
        heroBackground={<MusicNotesHero />}
        body={job.kind === "teacher" ? <TeacherJobBody job={job} /> : <OfficeJobBody job={job} />}
      />
    </>
  );
}
