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

  const content = `<p>Welcome to Volz Piano, where your musical aspirations come to life through our top-notch piano lessons in Utah. From Salt Lake City to Ogden, and Orem to South Jordan, we provide exceptional piano education tailored to students of all ages and skill levels.</p>

<h2 class="wp-block-heading">Tailored Piano Lessons Across Utah</h2>

<h3 class="wp-block-heading">Comprehensive Coverage</h3>

<p>Whether you're searching for piano lessons in Salt Lake City Utah, exploring options in Ogden, or you need piano lessons in Orem Utah, Volz Piano has you covered. We offer a range of lessons including those for beginners, kids, and adults, ensuring that no matter where you are located, you can find quality piano lessons near me.</p>

<h3 class="wp-block-heading">Piano Lessons for Every Age and Skill Level</h3>

<p>At Volz Piano, we believe in the power of music to enrich lives. Our piano lessons for kids focus on making learning fun and engaging, building a foundation that lasts a lifetime. For adults, we provide piano lessons for adults that are customized to fit individual learning styles and goals, whether you're a beginner or returning to the piano after a break.</p>

<h3 class="wp-block-heading">Locations Serviced</h3>

<p>Not only do we offer piano lessons in Sandy Utah and piano lessons in South Jordan Utah, but our instructors are spread across the state to ensure that high-quality piano education is accessible to everyone. This wide network of talented teachers means that you can find exceptional piano lessons in Utah right in your local area.</p>

<h2 class="wp-block-heading">What Makes Volz Piano Special?</h2>

<h3 class="wp-block-heading">Expert Instructors</h3>

<p>Our instructors are not just teachers; they are passionate musicians dedicated to passing on their love of music. With years of experience and a supportive teaching approach, they help students not only learn how to play the piano but also appreciate the joy and discipline of music.</p>

<h3 class="wp-block-heading">Flexible and Convenient</h3>

<p>Understanding the busy schedules of our students, we offer flexible timing for our piano lessons in Utah. For those who prefer not to travel, we also provide options for lessons at home, making it convenient to fit music education into your life.</p>

<h3 class="wp-block-heading">Affordable Options</h3>

<p>We believe music education should be accessible to everyone. That’s why we offer competitive pricing for our piano lessons in Utah. The cost of our lessons is transparent, with no hidden fees, ensuring you can plan your budget without surprises.</p>

<h2 class="wp-block-heading">Learn More and Join Us</h2>

<p>Discover more about our piano lessons in Utah by visiting our website at<a href="https://volzpiano.com/"> </a><a href="https://volzpiano.com/">Volz Piano</a>. Here you can find detailed information about our lesson plans, our teachers, and how to enroll.</p>

<p>For additional insights into the benefits of learning music, consider visiting<a href="https://www.musictogether.com/"> </a><a href="https://www.musictogether.com/">Music Together</a>, a resource that highlights the positive impact of music education on personal and cognitive development.</p>

<h2 class="wp-block-heading">Start Your Musical Journey Today</h2>

<p>Whether you are in Salt Lake City, Ogden, Orem, Sandy, or South Jordan, piano lessons in Utah at Volz Piano are your gateway to mastering the piano. Contact us today to begin your journey into the world of music, and let us help you achieve your musical dreams.</p>`;

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
            Experience Premier Piano Lessons Across Utah with Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            April 18, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

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
