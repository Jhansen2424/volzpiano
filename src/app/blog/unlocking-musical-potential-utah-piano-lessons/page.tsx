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

  const content = `<p>Are you searching for the perfect harmonies to strike a chord with your passion for music? Look no further! If you're in Utah and seeking the finest piano lessons, you're in for a melodious journey through the vibrant musical landscape of the Beehive State.</p>

<h2 class="wp-block-heading"><strong>Exploring Piano Lessons in Salt Lake City, Utah</strong></h2>

<p>Utah's capital, Salt Lake City, resonates with the enchanting symphonies of piano enthusiasts. Whether you're a novice or a virtuoso seeking to fine-tune your skills, there's a plethora of options available for piano lessons in Salt Lake City, Utah.</p>

<h3 class="wp-block-heading"><strong>Dive into the World of Piano Lessons: Layton, Logan, Ogden, Orem, and Sandy, Utah</strong></h3>

<p>Venturing beyond Salt Lake City, the heartwarming melodies continue across Layton, Logan, Ogden, Orem, and Sandy. These diverse locales in Utah embrace the artistry of piano instruction, offering tailored lessons for all skill levels.</p>

<h3 class="wp-block-heading"><strong>Discovering the Maestros: Teachers Shaping Melodic Dreams</strong></h3>

<p>Behind every musical prodigy lies a skilled mentor. Utah boasts an array of accomplished teachers, each eager to sculpt budding talents into pianistic virtuosos. These educators are committed to nurturing your musical aspirations, guiding you through scales, chords, and compositions with expertise and patience.</p>

<h3 class="wp-block-heading"><strong>Exploring Piano Studies at Universities in Utah</strong></h3>

<p>Utah's universities resonate with the symphony of higher education in music. Many institutions offer specialized programs and courses catering to piano enthusiasts, fostering a community of passionate learners striving for musical excellence.</p>

<h3 class="wp-block-heading"><strong>Counting the Cost: Affordable Options for Piano Lessons in Utah</strong></h3>

<p>Embarking on a musical journey shouldn't break the bank. Discover cost-effective piano lessons across Utah without compromising on quality. Unearth budget-friendly options that resonate harmoniously with your financial plans.</p>

<h3 class="wp-block-heading"><strong>Harmonizing with the Keys: Beginner-Friendly Piano Lessons</strong></h3>

<p>For those taking their initial steps into the world of piano, finding beginner-friendly lessons is pivotal. Utah embraces novices, offering tailored programs designed to introduce budding pianists to the fundamentals while fostering a love for playing.</p>`;

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
            Unlocking Musical Potential: Utah Piano Lessons
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            December 04, 2023
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/unlocking-musical-potential-utah-piano-lessons.jpg"
              alt="Featured image for Unlocking Musical Potential: Utah Piano Lessons"
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
