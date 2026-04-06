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

  const content = `<p>Welcome to Volz Piano, your premier destination for Murray Piano Lessons. Whether you are in Murray, Utah or Murray, Kentucky, our experienced instructors, including the talented Lisa Murray, are here to provide top-quality piano education that caters to students of all ages and skill levels.</p>

<h2 class="wp-block-heading">Tailored Piano Education in Murray</h2>

<h3 class="wp-block-heading">Comprehensive Learning Experience</h3>

<p>Our Murray Piano Lessons are designed to offer a comprehensive learning experience that covers various musical styles and techniques. Whether you are a complete beginner or an advancing student, our programs are tailored to meet your individual needs.</p>

<h3 class="wp-block-heading">Conveniently Located</h3>

<p>For those seeking piano lessons near me, Volz Piano offers convenient locations in both Murray, KY, and Murray, UT. Our accessibility ensures that high-quality piano education is just around the corner, making it easier for you to commit to your musical education.</p>

<h3 class="wp-block-heading">Beginner-Friendly Programs</h3>

<p>Our piano lessons for beginners are perfect for anyone looking to embark on their musical journey. We provide a supportive and encouraging environment where beginners can thrive and discover their passion for music.</p>

<h3 class="wp-block-heading">State-of-the-Art Facilities</h3>

<p>Volz Piano is proud to offer lessons in well-equipped facilities that enhance the learning experience. Our piano lessons in Murray Utah and piano lessons in Murray KY are conducted in environments that inspire creativity and foster musical growth.</p>

<h2 class="wp-block-heading">Our Piano Programs in Murray</h2>

<h3 class="wp-block-heading">Diverse Musical Genres</h3>

<p>From classical to contemporary, our Murray Piano Lessons cover a wide range of musical genres. This diversity allows students to explore different aspects of music and find their unique musical voice.</p>

<h3 class="wp-block-heading">Experienced Instructors</h3>

<p>Our team, including Lisa Murray, is composed of dedicated and passionate instructors who specialize in providing personalized instruction. Their expertise ensures that students receive quality education tailored to their pace and interests.</p>

<h3 class="wp-block-heading">Understanding the Costs</h3>

<p>We believe in transparency when it comes to the cost of our Murray Piano Lessons. Our fees are competitively priced to ensure that quality music education is accessible to everyone. For more detailed pricing information, including cost per month, visit our Pricing Page.</p>

<h2 class="wp-block-heading">Join Our Community</h2>

<p>Are you ready to enhance your musical skills and enjoy the benefits of personalized piano instruction? Enroll in Murray Piano Lessons today by visiting <a href="https://volzpiano.com/">Volz Piano</a>. Become part of a vibrant music community that is passionate about nurturing musical talent.</p>

<p>For additional resources on the benefits of music education, check out the <a href="https://nafme.org/">Music Teachers National Association</a>, which provides valuable insights into the impact of learning music.</p>

<p>At Volz Piano, we are dedicated to providing the best Murray Piano Lessons. We invite you to join us and start your journey to becoming a skilled pianist in a supportive and enriching environment. Let's make music together!</p>`;

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
            Discover the Joy of Music with Murray Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            April 28, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/discover-the-joy-of-music-with-murray-piano-lessons-at-volz-piano.jpg"
              alt="Featured image for Discover the Joy of Music with Murray Piano Lessons at Volz Piano"
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
