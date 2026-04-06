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

  const content = `<span style="font-weight: 400;">Looking for high-quality piano instruction in West Valley City? Whether you're a beginner or an advanced player, West Valley City Piano Lessons offer the perfect solution for your musical journey. With experienced instructors and flexible learning options, you can find the right lessons tailored to your needs.</span>
<h2><b>Why Choose West Valley City Piano Lessons?</b></h2>
<span style="font-weight: 400;">West Valley City Piano Lessons provide a comprehensive approach to learning the piano, designed to accommodate all ages and skill levels. Whether you're interested in West Valley City piano lessons for kids or looking to advance your own skills, our lessons are structured to help you succeed.</span>
<h3><b>Beginner Piano Lessons in West Valley City</b></h3>
<span style="font-weight: 400;">Starting your piano journey can be both exciting and challenging. With West Valley City beginner piano lessons, you’ll receive personalized instruction that builds a strong foundation in piano playing. Our experienced teachers focus on developing essential skills, ensuring that beginners progress confidently and enjoyably.</span>
<h3><b>Advanced Piano Lessons in West Valley City</b></h3>
<span style="font-weight: 400;">For those who are more advanced, Volz Piano Lessons offer tailored programs that challenge and refine your skills. Whether you're preparing for a recital or simply looking to enhance your technique, our advanced lessons cater to your unique goals.</span>
<h3><b>Convenient Online Piano Lessons</b></h3>
<span style="font-weight: 400;">If you're searching for the best piano lessons online in West Valley City, we've got you covered. Our online lessons offer the same high-quality instruction as our in-person classes, with the added convenience of learning from the comfort of your own home.</span>
<h3><b>Piano Lessons for Kids in West Valley City</b></h3>
<span style="font-weight: 400;">Parents looking for piano lessons for their children will find that West Valley City Piano Lessons are both educational and fun. Our instructors are skilled in working with young learners, ensuring that each child develops a love for music. Whether you're searching for "West Valley City piano lessons for kids" or "piano lessons near me," our local instructors provide convenient and engaging lessons for children.</span>
<h3><b>Affordable Piano Lessons in West Valley City</b></h3>
<span style="font-weight: 400;">One of the most common questions parents and students ask is about the cost of piano lessons. West Valley City Piano Lessons offer competitive pricing, making it easier for families to invest in quality music education. Whether you're interested in lessons "per month" or have specific budget considerations, we offer flexible pricing options to suit your needs. For a detailed look at the average costs of piano lessons, check out this helpful guide.</span>
<h3><b>Get Started with West Valley City Piano Lessons Today!</b></h3>
<span style="font-weight: 400;">Whether you’re a beginner, advanced player, or looking for lessons for your child, Volz Piano Lessons offer the perfect environment to grow your musical talents. With personalized instruction, flexible scheduling, and competitive pricing, you can embark on your musical journey with confidence.</span>

<span style="font-weight: 400;">Visit our</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;"> to learn more about how Volz Piano can help you achieve your musical goals. Whether you're looking for in-person lessons or the best online options, West Valley City Piano Lessons have something for everyone. Start today and discover the joy of playing the piano!</span>`;

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
            Discover the Best West Valley City Piano Lessons for All Ages and Skill Levels
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            August 31, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/discover-the-best-west-valley-city-piano-lessons-for-all-ages-and-skill-levels.jpg"
              alt="Featured image for Discover the Best West Valley City Piano Lessons for All Ages and Skill Levels"
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
