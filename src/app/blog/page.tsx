"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════
   Blog Posts Data
   ═══════════════════════════════════════════ */
const posts = [
  {
    slug: "best-age-to-start-piano-lessons",
    title: "What Is the Best Age to Start Piano Lessons?",
    excerpt:
      "Ages 5 to 9 is the sweet spot — but readiness matters more than a number. Here's how to tell if your child is ready, plus what you can do right now if they're younger.",
    tag: "Getting Started",
  },
  {
    slug: "how-to-motivate-your-child-to-practice-piano",
    title: "How to Motivate Your Child to Practice Piano (Without the Daily Battle)",
    excerpt:
      "If piano practice has become a nightly argument, the problem probably isn't your child. Learn the intrinsic motivation framework that actually works.",
    tag: "Practice Tips",
  },
  {
    slug: "piano-lessons-vs-apps",
    title: "Piano Lessons vs. Piano Apps: What Actually Works for Kids?",
    excerpt:
      "Simply Piano and Yousician promise to teach piano for a fraction of the cost. But do kids actually need a real teacher? An honest, balanced comparison.",
    tag: "Choosing Lessons",
  },
];

/* ═══════════════════════════════════════════
   Post Card
   ═══════════════════════════════════════════ */
function PostCard({
  post,
  index,
}: {
  post: (typeof posts)[number];
  index: number;
}) {
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
        href={`/blog/${post.slug}`}
        className="group block rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <span className="inline-block rounded-full bg-orange-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-brand">
          {post.tag}
        </span>
        <h2 className="mt-4 text-xl font-extrabold text-zinc-900 sm:text-2xl group-hover:text-orange-brand transition-colors duration-200">
          {post.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500 sm:text-base">
          {post.excerpt}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange-brand">
          Read article
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </span>
      </Link>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Page
   ═══════════════════════════════════════════ */
export default function BlogIndexPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-zinc-900 pt-24">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full opacity-15 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #f27a1a 0%, transparent 70%)",
          }}
        />

        <div className="relative z-[2] text-center px-6">
          <h1
            className="text-5xl font-extrabold text-white sm:text-6xl lg:text-7xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease-out 0.2s",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            The Volz <span className="text-orange-brand">Blog</span>
          </h1>
          <p
            className="mt-6 mx-auto max-w-2xl text-lg text-white/60 sm:text-xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease-out 0.5s",
            }}
          >
            Tips, insights, and guides for parents navigating their child&apos;s
            piano journey.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* ── Posts Grid ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
