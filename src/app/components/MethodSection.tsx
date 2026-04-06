"use client";

import { useEffect, useRef, useState } from "react";
import VideoModal from "./VideoModal";

const learningPaths = [
  {
    label: "By Ear",
    description: "Learn to hear patterns, play melodies by listening, and develop musical intuition.",
    color: "from-brand/20 to-brand/5",
    borderColor: "border-brand/30",
    iconBg: "bg-brand",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7 text-white">
        <path d="M16 4a9 9 0 0 1 9 9v1a6 6 0 0 1-3 5.2V22a3 3 0 0 1-3 3h-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 10a3 3 0 0 1 3 3v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 18c0-1 .5-2 1.5-2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="8" cy="21" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M11 21v4a3 3 0 0 1-6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "By Sight",
    description: "Read sheet music, chord charts, and visual guides with confidence.",
    color: "from-zinc-900/10 to-zinc-900/5",
    borderColor: "border-zinc-900/20",
    iconBg: "bg-zinc-900",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7 text-white">
        <path d="M4 16s4-8 12-8 12 8 12 8-4 8-12 8-12-8-12-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="16" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "By Feel",
    description: "Build muscle memory, finger technique, and physical comfort at the keys.",
    color: "from-brand/20 to-brand/5",
    borderColor: "border-brand/30",
    iconBg: "bg-brand",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7 text-white">
        <path d="M18 4v8l4-2v12a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5v-4l-2-1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 12l4-2M14 10l4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function MethodSection() {
  const [visible, setVisible] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="bg-cream py-20 sm:py-28 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-20">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Left — Learning Path Cards */}
            <div className="flex flex-col gap-5">
              {learningPaths.map((path, i) => (
                <div
                  key={path.label}
                  className={`group relative overflow-hidden rounded-3xl border ${path.borderColor} bg-gradient-to-r ${path.color} p-6 sm:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-40px)",
                    transition: `all 0.7s ease-out ${i * 200}ms`,
                  }}
                >
                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${path.iconBg} shadow-md`}
                    >
                      {path.icon}
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="mb-1 text-xl font-bold text-zinc-900">
                        {path.label}
                      </h3>
                      <p className="text-base leading-relaxed text-zinc-600">
                        {path.description}
                      </p>
                    </div>
                  </div>

                  {/* Decorative number */}
                  <span className="absolute -bottom-4 -right-2 text-[120px] font-black leading-none text-black/[0.03] select-none">
                    {i + 1}
                  </span>
                </div>
              ))}
            </div>

            {/* Right — Copy */}
            <div>
              <h2
                className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-zinc-900 sm:text-5xl"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transition: "all 0.7s ease-out 0.2s",
                }}
              >
                Reading music isn&rsquo;t the only way to learn piano
              </h2>

              <p
                className="mb-4 text-lg leading-relaxed text-zinc-600"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transition: "all 0.7s ease-out 0.35s",
                }}
              >
                Don&rsquo;t worry, we always teach music reading no matter your
                child&rsquo;s strength, but&hellip;
              </p>

              <p
                className="mb-4 text-lg font-semibold text-zinc-900"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transition: "all 0.7s ease-out 0.45s",
                }}
              >
                What if reading music wasn&rsquo;t the only way to learn music?
              </p>

              <p
                className="mb-10 text-lg leading-relaxed text-zinc-600"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transition: "all 0.7s ease-out 0.55s",
                }}
              >
                What if we could play to your child&rsquo;s strengths? Would they do
                better? Would they actually enjoy piano? Would those who are good at
                reading music become more intelligent because they are more
                well-rounded as a musician?
              </p>

              {/* CTAs */}
              <div
                className="flex flex-wrap items-center gap-5"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transition: "all 0.7s ease-out 0.65s",
                }}
              >
                <a
                  href="/schedule-call"
                  className="inline-block rounded-full bg-cta px-10 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:bg-cta-hover hover:shadow-2xl hover:-translate-y-1"
                >
                  Schedule a Call
                </a>

                <button
                  onClick={() => setVideoOpen(true)}
                  className="group flex items-center gap-3 transition-opacity hover:opacity-80"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand shadow-md transition-transform group-hover:scale-110">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="text-lg font-semibold text-zinc-900">Learn More</span>
                </button>
              </div>

              {/* Testimonial */}
              <div
                className="mt-12 border-t border-zinc-200 pt-8"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transition: "all 0.7s ease-out 0.8s",
                }}
              >
                <p className="mb-4 text-lg leading-relaxed italic text-zinc-700">
                  &ldquo;My teacher helps me find what I&rsquo;m good at and to
                  think outside of the box&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-sm font-bold text-zinc-600">
                    L
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">Lucy, age 11</p>
                    <p className="text-sm text-zinc-500">Piano student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl="https://www.youtube.com/embed/F1VJWyGEC6c"
      />
    </>
  );
}
