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

  const content = `<span style="font-weight: 400;">At Volz Piano, we are thrilled to offer exceptional Murray Piano Lessons tailored for students of all ages. Whether you’re searching for beginner piano lessons or specialized instruction for children, our dedicated teachers are here to guide you on your musical journey.</span>
<h3><strong>Why Choose Murray Piano Lessons?</strong></h3>
<span style="font-weight: 400;">Murray Piano Lessons provide numerous advantages that make them ideal for aspiring musicians:</span>
<ol>
 	<li style="font-weight: 400;" aria-level="1"><b>Experienced Instructors</b><span style="font-weight: 400;">: Our talented teachers are skilled musicians who are passionate about sharing their love of music. They offer personalized instruction that caters to each student’s needs and learning style.</span></li>
 	<li style="font-weight: 400;" aria-level="1"><b>Convenient Location</b><span style="font-weight: 400;">: With lessons in Murray, Utah, students can easily access quality piano instruction nearby. This convenience is perfect for families looking for Murray children's piano lessons near me.</span></li>
 	<li style="font-weight: 400;" aria-level="1"><b>Engaging Curriculum</b><span style="font-weight: 400;">: Our lessons are designed to be fun and engaging, ensuring that students stay motivated and excited about learning.</span></li>
</ol>
<h3><b>Murray Piano Lessons for Kids</b></h3>
<span style="font-weight: 400;">We specialize in Murray piano lessons for kids, providing a nurturing environment where young learners can thrive. Our instructors use creative teaching methods to make learning enjoyable, focusing on foundational skills while fostering a love for music.</span>
<h3><b>Murray Beginner Piano Lessons</b></h3>
<span style="font-weight: 400;">For those new to music, our Murray beginner piano lessons are the perfect starting point. We focus on essential skills such as note reading, rhythm, and technique, allowing students to build a strong foundation in piano playing.</span>
<h3><b>Piano Lessons in Murray Utah: A Comprehensive Experience</b></h3>
<span style="font-weight: 400;">Our piano lessons in Murray, Utah, cover a range of musical styles and techniques. Whether you're interested in classical music, pop, or jazz, our instructors adapt lessons to meet your interests and goals. We strive to provide a well-rounded musical education that prepares students for success.</span>
<h3><b>Understanding the Cost of Murray Piano Lessons</b></h3>
<span style="font-weight: 400;">When considering piano lessons, understanding the cost is essential. At Volz Piano, we offer competitive pricing for our Murray Piano Lessons, with flexible payment options available. Students can expect to pay a reasonable cost per month, allowing for continuous learning without breaking the bank. For specific pricing details, visit our</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;">.</span>
<h3><b>Finding Piano Lessons Murray Utah Near Me</b></h3>
<span style="font-weight: 400;">If you’re searching for piano lessons Murray Utah near me, look no further. Our convenient location and expert instructors make it easy to get started on your musical journey.</span>
<h3><b>Enroll in Murray Piano Lessons Today!</b></h3>
<span style="font-weight: 400;">Investing in Murray Piano Lessons is a wonderful way to enrich your life through music. At Volz Piano, we are committed to providing exceptional instruction tailored to each student’s needs. Whether you’re interested in Murray piano lessons for kids or beginner lessons for adults, we have the resources to help you succeed.</span>

<span style="font-weight: 400;">For more information on our Murray Piano Lessons and to schedule a consultation, visit our</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;"> or contact us today. Additionally, learn more about the benefits of music education from this trusted resource.</span>

<span style="font-weight: 400;">Experience the joy of music with Murray Piano Lessons at Volz Piano – where your musical journey begins!</span>`;

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
            Discover the Joy of Music with Murray Piano Lessons
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            July 28, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/murray-piano-lessons-expert-instruction-for-all-ages-volz-piano.jpg"
              alt="Featured image for Discover the Joy of Music with Murray Piano Lessons"
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
