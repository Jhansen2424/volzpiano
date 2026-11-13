import { SITE_URL } from "@/lib/site";

/**
 * Open positions. Single source of truth for /teaching-positions (the
 * overview), /jobs (the index), /jobs/[slug] (one page per opening) and the
 * sitemap.
 *
 * Each opening gets its own page because Google only shows jobs in its job
 * search results when the JobPosting markup sits on a page for that one job,
 * never on a page listing several.
 *
 * When a position is filled, DELETE its entry. Its page then 404s and drops out
 * of the sitemap, which is how Google expects a filled job to disappear; a
 * stale posting left up can earn the site a manual action.
 *
 * Teaching openings share their copy (SCHEDULE, DRIVING, PERKS, REQUIREMENTS
 * below) and only differ in city and pay. Office openings carry their own copy,
 * because each one is a different role.
 */
type JobBase = {
  slug: string;
  /** The job title alone: Google rejects cities, pay or the company name here. */
  title: string;
  payMin: number;
  payMax: number;
  /** ISO 8601 with Utah's UTC offset (-06:00 in summer, -07:00 in winter). */
  datePosted: string;
  /**
   * Only for an opening with a real closing date. Google says to leave it out
   * when the end date isn't known. Past this date the page stays up but the
   * JobPosting markup is no longer emitted.
   */
  validThrough?: string;
};

export type TeacherJob = JobBase & {
  kind: "teacher";
  /** City the posting is filed under (page heading, URL, primary jobLocation). */
  city: string;
  /** Every city the teacher covers, `city` first. */
  cities: string[];
  /** Postal codes for the JobPosting addresses, keyed by city. */
  postalCodes: Record<string, string>;
  /** Optional, because it isn't known for every opening. */
  startingStudents?: string;
};

export type OfficeJob = JobBase & {
  kind: "office";
  /** Shown wherever a teaching job shows its cities, e.g. "Remote in Utah". */
  locationLabel: string;
  /** State a fully remote applicant has to live in (JobPosting markup). */
  applicantState: string;
  /** e.g. "20–25". */
  hoursPerWeek: string;
  /** Pay detail beyond the range, e.g. a lower training rate. */
  payNote?: string;
  /** One-paragraph pitch: page intro and the start of the JobPosting description. */
  summary: string;
  duties: { heading: string; items: string[] }[];
  requirements: string[];
  niceToHave?: string[];
  perks: string[];
  applyUrl: string;
  /** What applying involves, shown under "How to apply". */
  applyNote: string;
};

export type JobOpening = TeacherJob | OfficeJob;

/** The teacher application (Google Form). Office openings set their own. */
export const APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeiYwH4ZX0-0hpnOf1nlrVFqLOXYim6GuzQu1Iq_05524850w/viewform";

export const JOB_OPENINGS: JobOpening[] = [
  {
    kind: "teacher",
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
  // From the owner's Indeed posting, Nov 11 2026. He asked for only the one
  // city on the Indeed posting from now on, not a list of nearby cities.
  {
    kind: "teacher",
    slug: "piano-teacher-provo-ut",
    title: "In-Home Piano Teacher",
    city: "Provo",
    cities: ["Provo"],
    postalCodes: { Provo: "84601" },
    payMin: 30,
    payMax: 40,
    datePosted: "2026-11-13T09:00:00-07:00",
  },
  // From the owner's Indeed posting, Nov 11 2026. Applications go through
  // Indeed, which asks his three screening questions.
  {
    kind: "office",
    slug: "customer-service-administrator-remote-ut",
    title: "Customer Service Manager/Administrator",
    locationLabel: "Remote in Utah",
    applicantState: "Utah",
    hoursPerWeek: "20–25",
    payMin: 20,
    payMax: 25,
    datePosted: "2026-11-13T09:00:00-07:00",
    payNote:
      "$15 an hour during your first month of paid training, then $20 an hour, with raises up to $25 an hour over two years.",
    summary:
      "Work from home as the go-to person for our piano families and teachers. You answer customer questions, help new teachers get started and keep the office side of the business running smoothly. You don't need to know anything about piano or music.",
    duties: [
      {
        heading: "Customer service",
        items: [
          "Answer questions from families by phone, text and email",
          "Handle billing, scheduling, cancellations and refunds",
          "Resolve complaints and keep an eye on customer satisfaction and reviews",
        ],
      },
      {
        heading: "Teacher support",
        items: [
          "Onboard new piano teachers",
          "Help teachers with scheduling and technical questions",
          "Coordinate students moving between teachers",
        ],
      },
      {
        heading: "Office and operations",
        items: [
          "Prepare payroll information for our accountant",
          "Process account changes and keep records up to date",
          "Troubleshoot our software and help the owner with day-to-day tasks",
        ],
      },
      {
        heading: "Inventory and shipping",
        items: [
          "Keep teaching materials organized at our storage unit",
          "Ship and receive packages",
          "Make sure teachers can get the supplies they need",
        ],
      },
    ],
    requirements: [
      "A commitment of at least two years",
      "Internet with at least 100 Mbps download speed",
      "Reliable transportation for occasional local errands",
      "Strong written and spoken communication, organization and computer skills",
      "Able to work independently and solve problems on your own",
      "No previous experience needed, and no piano or music knowledge",
    ],
    niceToHave: ["Experience in customer service, administration or office management"],
    perks: [
      "Paid training",
      "Paid time off",
      "Work from home and choose your own hours",
      "Free VASA gym membership",
      "Employee discount",
    ],
    applyUrl: "https://www.indeed.com/viewjob?jk=ad405ef0844dc51c",
    applyNote:
      "Apply through our Indeed posting using the button below. It asks three quick questions: the city you live in, whether you can commit to two years, and your internet download and upload speeds.",
  },
];

export const TEACHER_JOBS = JOB_OPENINGS.filter((j): j is TeacherJob => j.kind === "teacher");
export const OFFICE_JOBS = JOB_OPENINGS.filter((j): j is OfficeJob => j.kind === "office");

// The details below are the same for every teaching opening (from the owner and
// the postings on the old WordPress site, March 2026).

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
  const range = `$${job.payMin}–$${job.payMax} per hour`;
  return job.kind === "teacher" ? `${range} (while teaching)` : range;
}

/** Where the job is: a teacher's cities, or an office job's location. */
export function locationLabel(job: JobOpening): string {
  return job.kind === "teacher" ? job.cities.join(", ") : job.locationLabel;
}

/** Link text for the job in lists, e.g. "Piano Teacher in Provo, UT". */
export function listingLabel(job: JobOpening): string {
  return job.kind === "teacher"
    ? `Piano Teacher in ${job.city}, UT`
    : `${job.title} (${job.locationLabel})`;
}

export function applyUrl(job: JobOpening): string {
  return job.kind === "teacher" ? APPLY_URL : job.applyUrl;
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
  if (job.kind === "office") {
    return [
      `<p>${job.summary}</p>`,
      `<p><strong>Pay:</strong> ${payLabel(job)}.${job.payNote ? ` ${job.payNote}` : ""}</p>`,
      `<p><strong>Location:</strong> ${job.locationLabel}. Primarily remote, with occasional local errands.</p>`,
      `<p><strong>Hours:</strong> Part-time, ${job.hoursPerWeek} hours a week. You choose your own hours.</p>`,
      ...job.duties.map((d) => `<p><strong>${d.heading}:</strong></p>${listHtml(d.items)}`),
      `<p><strong>What you need:</strong></p>${listHtml(job.requirements)}`,
      job.niceToHave?.length ? `<p><strong>Nice to have:</strong></p>${listHtml(job.niceToHave)}` : "",
      `<p><strong>Perks:</strong></p>${listHtml(job.perks)}`,
    ].join("");
  }
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

/**
 * Where the job happens, in JobPosting terms: street-level places for a
 * teaching job, or Google's fully remote form (TELECOMMUTE plus the state
 * applicants must live in) for a remote office job.
 */
function jobPostingLocation(job: JobOpening) {
  if (job.kind === "office") {
    return {
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: { "@type": "State", name: job.applicantState },
    };
  }
  return {
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
  };
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
    ...(job.kind === "office" && { workHours: `${job.hoursPerWeek} hours per week, flexible` }),
    hiringOrganization: {
      "@type": "Organization",
      name: "Volz Method Piano Lessons",
      sameAs: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
    },
    ...jobPostingLocation(job),
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
