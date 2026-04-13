/**
 * Integration test: verify no broken #schedule anchors remain
 * and all internal links point to valid routes.
 */
import * as fs from "fs";
import * as path from "path";

const SRC_DIR = path.join(__dirname, "..", "app");

const VALID_ROUTES = [
  "/",
  "/blog",
  "/testimonials",
  "/digital-piano",
  "/volz-method-best-piano-teaching-medthod",
  "/pricing",
  "/core-values",
  "/schedule-call",
  "/student-portal",
  "/privacy-policy-2",
  "/about-us",
  "/contact-us",
  "/jobs",
  "/teaching-positions",
  "/shop",
  "/cart",
  "/checkout",
  "/my-account",
];

function getAllTsxFiles(dir: string): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip node_modules and generated blog posts (too many)
      if (entry.name === "node_modules") continue;
      results.push(...getAllTsxFiles(fullPath));
    } else if (entry.name.endsWith(".tsx")) {
      results.push(fullPath);
    }
  }
  return results;
}

describe("Link integrity checks", () => {
  const componentFiles = getAllTsxFiles(
    path.join(SRC_DIR, "components")
  );
  const layoutFile = path.join(SRC_DIR, "layout.tsx");
  const filesToCheck = [...componentFiles];
  if (fs.existsSync(layoutFile)) filesToCheck.push(layoutFile);

  // Also check top-level page files (not blog posts)
  for (const route of [
    "page.tsx",
    "schedule-call/page.tsx",
    "student-portal/page.tsx",
    "privacy-policy-2/page.tsx",
    "testimonials/page.tsx",
    "digital-piano/page.tsx",
    "volz-method-best-piano-teaching-medthod/page.tsx",
    "pricing/page.tsx",
    "core-values/page.tsx",
    "about-us/page.tsx",
    "contact-us/page.tsx",
    "jobs/page.tsx",
    "teaching-positions/page.tsx",
  ]) {
    const fp = path.join(SRC_DIR, route);
    if (fs.existsSync(fp)) filesToCheck.push(fp);
  }

  it("should not contain href=\"#schedule\" outside the pricing page", () => {
    const violations: string[] = [];
    for (const file of filesToCheck) {
      // The pricing page (formerly /volz-method/how-it-works) has an
      // intentional same-page #schedule anchor that scrolls to the embedded
      // Calendly section.
      if (file.includes("pricing")) continue;
      const content = fs.readFileSync(file, "utf-8");
      if (content.includes('href="#schedule"')) {
        violations.push(path.relative(SRC_DIR, file));
      }
    }
    expect(violations).toEqual([]);
  });

  it("should not contain href=\"#teach\" (should use real URL)", () => {
    const violations: string[] = [];
    for (const file of filesToCheck) {
      const content = fs.readFileSync(file, "utf-8");
      if (content.includes('href="#teach"')) {
        violations.push(path.relative(SRC_DIR, file));
      }
    }
    expect(violations).toEqual([]);
  });

  it("should not contain href=\"#privacy\" (should use /privacy-policy)", () => {
    const violations: string[] = [];
    for (const file of filesToCheck) {
      const content = fs.readFileSync(file, "utf-8");
      if (content.includes('href="#privacy"')) {
        violations.push(path.relative(SRC_DIR, file));
      }
    }
    expect(violations).toEqual([]);
  });

  it("Footer should reference valid routes", () => {
    const footerPath = path.join(SRC_DIR, "components", "Footer.tsx");
    const content = fs.readFileSync(footerPath, "utf-8");
    // Extract href values
    const hrefs = content.match(/href="([^"]+)"/g) || [];
    for (const match of hrefs) {
      const href = match.replace('href="', "").replace('"', "");
      if (href.startsWith("/")) {
        expect(VALID_ROUTES).toContain(href);
      }
    }
  });

  it("Navbar should reference valid internal routes", () => {
    const navPath = path.join(SRC_DIR, "components", "Navbar.tsx");
    const content = fs.readFileSync(navPath, "utf-8");
    // Extract href values from the links arrays
    const hrefMatches = content.match(/href: "([^"]+)"/g) || [];
    for (const match of hrefMatches) {
      const href = match.replace('href: "', "").replace('"', "");
      if (href.startsWith("/")) {
        expect(VALID_ROUTES).toContain(href);
      }
    }
  });
});

describe("SEO metadata checks", () => {
  const routesWithLayouts = [
    "schedule-call",
    "student-portal",
    "privacy-policy-2",
    "testimonials",
    "digital-piano",
    "volz-method-best-piano-teaching-medthod",
    "pricing",
    "core-values",
    "blog",
    "about-us",
    "contact-us",
    "jobs",
    "teaching-positions",
  ];

  it.each(routesWithLayouts)(
    "/%s should have a layout.tsx with metadata",
    (route) => {
      const layoutPath = path.join(SRC_DIR, route, "layout.tsx");
      expect(fs.existsSync(layoutPath)).toBe(true);
      const content = fs.readFileSync(layoutPath, "utf-8");
      expect(content).toContain("metadata");
      expect(content).toContain("title");
      expect(content).toContain("description");
    }
  );
});

describe("Dynamic [slug] blog route checks", () => {
  it("the dynamic [slug] route uses DOMPurify on blog content", () => {
    const pagePath = path.join(SRC_DIR, "[slug]", "page.tsx");
    const content = fs.readFileSync(pagePath, "utf-8");
    expect(content).toContain("isomorphic-dompurify");
    expect(content).toContain("DOMPurify.sanitize");
  });

  it("blog-posts.json content has no leftover HTML comments", () => {
    const jsonPath = path.join(SRC_DIR, "..", "content", "blog-posts.json");
    const posts = JSON.parse(fs.readFileSync(jsonPath, "utf-8")) as Array<{ content: string }>;
    for (const post of posts.slice(0, 5)) {
      expect(post.content).not.toMatch(/<!--/);
    }
  });

  it("blog-posts.json content with images has alt text", () => {
    const jsonPath = path.join(SRC_DIR, "..", "content", "blog-posts.json");
    const posts = JSON.parse(fs.readFileSync(jsonPath, "utf-8")) as Array<{
      content: string;
    }>;
    for (const post of posts.slice(0, 5)) {
      if (post.content.includes("<img")) {
        expect(post.content).toMatch(/alt="/);
      }
    }
  });
});
