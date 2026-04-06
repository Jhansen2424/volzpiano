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

  const content = `<p>Welcome to Volz Piano, the leading destination for West Valley City Piano Lessons. Whether you're a beginner or seeking advanced instruction, our dedicated team in West Valley City, Utah, is here to guide you on your musical journey.</p>

<h2 class="wp-block-heading">Why Choose West Valley City Piano Lessons at Volz Piano?</h2>

<h3 class="wp-block-heading">Expert Instruction Tailored to Your Needs</h3>

<p>Our West Valley City Piano Lessons are designed to cater to each student's unique skill level and musical aspirations. From foundational techniques for beginners to complex compositions for more advanced students, our curriculum covers it all.</p>

<h3 class="wp-block-heading">Conveniently Located</h3>

<p>For those looking for piano lessons near me, Volz Piano is conveniently situated in West Valley City, making it easy for local students to access top-notch piano instruction without extensive travel.</p>

<h3 class="wp-block-heading">Understanding the Costs</h3>

<p>We believe in transparency and strive to offer affordable West Valley City Piano Lessons. The cost of our lessons is competitively priced to ensure that quality music education is accessible to everyone. For more detailed information on our lesson pricing, please visit our Pricing Page</p>

<h2 class="wp-block-heading">Our Piano Programs in West Valley City</h2>

<h3 class="wp-block-heading">Diverse Musical Offerings</h3>

<p>Our lessons aren’t just limited to traditional piano training; we also provide opportunities to engage in broader musical experiences, such as participating in a piano concerto at West Valley. These experiences allow students to apply their skills in a concert setting, enhancing their confidence and performance abilities.</p>

<h3 class="wp-block-heading">Advanced Piano Lessons</h3>

<p>For those looking to push their skills further, our advanced curriculum in West Valley City Piano Lessons includes in-depth study of complex pieces and techniques, tailored to challenge and inspire our more experienced students.</p>

<h3 class="wp-block-heading">Experienced Instructors</h3>

<p>Our team of piano teachers at Volz Piano is composed of highly skilled and passionate musicians who are not only adept at playing the piano but also excel in teaching. They are dedicated to fostering a supportive environment where all students can thrive.</p>

<h2 class="wp-block-heading">Join Our Community</h2>

<p>Are you ready to start or advance your piano education? Enroll in West Valley City Piano Lessons today by visiting<a href="https://volzpiano.com/"> </a><a href="https://volzpiano.com/">Volz Piano</a>. Join our community and enjoy the benefits of a comprehensive and nurturing musical education.</p>

<p>For additional insights into the benefits of music education, consider visiting the<a href="https://nafme.org/"> </a><a href="https://nafme.org/">National Association for Music Education</a>, which provides valuable information on how music learning can enhance both personal and cognitive development.</p>

<p>At Volz Piano, we are committed to providing exceptional West Valley City Piano Lessons. We invite you to join us and explore the enriching world of music in a welcoming and professional setting. Let's make beautiful music together!</p>`;

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
            Elevate Your Piano Skills with West Valley City Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            April 30, 2024
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
