import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serializeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";
import blogPosts from "@/content/blog-posts.json";

type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  dateIso: string;
  formattedDate: string;
  image: string;
  content: string;
};

const postBySlug = new Map<string, BlogPost>(
  (blogPosts as BlogPost[]).map((p) => [p.slug, p])
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug.get(slug);
  if (!post) return {};

  const canonical = `/${post.slug}`;
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
  const post = postBySlug.get(slug);
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
    mainEntityOfPage: `${SITE_URL}/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />
      {children}
    </>
  );
}
