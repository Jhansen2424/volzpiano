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

  const content = `<span style="font-weight: 400;">At Volz Piano, we pride ourselves on offering top-quality piano lessons in Utah that cater to students of all ages and skill levels. Whether you’re a beginner or an advanced player, our personalized approach ensures that you receive the best possible music education.</span>
<h4><b>Why Choose Piano Lessons in Utah?</b></h4>
<span style="font-weight: 400;">Utah boasts a vibrant musical community, making it an ideal place to embark on your piano learning journey. With Volz Piano, you can benefit from:</span>
<ol>
 	<li style="font-weight: 400;" aria-level="1"><b>Experienced Instructors</b><span style="font-weight: 400;">: Our teachers are highly skilled and passionate about music education.</span></li>
 	<li style="font-weight: 400;" aria-level="1"><b>Personalized Lessons</b><span style="font-weight: 400;">: We tailor each lesson to the individual needs and goals of our students.</span></li>
 	<li style="font-weight: 400;" aria-level="1"><b>Convenient Locations</b><span style="font-weight: 400;">: We offer piano lessons in various locations across Utah, including Salt Lake City, Ogden, Orem, Sandy, and South Jordan.</span></li>
</ol>
<h4><b>Piano Lessons in Salt Lake City, Utah</b></h4>
<span style="font-weight: 400;">For those living in or near Salt Lake City, our piano lessons Utah program offers comprehensive instruction in a supportive and encouraging environment. Whether you're looking for lessons for kids or adults, our instructors are dedicated to helping you achieve your musical goals.</span>
<h4><b>Piano Lessons in Ogden, Utah</b></h4>
<span style="font-weight: 400;">In Ogden, Volz Piano provides piano lessons that are perfect for beginners and advanced students alike. Our tailored approach ensures that each student receives the attention and guidance they need to succeed.</span>
<h4><b>Piano Lessons in Orem, Utah</b></h4>
<span style="font-weight: 400;">Residents of Orem can take advantage of our exceptional piano lessons Utah program. We offer a range of lessons that cater to all skill levels, making it easy to find the perfect fit for your musical journey.</span>
<h4><b>Piano Lessons in Sandy, Utah</b></h4>
<span style="font-weight: 400;">Our piano lessons in Sandy, Utah, are designed to help students develop their skills in a fun and engaging way. Whether you're a beginner or looking to advance your skills, our instructors are here to support you every step of the way.</span>
<h4><b>Piano Lessons in South Jordan, Utah</b></h4>
<span style="font-weight: 400;">For families in South Jordan, Volz Piano offers convenient and high-quality piano lessons Utah. Our lessons are ideal for kids and adults, providing a solid foundation in piano playing and music theory.</span>
<h4><b>The Benefits of Piano Lessons in Utah</b></h4>
<span style="font-weight: 400;">Taking piano lessons in Utah with Volz Piano offers numerous benefits, including:</span>
<ul>
 	<li style="font-weight: 400;" aria-level="1"><b>Improved Cognitive Skills</b><span style="font-weight: 400;">: Learning to play the piano enhances memory, concentration, and problem-solving abilities.</span></li>
 	<li style="font-weight: 400;" aria-level="1"><b>Emotional Expression</b><span style="font-weight: 400;">: Playing music allows students to express their emotions and develop creativity.</span></li>
 	<li style="font-weight: 400;" aria-level="1"><b>Increased Discipline</b><span style="font-weight: 400;">: Regular practice instills discipline and perseverance, valuable skills that extend beyond music.</span></li>
</ul>
<h4><b>Finding Piano Lessons in Utah Near Me</b></h4>
<span style="font-weight: 400;">If you're searching for "piano lessons in Utah near me," Volz Piano has you covered. Our extensive network of instructors ensures that we can provide lessons in convenient locations throughout Utah. Visit our</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;"> to learn more about our programs and find the perfect instructor near you.</span>
<h4><b>Enroll in Piano Lessons Utah Today!</b></h4>
<span style="font-weight: 400;">Investing in piano lessons Utah is a wonderful way to enrich your life or your child’s life with the joy of music. At Volz Piano, we are committed to providing high-quality, personalized instruction that helps our students thrive. Whether you're looking for piano lessons in Salt Lake City, Ogden, Orem, Sandy, or South Jordan, we have the expertise and passion to guide you on your musical journey.</span>

<span style="font-weight: 400;">For more information on our piano lessons Utah program and to schedule a consultation, visit our</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;"> or contact us today. Additionally, discover the broader benefits of music education from this informative resource.</span>

<span style="font-weight: 400;">Join Volz Piano and unlock your musical potential with the best piano lessons Utah has to offer!</span>`;

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
            Discover Exceptional Piano Lessons in Utah with Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            July 18, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/discover-exceptional-piano-lessons-in-utah-with-volz-piano.jpg"
              alt="Featured image for Discover Exceptional Piano Lessons in Utah with Volz Piano"
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
