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

  const content = `<span style="font-weight: 400;">Are you ready to embark on a musical journey in Murray, Utah? Look no further than Volz Piano for exceptional piano lessons tailored to your needs. Whether you're a beginner or an experienced pianist, our dedicated instructors are here to guide you every step of the way.</span>
<h2><b>Discovering the Joy of Murray Piano Lessons</b></h2>
<span style="font-weight: 400;">At Volz Piano, we believe that learning the piano should be an enjoyable and rewarding experience. That's why our Murray piano lessons focus on nurturing a love for music while providing comprehensive instruction in technique, theory, and performance. Whether you're dreaming of playing classical masterpieces or contemporary hits, our experienced instructors will help you reach your goals with personalized guidance and support.</span>
<h2><b>Elevate Your Skills with Expert Instruction</b></h2>
<span style="font-weight: 400;">Our team of skilled instructors brings years of experience and a passion for teaching to each lesson. From mastering the basics to refining advanced techniques, we'll work with you to develop your skills and unlock your full potential as a pianist. With a focus on fostering creativity, confidence, and musical expression, our Murray piano lessons provide a solid foundation for success in music and beyond.</span>
<h2><b>Affordable Options to Fit Your Budget</b></h2>
<span style="font-weight: 400;">We understand that cost can be a concern when it comes to pursuing your passion for music. That's why Volz Piano offers affordable Murray piano lessons with flexible pricing options to fit any budget. Whether you're a student, a working professional, or a retiree, we believe that everyone should have access to high-quality music education without breaking the bank. With convenient monthly payment plans available, learning the piano has never been more accessible.</span>
<h2><b>Conveniently Located Near You</b></h2>
<span style="font-weight: 400;">Convenience is key when it comes to choosing the right piano lessons. Whether you're searching for piano lessons in Murray, Utah, or nearby, Volz Piano is here to serve your needs. Join our vibrant musical community and experience the joy of making music in a supportive and inspiring environment.</span>
<h2><b>Experience the Volz Piano Difference</b></h2>
<span style="font-weight: 400;">Ready to take your piano skills to the next level? Contact Volz Piano today to schedule your first lesson and discover why we're the premier destination for Murray piano lessons. With our expert instruction, affordable rates, and convenient location, there's never been a better time to pursue your passion for music. Join us at Volz Piano and unlock your musical potential today!</span>

<span style="font-weight: 400;">Don't miss out on the opportunity to discover the joy of making music with Murray piano lessons at Volz Piano. Contact us today and start your musical journey!</span>`;

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
            Unlock Your Musical Potential with Murray, UT Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            June 28, 2024
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
