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

  const content = `<p>Whether you're a complete beginner or looking to refine your skills, Draper Piano Lessons offers comprehensive piano education tailored to meet your musical aspirations in Utah. With a focus on quality and accessibility, our lessons provide an excellent opportunity for personal growth and musical mastery right in your local area.</p>

<h2 class="wp-block-heading"><strong>Why Choose Draper Piano Lessons?</strong></h2>

<p>Expert Instructors: At the core of Draper Piano Lessons is a team of experienced and passionate teachers. Our instructors are dedicated to fostering an environment where each student, regardless of their level, can thrive and excel.</p>

<p>Tailored for Beginners and Beyond: Draper Piano Lessons are perfect for beginners and those continuing their musical journey. We offer a variety of teaching styles and methods, from classical to contemporary, ensuring that each student finds their perfect fit.</p>

<p>Convenient Locations: Located conveniently near you, our lessons are accessible to residents throughout Draper, including those looking for piano lessons in Draper and Lehi. We ensure that your learning experience is as convenient as it is enriching.</p>

<p>Cost-Effective Learning: Understanding the importance of affordable education, Draper Piano Lessons provides a cost-effective solution for those looking to invest in quality musical education. We offer competitive pricing without compromising on the quality of instruction.</p>

<h3 class="wp-block-heading"><strong>A Learning Hub at Old School Draper</strong></h3>

<p>Draper Piano Lessons at Old School Draper offers a unique blend of historical ambiance and modern teaching techniques. This iconic location is more than just a venue; it's a part of Draper's cultural heritage, providing an inspiring backdrop for our students' musical education.</p>

<h3 class="wp-block-heading"><strong>The Benefits of Learning Piano</strong></h3>

<p>Engaging in piano lessons offers numerous cognitive and emotional benefits. Studies have shown that learning an instrument can enhance memory, improve concentration, and foster a sense of achievement. For those interested in the extensive benefits of music education, Music Education Works provides research and insights into how music can enrich lives.</p>

<h3 class="wp-block-heading"><strong>How to Enroll in Draper Piano Lessons</strong></h3>

<p>Starting your musical journey with Draper Piano Lessons is simple. Visit our Courses Page to explore the various programs we offer, from Draper UT piano lessons to specialized courses for different age groups and skill levels. Our user-friendly sign-up process makes it easy for you to join our community and start learning today.</p>

<h3 class="wp-block-heading"><strong>Conclusion</strong></h3>

<p>Draper Piano Lessons are designed to provide top-notch musical education to residents of Draper and the surrounding areas. Whether you're starting your first lesson or looking to advance your skills, our doors are open to all music enthusiasts. With expert teachers, flexible schedules, and a supportive learning environment, Draper Piano Lessons is your gateway to mastering the piano.</p>

<p>Join us at Draper Piano Lessons and transform your musical dreams into reality. Experience the joy of music in a nurturing and inspiring setting, and let us help you achieve your musical ambitions.</p>`;

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
            Discover the Joy of Music with Draper Piano Lessons
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            May 24, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/discover-the-joy-of-music-with-draper-piano-lessons.jpg"
              alt="Featured image for Discover the Joy of Music with Draper Piano Lessons"
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
