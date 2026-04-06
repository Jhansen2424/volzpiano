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
  "/digital-piano-deal",
  "/volz-method",
  "/volz-method/how-it-works",
  "/volz-method/core-values",
  "/schedule-call",
  "/teaching-positions",
  "/student-portal",
  "/privacy-policy",
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
    "teaching-positions/page.tsx",
    "student-portal/page.tsx",
    "privacy-policy/page.tsx",
    "testimonials/page.tsx",
    "digital-piano-deal/page.tsx",
    "volz-method/page.tsx",
    "volz-method/how-it-works/page.tsx",
    "volz-method/core-values/page.tsx",
  ]) {
    const fp = path.join(SRC_DIR, route);
    if (fs.existsSync(fp)) filesToCheck.push(fp);
  }

  it("should not contain href=\"#schedule\" outside how-it-works", () => {
    const violations: string[] = [];
    for (const file of filesToCheck) {
      if (file.includes("how-it-works")) continue;
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
    "teaching-positions",
    "student-portal",
    "privacy-policy",
    "testimonials",
    "digital-piano-deal",
    "volz-method",
    "blog",
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

describe("Blog post template checks", () => {
  it("generated blog posts should import DOMPurify", () => {
    // Check a sample generated blog post
    const blogDir = path.join(SRC_DIR, "blog");
    const dirs = fs.readdirSync(blogDir, { withFileTypes: true });
    const sampleDir = dirs.find(
      (d) =>
        d.isDirectory() &&
        d.name !== "best-age-to-start-piano-lessons" &&
        d.name !== "how-to-motivate-your-child-to-practice-piano" &&
        d.name !== "piano-lessons-vs-apps"
    );
    expect(sampleDir).toBeDefined();
    const pagePath = path.join(blogDir, sampleDir!.name, "page.tsx");
    const content = fs.readFileSync(pagePath, "utf-8");
    expect(content).toContain("isomorphic-dompurify");
    expect(content).toContain("DOMPurify.sanitize");
  });

  it("generated blog posts should not contain HTML comments", () => {
    const blogDir = path.join(SRC_DIR, "blog");
    const dirs = fs.readdirSync(blogDir, { withFileTypes: true });
    // Check 5 random generated posts
    const generatedDirs = dirs
      .filter(
        (d) =>
          d.isDirectory() &&
          d.name !== "best-age-to-start-piano-lessons" &&
          d.name !== "how-to-motivate-your-child-to-practice-piano" &&
          d.name !== "piano-lessons-vs-apps"
      )
      .slice(0, 5);

    for (const dir of generatedDirs) {
      const pagePath = path.join(blogDir, dir.name, "page.tsx");
      const content = fs.readFileSync(pagePath, "utf-8");
      // Should not have HTML comments in the content template literal
      // (JSX comments {/* */} are fine)
      const templateMatch = content.match(/const content = `([\s\S]*?)`;/);
      if (templateMatch) {
        expect(templateMatch[1]).not.toMatch(/<!--/);
      }
    }
  });

  it("generated blog posts with images should have alt text", () => {
    const blogDir = path.join(SRC_DIR, "blog");
    const dirs = fs.readdirSync(blogDir, { withFileTypes: true });
    const generatedDirs = dirs
      .filter(
        (d) =>
          d.isDirectory() &&
          d.name !== "best-age-to-start-piano-lessons" &&
          d.name !== "how-to-motivate-your-child-to-practice-piano" &&
          d.name !== "piano-lessons-vs-apps"
      )
      .slice(0, 5);

    for (const dir of generatedDirs) {
      const pagePath = path.join(blogDir, dir.name, "page.tsx");
      const content = fs.readFileSync(pagePath, "utf-8");
      if (content.includes("blog-images")) {
        expect(content).toMatch(/alt="Featured image for/);
      }
    }
  });
});
