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

  const content = `<span style="font-weight: 400;">Learning to play the piano is a rewarding experience, and there's no better place to start than with beginners' piano lessons at Volz Piano. Whether you're a complete novice or looking to brush up on the basics, our structured lessons are designed to help you achieve your musical goals. Located conveniently for those searching for "piano lessons near me," Volz Piano offers a welcoming environment for students of all ages.</span>
<h2><b>Why Choose Beginners Piano Lessons?</b></h2>
<span style="font-weight: 400;">Starting with beginners' piano lessons provides you with a strong foundation in music theory, technique, and performance. Our experienced teachers are dedicated to making the learning process enjoyable and accessible, ensuring that you build confidence as you progress.</span>
<h2><b>Piano Lessons for Beginners Adults</b></h2>
<span style="font-weight: 400;">It's never too late to start learning the piano. Our piano lessons for beginners and adults are tailored to fit your schedule and learning style. Whether you're revisiting a childhood passion or starting fresh, our teachers are here to guide you through every step.</span>
<h2><b>The Structure of Basic Piano Lessons for Beginners</b></h2>
<span style="font-weight: 400;">Our basic piano lessons for beginners cover all the essentials, from reading sheet music to proper hand positioning. Each lesson is crafted to build upon the previous one, ensuring steady progress. By the end of the course, you'll be able to play simple pieces and understand the fundamentals of music theory.</span>
<h2><b>Best Piano Lessons for Beginners</b></h2>
<span style="font-weight: 400;">At Volz Piano, we pride ourselves on offering the best piano lessons for beginners. Our personalized approach ensures that each student receives the attention they need to succeed. Our curriculum is designed to be engaging and fun, fostering a lifelong love for music.</span>
<h2><b>Cost of Beginners Piano Lessons</b></h2>
<span style="font-weight: 400;">One of the most common questions we receive is about the cost of beginner piano lessons. We offer competitive pricing and various packages to suit different budgets. For detailed pricing information, please</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">visit our website</span></a><span style="font-weight: 400;">. Investing in piano lessons is a step towards a lifetime of musical enjoyment.</span>
<h2><b>Piano Music Lessons for Beginners</b></h2>
<span style="font-weight: 400;">Our piano music lessons for beginners focus on developing a comprehensive understanding of music. From classical to contemporary pieces, our lessons cover a wide range of genres to keep students motivated and excited about their learning journey.</span>
<h2><b>Experienced Piano Teachers</b></h2>
<span style="font-weight: 400;">Finding the right teacher is crucial for your musical development. Our piano teachers are not only skilled musicians but also passionate educators dedicated to helping you succeed. They provide personalized instruction that caters to your learning pace and style.</span>
<h2><b>External Learning Resources</b></h2>
<span style="font-weight: 400;">To complement your lessons at Volz Piano, we recommend exploring</span><a href="https://www.pianoeducation.org/"> <span style="font-weight: 400;">The Piano Education Page</span></a><span style="font-weight: 400;">, which offers valuable resources and tips for beginners.</span>
<h2><b>Join Us for Beginners Piano Lessons</b></h2>
<span style="font-weight: 400;">Are you ready to start your musical journey with beginner piano lessons? Contact us at Volz Piano to schedule your first lesson and take the first step toward becoming a proficient pianist. Our dedicated teachers are here to support you every step of the way.</span>

<span style="font-weight: 400;">For more information and to get started,</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">visit our website</span></a><span style="font-weight: 400;"> and explore our wide range of offerings. We look forward to making beautiful music with you!</span>`;

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
            Begin Your Musical Journey with Piano Lessons for Beginners at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            June 09, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/begin-your-musical-journey-with-piano-lessons-for-beginners-at-volz-piano.jpg"
              alt="Featured image for Begin Your Musical Journey with Piano Lessons for Beginners at Volz Piano"
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
