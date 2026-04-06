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

  const content = `<p>Welcome to <a href="https://volzpiano.com/the-ultimate-guide-to-piano-learning-methods/">Volz Piano</a>, your premier destination for in-home piano lessons in Salt Lake City. Whether you're a beginner or looking to refine your skills, our expert teachers bring personalized piano education right to your doorstep.</p>

<h2 class="wp-block-heading">Personalized Piano Lessons in Your Home</h2>

<p>Our in-home piano lessons offer a convenient and effective way to <a href="https://volzpiano.com/the-ultimate-guide-to-piano-teaching-methods-for-kids-volz-pianos-expert-approach-in-salt-lake-utah-counties/">learn piano</a> without stepping out of your house. We cater to all age groups and skill levels, providing tailored tutorials that match your learning pace and musical interests.</p>

<h2 class="wp-block-heading">The Ease of Private Piano Lessons in Your Home</h2>

<p>One of the main benefits of private piano lessons in your home is the individual attention you receive from our dedicated teachers. This <a href="https://volzpiano.com/best-piano-learning-methods-for-kids-a-comprehensive-guide/">one-on-one approach</a> allows for faster progress and a deeper understanding of piano techniques and music theory.</p>

<h2 class="wp-block-heading">In-Home Piano Lessons Near Me</h2>

<p>For residents of Salt Lake City looking for piano lessons in home near me, Volz Piano ensures that you have access to the <a href="https://volzpiano.com/the-ultimate-guide-to-piano-lessons-near-me/">best music education</a> right in your neighborhood. Our experienced teachers travel to your location, bringing quality piano instruction to your living room.</p>

<h2 class="wp-block-heading">Tailoring Lessons to Kids and Adults Alike</h2>

<p>In-home piano lessons for kids are designed to make learning fun and engaging, helping <a href="https://volzpiano.com/unleashing-your-childs-musical-talent-with-the-best-at-home-piano-lessons/">young learners </a>develop a passion for music early on. For adults, we offer customized sessions that fit into your busy schedules and meet your specific musical goals.</p>

<h2 class="wp-block-heading">Understanding the Costs</h2>

<p>When it comes to in-home piano lessons cost, Volz Piano offers transparent pricing with no hidden fees. Our rates are competitive and reflect the <a href="https://volzpiano.com/teaching-piano-lessons-at-home-the-ultimate-guide-for-parents-in-salt-lake-utah-counties/">high quality and convenience</a> of our services. You can find more detailed information on our Pricing Page.</p>

<h2 class="wp-block-heading">Why Choose Volz Piano?</h2>

<p>At Volz Piano, we pride ourselves on offering the best private piano lessons in your home. Our teachers are not only skilled musicians but also passionate educators who are committed to <a href="https://volzpiano.com/piano-lessons-at-home-for-kids-volz-pianos-complete-guide-to-in-home-music-education/">nurturing your musical abilities</a>.</p>

<h2 class="wp-block-heading">Benefits of In-Home Piano Lessons</h2>

<p>Choosing in-home piano lessons allows for a personalized learning environment that can significantly enhance your comfort and concentration. It also saves time and reduces the hassle of traveling to a music school. Moreover, having a <a href="https://volzpiano.com/the-ultimate-guide-to-at-home-piano-lessons-for-kids/">private tutor</a> come to your home ensures lessons are tailored specifically to your needs and progress rate.</p>

<h2 class="wp-block-heading">Learn from Experienced Teachers</h2>

<p>Each of our piano teachers is carefully selected for their expertise and their ability to engage students effectively. They provide not just lessons, but also valuable feedback and ongoing support to ensure you are advancing in your <a href="https://volzpiano.com/the-ultimate-guide-to-piano-lessons-for-kids-nurturing-young-pianists-with-volz-piano/">piano skills</a>.</p>

<h2 class="wp-block-heading">Book Your In-Home Piano Lessons Today</h2>

<p>Ready to start your musical journey from the comfort of your home? Visit Volz Piano at<a href="https://volzpiano.com/"> </a><a href="https://volzpiano.com/">https://volzpiano.com/</a> to learn more about our in-home piano lessons and to schedule your first session. Let us bring the joy of music into your home, one note at a time.</p>

<p>For those interested in further understanding the advantages of music education, the<a href="https://nafme.org/"> </a><a href="https://nafme.org/">National Association for Music Education</a> provides great insights into how music learning can benefit individuals of all ages.</p>

<p>Embrace the convenience and effectiveness of in-home piano lessons with Volz Piano. We are here to make your learning experience as rewarding and enjoyable as possible.</p>`;

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
            Piano Lesson At Home
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
            Master the Piano from the Comfort of Your Home with In-Home Piano Lessons in Salt Lake
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            May 20, 2025
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
