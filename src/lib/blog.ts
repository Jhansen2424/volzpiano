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

export function getPostBySlug(
  slug: string,
  now: Date = new Date()
): BlogPost | undefined {
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return undefined;
  if (!isPublished(post, now)) return undefined;
  return post;
}

export function getAllPublishedSlugs(now: Date = new Date()): string[] {
  return allPosts.filter((p) => isPublished(p, now)).map((p) => p.slug);
}
