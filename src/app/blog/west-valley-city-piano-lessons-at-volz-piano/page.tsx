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

  const content = `<p>In the heart of Utah, the vibrant tones of piano music resonate, offering a unique journey of musical discovery and mastery. At Volz Piano, we're proud to introduce our specialized West Valley City Piano Lessons, tailored to foster the skills of aspiring musicians and seasoned players alike. Whether you're searching for piano lessons in West Valley, Utah, or aiming to experience the thrill of a piano concerto at West Valley, we're here to guide you every step of the way.</p>

<h3 class="wp-block-heading"><strong>A Symphony of Learning Opportunities</strong></h3>

<p>Our West Valley City Piano Lessons are designed to cater to a wide range of musical interests and abilities. From beginners taking their first steps into the world of music to advanced students looking to refine their technique and expressivity, our lessons offer something for everyone. With a focus on personalized instruction, we ensure that each student receives the attention and guidance necessary to achieve their musical goals.</p>

<h3 class="wp-block-heading"><strong>The Right Note: Quality and Accessibility</strong></h3>

<p>At Volz Piano, we understand that the cost and location of piano lessons can be significant factors for many families. That's why we strive to offer West Valley City Piano Lessons at competitive prices, making high-quality music education accessible to all. Our studio, conveniently located near you in West Valley City, provides a welcoming and inspiring environment for students to explore their musical talents.</p>

<h3 class="wp-block-heading"><strong>Beyond the Basics</strong></h3>

<p>For those looking to delve deeper into the art of piano playing, our lessons extend beyond the basics. We offer specialized training that includes preparation for piano concertos and advanced techniques, ensuring that our students are well-equipped to take their skills to the stage. It's an opportunity not just to learn, but to excel and share your music with the community.</p>

<h3 class="wp-block-heading"><strong>Join Us Today</strong></h3>

<p>Embarking on your musical journey with West Valley City Piano Lessons at Volz Piano means becoming part of a supportive and passionate community. Whether you're just starting out or looking to take your piano playing to the next level, we're here to support your growth and love for music. Explore our offerings and discover why we're the preferred choice for piano lessons in West Valley City. Visit us at<a href="https://volzpiano.com/"> Volz Piano</a> to learn more and enroll today.</p>

<p>To deepen your understanding of the benefits of piano lessons and the impact they can have on cognitive development and emotional well-being, we encourage you to read this insightful article from <a href="https://hello.fullsail.edu/music-ent-9b?mncid=12444&amp;mnckeyword=+music%20+university&amp;affiliatecode=73873742552462_kwd-73873758322336:loc-149&amp;step=input&amp;mchammer=1&amp;msclkid=e96828baf5c01a1c517e4d4a8557baf4&amp;utm_source=bing&amp;utm_medium=cpc&amp;utm_campaign=All-Music%20:%20Broad%20:%20EDU%20:%2012444&amp;utm_content=Music%20Production%20-%20Broad">Music Education</a>, a reputable source for music education resources. It highlights the transformative power of music education and serves as a valuable resource for parents and students considering piano lessons.</p>

<p>Embrace the music within you and let the journey begin with West Valley City Piano Lessons at Volz Piano. Where every note counts, and every student shines.</p>`;

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
            West Valley City Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            March 29, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/west-valley-city-piano-lessons-at-volz-piano.jpg"
              alt="Featured image for West Valley City Piano Lessons at Volz Piano"
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
