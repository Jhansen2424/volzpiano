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

  const content = `<p>Discovering the right piano teacher in Utah is the first step to unlocking your potential in the world of music. At Volz Piano, we take pride in connecting students with the finest piano teachers in Utah, ensuring that every lesson is a step towards mastery and enjoyment of the piano.</p>

<h2 class="wp-block-heading"><strong>Piano Teachers in Utah: Your Gateway to Musical Excellence</strong></h2>

<p>Whether you're in the bustling streets of South Jordan or the serene landscapes of Springville, the journey to find the perfect piano teacher near you has never been easier. With Volz Piano, we ensure that you have access to the best piano teachers in Utah, no matter where you are.</p>

<h3 class="wp-block-heading"><strong>South Jordan's Musical Gem: Piano Teachers in South Jordan, Utah</strong></h3>

<p>In South Jordan, our piano teachers are known for their dedication and expertise. They tailor lessons to meet the unique needs of each student, ensuring a personalized learning experience that fosters growth and passion for music. Explore piano lessons in South Jordan, Utah, and embark on a musical journey that promises both challenge and reward.</p>

<h3 class="wp-block-heading"><strong>Springville's Melodic Haven: Piano Teachers in Springville, Utah</strong></h3>

<p>Springville offers a haven for budding musicians, with piano teachers who specialize in nurturing talent at every level. Whether you're a beginner or looking to polish your skills, piano teachers in Springville, Utah, provide the guidance and support you need to excel.</p>

<h3 class="wp-block-heading"><strong>St. George's Musical Oasis: Piano Teachers in St. George, Utah</strong></h3>

<p>St. George's vibrant music scene is enriched by its talented piano teachers. With a focus on creativity and expression, piano teachers in St. George, Utah, ensure that every lesson is an opportunity to explore the depths of music.</p>

<h3 class="wp-block-heading"><strong>West Jordan's Harmony Hub: Piano Teachers in West Jordan, Utah</strong></h3>

<p>West Jordan is home to a diverse group of piano teachers who are committed to delivering high-quality music education. Whether you're starting your musical journey or advancing your skills, piano teachers in West Jordan, Utah, offer lessons that are engaging and effective.</p>

<h3 class="wp-block-heading"><strong>Discovering the Best Piano Teachers in Utah</strong></h3>

<p>Finding the best piano teacher is crucial to your musical development. At Volz Piano, we connect you with the best piano teachers in Utah, ensuring that your learning experience is nothing short of excellent. Our teachers are not only skilled musicians but also passionate educators who strive to make learning piano accessible and enjoyable.</p>

<h3 class="wp-block-heading"><strong>Bountiful's Melodic Masters: Piano Teachers in Bountiful, Utah</strong></h3>

<p>Bountiful's piano teachers stand out for their comprehensive approach to music education. From classical to contemporary, piano teachers in Bountiful, Utah, are equipped to guide you through a wide range of musical genres.</p>

<h3 class="wp-block-heading"><strong>The Cost of Excellence: Piano Lessons in Utah</strong></h3>

<p>Understanding the cost of piano lessons is an important part of your musical journey. At Volz Piano, we believe in providing quality education at an affordable price. Visit our website at<a href="https://volzpiano.com/"> Volz Piano</a> to learn more about our pricing and how we strive to make piano lessons accessible to everyone in Utah.</p>

<h3 class="wp-block-heading"><strong>Embark on Your Musical Journey Today</strong></h3>

<p>Choosing the right piano teacher in Utah is a critical step in your musical journey. At Volz Piano, we are committed to providing you with access to the best piano teachers across the state. Whether you're in South Jordan, Springville, St. George, West Jordan, or Bountiful, we have the perfect teacher to meet your needs and aspirations.</p>

<p>For additional resources on choosing a piano teacher and the benefits of music education, consider visiting the<a href="https://www.mtna.org/"> Music Teachers National Association</a> website. It offers valuable insights and support for students seeking quality music education.Ready to start your journey with a piano teacher in Utah? Visit<a href="https://volzpiano.com/"> Volz Piano</a> today and discover how we can help you achieve your musical dreams. With Volz Piano, your search for the perfect piano teacher in Utah ends here. Let's make music together!</p>`;

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
            Find Your Perfect Piano Teacher in Utah with Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            March 08, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/find-your-perfect-piano-teacher-in-utah-with-volz-piano.jpg"
              alt="Featured image for Find Your Perfect Piano Teacher in Utah with Volz Piano"
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
