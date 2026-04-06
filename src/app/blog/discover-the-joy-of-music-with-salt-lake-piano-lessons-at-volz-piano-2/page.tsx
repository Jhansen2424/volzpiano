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

  const content = `<span style="font-weight: 400;">Are you ready to embark on a musical journey on Salt Lake piano lessons? Whether you’re a beginner eager to play your first note, an adult returning to the keys, or a parent seeking the best instruction for your child, Volz Piano is here to guide you every step of the way.</span>
<h3><b>Why Choose Volz Piano?</b></h3>
<span style="font-weight: 400;">Salt Lake Volz Piano lessons offer personalized instruction tailored to your unique needs and goals. Our experienced teachers are dedicated to helping you master the piano, whether you’re interested in classical pieces, modern hits, or anything in between.</span>
<h3><b>Tailored Lessons for Every Learner</b></h3>
<h4><b>Beginner Piano Lessons in Salt Lake City, Utah</b></h4>
<span style="font-weight: 400;">Starting your piano journey can be both exciting and daunting. Our beginner piano lessons in Salt Lake City, Utah, are designed to make learning fun and accessible. Our patient and knowledgeable instructors will guide you through the basics, ensuring you build a solid foundation.</span>
<h4><b>Adult Piano Lessons in Salt Lake City</b></h4>
<span style="font-weight: 400;">It’s never too late to learn! Our adult piano lessons in Salt Lake City cater to adults of all skill levels. Whether you’re picking up piano for the first time or revisiting an old hobby, our lessons are flexible and tailored to fit your busy schedule.</span>
<h4><b>Kids Piano Lessons in Salt Lake City</b></h4>
<span style="font-weight: 400;">For kids, learning piano can be a delightful and enriching experience. Our kids piano lessons in Salt Lake City focus on making music fun and engaging. Our friendly instructors use a variety of teaching methods to keep young learners motivated and excited about their musical journey.</span>
<h3><b>Private Piano Lessons for Personalized Learning</b></h3>
<span style="font-weight: 400;">Private piano lessons in Salt Lake City provide one-on-one instruction, allowing for a customized learning experience. This personalized approach ensures that lessons move at your pace and focus on your specific interests and goals.</span>
<h3><b>How Much Do Piano Lessons Cost in Salt Lake City?</b></h3>
<span style="font-weight: 400;">One of the most common questions we get is, "How much do piano lessons cost in Salt Lake City?" At Volz Piano, we offer competitive pricing for our high-quality instruction. Our rates vary based on the length and frequency of lessons, but we strive to make piano education accessible to everyone. For detailed pricing, visit our pricing page.</span>
<h3><b>Benefits of Learning Piano</b></h3>
<span style="font-weight: 400;">Taking Salt Lake piano lessons comes with numerous benefits. Learning to play piano enhances cognitive development, improves hand-eye coordination, and provides a creative outlet. Additionally, playing piano can be a great stress reliever and a wonderful way to express emotions.</span>
<h3><b>Finding the Right Teacher Near You</b></h3>
<span style="font-weight: 400;">Finding the right piano teacher near you is crucial for your learning experience. Our team of skilled instructors at Volz Piano is passionate about teaching and committed to helping you achieve your musical goals. We take pride in our supportive and encouraging learning environment.</span>
<h3><b>Join the Volz Piano Family</b></h3>
<span style="font-weight: 400;">Ready to start your musical journey with Salt Lake piano lessons? Join the Volz Piano family and discover the joy of playing piano. Whether you’re a beginner, an adult learner, or looking for lessons for your child, we have the perfect program for you.</span>

<span style="font-weight: 400;">For more information on our lessons and to schedule a free trial, visit our contact page.</span>
<h4><b>External Resource</b></h4>
<span style="font-weight: 400;">For further reading on the benefits of piano lessons and tips for beginners, check out this insightful article from Piano Lessons.</span>

<span style="font-weight: 400;">Experience the joy of music with Salt Lake piano lessons at Volz Piano. Start your journey today and unlock your musical potential!</span>`;

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
            Discover the Joy of Music with Salt Lake Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            July 01, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/discover-the-joy-of-music-with-salt-lake-piano-lessons-at-volz-piano-2.jpg"
              alt="Featured image for Discover the Joy of Music with Salt Lake Piano Lessons at Volz Piano"
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
