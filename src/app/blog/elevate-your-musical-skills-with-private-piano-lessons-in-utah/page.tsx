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

  const content = `<p>At Volz Piano, we are dedicated to delivering exceptional private piano lessons across Utah, tailored to each student's unique needs and goals. Whether you are a beginner or an advanced pianist, our comprehensive private piano lessons provide the perfect setting for enhancing your musical talents.</p>

<h2 class="wp-block-heading"><strong>Discover the Benefits of Private Piano Lessons</strong></h2>

<p>Private piano lessons offer a focused learning environment where students can progress at their own pace under the guidance of an experienced piano teacher. This individualized approach ensures that each lesson is optimized for the student’s learning style and objectives. From young children to adults, private piano lessons cater to all age groups and skill levels.</p>

<h3 class="wp-block-heading"><strong>Private Piano Lessons for Adults Near Me</strong></h3>

<p>For adults, finding private piano lessons for adults near me can be a game-changer. Whether you're revisiting the piano after years or starting fresh, private lessons cater to your schedule and learning style. Many adults find that private piano lessons reignite their passion for music, providing a rewarding and fulfilling hobby.</p>

<h3 class="wp-block-heading"><strong>In-Home Private Piano Lessons</strong></h3>

<p>We understand that convenience is key. That's why we offer in-home private piano lessons, allowing you to learn in the comfortable and familiar surroundings of your own home. This option saves time and reduces the hassle of traveling, making it easier to fit music education into your busy schedule. For those looking for "private in home piano lessons near me," Volz Piano ensures you receive top-tier music education right at your doorstep.</p>

<h3 class="wp-block-heading"><strong>The Cost of Private Piano Lessons</strong></h3>

<p>One common inquiry we receive is about the average cost of private piano lessons. While the cost can vary based on lesson length, teacher expertise, and frequency, Volz Piano is committed to providing transparent and competitive pricing. For detailed information on the costs associated with our private piano lessons, please visit our rates section on our<a href="https://volzpiano.com/"> website</a>.</p>

<h3 class="wp-block-heading"><strong>Choosing the Right Private Lessons Piano Teacher</strong></h3>

<p>The success of private piano lessons often hinges on the relationship between student and teacher. At Volz Piano, we pride ourselves on our team of skilled instructors who are not only talented musicians but also passionate educators. They are adept at creating a supportive and positive learning environment that encourages students to thrive.</p>

<h3 class="wp-block-heading"><strong>Why Choose Volz Piano for Your Private Piano Lessons?</strong></h3>

<p>Opting for private piano lessons at Volz Piano means choosing a path of musical excellence. Our tailored approach ensures that every student receives:</p>

<ul>
<li>Personalized attention and curriculum tailored to individual learning needs.</li>

<li>Flexible scheduling to accommodate your lifestyle.</li>

<li>Access to experienced and compassionate teachers who specialize in a variety of musical genres.</li>
</ul>

<p>Moreover, engaging in private piano lessons has been shown to offer numerous cognitive and emotional benefits, including enhanced memory, improved time management skills, and increased self-expression (<a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5438752/">source</a>).</p>

<h3 class="wp-block-heading"><strong>Ready to Begin?</strong></h3>

<p>If you’re ready to start your journey with private piano lessons in Utah, or if you’re searching for "private lessons piano teacher near me," look no further than Volz Piano. Contact us today to learn more about our private piano lessons and how we can help elevate your musical abilities.</p>

<p>Experience the joy and fulfillment of music with Volz Piano’s private piano lessons in Utah, where we bring the art of piano directly to you, personalized and profound.</p>`;

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
            Elevate Your Musical Skills with Private Piano Lessons in Utah
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            May 13, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

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
