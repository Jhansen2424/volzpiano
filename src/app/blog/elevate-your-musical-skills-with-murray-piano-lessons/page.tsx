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

  const content = `<p>Are you located in Murray, Utah, and thinking about starting your musical journey? Murray Piano Lessons offers a unique blend of expert guidance, flexible scheduling, and a supportive learning environment tailored to all ages and skill levels. Whether you're a complete novice or an experienced player, our lessons are designed to enhance your abilities and ignite your passion for music.</p>

<h2 class="wp-block-heading"><strong>Why Choose Murray Piano Lessons?</strong></h2>

<p>Experienced Instructors: Our team, including the talented Lisa Murray, is deeply committed to fostering musical talent. Each instructor at Murray Piano Lessons brings a wealth of knowledge and a personalized approach to teaching, ensuring that each student receives the attention and guidance they deserve.</p>

<p>Convenience and Accessibility: For residents looking for piano lessons in Murray, Utah, our locations are easy to access and provide a comfortable learning environment. We strive to make our classes as convenient as possible, making it easy for anyone searching for "piano lessons near me" to join us.</p>

<p>Affordable Pricing: Understanding the importance of cost-effective learning, Murray Piano Lessons offers competitive rates. We believe in transparent pricing, with clear information on costs per month, ensuring that pursuing your passion for music is accessible and affordable.</p>

<p>Tailored for Beginners: We specialize in beginner programs and understand the unique challenges faced by new learners. Our beginner-friendly curriculum for Murray Piano Lessons is crafted to ensure a solid foundation in musical theory and practical skills, setting the stage for future success.</p>

<h3 class="wp-block-heading"><strong>A Comprehensive Musical Education</strong></h3>

<p>At Murray Piano Lessons, we believe in a holistic approach to music education. Our programs cover everything from basic chords and scales to advanced composition techniques, all designed to help you progress at a comfortable pace. Whether you're interested in classical piano or more contemporary styles, our lessons are tailored to fit your musical interests and goals.</p>

<p>For those curious about the broader benefits of learning music, educational resources like Music Education Works provide insights into how music education can enhance cognitive abilities, emotional well-being, and even social skills.</p>

<h3 class="wp-block-heading"><strong>Join Our Community</strong></h3>

<p>Getting started with Murray Piano Lessons is easy. Simply visit our Sign-Up Page to enroll. Whether you are seeking piano lessons in Murray, Kentucky, or piano lessons in Murray, Utah, our flexible options are designed to cater to the needs of students from all walks of life.</p>

<h3 class="wp-block-heading"><strong>Conclusion</strong></h3>

<p>Murray Piano Lessons are more than just music classes; they are a gateway to a lifelong journey of musical discovery. By joining us, you embark on an adventure that nurtures your skills, boosts your confidence, and enhances your appreciation of music.</p>

<p>Whether you're a parent looking for a nurturing environment for your child, a teenager eager to add a skill, or an adult seeking a new hobby, Murray Piano Lessons is here to guide you every step of the way. Enroll today and transform your musical aspirations into reality with the best piano lessons Murray Utah has to offer!</p>`;

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
            Elevate Your Musical Skills with Murray Piano Lessons
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            May 27, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/elevate-your-musical-skills-with-murray-piano-lessons.jpg"
              alt="Featured image for Elevate Your Musical Skills with Murray Piano Lessons"
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
