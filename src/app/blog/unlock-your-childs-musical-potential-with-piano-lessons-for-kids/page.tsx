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

  const content = `<span style="font-weight: 400;">As a parent, you want the best for your child, and fostering a love for music can be one of the most rewarding gifts you can offer. Piano lessons for kids not only instill a lifelong appreciation for music but also enhance cognitive abilities, improve coordination, and boost self-confidence. At Volz Piano, we understand the unique needs of young learners and provide tailored piano lessons for kids to help them thrive.</span>
<h4><b>Why Choose Piano Lessons for Kids?</b></h4>
<span style="font-weight: 400;">Piano lessons for kids offer numerous benefits, including:</span>
<ol>
 	<li style="font-weight: 400;" aria-level="1"><b>Cognitive Development</b><span style="font-weight: 400;">: Learning to play the piano enhances memory, attention, and problem-solving skills.</span></li>
 	<li style="font-weight: 400;" aria-level="1"><b>Emotional Growth</b><span style="font-weight: 400;">: Music helps children express their emotions and develop empathy.</span></li>
 	<li style="font-weight: 400;" aria-level="1"><b>Physical Coordination</b><span style="font-weight: 400;">: Playing the piano improves hand-eye coordination and fine motor skills.</span></li>
 	<li style="font-weight: 400;" aria-level="1"><b>Discipline and Patience</b><span style="font-weight: 400;">: Regular practice teaches discipline and the value of perseverance.</span></li>
</ol>
<h4><b>Finding the Best Piano Lessons for Kids Near Me</b></h4>
<span style="font-weight: 400;">When searching for "piano lessons for kids near me," it's crucial to consider factors such as the instructor's experience, teaching style, and the learning environment. At Volz Piano, our instructors are not only skilled musicians but also passionate educators who create a fun and supportive atmosphere for children.</span>
<h4><b>Beginner Piano Lessons for Kids: Setting the Foundation</b></h4>
<span style="font-weight: 400;">Our beginner piano lessons for kids are designed to make learning enjoyable and accessible. We start with the basics, ensuring that each child grasps fundamental concepts before moving on to more complex pieces. This approach builds confidence and encourages a love for music from an early age.</span>
<h4><b>The Best Online Piano Lessons for Kids</b></h4>
<span style="font-weight: 400;">In today’s digital age, online piano lessons for kids have become increasingly popular. They offer the flexibility to learn from home without compromising on quality. At Volz Piano, we provide some of the best online piano lessons for kids, combining interactive technology with expert instruction to create an engaging learning experience.</span>
<h4><b>The Benefits of Piano Lessons for Kids at Home</b></h4>
<span style="font-weight: 400;">Many parents prefer piano lessons for kids at home for the convenience and comfort it provides. Home lessons eliminate travel time and allow children to learn in a familiar environment. Our experienced instructors are available for in-home lessons, bringing the same level of dedication and expertise to your doorstep.</span>
<h4><b>Piano Lessons for Kids in Salt Lake City</b></h4>
<span style="font-weight: 400;">For families residing in Salt Lake City, Volz Piano offers local piano lessons for kids tailored to meet the needs of the community. Our Salt Lake City teachers are equipped with high-quality instruments and a welcoming environment that inspires young musicians.</span>
<h4><b>Affordable Piano Lessons for Kids</b></h4>
<span style="font-weight: 400;">One common concern among parents is the cost of piano lessons for kids. At Volz Piano, we strive to make music education accessible to all families. We offer competitive pricing and flexible payment plans to accommodate different budgets without compromising on the quality of instruction.</span>
<h4><b>Enroll Your Child Today!</b></h4>
<span style="font-weight: 400;">Investing in piano lessons for kids is investing in their future. Whether you’re looking for beginner piano lessons for kids or the best online piano lessons for kids, Volz Piano is here to support your child’s musical journey. Discover the benefits of piano lessons for kids and watch your child grow into a confident, skilled musician.</span>

<span style="font-weight: 400;">For more information on our programs, visit our</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;"> or contact us today. You can also learn more about the cognitive benefits of music education from this study.</span>

<span style="font-weight: 400;">Unlock your child's musical potential with Volz Piano – where learning meets fun!</span>`;

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
            Unlock Your Child&apos;s Musical Potential with Piano Lessons for Kids
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            July 10, 2024
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
