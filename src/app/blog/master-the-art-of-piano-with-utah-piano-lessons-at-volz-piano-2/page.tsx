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

  const content = `<p>Welcome to the beginning of your musical journey with Utah piano lessons offered at Volz Piano. Situated in the heart of the Beehive State, we're here to bring the joy of music to students of all ages and skill levels. Whether you're in Logan, Utah County, or anywhere else in the state, our doors are open to all who seek to learn and grow through music.</p>

<h2 class="wp-block-heading">Tailored Lessons for Every Aspirant</h2>

<p>Our piano lessons in Utah County and beyond are customized to meet the unique needs of each student. Understanding that each learner has a distinct pace and preference, our piano teachers in Utah are not just educators but mentors who guide you through every step of your musical voyage.</p>

<h2 class="wp-block-heading">For the Young Maestros</h2>

<p>Children have a natural affinity for music, and our kids' piano lessons in Utah are designed to nurture this innate talent. By creating a fun, engaging, and supportive environment, we help our young learners develop a lifelong love for music. Our lessons for kids are not just about notes and rhythms; they're about sparking creativity and joy.</p>

<h2 class="wp-block-heading">Adult Learners Welcome</h2>

<p>It's never too late to start learning music. Our adult piano lessons in Utah cater to older students looking to either begin their musical journey or pick up where they left off. With flexible scheduling and personalized lesson plans, adult learners can balance their musical ambitions with their busy lives.</p>

<h2 class="wp-block-heading">Beginner's Path</h2>

<p>Starting from scratch? Our beginners' piano lessons in Utah are the perfect starting point. We cover the fundamentals of music theory and piano technique, building a solid foundation that allows students to progress confidently.</p>

<h2 class="wp-block-heading">Discover the Best Teachers Near You</h2>

<p>Finding the right mentor is crucial in your music learning journey. Our piano teachers in Utah are selected for their expertise, teaching style, and ability to connect with students. With teachers located near you, we make it convenient for students across Utah to access quality music education.</p>

<h2 class="wp-block-heading">Explore More on Our Website</h2>

<p>Dive deeper into what Volz Piano has to offer by visiting our website at<a href="https://volzpiano.com/"> https://volzpiano.com/</a>. Here, you'll find detailed information on our lesson plans, teaching philosophy, and how we strive to make music education accessible to everyone.</p>

<h2 class="wp-block-heading">The Power of Music Education</h2>

<p>The benefits of learning music extend far beyond the piano. According to research, engaging in music education can enhance cognitive abilities, improve emotional well-being, and foster social connections. Recognizing the transformative power of music, we're dedicated to providing Utah piano lessons that not only teach how to play but also how to appreciate and love music.</p>

<h2 class="wp-block-heading">Join the Volz Piano Family</h2>

<p>At Volz Piano, we're more than a music school; we're a community passionate about bringing music into the lives of our students. Whether you're interested in piano lessons in Logan, Utah, piano lessons in Utah County, or anywhere else in the state, we're here to support your musical journey.</p>

<p>Embark on a fulfilling musical adventure with Utah piano lessons at Volz Piano. Let music be the language that inspires, heals, and brings us together.</p>`;

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
            Master the Art of Piano with Utah Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            April 03, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/master-the-art-of-piano-with-utah-piano-lessons-at-volz-piano-2.jpg"
              alt="Featured image for Master the Art of Piano with Utah Piano Lessons at Volz Piano"
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
