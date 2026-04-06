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

  const content = `<p>If you're based in Utah and have ever dreamed of playing the piano, then Sandy Piano Lessons might be the perfect opportunity for you to start your musical journey. Whether you're in Sandy Springs or right here in Sandy, Utah, quality piano instruction is closer than you think.</p>

<h2 class="wp-block-heading"><strong>Why Choose Sandy Piano Lessons?</strong></h2>

<p>Expert Instruction: At the heart of Sandy Piano Lessons is a team of highly skilled instructors, including the renowned Sandy Moser. Each teacher brings not only expertise in music but also a passion for teaching that inspires their students.</p>

<p>Convenience: Located conveniently for residents throughout Sandy, including those searching for piano lessons near me, our studio offers a welcoming environment where students of all ages can learn and grow musically.</p>

<p>Affordability: Understanding the cost concerns that often accompany enrollment in musical classes, we've structured our Sandy Piano Lessons to be both affordable and valuable, ensuring every student gets the best education without breaking the bank.</p>

<p>Versatility: Whether you are interested in classical piano lessons in Sandy, Utah, or the more contemporary styles, our curriculum is diverse enough to meet a wide range of musical interests and skill levels.</p>

<h3 class="wp-block-heading"><strong>Personalized Learning Experience</strong></h3>

<p>Each student at Sandy Piano Lessons receives personalized attention tailored to their individual needs and goals. This one-on-one approach ensures that every lesson is not just a learning experience but also a step towards mastering the piano.</p>

<p>Our teachers focus on a comprehensive curriculum that includes theory, technique, and performance skills, allowing students to develop a well-rounded musical education. For more information about our teaching philosophy and the unique benefits we offer, visit our About Us page.</p>

<h3 class="wp-block-heading"><strong>Benefits Beyond Music</strong></h3>

<p>Engaging in Sandy Piano Lessons goes beyond just learning an instrument. Numerous studies, including those referenced by Music Education Works, highlight the broader cognitive and emotional benefits of learning music. These include improved memory, better problem-solving skills, and enhanced coordination.</p>

<h3 class="wp-block-heading"><strong>Enroll in Sandy Piano Lessons Today</strong></h3>

<p>If you're looking for piano lessons Sandy or any local areas around, now is the perfect time to get started. Sandy Piano Lessons offers a variety of options tailored to fit your schedule and your musical preferences.</p>

<p>With Sandy Piano Lessons, you're not just learning an instrument; you're joining a community of music lovers who are passionate about bringing the joy of music into their lives. Whether you’re a beginner or an advanced player, our doors are open to helping you achieve your musical dreams.</p>

<p>Ready to hit the keys and let your musical dreams take flight? Contact us today to learn more about Sandy Piano Lessons and how we can help turn your musical aspirations into reality. Whether you seek the structured approach of Piano Lessons Sandy or the flexible styles available in our diverse offerings, your perfect piano path starts here. Join us at Sandy Piano Lessons, where every note counts!</p>`;

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
            Embrace the Art of Music with Sandy Piano Lessons
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            May 22, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/embrace-the-art-of-music-with-sandy-piano-lessons.jpg"
              alt="Featured image for Embrace the Art of Music with Sandy Piano Lessons"
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
