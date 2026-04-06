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

  const content = `<p>Welcome to our comprehensive guide on piano lessons for kids – a gateway to fostering a lifelong love for music. Whether you're seeking the best online options, local classes, or even exploring free resources, we've got you covered. Let's embark on this musical journey together!</p>

<h2 class="wp-block-heading">Section 1: The Importance of Piano Lessons for Kids</h2>

<p>In this section, we'll delve into the myriad benefits of introducing your child to piano lessons. From cognitive development to enhanced creativity, discover why piano lessons are an investment in your child's overall growth.</p>

<h2 class="wp-block-heading">Section 2: Finding the Best Piano Lessons for Kids Online</h2>

<h3 class="wp-block-heading"><em>Best online piano lessons for kids</em></h3>

<p>Uncover the top online platforms that offer engaging and effective piano lessons tailored for kids. We'll explore features, user reviews, and what sets each option apart, helping you make an informed decision for your child's musical education.</p>

<h2 class="wp-block-heading">Section 3: Local Piano Lessons for Kids: A Community Connection</h2>

<h3 class="wp-block-heading"><em>Piano lessons for kids near me</em></h3>

<p>Discover the advantages of enrolling your child in local piano classes. We'll discuss the importance of community, the convenience of proximity, and how these lessons can be a stepping stone to a broader musical experience.</p>

<h2 class="wp-block-heading">Section 4: Budget-Friendly Options: Free Piano Lessons for Kids</h2>

<h3 class="wp-block-heading"><em>Free piano lessons for kids</em></h3>

<p>For parents on a budget, we've compiled a list of reputable platforms offering free piano lessons for kids. Unearth hidden gems and explore how these resources can kickstart your child's musical journey without breaking the bank.</p>

<h2 class="wp-block-heading">Section 5: Navigating Beginner Piano Lessons for Kids</h2>

<h3 class="wp-block-heading"><em>beginner piano lessons for kids, piano lessons for kids near me</em></h3>

<p>Embark on the basics of piano education for children. We'll guide you through the fundamental steps, explore beginner-friendly lesson plans, and discuss the importance of foundational skills.</p>

<h2 class="wp-block-heading">Section 6: Addressing Common Concerns - LSI Keywords Insight</h2>

<h3 class="wp-block-heading"><em>near me, cost, how much, beginners</em></h3>

<p>Dig deeper into common concerns such as the proximity of piano lessons, understanding the costs involved, and catering to beginners. Gain insights that address your specific queries and streamline your decision-making process.</p>`;

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
            Unlocking Musical Potential: The Ultimate Guide to Piano Lessons for Kids
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            January 03, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/unlocking-musical-potential-the-ultimate-guide-to-piano-lessons-for-kids.png"
              alt="Featured image for Unlocking Musical Potential: The Ultimate Guide to Piano Lessons for Kids"
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
