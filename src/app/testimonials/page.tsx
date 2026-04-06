"use client";

import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════
   Reviews Data
   ═══════════════════════════════════════════ */
const reviews = [
  {
    name: "Alina Anderson",
    text: "Bonnie has been an incredible teacher! Her patience and ability to adapt for my daughters interests and strengths has helped her improve immensely! We are grateful to have such a kind and talented teacher!",
    timeAgo: "2 weeks ago",
    snippet: '"incredible teacher… helped her improve immensely!"',
  },
  {
    name: "Callie Curtis",
    text: "We have loved Volz Method Piano Lessons! Andrew has been an incredible teacher. He is very patient with our kids. He challenges them and they have improved very quickly with his help and encouragement. He is by far the best piano teacher we have had!",
    timeAgo: "4 weeks ago",
    snippet: '"by far the best piano teacher we have had!"',
  },
  {
    name: "Crosby Nnah",
    text: "Bence has been amazing to work with! He is so patient with all three of my kids, my youngest is 5! They have learned so quickly from him. Definitely recommend him as a piano teacher to all ages and levels.",
    timeAgo: "5 months ago",
    snippet: '"so patient with all three of my kids"',
  },
  {
    name: "Giancarlo Velasquez",
    text: "I have had Tanner as my teacher for year now, he has been great helping me understand the fundamentals. He has taught me a ton of things that I thought I'd never understand about piano. He is great with exercises and making sure you understand concepts.",
    timeAgo: "4 weeks ago",
    snippet: '"taught me things I thought I\'d never understand"',
  },
  {
    name: "Carly Child",
    text: "Volz method has been a great way for my two kids to learn the piano. Andrew is their teacher and he is so patient and great to work with! I've been impressed with how quickly they catch on!",
    timeAgo: "3 weeks ago",
    snippet: '"impressed with how quickly they catch on!"',
  },
  {
    name: "Youna Schenfeld",
    text: "Micheal was very patient and kind to my kid who was young with a short attention span. He was punctual and professional, and I would definitely take a lesson from him again if my child express her interest in learning piano.",
    timeAgo: "a month ago",
    snippet: '"very patient and kind… punctual and professional"',
  },
  {
    name: "Maggie Chittur",
    text: "Mason did a great job! He was prepared with fun games for my son to help him learn, and already got my husband really excited to practice what he learned. His adaptation of ages was impressive and effective.",
    timeAgo: "a month ago",
    snippet: '"prepared with fun games… impressive and effective"',
  },
  {
    name: "Tara Gray",
    text: "The teachers we had with Voltz was very thorough and taught beyond what's just in a lesson book. My child was challenged to get out of their comfort zone and which I appreciated and the teacher helped them excel. We really like the Voltz approach and strategies.",
    timeAgo: "2 months ago",
    snippet: '"taught beyond what\'s just in a lesson book"',
  },
  {
    name: "Camille Waller",
    text: "Jarus is awesome! He has inspired my boys to love piano and create their own music. The teaching style and approach is fantastic....it is tailored to my boys interests which helps increase their abilities. I knew my boys liked piano but I didn't expect them to love it and look forward to their lessons. Thank you!",
    timeAgo: "5 months ago",
    snippet: '"inspired my boys to love piano and create their own music"',
  },
  {
    name: "Rebecca Wagner",
    text: "Tanner is a fantastic piano teacher, so patient and great at connecting with our children. Highly recommend!",
    timeAgo: "4 months ago",
    snippet: '"fantastic… so patient and great at connecting"',
  },
  {
    name: "Audra Kujaczynski",
    text: "Andrew is amazing! He is great with Our daughter! He makes it fun for her as she progresses.",
    timeAgo: "4 weeks ago",
    snippet: '"He makes it fun for her as she progresses"',
  },
  {
    name: "MT",
    text: "I have had the best experience since starting my 12 year old son on Volz Piano Lessons. He is enjoying the learning style which was tailored to his preferred style. His teacher has been great to make a connection with him. My son has never enjoyed piano lessons but he's actually engaged. Thanks Volz and thanks to his teacher!",
    timeAgo: "a year ago",
    snippet: '"never enjoyed piano lessons but he\'s actually engaged"',
  },
];

/* ═══════════════════════════════════════════
   Floating Review Snippets (Hero Animation)
   ═══════════════════════════════════════════ */
const heroSnippets = reviews.map((r) => r.snippet);

// Pre-computed positions & timing for 18 floating snippets
const snippetConfigs = [
  { left: "3%", opacity: 0.3, duration: 22, delay: 0, drift: "20px", size: "text-xs" },
  { left: "15%", opacity: 0.35, duration: 26, delay: -4, drift: "-18px", size: "text-sm" },
  { left: "28%", opacity: 0.25, duration: 20, delay: -10, drift: "12px", size: "text-xs" },
  { left: "42%", opacity: 0.4, duration: 24, delay: -6, drift: "-25px", size: "text-sm" },
  { left: "58%", opacity: 0.3, duration: 28, delay: -14, drift: "22px", size: "text-xs" },
  { left: "72%", opacity: 0.35, duration: 22, delay: -2, drift: "-15px", size: "text-sm" },
  { left: "85%", opacity: 0.25, duration: 25, delay: -8, drift: "18px", size: "text-xs" },
  { left: "8%", opacity: 0.35, duration: 27, delay: -16, drift: "-20px", size: "text-sm" },
  { left: "22%", opacity: 0.3, duration: 21, delay: -12, drift: "14px", size: "text-xs" },
  { left: "35%", opacity: 0.4, duration: 23, delay: -18, drift: "-22px", size: "text-sm" },
  { left: "50%", opacity: 0.3, duration: 26, delay: -3, drift: "16px", size: "text-xs" },
  { left: "65%", opacity: 0.35, duration: 20, delay: -9, drift: "-12px", size: "text-sm" },
  { left: "78%", opacity: 0.25, duration: 24, delay: -15, drift: "20px", size: "text-xs" },
  { left: "92%", opacity: 0.3, duration: 22, delay: -7, drift: "-18px", size: "text-xs" },
  { left: "5%", opacity: 0.3, duration: 25, delay: -20, drift: "15px", size: "text-sm" },
  { left: "38%", opacity: 0.25, duration: 28, delay: -22, drift: "-14px", size: "text-xs" },
  { left: "55%", opacity: 0.35, duration: 21, delay: -11, drift: "22px", size: "text-sm" },
  { left: "80%", opacity: 0.3, duration: 23, delay: -5, drift: "-20px", size: "text-xs" },
];

function FloatingReviewsAnimation({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 1.2s ease-out" }}
    >
      {snippetConfigs.map((config, i) => (
        <div
          key={i}
          className={`absolute max-w-[220px] sm:max-w-[260px] rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm px-3 py-2 ${config.size} text-white/50 italic leading-snug`}
          style={{
            left: config.left,
            bottom: "-10%",
            ["--snippet-opacity" as string]: config.opacity,
            ["--snippet-drift" as string]: config.drift,
            animation: `floatSnippet ${config.duration}s linear ${config.delay}s infinite`,
          }}
        >
          {heroSnippets[i % heroSnippets.length]}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Review Card
   ═══════════════════════════════════════════ */
function ReviewCard({
  review,
  index,
}: {
  review: (typeof reviews)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="mb-5 break-inside-avoid rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease-out ${index * 0.06}s, transform 0.5s ease-out ${index * 0.06}s, box-shadow 0.3s ease`,
      }}
    >
      {/* Orange quote mark */}
      <span className="block text-4xl font-bold leading-none text-brand/30 select-none">
        {"\u201C"}
      </span>

      {/* Review text */}
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
        {review.text}
      </p>

      {/* Stars */}
      <div className="mt-4 flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="h-4 w-4 text-brand"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Name & time */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-bold text-zinc-900">{review.name}</span>
        <span className="text-xs text-zinc-400">{review.timeAgo}</span>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   Page
   ═══════════════════════════════════════════ */
export default function TestimonialsPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-zinc-900 pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 via-zinc-900/20 to-zinc-900 z-[1]" />
        <FloatingReviewsAnimation visible={visible} />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full opacity-15 blur-[120px] z-[1]"
          style={{
            background:
              "radial-gradient(circle, #6343d4 0%, transparent 70%)",
          }}
        />

        <div className="relative z-[2] text-center px-6">
          {/* Google rating badge */}
          <div
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-2.5"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.6s ease-out 0.1s",
            }}
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="h-5 w-5 text-brand"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-white/70">
              5.0 on Google
            </span>
          </div>

          <h1
            className="text-5xl font-extrabold text-white sm:text-6xl lg:text-7xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease-out 0.2s",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            What Families Are Saying
          </h1>
          <p
            className="mt-6 mx-auto max-w-2xl text-lg text-white/60 sm:text-xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease-out 0.5s",
            }}
          >
            Real reviews from real parents. See why families love the Volz
            Method.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* ── Reviews Masonry Grid ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {reviews.map((review, i) => (
              <ReviewCard key={i} review={review} index={i} />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
