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

  const content = `<p>Dive into the world of music with Volz Piano, your premier destination for Utah piano lessons. Nestled in the heart of Salt Lake City, we offer a wide array of piano instruction tailored to students of all ages and skill levels. Whether you're seeking to master jazz piano lessons in Utah or searching for piano lessons near the University of Utah, our experienced teachers are here to guide you on your musical journey.</p>

<h2 class="wp-block-heading"><strong>Utah Piano Lessons: A Gateway to Musical Excellence</strong></h2>

<p>Our Utah piano lessons are designed to cater to the diverse needs of our students. With programs ranging from piano lessons in Salt Lake City, Utah, to specialized jazz piano lessons, Utah's aspiring musicians will find a nurturing environment to grow and excel.</p>

<h3 class="wp-block-heading"><strong>For the Aspiring Jazz Musicians</strong></h3>

<p>Jazz enthusiasts will revel in our jazz piano lessons in Utah, where students can immerse themselves in the rich tapestry of jazz music. Our curriculum covers everything from basic improvisation to advanced jazz theory, ensuring a comprehensive learning experience.</p>

<h3 class="wp-block-heading"><strong>Academic Pursuits: Piano Lessons at the University of Utah</strong></h3>

<p>For those associated with or near the University of Utah, our piano lessons offer a unique opportunity to enhance your musical education. Our teachers, some of whom are affiliated with the university, bring a wealth of knowledge and expertise to their students.</p>

<h3 class="wp-block-heading"><strong>Understanding the Investment: Average Cost of Piano Lessons in Utah</strong></h3>

<p>Investing in your musical education is a decision that pays dividends in joy and skill. While the average cost of piano lessons in Utah varies, at Volz Piano, we pride ourselves on offering competitive rates without compromising on quality. For more details, visit our pricing page on<a href="https://volzpiano.com/"> Volz Piano's website</a>.</p>

<h3 class="wp-block-heading"><strong>Expanding Horizons: Piano Lessons in Utah County and Beyond</strong></h3>

<p>Our reach extends beyond Salt Lake City, offering piano lessons in Utah County and surrounding areas. Whether you're looking for piano lessons "near me" or specialized instruction like jazz piano lessons, Utah County residents will find Volz Piano accessible and accommodating.</p>

<h3 class="wp-block-heading"><strong>Tailored Instruction for Every Learner</strong></h3>

<p>Understanding that each student's journey is unique, we offer personalized lessons for beginners and advanced students alike. Our programs are crafted to suit both adults and younger learners, ensuring that whether you're a beginner or looking to hone your skills further, you'll find the right path with us.</p>

<h3 class="wp-block-heading"><strong>Why Choose Volz Piano for Your Utah Piano Lessons?</strong></h3>

<p>Our commitment to excellence and personalized instruction sets us apart. With a team of dedicated teachers who specialize in a range of styles and techniques, we ensure that every student receives the attention and guidance they need to succeed. Our lessons are not just about learning to play; they're about inspiring passion, fostering creativity, and building a lifelong love for music.</p>

<p>For insights on the benefits of learning music, we encourage you to read this informative article from <a href="https://journals.sagepub.com/">Music Educators Journal</a>, which highlights the cognitive and emotional benefits of engaging in musical education.</p>

<h3 class="wp-block-heading"><strong>Begin Your Musical Journey with Us</strong></h3>

<p>Are you ready to embark on a transformative musical journey? With Utah piano lessons at Volz Piano, you're not just learning to play the piano; you're unlocking a new world of creativity and expression. Whether you're in Salt Lake City, Utah County, or anywhere in between, let us be the key to your musical adventure.</p>

<p>Discover the difference that dedicated, passionate teaching can make. Visit<a href="https://volzpiano.com/"> Volz Piano</a> today and take the first step towards realizing your musical dreams with Utah piano lessons.</p>`;

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
            Discover the Joy of Utah Piano Lessons with Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            February 05, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/discover-the-joy-of-utah-piano-lessons-with-volz-piano.jpg"
              alt="Featured image for Discover the Joy of Utah Piano Lessons with Volz Piano"
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
