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

  const content = `<span style="font-weight: 400;">At Volz Piano, we are dedicated to providing exceptional piano instruction tailored to meet the needs of each student. Our Sandy, UT Piano Lessons are designed to inspire and develop musical talent in students of all ages and skill levels.</span>
<h2><b>Why Choose Sandy, UT Piano Lessons?</b></h2>
<h3><b>Experienced and Passionate Teachers</b></h3>
<span style="font-weight: 400;">Our Sandy Piano Lessons are taught by highly skilled and passionate teachers who are committed to helping you achieve your musical goals. Each teacher at Volz Piano brings a wealth of experience and a personalized approach to ensure that every lesson is engaging and productive.</span>
<h3><b>Flexible and Convenient Scheduling</b></h3>
<span style="font-weight: 400;">We understand that everyone's schedule is different, which is why our Sandy Piano Lessons offer flexible scheduling options. Whether you prefer morning, afternoon, or evening lessons, we work with you to find a time that fits your busy life. For those looking for lessons "near me," we have multiple locations and options to accommodate your needs.</span>
<h2><b>Piano Lessons in Sandy, UT</b></h2>
<span style="font-weight: 400;">Residents of Sandy, Utah, can enjoy the convenience and quality of our piano lessons right in their hometown. Our Sandy Piano Lessons in Utah are tailored to meet the needs of students of all ages, from young beginners to seasoned players looking to refine their skills.</span>
<h2><b>Understanding the Cost of Sandy, UT Piano Lessons</b></h2>
<span style="font-weight: 400;">The cost of Sandy, UT Piano Lessons can vary based on several factors, including lesson length, frequency, and the teacher's experience. At Volz Piano, we strive to offer competitive pricing that reflects the quality of our instruction. For detailed information on lesson costs, please</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">visit our website</span></a><span style="font-weight: 400;">.</span>
<h3><b>External Learning Resources</b></h3>
<span style="font-weight: 400;">To enhance your learning experience, we recommend exploring</span><a href="https://www.pianoeducation.org/"> <span style="font-weight: 400;">Piano Education</span></a><span style="font-weight: 400;">, a valuable resource offering tutorials and guidance for piano students at all levels.</span>
<h2><b>Start Your Musical Journey with Volz Piano</b></h2>
<span style="font-weight: 400;">Are you ready to take the next step in your musical journey with Sandy, UT Piano Lessons? Contact Volz Piano today to schedule your first lesson. Our dedicated teachers are excited to help you achieve your musical dreams.</span>

<span style="font-weight: 400;">For more information and to get started,</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">visit our website</span></a><span style="font-weight: 400;"> and explore our range of lesson offerings. We look forward to making beautiful music with you in Sandy, Utah, and beyond!</span>`;

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
            Discover the Best Sandy, UT Piano Lessons with Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            June 24, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/discover-the-best-sandy-ut-piano-lessons-with-volz-piano.jpg"
              alt="Featured image for Discover the Best Sandy, UT Piano Lessons with Volz Piano"
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
