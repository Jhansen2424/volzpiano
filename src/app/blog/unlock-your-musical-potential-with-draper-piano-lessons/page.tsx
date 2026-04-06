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

  const content = `<span style="font-weight: 400;">At Volz Piano, we are excited to offer exceptional Draper Piano Lessons designed for students of all ages and skill levels. Whether you're a beginner looking to learn the basics or an experienced musician aiming to refine your skills, our tailored instruction will guide you on your musical journey.</span>
<h3><b>Why Choose Draper Piano Lessons?</b></h3>
<span style="font-weight: 400;">Draper Piano Lessons provide numerous benefits, making them an excellent choice for aspiring pianists:</span>
<ol>
 	<li style="font-weight: 400;" aria-level="1"><b>Experienced Instructors</b><span style="font-weight: 400;">: Our dedicated teachers have a passion for music and extensive experience in teaching. They customize lessons to fit each student’s unique learning style and goals.</span></li>
 	<li style="font-weight: 400;" aria-level="1"><b>Convenient Location</b><span style="font-weight: 400;">: We offer piano lessons in Draper, Utah, making it easy for you to find a class nearby. For those in neighboring areas like Lehi, we provide accessible options to accommodate your needs.</span></li>
 	<li style="font-weight: 400;" aria-level="1"><b>Engaging Curriculum</b><span style="font-weight: 400;">: Our lessons cover various styles and techniques, ensuring a comprehensive musical education that keeps students motivated.</span></li>
</ol>
<h3><b>Piano Lessons Draper Utah: Tailored for All Ages</b></h3>
<span style="font-weight: 400;">Our Draper Piano Lessons are designed to cater to students of all ages, from young children to adults. We understand that every learner is different, which is why we create personalized lesson plans that focus on individual goals, whether it’s mastering classical pieces or exploring modern genres.</span>
<h3><b>Piano Lessons in Draper and Lehi</b></h3>
<span style="font-weight: 400;">For those searching for piano lessons in Draper and Lehi, Volz Piano is the perfect choice. Our instructors travel to both areas, providing quality education right at your doorstep. This flexibility makes it easier than ever to fit lessons into your schedule.</span>
<h3><b>Draper, UT Piano Lessons for Beginners</b></h3>
<span style="font-weight: 400;">If you're a beginner, our Draper UT piano lessons are designed to help you build a strong foundation. We focus on essential skills such as finger placement, reading music, and basic theory, ensuring that you gain the confidence needed to progress.</span>
<h3><b>Understanding the Cost of Draper Piano Lessons</b></h3>
<span style="font-weight: 400;">When considering piano lessons, it’s important to understand the cost involved. At Volz Piano, we offer competitive pricing for our Draper Piano Lessons, reflecting the quality and personalized attention each student receives. For detailed pricing information, visit our</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;">.</span>
<h3><b>Finding Piano Lessons Near Me</b></h3>
<span style="font-weight: 400;">If you’re looking for “piano lessons near me,” our Draper Piano Lessons are conveniently located and easy to access. Our experienced teachers are committed to helping you achieve your musical aspirations in a supportive environment.</span>
<h3><b>Enroll in Draper Piano Lessons Today!</b></h3>
<span style="font-weight: 400;">Investing in Draper Piano Lessons is a fantastic way to enrich your life with music. At Volz Piano, we are dedicated to providing exceptional instruction tailored to your unique needs. Whether you are interested in starting your musical journey or refining your skills, we have the expertise to help you succeed.</span>

<span style="font-weight: 400;">For more information on our Draper Piano Lessons and to schedule a consultation, visit our</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;"> or contact us today. Additionally, discover the benefits of music education from this trusted source.</span>

<span style="font-weight: 400;">Experience the joy of music with Draper Piano Lessons at Volz Piano – where your musical journey begins!</span>`;

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
            Unlock Your Musical Potential with Draper Piano Lessons
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            July 26, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/unlock-your-musical-potential-with-draper-piano-lessons.jpg"
              alt="Featured image for Unlock Your Musical Potential with Draper Piano Lessons"
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
