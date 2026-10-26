import { SITE_URL } from "@/lib/site";

/**
 * Open teaching positions. Single source of truth for /teaching-positions (the
 * overview), /jobs/[slug] (one page per opening) and the sitemap.
 *
 * Each opening gets its own page because Google only shows jobs in its job
 * search results when the JobPosting markup sits on a page for that one job,
 * never on a page listing several.
 *
 * When a position is filled, DELETE its entry. Its page then 404s and drops out
 * of the sitemap, which is how Google expects a filled job to disappear; a
 * stale posting left up can earn the site a manual action.
 */
export type JobOpening = {
  slug: string;
  title: string;
  /** City the posting is filed under (page heading, URL, primary jobLocation). */
  city: string;
  /** Every city the teacher covers, `city` first. */
  cities: string[];
  /** Postal codes for the JobPosting addresses, keyed by city. */
  postalCodes: Record<string, string>;
  payMin: number;
  payMax: number;
  /** Optional, because it isn't known for every opening. */
  startingStudents?: string;
  /** ISO 8601 with Utah's UTC offset. */
  datePosted: string;
  /**
   * Only for an opening with a real closing date. Google says to leave it out
   * when the end date isn't known. Past this date the page stays up but the
   * JobPosting markup is no longer emitted.
   */
  validThrough?: string;
};

export const APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeiYwH4ZX0-0hpnOf1nlrVFqLOXYim6GuzQu1Iq_05524850w/viewform";

export const JOB_OPENINGS: JobOpening[] = [
  {
    slug: "piano-teacher-eagle-mountain-ut",
    title: "In-Home Piano Teacher",
    city: "Eagle Mountain",
    cities: ["Eagle Mountain", "Saratoga Springs", "Lehi", "Cedar Fort"],
    postalCodes: {
      "Eagle Mountain": "84005",
      "Saratoga Springs": "84045",
      Lehi: "84043",
      "Cedar Fort": "84013",
    },
    payMin: 35,
    payMax: 50,
    startingStudents: "10–12 students to start, with more to come",
    datePosted: "2026-10-26T09:00:00-06:00",
  },
];

// The details below are the same for every opening (from the owner and the
// postings on the old WordPress site, March 2026).

export const SCHEDULE =
  "Most lessons are Monday through Friday between 4 and 8 p.m. Some are between 1 and 4 p.m., and a few may be earlier in the day. You set your schedule with the families you teach.";

export const DRIVING =
  "Drive time between homes varies, so we can't promise an exact number, but we keep each teacher within a small set of nearby cities so drives stay reasonable. You work with your families on lesson times that make your route efficient.";

export const PERKS = [
  "Paid training in the Volz Method over your first three months, including composing, arranging, ear training and jazz improv",
  "A free digital piano for home use, or a $200 sign-on bonus if you already have one",
  "A teaching mentor for real-time help, plus ongoing skill-building support",
  "Free VASA gym membership",
  "We provide all your students, so you never have to recruit",
  "Pay increases over time",
  "Host your own recitals",
  "Candy and stickers for your students",
];

export const REQUIREMENTS = [
  "Intermediate piano skills or above",
  "No teaching experience required. We train you.",
  "Reliable transportation (you drive to students' homes)",
  "A positive attitude and a love of working with kids",
];

export function payLabel(job: JobOpening): string {
  return `$${job.payMin}–$${job.payMax} per hour (while teaching)`;
}

export function getJob(slug: string): JobOpening | undefined {
  return JOB_OPENINGS.find((j) => j.slug === slug);
}

export function isJobActive(job: JobOpening, now = new Date()): boolean {
  return !job.validThrough || now.getTime() <= Date.parse(job.validThrough);
}

function listHtml(items: string[]): string {
  return `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
}

/**
 * The job description as HTML for the JobPosting `description` field. Google
 * wants the full description there, so it's built from the same data the page
 * renders and the two can't drift apart.
 */
export function jobDescriptionHtml(job: JobOpening): string {
  return [
    `<p>Volz Method Piano Lessons is hiring a part-time piano teacher in ${job.city}, Utah. You drive to each family and teach one-on-one on the piano in their own home. We provide all the students and train you in the Volz Method.</p>`,
    `<p><strong>Pay:</strong> ${payLabel(job)}</p>`,
    `<p><strong>Cities:</strong> ${job.cities.join(", ")}</p>`,
    job.startingStudents ? `<p><strong>Students:</strong> ${job.startingStudents}</p>` : "",
    `<p><strong>Schedule:</strong> ${SCHEDULE}</p>`,
    `<p><strong>Driving:</strong> ${DRIVING}</p>`,
    `<p><strong>Pay and perks:</strong></p>${listHtml(PERKS)}`,
    `<p><strong>What you need:</strong></p>${listHtml(REQUIREMENTS)}`,
  ].join("");
}

/** schema.org JobPosting, per Google's job posting structured data guidelines. */
export function jobPostingJsonLd(job: JobOpening) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: jobDescriptionHtml(job),
    identifier: {
      "@type": "PropertyValue",
      name: "Volz Method Piano Lessons",
      value: job.slug,
    },
    datePosted: job.datePosted,
    ...(job.validThrough && { validThrough: job.validThrough }),
    employmentType: "PART_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Volz Method Piano Lessons",
      sameAs: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
    },
    jobLocation: job.cities.map((city) => ({
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        addressRegion: "UT",
        postalCode: job.postalCodes[city],
        addressCountry: "US",
      },
    })),
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        minValue: job.payMin,
        maxValue: job.payMax,
        unitText: "HOUR",
      },
    },
    experienceRequirements: "no requirements",
    directApply: false,
    url: `${SITE_URL}/jobs/${job.slug}`,
  };
}
