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

  const content = `<p>Welcome to Volz Piano, where your musical journey begins with the finest beginners piano lessons in Utah. Whether you're picking up a keyboard for the first time or you're returning to music after a long break, our tailored lessons provide the perfect blend of encouragement and expertise.</p>

<h2 class="wp-block-heading">Start Your Musical Adventure</h2>

<p>Beginners piano lessons aren't just about hitting the right notes; they're about discovering your potential and enjoying the journey of learning. At Volz Piano, we offer piano lessons for beginners adults and children, ensuring that it’s never too late or too early to start your musical education.</p>

<h2 class="wp-block-heading">Tailored Lessons for Every Learner</h2>

<p>Every student’s musical path is unique, and that's why our beginners piano keyboard lessons are customized to fit your individual needs. Whether you’re interested in classical music, jazz, pop, or anything in between, our lessons cater to your musical taste and learning style.</p>

<h2 class="wp-block-heading">The Best Piano Lessons for Beginners</h2>

<p>What makes our best piano lessons for beginners stand out? It’s our commitment to quality and passion for teaching. Our teachers are experienced musicians who not only excel in piano but also know how to create a supportive and inspiring learning environment.</p>

<h2 class="wp-block-heading">Understanding the Basics</h2>

<p>Our basic piano lessons for beginners focus on the fundamentals of music theory, technique, and reading sheet music. We build a solid foundation that will serve you well, no matter how far you decide to take your piano skills.</p>

<h2 class="wp-block-heading">Learning Your Favorite Songs</h2>

<p>One of the joys of learning the piano is being able to play your favorite tunes. Our piano song lessons for beginners are designed to quickly move you from practicing scales to playing complete songs, making practice sessions something you’ll look forward to.</p>

<h2 class="wp-block-heading">Affordable and Accessible</h2>

<p>Concerned about the cost? We believe that everyone should have the opportunity to learn music, which is why we strive to make our beginners piano lessons affordable and accessible. Detailed cost information is available on our Volz Piano Pricing Page.</p>

<h2 class="wp-block-heading">Convenient Location</h2>

<p>Located near you, Volz Piano serves the entire Utah community. Our lessons are scheduled at convenient times, making it easy for anyone to incorporate music learning into their busy lives.</p>

<h2 class="wp-block-heading">The Benefits of Learning Music</h2>

<p>Learning music does more than teach you how to play an instrument—it enhances cognitive abilities, boosts emotional health, and builds confidence. You can find more about the benefits of music education from credible sources like the<a href="https://www.mtna.org/"> Music Teachers National Association</a>.</p>

<h2 class="wp-block-heading">Join Us at Volz Piano</h2>

<p>Are you ready to begin your musical journey? Beginners piano lessons at Volz Piano are the perfect place to start. Visit our website at<a href="https://volzpiano.com/"> Volz Piano</a> to learn more about our programs and how we can help you achieve your musical dreams. Let's make music together!</p>`;

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
            Discover the Joy of Music with Beginners Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            April 05, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/discover-the-joy-of-music-with-beginners-piano-lessons-at-volz-piano.jpg"
              alt="Featured image for Discover the Joy of Music with Beginners Piano Lessons at Volz Piano"
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
