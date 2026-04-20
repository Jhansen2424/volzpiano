"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type IndexPost = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  image: string;
};

const POSTS_PER_PAGE = 12;

function PostCard({ post, index }: { post: IndexPost; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `all 0.6s ease-out ${index * 0.12}s`,
      }}
    >
      <Link
        href={`/${post.slug}`}
        className="group block overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        {post.image && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-8">
          <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
            {post.tag}
          </span>
          <h2 className="mt-4 text-xl font-extrabold text-zinc-900 transition-colors duration-200 group-hover:text-brand sm:text-2xl">
            {post.title}
          </h2>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-500 sm:text-base">
            {post.excerpt}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand">
            Read article
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </Link>
    </div>
  );
}

export default function BlogIndexClient({ posts }: { posts: IndexPost[] }) {
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const allTags = Array.from(new Set(posts.map((p) => p.tag))).sort();

  const filtered = posts.filter((post) => {
    const matchesSearch =
      !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || post.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paged = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  // React 19 derived-state pattern: reset page 1 when filters change
  const [prevFilters, setPrevFilters] = useState({ searchTerm, selectedTag });
  if (prevFilters.searchTerm !== searchTerm || prevFilters.selectedTag !== selectedTag) {
    setPage(1);
    setPrevFilters({ searchTerm, selectedTag });
  }

  const goToPage = (p: number) => {
    setPage(p);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-zinc-900 pt-24">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full opacity-15 blur-[120px]"
          style={{ background: "radial-gradient(circle, #6343d4 0%, transparent 70%)" }}
        />
        <div className="relative z-[2] px-6 text-center">
          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease-out 0.2s",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            The Volz <span className="text-brand">Blog</span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg text-white/60 sm:text-xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease-out 0.5s",
            }}
          >
            Tips, insights, and guides for parents navigating their child&apos;s piano journey.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 z-[1] h-24 w-full bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Filter bar */}
      <section className="bg-white pb-4 pt-12">
        <div className="mx-auto max-w-5xl px-6 sm:px-12">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-700 placeholder:text-zinc-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand sm:w-72"
            />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
                  !selectedTag
                    ? "bg-brand text-white"
                    : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
                    tag === selectedTag
                      ? "bg-brand text-white"
                      : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section ref={gridRef} className="scroll-mt-8 bg-white py-8 sm:py-16">
        <div className="mx-auto max-w-5xl px-6 sm:px-12">
          {filtered.length === 0 && (
            <p className="py-12 text-center text-zinc-400">No articles found.</p>
          )}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {paged.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-500 transition-colors hover:bg-zinc-100 disabled:pointer-events-none disabled:opacity-30"
              >
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                .reduce<(number | "dots")[]>((acc, p, idx, arr) => {
                  if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("dots");
                  acc.push(p);
                  return acc;
                }, [])
                .map((item, idx) =>
                  item === "dots" ? (
                    <span key={`dots-${idx}`} className="px-1 text-zinc-300">
                      …
                    </span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => goToPage(item as number)}
                      className={`min-w-[2.25rem] rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                        item === page
                          ? "bg-brand text-white shadow-sm"
                          : "text-zinc-500 hover:bg-zinc-100"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-500 transition-colors hover:bg-zinc-100 disabled:pointer-events-none disabled:opacity-30"
              >
                Next →
              </button>
            </nav>
          )}
        </div>
      </section>
    </main>
  );
}
