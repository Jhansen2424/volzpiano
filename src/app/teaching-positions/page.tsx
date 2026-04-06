"use client";

import { useEffect, useRef, useState } from "react";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeiYwH4ZX0-0hpnOf1nlrVFqLOXYim6GuzQu1Iq_05524850w/viewform";

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
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
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

const benefits = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Flexible Schedule",
    desc: "Set your own hours and teach when it works for you.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: "In-Home Lessons",
    desc: "Travel to students' homes — no studio overhead.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: "Training Provided",
    desc: "3-month training program in the Volz Method included.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Growing Student Base",
    desc: "We connect you with families across Utah who need lessons.",
  },
];

const positions = [
  {
    title: "Piano Instructor — Salt Lake County",
    type: "Part Time / Freelance",
    location: "Salt Lake County, UT",
  },
  {
    title: "Piano Instructor — Utah County",
    type: "Part Time / Freelance",
    location: "Utah County, UT",
  },
  {
    title: "Piano Instructor — Davis County",
    type: "Part Time / Freelance",
    location: "Davis County, UT",
  },
];

export default function TeachingPositionsPage() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-zinc-900 pt-24">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full opacity-15 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #6343d4 0%, transparent 70%)",
          }}
        />
        <div className="relative z-[2] text-center px-6">
          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease-out 0.2s",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            Teaching <span className="text-brand">Positions</span>
          </h1>
          <p
            className="mt-6 mx-auto max-w-2xl text-lg text-white/60 sm:text-xl"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease-out 0.5s",
            }}
          >
            Join our team of passionate piano instructors and make a difference
            in children&apos;s lives across Utah.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Benefits */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-12">
          <AnimatedSection>
            <h2 className="text-center text-3xl font-extrabold text-zinc-900 sm:text-4xl">
              Why Teach with <span className="text-brand">Volz Piano</span>?
            </h2>
          </AnimatedSection>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 0.1}>
                <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    {b.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-zinc-900">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-zinc-50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 sm:px-12">
          <AnimatedSection>
            <h2 className="text-center text-3xl font-extrabold text-zinc-900 sm:text-4xl">
              Open Positions
            </h2>
            <p className="mt-4 text-center text-zinc-500">
              We&apos;re always looking for talented piano instructors across
              Utah.
            </p>
          </AnimatedSection>

          <div className="mt-12 space-y-4">
            {positions.map((pos, i) => (
              <AnimatedSection key={pos.title} delay={i * 0.1}>
                <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900">
                      {pos.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-3">
                      <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
                        {pos.type}
                      </span>
                      <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-500">
                        {pos.location}
                      </span>
                    </div>
                  </div>
                  <a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-brand-hover hover:-translate-y-0.5 shrink-0"
                  >
                    Apply Now
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* General application CTA */}
          <AnimatedSection delay={0.3} className="mt-12 text-center">
            <p className="text-zinc-500">
              Don&apos;t see your area listed? We&apos;re expanding!
            </p>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-cta px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-cta-hover hover:-translate-y-0.5"
            >
              Teach with us! Click here
            </a>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
