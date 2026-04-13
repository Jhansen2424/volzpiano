"use client";

import Link from "next/link";
import { useState } from "react";
import { useInView } from "@/lib/use-in-view";

const questions = [
  {
    question: "When your child hears a new song, they usually...",
    options: [
      { label: "Want to see the sheet music right away", side: "left" as const },
      { label: "Try to figure it out by ear on the piano", side: "right" as const },
    ],
  },
  {
    question: "Your child learns best by...",
    options: [
      { label: "Reading instructions and following steps", side: "left" as const },
      { label: "Jumping in and experimenting hands-on", side: "right" as const },
    ],
  },
  {
    question: "When playing a song they know, your child tends to...",
    options: [
      { label: "Play it exactly as written every time", side: "left" as const },
      { label: "Add their own twist or change things up", side: "right" as const },
    ],
  },
  {
    question: "Your child is more drawn to...",
    options: [
      { label: "Following patterns, structure, and rules", side: "left" as const },
      { label: "Creating something new and unique", side: "right" as const },
    ],
  },
];

const results = {
  left: {
    title: "Left-Brain Learner",
    subtitle: "Analytical, structured, detail-oriented",
    skills: ["Sight Reading", "Arranging"],
    description:
      "Your child thrives with structure and precision. They'll excel at reading sheet music and arranging pieces with a methodical approach. We'll lean into that strength while building their creative side too.",
    cta: "Let's build a plan for your left-brain learner.",
  },
  right: {
    title: "Right-Brain Learner",
    subtitle: "Creative, intuitive, expressive",
    skills: ["Composing", "Playing by Ear"],
    description:
      "Your child is a natural creative. They'll soar when taught to compose and play by ear, using their intuition as a superpower. We'll harness that gift while strengthening their reading fundamentals.",
    cta: "Let's build a plan for your right-brain learner.",
  },
  balanced: {
    title: "Balanced Learner",
    subtitle: "Versatile, adaptable, well-rounded",
    skills: ["All Four Skills"],
    description:
      "Your child has a beautiful balance of analytical and creative thinking. They'll benefit from a curriculum that develops all four pillars — reading, composing, hearing, and arranging — equally.",
    cta: "Let's build a well-rounded plan for your child.",
  },
};

/* Brain Diagram — reacts to quiz state */
function BrainDiagram({
  leftCount,
  rightCount,
  started,
  showResult,
}: {
  leftCount: number;
  rightCount: number;
  started: boolean;
  showResult: boolean;
}) {
  const leftActive = started && leftCount >= rightCount;
  const rightActive = started && rightCount >= leftCount;
  const leftStrong = showResult && leftCount > rightCount;
  const rightStrong = showResult && rightCount > leftCount;
  const balanced = showResult && leftCount === rightCount;

  return (
    <div className="flex flex-col items-center">
      {/* Brain SVG */}
      <div className="relative">
        <svg viewBox="0 0 320 280" className="h-auto w-full max-w-sm">
          {/* Left hemisphere */}
          <g
            className="transition-all duration-700"
            style={{
              filter:
                leftStrong || balanced
                  ? "drop-shadow(0 0 24px rgba(99,67,212,0.5))"
                  : leftActive
                  ? "drop-shadow(0 0 12px rgba(99,67,212,0.3))"
                  : "none",
              opacity: rightStrong && !balanced ? 0.3 : 1,
            }}
          >
            <path
              d="M155 140c0-65-25-110-65-125C50 30 20 70 20 140s30 110 70 125c40-15 65-60 65-125z"
              fill={
                leftActive
                  ? "rgba(99,67,212,0.2)"
                  : "rgba(255,255,255,0.05)"
              }
              stroke={
                leftActive ? "#6343d4" : "rgba(255,255,255,0.15)"
              }
              strokeWidth="2"
              className="transition-all duration-700"
            />
            {/* Brain folds */}
            <path
              d="M140 50c-20 10-45 25-60 45M140 100c-15 5-40 15-55 25M140 155c-20 0-45 10-60 20M140 210c-15-5-40 5-55 15"
              fill="none"
              stroke={
                leftActive ? "rgba(99,67,212,0.4)" : "rgba(255,255,255,0.08)"
              }
              strokeWidth="1.5"
              strokeLinecap="round"
              className="transition-all duration-700"
            />
            {/* Left analytical icons */}
            <g style={{ opacity: leftActive ? 1 : 0.2 }} className="transition-opacity duration-700">
              {/* Grid */}
              <rect x="55" y="75" width="28" height="28" rx="3" stroke={leftActive ? "#6343d4" : "#fff"} strokeWidth="1.5" fill="none" />
              <path d="M55 89h28M69 75v28" stroke={leftActive ? "#6343d4" : "#fff"} strokeWidth="1" />
              {/* Calculator */}
              <rect x="45" y="165" width="24" height="30" rx="3" stroke={leftActive ? "#6343d4" : "#fff"} strokeWidth="1.5" fill="none" />
              <path d="M49 175h16M49 180h16M49 185h16" stroke={leftActive ? "#6343d4" : "#fff"} strokeWidth="1" />
            </g>
          </g>

          {/* Right hemisphere */}
          <g
            className="transition-all duration-700"
            style={{
              filter:
                rightStrong || balanced
                  ? "drop-shadow(0 0 24px rgba(99,67,212,0.5))"
                  : rightActive
                  ? "drop-shadow(0 0 12px rgba(99,67,212,0.3))"
                  : "none",
              opacity: leftStrong && !balanced ? 0.3 : 1,
            }}
          >
            <path
              d="M165 140c0-65 25-110 65-125 40 15 70 55 70 125s-30 110-70 125c-40-15-65-60-65-125z"
              fill={
                rightActive
                  ? "rgba(99,67,212,0.2)"
                  : "rgba(255,255,255,0.05)"
              }
              stroke={
                rightActive ? "#6343d4" : "rgba(255,255,255,0.15)"
              }
              strokeWidth="2"
              className="transition-all duration-700"
            />
            {/* Brain folds */}
            <path
              d="M180 50c20 10 45 25 60 45M180 100c15 5 40 15 55 25M180 155c20 0 45 10 60 20M180 210c15-5 40 5 55 15"
              fill="none"
              stroke={
                rightActive ? "rgba(99,67,212,0.4)" : "rgba(255,255,255,0.08)"
              }
              strokeWidth="1.5"
              strokeLinecap="round"
              className="transition-all duration-700"
            />
            {/* Right creative icons */}
            <g style={{ opacity: rightActive ? 1 : 0.2 }} className="transition-opacity duration-700">
              {/* Palette */}
              <circle cx="250" cy="85" r="15" stroke={rightActive ? "#6343d4" : "#fff"} strokeWidth="1.5" fill="none" />
              <circle cx="244" cy="80" r="3" fill={rightActive ? "#6343d4" : "rgba(255,255,255,0.3)"} />
              <circle cx="256" cy="80" r="3" fill={rightActive ? "#6343d4" : "rgba(255,255,255,0.3)"} />
              <circle cx="250" cy="92" r="3" fill={rightActive ? "#6343d4" : "rgba(255,255,255,0.3)"} />
              {/* Music note */}
              <path d="M248 170v-20l14-5v16" stroke={rightActive ? "#6343d4" : "#fff"} strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <circle cx="245" cy="170" r="4" stroke={rightActive ? "#6343d4" : "#fff"} strokeWidth="1.5" fill="none" />
              <circle cx="259" cy="161" r="4" stroke={rightActive ? "#6343d4" : "#fff"} strokeWidth="1.5" fill="none" />
            </g>
          </g>

          {/* Center line */}
          <line x1="160" y1="10" x2="160" y2="270" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
        </svg>

        {/* Labels */}
        <div className="absolute top-4 left-4 sm:left-8">
          <span
            className="text-xl font-extrabold uppercase transition-colors duration-500 sm:text-2xl"
            style={{ color: leftActive ? "#6343d4" : "rgba(255,255,255,0.4)" }}
          >
            Left<br />Brain
          </span>
        </div>
        <div className="absolute top-4 right-4 text-right sm:right-8">
          <span
            className="text-xl font-extrabold uppercase transition-colors duration-500 sm:text-2xl"
            style={{ color: rightActive ? "#6343d4" : "rgba(255,255,255,0.4)" }}
          >
            Right<br />Brain
          </span>
        </div>
      </div>

      {/* Skill labels below brain */}
      <div className="mt-6 grid w-full max-w-sm grid-cols-2 gap-x-8 gap-y-3">
        {/* Left skills */}
        <div className="flex flex-col gap-3">
          {[
            { icon: "✓", label: "Sight Reading" },
            { icon: "✓", label: "Arranging" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 transition-opacity duration-500"
              style={{ opacity: leftActive ? 1 : 0.3 }}
            >
              <span
                className="text-sm font-bold transition-colors duration-500"
                style={{ color: leftActive ? "#6343d4" : "rgba(255,255,255,0.4)" }}
              >
                {s.icon}
              </span>
              <span
                className="text-base font-semibold italic transition-colors duration-500"
                style={{ color: leftActive ? "#fff" : "rgba(255,255,255,0.4)" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
        {/* Right skills */}
        <div className="flex flex-col gap-3 text-right">
          {[
            { icon: "✓", label: "Composing" },
            { icon: "✓", label: "Playing by Ear" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-end gap-2 transition-opacity duration-500"
              style={{ opacity: rightActive ? 1 : 0.3 }}
            >
              <span
                className="text-base font-semibold italic transition-colors duration-500"
                style={{ color: rightActive ? "#fff" : "rgba(255,255,255,0.4)" }}
              >
                {s.label}
              </span>
              <span
                className="text-sm font-bold transition-colors duration-500"
                style={{ color: rightActive ? "#6343d4" : "rgba(255,255,255,0.4)" }}
              >
                {s.icon}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BrainSection() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<("left" | "right")[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);
  const [sectionRef, visible] = useInView<HTMLElement>({ threshold: 0.1 });

  const leftCount = answers.filter((a) => a === "left").length;
  const rightCount = answers.filter((a) => a === "right").length;

  const handleAnswer = (side: "left" | "right") => {
    const newAnswers = [...answers, side];
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const getResult = () => {
    if (leftCount > rightCount) return results.left;
    if (rightCount > leftCount) return results.right;
    return results.balanced;
  };

  const reset = () => {
    setCurrentQ(0);
    setAnswers([]);
    setShowResult(false);
    setStarted(false);
  };

  const result = getResult();

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 lg:py-32" style={{ background: "linear-gradient(135deg, #1a1035 0%, #2d1b69 30%, #6343d4 70%, #7c5ce7 100%)" }}>
      {/* Wavy top divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] -translate-y-[1px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[50px] sm:h-[70px]">
          <path d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,0 L0,0 Z" fill="#faf7f2" />
        </svg>
      </div>
      {/* Wavy bottom divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[1px] rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[50px] sm:h-[70px]">
          <path d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,0 L0,0 Z" fill="#faf7f2" />
        </svg>
      </div>
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
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            What type of brain does your child have?
          </h2>
          <p className="mx-auto max-w-xl text-lg text-white/60">
            Take this 30-second quiz to discover how your child learns best.
          </p>
        </div>

        {/* Two-column layout */}
        <div
          className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease-out 0.2s",
          }}
        >
          {/* Left — Quiz */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm">
            {/* Progress bar */}
            {started && !showResult && (
              <div className="absolute top-0 left-0 h-1 w-full bg-white/10">
                <div
                  className="h-full bg-brand transition-all duration-500 ease-out"
                  style={{
                    width: `${((currentQ + (answers.length > currentQ ? 1 : 0)) / questions.length) * 100}%`,
                  }}
                />
              </div>
            )}

            <div className="p-7 sm:p-10">
              {/* Start Screen */}
              {!started && !showResult && (
                <div className="flex flex-col items-center py-6 text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/15">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 text-brand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M9 19V6l12-3v13M6 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </div>
                  <p className="mb-6 max-w-sm text-base text-white/70">
                    Answer 4 quick questions about your child and we&rsquo;ll show you
                    how they learn best — and how we&rsquo;ll teach them.
                  </p>
                  <button
                    onClick={() => setStarted(true)}
                    className="rounded-full bg-brand px-8 py-3.5 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:bg-brand-hover hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Start the Quiz
                  </button>
                </div>
              )}

              {/* Question */}
              {started && !showResult && (
                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand">
                    Question {currentQ + 1} of {questions.length}
                  </p>
                  <h3
                    className="mb-6 text-xl font-bold text-white sm:text-2xl"
                    key={currentQ}
                    style={{ animation: "fadeSlideIn 0.4s ease-out" }}
                  >
                    {questions[currentQ].question}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {questions[currentQ].options.map((option) => (
                      <button
                        key={option.label}
                        onClick={() => handleAnswer(option.side)}
                        className="group rounded-xl border border-white/10 bg-white/5 p-4 text-left text-base font-medium text-white transition-all duration-200 hover:border-brand/50 hover:bg-brand/10 sm:text-lg"
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-white/20 text-sm font-bold text-white/50 transition-all duration-200 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                            {option.side === "left" ? "A" : "B"}
                          </span>
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Result */}
              {showResult && (
                <div style={{ animation: "fadeSlideIn 0.5s ease-out" }}>
                  <p className="mb-1 text-sm font-bold uppercase tracking-wider text-brand">
                    Your child is a
                  </p>
                  <h3 className="mb-1 text-2xl font-extrabold text-white sm:text-3xl">
                    {result.title}
                  </h3>
                  <p className="mb-4 text-base text-white/50">{result.subtitle}</p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {result.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-brand/15 px-4 py-1.5 text-sm font-bold text-brand"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="mb-6 text-base leading-relaxed text-white/70">
                    {result.description}
                  </p>

                  <p className="mb-4 text-base font-semibold italic text-white/80">
                    {result.cta}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href="/schedule-call"
                      className="rounded-full bg-cta px-8 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-200 hover:bg-cta-hover hover:shadow-xl hover:-translate-y-0.5"
                    >
                      Schedule a Call
                    </Link>
                    <button
                      onClick={reset}
                      className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/60 transition-all duration-200 hover:border-white/40 hover:text-white"
                    >
                      Retake
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right — Brain Diagram */}
          <div className="hidden lg:block">
            <BrainDiagram
              leftCount={leftCount}
              rightCount={rightCount}
              started={started}
              showResult={showResult}
            />
          </div>
        </div>

        {/* Footnote */}
        <p
          className="mt-8 text-center text-sm italic text-white/40"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease-out 0.4s",
          }}
        >
          *Sight reading is always taught no matter your child&rsquo;s strength.
        </p>
      </div>
    </section>
  );
}
