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

  const content = `<p>Embarking on a musical journey is a timeless endeavor, and our guide is here to assist you in finding the perfect piano lessons for adults. Whether you're seeking affordability, privacy, or specialized lessons, we've curated a comprehensive resource to meet your unique needs.</p>

<h2 class="wp-block-heading">Section 1: The Quest for Adult Piano Lessons: A Local Exploration</h2>

<h3 class="wp-block-heading"><em>Piano lessons for adults near me</em></h3>

<p>Delve into the local landscape of adult piano lessons. Discover the benefits of proximity and community as we explore options available right in your neighborhood.</p>

<h2 class="wp-block-heading">Section 2: Affordable Melodies: Cheap Piano Lessons for Adults Near Me</h2>

<h3 class="wp-block-heading"><em>Cheap piano lessons near me for adults : Cheap</em></h3>

<p>Uncover budget-friendly options that don't compromise on quality. We'll guide you through affordable piano lessons, ensuring that your musical pursuit doesn't strain your wallet.</p>

<h2 class="wp-block-heading">Section 3: Tailored Learning: Private Piano Lessons for Adults Near Me</h2>

<h3 class="wp-block-heading"><em>Private piano lessons for adults near me</em></h3>

<p>Seeking a personalized approach? Explore the advantages of private piano lessons tailored to the specific needs and pace of adult learners.</p>

<h2 class="wp-block-heading">Section 4: Harmonizing Without Cost: Free Piano Lessons for Adults Near Me</h2>

<h3 class="wp-block-heading"><em>Free piano lessons for adults near me</em></h3>

<p>Discover high-quality, no-cost resources for adults eager to learn the piano. We'll unveil platforms and opportunities that make music education accessible to everyone.</p>

<h2 class="wp-block-heading">Section 5: Diverse Learning Paths: Group Piano Lessons for Adults Near Me</h2>

<h3 class="wp-block-heading">Group piano lessons for adults near me</h3>

<p>Explore the benefits of collaborative learning in a group setting. Engage with fellow enthusiasts as we unravel the advantages of group piano lessons for adults.</p>

<h2 class="wp-block-heading">Section 6: Targeting Different Audiences</h2>

<p>Tailor your piano lessons experience based on unique considerations such as age and special needs. Discover programs catering to beginners, toddlers, seniors, and those with autism, ensuring inclusivity in your musical journey.</p>

<h2 class="wp-block-heading"><strong>A Symphony of Possibilities</strong></h2>

<p>Embark on a harmonious adventure of adult piano lessons, discovering the perfect blend of proximity, affordability, and personalized learning. Whether you're a beginner, senior, or seeking lessons for someone with unique needs, let the music play and guide you through a fulfilling musical experience. Start your journey today!</p>`;

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
            Striking the Right Chord: Finding Ideal Piano Lessons for Adults Near You
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            January 11, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/striking-the-right-chord-finding-ideal-piano-lessons-for-adults-near-you.png"
              alt="Featured image for Striking the Right Chord: Finding Ideal Piano Lessons for Adults Near You"
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
