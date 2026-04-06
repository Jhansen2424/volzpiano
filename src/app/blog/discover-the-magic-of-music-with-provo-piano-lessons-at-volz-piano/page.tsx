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

  const content = `<p>Music has the power to transform lives, touching the soul in profound ways. At Volz Piano, we're passionate about sharing this transformative experience through our comprehensive Provo Piano Lessons. Nestled in the heart of Utah, our piano school offers an enriching environment where students of all ages and levels can explore the world of music. Whether you're a complete beginner or looking to refine your skills, our piano lessons near Provo are designed to cater to your unique needs.</p>

<h2 class="wp-block-heading"><strong>Why Choose Provo Piano Lessons at Volz Piano?</strong></h2>

<p>Embarking on a musical journey requires more than just passion; it needs the right environment and guidance. That's where Volz Piano comes in. Our piano lessons in Provo, Utah, are more than just classes; they're a gateway to a lifelong love of music. Here's why our lessons stand out:</p>

<p><strong>Personalized Learning:</strong> We believe in tailoring our lessons to fit each student's goals and pace. Whether you're interested in Provo piano lessons for adults or seeking an engaging learning experience for your child, our dedicated instructors are here to guide you every step of the way.</p>

<p><strong>Experienced Instructors:</strong> Our team comprises seasoned musicians and educators passionate about sharing their love for music. Their expertise ensures that learning is not just effective but also enjoyable.</p>

<p><strong>Convenient Location: </strong>Situated near the heart of Provo, our school is easily accessible for students seeking piano lessons near Provo. Our prime location makes it convenient for students from surrounding areas to join us in the joy of music learning.</p>

<h2 class="wp-block-heading"><strong>A Curriculum That Speaks Volumes</strong></h2>

<p>At Volz Piano, we understand that learning music is a personal journey. That's why our curriculum is designed to be flexible, catering to the individual needs and aspirations of each student. From classical to contemporary, our Provo Piano Lessons cover a broad spectrum of musical genres, ensuring a well-rounded education.</p>

<p>Whether you're a beginner eager to learn the basics or an advanced player aiming to master complex compositions, our classes provide a supportive environment where your musical dreams can take flight. Our approach combines technical skill-building with creative expression, encouraging students to explore their musical potential fully.</p>

<h2 class="wp-block-heading"><strong>Join Our Community</strong></h2>

<p>Becoming a part of the Volz Piano family means joining a community of music lovers who share your passion. Our school is not just about piano lessons in Provo, Utah; it's a place where students can connect, share, and grow together. Through recitals, workshops, and group classes, you'll have the opportunity to engage with fellow music enthusiasts and enrich your learning experience.</p>

<h2 class="wp-block-heading"><strong>Start Your Musical Journey Today</strong></h2>

<p>Ready to embark on your musical adventure? Learn more about our Provo Piano Lessons by visiting our website at<a href="https://volzpiano.com/"> Volz Piano</a>. Here, you'll find detailed information about our programs, instructors, and how to get started.</p>

<p>For those interested in the benefits of music education, we recommend reading this insightful article on<a href="https://www.music.org/"> the impact of piano lessons on personal development</a>. It highlights how learning an instrument can enhance cognitive abilities, emotional intelligence, and social skills—further proof of music's transformative power.</p>

<p>At Volz Piano, we're excited to be a part of your musical journey. Whether you're in Provo or nearby, our piano lessons Provo adult and for children offer a welcoming space where you can explore your love for music. Contact us today to learn more about how you can join our vibrant community. Let's make beautiful music together!</p>`;

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
            Discover the Magic of Music with Provo Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            March 18, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/discover-the-magic-of-music-with-provo-piano-lessons-at-volz-piano.jpg"
              alt="Featured image for Discover the Magic of Music with Provo Piano Lessons at Volz Piano"
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
