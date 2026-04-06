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

  const content = `<p>If you've ever dreamed of playing piano but struggle to find the time to attend regular classes, Provo at home piano lessons offer a perfect solution. Bringing music education directly to your living room, these lessons combine convenience with quality, ensuring that learning is accessible to everyone – from busy professionals to curious retirees.</p>

<h2 class="wp-block-heading"><strong>Why Choose Provo at Home Piano Lessons?</strong></h2>

<p>Flexibility: One of the primary advantages of at home piano lessons Provo is the sheer flexibility. Sessions can be scheduled around your existing commitments, whether it’s work, school, or family obligations, making it easier than ever to learn at your own pace.</p>

<p>Comfort: There's something uniquely comforting about learning in your own space. Piano lessons at home in Provo, Utah, eliminate the need to travel, saving you time and energy. This comfortable environment helps students relax and, in turn, enhances their ability to absorb and retain new information.</p>

<p>Personalization: Each lesson is tailored to the individual’s needs and goals. Whether you're a beginner or looking to hone your skills with more advanced piano lessons Provo adult, personalization ensures that every lesson is maximally beneficial.</p>

<h3 class="wp-block-heading"><strong>The Benefits of Music Education at Home</strong></h3>

<p>Learning piano at home isn’t just about convenience. It’s also about creating a deeper connection with music. Studies show that music education can enhance cognitive development, improve coordination, and even increase mathematical ability. Moreover, for adults, it serves as a great way to unwind after a busy day, offering a therapeutic escape from the daily grind.</p>

<p>For families in Provo, piano lessons at home near Provo not only help cultivate musical skills but also bring a fun, enriching activity into the home environment that everyone can enjoy.</p>

<h3 class="wp-block-heading"><strong>How Volz Piano Enhances Your Learning Experience</strong></h3>

<p>At<a href="https://volzpiano.com/"> Volz Piano</a>, we are dedicated to providing exceptional at home piano lessons in Provo. Our instructors are not just teachers, but passionate musicians who are committed to passing on their love for music. With a focus on both the joy of music and the rigor of technique, our classes are designed to be engaging and educational.</p>

<p>We also utilize the latest teaching methods and resources to ensure that you have the best learning experience possible. Whether you’re interested in classical, jazz, or contemporary music, Volz Piano can cater to your musical aspirations.</p>

<h3 class="wp-block-heading"><strong>Getting Started with Provo at Home Piano Lessons</strong></h3>

<p>Starting your musical journey with Provo at home piano lessons is straightforward. Visit our website to learn more about our tailored lesson plans and find the perfect match for your musical interests and schedule. You can also read about our piano teachers and their unique approaches to teaching and music.</p>

<p>For those curious about the broader benefits of learning music, the<a href="https://nafme.org/"> National Association for Music Education</a> provides insightful resources and research, highlighting the positive impacts of music education on personal and academic growth.</p>

<h3 class="wp-block-heading"><strong>Conclusion</strong></h3>

<p>Provo at home piano lessons offer a unique opportunity to bring music directly into your home. With Volz Piano, you can enjoy personalized, convenient, and enjoyable piano classes that fit into your lifestyle and help you or your loved ones embark on a musical voyage that can be both rewarding and fun. Dive into the world of music with us and discover how learning the piano can enrich your life.</p>

<p>So why wait? Take the step today, and let the sweet sounds of piano fill your home with joy and harmony. Join us for a harmonious journey at Volz Piano, where every note counts and every lesson brings you closer to mastering the art of piano.</p>`;

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
            Unlock the Magic of Music with Provo at Home Piano Lessons
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            May 17, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/unlock-the-magic-of-music-with-provo-at-home-piano-lessons.jpg"
              alt="Featured image for Unlock the Magic of Music with Provo at Home Piano Lessons"
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
