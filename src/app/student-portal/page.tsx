"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentPortalPage() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-zinc-900 pt-24">
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
            Student <span className="text-brand">Portal</span>
          </h1>
          <p
            className="mt-6 mx-auto max-w-2xl text-lg text-white/60 sm:text-xl"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease-out 0.5s",
            }}
          >
            Access your lesson materials, track progress, and stay connected
            with your instructor.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Portal Content */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-6 sm:px-12 text-center">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-12 shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand/10">
              <svg
                className="h-10 w-10 text-brand"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-extrabold text-zinc-900">
              Welcome Back!
            </h2>
            <p className="mt-3 text-zinc-500 leading-relaxed">
              The student portal is coming soon. In the meantime, please reach
              out to your instructor directly for lesson materials and
              scheduling.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/schedule-call"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-brand-hover hover:-translate-y-0.5"
              >
                Schedule a Call
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-zinc-200 px-8 py-4 text-base font-bold text-zinc-700 transition-all duration-200 hover:border-brand hover:text-brand hover:-translate-y-0.5"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
