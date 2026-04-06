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

  const content = `<p>Welcome to Volz Piano, your premier destination for finding the most talented and experienced piano teachers in Utah. Whether you reside in Kaysville, Layton, Logan, Sandy, or anywhere else in this beautiful state, we've got you covered with top-notch instructors who are passionate about bringing the joy of piano playing to students of all ages.</p>

<h2 class="wp-block-heading"><strong>Why Volz Piano Boasts the Best Piano Teachers in Utah</strong></h2>

<p>Our commitment to excellence in music education makes us stand out as the home to some of the best piano teachers in Utah. Each instructor brings a unique blend of expertise, teaching style, and enthusiasm to the classroom, ensuring that every lesson is both educational and enjoyable.</p>

<h3 class="wp-block-heading"><strong>Tailored Lessons to Meet Individual Needs</strong></h3>

<p>Understanding that each student has different goals and learning paces, our piano teachers in Utah customize lessons to suit individual needs. Whether you're a beginner or looking to refine your skills, our teachers are skilled in a range of techniques and genres.</p>

<h3 class="wp-block-heading"><strong>Piano Teachers Across Utah</strong></h3>

<p><strong>Piano teachers in Kaysville, Utah:</strong> Discover local talent in Kaysville, providing personalized lessons that cater to your musical interests.</p>

<p><strong>Piano teachers in Layton, Utah:</strong> Layton's instructors are known for their dynamic teaching methods, making learning fun and effective.</p>

<p><strong>Piano teachers in Logan, Utah:</strong> Experience the rich musical culture of Logan with teachers who inspire creativity and confidence.</p>

<p><strong>Piano teachers in Sandy, Utah:</strong> Sandy's piano educators are adept at nurturing students’ talents, from classical to contemporary styles.</p>

<h3 class="wp-block-heading"><strong>Cost-Effective Learning Options</strong></h3>

<p>We believe in making music education accessible, which is why our piano teachers in Utah offer competitive pricing. Understanding the cost of lessons is important to our students, and we strive to provide value without compromising on quality.</p>

<h3 class="wp-block-heading"><strong>Piano Lessons Near Me</strong></h3>

<p>For those searching for "piano lessons near me," look no further. Volz Piano connects you with local piano teachers in Utah, ensuring that high-quality music education is just a stone's throw away.</p>

<h3 class="wp-block-heading"><strong>Piano Lessons for Adults</strong></h3>

<p>It's never too late to start learning the piano. Our piano teachers in Utah specialize in lessons for adults, tailoring sessions to fit busy schedules and specific musical interests. Whether you're pursuing a lifelong dream or looking for a new hobby, our adult lessons are designed with you in mind.</p>

<h3 class="wp-block-heading"><strong>Join Our Community</strong></h3>

<p>Becoming part of the Volz Piano family means joining a community of music lovers and learners. We encourage our students to participate in recitals and workshops, providing opportunities to showcase their progress and connect with fellow musicians.</p>

<h3 class="wp-block-heading"><strong>Get Started Today</strong></h3>

<p>Ready to embark on your musical journey? Visit our<a href="https://volzpiano.com/"> website</a> to learn more about our piano teachers in Utah and find the perfect fit for your piano learning adventure.</p>

<p>For those interested in further reading on the benefits of piano lessons and tips for beginners, check out <a href="https://www.musicradar.com/">MusicRadar</a>, an excellent resource for all things music.</p>

<p>With piano teachers in Utah from Volz Piano, you're not just learning how to play an instrument; you're unlocking a world of creativity, discipline, and joy. No matter where you are in Utah, let us help you find the right teacher to start your musical journey today.</p>`;

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
            Discover the Best Piano Teachers in Utah at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            February 12, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/discover-the-best-piano-teachers-in-utah-at-volz-piano.jpg"
              alt="Featured image for Discover the Best Piano Teachers in Utah at Volz Piano"
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
