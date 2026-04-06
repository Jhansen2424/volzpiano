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

  const content = `<p>Welcome to a world where the melodious sounds of the piano are not just heard but deeply felt and experienced. At Volz Piano, we are thrilled to offer Murray Piano Lessons that are designed to bring out the musician in everyone, from the eager beginner to the more advanced student. Whether you're looking for Lisa Murray piano lessons or you're curious about exploring piano lessons in Murray, KY or piano lessons in Murray, Utah, we have you covered. Let's dive into why choosing Murray Piano Lessons at Volz Piano could be the start of your most beautiful musical journey yet.</p>

<h2 class="wp-block-heading"><strong>A Journey Tailored for Beginners and Beyond</strong></h2>

<p>Embarking on the path of learning piano can be exhilarating, and with Murray Piano Lessons, that journey is made even more special. Understanding the cost of piano lessons is crucial for many of our students. At Volz Piano, we pride ourselves on offering transparent pricing that allows for a high-quality learning experience at a reasonable cost per month. We believe in making music accessible to all, which is why our lessons are priced to accommodate the needs of our community, ensuring that the joy of music is never out of reach.</p>

<p>For those just starting their musical voyage, Murray Piano Lessons for beginners are crafted with care and precision. Our experienced instructors, including the renowned Lisa Murray, focus on creating a supportive and engaging environment. By prioritizing the unique needs and pace of each student, we ensure that every beginner feels confident and excited to explore the world of music.</p>

<h2 class="wp-block-heading"><strong>Piano Lessons Near Me in Murray</strong></h2>

<p>Finding the right piano lessons near me can be a daunting task, but with Volz Piano, you're choosing a partner in your musical journey that is deeply committed to your growth and joy in learning. Whether you're searching for piano lessons in Murray, KY, or you're a Utah resident interested in piano lessons in Murray, Utah, our doors are open, and our pianos are tuned, ready for you to play your first note.</p>

<p>One of the unique aspects of Murray Piano Lessons is our dedication to community and connection. By choosing to learn with us, you're not just signing up for piano lessons; you're becoming part of a musical family that celebrates each other's achievements and supports one another through the learning process.</p>

<h2 class="wp-block-heading"><strong>Discover the Cost and Joy of Learning</strong></h2>

<p>When considering the cost of Murray Piano Lessons, it's important to think beyond the financial aspect and envision the invaluable experience you're about to embark on. Music has the power to transform lives, evoke emotions, and create memories that last a lifetime. With our piano lessons, we strive to make this experience as accessible as possible, offering various packages that cater to different needs and budgets.</p>

<p>For more information about our lesson plans and pricing, feel free to visit our main website at<a href="https://volzpiano.com/"> Volz Piano</a>. Here, you'll find everything you need to know about getting started with Murray Piano Lessons, including details on how to sign up for your first lesson.</p>

<h2 class="wp-block-heading"><strong>Join Us Today</strong></h2>

<p>Are you ready to dive into the world of music with Murray Piano Lessons? Whether you're in Murray, KY, looking for Lisa Murray piano lessons, or you're interested in piano lessons in Murray, Utah, we invite you to join our musical family at Volz Piano. Your journey to mastering the piano is just a few clicks away.</p>

<p>For those seeking to deepen their knowledge and perhaps even teach one day, this<a href="https://www.music.org/"> external article on the benefits of music education</a> provides valuable insights into how music can enrich our lives and communities.</p>

<p>Let's make music together. Start your journey with Murray Piano Lessons today and unlock the joy of music like never before.</p>`;

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
            Unlock the Joy of Music with Murray Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            March 27, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/unlock-the-joy-of-music-with-murray-piano-lessons-at-volz-piano.jpg"
              alt="Featured image for Unlock the Joy of Music with Murray Piano Lessons at Volz Piano"
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
