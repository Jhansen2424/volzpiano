import csvPosts from "@/content/blog-posts.json";
import extraPosts from "@/content/blog-posts-extra.json";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  dateIso: string;
  formattedDate: string;
  image: string;
  content: string;
  /**
   * ISO datetime when this post should become visible. Posts whose
   * publishDate is in the future are hidden everywhere — index, sitemap,
   * dynamic [slug] route. Omit/empty for posts that should be visible
   * immediately (the WordPress import doesn't carry this field).
   */
  publishDate?: string;
};

const allPosts: BlogPost[] = [
  ...(csvPosts as BlogPost[]),
  ...(extraPosts as BlogPost[]),
];

export function isPublished(post: BlogPost, now: Date = new Date()): boolean {
  if (!post.publishDate) return true;
  const ts = Date.parse(post.publishDate);
  if (Number.isNaN(ts)) return true; // bad date string -> treat as published
  return ts <= now.getTime();
}

export function getPublishedPosts(now: Date = new Date()): BlogPost[] {
  return allPosts
    .filter((p) => isPublished(p, now))
    .sort((a, b) => {
      // Newest first by best available date signal
      const aKey = a.publishDate || a.dateIso || a.date || "";
      const bKey = b.publishDate || b.dateIso || b.date || "";
      return bKey.localeCompare(aKey);
    });
}

/**
 * Percent-decode repeatedly until the value stops changing, so that singly-
 * and doubly-encoded spellings of the same slug collapse onto one form.
 * Falls back to the last good value if a step hits a malformed escape
 * sequence (decodeURIComponent throws on those). The iteration cap is a
 * guard against pathological input; real slugs settle in one or two passes.
 */
function fullyDecodeSlug(slug: string): string {
  let current = slug;
  for (let i = 0; i < 5; i++) {
    if (!current.includes("%")) break;
    let next: string;
    try {
      next = decodeURIComponent(current);
    } catch {
      break;
    }
    if (next === current) break;
    current = next;
  }
  return current;
}

/**
 * Seven WordPress imports carry a percent-encoded non-breaking hyphen
 * (`%e2%80%91`, U+2011) as *literal text* inside their stored slug — e.g.
 * `the-ultimate-guide-to-in%e2%80%91home-piano-lessons-for-kids-in-utah`.
 *
 * That literal `%` means the slug reaches this lookup at a different encoding
 * depth depending on the caller, and a strict comparison misses every time:
 *
 *   stored in JSON      ...in%e2%80%91home...      (literal percent signs)
 *   static generation   ...in%25e2%2580%2591home... (Next re-encodes the `%`)
 *   runtime request     ...in‑home...               (decoded once by the router)
 *
 * The result was seven published posts serving a hard 404 while still being
 * listed in the sitemap and linked from the blog index.
 *
 * So the index below holds up to two keys per post — the slug exactly as
 * stored, and its fully-decoded spelling — which lets a lookup resolve any of
 * those three forms without changing a single URL. The legacy WordPress
 * addresses keep working exactly as they are, and the canonical tag is always
 * built from the stored slug, so encoding variants consolidate rather than
 * competing. Verified collision-free across the corpus: all 229 slugs stay
 * distinct once fully decoded, and slugs without a `%` are untouched.
 */
const postsBySlug = new Map<string, BlogPost>();

// Exact stored slugs first, so they always win the key.
for (const post of allPosts) postsBySlug.set(post.slug, post);
// Then the decoded spelling of the seven that need it, without ever
// displacing a post that genuinely owns that slug.
for (const post of allPosts) {
  const decoded = fullyDecodeSlug(post.slug);
  if (decoded !== post.slug && !postsBySlug.has(decoded)) {
    postsBySlug.set(decoded, post);
  }
}

export function getPostBySlug(
  slug: string,
  now: Date = new Date()
): BlogPost | undefined {
  // Try the slug as given, then its decoded form. Indexing up front keeps
  // this O(1) — matching by scanning would re-decode all 229 stored slugs on
  // every lookup, once per page, on every build.
  const post = postsBySlug.get(slug) ?? postsBySlug.get(fullyDecodeSlug(slug));
  if (!post) return undefined;
  if (!isPublished(post, now)) return undefined;
  return post;
}

export function getAllPublishedSlugs(now: Date = new Date()): string[] {
  return allPosts.filter((p) => isPublished(p, now)).map((p) => p.slug);
}
