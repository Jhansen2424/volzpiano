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

  const content = `<p>In the bustling world we live in, convenience and personalization are key to integrating new learning experiences into our lives. At Volz Piano, we understand this need and proudly offer in-home piano lessons in Utah, bringing the joy and discipline of music education directly to your living room.</p>

<h2 class="wp-block-heading"><strong>In-Home Piano Lessons: Personalized Music Education at Your Doorstep</strong></h2>

<p>Our in-home piano lessons are designed to provide the utmost convenience without compromising on the quality of education. Whether you're a busy parent looking for piano lessons in your home for your children, or an adult aspiring to learn the piano, our services are tailored to fit your lifestyle.</p>

<h3 class="wp-block-heading"><strong>The Convenience of Piano Lessons in Your Home</strong></h3>

<p>Gone are the days of commuting to music studios for lessons. With our in-home piano lessons, we bring the music to you, allowing for a comfortable and familiar learning environment. This convenience is particularly beneficial for young learners, as it provides a safe space for them to explore their musical talents.</p>

<h3 class="wp-block-heading"><strong>Understanding the Cost: In-Home Piano Lessons Cost</strong></h3>

<p>When considering in-home piano lessons, the cost is an important factor for many families and individuals. At Volz Piano, we strive to make our pricing transparent and competitive, ensuring that high-quality music education is accessible to everyone. For detailed pricing on in-home piano lessons cost, please visit<a href="https://volzpiano.com/"> Volz Piano</a>.</p>

<h3 class="wp-block-heading"><strong>Private Piano Lessons in Your Home: Tailored to Your Needs</strong></h3>

<p>Our private piano lessons in your home are crafted to cater to the individual needs of each student. Whether you're starting from scratch or looking to advance your skills, our experienced teachers customize each tutorial to ensure the most effective learning experience.</p>

<h3 class="wp-block-heading"><strong>Finding In-Home Piano Lessons Near Me</strong></h3>

<p>The search for "piano lessons at home near me" ends with Volz Piano. Serving communities throughout Utah, we ensure that you have access to the best private piano teachers who are ready to bring their expertise to your doorstep.</p>

<h3 class="wp-block-heading"><strong>In-Home Piano Lessons for Kids: Building a Musical Foundation</strong></h3>

<p>For families seeking in-home piano lessons for kids, Volz Piano provides an engaging and nurturing environment for your children to grow musically. Our lessons are designed to be fun and educational, instilling a love for music that will last a lifetime.</p>

<h3 class="wp-block-heading"><strong>Choosing the Best Private Piano Lessons in Your Home</strong></h3>

<p>Selecting the best private piano lessons in your home involves finding the right teacher who can adapt to your learning style and musical goals. At Volz Piano, our teachers are not only skilled musicians but also passionate educators, committed to delivering the best possible learning experience.</p>

<h3 class="wp-block-heading"><strong>Embark on Your Musical Journey with Volz Piano</strong></h3>

<p>In-home piano lessons with Volz Piano offer a unique opportunity to integrate music education seamlessly into your life. Whether you're in search of private piano lessons in your home, or interested in exploring in-home piano lessons for kids, we're here to ensure that your musical journey is enriching and accessible.</p>

<p>For those interested in further exploring the benefits of music education and in-home learning, the<a href="https://nafme.org/"> National Association for Music Education</a> provides valuable resources and insights that complement the personalized experience offered by Volz Piano. Ready to transform your home into a music studio? Visit<a href="https://volzpiano.com/"> Volz Piano</a> today to discover more about our in-home piano lessons in Utah. Let us bring the world of music right to your doorstep, where every lesson is a step closer to achieving your musical dreams.</p>`;

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
            Transform Your Home into a Music Studio with In-Home Piano Lessons in Utah
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            March 13, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/transform-your-home-into-a-music-studio-with-in-home-piano-lessons-in-utah.jpg"
              alt="Featured image for Transform Your Home into a Music Studio with In-Home Piano Lessons in Utah"
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
