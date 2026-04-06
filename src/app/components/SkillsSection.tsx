"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const skills = [
  {
    label: "Reading",
    description:
      "Reading sheet music isn't going away anytime soon. We still teach each of our students to read music but we emphasize its use in students who excel and are naturally suited to its development.",
    image: "/skills-reading.jpg",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8 text-white">
        <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="13" y="11" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M9 8h6M9 11h4M17 16h6M17 19h4M17 22h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Composing",
    description:
      "A number of our students advance rapidly as we teach them not only to compose their own music, but teach them to understand the patterns and laws that govern it. Their compositions have brought me to tears.",
    image: "/skills-composing.jpg",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8 text-white">
        <path d="M6 26L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 4l4 2-2 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 26c-1 1-2 2-1 3s2 0 3-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 18h8M14 22h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    label: "Hearing",
    description:
      "There are many students who elevate their playing by entire levels when they are taught by ear. We train their talent instead of discouraging it and help them utilize their strengths and leverage them to reach new heights.",
    image: "/skills-hearing.jpg",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8 text-white">
        <path d="M18 6a10 10 0 0 1 0 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 11a5 5 0 0 1 0 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 4c-5 2-8 7-8 12s3 10 8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="14" cy="16" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Arranging",
    description:
      "Some students work well taking existing pieces and twisting, tweaking, and adjusting them to make entirely new pieces of music or similar ones. Their path may be different from conventional piano teaching but the results speak for themselves.",
    image: "/skills-arranging.jpg",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8 text-white">
        <path d="M8 24V10l16-6v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="5.5" cy="24" r="3.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="21.5" cy="18" r="3.5" stroke="currentColor" strokeWidth="2" />
        <path d="M14 8l3-1M14 12l3-1M14 16l3-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
];

export default function SkillsSection() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
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
    <section ref={sectionRef} className="bg-cream py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-20">
        {/* Header */}
        <div
          className="mb-14 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease-out",
          }}
        >
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
            A Comprehensive Method
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600">
            Learn these four essential skills for playing great piano during our lessons.
          </p>
          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-brand" />
        </div>

        {/* Accordion Cards */}
        <div
          className="flex h-[500px] gap-3 sm:gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease-out 0.2s",
          }}
        >
          {skills.map((skill, i) => {
            const isActive = active === i;
            return (
              <div
                key={skill.label}
                className="relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ease-in-out"
                style={{ flex: isActive ? 4 : 1 }}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                {/* Background image */}
                <Image
                  src={skill.image}
                  alt={skill.label}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    isActive ? "scale-100" : "scale-110"
                  }`}
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isActive
                      ? "bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                      : "bg-black/60"
                  }`}
                />

                {/* Collapsed state — vertical label */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <span
                    className="text-2xl font-bold tracking-wider text-white uppercase sm:text-3xl"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                    }}
                  >
                    {skill.label}
                  </span>
                </div>

                {/* Expanded state — full content */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-500 sm:p-8 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/90 shadow-md">
                      {skill.icon}
                    </div>
                    <h3 className="text-3xl font-extrabold text-white sm:text-4xl">
                      {skill.label}
                    </h3>
                  </div>
                  <p className="max-w-md text-base leading-relaxed text-white/90 sm:text-lg">
                    {skill.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
