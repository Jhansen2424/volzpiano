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

  const content = `<p>Embarking on a musical journey can be exciting, especially when it involves learning the piano. At Volz Piano, we specialize in beginners piano lessons tailored to help novice players in Utah become proficient pianists. Whether you're an adult looking to start a new hobby or a young student eager to learn, our comprehensive beginners piano lessons will set the right foundation.</p>

<h2 class="wp-block-heading"><strong>Discover the Perfect Beginners Piano Lessons for You</strong></h2>

<p>Tailored Programs: Volz Piano offers a variety of beginners piano lessons, including piano lessons for beginners adults and keyboard piano lessons for beginners. Our curriculum is designed to introduce the fundamentals of piano playing in a structured and enjoyable way. We also offer beginners piano keyboard lessons for those who prefer the versatility of a keyboard.</p>

<p>Experienced Teachers: Our certified and experienced teachers are passionate about music and teaching, making them perfect for delivering beginners piano lessons. Each teacher understands the unique needs of beginners and adapts lessons to be engaging and informative, ensuring you or your child can learn and grow at a comfortable pace.</p>

<p>Accessible and Affordable: Located throughout Utah, Volz Piano makes it easy to find beginners piano lessons near me. We strive to keep our costs transparent and affordable, ensuring that beginners piano lessons are accessible to everyone. For detailed pricing, visit our pricing page.</p>

<h3 class="wp-block-heading"><strong>What Makes Our Beginners Piano Lessons Unique?</strong></h3>

<p>Best Piano Lessons for Beginners: At Volz Piano, we pride ourselves on offering some of the best piano lessons for beginners. Our approach to basic piano lessons for beginners focuses on key aspects of piano playing such as reading music, understanding piano keys, and basic hand coordination. We also incorporate essential music theory to deepen understanding and appreciation of music.</p>

<p>Community and Support: Learning piano is not just about attending lessons; it's about becoming part of a community. Volz Piano ensures every student feels supported both during and after their lessons. Our community events and recitals provide a nurturing environment where students can showcase their progress and celebrate milestones.</p>

<p>Flexible Learning Options: We understand that our students have diverse needs and schedules. That’s why our beginners piano lessons are designed with flexibility in mind. Options for in-person and online lessons mean you can learn from the comfort of your home or at our welcoming studio.</p>

<h3 class="wp-block-heading"><strong>Begin Your Piano Journey Today</strong></h3>

<p>Ready to dive into the world of piano? Beginner piano lessons at Volz Piano are the perfect starting point. Whether it's piano music lessons for beginners or a basic introduction to the keyboard, we have the resources and expertise to help you succeed.</p>

<p>For further inspiration and to understand the benefits of learning piano, check out this insightful article from <a href="https://www.musicradar.com/">MusicRadar</a> on why the piano is a fantastic first instrument.Join us at Volz Piano and start your musical journey today with our beginners piano lessons. Visit<a href="https://volzpiano.com/"> Volz Piano</a> to learn more about our programs and get started with your first lesson. Let your musical dreams take flight with us!</p>`;

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
            Start Your Musical Journey with Beginners Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            May 03, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/start-your-musical-journey-with-beginners-piano-lessons-at-volz-piano.jpg"
              alt="Featured image for Start Your Musical Journey with Beginners Piano Lessons at Volz Piano"
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
