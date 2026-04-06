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

  const content = `<p>Whether you are a budding musician or someone looking to revive an old hobby, finding the right piano lessons in Utah can significantly enrich your life. At Volz Piano, we offer tailored piano lessons across various locations in Utah, ensuring that anyone from Salt Lake City to South Jordan can access quality music education.</p>

<h2 class="wp-block-heading"><strong>Discover the Magic of Piano Lessons in Salt Lake City Utah</strong></h2>

<p>Salt Lake City is not just the capital city but also a vibrant center for arts and culture. At Volz Piano, we bring this cultural vibrancy into our piano lessons in Salt Lake City Utah. Tailored to both beginners and advanced musicians, our lessons are designed to help you achieve your personal and professional music goals.</p>

<h3 class="wp-block-heading"><strong>Piano Lessons Ogden Utah: Bringing Music to the Community</strong></h3>

<p>In Ogden, our piano lessons are crafted to fit the community's unique cultural and artistic environment. We offer both private and group sessions, ensuring that students of all ages and skill levels can find a program that suits them best. Our experienced instructors are passionate about making each lesson engaging and educational.</p>

<h3 class="wp-block-heading"><strong>Explore Piano Lessons Orem Utah</strong></h3>

<p>Orem's family-oriented community is the perfect place for both kids and adults to start their musical journey. Our piano lessons in Orem Utah cater to all ages, providing young learners and adult beginners alike with the skills they need to excel musically. We focus on creating a supportive and motivating environment for all our students.</p>

<h3 class="wp-block-heading"><strong>Piano Lessons Sandy Utah: Customized for Every Learner</strong></h3>

<p>For those living in Sandy, Volz Piano offers customized piano lessons designed to meet each student’s unique needs. Whether you are looking to prepare for a specific performance or simply want to learn at your own pace, our piano lessons in Sandy Utah are the ideal choice.</p>

<h3 class="wp-block-heading"><strong>Enrich Your Life with Piano Lessons South Jordan Utah</strong></h3>

<p>South Jordan stands out with its strong sense of community and emphasis on family values. Our piano lessons in South Jordan Utah are designed to complement these values, offering programs that foster family bonding and individual growth through music.</p>

<h3 class="wp-block-heading"><strong>Why Choose Piano Lessons in Utah?</strong></h3>

<p>Opting for piano lessons in Utah means choosing a diverse and enriching learning experience. Here’s why Volz Piano stands out:</p>

<p><strong>Accessibility:</strong> With locations across the state, including piano lessons near me options, you can easily find a studio or teacher close to home.</p>

<p><strong>Versatility:</strong> We offer piano lessons for kids, beginners, and adults, ensuring that it's never too late or too early to start learning.</p>

<p><strong>Quality: </strong>Our teachers are dedicated professionals who provide personalized attention to nurture each student’s potential.</p>

<h3 class="wp-block-heading"><strong>Commitment to Excellence in Music Education</strong></h3>

<p>At Volz Piano, we are committed to providing the highest quality piano lessons in Utah. By fostering an environment of learning and creativity, we help our students not only achieve musical excellence but also gain lifelong skills and confidence. For more information on our programs and how you can enroll, visit our website<a href="https://volzpiano.com/"> here</a>.</p>

<h3 class="wp-block-heading"><strong>Ready to Start Your Musical Journey?</strong></h3>

<p>If you're ready to embark on a fulfilling musical journey with our piano lessons in Utah, contact Volz Piano today. Let us help you unlock your potential and discover the joy of music. Whether you're in Salt Lake City, Ogden, Orem, Sandy, or South Jordan, excellent piano instruction is just a step away.</p>

<p>Embark on your musical journey with Volz Piano’s comprehensive piano lessons in Utah, where we tailor each lesson to help you succeed and enjoy every note you play.</p>`;

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
            Piano Lessons Utah: Your Gateway to Musical Mastery
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            May 15, 2024
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
