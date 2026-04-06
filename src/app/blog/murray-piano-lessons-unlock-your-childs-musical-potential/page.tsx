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

  const content = `<span style="font-weight: 400;">If you're searching for top-quality piano instruction in Murray, Utah, look no further than Murray Piano Lessons. Tailored to meet the needs of students of all ages and skill levels, these lessons offer a comprehensive approach to learning the piano, whether you're a beginner or an experienced player looking to refine your skills.</span>
<h2><b>Why Choose Murray Piano Lessons?</b></h2>
<span style="font-weight: 400;">Murray Piano Lessons provide personalized instruction that focuses on developing both technical skills and a love for music. Whether you’re seeking Murray piano lessons for kids or looking for Murray beginner piano lessons for yourself, you’ll find that the lessons are designed to accommodate each student’s unique learning style.</span>
<h3><b>Murray Piano Lessons for Beginners</b></h3>
<span style="font-weight: 400;">For those just starting out, Murray Piano Lessons offer an ideal introduction to the world of music. The beginner piano lessons are structured to ensure that students gain a solid foundation in piano playing, making the learning process both enjoyable and effective. If you're looking for "Murray beginner piano lessons," you'll appreciate the patient and supportive teaching methods that help beginners progress at their own pace.</span>
<h3><b>Convenient and Accessible Learning</b></h3>
<span style="font-weight: 400;">Located right in Murray, these piano lessons are easily accessible to residents in the area. If you've been searching for "Murray children's piano lessons near me," you'll find that the local instructors offer a convenient option for busy families. Additionally, if you're interested in the best piano lessons online in Murray, many teachers provide flexible online options that allow students to learn from the comfort of their own homes.</span>
<h3><b>Affordable Piano Lessons in Murray, Utah</b></h3>
<span style="font-weight: 400;">One of the most common questions parents have when looking for piano lessons is the cost. Volz Piano Lessons offer competitive pricing, making them an affordable choice for families. Whether you're looking for lessons "per month" or on a different schedule, you'll find that the cost of piano lessons in Murray, Utah, is reasonable and accessible to a wide range of students. For more detailed information on the average cost of piano lessons, check out this helpful guide.</span>
<h3><b>Tailored Instruction for Every Student</b></h3>
<span style="font-weight: 400;">Volz Piano Lessons are designed to meet the needs of every student, whether you're a child, teenager, or adult. With a focus on individual progress, these lessons ensure that students are continually challenged and motivated to improve. The instructors are experienced and dedicated to providing high-quality education, making them some of the best piano teachers in the area.</span>
<h3><b>Murray Piano Lessons for Kids</b></h3>
<span style="font-weight: 400;">If you're looking for piano lessons specifically tailored for children, Murray Piano Lessons offer specialized instruction that caters to young learners. These lessons are designed to be engaging and fun, helping children develop a love for music from an early age. Whether you're searching for "Murray piano lessons for kids" or "Murray children's piano lessons near me," you'll find programs that are both educational and enjoyable.</span>
<h3><b>Conclusion: Start Your Musical Journey Today</b></h3>
<span style="font-weight: 400;">Volz Piano Lessons offer the perfect opportunity to develop your or your child’s musical talents. With experienced instructors, flexible scheduling, and a focus on personalized learning, these lessons are an excellent choice for anyone looking to learn piano in Murray, Utah.</span>

<span style="font-weight: 400;">Ready to start your musical journey? Visit our</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;"> to learn more about how Volz Piano can help you achieve your musical goals. Whether you’re interested in in-person lessons or exploring the best online options, Murray Piano Lessons have something for everyone. Start today and discover the joy of playing the piano!</span>`;

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
            Murray Piano Lessons: Unlock Your Child&apos;s Musical Potential
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            August 29, 2024
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
