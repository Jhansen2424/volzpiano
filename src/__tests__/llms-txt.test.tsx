/**
 * Guards public/llms.txt, the plain-text summary AI assistants read.
 *
 * It's a static file, so nothing ties it to the rest of the site: it once
 * claimed 5.0 stars while the page and the business schema said 4.9. AI
 * answers trust a business less when its facts disagree, so these check the
 * facts it shares with src/lib/site.ts and that every link still resolves.
 */
import * as fs from "fs";
import * as path from "path";
import { PHONE_E164, RATING, REVIEW_COUNT, SITE_URL } from "@/lib/site";

const ROOT = path.join(__dirname, "..", "..");
const llms = fs.readFileSync(path.join(ROOT, "public", "llms.txt"), "utf8");

describe("llms.txt", () => {
  it("states the same Google rating and review count as the site", () => {
    expect(llms).toContain(`${RATING} stars from ${REVIEW_COUNT} Google reviews`);
  });

  it("lists the business phone the schema declares", () => {
    // +13854820122 -> (385) 482-0122
    const digits = PHONE_E164.replace(/^\+1/, "");
    const pretty = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    expect(llms).toContain(pretty);
  });

  it("only links to pages that exist", () => {
    const urls = llms.match(/https:\/\/www\.volzpiano\.com\/[^\s)]*/g) ?? [];
    expect(urls.length).toBeGreaterThan(10);
    for (const url of urls) {
      expect(url.startsWith(SITE_URL)).toBe(true);
      const route = new URL(url).pathname.replace(/\/$/, "");
      const dir = path.join(ROOT, "src", "app", route);
      const exists =
        route === "" || fs.existsSync(path.join(dir, "page.tsx")) || fs.existsSync(path.join(dir, "page.ts"));
      if (!exists) throw new Error(`llms.txt links to ${url}, which has no page`);
    }
  });
});
