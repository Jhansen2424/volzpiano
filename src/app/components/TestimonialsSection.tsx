"use client";

import { useEffect, useRef, useState } from "react";
import VideoModal from "./VideoModal";

const testimonials = [
  {
    quote:
      "My ten year old daughter… it turns out she has a gift for composing… and now she sits down and plays the most beautiful things!",
    name: "Emily",
    role: "Mom",
    initials: "EM",
  },
  {
    quote:
      "I like playing by ear more than reading the notes… in order to learn by ear, you learn chords and intervals.",
    name: "Tommy",
    role: "Age 8",
    initials: "TM",
  },
  {
    quote:
      "My teacher helps me find what I'm good at and to think outside of the box.",
    name: "Lucy",
    role: "Age 11",
    initials: "LU",
  },
];

const videos = [
  {
    label: "Parent Testimonials",
    embedUrl: "https://www.youtube.com/embed/m9dCWFG6xFQ",
  },
  {
    label: "Student Stories",
    embedUrl: "https://www.youtube.com/embed/ihOI_ybt_Ho",
  },
];

export default function TestimonialsSection() {
  const [visible, setVisible] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
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
      <section ref={sectionRef} className="bg-cream py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* ── Left — Copy + Video buttons ── */}
            <div>
              <div
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transition: "all 0.7s ease-out",
                }}
              >
                <h2 className="mb-2 text-4xl font-extrabold uppercase tracking-tight text-zinc-900 sm:text-5xl">
                  What They&apos;re Saying
                </h2>

                {/* Orange accent bar */}
                <div
                  className="mb-8 h-1 w-16 rounded-full bg-brand"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "all 0.5s ease-out 0.3s",
                  }}
                />

                <p className="mb-4 max-w-lg text-lg leading-relaxed text-zinc-600">
                  Music brings joy. Hear what our students and their parents
                  have said about our lessons!
                </p>

                <p className="mb-10 text-sm font-bold uppercase tracking-wider text-zinc-900">
                  Watch Parent &amp; Student Testimonials
                </p>
              </div>

              {/* Video buttons */}
              <div
                className="flex flex-wrap gap-5"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: "all 0.6s ease-out 0.4s",
                }}
              >
                {videos.map((video, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveVideo(video.embedUrl)}
                    className="group flex items-center gap-4 rounded-3xl border border-zinc-200/60 bg-white/80 backdrop-blur-sm px-6 py-4 shadow-sm transition-all duration-300 hover:border-brand/40 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {/* Play circle */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                      <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <span className="block text-sm font-bold text-zinc-900">
                        {video.label}
                      </span>
                      <span className="block text-xs text-zinc-500">
                        Watch Video
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Right — Testimonial cards ── */}
            <div className="flex flex-col gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/80 backdrop-blur-sm p-7 shadow-sm transition-all duration-300 hover:border-brand/30 hover:shadow-lg"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(30px)",
                    transition: `all 0.7s ease-out ${0.2 + i * 0.15}s`,
                  }}
                >
                  {/* Decorative quote mark */}
                  <div className="absolute -top-2 -left-1 text-7xl font-bold leading-none text-brand/10 select-none">
                    &ldquo;
                  </div>

                  {/* Orange top accent on hover */}
                  <div className="absolute top-0 left-0 h-[3px] w-0 bg-brand transition-all duration-500 group-hover:w-full" />

                  <p className="relative mb-5 text-base leading-relaxed text-zinc-600 italic sm:text-lg">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3">
                    {/* Avatar circle with initials */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white">
                      {t.initials}
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-zinc-900">
                        {t.name}
                      </span>
                      <span className="block text-xs text-zinc-500">
                        {t.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={activeVideo !== null}
        onClose={() => setActiveVideo(null)}
        videoUrl={activeVideo ?? ""}
      />
    </>
  );
}
