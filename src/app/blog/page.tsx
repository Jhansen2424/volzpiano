import BlogIndexClient, { type IndexPost } from "./BlogIndexClient";
import { getPublishedPosts } from "@/lib/blog";

// Re-render the index hourly so scheduled posts appear without redeploys.
export const revalidate = 3600;

export default function BlogIndexPage() {
  const posts: IndexPost[] = getPublishedPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.description,
    tag: p.category,
    image: p.image,
  }));
  return <BlogIndexClient posts={posts} />;
}
