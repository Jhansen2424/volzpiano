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

  const content = `<p>Welcome to Volz Piano, where we connect you with top-notch piano teachers in Utah. Whether you are a beginner or an advanced player, our skilled instructors are here to guide your musical journey across various locations including South Jordan, Springville, St. George, West Jordan, and Bountiful.</p>

<h2 class="wp-block-heading">Excellence in Every Note</h2>

<p>Piano teachers in Utah at Volz Piano are renowned for their expertise and passion for music education. Our best piano teachers in Utah provide personalized attention, ensuring that each student receives the guidance needed to excel at their own pace.</p>

<h2 class="wp-block-heading">Wide Coverage Across Utah</h2>

<p>Our network includes piano teachers in South Jordan Utah, piano teachers in Springville Utah, piano teachers in St. George Utah, piano teachers in West Jordan Utah, and piano teachers in Bountiful Utah. This widespread availability makes it easy for you to find experienced teachers near you.</p>

<h2 class="wp-block-heading">Tailored Piano Lessons</h2>

<p>At Volz Piano, lessons are tailored to meet the unique needs and goals of each student. Our instructors specialize in a variety of musical styles and techniques, ensuring a well-rounded learning experience. Whether you're looking for classical training or contemporary styles, our piano teachers in Utah have you covered.</p>

<h2 class="wp-block-heading">Understanding the Costs</h2>

<p>We believe in transparency when it comes to the cost of learning. At Volz Piano, we offer competitive pricing for quality education, ensuring that your investment in piano lessons pays off. For more details on our lesson pricing, visit our Pricing Page.</p>

<h2 class="wp-block-heading">Our Teaching Philosophy</h2>

<p>Our philosophy at Volz Piano centers around nurturing the musical potential within each individual. We emphasize creativity, technique, and personal growth, making us a leading choice for those searching for piano teachers in Utah.</p>

<h2 class="wp-block-heading">Learn From the Best</h2>

<p>Our instructors are not only skilled musicians but also dedicated educators. They understand that teaching piano requires patience, empathy, and a deep understanding of music. By choosing Volz Piano, you are ensuring that you learn from the best piano teachers in Utah.</p>

<h2 class="wp-block-heading">Why Choose Our Teachers?</h2>

<p>Choosing the right piano teacher is crucial for your musical development. Our piano teachers in Utah are selected for their professional qualifications and their ability to connect with students. Each teacher is committed to crafting enjoyable and effective lessons tailored to your personal interests and goals.</p>

<h2 class="wp-block-heading">Join Us Today</h2>

<p>Ready to start learning piano with some of the best piano teachers in Utah? Visit our website at<a href="https://volzpiano.com/"> Volz Piano</a> to find out more about our teachers and how to enroll in lessons. Whether you are in South Jordan, Springville, St. George, West Jordan, or Bountiful, great piano lessons are just around the corner.</p>

<h2 class="wp-block-heading">Conclusion</h2>

<p>Finding the right piano teachers in Utah can transform your musical experience. At Volz Piano, we pride ourselves on offering a network of highly qualified instructors who are ready to help you achieve your musical dreams. Start your journey to becoming a proficient pianist with us today!</p>

<p>This comprehensive approach to learning, coupled with access to some of the best piano teachers in Utah, ensures that your piano education is nothing short of exceptional. For further insights into the benefits of learning music, consider checking out resources from reputable organizations like<a href="https://nafme.org/"> </a><a href="https://nafme.org/">The National Association for Music Education</a>.</p>`;

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
            Find the Best Piano Teachers in Utah at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            April 09, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/find-the-best-piano-teachers-in-utah-at-volz-piano.jpg"
              alt="Featured image for Find the Best Piano Teachers in Utah at Volz Piano"
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
