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

  const content = `<span style="font-weight: 400;">Are you searching for exceptional piano teachers in Utah? At Volz Piano, we take pride in offering high-quality instruction across various locations, including South Jordan, Springville, West Jordan, and Bountiful. Whether you're looking for beginner lessons or advanced coaching, our experienced teachers are dedicated to helping you reach your musical goals.</span>
<h3><b>Why Choose Piano Teachers in Utah at Volz Piano?</b></h3>
<span style="font-weight: 400;">At Volz Piano, our piano teachers in Utah are committed to providing personalized instruction tailored to your needs and aspirations. Whether you're interested in classical music, jazz, or contemporary styles, our instructors offer comprehensive lessons that foster growth and creativity.</span>
<h3><b>Find Expert Piano Teachers Near You</b></h3>
<h4><b>Piano Teachers in South Jordan, Utah</b></h4>
<span style="font-weight: 400;">Located in South Jordan? Our piano teachers in South Jordan, Utah, provide convenient access to top-notch instruction. Join us and experience the benefits of learning from passionate and skilled educators in your community.</span>
<h4><b>Piano Teachers in Springville, Utah</b></h4>
<span style="font-weight: 400;">If you reside in Springville, Utah, our piano teachers offer enriching lessons that cater to all ages and skill levels. Discover the joy of playing the piano with guidance from dedicated instructors who are committed to your musical development.</span>
<h4><b>Piano Teachers in West Jordan, Utah</b></h4>
<span style="font-weight: 400;">In West Jordan, Utah, our piano teachers are known for their expertise and dedication to student success. Whether you're a beginner or seeking advanced coaching, our instructors provide a supportive learning environment where you can thrive.</span>
<h4><b>Piano Teachers in Bountiful, Utah</b></h4>
<span style="font-weight: 400;">For residents of Bountiful, Utah, our piano teachers offer engaging lessons designed to inspire and empower. Learn from the best and explore your musical potential with tailored instruction that suits your learning style.</span>
<h3><b>Comprehensive Piano Instruction and Services</b></h3>
<h4><b>Lessons and Services Offered</b></h4>
<span style="font-weight: 400;">At Volz Piano, we offer a wide range of services to meet your musical needs. From private lessons to group classes, we cater to individuals of all ages and abilities. Our competitive pricing ensures that high-quality piano education is accessible to everyone.</span>
<h4><b>Cost of Piano Lessons</b></h4>
<span style="font-weight: 400;">Wondering about the cost of piano lessons? At Volz Piano, we provide transparent pricing for our services. Visit our pricing page for detailed information on lesson rates and packages.</span>
<h3><b>Join the Volz Piano Community</b></h3>
<span style="font-weight: 400;">Ready to embark on your musical journey with top piano teachers in Utah? Join the Volz Piano community and experience the joy of playing the piano. Whether you're a beginner or an experienced pianist, we have the perfect program for you.</span>

<span style="font-weight: 400;">For more information on our piano teachers and to schedule a consultation, visit our contact page.</span>
<h4><b>External Resource</b></h4>
<span style="font-weight: 400;">For further insights into finding the best piano teachers, explore this article from Piano Teachers Association.</span>

<span style="font-weight: 400;">Discover excellence in music education with top piano teachers in Utah at Volz Piano. Start your journey today and unlock your musical potential!</span>

&nbsp;`;

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
            Discover Top Piano Teachers in Utah at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            July 08, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/discover-top-piano-teachers-in-utah-at-volz-piano.jpg"
              alt="Featured image for Discover Top Piano Teachers in Utah at Volz Piano"
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
