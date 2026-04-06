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

  const content = `<p>Unlocking a child's musical potential begins with the right foundation, and at Volz Piano, we are dedicated to providing piano lessons for kids that foster love, discipline, and creativity through music. Our piano lessons for kids in Utah are designed to cater to young musicians at any stage of their journey, from complete beginners to more advanced students.</p>

<h2 class="wp-block-heading"><strong>Cultivating Young Talent: Piano Lessons for Kids</strong></h2>

<p>At Volz Piano, we believe that every child has the potential to create beautiful music. Our piano lessons for kids are tailored to harness this potential by providing an engaging and supportive learning environment. Whether you're looking for private piano lessons for kids or piano lessons for beginners kids, our experienced teachers are equipped to inspire and guide your child through their musical journey.</p>

<h3 class="wp-block-heading"><strong>The Perfect Start: Piano Lessons for Beginners Kids</strong></h3>

<p>Starting on the right note is crucial for young learners. Our piano lessons for beginners kids are designed to introduce the fundamentals of music and piano playing in a fun and accessible way. By focusing on the basics, we ensure that children build a solid foundation that will serve them throughout their musical lives.</p>

<h3 class="wp-block-heading"><strong>Private Piano Lessons for Kids: Personalized Learning</strong></h3>

<p>We understand that every child learns differently, which is why we offer private piano lessons for kids. These one-on-one sessions allow our teachers to tailor the lessons to your child's individual needs, ensuring that they progress at their own pace and in a way that best suits their learning style.</p>

<h3 class="wp-block-heading"><strong>Best Piano Lessons for Kids: Quality and Excellence</strong></h3>

<p>Finding the best piano lessons for kids is a priority for many parents. At Volz Piano, our commitment to excellence in music education means that your child will receive the highest quality instruction. Our lessons are designed not just to teach piano skills, but also to instill a lifelong passion for music.</p>

<h3 class="wp-block-heading"><strong>Convenience and Accessibility: Piano Lessons Near Me for Kids</strong></h3>

<p>For many families, finding piano lessons near me for kids is essential. Volz Piano serves communities across Utah, making it easy to find top-quality piano lessons close to home. Whether you're in a bustling city or a quiet suburb, we strive to make music education accessible to all.</p>

<h3 class="wp-block-heading"><strong>Home Comfort: Piano Lessons for Kids at Home</strong></h3>

<p>In today's busy world, flexibility is key. That's why we offer piano lessons for kids at home, allowing your child to learn in the most comfortable and convenient setting. These at-home lessons provide the same high-quality instruction as our in-studio classes, with the added benefit of fitting seamlessly into your family's schedule.</p>

<h4 class="wp-block-heading">Understanding the Investment: Cost of Piano Lessons for Kids</h4>

<p>Investing in your child's musical education is an important decision. At Volz Piano, we offer transparent pricing for our piano lessons for kids, ensuring that you understand the cost and value of the lessons. Our goal is to make high-quality music education affordable for families across Utah. For more details on our pricing, please visit<a href="https://volzpiano.com/"> Volz Piano</a>.</p>

<h3 class="wp-block-heading"><strong>Embark on a Musical Adventure with Volz Piano</strong></h3>

<p>Piano lessons for kids in Utah with Volz Piano are more than just music classes; they are a journey into the heart of creativity and expression. By choosing Volz Piano, you're providing your child with the opportunity to learn, grow, and thrive through music.</p>

<p>For additional resources on the benefits of music education for children, the<a href="https://nafme.org/"> National Association for Music Education</a> offers insights into how music can enrich your child's life and development. This external resource complements the hands-on learning experience provided by Volz Piano, enhancing the overall educational journey.Ready to introduce your child to the wonderful world of music? Visit<a href="https://volzpiano.com/"> Volz Piano</a> today to learn more about our piano lessons for kids in Utah. Let us help your child discover the joy of music and the rewards of persistence and dedication. With Volz Piano, the possibilities are endless.</p>`;

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
            Piano Lessons for Kids in Utah: A Musical Journey with Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            March 11, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/piano-lessons-for-kids-in-utah-a-musical-journey-with-volz-piano.png"
              alt="Featured image for Piano Lessons for Kids in Utah: A Musical Journey with Volz Piano"
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
