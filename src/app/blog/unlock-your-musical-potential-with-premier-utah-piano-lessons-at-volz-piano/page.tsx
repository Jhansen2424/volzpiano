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

  const content = `<p>Whether you're a beginner or an experienced pianist looking to enhance your skills, Volz Piano offers a variety of Utah piano lessons designed to cater to every age and skill level. Our expert teachers are passionate about sharing their love of music and are committed to helping each student succeed.</p>

<h2 class="wp-block-heading"><strong>Discover the Richness of Utah Piano Lessons</strong></h2>

<p>Salt Lake City: For those looking for piano lessons Salt Lake Utah, we have several teachers available in this vibrant area.</p>

<p>Experienced Piano Teachers in Utah: Our team consists of highly skilled and dedicated piano teachers who specialize in a variety of teaching methods suitable for all ages, including adult piano lessons in Utah and kids piano lessons in Utah. Each teacher is committed to fostering a nurturing environment that encourages students to thrive.</p>

<p>Flexible Lesson Plans: Understanding that every student's schedule and commitment level can vary, we offer flexible lesson timings and formats, including private, group, and even online lessons to accommodate your needs.</p>

<h3 class="wp-block-heading"><strong>Comprehensive Offerings for All Ages and Skill Levels</strong></h3>

<p>Kids Piano Lessons in Utah: Starting music education at a young age is wonderful for cognitive development and personal growth. Our kids piano lessons in Utah are designed to make learning fun and engaging, helping children develop a lifelong passion for music.</p>

<p>Adult Piano Lessons in Utah: It’s never too late to start learning or to further develop your piano skills. Our adult piano lessons in Utah are perfect for adults looking to begin their musical journey or to continue building on previous experiences.</p>

<p>Beginners Piano Lessons in Utah: New to the piano? No problem! Our beginner's program is the perfect way to take the first step. We emphasize foundational skills and gradually build towards more complex techniques, ensuring you feel confident at every step.</p>

<h3 class="wp-block-heading"><strong>What to Expect in Terms of Cost?</strong></h3>

<p>Wondering about the cost? The cost of Utah piano lessons can vary based on the lesson type and frequency. However, at Volz Piano, we strive to make music education accessible and affordable for everyone. For more specific information, please visit our pricing page.</p>

<h3 class="wp-block-heading"><strong>Why Choose Volz Piano for Your Utah Piano Lessons?</strong></h3>

<p>Choosing where to take Utah piano lessons is a significant decision. At Volz Piano, you’re not just getting a lesson; you’re becoming part of a community. Our supportive environment and professional instructors ensure that every student receives a quality education tailored to their personal growth and success.</p>

<p>For additional resources and to understand why the piano is an excellent choice for music learners, check out this informative article from TakeLessons.Ready to start your musical journey with Utah piano lessons? Whether you're in Logan, Utah County, or anywhere else in the state, Volz Piano is here to guide you every step of the way. Visit us today at<a href="https://volzpiano.com/"> Volz Piano</a> to learn more about our programs and how you can enroll. Let’s make music together!</p>`;

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
            Unlock Your Musical Potential with Premier Utah Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            May 02, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/unlock-your-musical-potential-with-premier-utah-piano-lessons-at-volz-piano.jpg"
              alt="Featured image for Unlock Your Musical Potential with Premier Utah Piano Lessons at Volz Piano"
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
