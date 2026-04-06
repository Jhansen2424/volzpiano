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

  const content = `<p>In today's busy world, finding time for personal enrichment activities like learning an instrument can be challenging. However, with Orem At-Home Piano Lessons, you can master the piano from the comfort of your own home. Whether you are a beginner or an experienced musician looking to refine your skills, these lessons are tailored to suit your individual needs and schedules.</p>

<h2 class="wp-block-heading"><strong>Why Choose Orem At-Home Piano Lessons?</strong></h2>

<p>Flexibility and Comfort: One of the biggest advantages of Orem At-Home Piano Lessons is the flexibility they offer. You can schedule sessions according to your convenience, bypassing the need to travel and allowing you to learn in a familiar and comfortable environment. This setup is particularly beneficial for those who manage busy schedules or prefer a more relaxed learning atmosphere.</p>

<p>Personalized Learning Experience: When you opt for piano lessons at home in Orem, you receive one-on-one attention from expert instructors like Harvey Rich, known for his tailored approach. Each session is customized to focus on your specific learning goals, whether it's mastering classical techniques or exploring new music genres. This personalization enhances the learning process, making it more effective and enjoyable.</p>

<p>Cost-Effective: Considering the cost associated with traveling to a music school, Orem At-Home Piano Lessons can be a more economical option. You save on both travel expenses and time, which can be better spent on additional practice or other important activities.</p>

<p>Focus on Private Instruction: Orem Utah private piano lessons at home provide an environment where the teacher can focus solely on your progress without the distractions of a traditional classroom setting. This private attention ensures that your individual needs are addressed, accelerating your learning curve.</p>

<h3 class="wp-block-heading"><strong>Benefits for Adults</strong></h3>

<p>For adults, enrolling in Orem At-Home Piano Lessons can be particularly rewarding. Learning an instrument later in life is not only a great way to unwind and reduce stress, but it also offers cognitive benefits that can keep the mind sharp. These classes for adults are designed to be engaging and motivating, keeping you inspired as you journey through the beautiful complexities of piano music.</p>

<h3 class="wp-block-heading"><strong>Explore Our Programs</strong></h3>

<p>At Volz Piano, we understand the importance of quality education tailored to fit each student's unique needs. That's why our Orem At-Home Piano Lessons are crafted to provide the best learning experience. You can learn more about our programs and what makes our teaching approach special by visiting our About Us page.</p>

<p>For those interested in the broader benefits of learning music, including cognitive and emotional growth, the<a href="https://nafme.org/"> National Association for Music Education</a> offers resources that highlight the importance of music education.</p>

<h3 class="wp-block-heading"><strong>Start Your Musical Journey with Orem At-Home Piano Lessons</strong></h3>

<p>Embarking on your musical journey with Orem At-Home Piano Lessons promises not just skill development but a path to personal fulfillment. Whether you are looking to hire piano lessons in Orem, Utah, or explore the enriching world of music through Harvey Rich piano lessons in Orem, Volz Piano is here to guide you every step of the way.</p>

<p>Ready to fill your home with the sound of music? Contact us today to schedule your first lesson and see how our Orem At-Home Piano Lessons can enrich your life. Whether it’s broadening your musical horizons or unwinding after a long day, these lessons are designed to provide satisfaction and growth. Join us and let the music begin!</p>`;

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
            Discover the Convenience of Orem At-Home Piano Lessons
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            May 20, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/discover-the-convenience-of-orem-at-home-piano-lessons.jpg"
              alt="Featured image for Discover the Convenience of Orem At-Home Piano Lessons"
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
