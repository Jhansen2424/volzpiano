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

  const content = `<p>Welcome to the heart of musical learning in Utah—where the art of piano is not just taught, but passionately shared. At Volz Piano, we specialize in Salt Lake piano lessons, catering to a wide range of students from the bustling streets of Salt Lake City. Whether you're a complete beginner eager to explore the world of music or an adult looking to rekindle your love for the piano, our doors are open to all.</p>

<h2 class="wp-block-heading"><strong>A Diverse Range of Piano Lessons in Salt Lake City</strong></h2>

<p>Our offerings are as diverse as the city itself. From kids piano lessons in Salt Lake City to adult piano lessons in Salt Lake City, we ensure that every student finds their rhythm and pace. Understanding that each learner is unique, we also provide private piano lessons in Salt Lake City, tailoring each session to meet individual needs and goals.</p>

<h3 class="wp-block-heading"><strong>For the Beginners and Beyond</strong></h3>

<p>Embarking on a musical journey can be daunting, but with beginner piano lessons in Salt Lake, you'll find a supportive and enriching environment. Our experienced teachers are adept at breaking down complex concepts into manageable, enjoyable lessons. For those looking to delve deeper into specific genres, our jazz piano lessons in Salt Lake City offer a chance to explore the rich tapestry of jazz music, from its history to its intricate techniques.</p>

<h3 class="wp-block-heading"><strong>Conveniently Located "Near Me"</strong></h3>

<p>For many, finding the right piano lessons "near me" is crucial. Volz Piano is centrally located in Salt Lake City, making it accessible for students from all corners of the city. Our dedicated teachers are among the best in the region, each bringing their unique style and expertise to the classroom.</p>

<h3 class="wp-block-heading"><strong>A Community for Adults and Beginners</strong></h3>

<p>Piano lessons aren't just for children. Many adults find joy and satisfaction in learning to play the piano at Volz Piano. Whether you're starting from scratch or picking up where you left off, our adult piano lessons in Salt Lake City are designed to fit your schedule and lifestyle. And for those just starting out, our beginner piano lessons in Salt Lake provide a gentle introduction to the instrument and its music.</p>

<h3 class="wp-block-heading"><strong>Experience the Joy of Learning</strong></h3>

<p>At Volz Piano, we believe in the transformative power of music. It's not just about learning to play an instrument—it's about expressing yourself, finding joy in creation, and connecting with a community of like-minded individuals. We invite you to explore our programs and see for yourself the difference that personalized, passionate teaching can make. <a href="https://volzpiano.com/">https://volzpiano.com/</a></p>

<p>For those interested in the benefits of music education, we recommend reading this insightful article from <a href="https://www.theguardian.com/international">The Guardian</a> on why music education can play a crucial role in personal and academic development.</p>

<h3 class="wp-block-heading"><strong>Join Us at Volz Piano</strong></h3>

<p>Are you ready to embark on your musical journey with Salt Lake piano lessons? At Volz Piano, we're dedicated to providing a welcoming, enriching environment for all our students. Whether you're a child, adult, beginner, or aspiring jazz musician, there's a place for you here. Visit our website to learn more about our offerings and how you can become part of our vibrant community.</p>

<p>Unlock the world of music with us. Your journey begins with a single note. Let's make it resonate together.</p>`;

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
            Unlock the World of Music with Salt Lake Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            February 01, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/unlock-the-world-of-music-with-salt-lake-piano-lessons-at-volz-piano.jpg"
              alt="Featured image for Unlock the World of Music with Salt Lake Piano Lessons at Volz Piano"
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
