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

  const content = `<p>Embark on a musical journey with Provo piano lessons offered by Volz Piano. Located in the heart of Provo, Utah, our dedicated instructors provide top-notch piano education tailored to students of all ages and skill levels.</p>

<h2 class="wp-block-heading">Discovering the Joy of Piano Lessons in Provo</h2>

<h3 class="wp-block-heading">Comprehensive Curriculum</h3>

<p>Our piano lessons in Provo cover a wide range of topics, from basic music theory to advanced piano techniques. Whether you're a complete beginner or looking to refine your skills, our classes cater to your individual learning needs.</p>

<h3 class="wp-block-heading">Convenient Location</h3>

<p>Located near me in Provo, Volz Piano offers convenient access to quality music education. Our centrally located school ensures that students from all parts of the city can easily attend their piano lessons without hassle.</p>

<h3 class="wp-block-heading">Learning for All Ages</h3>

<p>At Volz Piano, we believe that music knows no age limit. Whether you're a young child eager to learn the piano or an adult looking to fulfill a lifelong dream, our piano lessons in Provo Utah are designed to accommodate learners of all ages.</p>

<h3 class="wp-block-heading">Adult Piano Lessons in Provo</h3>

<p>It's never too late to learn the piano. Our piano lessons in Provo for adults provide a supportive and encouraging environment where grown-ups can explore their musical talents at their own pace.</p>

<h2 class="wp-block-heading">The Volz Piano Difference</h2>

<h3 class="wp-block-heading">Experienced Instructors</h3>

<p>Our instructors are highly skilled musicians with years of teaching experience. They are dedicated to providing quality instruction and personalized attention to each student, ensuring a rewarding learning experience.</p>

<h3 class="wp-block-heading">State-of-the-Art Facilities</h3>

<p>At Volz Piano, we provide a conducive learning environment equipped with modern amenities. Our comfortable and spacious classrooms are designed to inspire creativity and foster musical growth.</p>

<h3 class="wp-block-heading">Community Engagement</h3>

<p>Volz Piano is more than just a music school; we are a community of passionate musicians and learners. Through recitals, workshops, and other events, we encourage our students to connect with each other and share their love for music.</p>

<h2 class="wp-block-heading">Join Us at Volz Piano</h2>

<p>Ready to begin your musical journey with piano lessons in Provo? Visit our website at<a href="https://volzpiano.com/"> </a><a href="https://volzpiano.com/">Volz Piano</a> to learn more about our programs and instructors. Enroll today and discover the transformative power of music in your life.</p>

<p>For additional insights into the benefits of music education, consider exploring resources from reputable sources like<a href="https://www.rcmusic.com/"> </a><a href="https://www.rcmusic.com/">The Royal Conservatory</a>, which provides valuable information on music learning and development.</p>

<p>At Volz Piano, we are committed to helping you achieve your musical goals. Join us in Provo and let's make beautiful music together!</p>`;

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
            Explore the Melodies of Music with Provo Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            April 20, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/explore-the-melodies-of-music-with-provo-piano-lessons-at-volz-piano.jpg"
              alt="Featured image for Explore the Melodies of Music with Provo Piano Lessons at Volz Piano"
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
