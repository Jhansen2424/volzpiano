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

  const content = `<p>Embarking on a musical adventure in the Beehive State is an enriching experience, especially with the comprehensive Utah piano lessons offered by Volz Piano. Whether you're a budding musician or an experienced player, our tailored programs in Utah are designed to elevate your piano skills to new heights.</p>

<h3 class="wp-block-heading"><strong>Beginners Piano Lessons in Utah: Start Your Musical Journey Here</strong></h3>

<p>Dive into the world of music with our beginners piano lessons in Utah. Tailored to inspire and engage musicians of all ages, these lessons are the perfect starting point for anyone looking to explore the joy of piano playing. Our experienced teachers, located near you, are passionate about helping every student find their unique musical voice.</p>

<h3 class="wp-block-heading"><strong>Kids Piano Lessons in Utah: Cultivating Young Musicians</strong></h3>

<p>Encouraging kids to explore their musical talents is a gift that keeps on giving. Our kids piano lessons in Utah are specifically designed to be fun, engaging, and educational. By focusing on both enjoyment and technique, we help young learners develop a solid foundation in music that will benefit them for years to come.</p>

<h3 class="wp-block-heading"><strong>Piano Lessons Draper Utah: Discover Your Potential</strong></h3>

<p>For residents in Draper and surrounding areas, our piano lessons offer an opportunity to delve deeper into music right in your backyard. With expert teachers near you, these lessons provide a convenient and effective way to enhance your skills, whether you're preparing for a performance or playing for pleasure.</p>

<h3 class="wp-block-heading"><strong>Piano Lessons University of Utah: Elevating Your Musical Education</strong></h3>

<p>For students and community members at the University of Utah, our piano lessons offer a unique blend of academic excellence and practical skill-building. With access to some of the best piano teachers in Utah, learners can pursue their passion for music while achieving academic goals.</p>

<h3 class="wp-block-heading"><strong>Utah Private Piano Lessons: A Personalized Approach</strong></h3>

<p>Our Utah private piano lessons are designed for those seeking a more personalized learning experience. With one-on-one attention from skilled teachers, students can progress at their own pace, focusing on areas that need improvement while exploring new musical territories.</p>

<h3 class="wp-block-heading"><strong>Piano Teachers in Utah: Experienced and Passionate</strong></h3>

<p>The backbone of our Utah piano lessons program is our team of experienced and passionate piano teachers. Dedicated to nurturing the musical talents of each student, they employ innovative teaching methods and a personalized approach to ensure a rewarding and enjoyable learning experience.</p>

<h3 class="wp-block-heading"><strong>Embark on Your Musical Journey with Volz Piano</strong></h3>

<p>Choosing Volz Piano for your Utah piano lessons means joining a community passionate about music and excellence. Whether you're just starting out or looking to refine your skills, our programs offer the guidance, support, and resources you need to succeed. Visit<a href="https://volzpiano.com/"> Volz Piano</a> to learn more about our offerings and start your musical journey today.</p>

<p>For additional insights on the benefits of music education, consider exploring resources like the National Association of Music Merchants (NAMM) Foundation: <a href="https://www.namm.org/">The Benefits of Music Education</a>.</p>

<p>At Volz Piano, we believe in the power of music to transform lives. With our Utah piano lessons, we're committed to providing learners of all ages and levels with the tools, guidance, and inspiration needed to achieve their musical dreams. Join us and discover the joy and fulfillment of playing the piano.</p>`;

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
            Master the Art of Piano with Utah Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            March 04, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/master-the-art-of-piano-with-utah-piano-lessons-at-volz-piano.jpg"
              alt="Featured image for Master the Art of Piano with Utah Piano Lessons at Volz Piano"
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
