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

  const content = `<span style="font-weight: 400;">Welcome to Volz Piano, where we offer exceptional Utah piano lessons for students of all ages and skill levels. Whether you’re a beginner or an advanced pianist, our experienced teachers are here to guide you on your musical journey. Located conveniently for residents in Salt Lake and Utah County, we provide a range of lesson options tailored to meet your individual needs.</span>
<h2><b>Why Choose Utah Piano Lessons?</b></h2>
<span style="font-weight: 400;">Learning to play the piano is a rewarding experience that offers numerous benefits. From improving cognitive abilities to providing a creative outlet, piano lessons can enhance your life in many ways. At Volz Piano, our Utah piano lessons are designed to make learning enjoyable and effective, ensuring you achieve your musical goals.</span>
<h3><b>Beginners Piano Lessons in Utah</b></h3>
<span style="font-weight: 400;">Starting your musical journey is exciting with our beginner's piano lessons in Utah. Our patient and knowledgeable teachers focus on building a solid foundation, making sure you understand the basics before moving on to more advanced techniques. We believe that everyone can learn to play the piano, regardless of age or previous experience.</span>
<h3><b>Piano Lessons in Salt Lake, Utah</b></h3>
<span style="font-weight: 400;">For those living in the Salt Lake area, our piano lessons in Salt Lake, Utah are easily accessible and offer flexible scheduling to fit your busy lifestyle. Whether you’re looking for private lessons or group classes, we have something to suit everyone. Our teachers are passionate about helping students succeed and find joy in their musical endeavors.</span>
<h2><b>Piano Lessons in Utah County</b></h2>
<span style="font-weight: 400;">Residents of Utah County can also benefit from our high-quality piano instruction. Our piano lessons in Utah County are tailored to meet the needs of each student, whether you’re a child, teenager, or adult. We provide a supportive and encouraging environment where you can thrive and grow as a musician.</span>
<h3><b>Private Adult Piano Lessons in Utah</b></h3>
<span style="font-weight: 400;">It’s never too late to learn the piano. Our adult piano lessons in Utah are designed to cater to your specific interests and learning pace. Whether you’re a complete beginner or looking to pick up where you left off, our teachers will work with you to develop your skills and confidence.</span>
<h2><b>Private Kids Piano Lessons in Utah</b></h2>
<span style="font-weight: 400;">Starting early with music education can have a lasting impact on a child’s development. Our kid's piano lessons in Utah are fun, engaging, and educational. We focus on making lessons enjoyable while fostering a love for music that will last a lifetime.</span>
<h3><b>Finding the Right Piano Teachers in Utah</b></h3>
<span style="font-weight: 400;">Choosing the right teacher is crucial for your musical journey. Our piano teachers in Utah are experienced, passionate, and dedicated to providing the highest quality instruction. They are committed to helping you reach your full potential and make the most of your Utah piano lessons.</span>
<h2><b>How Much Do Utah Piano Lessons Cost?</b></h2>
<span style="font-weight: 400;">One of the common questions we receive is about the cost of piano lessons. The cost can vary based on the length and frequency of lessons. At Volz Piano, we strive to offer competitive pricing to ensure that quality music education is accessible to everyone. For detailed pricing information, please</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">visit our website</span></a><span style="font-weight: 400;">.</span>
<h2><b>Piano Lessons Near Me</b></h2>
<span style="font-weight: 400;">If you’ve been searching for "piano lessons near me," look no further. Volz Piano offers convenient locations and flexible scheduling to accommodate your needs. Our goal is to make it easy for you to incorporate piano lessons into your life.</span>
<h3><b>External Learning Resources</b></h3>
<span style="font-weight: 400;">To further enrich your learning experience, we recommend checking out</span><a href="https://www.pianoeducation.org/"> <span style="font-weight: 400;">The Piano Education Page</span></a><span style="font-weight: 400;">, a valuable resource for piano students of all levels.</span>
<h2><b>Start Your Musical Journey Today</b></h2>
<span style="font-weight: 400;">Are you ready to start your musical journey with Utah piano lessons? Contact us at Volz Piano to schedule your first lesson and discover the joy of playing the piano. Our dedicated teachers are here to support you every step of the way.</span>

<span style="font-weight: 400;">For more information and to get started,</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">visit our website</span></a><span style="font-weight: 400;"> and explore our wide range of offerings. We look forward to making beautiful music with you!</span>`;

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
            Elevate Your Musical Skills with Utah Piano Lessons
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            June 05, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/elevate-your-musical-skills-with-utah-piano-lessons.jpg"
              alt="Featured image for Elevate Your Musical Skills with Utah Piano Lessons"
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
