"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const fadeUp = (delay: number) =>
    `transition-all duration-700 ease-out ${
      animate
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-6"
    }` + ` delay-[${delay}ms]`;

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero-bg.jpg"
        alt="Child playing piano at home"
        fill
        priority
        className={`object-cover transition-transform duration-[1500ms] ease-out ${
          animate ? "scale-100" : "scale-110"
        }`}
      />

      {/* Dark Overlay — warmer gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-zinc-900/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 sm:px-12 lg:px-20">
        <div className="max-w-2xl" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>
          {/* Label */}
          <p
            className="mb-4 text-sm font-bold tracking-[0.2em] uppercase text-white/80"
            style={{
              opacity: animate ? 1 : 0,
              transform: animate ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease-out 0ms",
            }}
          >
            Volz Method Piano Lessons
          </p>

          {/* Headline */}
          <h1
            className="mb-6 text-5xl leading-[1.1] font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{
              opacity: animate ? 1 : 0,
              transform: animate ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease-out 150ms",
            }}
          >
            We Drive to{" "}
            <span className="relative inline-block italic">
              Your
              {/* Animated hand-drawn underline */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 120 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 5.5C20 2.5 40 1.5 60 3.5C80 5.5 100 4 118 2.5"
                  stroke="#6343d4"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 200,
                    strokeDashoffset: animate ? 0 : 200,
                    transition: "stroke-dashoffset 1s ease-out 800ms",
                  }}
                />
              </svg>
            </span>{" "}
            House!
          </h1>

          {/* Tagline 1 */}
          <p
            className="mb-2 text-lg font-medium text-white/90 sm:text-xl"
            style={{
              opacity: animate ? 1 : 0,
              transform: animate ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease-out 350ms",
            }}
          >
            We Teach According to Your Brain.
          </p>

          {/* Tagline 2 */}
          <p
            className="mb-10 text-lg font-medium text-white/90 sm:text-xl"
            style={{
              opacity: animate ? 1 : 0,
              transform: animate ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease-out 500ms",
            }}
          >
            We Teach the Music You Want to Play.
          </p>

          {/* Testimonial */}
          <div
            className="mb-8 max-w-md"
            style={{
              opacity: animate ? 1 : 0,
              transform: animate ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease-out 650ms",
            }}
          >
            <div className="mb-2 flex gap-1">
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
            <p className="text-base leading-relaxed italic text-white/90">
              &ldquo;My daughter used to dread practice, but now she runs to the
              piano before her teacher even knocks. This has been the best
              decision I&rsquo;ve made for her.&rdquo;
            </p>
            <p className="mt-2 text-sm font-semibold text-white/70">
              &mdash; Sarah M., mom of two
            </p>
          </div>

          {/* CTA */}
          <div
            style={{
              opacity: animate ? 1 : 0,
              transform: animate ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease-out 800ms",
            }}
          >
            <a
              href="/schedule-call"
              className="inline-block rounded-full bg-cta px-10 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:bg-cta-hover hover:shadow-2xl hover:-translate-y-1"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
