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

  const content = `<span style="font-weight: 400;">At Volz Piano, we believe in the power of personalized instruction. Our private piano lessons are designed to cater to your individual needs and musical goals, whether you're a beginner or an advanced player. With experienced teachers and flexible scheduling, we provide a top-notch learning experience that fits your lifestyle.</span>
<h2><b>The Benefits of Private Piano Lessons</b></h2>
<h3><b>Personalized Instruction</b></h3>
<span style="font-weight: 400;">Private piano lessons offer a unique opportunity for one-on-one instruction tailored to your pace and learning style. This personalized approach ensures that you receive focused attention and customized feedback, leading to more effective learning and faster progress.</span>
<h3><b>Flexible Scheduling</b></h3>
<span style="font-weight: 400;">With private piano lessons, you can schedule lessons at times that are most convenient for you. This flexibility is ideal for busy adults, students, and families. Whether you prefer in-home private piano lessons or sessions at our studio, we accommodate your schedule to make learning accessible.</span>
<h2><b>Private Piano Lessons for Adults Near Me</b></h2>
<span style="font-weight: 400;">Many adults are rediscovering the joy of playing the piano. Our private piano lessons for adults near me provide an encouraging environment for adult learners of all levels. Whether you're starting from scratch or brushing up on your skills, our experienced teachers will help you achieve your musical ambitions.</span>
<h3><b>In-Home Private Piano Lessons</b></h3>
<span style="font-weight: 400;">For those who prefer the comfort and convenience of learning at home, we offer in-home private piano lessons. This option eliminates the need to travel and allows you to learn in a familiar setting. Our teachers come equipped with all the necessary materials to deliver high-quality instruction in your home.</span>
<h2><b>Private Lessons Piano Teacher</b></h2>
<span style="font-weight: 400;">Finding the right teacher is crucial to your success in learning the piano. At Volz Piano, our private lessons piano teachers are not only highly skilled musicians but also passionate educators. They are dedicated to helping you develop your skills and reach your full potential through engaging and effective lessons.</span>
<h3><b>Private In-Home Piano Lessons Near Me</b></h3>
<span style="font-weight: 400;">Searching for "private in-home piano lessons near me"? Volz Piano has got you covered. We serve various locations, making it easy to find a qualified teacher who can provide personalized instruction in the comfort of your home. Our teachers are flexible, accommodating your specific needs and schedule.</span>
<h2><b>Understanding the Cost of Private Piano Lessons</b></h2>
<span style="font-weight: 400;">The cost of private piano lessons can vary depending on several factors, including the teacher's experience, lesson length, and location. At Volz Piano, we strive to offer competitive rates that reflect the quality and convenience of our services. For detailed information on the average cost of private piano lessons, please</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">visit our website</span></a><span style="font-weight: 400;">.</span>
<h2><b>External Learning Resources</b></h2>
<span style="font-weight: 400;">To complement your private piano lessons, we recommend exploring</span><a href="https://www.pianoeducation.org/"> <span style="font-weight: 400;">Piano Education</span></a><span style="font-weight: 400;">, which offers valuable tutorials and resources for piano students of all levels.</span>
<h2><b>Start Your Musical Journey with Volz Piano</b></h2>
<span style="font-weight: 400;">Are you ready to take your piano playing to the next level with private piano lessons? Contact Volz Piano today to schedule your first lesson. Our dedicated teachers are excited to help you achieve your musical goals.</span>

<span style="font-weight: 400;">For more information and to get started,</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">visit our website</span></a><span style="font-weight: 400;"> and explore our range of lesson offerings. We look forward to making beautiful music with you!</span>`;

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
            Enhance Your Musical Skills with Private Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            June 11, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/enhance-your-musical-skills-with-private-piano-lessons-at-volz-piano.jpg"
              alt="Featured image for Enhance Your Musical Skills with Private Piano Lessons at Volz Piano"
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
