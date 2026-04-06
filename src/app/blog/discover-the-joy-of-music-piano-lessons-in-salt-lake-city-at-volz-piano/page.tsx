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

  const content = `<span style="font-weight: 400;">Are you seeking to delve into the world of music through the piano? Look no further than Volz Piano, where we offer comprehensive Salt Lake piano lessons tailored to various age groups and skill levels. From youngsters to adults, our lessons are designed to nurture your musical talent in a supportive and enriching environment.</span>
<h2><b>Why Choose Salt Lake Piano Lessons at Volz Piano?</b></h2>
<span style="font-weight: 400;">Expert Teachers Near You: At Volz Piano, we pride ourselves on our team of highly qualified and passionate piano teachers. Each teacher brings a wealth of experience and a unique teaching style, ensuring that every student receives personalized attention and guidance. Whether you're looking for private piano lessons in Salt Lake City or prefer group settings, our instructors are here to help you achieve your musical goals.</span>

<span style="font-weight: 400;">Diverse Lesson Options: Our offerings include beginner piano lessons in Salt Lake, adult piano lessons in Salt Lake City, and kids piano lessons in Salt Lake City. We understand that each learner has different needs, and our curriculum is crafted to cater to beginners, intermediates, and advanced students alike. From classical to contemporary music, our lessons cover various genres, providing a well-rounded musical education.</span>
<h3><b>Understanding the Investment - How Much Do Piano Lessons Cost in Salt Lake City?</b></h3>
<span style="font-weight: 400;">When considering private piano lessons in Salt Lake City, it's important to understand the investment involved. At Volz Piano, we believe in transparency and offer competitive rates for our lessons. The cost can vary depending on the length and frequency of lessons, but rest assured, our pricing reflects the quality and personalized approach we bring to each session. For detailed pricing, please visit our website or contact us directly.</span>
<h3><b>The Benefits of Private Piano Lessons in Salt Lake City</b></h3>
<span style="font-weight: 400;">Opting for private piano lessons in Salt Lake City provides numerous benefits. These one-on-one sessions allow for tailored instruction that addresses specific challenges and goals. Students can progress at their own pace, receiving immediate feedback and adjustments from their teachers. This personalized approach ensures optimal learning and development.</span>
<h3><b>Get Started with Your Musical Journey Today!</b></h3>
<span style="font-weight: 400;">Ready to start your musical journey with Salt Lake piano lessons? Whether you’re a beginner eager to learn the basics or an experienced pianist looking to refine your skills, Volz Piano is here to support you every step of the way. Check out our </span><a href="https://volzpiano.com/volz-method-best-piano-teaching-medthod/"><span style="font-weight: 400;">lessons page</span></a><span style="font-weight: 400;"> for more information on how to enroll.</span>

<span style="font-weight: 400;">For additional insights into the benefits of learning music and tips for beginners, consider reading this helpful article from </span><a href="https://www.musicradar.com/"><span style="font-weight: 400;">MusicRadar</span></a><span style="font-weight: 400;">. It highlights why the piano is a fantastic choice for both young learners and adults.</span>

<span style="font-weight: 400;">At Volz Piano, we are dedicated to fostering a love for music in our community. Our Salt Lake piano lessons are more than just educational—they are a gateway to a lifelong passion for music. Join us and experience the joy and fulfillment that playing the piano can bring to your life!</span>`;

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
            Discover the Joy of Music: Piano Lessons in Salt Lake City at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            May 01, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/discover-the-joy-of-music-piano-lessons-in-salt-lake-city-at-volz-piano.jpg"
              alt="Featured image for Discover the Joy of Music: Piano Lessons in Salt Lake City at Volz Piano"
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
