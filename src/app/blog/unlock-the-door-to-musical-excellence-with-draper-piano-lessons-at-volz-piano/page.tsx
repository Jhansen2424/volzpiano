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

  const content = `<p>Discover the joy and fulfillment of music with Draper Piano Lessons offered by Volz Piano. Nestled in the scenic landscape of Utah, our music school is dedicated to nurturing the talents of aspiring pianists from Draper and its surroundings. Whether you're a complete novice or looking to polish your skills, our piano lessons in Draper and Lehi are tailored to meet your individual needs.</p>

<h2 class="wp-block-heading"><strong>Why Choose Draper Piano Lessons at Volz Piano?</strong></h2>

<p>Embarking on your musical journey with Draper Piano Lessons at Volz Piano means you're setting yourself up for success. Here's why:</p>

<p><strong>Personalized Instruction:</strong> Our Draper UT piano lessons are customized to cater to the unique needs and aspirations of each student, ensuring a learning experience that's both effective and enjoyable.</p>

<p><strong>Expert Faculty: </strong>Learn from the best with our team of experienced teachers. Specializing in Draper piano lessons at Old School Draper and beyond, our instructors bring a wealth of knowledge and passion to every lesson.</p>

<p><strong>Affordable Learning:</strong> We believe that everyone deserves access to high-quality music education. The cost of our piano lessons Draper Utah reflects our commitment to making piano lessons accessible to all.</p>

<h2 class="wp-block-heading"><strong>A Curriculum That Sings Your Tune</strong></h2>

<p>At Volz Piano, we understand that music is a personal journey. That's why our curriculum is designed with flexibility in mind, offering a wide range of musical styles and techniques to explore. From classical masterpieces to contemporary hits, our Draper Piano Lessons cater to every musical taste and ambition.</p>

<p>For those just starting out, our piano lessons for beginners near Draper provide a solid foundation in music theory and piano technique, setting you up for a lifetime of musical enjoyment and achievement.</p>

<h2 class="wp-block-heading"><strong>Join Our Musical Family</strong></h2>

<p>Choosing Volz Piano for your piano lessons in Draper, Utah, means more than just attending classes. It's about becoming part of a vibrant community of music lovers who share your passion. Through recitals, ensemble performances, and special events, you'll have the opportunity to showcase your skills and grow alongside fellow students.</p>

<h2 class="wp-block-heading"><strong>Start Your Musical Journey Today</strong></h2>

<p>Are you ready to explore the wonderful world of piano? Discover more about our Draper Piano Lessons by visiting<a href="https://volzpiano.com/"> Volz Piano</a>. Here, you'll find all the information you need to get started, including details about our programs, instructors, and how to enroll.</p>

<p>For further reading on the benefits of music education, we recommend checking out this comprehensive guide from<a href="https://www.musiceducationadvantages.com/"> MusicEducationAdvantages</a>. It highlights the positive impact that learning an instrument can have on cognitive development, emotional well-being, and social skills.</p>

<p>At Volz Piano, we're excited to welcome you to our family of music enthusiasts. Whether you're interested in piano lessons Draper Utah or looking for piano lessons near me, we offer a nurturing and inspiring environment for you to develop your talents. Contact us today to learn more about our programs and how you can embark on a rewarding musical adventure. Let's make beautiful music together!</p>`;

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
            Unlock the Door to Musical Excellence with Draper Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            March 25, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/unlock-the-door-to-musical-excellence-with-draper-piano-lessons-at-volz-piano.jpg"
              alt="Featured image for Unlock the Door to Musical Excellence with Draper Piano Lessons at Volz Piano"
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
