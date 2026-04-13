import fs from "fs";
import path from "path";

const SRC_DIR = path.join(process.cwd(), "src");

/**
 * These tests verify the JSON-LD structured-data blocks declared in our
 * layout files. We deliberately use file-content assertions (not eval) so
 * the tests are robust to template literals like `${SITE_URL}/...`.
 */

function read(rel: string): string {
  return fs.readFileSync(path.join(SRC_DIR, rel), "utf-8");
}

describe("Root layout JSON-LD (Organization)", () => {
  const src = read("app/layout.tsx");

  it("declares a JSON-LD object literal", () => {
    expect(src).toContain("organizationJsonLd");
    expect(src).toContain('"@context": "https://schema.org"');
  });

  it("declares MusicSchool and LocalBusiness types", () => {
    expect(src).toMatch(/"@type":\s*\["MusicSchool",\s*"LocalBusiness"\]/);
  });

  it("includes the canonical name and url", () => {
    expect(src).toContain('name: "Volz Method Piano Lessons"');
    expect(src).toMatch(/url:\s*SITE_URL/);
  });

  it("declares Utah and Idaho as areas served", () => {
    expect(src).toContain('name: "Utah"');
    expect(src).toContain('name: "Idaho"');
  });

  it("priceRange uses $29–$52", () => {
    expect(src).toMatch(/priceRange:\s*"\$29.\$52/);
  });

  it("makesOffer has a PriceSpecification with min 29 and max 52", () => {
    expect(src).toContain("PriceSpecification");
    expect(src).toMatch(/minPrice:\s*"29"/);
    expect(src).toMatch(/maxPrice:\s*"52"/);
  });

  it("aggregateRating uses 5.0 and the latest review count of 134", () => {
    expect(src).toMatch(/ratingValue:\s*"5\.0"/);
    expect(src).toMatch(/ratingCount:\s*"134"/);
  });

  it("renders the JSON-LD via a script tag with type application/ld+json", () => {
    expect(src).toContain('type="application/ld+json"');
    expect(src).toContain("serializeJsonLd(organizationJsonLd)");
  });
});

describe("How It Works layout JSON-LD (FAQPage + Service)", () => {
  const src = read("app/pricing/layout.tsx");

  it("declares both an FAQ block and a Service block", () => {
    expect(src).toContain("faqJsonLd");
    expect(src).toContain("serviceJsonLd");
  });

  it("FAQ block uses @type FAQPage", () => {
    expect(src).toMatch(/faqJsonLd\s*=\s*\{[\s\S]*?"@type":\s*"FAQPage"/);
  });

  it("FAQ has at least 5 questions", () => {
    const faqMatches = src.match(/"@type":\s*"Question"/g) || [];
    expect(faqMatches.length).toBeGreaterThanOrEqual(5);
  });

  it("FAQ answers reference the $29 and $52 price endpoints", () => {
    expect(src).toContain("$29");
    expect(src).toContain("$52");
  });

  it("FAQ mentions the Utah Fits All Scholarship", () => {
    expect(src).toContain("Utah Fits All Scholarship");
  });

  it("Service block has @type Service with AggregateOffer 29/52", () => {
    expect(src).toMatch(/serviceJsonLd\s*=\s*\{[\s\S]*?"@type":\s*"Service"/);
    expect(src).toContain("AggregateOffer");
    expect(src).toMatch(/lowPrice:\s*"29"/);
    expect(src).toMatch(/highPrice:\s*"52"/);
  });

  it("renders both JSON-LD blocks via script tags", () => {
    const scriptCount = (
      src.match(/type="application\/ld\+json"/g) || []
    ).length;
    expect(scriptCount).toBe(2);
  });
});

describe("Digital Piano layout JSON-LD (ItemList of Products)", () => {
  const src = read("app/digital-piano/layout.tsx");

  it("declares an itemListJsonLd block", () => {
    expect(src).toContain("itemListJsonLd");
  });

  it("uses ItemList with at least 4 Product entries", () => {
    expect(src).toMatch(/"@type":\s*"ItemList"/);
    const productMatches = src.match(/"@type":\s*"Product"/g) || [];
    expect(productMatches.length).toBeGreaterThanOrEqual(4);
  });

  it("each product references an amzn.to affiliate link", () => {
    const amazonLinks = src.match(/https:\/\/amzn\.to\/[A-Za-z0-9]+/g) || [];
    expect(amazonLinks.length).toBeGreaterThanOrEqual(4);
  });

  it("each product has a /digital-piano/ image path", () => {
    const imagePaths =
      src.match(/\/digital-piano\/[a-z-]+\.png/g) || [];
    expect(imagePaths.length).toBeGreaterThanOrEqual(4);
  });

  it("renders the JSON-LD via a script tag", () => {
    expect(src).toContain('type="application/ld+json"');
    expect(src).toContain("serializeJsonLd(itemListJsonLd)");
  });
});
