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

  const content = `<p>Welcome to Volz Piano, where Orem piano lessons are more than just classes; they are a doorway to musical excellence. Whether you're a beginner or an experienced pianist looking to enhance your skills, our comprehensive piano programs in Orem, Utah, are designed to offer something for everyone.</p>

<h2 class="wp-block-heading">Why Choose Orem Piano Lessons at Volz Piano?</h2>

<h3 class="wp-block-heading">Tailored Instruction</h3>

<p>Each student at Volz Piano receives personalized attention. Our Orem piano lessons cater to all levels and ages, including specialized classes for adults and private piano lessons to ensure that individual learning goals are met effectively and efficiently.</p>

<h3 class="wp-block-heading">Experienced Instructors</h3>

<p>Our talented instructors come with a wealth of experience and a passion for teaching. Among them is Harvey Rich, renowned for his Harvey Rich piano lessons in Orem, which are noted for their depth and effectiveness in helping students achieve their musical aspirations.</p>

<h3 class="wp-block-heading">Convenient Location and Flexible Scheduling</h3>

<p>Located conveniently in Orem, Utah, Volz Piano offers piano lessons Orem Utah with flexible scheduling options to accommodate the busy lifestyles of our students. This ensures that learning the piano can fit seamlessly into your life without stress.</p>

<h3 class="wp-block-heading">Understanding the Costs</h3>

<p>We believe in transparency, especially when it comes to the cost of learning. Orem Utah private piano lessons are competitively priced to ensure that high-quality music education is accessible to all. Detailed pricing information can be found on our Pricing Page.</p>

<h2 class="wp-block-heading">Our Piano Programs in Orem</h2>

<h3 class="wp-block-heading">Comprehensive Learning Approach</h3>

<p>At Volz Piano, our piano lessons in Orem cover a wide range of musical genres and techniques, from classical to contemporary styles. We ensure that students not only learn how to play the piano but also develop a deep understanding and appreciation of music.</p>

<h3 class="wp-block-heading">Advanced Facilities</h3>

<p>Our state-of-the-art facilities provide the perfect environment for musical growth. Whether you choose to hire piano lessons in Orem Utah or engage in our regular classes, you’ll find our settings inspiring and conducive to learning.</p>

<h3 class="wp-block-heading">Community and Support</h3>

<p>Volz Piano is not just a school; it’s a community. Our students receive ongoing support and have opportunities to participate in recitals, competitions, and other musical events that foster a sense of community and shared passion for music.</p>

<h2 class="wp-block-heading">Enroll in Orem Piano Lessons Today</h2>

<p>Are you ready to explore your musical talents and elevate your piano skills? Visit us at<a href="https://volzpiano.com/"> </a><a href="https://volzpiano.com/">Volz Piano</a> to learn more about our Orem piano lessons and to register. Join our musical family in Orem and experience the joy and fulfillment of playing the piano.</p>

<p>For further reading on the benefits of piano education, visit<a href="https://www.mtna.org/"> </a><a href="https://www.mtna.org/">Music Teachers National Association</a> which offers resources and research on the advantages of learning music.</p>

<p>At Volz Piano, we are dedicated to providing the highest quality of education and fostering the talents of our students in Orem. We invite you to begin your musical journey with us and unlock your potential through our expertly designed Orem piano lessons.</p>`;

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
            Unlock Your Musical Potential with Orem Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            April 22, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/unlock-your-musical-potential-with-orem-piano-lessons-at-volz-piano.jpg"
              alt="Featured image for Unlock Your Musical Potential with Orem Piano Lessons at Volz Piano"
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
