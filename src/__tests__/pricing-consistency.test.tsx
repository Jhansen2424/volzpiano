import fs from "fs";
import path from "path";

const SRC_DIR = path.join(process.cwd(), "src");

/**
 * The canonical price range for Volz Piano lessons is $29–$52 per half hour.
 * These tests guard against silent drift in the *primary* surfaces — pricing
 * shown directly to users on canonical pages and in the chat assistant. Blog
 * posts may quote historical or third-party numbers and are intentionally
 * excluded from this audit (they are content snapshots, not live pricing).
 */
describe("Pricing consistency ($29–$52)", () => {
  const canonicalFiles = [
    "app/pricing/page.tsx",
    "app/pricing/layout.tsx",
    "app/api/chat/route.ts",
    "app/layout.tsx",
  ];

  it.each(canonicalFiles)("%s mentions the canonical $29–$52 range", (rel) => {
    const fp = path.join(SRC_DIR, rel);
    const content = fs.readFileSync(fp, "utf-8");
    // Accept any of the common forms used in code (29 and 52 nearby)
    const hasBoth = /29[\s\S]{0,40}52|"29"[\s\S]{0,200}"52"/.test(content);
    expect(hasBoth).toBe(true);
  });

  it("the how-it-works page renders the price badge with $29–$52", () => {
    const fp = path.join(SRC_DIR, "app/pricing/page.tsx");
    const content = fs.readFileSync(fp, "utf-8");
    expect(content).toMatch(/\$29[–-]\$52/);
  });

  it("no canonical page still references the old $29–$45 range", () => {
    const offenders: string[] = [];
    for (const rel of canonicalFiles) {
      const fp = path.join(SRC_DIR, rel);
      const content = fs.readFileSync(fp, "utf-8");
      if (/\$29[–-]\$45/.test(content)) offenders.push(rel);
    }
    expect(offenders).toEqual([]);
  });
});
