"use client";

import { useEffect, useState } from "react";

const phrases = [
  "You Pick the Sheet Music",
  "We Teach to Your Child's Strengths",
  "Lessons Right in Your Living Room",
];

const IconStrip = ({ flip = false }: { flip?: boolean }) => (
  <div
    className={`flex shrink-0 items-center gap-5 ${flip ? "flex-row-reverse" : ""}`}
    aria-hidden
  >
    {/* Piano keys — filled */}
    <svg viewBox="0 0 40 28" className="h-10 w-12 text-brand">
      <rect x="0" y="0" width="40" height="28" rx="3" fill="currentColor" opacity="0.15" />
      <rect x="0" y="0" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M8 0v17M14 0v17M20 0v17M26 0v17M32 0v17" stroke="currentColor" strokeWidth="2" />
      <rect x="5" y="0" width="5" height="11" rx="1" fill="currentColor" />
      <rect x="11" y="0" width="5" height="11" rx="1" fill="currentColor" />
      <rect x="23" y="0" width="5" height="11" rx="1" fill="currentColor" />
      <rect x="30" y="0" width="5" height="11" rx="1" fill="currentColor" />
    </svg>

    {/* Music note — filled */}
    <svg viewBox="0 0 24 28" className="h-10 w-7 text-brand">
      <path d="M9 24V7l11-4v13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="6" cy="24" r="3.5" fill="currentColor" />
      <circle cx="17.5" cy="20" r="3.5" fill="currentColor" />
    </svg>

    {/* House — filled */}
    <svg viewBox="0 0 28 28" className="h-10 w-8 text-brand">
      <path d="M14 3L2 14h4v10h7v-7h2v7h7V14h4L14 3z" fill="currentColor" />
    </svg>

    {/* Treble clef — bolder */}
    <svg viewBox="0 0 20 32" className="h-11 w-6 text-brand">
      <path d="M10 2c-4 4-7 8-7 14 0 4 3 7 7 7s7-3 7-7c0-3-2-5-4-5s-4 2-4 4 1 3 2 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M10 2v28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>

    {/* Star — filled */}
    <svg viewBox="0 0 24 24" className="h-9 w-9 text-brand">
      <path d="M12 2l2.5 7.5H22l-6 4.5 2.5 7.5L12 17l-6.5 4.5L8 14 2 9.5h7.5L12 2z" fill="currentColor" />
    </svg>

    {/* Metronome — filled */}
    <svg viewBox="0 0 24 30" className="h-10 w-7 text-brand">
      <path d="M6 28L10 4h4l4 24H6z" fill="currentColor" opacity="0.3" />
      <path d="M6 28L10 4h4l4 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M4 28h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 18l5-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="18" r="2.5" fill="currentColor" />
    </svg>
  </div>
);

export default function RotatingBanner() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-zinc-900 py-7 sm:py-9">
      {/* Accent lines */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-brand to-transparent" />
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-brand to-transparent" />

      <div className="mx-auto flex items-center justify-center gap-6 px-6 sm:gap-10">
        {/* Left icon strip — hidden on mobile so the rotating text has room */}
        <div className="hidden md:block">
          <IconStrip />
        </div>

        {/* Divider */}
        <div className="hidden h-10 w-px bg-brand/40 md:block" />

        {/* Rotating text — wraps cleanly on mobile, never gets pushed off-screen */}
        <p className="min-w-0 max-w-full text-center text-xl font-bold tracking-wide text-white sm:text-2xl md:text-3xl lg:text-5xl">
          <span
            className="inline-block transition-all duration-400 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              filter: visible ? "blur(0px)" : "blur(4px)",
            }}
          >
            {phrases[index]}
          </span>
        </p>

        {/* Divider */}
        <div className="hidden h-10 w-px bg-brand/40 md:block" />

        {/* Right icon strip — also hidden on mobile */}
        <div className="hidden md:block">
          <IconStrip flip />
        </div>
      </div>
    </section>
  );
}
