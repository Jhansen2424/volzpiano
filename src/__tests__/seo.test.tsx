import sitemap from "../app/sitemap";
import robots from "../app/robots";
import { metadata as rootMetadata } from "../app/layout";
import { metadata as blogMetadata } from "../app/blog/layout";
import { metadata as digitalPianoMetadata } from "../app/digital-piano/layout";
import { metadata as scheduleCallMetadata } from "../app/schedule-call/layout";
import { metadata as testimonialsMetadata } from "../app/testimonials/layout";
import { metadata as volzMethodMetadata } from "../app/volz-method-best-piano-teaching-medthod/layout";
import { metadata as howItWorksMetadata } from "../app/pricing/layout";
import { metadata as coreValuesMetadata } from "../app/core-values/layout";
import { metadata as studentPortalMetadata } from "../app/student-portal/layout";
import { metadata as privacyPolicyMetadata } from "../app/privacy-policy-2/layout";
import blogSlugs from "../blog-slugs.json";

const SITE_URL = "https://volzpiano.com";

describe("Root metadata", () => {
  it("has metadataBase pointing at the canonical site URL", () => {
    expect(rootMetadata.metadataBase?.toString()).toContain("volzpiano.com");
  });

  it("uses a title template so child pages auto-prefix", () => {
    expect(rootMetadata.title).toMatchObject({
      default: expect.any(String),
      template: expect.stringContaining("%s"),
    });
  });

  it("has a description that mentions the value proposition", () => {
    expect(rootMetadata.description).toBeTruthy();
    expect((rootMetadata.description as string).toLowerCase()).toContain(
      "in-home"
    );
  });

  it("has OpenGraph and Twitter card metadata with images", () => {
    expect(rootMetadata.openGraph).toBeTruthy();
    expect(rootMetadata.openGraph?.images).toBeTruthy();
    expect(rootMetadata.twitter).toBeTruthy();
    expect(rootMetadata.twitter?.card).toBe("summary_large_image");
  });

  it("has robots configured to index/follow with googleBot extras", () => {
    const robotsField = rootMetadata.robots as {
      index: boolean;
      follow: boolean;
      googleBot: { index: boolean; follow: boolean };
    };
    expect(robotsField.index).toBe(true);
    expect(robotsField.follow).toBe(true);
    expect(robotsField.googleBot.index).toBe(true);
  });
});

describe("Per-page metadata", () => {
  const cases: Array<[string, { title?: unknown; description?: unknown; alternates?: { canonical?: string } }, string]> = [
    ["blog", blogMetadata, "/blog"],
    ["digital-piano", digitalPianoMetadata, "/digital-piano"],
    ["schedule-call", scheduleCallMetadata, "/schedule-call"],
    ["testimonials", testimonialsMetadata, "/testimonials"],
    ["volz-method-best-piano-teaching-medthod", volzMethodMetadata, "/volz-method-best-piano-teaching-medthod"],
    ["pricing", howItWorksMetadata, "/pricing"],
    ["core-values", coreValuesMetadata, "/core-values"],
    ["student-portal", studentPortalMetadata, "/student-portal"],
    ["privacy-policy-2", privacyPolicyMetadata, "/privacy-policy-2"],
  ];

  it.each(cases)("%s has title, description, and canonical", (_, meta, canonical) => {
    expect(meta.title).toBeTruthy();
    expect(meta.description).toBeTruthy();
    expect(meta.alternates?.canonical).toBe(canonical);
  });

  it("student-portal is marked noindex (utility page)", () => {
    const robotsField = (studentPortalMetadata as { robots?: { index?: boolean } }).robots;
    expect(robotsField?.index).toBe(false);
  });
});

describe("sitemap.ts", () => {
  const entries = sitemap();

  it("returns at least one entry for every static route", () => {
    const urls = entries.map((e) => e.url);
    const expected = [
      `${SITE_URL}/`,
      `${SITE_URL}/volz-method-best-piano-teaching-medthod`,
      `${SITE_URL}/pricing`,
      `${SITE_URL}/core-values`,
      `${SITE_URL}/schedule-call`,
      `${SITE_URL}/testimonials`,
      `${SITE_URL}/digital-piano`,
      `${SITE_URL}/blog`,
      `${SITE_URL}/privacy-policy-2`,
      `${SITE_URL}/about-us`,
      `${SITE_URL}/contact-us`,
      `${SITE_URL}/jobs`,
      `${SITE_URL}/teaching-positions`,
    ];
    for (const url of expected) {
      expect(urls).toContain(url);
    }
  });

  it("does not include the removed /digital-piano-deal route", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).not.toContain(`${SITE_URL}/digital-piano-deal`);
  });

  it("includes every blog slug from blog-slugs.json (at root, not /blog/)", () => {
    const urls = new Set(entries.map((e) => e.url));
    type BlogEntry = { slug: string; date: string };
    for (const entry of blogSlugs as BlogEntry[]) {
      expect(urls.has(`${SITE_URL}/${entry.slug}`)).toBe(true);
    }
  });

  it("every entry has an absolute URL on the canonical host", () => {
    for (const entry of entries) {
      expect(entry.url.startsWith(`${SITE_URL}/`)).toBe(true);
    }
  });

  it("every entry has a lastModified date", () => {
    for (const entry of entries) {
      expect(entry.lastModified).toBeTruthy();
    }
  });

  it("homepage has the highest priority", () => {
    const home = entries.find((e) => e.url === `${SITE_URL}/`);
    expect(home?.priority).toBe(1.0);
  });
});

describe("robots.ts", () => {
  const result = robots();

  it("points to the sitemap on the canonical host", () => {
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });

  it("disallows /api/ and /student-portal for the wildcard user agent", () => {
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const wildcard = rules.find((r) => r.userAgent === "*");
    expect(wildcard).toBeTruthy();
    const disallow = Array.isArray(wildcard?.disallow)
      ? wildcard?.disallow
      : [wildcard?.disallow];
    expect(disallow).toEqual(expect.arrayContaining(["/api/", "/student-portal"]));
  });

  it("explicitly allows major AI crawlers", () => {
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const expectedBots = [
      "GPTBot",
      "OAI-SearchBot",
      "ChatGPT-User",
      "ClaudeBot",
      "anthropic-ai",
      "PerplexityBot",
      "Google-Extended",
      "Applebot-Extended",
      "CCBot",
    ];
    for (const bot of expectedBots) {
      const rule = rules.find((r) => r.userAgent === bot);
      expect(rule).toBeTruthy();
      expect(rule?.allow).toBe("/");
    }
  });
});
