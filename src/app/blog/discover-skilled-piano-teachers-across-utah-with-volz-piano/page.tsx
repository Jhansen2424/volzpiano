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

  const content = `<p>Choosing the right piano teachers in Utah can profoundly impact your musical education and enjoyment. At Volz Piano, we are committed to offering top-quality instruction from some of the best piano teachers in Utah. Whether you're in South Jordan, Springville, or St. George, we provide access to experienced instructors who will help you grow and excel in your piano endeavors.</p>

<h2 class="wp-block-heading"><strong>Explore Our Diverse Range of Piano Teachers in Utah</strong></h2>

<p>Experienced and Passionate Instructors: Our team consists of piano teachers in Utah who are not only highly skilled musicians but also passionate educators. They are dedicated to nurturing students’ talents and helping them achieve their musical goals. Whether you're looking for piano teachers in South Jordan, Utah, or any other city within the state, our teachers are here to guide you.</p>

<p>Comprehensive Learning Opportunities: Learning piano involves more than just playing notes. The piano teachers in Utah at Volz Piano provide comprehensive lessons that include theory, technique, and performance practices. Whether you are a beginner or an advanced player, our piano teachers in West Jordan, Utah, and other locations, tailor their teaching methods to suit your learning style and preferences.</p>

<p>Accessible Locations Across Utah: No matter where you are located, you can find piano teachers in Utah near you. From piano teachers in Springville, Utah to those in St. George and Bountiful, we cover a wide geographic area to ensure you can find quality piano lessons close to home.</p>

<h3 class="wp-block-heading"><strong>Why Choose Volz Piano for Your Piano Lessons?</strong></h3>

<p>Best Piano Teachers in Utah: We take pride in offering some of the best piano teachers in Utah. Their expertise and dedication make learning an enjoyable and rewarding experience. Our teachers are equipped to handle different learning styles and work with students of all ages.</p>

<p>Flexible Lesson Schedules and Affordable Costs: Understanding the need for flexibility, our piano teachers in Utah offer lessons that fit into your schedule. Additionally, we maintain transparency about the cost of lessons, ensuring there are no surprises. For specific pricing details, check out our pricing page.</p>

<p>Supportive Learning Environment: At Volz Piano, we believe in creating a supportive and motivational environment. Our piano teachers in Utah are committed to building positive relationships with their students, encouraging consistent improvement and a lifelong love for music.</p>

<h3 class="wp-block-heading"><strong>Get Started with Top Piano Teachers in Utah Today!</strong></h3>

<p>Our Salt Lake City instructors offer a wealth of experience and a deep understanding of music education. Students in Salt Lake can benefit from a rich and diverse learning experience.</p>

<p>For more insights on choosing the right piano teacher, consider reading this helpful guide from <a href="https://www.mtna.org/">Music Teachers National Association</a>, which offers tips on finding the perfect match for your musical aspirations.</p>

<p>Choose Volz Piano for experienced piano teachers in Utah and start your path to becoming a skilled pianist today!</p>`;

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
            Discover Skilled Piano Teachers Across Utah with Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            May 07, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/discover-skilled-piano-teachers-across-utah-with-volz-piano.jpg"
              alt="Featured image for Discover Skilled Piano Teachers Across Utah with Volz Piano"
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
