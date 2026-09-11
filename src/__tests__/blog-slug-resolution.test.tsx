/**
 * Guards the slug lookup used by the dynamic blog route.
 *
 * Seven WordPress imports store a percent-encoded non-breaking hyphen
 * (`%e2%80%91`, U+2011) as literal text in their slug. Because of that literal
 * `%`, the slug reaches `getPostBySlug` at a different encoding depth depending
 * on who is calling:
 *
 *   stored in JSON      ...in%e2%80%91home...       (literal percent signs)
 *   static generation   ...in%25e2%2580%2591home... (Next re-encodes the `%`)
 *   runtime request     ...in‑home...                (decoded once by the router)
 *
 * A strict string comparison missed all three, so those posts rendered
 * `notFound()` and served a hard 404 while still sitting in the sitemap and
 * being linked from the blog index.
 *
 * `legacy-url-coverage.test.tsx` only asserts that slugs are *listed* in
 * blog-slugs.json, which is why it never caught this — these tests assert that
 * every post is actually *resolvable*.
 */

import csvPosts from "@/content/blog-posts.json";
import extraPosts from "@/content/blog-posts-extra.json";
import { getPostBySlug, getPublishedPosts } from "@/lib/blog";
import { generateMetadata } from "@/app/[slug]/layout";

type StoredPost = { slug: string; title: string };

const allPosts = [
  ...(csvPosts as StoredPost[]),
  ...(extraPosts as StoredPost[]),
];

/** The slugs carrying a literal `%` — the ones that used to 404. */
const ENCODED_SLUGS = allPosts
  .map((p) => p.slug)
  .filter((slug) => slug.includes("%"));

/** What Next.js hands the route for a normal, already-decoded request. */
function asRuntimeParam(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

/** What Next.js hands the route during static generation. */
function asStaticGenerationParam(slug: string): string {
  return encodeURIComponent(slug);
}

describe("blog slug resolution", () => {
  it("finds every post by its stored slug", () => {
    const missing = allPosts
      .filter((p) => !getPostBySlug(p.slug))
      .map((p) => p.slug);
    expect(missing).toEqual([]);
  });

  it("finds every post by the runtime-decoded slug the router passes", () => {
    const missing = allPosts
      .filter((p) => !getPostBySlug(asRuntimeParam(p.slug)))
      .map((p) => p.slug);
    expect(missing).toEqual([]);
  });

  it("finds every post by the re-encoded slug static generation passes", () => {
    const missing = allPosts
      .filter((p) => !getPostBySlug(asStaticGenerationParam(p.slug)))
      .map((p) => p.slug);
    expect(missing).toEqual([]);
  });

  it("still has the percent-encoded legacy slugs in the corpus", () => {
    // If this drops to zero the slugs were rewritten, which would break URL
    // parity with the legacy WordPress site. Failing here is a prompt to check
    // that a redirect went in, not a reason to delete the test.
    expect(ENCODED_SLUGS.length).toBe(7);
  });

  it.each(ENCODED_SLUGS)("resolves the encoded legacy slug %s", (slug) => {
    for (const variant of [
      slug,
      asRuntimeParam(slug),
      asStaticGenerationParam(slug),
    ]) {
      const post = getPostBySlug(variant);
      expect(post).toBeDefined();
      expect(post?.slug).toBe(slug);
    }
  });

  it("does not resolve an unknown slug", () => {
    expect(getPostBySlug("no-such-post-exists-here")).toBeUndefined();
    expect(getPostBySlug("")).toBeUndefined();
  });

  it("keeps every slug distinct once fully decoded", () => {
    // Two posts collapsing onto one decoded form would make the lookup return
    // whichever came first — a silent wrong-page bug. Guards future imports.
    const seen = new Map<string, string>();
    const collisions: string[] = [];
    for (const { slug } of allPosts) {
      let decoded = slug;
      for (let i = 0; i < 5 && decoded.includes("%"); i++) {
        let next: string;
        try {
          next = decodeURIComponent(decoded);
        } catch {
          break;
        }
        if (next === decoded) break;
        decoded = next;
      }
      const existing = seen.get(decoded);
      if (existing) collisions.push(`${existing} <-> ${slug}`);
      else seen.set(decoded, slug);
    }
    expect(collisions).toEqual([]);
  });

  it("returns the post whose slug was asked for, not a near neighbour", () => {
    for (const { slug, title } of allPosts.slice(0, 25)) {
      expect(getPostBySlug(slug)?.title).toBe(title);
    }
  });

  it("lists every post as published", () => {
    // The 404s were invisible partly because these posts *are* published and
    // do appear in the index and sitemap — only the lookup failed.
    expect(getPublishedPosts().length).toBe(allPosts.length);
  });
});

describe("blog post metadata", () => {
  const metaFor = (slug: string) =>
    generateMetadata({ params: Promise.resolve({ slug }) });

  it("sets an absolute title so the brand template can't truncate it", async () => {
    // The root template appends " | Volz Method Piano Lessons" (28 chars).
    // These titles are long enough that the suffix was always the part Google
    // cut, so it spent title budget without ever being seen.
    const post = allPosts[0];
    const meta = await metaFor(post.slug);
    expect(meta.title).toEqual({ absolute: post.title });
  });

  it("keeps every rendered title free of the brand suffix", async () => {
    const withSuffix: string[] = [];
    for (const post of allPosts) {
      const meta = await metaFor(post.slug);
      const title = (meta.title as { absolute?: string })?.absolute;
      if (!title || title.includes("| Volz Method Piano Lessons")) {
        withSuffix.push(post.slug);
      }
    }
    expect(withSuffix).toEqual([]);
  });

  it("produces real metadata for the previously-404ing encoded slugs", async () => {
    for (const slug of ENCODED_SLUGS) {
      // Ask the way the router does at runtime — already decoded.
      const meta = await metaFor(asRuntimeParam(slug));
      const title = (meta.title as { absolute?: string })?.absolute;
      expect(title).toBeTruthy();
      expect(meta.description).toBeTruthy();
      // The old failure mode returned {}, which let the canonical fall back to
      // the site root — telling Google the post *was* the homepage.
      expect(meta.alternates?.canonical).toBe(`/${slug}`);
    }
  });
});
