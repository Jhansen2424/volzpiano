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

  const content = `<p>Embark on a musical journey like no other with Volz Piano, your premier destination for piano lessons in Utah. Whether you are a budding beginner, a curious child, or an adult with a revived interest in music, we offer a diverse range of piano lessons designed to cater to all ages and skill levels. Our mission is to make the enriching experience of learning piano accessible and enjoyable for everyone in the Beehive State.</p>

<h2 class="wp-block-heading"><strong>Piano Lessons in Utah for Every Aspirant</strong></h2>

<h3 class="wp-block-heading"><strong>For the Young Maestros: Piano Lessons for Kids</strong></h3>

<p>Volz Piano understands the importance of nurturing young talent with patience and creativity. Our piano lessons for kids in Utah are specially designed to make learning fun and engaging, providing a solid foundation in music that can last a lifetime. From Orem to South Jordan, our dedicated teachers are passionate about inspiring the next generation of musicians.</p>

<h3 class="wp-block-heading"><strong>Unleashing Potential: Piano Lessons for Adults</strong></h3>

<p>It's never too late to pursue your passion for music. Our piano lessons for adults in Utah are tailored to help you achieve your musical goals, whether you're starting from scratch or picking up where you left off. Our instructors use a blend of traditional methods and modern techniques to make learning both effective and enjoyable.</p>

<h3 class="wp-block-heading"><strong>Across the State: Piano Lessons Near Me</strong></h3>

<p>With locations spanning from Salt Lake City to Ogden, and Sandy to Orem, finding "piano lessons near me" in Utah has never been easier. Volz Piano prides itself on making high-quality music education accessible to communities across the state.</p>

<h4 class="wp-block-heading">Piano Lessons in Salt Lake City Utah: A Hub for Music Lovers</h4>

<p>Salt Lake City, with its vibrant music scene, is the perfect backdrop for your piano learning journey. Our piano lessons in Salt Lake City Utah offer both beginners and advanced students the opportunity to explore their musical potential under the guidance of experienced teachers.</p>

<h3 class="wp-block-heading"><strong>Piano Lessons in Ogden Utah: Embracing Musical Excellence</strong></h3>

<p>Ogden's rich cultural heritage makes it an ideal place for music enthusiasts to thrive. Our piano lessons in Ogden Utah are designed to immerse students in the world of music, encouraging growth, creativity, and confidence.</p>

<h3 class="wp-block-heading"><strong>Cultivating Talent in Orem: Piano Lessons Orem Utah</strong></h3>

<p>In Orem, Volz Piano's lessons are known for their personalized approach, ensuring that students of all ages can achieve their musical aspirations. Our piano lessons in Orem Utah focus on individual progress, making every session rewarding.</p>

<h3 class="wp-block-heading"><strong>Experience the Difference with Volz Piano</strong></h3>

<p>Choosing Volz Piano for your piano lessons in Utah means opting for a music education that values individuality, creativity, and the joy of learning. Our comprehensive program caters to beginners and advanced students alike, ensuring that every learner finds their path to musical excellence.</p>

<p>For those interested in expanding their knowledge and getting involved in the wider music community, the<a href="https://www.mtna.org/"> Music Teachers National Association</a> provides a wealth of resources and opportunities for both students and teachers.Ready to start your musical journey? Visit<a href="https://volzpiano.com/"> Volz Piano</a> today to learn more about our piano lessons in Utah. Let us be the key to unlocking your musical potential and discovering the joy of playing piano. With Volz Piano, the melody of success is at your fingertips.</p>`;

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
            Discover the Joy of Music with Piano Lessons in Utah at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            March 15, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/discover-the-joy-of-music-with-piano-lessons-in-utah-at-volz-piano.jpg"
              alt="Featured image for Discover the Joy of Music with Piano Lessons in Utah at Volz Piano"
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
