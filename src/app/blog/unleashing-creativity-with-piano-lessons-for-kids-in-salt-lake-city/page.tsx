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

  const content = `<p><strong>Unleashing Creativity with Piano Lessons for Kids in Salt Lake City</strong></p>

<p>Welcome to Volz Piano, where we believe in nurturing the musical talents of the younger generation through our specialized piano lessons for kids in Salt Lake City. Our goal is to provide a fun, engaging, and educational environment where kids can explore their passion for music and develop their piano skills.</p>

<h2 class="wp-block-heading"><strong>Why Choose Volz Piano for Your Child's Musical Journey?</strong></h2>

<p>At Volz Piano, we understand the importance of finding the right music education for your child. Our piano lessons for kids are designed to cater to young learners of all levels, from beginners to more advanced students.</p>

<h3 class="wp-block-heading"><strong>Beginner Piano Lessons for Kids</strong></h3>

<p>Starting with beginner piano lessons for kids, we focus on building a strong foundation in music theory, note reading, and piano technique. Our experienced teachers make learning enjoyable and accessible, ensuring that each lesson sparks creativity and boosts confidence.</p>

<h3 class="wp-block-heading"><strong>The Best Age for Kids to Start Piano Lessons</strong></h3>

<p>Parents often wonder about the best age for kids to start piano lessons. While children can begin learning music at a very young age, we typically recommend starting formal piano lessons around the age of 5 or 6. This ensures they have the physical and cognitive abilities to engage fully in the learning process.</p>

<h3 class="wp-block-heading"><strong>Private Piano Lessons for Kids</strong></h3>

<p>For those seeking more personalized instruction, our private piano lessons for kids offer one-on-one coaching tailored to your child's unique learning style and pace. This individualized approach helps children progress quickly and effectively, with lessons that accommodate their specific needs and goals.</p>

<h3 class="wp-block-heading"><strong>Piano Lessons for Kids at Home</strong></h3>

<p>Understanding the busy schedules of modern families, we also provide piano lessons for kids at home. These lessons offer the convenience of learning in a familiar environment, making it easier for kids to concentrate and practice regularly.</p>

<h3 class="wp-block-heading"><strong>Beginning Piano Lessons for Kids Near Me</strong></h3>

<p>If you're searching for "piano lessons for kids near me" in Salt Lake City, look no further than Volz Piano. Our central location makes us easily accessible to families throughout the city, ensuring your child can receive top-quality music education close to home.</p>

<h3 class="wp-block-heading"><strong>Understanding the Cost</strong></h3>

<p>We believe in transparency when it comes to the cost of piano lessons for kids. At Volz Piano, we offer competitive pricing options that provide value without compromising on the quality of our instruction. For detailed pricing information, please visit our<a href="https://volzpiano.com/"> pricing page</a>.</p>

<h3 class="wp-block-heading"><strong>Join Our Musical Family</strong></h3>

<p>Enrolling your child in piano lessons for kids at Volz Piano means becoming part of a vibrant musical community. Our students enjoy regular recitals, group classes, and performance opportunities that enhance their learning experience and allow them to showcase their achievements.</p>

<h3 class="wp-block-heading"><strong>Get Started Today</strong></h3>

<p>Are you ready to give your child the gift of music? Visit our <a href="https://volzpiano.com/">website</a> to learn more about our piano lessons for kids in Salt Lake City and sign up for a class. Let's embark on this exciting musical journey together!</p>

<p>For additional insights on music education for children, we recommend exploring <a href="https://www.musicradar.com/">MusicRadar</a>, a fantastic resource for tips, tutorials, and the latest news in the world of music.</p>

<p>With piano lessons for kids at Volz Piano, your child will not only learn how to play the piano but also develop a lifelong appreciation for music. Our dedicated team of teachers is here to guide and inspire your little musician every step of the way. Join us in Salt Lake City and watch your child's musical talents flourish!</p>

<div> </div>`;

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
            Unleashing Creativity with Piano Lessons for Kids in Salt Lake City
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            February 16, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/unleashing-creativity-with-piano-lessons-for-kids-in-salt-lake-city.jpg"
              alt="Featured image for Unleashing Creativity with Piano Lessons for Kids in Salt Lake City"
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
