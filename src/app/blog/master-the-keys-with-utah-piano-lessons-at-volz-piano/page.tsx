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

  const content = `<span style="font-weight: 400;">Are you passionate about playing the piano? Whether you're a beginner, an experienced player, or seeking lessons for your children, Volz Piano offers comprehensive Utah piano lessons to meet your needs. Discover the joy of music and unlock your potential with our expert instructors.</span>
<h3><b>Why Choose Utah Piano Lessons at Volz Piano?</b></h3>
<span style="font-weight: 400;">Utah piano lessons at Volz Piano are designed to cater to students of all ages and skill levels. Our experienced piano teachers in Utah provide personalized instruction that ensures each student receives the attention and guidance they need to succeed.</span>
<h3><b>Tailored Lessons for Every Age and Skill Level</b></h3>
<h4><b>Beginner Piano Lessons in Utah</b></h4>
<span style="font-weight: 400;">Starting your piano journey? Our beginners piano lessons in Utah are perfect for those new to the instrument. Our patient and knowledgeable teachers will guide you through the basics, ensuring you build a solid foundation.</span>
<h4><b>Piano Lessons for Adults in Utah</b></h4>
<span style="font-weight: 400;">It's never too late to start or continue your piano journey. Our adult piano lessons in Utah are tailored to fit your busy schedule and personal goals. Whether you're looking to learn classical pieces or contemporary songs, we have the right program for you.</span>
<h4><b>Kids Piano Lessons in Utah</b></h4>
<span style="font-weight: 400;">For kids, learning piano can be a fun and rewarding experience. Our kids piano lessons in Utah are designed to make learning enjoyable and engaging. Our instructors use creative teaching methods to keep young learners motivated and excited about music.</span>
<h3><b>Comprehensive Piano Instruction in Utah</b></h3>
<h4><b>Piano Lessons in Salt Lake, Utah</b></h4>
<span style="font-weight: 400;">Located in Salt Lake City? Our piano lessons in Salt Lake, Utah, offer convenient and high-quality instruction for students in the area. Join us and experience the benefits of personalized, one-on-one lessons.</span>
<h4><b>Piano Lessons in Utah County</b></h4>
<span style="font-weight: 400;">We also offer piano lessons in Utah County, ensuring that students throughout the region have access to top-notch instruction. Whether you live in Provo, Orem, or another nearby city, our lessons are designed to fit your needs.</span>
<h3><b>The Benefits of Utah Piano Lessons</b></h3>
<span style="font-weight: 400;">Taking Utah piano lessons provides numerous benefits, including improved cognitive development, better hand-eye coordination, and a creative outlet for self-expression. Learning to play the piano can also be a great way to relieve stress and enjoy a lifelong hobby.</span>
<h3><b>How Much Do Utah Piano Lessons Cost?</b></h3>
<span style="font-weight: 400;">One of the most common questions is about the cost of piano lessons. The cost of Utah piano lessons at Volz Piano varies based on the length and frequency of lessons. We offer competitive pricing to ensure that high-quality piano education is accessible to everyone. For detailed pricing information, visit our pricing page.</span>
<h3><b>Find the Best Piano Teacher Near You</b></h3>
<span style="font-weight: 400;">Finding the right piano teacher near you is crucial for your learning experience. At Volz Piano, our team of experienced and passionate instructors is dedicated to helping you achieve your musical goals. We pride ourselves on creating a supportive and encouraging learning environment.</span>
<h3><b>Join the Volz Piano Family</b></h3>
<span style="font-weight: 400;">Ready to start your musical journey with Utah piano lessons? Join the Volz Piano family and experience the joy of playing piano. Whether you're a beginner, an adult learner, or looking for lessons for your child, we have the perfect program for you.</span>

<span style="font-weight: 400;">For more information on our lessons and to schedule a free trial, visit our contact page.</span>
<h4><b>External Resource</b></h4>
<span style="font-weight: 400;">For further reading on the benefits of piano lessons and tips for beginners, check out this insightful article from Piano Lessons.</span>

<span style="font-weight: 400;">Experience the transformative power of music with Utah piano lessons at Volz Piano. Start your journey today and elevate your skills!</span>`;

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
            Master the Keys with Utah Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            July 03, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/master-the-keys-with-utah-piano-lessons-at-volz-piano.jpg"
              alt="Featured image for Master the Keys with Utah Piano Lessons at Volz Piano"
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
