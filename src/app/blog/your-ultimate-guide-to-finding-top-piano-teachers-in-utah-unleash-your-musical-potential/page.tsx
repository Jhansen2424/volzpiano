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

  const content = `<p>Are you eager to learn or improve your piano skills in Utah? Finding the right piano teacher is pivotal to nurturing your musical journey. In this comprehensive guide, we'll explore the finest piano teachers across various Utah locations, ensuring you find the perfect match to enhance your musical talents.</p>

<h2 class="wp-block-heading"><strong>Understanding the Importance of Exceptional Piano Instruction</strong></h2>

<p>Mastering the piano requires guidance from skilled and dedicated teachers. Whether you're a beginner or aiming to refine your expertise, the guidance of a proficient instructor significantly impacts your progress and passion for music.</p>

<h3 class="wp-block-heading"><strong>Piano Teachers in Utah</strong></h3>

<p>Finding exceptional piano teachers in Utah is a rewarding endeavor. Here's how to navigate your search:</p>

<ul>
<li>Best Piano Teachers in Utah: Seek instructors known for their expertise, passion, and ability to cater to diverse learning styles.</li>

<li>Location-Specific Search: Explore piano teachers in specific areas like Bountiful, Farmington, Davis County, Draper, and Herriman to find one conveniently situated for you.</li>
</ul>

<h3 class="wp-block-heading"><strong>Finding Your Ideal Instructor</strong></h3>

<h4 class="wp-block-heading">Discovering the Best Piano Teachers in Utah: A Comprehensive Overview</h4>

<p>Explore a list of the best piano teachers in Utah, assessing their qualifications, teaching styles, and specialties to find the perfect fit for your musical aspirations.</p>

<h4 class="wp-block-heading">Piano Teachers Near Me: Convenient Learning Opportunities</h4>

<p>Searching for piano teachers in Bountiful, Farmington, or other Utah locations ensures convenient access to quality instruction. Consider proximity for ease of travel.</p>

<h4 class="wp-block-heading">Online Piano Teachers: Embracing Digital Learning</h4>

<p>For flexibility or if you reside in remote areas, consider online piano teachers in Utah. Embrace virtual lessons that cater to your schedule and location.</p>

<h4 class="wp-block-heading">Piano Teachers for Adults: Tailored Learning Experiences</h4>

<p>Adult learners seeking piano instruction in Utah benefit from instructors specializing in adult learning methodologies, adapting lessons to suit individual needs.</p>

<h3 class="wp-block-heading"><strong>Additional Factors to Consider</strong></h3>

<p>In addition to the primary and long tail keywords, consider these additional factors when selecting a piano teacher:</p>

<ul>
<li>Cost of Piano Lessons: Assess various instructors' pricing structures to find a balance between quality instruction and affordability.</li>

<li>Near Me Convenience: Opt for instructors located nearby for easier commute and potentially more frequent lessons.</li>

<li>Online Instruction Benefits: Explore the advantages of online lessons, such as flexibility in scheduling and the ability to learn from renowned teachers regardless of location.</li>

<li>Tailored Instruction for Adults: Seek instructors who specialize in teaching adults, offering tailored lessons catering to their specific needs and goals.</li>
</ul>

<h2 class="wp-block-heading"><strong>Choosing Your Ideal Piano Teacher in Utah</strong></h2>

<p>Selecting the right piano teacher is a pivotal step in your musical journey. Consider factors like expertise, location, teaching style, and specialization to ensure a fulfilling learning experience.</p>`;

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
            Your Ultimate Guide to Finding Top Piano Teachers in Utah: Unleash Your Musical Potential
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            December 20, 2023
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/your-ultimate-guide-to-finding-top-piano-teachers-in-utah-unleash-your-musical-potential.jpg"
              alt="Featured image for Your Ultimate Guide to Finding Top Piano Teachers in Utah: Unleash Your Musical Potential"
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
