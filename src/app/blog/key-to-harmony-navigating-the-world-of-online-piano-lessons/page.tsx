"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

/* Animated wrapper */
function AnimatedSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function BlogPostPage() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const content = `<p>Embark on a melodic journey with our guide to online piano lessons, offering a harmonious blend of accessibility and flexibility. Whether you're an adult, a beginner, or searching for free resources, we've curated the ultimate resource for all your piano learning needs.</p>

<h2 class="wp-block-heading">Section 1: The Pinnacle of Excellence: Best Online Piano Lessons</h2>

<h3 class="wp-block-heading"><em>Best online piano lessons, Long Tail Keyword: best online piano lessons</em></h3>

<p>Dive into the world of superior online piano lessons, exploring platforms that stand out in terms of curriculum, teaching methods, and user satisfaction. Find the ideal program that suits your musical aspirations.</p>

<h2 class="wp-block-heading">Section 2: Virtuoso on a Budget: Free Online Piano Lessons</h2>

<h3 class="wp-block-heading"><em>Piano lessons online free, Long Tail Keyword: free online piano lessons</em></h3>

<p>Unlock the secrets to free online piano lessons, delving into platforms that offer quality instruction without a price tag. Discover how to nurture your musical talents without breaking the bank.</p>

<h2 class="wp-block-heading">Section 3: Tailored for Adults: Online Piano Lessons for Grown-Ups</h2>

<h3 class="wp-block-heading"><strong><em>Online piano lessons for adults : for adults</em></strong></h3>

<p>Explore the world of online piano lessons designed specifically for adults. From foundational skills to advanced techniques, find the perfect program that aligns with your schedule and learning preferences.</p>

<h2 class="wp-block-heading">Section 4: Bridging the Generations: Online Piano Lessons for Kids</h2>

<h3 class="wp-block-heading"><strong><em>online piano lessons for kids : for kids</em></strong></h3>

<p>Introduce your little ones to the wonders of music with online piano lessons catered to kids. Discover engaging platforms that make learning the piano a delightful and educational experience for children.</p>

<h2 class="wp-block-heading">Section 5: The Beginner's Prelude: Online Piano Lessons for Starters</h2>

<h3 class="wp-block-heading"><strong><em>For beginners</em></strong></h3>

<p>Uncover the essential elements of online piano lessons crafted for beginners. Whether you're new to music or transitioning from another instrument, we'll guide you through the foundational steps to becoming a proficient pianist.</p>

<h2 class="wp-block-heading"><strong>A Symphony at Your Fingertips</strong></h2>

<p>With the world of online piano lessons at your fingertips, the journey to musical mastery has never been more accessible. Whether you're an adult seeking personalized instruction or a parent looking for engaging lessons for your child, find the perfect harmony online. Start your musical adventure today!</p>`;

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-zinc-900 pt-24">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full opacity-15 blur-[120px]"
          style={{ background: "radial-gradient(circle, #6343d4 0%, transparent 70%)" }}
        />
        <div className="relative z-[2] text-center px-6">
          <span
            className="inline-block rounded-full bg-brand/20 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand mb-6"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.5s ease-out 0.1s",
            }}
          >
            Blog
          </span>
          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl max-w-4xl mx-auto"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease-out 0.2s",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            Key to Harmony: Navigating the World of Online Piano Lessons
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            January 17, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/key-to-harmony-navigating-the-world-of-online-piano-lessons.png"
              alt="Featured image for Key to Harmony: Navigating the World of Online Piano Lessons"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
          </div>
        </AnimatedSection>
      </div>
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
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
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
