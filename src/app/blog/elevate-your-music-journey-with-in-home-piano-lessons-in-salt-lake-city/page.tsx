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

  const content = `<p>Welcome to the convenience and personalized experience of In-Home Piano Lessons offered by Volz Piano, your premier choice for music education in Salt Lake City. We specialize in bringing high-quality, customized piano instruction right to your doorstep, making learning both convenient and comfortable.</p>

<h2 class="wp-block-heading"><strong>Why Choose In-Home Piano Lessons?</strong></h2>

<p>Choosing In-Home Piano Lessons means setting up an ideal learning environment where the student feels most at ease. This personalized approach not only enhances learning efficiency but also allows for flexible scheduling around your busy lifestyle.</p>

<h3 class="wp-block-heading"><strong>The Convenience of In-Home Piano Lessons Near Me</strong></h3>

<p>For those seeking "in-home piano lessons near me," Volz Piano provides a seamless solution. Our talented instructors travel to your location, ensuring that top-notch piano education is always within your reach, right in the comfort of your own home.</p>

<h3 class="wp-block-heading"><strong>Understanding the In-Home Piano Lessons Cost</strong></h3>

<p>When considering in-home piano lessons cost, it's important to recognize the value of personalized instruction. At Volz Piano, we offer transparent pricing for our in-home piano lessons, ensuring you understand the average cost of in-home piano lessons without any surprises.</p>

<h3 class="wp-block-heading"><strong>Private Piano Lessons in Your Home</strong></h3>

<p>Our private piano lessons in your home are tailored to meet the individual needs of each student, whether they are beginners or more advanced players. This one-on-one approach allows for a customized learning plan that targets each student's strengths and areas for improvement.</p>

<h3 class="wp-block-heading"><strong>Best Private Piano Lessons in Your Home</strong></h3>

<p>We take pride in offering some of the best private piano lessons in your home. Our instructors are not only accomplished pianists but also passionate educators who strive to make each lesson engaging, informative, and tailored to the student's personal musical journey.</p>

<h3 class="wp-block-heading"><strong>Piano Lessons in Your Home Cost</strong></h3>

<p>The piano lessons in your home cost is an investment in quality education and personal development. At Volz Piano, we ensure that our rates are competitive and reflective of the exceptional service and convenience we provide. For detailed information on pricing, please visit our<a href="https://volzpiano.com/"> pricing page</a>.</p>

<h3 class="wp-block-heading"><strong>For Adults and Beginners Alike</strong></h3>

<p>Our in-home piano lessons are designed to cater to students of all ages, including for adults and beginners. It's never too late to start your musical journey, and our personalized lessons make it possible for everyone to achieve their musical goals.</p>

<h3 class="wp-block-heading"><strong>Join Our Community</strong></h3>

<p>By choosing Volz Piano for your in-home piano lessons, you're not just signing up for lessons; you're joining a community of music lovers. We offer support and resources to enhance your learning experience, including access to music events and performance opportunities.</p>

<h3 class="wp-block-heading"><strong>Get Started Today</strong></h3>

<p>Ready to experience the convenience and personalized attention of in-home piano lessons in Salt Lake City? Visit our website <a href="https://volzpiano.com/">https://volzpiano.com/</a>  to learn more about our services and sign up for lessons today.</p>

<p>For additional resources on piano learning and music education, we recommend visiting <a href="https://www.musicradar.com/">MusicRadar</a>, an excellent source for tips, tutorials, and the latest in the world of music.</p>

<p>With In-Home Piano Lessons from Volz Piano, you'll enjoy the benefits of personalized, convenient, and high-quality piano instruction right in your own home. Our experienced instructors are ready to help you or your child embark on a rewarding musical journey. Contact us today to get started!</p>`;

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
            Elevate Your Music Journey with In-Home Piano Lessons in Salt Lake City
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            February 19, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/elevate-your-music-journey-with-in-home-piano-lessons-in-salt-lake-city.jpg"
              alt="Featured image for Elevate Your Music Journey with In-Home Piano Lessons in Salt Lake City"
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
