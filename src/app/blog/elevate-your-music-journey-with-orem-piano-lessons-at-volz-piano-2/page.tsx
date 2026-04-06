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

  const content = `<p>At Volz Piano, we're committed to fostering musical excellence through our tailored Orem Piano Lessons. Located just a stone's throw from the heart of Utah, our piano school offers a nurturing environment for budding musicians and seasoned pianists alike. Whether you're beginning your musical journey or aiming to refine your skills, our piano lessons in Orem, Utah, are designed to unlock your potential and inspire your passion for music.</p>

<h2 class="wp-block-heading"><strong>Why Choose Orem Piano Lessons at Volz Piano?</strong></h2>

<p>Choosing the right piano school is crucial to your musical growth. Here’s why Volz Piano is the preferred choice for Orem Piano Lessons:</p>

<p><strong>Customized Curriculum:</strong> We understand that every student has unique needs and goals. That’s why our piano lessons in Orem are personalized, ensuring that you or your child can progress at a comfortable pace.</p>

<p><strong>Expert Instructors:</strong> Our faculty comprises dedicated musicians who are not just teachers but also passionate practitioners. Their expertise in offering both private Orem Utah piano lessons and group classes ensures a comprehensive learning experience.</p>

<p><strong>Affordable Excellence:</strong> We believe that quality education shouldn't be a financial burden. Our Orem piano lessons cost is structured to provide the best value, making premium music education accessible to all.</p>

<h2 class="wp-block-heading"><strong>Our Programs: Designed for All Ages and Levels</strong></h2>

<p>Whether you're searching for piano lessons Orem for adults or private lessons for your child, Volz Piano has a program for you. Our curriculum covers a wide range of musical styles, from classical to contemporary, ensuring a rich and diversified learning experience.</p>

<p>For those looking for a more personalized touch, our Harvey Rich Piano Lessons in Orem and other private Orem Utah piano lessons offer one-on-one sessions tailored to your specific interests and goals. This bespoke approach allows for deeper exploration and mastery of the piano.</p>

<h2 class="wp-block-heading"><strong>Beyond the Keys: A Community of Music Lovers</strong></h2>

<p>Joining Volz Piano means more than just attending piano classes. It’s about becoming part of a vibrant community of music enthusiasts. Through recitals, workshops, and ensemble performances, you’ll have the chance to share your musical journey with peers, fostering friendships and collaborations that enrich your learning experience.</p>

<h2 class="wp-block-heading"><strong>Embark on Your Piano Adventure Today</strong></h2>

<p>Ready to dive into the world of piano? Discover more about our Orem Piano Lessons by visiting<a href="https://volzpiano.com/"> Volz Piano</a>. Here, you'll find all the information you need to get started, from program details to instructor bios.</p>

<p>For insights into the transformative power of music education, consider exploring this article from<a href="https://www.musicbenefits.com/"> MusicBenefits</a>. It discusses how learning an instrument can enhance cognitive development, emotional well-being, and social skills.</p>

<p>At Volz Piano, we’re excited to welcome you into our family of music lovers. Whether you’re looking to explore piano lessons in Orem or seeking Orem Utah private piano lessons, we offer a supportive and enriching environment for you to grow. Contact us today to learn more about our programs and how you can embark on your musical adventure. Let's create beautiful music together!</p>`;

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
            Elevate Your Music Journey with Orem Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            April 16, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/elevate-your-music-journey-with-orem-piano-lessons-at-volz-piano-2.jpg"
              alt="Featured image for Elevate Your Music Journey with Orem Piano Lessons at Volz Piano"
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
