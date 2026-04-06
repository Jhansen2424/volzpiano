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

  const content = `<p>If you're seeking to enrich your child's life with the gift of music, exploring piano lessons for kids in Utah is a wonderful start. At Volz Piano, we specialize in nurturing young musicians through personalized and engaging beginner piano lessons for kids. Whether you live in Salt Lake City or the surrounding areas, you're just a step away from discovering how our programs can benefit your child’s development and artistic expression.</p>

<h2 class="wp-block-heading"><strong>The Joy and Benefits of Piano Lessons for Kids</strong></h2>

<p>Piano lessons for kids offer more than just the ability to play music. They foster a multitude of cognitive and personal benefits, enhancing skills that go beyond the music room. According to a study highlighted by the <em>National Association for Music Education</em>, engaging in music lessons has been linked to improved math and reading scores, better fine motor skills, and enhanced concentration (source). These benefits make piano lessons for kids a valuable investment in their overall development.</p>

<h3 class="wp-block-heading"><strong>Finding the Right Piano Lessons for Kids Near Me</strong></h3>

<p>For families in Salt Lake City and nearby, Volz Piano provides accessible and high-quality piano lessons for kids at home. We understand that convenience is key, and offer flexible scheduling to fit busy family lifestyles. If you’re searching for "piano lessons for kids near me," look no further than our experienced instructors at Volz Piano. You can learn more about our local offerings and how we tailor lessons to each child's needs by visiting our website<a href="https://volzpiano.com/"> here</a>.</p>

<h3 class="wp-block-heading"><strong>Best Online Piano Lessons for Kids</strong></h3>

<p>For families preferring the convenience of learning from home, Volz Piano offers the best online piano lessons for kids. Our virtual lessons are designed to make learning fun and effective, utilizing innovative teaching methods that capture children's attention and imagination. These online options provide flexibility and ease of access, making it simpler to integrate music education into your child’s routine, regardless of your geographical location.</p>

<h3 class="wp-block-heading"><strong>Piano Lessons for Kids at Home: A Flexible Solution</strong></h3>

<p>In today’s fast-paced world, finding time for extracurricular activities can be a challenge. That's why our piano lessons for kids at home are structured to deliver the highest quality education in the comfort of your own home. Whether you opt for in-person visits or online instruction, Volz Piano ensures that every lesson is crafted to meet the unique needs of your child.</p>

<h3 class="wp-block-heading"><strong>Beginner Piano Lessons for Kids in Salt Lake City</strong></h3>

<p>Starting piano lessons at a young age helps children establish strong musical foundations. Our beginner piano lessons for kids in Salt Lake City are perfect for those just starting out. At Volz Piano, we focus on creating a supportive environment that encourages curiosity and a love for music. Each session is tailored to help young learners grasp the basics at their own pace, fostering a rewarding and positive experience.</p>

<h3 class="wp-block-heading"><strong>Cost-Effective Learning</strong></h3>

<p>At Volz Piano, we believe that every child deserves the chance to learn music, which is why we offer cost-effective solutions for families. Our pricing structures are designed to accommodate different budgets while maintaining the highest standards of teaching. This makes piano lessons for kids an affordable and valuable part of their education.</p>

<h3 class="wp-block-heading"><strong>Conclusion</strong></h3>

<p>Piano lessons for kids in Utah are more than just an extracurricular activity. They are an investment in your child’s future, equipping them with skills and experiences that last a lifetime. At Volz Piano, we are committed to providing the best piano lessons for kids, whether they are just beginning their musical journey or looking to advance their skills. Contact us today to learn how we can help unlock your child’s musical potential.</p>

<p>For those in Salt Lake City and beyond, remember that the key to your child’s musical success could be just around the corner. Start your journey with Volz Piano, where music and learning come to life.</p>`;

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
            Unlocking Musical Potential: Piano Lessons for Kids in Utah
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            May 08, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/unlocking-musical-potential-piano-lessons-for-kids-in-utah.jpg"
              alt="Featured image for Unlocking Musical Potential: Piano Lessons for Kids in Utah"
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
