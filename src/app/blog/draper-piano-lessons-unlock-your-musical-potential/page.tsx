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

  const content = `<span style="font-weight: 400;">If you’re searching for high-quality piano lessons in Draper, Utah, you’re in the right place. Draper Piano Lessons offer personalized instruction tailored to students of all ages and skill levels. Whether you’re a beginner or looking to refine your technique, there’s a program that will meet your needs.</span>
<h2><b>Why Choose Draper Piano Lessons?</b></h2>
<span style="font-weight: 400;">Draper Piano Lessons are designed to provide students with a comprehensive musical education. With a focus on both technique and musicality, these lessons help students build a strong foundation while nurturing their passion for music. Whether you’re interested in piano lessons in Draper and Lehi or specifically seeking Draper piano lessons at Old School Draper, there are plenty of options available to suit your schedule and learning style.</span>
<h3><b>Local Expertise and Convenience</b></h3>
<span style="font-weight: 400;">One of the key benefits of choosing piano Lessons is the convenience of having experienced instructors nearby. Whether you’re searching for “piano lessons near me” or looking for specific programs like Draper UT piano lessons, you’ll find a variety of options right in your community. This local focus ensures that students receive personalized attention, making it easier to progress and achieve their musical goals.</span>
<h3><b>Draper Piano Lessons for Beginners</b></h3>
<span style="font-weight: 400;">For beginners, piano Lessons offer an excellent starting point. With a patient and supportive approach, teachers help students develop basic skills and confidence at their own pace. If you’re new to piano, these lessons provide a solid foundation that will prepare you for more advanced studies in the future.</span>

<span style="font-weight: 400;">The cost of Draper Piano Lessons is competitive, making them accessible to a wide range of students. Whether you’re interested in piano lessons Draper Utah or looking for options that include piano lessons in Draper and Lehi, you’ll find that local teachers offer affordable rates without compromising on quality. For more information on the average cost of piano lessons, you can visit this helpful guide.</span>
<h3><b>Diverse Learning Options</b></h3>
<span style="font-weight: 400;">Draper Piano Lessons cater to a variety of needs, from beginners to advanced students. For those looking for more traditional instruction, Draper piano lessons at Old School Draper offer a unique setting that combines classic teaching methods with modern conveniences. This blend of old and new provides a well-rounded musical education that’s both enjoyable and effective.</span>

<span style="font-weight: 400;">Whether you’re interested in Draper piano lessons for beginners or looking for more advanced instruction, the variety of programs available ensures that there’s something for everyone. Teachers are skilled in working with students of all ages, providing a supportive environment that encourages growth and development.</span>
<h3><b>Draper Piano Lessons: A Community Focus</b></h3>
<span style="font-weight: 400;">Choosing Draper Piano Lessons means joining a community of music lovers who are passionate about learning and growth. Local teachers are committed to helping students achieve their goals, whether they’re just starting out or looking to refine their skills. With lessons tailored to individual needs, students receive the guidance and support they need to succeed.</span>
<h3><b>Conclusion: Start Your Musical Journey Today</b></h3>
<span style="font-weight: 400;">Volz Piano Lessons provide the perfect opportunity to explore your musical potential in a supportive and convenient setting. Whether you’re interested in piano lessons Draper Utah or looking for specific programs like Draper piano lessons at Old School Draper, you’ll find the instruction you need to succeed.</span>

<span style="font-weight: 400;">Ready to begin your journey? Visit our</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;"> to learn more about how Volz Piano can help you achieve your musical goals. With experienced instructors, flexible scheduling, and a commitment to excellence, Draper Piano Lessons are the perfect choice for aspiring musicians of all ages. Start today and discover the joy of making music!</span>`;

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
            Draper Piano Lessons: Unlock Your Musical Potential
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            August 26, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/draper-piano-lessons-unlock-your-musical-potential.jpg"
              alt="Featured image for Draper Piano Lessons: Unlock Your Musical Potential"
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
