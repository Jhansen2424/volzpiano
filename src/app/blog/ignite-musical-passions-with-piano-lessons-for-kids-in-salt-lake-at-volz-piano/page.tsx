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

  const content = `<p>Welcome to Volz Piano, where we specialize in nurturing young musical talents through our dedicated piano lessons for kids. Located in the heart of Salt Lake City, we offer a welcoming environment where children can explore and develop their musical abilities.</p>

<h2 class="wp-block-heading">Why Choose Piano Lessons for Kids?</h2>

<h3 class="wp-block-heading">Building Foundations with Beginner Piano Lessons for Kids</h3>

<p>Starting with the basics, our beginner piano lessons for kids are designed to introduce young learners to the world of music in a fun and engaging way. By focusing on fundamental skills and simple songs, we ensure a solid foundation that will support their musical growth.</p>

<h3 class="wp-block-heading">Conveniently Located Piano Lessons for Kids Near Me</h3>

<p>For families in Salt Lake City looking for piano lessons for kids near me, Volz Piano offers easy accessibility and flexible scheduling. This convenience means less travel time and more music time!</p>

<h3 class="wp-block-heading">Discover the Best Online Piano Lessons for Kids</h3>

<p>In today’s digital age, accessibility to learning is more convenient than ever. Our best online piano lessons for kids provide interactive and comprehensive tutorials that kids can enjoy from the comfort of their home, perfect for busy families or those preferring at-home learning.</p>

<h3 class="wp-block-heading">Explore the Benefits of Piano Lessons for Kids</h3>

<p>The benefits of piano lessons for kids are extensive, ranging from enhanced cognitive development to improved hand-eye coordination and increased self-esteem. Engaging in music education can also foster patience and discipline among young learners.</p>

<h3 class="wp-block-heading">Tailored Piano Lessons for Kids in Salt Lake City</h3>

<p>At Volz Piano, we understand that each child is unique. That’s why our piano lessons for kids in Salt Lake City are customized to match the individual needs and learning pace of each student. Whether your child is a beginner or looking to improve their skills, our experienced teachers are here to guide them every step of the way.</p>

<h2 class="wp-block-heading">Cost-Effective Learning Options</h2>

<p>We believe that every child deserves the chance to learn music, which is why we offer piano lessons for kids at a variety of price points to accommodate different budgets. The cost of lessons should never be a barrier to accessing quality music education.</p>

<h2 class="wp-block-heading">Join Us at Volz Piano</h2>

<p>Discover more about our piano lessons for kids and other music programs by visiting our website at<a href="https://volzpiano.com/"> Volz Piano</a>. Here, you can explore detailed course descriptions, meet our teachers, and register for classes.</p>

<h2 class="wp-block-heading">Expert Guidance from Skilled Teachers</h2>

<p>Our piano teachers are not only experts in music but are also passionate about teaching kids. They create a supportive and motivating environment that encourages students to reach their full musical potential.</p>

<h2 class="wp-block-heading">Start Your Child’s Musical Journey Today</h2>

<p>Ready to enroll your child in piano lessons for kids? Visit Volz Piano in Salt Lake City, where music education and fun go hand in hand. Let your child experience the joy and benefits of learning piano in a supportive community.</p>

<p>For further reading on the advantages of music education for children, you can visit educational resources such as<a href="https://www.musictogether.com/"> </a><a href="https://www.musictogether.com/">Music Together</a>, which offers insights into the role of music in early childhood development.</p>

<p>At Volz Piano, we are excited to be a part of your child’s musical journey. With our piano lessons for kids, we aim to not only teach music but to inspire a lifelong love for this beautiful art form.</p>`;

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
            Ignite Musical Passions with Piano Lessons for Kids in Salt Lake at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            April 12, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/ignite-musical-passions-with-piano-lessons-for-kids-in-salt-lake-at-volz-piano.jpg"
              alt="Featured image for Ignite Musical Passions with Piano Lessons for Kids in Salt Lake at Volz Piano"
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
