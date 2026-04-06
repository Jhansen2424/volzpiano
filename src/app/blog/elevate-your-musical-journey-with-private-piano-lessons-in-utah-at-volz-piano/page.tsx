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

  const content = `<p>Unlock the full potential of your musical talents with the personalized touch of private piano lessons in Utah, offered exclusively by Volz Piano. Our dedication to providing tailored musical education ensures that each student receives the focused attention and custom-tailored instruction necessary to thrive.</p>

<h3 class="wp-block-heading"><strong>The Unmatched Advantage of Private Piano Lessons</strong></h3>

<p>Private piano lessons offer an unparalleled advantage for learners at any stage of their musical journey. With one-on-one instruction, students enjoy the undivided attention of experienced teachers, allowing for personalized guidance that aligns perfectly with their individual goals and learning pace.</p>

<h3 class="wp-block-heading"><strong>In-Home Private Piano Lessons: Comfort and Convenience</strong></h3>

<p>We understand the importance of a comfortable learning environment, which is why we offer in-home private piano lessons. Bringing the expertise of our private lessons piano teacher directly to your home not only saves time but also creates a relaxed atmosphere conducive to learning. For those seeking "private in-home piano lessons near me," Volz Piano is your go-to solution, providing the convenience and quality you deserve.</p>

<h3 class="wp-block-heading"><strong>Private Group Piano Lessons: Learning Together</strong></h3>

<p>For students who thrive in a group setting, our private group piano lessons present a unique opportunity to learn alongside peers while still benefiting from the personal touch of private instruction. This setting fosters a supportive learning environment, encouraging students to share their journey and grow together musically.</p>

<h3 class="wp-block-heading"><strong>Understanding the Average Cost of Private Piano Lessons</strong></h3>

<p>When considering private piano lessons, it's natural to inquire about the cost. The average cost of private piano lessons varies, depending on the instructor's experience and the lesson's duration and frequency. At Volz Piano, we strive to offer competitive pricing without compromising the quality of our instruction. For detailed pricing information, please visit our website or contact us directly.</p>

<h3 class="wp-block-heading"><strong>Why Choose Volz Piano for Your Private Lessons?</strong></h3>

<p>Choosing Volz Piano for your private piano lessons means entrusting your musical education to dedicated professionals who are passionate about helping you achieve your full potential. Our teachers, selected for their expertise and teaching ability, are committed to crafting lessons that inspire and challenge. Discover more about our approach and the benefits of private piano lessons at<a href="https://volzpiano.com/"> Volz Piano</a>.</p>

<h3 class="wp-block-heading"><strong>Begin Your Musical Adventure Today</strong></h3>

<p>Embarking on your musical journey with private piano lessons in Utah at Volz Piano opens the door to a world of creativity, discipline, and joy. Whether you're starting from scratch or looking to refine your skills, our personalized programs are designed to align with your unique aspirations.</p>

<p>For those interested in further exploring the benefits and insights of music education, consider visiting the National Association for Music Education: <a href="https://nafme.org/">The Benefits of Music Education.</a></p>

<p>At Volz Piano, we're not just teaching notes and rhythms; we're nurturing a lifelong passion for music. With our private piano lessons, you'll receive the guidance, support, and expertise needed to excel. Join us and let's make beautiful music together.</p>`;

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
            Elevate Your Musical Journey with Private Piano Lessons in Utah at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            March 14, 2024
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
