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

  const content = `<span style="font-weight: 400;">Learning to play the piano is a rewarding and enriching experience for both kids and adults. At Volz Piano, we understand the value of convenience and personalized instruction, which is why we offer Provo at home piano lessons. Our dedicated instructors come to your home, making it easier than ever to fit piano lessons into your busy schedule.</span>
<h4><b>Why Choose Provo At Home Piano Lessons?</b></h4>
<span style="font-weight: 400;">Provo at home piano lessons provide numerous benefits for students of all ages:</span>
<ol>
 	<li style="font-weight: 400;" aria-level="1"><b>Personalized Attention</b><span style="font-weight: 400;">: One-on-one instruction allows for a customized learning experience tailored to your individual needs and goals.</span></li>
 	<li style="font-weight: 400;" aria-level="1"><b>Comfort and Convenience</b><span style="font-weight: 400;">: Learning in the comfort of your home eliminates the need for travel and creates a familiar environment conducive to effective learning.</span></li>
 	<li style="font-weight: 400;" aria-level="1"><b>Flexible Scheduling</b><span style="font-weight: 400;">: With Provo at home piano lessons, you can schedule lessons at times that work best for you and your family.</span></li>
</ol>
<h4><b>At Home Piano Lessons Provo: Perfect for All Ages</b></h4>
<span style="font-weight: 400;">Whether you’re looking for piano lessons for your child or yourself, Volz Piano offers at home piano lessons in Provo that cater to all age groups and skill levels. Our experienced instructors use a variety of teaching methods to keep lessons engaging and fun, ensuring that students remain motivated and excited about learning.</span>
<h4><b>Piano Lessons at Home Provo Utah: A Customized Approach</b></h4>
<span style="font-weight: 400;">Our piano lessons at home in Provo, Utah, are designed to meet the unique needs of each student. We understand that every learner is different, which is why we tailor our lessons to match your pace and interests. From beginners to advanced students, our instructors provide the guidance and support needed to achieve musical success.</span>
<h4><b>Piano Lessons at Home Near Provo: Convenient and Effective</b></h4>
<span style="font-weight: 400;">For those searching for “piano lessons at home near Provo,” Volz Piano is your best choice. Our instructors are not only skilled musicians but also passionate educators who are dedicated to helping students thrive. By bringing piano lessons to your home, we make it easier to integrate music education into your daily life.</span>
<h4><b>Provo At Home Piano Lessons for Adults</b></h4>
<span style="font-weight: 400;">At Volz Piano, we believe it’s never too late to start learning the piano. Our Provo at home piano lessons for adults are perfect for those looking to begin or resume their musical journey. Whether you’re a complete beginner or looking to refine your skills, our personalized instruction will help you reach your goals.</span>
<h4><b>The Benefits of At Home Piano Lessons Provo</b></h4>
<span style="font-weight: 400;">Taking Provo at home piano lessons offers several advantages:</span>
<ul>
 	<li style="font-weight: 400;" aria-level="1"><b>Improved Learning Environment</b><span style="font-weight: 400;">: Learning in your own home can reduce distractions and create a more focused learning environment.</span></li>
 	<li style="font-weight: 400;" aria-level="1"><b>Individualized Curriculum</b><span style="font-weight: 400;">: Lessons are tailored to your specific needs, ensuring that you progress at a comfortable and effective pace.</span></li>
 	<li style="font-weight: 400;" aria-level="1"><b>Enhanced Motivation</b><span style="font-weight: 400;">: The convenience of at home lessons can help maintain motivation and consistency in practice.</span></li>
</ul>
<h4><b>Enroll in Provo At Home Piano Lessons Today!</b></h4>
<span style="font-weight: 400;">Investing in Provo at home piano lessons is a fantastic way to enrich your life with the joy of music. Whether you’re interested in piano lessons at home for your child or yourself, Volz Piano is here to provide top-quality instruction that fits your needs.</span>

<span style="font-weight: 400;">For more information on our Provo at home piano lessons and to schedule a consultation, visit our</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;"> or contact us today. Additionally, learn more about the benefits of music education from this informative resource.</span>

<span style="font-weight: 400;">Experience the convenience and personalized instruction of Provo at home piano lessons with Volz Piano – where learning meets comfort!</span>`;

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
            Discover the Convenience of Provo At Home Piano Lessons with Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            July 19, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/discover-the-convenience-of-provo-at-home-piano-lessons-with-volz-piano.jpeg"
              alt="Featured image for Discover the Convenience of Provo At Home Piano Lessons with Volz Piano"
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
