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

  const content = `<h3 class="wp-block-heading"><strong>Exploring Piano Lessons in Salt Lake City:</strong></h3>

<p>Salt Lake City boasts a vibrant musical scene and an array of skilled piano instructors catering to different age groups and skill levels. From kids' piano lessons to tailored sessions for adults, finding the right piano instructor to nurture your musical aspirations is essential.</p>

<ul>
<li>Kids Piano Lessons Salt Lake City: Understanding the specialized approach required for teaching kids piano in Salt Lake City, focusing on engaging methods and tailored curriculum to foster their musical growth.</li>

<li>Adult Piano Lessons Salt Lake City: Delving into the unique approach of piano lessons designed specifically for adults, catering to varying skill levels and individual learning preferences.</li>

<li>Beginner Piano Lessons Salt Lake: A comprehensive guide to beginner piano lessons in Salt Lake City, covering everything from foundational skills to nurturing a passion for music.</li>
</ul>

<ul>
<li>Piano Lessons in Salt Lake City Utah: Exploring the availability and diversity of piano lessons within Salt Lake City, Utah, and the surrounding areas.</li>

<li>Salt Lake City Piano Lessons: Highlighting the city's diverse options for piano lessons, emphasizing its rich musical culture and the various programs available.</li>

<li>How Much Do Piano Lessons Cost in Salt Lake City: Understanding the cost factors associated with piano lessons and providing insights into budgeting for music education in Salt Lake City.</li>
</ul>

<ul>
<li>For Beginners: Tailoring lessons specifically for beginners, emphasizing foundational skills and nurturing a love for music from the start.</li>

<li>Weekend: Exploring options for piano lessons available during weekends to accommodate busy schedules in Salt Lake City.</li>

<li>In Person: Emphasizing the importance and availability of in-person piano lessons for a more immersive learning experience.</li>

<li>Nearby: Highlighting the convenience of finding piano lessons located nearby or within close proximity in Salt Lake City.</li>
</ul>`;

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
            Mastering the Melodies: Salt Lake Piano Lessons for All Ages and Skill Levels
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            December 01, 2023
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/mastering-the-melodies-salt-lake-piano-lessons-for-all-ages-and-skill-levels.jpg"
              alt="Featured image for Mastering the Melodies: Salt Lake Piano Lessons for All Ages and Skill Levels"
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
