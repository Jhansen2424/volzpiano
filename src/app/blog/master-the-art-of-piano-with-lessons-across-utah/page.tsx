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

  const content = `<p>Embark on a musical adventure with Piano lessons Utah, your gateway to mastering the piano, whether you're in Draper, Layton, Logan, or Salt Lake City. At Volz Piano, we're passionate about offering top-tier piano instruction tailored to each student's needs, ensuring a rich learning experience that spans the entire state of Utah.</p>

<h2 class="wp-block-heading"><strong>Piano Lessons Utah: A Symphony of Opportunities</strong></h2>

<p>Utah's diverse musical landscape offers an ideal backdrop for budding musicians and seasoned players alike. With piano lessons in Utah, students have access to a wide range of teaching styles and methodologies, ensuring the perfect fit for their musical journey.</p>

<h3 class="wp-block-heading"><strong>Piano Lessons Draper Utah</strong></h3>

<p>Draper's vibrant music scene makes it a great place for students seeking piano lessons. Our instructors in Draper specialize in various genres, catering to both beginners and advanced students.</p>

<h3 class="wp-block-heading"><strong>The Average Cost of Piano Lessons in Utah</strong></h3>

<p>When considering piano lessons in Utah, the cost is an important factor for many families and individuals. We strive to provide transparent and affordable pricing, ensuring that quality music education is accessible to everyone. For detailed pricing, please visit our<a href="https://volzpiano.com/"> pricing page</a>.</p>

<h3 class="wp-block-heading"><strong>Piano Lessons Layton Utah</strong></h3>

<p>For those in the northern part of the state, piano lessons at Layton Utah offer a chance to dive into the world of music with experienced instructors who are committed to fostering students' growth and passion for the piano.</p>

<h3 class="wp-block-heading"><strong>Piano Lessons Logan Utah</strong></h3>

<p>Logan's rich cultural heritage is the perfect setting for piano lessons, where students can explore a variety of musical styles under the guidance of our talented teachers.</p>

<h3 class="wp-block-heading"><strong>Piano Lessons Salt Lake City Utah</strong></h3>

<p>Salt Lake City, with its thriving arts scene, is home to some of the best piano lessons Utah has to offer. Our Salt Lake City instructors are dedicated to providing personalized, one-on-one instruction that meets each student's unique needs.</p>

<h3 class="wp-block-heading"><strong>Tailored Lessons for Kids and Beginners</strong></h3>

<p>Our piano lessons Utah are especially designed for kids and beginners, focusing on creating a supportive and engaging learning environment. We understand the importance of building a strong foundation in music from an early age and offer lessons that are both fun and educational.</p>

<h3 class="wp-block-heading"><strong>Find "Piano Lessons Near Me"</strong></h3>

<p>With locations across the state, finding "piano lessons near me" has never been easier. Volz Piano is committed to bringing quality piano education to students throughout Utah, making it convenient to find expert instruction close to home.</p>

<h3 class="wp-block-heading"><strong>Join Our Musical Community</strong></h3>

<p>Choosing Piano lessons Utah at Volz Piano means becoming part of a community that celebrates music and learning. Our students enjoy opportunities to perform, share their progress, and connect with fellow music enthusiasts.</p>

<h3 class="wp-block-heading"><strong>Get Started on Your Musical Journey</strong></h3>

<p>Are you ready to explore the world of piano with Piano lessons Utah? Visit our <a href="https://volzpiano.com/">website</a> to learn more about our programs and sign up for lessons today.</p>

<p>For additional resources and inspiration, check out <a href="https://www.musicradar.com/">MusicRadar</a>, a fantastic source for music news, reviews, and tutorials.</p>

<p>With Piano lessons Utah from Volz Piano, you're not just learning to play an instrument; you're embarking on a journey of musical discovery and personal growth. Our dedicated team of instructors is here to support you every step of the way, ensuring a rewarding and enjoyable learning experience. Join us and unlock your musical potential today!</p>`;

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
            Master the Art of Piano with Lessons Across Utah
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            February 26, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/master-the-art-of-piano-with-lessons-across-utah.jpg"
              alt="Featured image for Master the Art of Piano with Lessons Across Utah"
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
