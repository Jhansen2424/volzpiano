/**
 * Guards the job openings in src/lib/jobs.ts and their JobPosting markup.
 *
 * Google only lists a job in its job search results when the markup follows
 * its rules: required fields present, a title that is only the job title, an
 * HTML description, an addressCountry on every location, and one job per page.
 * A broken posting just silently stops appearing, so these check the rules
 * rather than waiting for Search Console to complain.
 */
import sitemap from "@/app/sitemap";
import { SITE_URL } from "@/lib/site";
import { nextRedirects } from "@/lib/redirects";
import {
  JOB_OPENINGS,
  getJob,
  isJobActive,
  jobDescriptionHtml,
  jobPostingJsonLd,
  type JobOpening,
} from "@/lib/jobs";

describe("job openings", () => {
  it("have unique, URL-safe slugs", () => {
    const slugs = JOB_OPENINGS.map((j) => j.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("list their own city first and have a postal code for every city", () => {
    for (const job of JOB_OPENINGS) {
      expect(job.cities[0]).toBe(job.city);
      for (const city of job.cities) expect(job.postalCodes[city]).toMatch(/^\d{5}$/);
    }
  });

  it("have a sensible pay range and valid dates", () => {
    for (const job of JOB_OPENINGS) {
      expect(job.payMin).toBeLessThanOrEqual(job.payMax);
      expect(Number.isNaN(Date.parse(job.datePosted))).toBe(false);
      if (job.validThrough) expect(Date.parse(job.validThrough)).toBeGreaterThan(Date.parse(job.datePosted));
    }
  });

  it("are not shadowed by a redirect", () => {
    const sources = new Set(nextRedirects().map((r) => r.source));
    for (const job of JOB_OPENINGS) expect(sources.has(`/jobs/${job.slug}`)).toBe(false);
  });

  it("each appear in the sitemap", () => {
    const urls = sitemap().map((e) => e.url);
    for (const job of JOB_OPENINGS) expect(urls).toContain(`${SITE_URL}/jobs/${job.slug}`);
  });
});

describe("JobPosting markup", () => {
  it.each(JOB_OPENINGS.map((j) => [j.slug, j] as const))("%s has Google's required fields", (_, job) => {
    const ld = jobPostingJsonLd(job);
    expect(ld["@type"]).toBe("JobPosting");
    for (const key of ["title", "description", "datePosted", "hiringOrganization", "jobLocation"] as const) {
      expect(ld[key]).toBeTruthy();
    }
    expect(ld.hiringOrganization.name).toBeTruthy();
    expect(ld.jobLocation.length).toBe(job.cities.length);
    for (const place of ld.jobLocation) expect(place.address.addressCountry).toBe("US");
    expect(ld.baseSalary.value).toMatchObject({ minValue: job.payMin, maxValue: job.payMax, unitText: "HOUR" });
  });

  it.each(JOB_OPENINGS.map((j) => [j.slug, j] as const))("%s keeps the title to the job title alone", (_, job) => {
    // Google: no addresses, dates, salaries or company names in the title.
    const { title } = jobPostingJsonLd(job);
    for (const city of job.cities) expect(title).not.toContain(city);
    expect(title).not.toMatch(/\$|\d|Volz/);
  });

  it.each(JOB_OPENINGS.map((j) => [j.slug, j] as const))("%s has an HTML description with the key facts", (_, job) => {
    const html = jobDescriptionHtml(job);
    expect(html.startsWith("<p>")).toBe(true);
    expect(html).toContain(`$${job.payMin}–$${job.payMax}`);
    for (const city of job.cities) expect(html).toContain(city);
  });

  it("omits validThrough when an opening has no closing date", () => {
    const job: JobOpening = { ...JOB_OPENINGS[0], validThrough: undefined };
    expect("validThrough" in jobPostingJsonLd(job)).toBe(false);
    expect(isJobActive(job)).toBe(true);
  });

  it("stops counting an opening as active after its validThrough date", () => {
    const job: JobOpening = { ...JOB_OPENINGS[0], validThrough: "2026-01-31T23:59:59-07:00" };
    expect(isJobActive(job, new Date("2026-01-15T12:00:00Z"))).toBe(true);
    expect(isJobActive(job, new Date("2026-02-02T12:00:00Z"))).toBe(false);
  });

  it("looks openings up by slug", () => {
    expect(getJob(JOB_OPENINGS[0].slug)).toBe(JOB_OPENINGS[0]);
    expect(getJob("piano-teacher-nowhere-ut")).toBeUndefined();
  });
});
