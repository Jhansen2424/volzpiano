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

  const content = `<p>Embarking on a musical journey has never been more exciting, especially when it comes to learning the piano in the vibrant city of Salt Lake. At<a href="https://volzpiano.com/"> Volz Piano</a>, we are dedicated to offering an enriching experience through our Salt Lake piano lessons, tailored to meet the aspirations of every student, from beginners to seasoned pianists.</p>

<h3 class="wp-block-heading"><strong>Beginner Piano Lessons Salt Lake: A Gateway to Musical Excellence</strong></h3>

<p>Starting with beginner piano lessons in Salt Lake is a step into a world of musical exploration. Our beginner programs are designed not just for kids but for adults too, making it a perfect starting point for anyone looking to dive into music for the first time. Our experienced teachers near you are committed to making learning fun and effective, setting a solid foundation for your musical journey.</p>

<h3 class="wp-block-heading"><strong>Piano Lessons for Adults Salt Lake City: It's Never Too Late to Learn</strong></h3>

<p>For adults in Salt Lake City contemplating a foray into music, our piano lessons offer a golden opportunity. Whether you're looking to rekindle an old passion or start a new hobby, our private piano lessons in Salt Lake City cater to adult learners of all levels. Our approach is personalized, ensuring that each session is as rewarding and fulfilling as possible.</p>

<h3 class="wp-block-heading"><strong>Private Piano Lessons Salt Lake City: Personalized Learning Experience</strong></h3>

<p>The beauty of private piano lessons in Salt Lake City lies in the personalized attention you receive. Tailored to fit your individual needs and goals, these one-on-one sessions with our skilled teachers enable rapid progress and a deeper understanding of music. Plus, they're conveniently located near you, making it easier than ever to fit lessons into your busy schedule.</p>

<h3 class="wp-block-heading"><strong>How Much Do Piano Lessons Cost in Salt Lake City?</strong></h3>

<p>Understanding the investment in your musical education is important. While the cost of piano lessons in Salt Lake City can vary, at Volz Piano, we strive to offer competitive rates without compromising on quality. We believe in making music education accessible to all, ensuring that everyone can experience the joy and benefits of learning piano. For specific pricing details, we encourage you to visit our website or contact us directly.</p>

<h3 class="wp-block-heading"><strong>Piano Lessons for Kids Salt Lake City: Cultivating Tomorrow's Musicians</strong></h3>

<p>Nurturing a child's love for music early on is a gift that lasts a lifetime. Our piano lessons for kids in Salt Lake City are designed to be engaging, fun, and educational. By focusing on both the enjoyment and the discipline of music, we help children develop their skills, confidence, and passion for piano.</p>

<h3 class="wp-block-heading"><strong>Embrace the Music Within You</strong></h3>

<p>Embarking on your musical journey with Salt Lake piano lessons at Volz Piano is more than just learning to play an instrument; it's about discovering a new form of expression, building confidence, and joining a community of music lovers. Whether you're a beginner or looking to advance your skills, our experienced teachers and tailored programs are here to guide you every step of the way.</p>

<p>To learn more about our diverse music programs and how we can help you achieve your musical dreams, visit Volz Piano. Let your musical journey begin today!</p>

<p>For those interested in further reading on the benefits of learning music, check out this insightful article from the National Association for Music Education: <a href="https://nafme.org/">The Benefits of Music Education.</a></p>

<p>Embark on your musical journey with us and discover the transformative power of Salt Lake piano lessons at Volz Piano. Whether you're seeking personal enrichment or aspiring to achieve musical mastery, we're here to support you in realizing your potential. Let's make music together!</p>`;

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
            Discover the Joy of Music with Salt Lake Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            March 01, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

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
