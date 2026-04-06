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

  const content = `<p>Welcome to Volz Piano, your premier destination for Sandy piano lessons. Whether you are located in Sandy Springs, Sandy Utah, or Sandy Oregon, our dedicated team of instructors is here to foster your love for the piano.</p>

<h2 class="wp-block-heading">Why Choose Sandy Piano Lessons at Volz Piano?</h2>

<h3 class="wp-block-heading">Tailored Piano Education</h3>

<p>At Volz Piano, we offer customized Sandy piano lessons that cater to the unique needs of each student. From young beginners to more advanced players, our programs are designed to help you achieve your musical goals.</p>

<h3 class="wp-block-heading">Expert Instructors</h3>

<p>Our Sandy piano lessons are led by some of the most talented and passionate instructors in the industry. For example, Sandy Moser, one of our esteemed teachers, brings a wealth of knowledge and an inspiring teaching style to her students.</p>

<h3 class="wp-block-heading">Convenient Locations</h3>

<p>No matter where you're located, finding Sandy piano lessons near me is easy with Volz Piano. Our lessons are accessible and designed to fit into your busy schedule, ensuring that you can pursue your passion for music without compromise.</p>

<h3 class="wp-block-heading">Understanding the Costs</h3>

<p>We believe in transparent and affordable pricing for our Sandy piano lessons. The cost of our lessons varies depending on the program and length of enrollment, but we strive to make piano education accessible to everyone. For more details, please visit our Pricing Page.</p>

<h2 class="wp-block-heading">Comprehensive Piano Programs in Sandy</h2>

<h3 class="wp-block-heading">Diverse Musical Repertoire</h3>

<p>Our Sandy piano lessons include a variety of musical styles, from classical to contemporary. This diverse curriculum ensures that students can explore different genres and find their unique musical voice.</p>

<h3 class="wp-block-heading">State-of-the-Art Facilities</h3>

<p>Volz Piano is equipped with top-of-the-line instruments and teaching tools. Our facilities in Utah, Oregon, and beyond are designed to enhance your learning experience and help you progress effectively.</p>

<h3 class="wp-block-heading">Community and Events</h3>

<p>Joining Sandy piano lessons at Volz Piano means becoming part of a vibrant community. We offer regular recitals, workshops, and events that allow students to showcase their skills and connect with other music enthusiasts.</p>

<h2 class="wp-block-heading">Enroll in Sandy Piano Lessons Today</h2>

<p>Are you ready to begin your journey with Sandy piano lessons? Visit us at<a href="https://volzpiano.com/"> </a><a href="https://volzpiano.com/">Volz Piano</a> to learn more about our programs and how to enroll. Embrace the opportunity to develop your piano skills in a supportive and enriching environment.</p>

<p>For additional resources on the benefits of music education, you can visit the<a href="https://www.mtna.org/"> </a><a href="https://www.mtna.org/">Music Teachers National Association</a>, which provides valuable insights into the impact of learning music.</p>

<p>At Volz Piano, we are committed to providing the highest quality of education and fostering the talents of our students in Sandy. We invite you to start your musical adventure with us and discover the joy of playing the piano through our expertly designed Sandy piano lessons.</p>`;

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
            Sandy Piano Lessons: Unleashing Musical Excellence at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            April 24, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/sandy-piano-lessons-unleashing-musical-excellence-at-volz-piano.jpg"
              alt="Featured image for Sandy Piano Lessons: Unleashing Musical Excellence at Volz Piano"
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
