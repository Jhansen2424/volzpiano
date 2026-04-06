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

  const content = `<span style="font-weight: 400;">At Volz Piano, we are committed to making high-quality music education accessible and convenient for all. Our Orem At-Home Piano Lessons are designed to provide personalized instruction in the comfort of your home. Whether you're a beginner or an advanced player, our experienced instructors are here to help you achieve your musical goals.</span>
<h3><b>Why Choose Orem At-Home Piano Lessons?</b></h3>
<span style="font-weight: 400;">Orem At-Home Piano Lessons offer numerous benefits, making them an excellent choice for students of all ages:</span>
<ol>
 	<li style="font-weight: 400;" aria-level="1"><b>Personalized Attention</b><span style="font-weight: 400;">: Our private lessons ensure that each student receives individualized instruction tailored to their specific needs and goals.</span></li>
 	<li style="font-weight: 400;" aria-level="1"><b>Convenience and Comfort</b><span style="font-weight: 400;">: Learning at home eliminates the need for travel and allows students to learn in a familiar and comfortable environment.</span></li>
 	<li style="font-weight: 400;" aria-level="1"><b>Flexible Scheduling</b><span style="font-weight: 400;">: With at-home lessons, you can schedule classes at times that work best for you and your family.</span></li>
</ol>
<h3><b>Piano Lessons at Home in Orem</b></h3>
<span style="font-weight: 400;">For those living in Orem, our at-home piano lessons are the perfect solution for integrating music education into your daily life. Our instructors bring their expertise directly to your home, providing top-notch instruction without the hassle of commuting. Our Orem At-Home Piano Lessons are designed to accommodate all skill levels and ages, ensuring a comprehensive learning experience.</span>
<h3><b>The Benefits of Orem At-Home Piano Lessons for Adults</b></h3>
<span style="font-weight: 400;">At Volz Piano, we believe that music education is for everyone. Our Orem At-Home Piano Lessons for adults are tailored to meet the unique needs and learning styles of adult students. Whether you’re picking up the piano for the first time or looking to refine your skills, our personalized approach will help you reach your goals.</span>
<h3><b>The Cost of Orem Utah Private Piano Lessons at Home</b></h3>
<span style="font-weight: 400;">Understanding the cost of piano lessons is important for families considering music education. At Volz Piano, we strive to offer competitive pricing and flexible payment options. The cost of our Orem At-Home Piano Lessons reflects the personalized attention and high-quality instruction each student receives. For more information on our pricing, visit our</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;">.</span>
<h3><b>Piano Lessons Orem Utah: A Comprehensive Learning Experience</b></h3>
<span style="font-weight: 400;">Our piano lessons in Orem, Utah, cover a wide range of topics and techniques, ensuring a well-rounded musical education. From basic piano skills to advanced techniques, our instructors provide comprehensive instruction that helps students grow as musicians. Our Orem At-Home Piano Lessons are designed to foster a love for music while developing essential piano skills.</span>
<h3><b>Enroll in Orem At-Home Piano Lessons Today!</b></h3>
<span style="font-weight: 400;">Investing in Orem At-Home Piano Lessons is a fantastic way to enhance your or your child’s musical journey. At Volz Piano, we are dedicated to providing high-quality, personalized instruction that meets the unique needs of each student. Whether you're looking for piano lessons at home in Orem, Utah, or considering hiring piano lessons with a renowned teacher like Harvey Rich, we have the expertise and passion to help you succeed.</span>

<span style="font-weight: 400;">For more information on our Orem At-Home Piano Lessons and to schedule a consultation, visit our</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;"> or contact us today. Additionally, learn more about the benefits of music education from this informative resource.</span>

<span style="font-weight: 400;">Experience the convenience and personalized instruction of Orem At-Home Piano Lessons with Volz Piano – where your musical journey begins!</span>`;

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
            Enhance Your Musical Journey with Orem At-Home Piano Lessons
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            July 22, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/enhance-your-musical-journey-with-orem-at-home-piano-lessons.jpg"
              alt="Featured image for Enhance Your Musical Journey with Orem At-Home Piano Lessons"
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
