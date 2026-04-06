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

  const content = `<span style="font-weight: 400;">Welcome to Volz Piano, your go-to destination for Salt Lake piano lessons! Whether you're a complete beginner or looking to refine your skills, we offer a range of options tailored to suit your needs. Located in the heart of Salt Lake City, we provide piano lessons for all ages, from children to adults, in a friendly and supportive environment.</span>
<h2><b>Why Choose Salt Lake Piano Lessons?</b></h2>
<span style="font-weight: 400;">Taking piano lessons in Salt Lake City offers numerous benefits beyond just learning to play an instrument. Music education enhances cognitive development, improves concentration, and fosters a sense of achievement. At Volz Piano, our dedicated teachers are passionate about helping students unlock their musical potential.</span>
<h3><b>Private Beginner Piano Lessons in Salt Lake City</b></h3>
<span style="font-weight: 400;">For those new to the piano, our beginner piano lessons in Salt Lake City are the perfect starting point. We understand that starting something new can be daunting, so our patient and experienced instructors make the learning process enjoyable and stress-free.</span>
<h3><b>Private Piano Lessons for Adults in Salt Lake City</b></h3>
<span style="font-weight: 400;">It's never too late to start learning the piano. Our piano lessons for adults in Salt Lake City are designed to fit into your busy schedule. Whether you're looking to pick up a new hobby or revisit a childhood passion, our lessons provide a fulfilling and enriching experience.</span>
<h3><b>Private Piano Lessons for Kids in Salt Lake City</b></h3>
<span style="font-weight: 400;">We believe in nurturing young talent from an early age. Our piano lessons for kids in Salt Lake City are fun, engaging, and designed to keep young minds interested. Learning to play the piano can significantly boost a child's confidence and academic performance.</span>
<h2><b>How Much Do Piano Lessons Cost in Salt Lake City?</b></h2>
<span style="font-weight: 400;">One of the most common questions we receive is, "How much do piano lessons cost in Salt Lake City?" The cost can vary depending on the length and frequency of lessons. At Volz Piano, we strive to offer competitive pricing to make learning accessible to everyone. For detailed pricing information, please</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">visit our website</span></a><span style="font-weight: 400;">.</span>
<h2><b>Find a Piano Teacher Near Me</b></h2>
<span style="font-weight: 400;">Searching for "piano lessons near me" can lead to many options, but finding the right fit is crucial. Our team of experienced teachers in Salt Lake City is dedicated to providing high-quality instruction in a supportive environment. Whether you're looking for private lessons or group classes, we have something for everyone.</span>
<h3><b>The Benefits of Learning Piano with Us</b></h3>
<b>Experienced Teachers</b><span style="font-weight: 400;">: Our instructors bring a wealth of knowledge and passion to each lesson.</span>

<b>Flexible Scheduling</b><span style="font-weight: 400;">: We offer a variety of lesson times to fit your busy life.</span>

<b>Personalized Approach</b><span style="font-weight: 400;">: Lessons are tailored to meet your individual goals and interests.</span>
<h2><b>External Learning Resources</b></h2>
<span style="font-weight: 400;">To enhance your learning journey, we recommend exploring</span><a href="https://www.pianoeducation.org/"> <span style="font-weight: 400;">Piano Education</span></a><span style="font-weight: 400;">, which offers a wealth of resources and tips for piano students of all levels.</span>
<h2><b>Start Your Musical Journey Today</b></h2>
<span style="font-weight: 400;">Ready to embark on your musical journey with Salt Lake piano lessons? Contact us today to schedule your first lesson and discover the joy of playing the piano. At Volz Piano, we're here to support you every step of the way.</span>

<span style="font-weight: 400;">For more information and to get started,</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">visit our website</span></a><span style="font-weight: 400;"> and check out our detailed offerings. We look forward to making beautiful music with you!</span>`;

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
            Unlock Your Musical Potential with Piano Lessons in Salt Lake City
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            June 02, 2024
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
