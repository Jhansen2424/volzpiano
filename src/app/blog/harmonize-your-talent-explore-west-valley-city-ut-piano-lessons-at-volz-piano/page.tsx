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

  const content = `<span style="font-weight: 400;">Unlock the melody within and embark on a musical journey with West Valley City piano lessons at Volz Piano. Whether you're a beginner or an advanced pianist, our expert instructors are here to guide you toward musical mastery.</span>
<h2><b>Discovering the Harmony of West Valley City Piano Lessons</b></h2>
<span style="font-weight: 400;">At Volz Piano, we're passionate about nurturing the musical talents of our students. Our West Valley City piano lessons offer a comprehensive curriculum that covers technique, theory, and performance. From mastering the basics to tackling advanced piano concerto repertoire, our experienced instructors will help you hone your skills and unleash your full potential as a pianist.</span>
<h2><b>Elevate Your Performance with Expert Guidance</b></h2>
<span style="font-weight: 400;">Our team of dedicated instructors brings years of experience and a wealth of knowledge to each lesson. Whether you're a novice or a seasoned musician, we'll work with you to develop your technique, expand your repertoire, and refine your artistry. With personalized instruction tailored to your individual goals and aspirations, our West Valley City piano lessons provide the perfect opportunity to take your playing to the next level.</span>
<h2><b>Affordable Options to Fit Your Budget</b></h2>
<span style="font-weight: 400;">At Volz Piano, we believe that everyone should have access to high-quality music education. That's why we offer West Valley City piano lessons at competitive rates that won't break the bank. With flexible payment options and affordable monthly plans, learning the piano has never been more accessible. Don't let cost stand in the way of pursuing your passion for music – join us at Volz Piano and start your musical journey today.</span>
<h2><b>In-Home Lessons Conveniently Located Near You</b></h2>
<span style="font-weight: 400;">Convenience is key when it comes to piano lessons. Whether you're searching for piano lessons in West Valley, Utah, or nearby, Volz Piano is here to serve your needs. Join our vibrant musical community and experience the joy of making music in a supportive and inspiring environment.</span>
<h2><b>Experience the Volz Piano Difference</b></h2>
<span style="font-weight: 400;">Ready to take your piano skills to new heights? Contact Volz Piano today to schedule your first lesson and discover why we're the premier destination for West Valley City piano lessons. With expert instruction, affordable rates, and a commitment to excellence, there's no better place to pursue your passion for music. Join us at Volz Piano and let your musical journey begin.</span>

<span style="font-weight: 400;">Don't miss out on the opportunity to discover the joy of making music with West Valley City piano lessons at Volz Piano. Contact us today and start your musical journey!</span>`;

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
            Harmonize Your Talent: Explore West Valley City, UT Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            June 30, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/harmonize-your-talent-explore-west-valley-city-ut-piano-lessons-at-volz-piano.jpg"
              alt="Featured image for Harmonize Your Talent: Explore West Valley City, UT Piano Lessons at Volz Piano"
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
