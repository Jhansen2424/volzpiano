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

  const content = `<p>Are you yearning to explore the mesmerizing world of music but don't know where to start? Look no further than Volz Piano, where we specialize in beginner piano lessons that are tailor-made to ignite your musical journey. Our lessons are designed to cater to all ages, ensuring that whether you are looking for piano lessons for beginners adults or eager young minds, we have the perfect curriculum to match your needs.</p>

<h2 class="wp-block-heading"><strong>A Journey Begins with a Single Note: Basic Piano Lessons for Beginners</strong></h2>

<p>Embarking on the journey of learning piano can be both exhilarating and intimidating. At Volz Piano, located right here in Utah, we make this journey seamless and enjoyable. Our basic piano lessons for beginners are structured to ensure that you, as a budding musician, understand the fundamentals of music, from reading sheet music to grasping the keys of your beginners piano keyboard. These lessons serve as the cornerstone of your musical education, enabling you to progress confidently.</p>

<p>For those who are stepping into the world of music for the first time, our best piano lessons for beginners are designed to provide a comprehensive introduction. Not only will you learn the basics, but you will also be introduced to piano music lessons for beginners that cover various genres, ensuring a well-rounded musical education.</p>

<h3 class="wp-block-heading"><strong>Discover Your Favorite Melodies: Piano Song Lessons for Beginners</strong></h3>

<p>What's music without the songs that touch our hearts? At Volz Piano, we believe in the power of song, which is why our piano song lessons for beginners are a crucial part of our curriculum. You'll not only learn how to play the piano but also how to bring your favorite melodies to life. Whether it's classical tunes or modern hits, our experienced teachers will guide you through the process, making learning both fun and rewarding.</p>

<h3 class="wp-block-heading"><strong>Learn from the Best: Finding the Right Teacher Near Me</strong></h3>

<p>The quest to find the perfect piano teacher near me ends at Volz Piano. Our faculty comprises experienced and passionate educators who specialize in nurturing beginners. With a focus on personalized learning, we ensure that each student receives the attention and guidance they need. This personalized approach helps in demystifying the often daunting aspects of learning, such as understanding music theory and mastering the keyboard.</p>

<h4 class="wp-block-heading">Piano Lessons Cost: An Investment in Your Musical Future</h4>

<p>Understanding the cost of piano lessons is an essential aspect of embarking on your musical journey. At Volz Piano, we believe in transparency and affordability. Our lessons are priced to ensure that access to quality music education is within reach for everyone. Investing in piano lessons is not just a monetary decision but an investment in your future as a musician. To learn more about our pricing, please visit<a href="https://volzpiano.com/"> Volz Piano</a>.</p>

<h3 class="wp-block-heading"><strong>Embark on Your Musical Journey with Volz Piano</strong></h3>

<p>As you stand on the threshold of a new musical adventure, let Volz Piano be your guide. Our beginner piano lessons offer a comprehensive, enjoyable, and rewarding introduction to the world of music. With a focus on personalized learning and a commitment to excellence, we ensure that each student receives the foundation they need to succeed.</p>

<p>For those seeking to explore the enriching world of piano music, remember that the journey of a thousand melodies begins with a single note. Start your musical journey today by visiting<a href="https://volzpiano.com/"> Volz Piano</a> and discovering the perfect beginner piano lessons for you.</p>

<p>As you consider embarking on this musical journey, it's helpful to refer to external resources for additional insights into the benefits of learning music. The<a href="https://nafme.org/"> National Association for Music Education</a> offers valuable information on the positive impacts of music education on personal and cognitive development. This resource can be a great complement to the hands-on learning experience provided by Volz Piano.</p>

<p>Whether you're a complete novice eager to learn the basics or someone looking to rediscover their musical passion, Volz Piano is here to ensure your journey into the world of piano music is a fulfilling one. Join us and unlock the door to a lifetime of musical enjoyment.</p>`;

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
            Beginner Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            March 06, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/beginner-piano-lessons-at-volz-piano.jpg"
              alt="Featured image for Beginner Piano Lessons at Volz Piano"
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
