/**
 * The blog sanitizer (src/lib/sanitize.ts) must strip anything executable while
 * keeping ordinary article markup, and the blog route must never depend on
 * jsdom again: Next loads jsdom as an external package through a symlink that
 * isn't available at runtime on Vercel, which made every on-demand render of
 * the route return a 500.
 */
import fs from "fs";
import path from "path";
import { sanitizePostHtml } from "@/lib/sanitize";

describe("sanitizePostHtml", () => {
  it("removes scripts, event handlers and javascript: links", () => {
    const out = sanitizePostHtml(
      '<p onclick="steal()">Hi<script>alert(1)</script></p><a href="javascript:alert(1)">x</a><img src="x.png" onerror="steal()">'
    );
    expect(out).not.toMatch(/script|onclick|onerror|javascript:/i);
    expect(out).toContain("<p>Hi</p>");
  });

  it("removes iframes, forms and document-level tags, including <title> text", () => {
    const out = sanitizePostHtml(
      '<title>Stray WordPress title</title><meta charset="utf-8"><iframe src="https://evil.example"></iframe><form><input></form><p>Body</p>'
    );
    expect(out).toBe("<p>Body</p>");
  });

  it("drops target attributes, as DOMPurify did, but keeps href and rel", () => {
    const out = sanitizePostHtml('<a href="https://example.com" target="_blank" rel="noopener">Link</a>');
    expect(out).toBe('<a href="https://example.com" rel="noopener">Link</a>');
  });

  it("keeps ordinary article markup, ids and inline styles", () => {
    const html =
      '<h2 id="method" class="wp-block-heading">Heading</h2><ul><li style="font-weight: 400" aria-level="1"><strong>Bold</strong> <em>text</em></li></ul><details><summary>Q</summary><p>A</p></details>';
    expect(sanitizePostHtml(html)).toBe(html);
  });
});

describe("blog route dependencies", () => {
  it("never imports jsdom or isomorphic-dompurify", () => {
    const route = fs.readFileSync(path.join(process.cwd(), "src", "app", "[slug]", "page.tsx"), "utf8");
    const lib = fs.readFileSync(path.join(process.cwd(), "src", "lib", "sanitize.ts"), "utf8");
    for (const src of [route, lib]) {
      expect(src).not.toMatch(/from ["'](isomorphic-dompurify|jsdom|dompurify)["']/);
    }
  });
});
