import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import AnimatedSection from "@/app/components/AnimatedSection";
import { getAllPublishedSlugs, getPostBySlug } from "@/lib/blog";

// Re-render at most once per hour. Combined with `dynamicParams = true`,
// scheduled posts go live within an hour of their publishDate without a
// redeploy (Vercel ISR).
export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  // Pre-render every currently-published post at build time. New posts
  // (publishDate in the future) get rendered on-demand once their date
  // passes — courtesy of dynamicParams = true.
  return getAllPublishedSlugs().map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Sanitize at build time — DOMPurify is isomorphic so this runs server-side.
  const sanitizedHtml = DOMPurify.sanitize(post.content);

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-zinc-900 pt-24">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full opacity-15 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #6343d4 0%, transparent 70%)",
          }}
        />
        <div className="relative z-[2] text-center px-6">
          <span className="inline-block rounded-full bg-brand/20 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand mb-6">
            {post.category}
          </span>
          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl max-w-4xl mx-auto"
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
          >
            {post.title}
          </h1>
          {post.formattedDate && (
            <p className="mt-4 text-white/50 text-sm">{post.formattedDate}</p>
          )}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      {post.image && (
        <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl h-64 sm:h-80 lg:h-96">
              <Image
                src={post.image}
                alt={`Featured image for ${post.title}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1024px"
                className="object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      )}

      {/* Content */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-12">
          <AnimatedSection>
            <article
              className="prose prose-zinc prose-lg max-w-none
                prose-headings:font-extrabold prose-headings:text-zinc-900
                prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-l-4 prose-h2:border-brand prose-h2:pl-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-zinc-600 prose-p:leading-relaxed
                prose-a:text-brand prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-zinc-800
                prose-ul:text-zinc-600 prose-ol:text-zinc-600
                prose-li:marker:text-brand
                prose-img:rounded-xl prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
          </AnimatedSection>

          {/* Back link */}
          <AnimatedSection delay={0.2} className="mt-16 pt-8 border-t border-zinc-200">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
            >
              <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Back to all articles
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
