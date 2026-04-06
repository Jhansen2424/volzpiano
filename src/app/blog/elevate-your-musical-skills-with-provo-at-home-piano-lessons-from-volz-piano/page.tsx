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

  const content = `<span style="font-weight: 400;">Learning to play the piano has never been more convenient with Provo at home Piano Lessons offered by Volz Piano. Whether you're a beginner, an adult returning to the piano, or a parent looking for lessons for your child, our tailored instruction at your doorstep ensures you receive the best possible education without the hassle of commuting.</span>
<h2><b>Why Choose Provo At Home Piano Lessons?</b></h2>
<h3><b>Personalized Instruction in the Comfort of Your Home</b></h3>
<span style="font-weight: 400;">Provo at home Piano Lessons provide the ultimate convenience, allowing you to learn in the comfort of your own home. This personalized approach ensures that each lesson is tailored to your individual needs and goals, making learning more effective and enjoyable.</span>
<h3><b>Flexibility and Convenience</b></h3>
<span style="font-weight: 400;">With at-home piano lessons in Provo, you have the flexibility to schedule classes at times that suit your busy lifestyle. Whether you’re a working professional, a busy parent, or a student with a tight schedule, our flexible lesson times make it easy to fit piano learning into your routine.</span>
<h2><b>At Home Piano Lessons Provo: Perfect for All Ages</b></h2>
<h3><b>Piano Lessons at Home for Kids</b></h3>
<span style="font-weight: 400;">Introducing children to music at a young age can have lasting benefits. Our Provo home Piano Lessons for kids are designed to be engaging and fun, fostering a love for music while building a strong foundation in piano skills. Our teachers use a variety of methods to keep young learners motivated and excited about their lessons.</span>
<h3><b>Piano Lessons Provo Adult</b></h3>
<span style="font-weight: 400;">It's never too late to start or return to piano learning. Our Provo home Piano Lessons for adults cater to all skill levels, from beginners to those looking to refine their technique. Our patient and experienced teachers provide a supportive learning environment, helping adults achieve their musical goals.</span>
<h2><b>The Benefits of Provo At-Home Piano Lessons</b></h2>
<h3><b>Focused Learning Environment</b></h3>
<span style="font-weight: 400;">Learning at home can be more comfortable and less distracting than in a traditional classroom setting. Our Provo home Piano Lessons allow students to focus entirely on their learning, making each lesson more productive.</span>
<h3><b>Cost-Effective Learning</b></h3>
<span style="font-weight: 400;">At-home piano lessons in Provo can also be more cost-effective. You save on travel expenses and time, allowing you to invest more in your education. For detailed information on the cost of our at-home piano lessons, please</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">visit our website</span></a><span style="font-weight: 400;">.</span>
<h3><b>Finding Piano Lessons At Home Near Provo</b></h3>
<span style="font-weight: 400;">If you're searching for "piano lessons at home near Provo," Volz Piano is your go-to source. Our network of experienced teachers is ready to bring high-quality piano instruction directly to your home, ensuring that you or your child receive the best possible education.</span>
<h3><b>External Learning Resources</b></h3>
<span style="font-weight: 400;">To supplement your Provo at-home Piano Lessons, we recommend exploring</span><a href="https://www.pianoeducation.org/"> <span style="font-weight: 400;">Piano Education</span></a><span style="font-weight: 400;">, a valuable resource that offers tutorials and guidance for piano students of all levels.</span>
<h2><b>Start Your Musical Journey with Volz Piano</b></h2>
<span style="font-weight: 400;">Are you ready to take the next step in your musical journey with Provo at Home Piano Lessons? Contact Volz Piano today to schedule your first lesson. Our dedicated teachers are eager to help you achieve your musical dreams.</span>

<span style="font-weight: 400;">For more information and to get started,</span><a href="https://volzpiano.com/"> <span style="font-weight: 400;">visit our website</span></a><span style="font-weight: 400;"> and explore our range of lesson offerings. We look forward to making beautiful music with you in the comfort of your own home!</span>`;

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
            Elevate Your Musical Skills with Provo At Home Piano Lessons from Volz Piano
          </h1>
          <p
            className="mt-4 text-white/50 text-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease-out 0.5s",
            }}
          >
            June 22, 2024
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Featured Image */}
      <div className="relative mx-auto max-w-4xl px-6 -mt-12 z-10 sm:px-12">
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/blog-images/elevate-your-musical-skills-with-provo-at-home-piano-lessons-from-volz-piano.jpg"
              alt="Featured image for Elevate Your Musical Skills with Provo At Home Piano Lessons from Volz Piano"
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
