import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serializeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";
import { getPostBySlug } from "@/lib/blog";

/**
 * Duplicate WordPress imports: these "-2" URLs are near-identical copies of the
 * originals. We keep the URLs live (slug parity, no redirects) but point their
 * canonical at the original so Google consolidates the duplicate signals instead
 * of splitting ranking between two competing pages.
 */
const CANONICAL_OVERRIDES: Record<string, string> = {
  "start-your-musical-journey-with-beginners-piano-lessons-at-volz-piano-2":
    "start-your-musical-journey-with-beginners-piano-lessons-at-volz-piano",
  "discover-the-joy-of-music-with-salt-lake-piano-lessons-at-volz-piano-2":
    "discover-the-joy-of-music-with-salt-lake-piano-lessons-at-volz-piano",
  "elevate-your-music-journey-with-orem-piano-lessons-at-volz-piano-2":
    "elevate-your-music-journey-with-orem-piano-lessons-at-volz-piano",
  "master-the-art-of-piano-with-utah-piano-lessons-at-volz-piano-2":
    "master-the-art-of-piano-with-utah-piano-lessons-at-volz-piano",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const canonical = `/${CANONICAL_OVERRIDES[post.slug] || post.slug}`;
  const imageRelative = post.image || undefined;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      type: "article",
      publishedTime: post.dateIso || undefined,
      images: imageRelative ? [imageRelative] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: imageRelative ? [imageRelative] : undefined,
    },
  };
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image ? `${SITE_URL}${post.image}` : undefined,
    datePublished: post.dateIso || undefined,
    dateModified: post.dateIso || undefined,
    author: {
      "@type": "Organization",
      name: "Volz Method Piano Lessons",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Volz Method Piano Lessons",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/${CANONICAL_OVERRIDES[post.slug] || post.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
