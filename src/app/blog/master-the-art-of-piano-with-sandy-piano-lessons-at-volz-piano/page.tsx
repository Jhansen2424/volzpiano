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

  const content = `<p>At Volz Piano, we're dedicated to providing exceptional Sandy Piano Lessons to musicians of all ages and abilities. Located in the beautiful state of Utah, our school is a hub for aspiring pianists and seasoned performers alike, offering a range of lessons that cater to everyone's needs. Whether you're seeking to explore piano lessons in Sandy, Utah, or looking for specialized instruction like piano lessons Sandy Moser offers, we have you covered.</p>

<h2 class="wp-block-heading"><strong>Why Opt for Sandy Piano Lessons at Volz Piano?</strong></h2>

<p>Choosing the right place for your musical education is crucial. Here’s why our Sandy Piano Lessons stand out:</p>

<p><strong>Tailored Learning Experience:</strong> Recognizing that every student has unique aspirations, our piano lessons near Sandy are customized to match your personal goals, ensuring a rewarding and enriching learning journey.</p>

<p><strong>Qualified Teachers:</strong> Our faculty, including notable instructors like Sandy Moser, are seasoned musicians and educators. Their expertise and passion for teaching make every lesson both informative and inspiring.</p>

<p><strong>Affordable Quality:</strong> We believe in making high-quality music education accessible. The cost of our Sandy Piano Lessons is competitive, offering great value without compromising on the excellence of instruction.</p>

<h2 class="wp-block-heading"><strong>Discover Our Diverse Programs</strong></h2>

<p>Volz Piano is proud to offer a broad spectrum of musical styles and teaching methods. Whether you're interested in piano lessons Sandy Springs for jazz enthusiasts or classical training in Sandy, Oregon, our programs are designed to meet your needs.</p>

<p>Our curriculum not only focuses on piano technique and theory but also emphasizes performance skills, creativity, and musical expression. For those looking for highly personalized instruction, our piano lessons Sandy Moser and other private lessons provide one-on-one coaching tailored to your specific interests and goals.</p>

<h2 class="wp-block-heading"><strong>A Community of Music Lovers</strong></h2>

<p>Joining the Volz Piano family means more than just attending classes. It's about becoming part of a community that shares your passion for music. Our school offers numerous opportunities for performance, collaboration, and social interaction, making your learning experience even more enriching and enjoyable.</p>

<h2 class="wp-block-heading"><strong>Begin Your Musical Journey with Volz Piano</strong></h2>

<p>Eager to start your piano adventure? Learn more about our Sandy Piano Lessons by visiting our website at<a href="https://volzpiano.com/"> Volz Piano</a>. Here, you'll find comprehensive information about our programs, faculty, and how to enroll.</p>

<p>For additional insights into the benefits of music education, check out this informative article from<a href="https://www.musiceducationbenefits.com/"> MusicEducationBenefits</a>. It sheds light on how learning an instrument can positively impact cognitive development, emotional well-being, and social skills.</p>

<p>At Volz Piano, we're excited to be a part of your musical journey. Whether you're searching for piano lessons in Sandy, Utah, or interested in exploring piano lessons Sandy Oregon offers, our doors are open to all. Contact us today to discover how you can join our vibrant community and take your musical talents to new heights. Let's create beautiful music together!</p>`;

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
            Master the Art of Piano with Sandy Piano Lessons at Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            March 22, 2024
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
