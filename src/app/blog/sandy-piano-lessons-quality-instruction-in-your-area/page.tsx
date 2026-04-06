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

  const content = `<span style="font-weight: 400;">Learning to play the piano is a rewarding journey that requires dedication and the right guidance. For those in Sandy, Utah, finding the perfect piano lessons can be the key to unlocking your musical potential. Sandy Piano Lessons offer tailored instruction to meet the needs of students at any level, from beginners to advanced players.</span>
<h2><b>Why Choose Sandy Piano Lessons?</b></h2>
<span style="font-weight: 400;">Sandy Piano Lessons provide an exceptional learning experience by offering personalized instruction tailored to each student’s skill level and goals. Whether you’re interested in piano lessons Sandy Springs or looking for lessons closer to home in Sandy, Utah, finding the right teacher is crucial. With experienced instructors, students receive one-on-one attention that helps them progress more quickly and effectively.</span>

<span style="font-weight: 400;">One of the main benefits of taking piano lessons in Sandy, Utah, is the convenience of having qualified teachers nearby. Whether you’re searching for “piano lessons near me” or looking for specialized instruction like piano lessons Sandy Moser, the local options are abundant. This allows students to find a teacher who matches their learning style and schedule, making it easier to stay committed to their musical journey.</span>
<h3><b>The Benefits of Local Piano Lessons in Sandy</b></h3>
<span style="font-weight: 400;">Choosing Sandy Piano Lessons means you’ll receive high-quality instruction tailored to your specific needs. Local teachers understand the community and can provide lessons that are both relevant and engaging.</span>

<span style="font-weight: 400;">The cost of Sandy Piano Lessons is often more affordable than lessons in larger cities, making it an accessible option for many families. Additionally, with lessons available locally, there’s no need to travel far, saving time and reducing stress. This is especially important for busy families or adults with tight schedules.</span>
<h3><b>What to Expect from Sandy Piano Lessons</b></h3>
<span style="font-weight: 400;">When you enroll in Sandy Piano Lessons, you can expect a comprehensive approach to learning the piano. Teachers in the Sandy area are skilled in various teaching methods, allowing them to adapt lessons to the student’s individual needs. Whether you’re taking lessons for fun or preparing for a recital, the instruction is designed to help you succeed.</span>

<span style="font-weight: 400;">The cost of Sandy Piano Lessons varies depending on the teacher and the length of the lessons. However, many local instructors offer competitive rates, making it an affordable option for those in the Sandy area. For more information on the average cost of piano lessons, you can refer to this informative article.</span>
<h3><b>Finding the Right Piano Teacher in Sandy</b></h3>
<span style="font-weight: 400;">Selecting the right piano teacher is essential for a successful learning experience. In Sandy, Utah, there are numerous qualified instructors available. It’s important to choose a teacher who understands your learning style and can provide the guidance you need to reach your goals.</span>

<span style="font-weight: 400;">If you’re unsure where to start, consider visiting our</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;"> for more information on Volz Piano Lessons. We offer a range of options to suit different needs and skill levels, making it easy to find the perfect match for your musical journey.</span>
<h3><b>Conclusion: Start Your Musical Journey with Sandy Piano Lessons</b></h3>
<span style="font-weight: 400;">Volz Piano Lessons provide the perfect opportunity to learn and grow as a musician. With local teachers who are dedicated to helping you succeed, you’ll receive the personalized instruction needed to develop your skills. Whether you’re a beginner or an experienced player, there’s a lesson plan that’s right for you.</span>

<span style="font-weight: 400;">By choosing Volz Piano Lessons, you’re investing in your future as a musician. With the right teacher, the convenience of local lessons, and a supportive learning environment, you’ll be well on your way to mastering the piano.</span>

<span style="font-weight: 400;">Ready to start your journey? Visit our</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;"> to learn more about how Volz Piano can help you achieve your musical goals.</span>`;

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
            Sandy Piano Lessons: Quality Instruction in Your Area
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            August 25, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/sandy-piano-lessons-quality-instruction-in-your-area.jpg"
              alt="Featured image for Sandy Piano Lessons: Quality Instruction in Your Area"
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
