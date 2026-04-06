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

  const content = `<span style="font-weight: 400;">Are you ready to embark on an exciting musical adventure? Our beginners piano lessons at Volz Piano are perfect for anyone eager to learn the beautiful art of playing the piano. Whether you’re a child starting out or an adult fulfilling a lifelong dream, we have the perfect program to suit your needs.</span>
<h3><b>Why Choose Beginners Piano Lessons at Volz Piano?</b></h3>
<span style="font-weight: 400;">At Volz Piano, our beginners piano lessons are designed to provide a strong foundation in piano playing. Our experienced and passionate teachers are dedicated to making learning enjoyable and rewarding. We focus on developing your skills and confidence, ensuring a fulfilling and fun experience.</span>
<h3><b>Tailored Lessons for Every Beginner</b></h3>
<h4><b>Piano Lessons for Beginner Kids</b></h4>
<span style="font-weight: 400;">Learning piano at a young age can be incredibly beneficial for children. Our piano lessons for beginner kids are structured to be engaging and fun, keeping young learners motivated and excited about music. Our teachers use a variety of interactive methods to make learning enjoyable and effective.</span>
<h4><b>Beginner Piano Keyboard Lessons</b></h4>
<span style="font-weight: 400;">For those who prefer learning on a keyboard, our beginner piano keyboard lessons are an excellent option. Our instructors provide comprehensive guidance on keyboard techniques and fundamentals, ensuring you develop the necessary skills to play beautifully.</span>
<h4><b>Piano Music Lessons for Beginners</b></h4>
<span style="font-weight: 400;">Our piano music lessons for beginners focus on teaching you to read music, understand rhythm, and play with proper technique. We believe that a strong foundation in music theory and practical skills is essential for any aspiring pianist.</span>
<h3><b>Comprehensive Piano Instruction</b></h3>
<h4><b>Basic Piano Lessons for Beginners</b></h4>
<span style="font-weight: 400;">Our basic piano lessons for beginners cover all the essential elements of piano playing. From understanding the keyboard layout to mastering simple melodies, our lessons ensure you build a solid foundation. Our patient and supportive teachers are here to guide you every step of the way.</span>
<h4><b>Best Piano Lessons for Beginners</b></h4>
<span style="font-weight: 400;">At Volz Piano, we pride ourselves on offering the best piano lessons for beginners. Our customized approach ensures that each student receives the attention and guidance they need to succeed. We tailor our lessons to match your learning style and goals, making the learning process both effective and enjoyable.</span>
<h3><b>The Benefits of Learning Piano</b></h3>
<span style="font-weight: 400;">Taking beginners piano lessons offers numerous benefits. Playing the piano enhances cognitive abilities, improves hand-eye coordination, and provides a creative outlet. Learning music also fosters discipline and patience, skills that are valuable in all areas of life.</span>
<h3><b>Finding the Right Piano Teacher Near You</b></h3>
<span style="font-weight: 400;">Having the right piano teacher can make a significant difference in your learning experience. At Volz Piano, our dedicated instructors are committed to helping you achieve your musical goals. We provide a supportive and encouraging learning environment, making sure you feel comfortable and confident.</span>
<h3><b>How Much Do Beginners Piano Lessons Cost?</b></h3>
<span style="font-weight: 400;">One of the most common questions we receive is about the cost of beginners piano lessons. At Volz Piano, we offer competitive pricing to ensure that high-quality music education is accessible to everyone. For detailed pricing information, visit our pricing page.</span>
<h3><b>Join the Volz Piano Family</b></h3>
<span style="font-weight: 400;">Ready to start your musical journey with beginners piano lessons? Join the Volz Piano family and discover the joy of playing the piano. Whether you’re a child, an adult, or a senior, we have the perfect program for you.</span>

<span style="font-weight: 400;">For more information on our lessons and to schedule a free trial, visit our contact page.</span>
<h4><b>External Resource</b></h4>
<span style="font-weight: 400;">For further reading on the benefits of piano lessons and tips for beginners, check out this insightful article from Piano Lessons.</span>

<span style="font-weight: 400;">Unlock your musical potential with beginners piano lessons at Volz Piano. Start your journey today and experience the joy of music!</span>`;

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
            Start Your Musical Journey with Beginners Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            July 05, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/start-your-musical-journey-with-beginners-piano-lessons-at-volz-piano-2.jpg"
              alt="Featured image for Start Your Musical Journey with Beginners Piano Lessons at Volz Piano"
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
