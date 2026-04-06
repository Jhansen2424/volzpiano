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

  const content = `<span style="font-weight: 400;">As a parent, you want your child to have access to the best educational opportunities. When it comes to music, in-home piano lessons offer a unique and personalized learning experience that can’t be matched. At Volz Piano, we specialize in providing top-quality in-home piano lessons, bringing the joy of music directly to your doorstep.</span>
<h4><b>Why Choose In-Home Piano Lessons?</b></h4>
<span style="font-weight: 400;">In-home piano lessons provide a convenient and comfortable learning environment for children. Here are some benefits of opting for kids piano lessons in your home:</span>
<ol>
 	<li style="font-weight: 400;" aria-level="1"><b>Personalized Attention</b><span style="font-weight: 400;">: With private piano lessons in your home, your child receives one-on-one instruction tailored to their individual needs and pace.</span></li>
 	<li style="font-weight: 400;" aria-level="1"><b>Convenience</b><span style="font-weight: 400;">: No need to travel to a studio; our teachers come to you, saving time and making it easier to fit lessons into a busy schedule.</span></li>
 	<li style="font-weight: 400;" aria-level="1"><b>Familiar Environment</b><span style="font-weight: 400;">: Learning in a familiar setting can help kids feel more relaxed and focused, enhancing their ability to absorb new concepts.</span></li>
</ol>
<h4><b>Finding Kids Piano Lessons in Home Near Me</b></h4>
<span style="font-weight: 400;">When looking for “kids piano lessons in home near me,” it’s important to choose a program that matches your child's learning style and interests. At Volz Piano, our experienced teachers are dedicated to providing engaging and effective in-home piano lessons that cater to young learners.</span>
<h4><b>In-Home Piano Lessons for Kids: A Tailored Approach</b></h4>
<span style="font-weight: 400;">Our in-home piano lessons for kids are designed to make learning fun and rewarding. Each lesson is customized to suit your child’s level and interests, from beginners to more advanced students. We use a variety of teaching methods and materials to keep kids motivated and excited about learning.</span>
<h4><b>The Cost of In-Home Piano Lessons</b></h4>
<span style="font-weight: 400;">Understanding the in-home piano lessons cost is crucial for parents. At Volz Piano, we offer competitive pricing and flexible payment plans to ensure that quality music education is accessible to all families. The cost of in-home piano lessons includes the convenience of having a skilled teacher come to your home, providing personalized instruction that meets your child’s specific needs.</span>
<h4><b>Best Kids Private Piano Lessons in Your Home</b></h4>
<span style="font-weight: 400;">Our reputation for providing the best kids private piano lessons in your home is built on our commitment to excellence. Our teachers are not only accomplished musicians but also experienced educators who know how to inspire and engage young students. We focus on building a strong foundation in piano technique while also encouraging creativity and self-expression.</span>
<h4><b>Why Private Piano Lessons in Your Home Work</b></h4>
<span style="font-weight: 400;">Private piano lessons in your home offer a level of customization and flexibility that traditional studio lessons can’t match. Our teachers work closely with each student to develop a personalized learning plan that addresses their unique strengths and areas for improvement. This individualized approach helps students progress at their own pace and achieve their musical goals.</span>
<h4><b>Enroll in In-Home Piano Lessons Today!</b></h4>
<span style="font-weight: 400;">Investing in in-home piano lessons for your child is an investment in their future. At Volz Piano, we are passionate about helping children discover the joy of music through personalized, convenient, and effective instruction. Whether you’re searching for kids piano lessons in home near me or the best kids private piano lessons in your home, Volz Piano is here to meet your needs.</span>

<span style="font-weight: 400;">For more information on our programs and to schedule a consultation, visit our</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;"> or contact us today. Additionally, learn more about the benefits of music education from this educational resource.</span>

<span style="font-weight: 400;">Bring the magic of music into your home with Volz Piano’s in-home piano lessons – where personalized learning meets convenience!</span>

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
            Bring Music Home with In-Home Piano Lessons
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            July 13, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/bring-music-home-with-in-home-piano-lessons.jpg"
              alt="Featured image for Bring Music Home with In-Home Piano Lessons"
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
