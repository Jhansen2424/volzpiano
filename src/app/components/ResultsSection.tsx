"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/lib/use-in-view";

const results = [
  "Students using the Volz Method advance at a rapid rate and report often how much they enjoy it so much more.",
  "When a student who struggles in reading is taught according to their strengths, their sight reading improves quicker than if they had just read music only.",
  'Our students regularly learn and perform pieces that turn heads. Most would never believe that they can do what they do. "The talent was always there. Someone just needed to help them unlock it."',
  "Students learn composition, Jazz, ear training, arranging, reading, and many other skills that allow them to be incredible musicians as well as amazing pianists.",
  "They practice regularly and are engaged in the lessons.",
  "Your kids will develop a love for music and feel confident in their ability to learn and improve their skills.",
];

export default function ResultsSection() {
  const [sectionRef, visible] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="bg-cream py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — Photo */}
          <div
            className="relative overflow-hidden rounded-[2rem]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              transition: "all 0.8s ease-out",
            }}
          >
            <div className="relative aspect-[4/5]">
              <Image
                src="/results-student.jpg"
                alt="Student enjoying piano lessons"
                fill
                className={`object-cover transition-transform duration-[2000ms] ease-out ${
                  visible ? "scale-100" : "scale-110"
                }`}
              />
            </div>
          </div>

          {/* Right — Content */}
          <div>
            <h2
              className="mb-2 text-4xl font-extrabold uppercase tracking-tight text-zinc-900 sm:text-5xl"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: "all 0.7s ease-out 0.1s",
              }}
            >
              Piano Lesson Results
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

            {/* Bullet points with animated checkmarks */}
            <div className="flex flex-col gap-5 mb-10">
              {results.map((text, i) => (
                <div
                  key={i}
                  className="flex gap-4"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(16px)",
                    transition: `all 0.6s ease-out ${0.3 + i * 0.12}s`,
                  }}
                >
                  {/* Animated checkmark */}
                  <div className="mt-0.5 shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        className="transition-all duration-500"
                        style={{
                          fill: visible ? "#6343d4" : "transparent",
                          transitionDelay: `${0.4 + i * 0.12}s`,
                        }}
                      />
                      <path
                        d="M7 12.5l3 3 7-7"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          strokeDasharray: 20,
                          strokeDashoffset: visible ? 0 : 20,
                          transition: `stroke-dashoffset 0.4s ease-out ${0.5 + i * 0.12}s`,
                        }}
                      />
                    </svg>
                  </div>

                  {/* Text */}
                  <p className="text-base leading-relaxed text-zinc-600 sm:text-lg">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `all 0.6s ease-out ${0.3 + results.length * 0.12}s`,
              }}
            >
              <Link
                href="/schedule-call"
                className="inline-block rounded-full bg-cta px-10 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:bg-cta-hover hover:shadow-2xl hover:-translate-y-1"
              >
                Schedule a Call
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
