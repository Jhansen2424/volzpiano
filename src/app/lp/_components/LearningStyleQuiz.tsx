"use client";

import { useRef, useState } from "react";
import { track, trackOnce } from "./track";

/**
 * "What kind of little musician is your child?" — a 4-question quiz that maps a
 * child to one of the Volz Method's four pillars (Reading, Composing, Hearing,
 * Arranging) and returns a personalized how-we'd-teach-them result.
 *
 * Why this and not a generic form: the method's entire promise is "we teach to
 * how your child learns." This module *demonstrates* that promise by
 * personalizing — the most on-brand possible interactive element. Research also
 * backs the mechanism: a low-threat multi-step micro-commitment with a genuine
 * payoff (a recommendation) converts far better than a static ask, and it
 * qualifies the lead + warms the sales call.
 *
 * Fully keyboard-operable, announces steps via aria-live, respects reduced
 * motion (see .lp-fade-* classes), and ships no dependencies.
 */
type Pillar = "H" | "R" | "C" | "A";

const QUESTIONS: { q: string; options: { label: string; pillar: Pillar }[] }[] = [
  {
    q: "When your child hears a song they love, they usually…",
    options: [
      { label: "Hum or sing it back almost right away", pillar: "H" },
      { label: "Wonder how it's written or what the notes are", pillar: "R" },
      { label: "Start changing it or making up their own version", pillar: "C" },
      { label: "Want to perform it — with their own flair", pillar: "A" },
    ],
  },
  {
    q: "Give them a free afternoon with an instrument and they'd…",
    options: [
      { label: "Try to figure out a song by ear", pillar: "H" },
      { label: "Follow a book, app, or step-by-step", pillar: "R" },
      { label: "Invent something brand new", pillar: "C" },
      { label: "Remix or mash up songs they already know", pillar: "A" },
    ],
  },
  {
    q: "They light up the most when…",
    options: [
      { label: "They can finally play a song they heard somewhere", pillar: "H" },
      { label: "They nail a piece exactly right", pillar: "R" },
      { label: "They create something no one has heard before", pillar: "C" },
      { label: "They put their own spin on a familiar song", pillar: "A" },
    ],
  },
  {
    q: "In school or play, they're naturally drawn to…",
    options: [
      { label: "Music, languages, listening games", pillar: "H" },
      { label: "Patterns, numbers, getting the details right", pillar: "R" },
      { label: "Art, stories, imagination", pillar: "C" },
      { label: "Building things, taking them apart, remixing", pillar: "A" },
    ],
  },
];

const RESULTS: Record<Pillar, { badge: string; title: string; body: string }> = {
  H: {
    badge: "Hearing",
    title: "The Natural Ear",
    body: "Your child hears music and wants to play it back. We'd start with playing by ear — chords, intervals, and the songs already stuck in their head — so they're making real music fast. Reading and theory come along naturally once they're hooked.",
  },
  R: {
    badge: "Reading",
    title: "The Precisionist",
    body: "Your child loves structure and getting things exactly right. We'd give them strong sight-reading and the deep satisfaction of nailing a piece — while weaving in ear-training and creativity so they grow into a complete musician.",
  },
  C: {
    badge: "Composing",
    title: "The Inventor",
    body: "Your child would rather make up their own music than copy someone else's. We'd start them composing early — turning their ideas into real songs — and use that spark to carry the reading and technique.",
  },
  A: {
    badge: "Arranging",
    title: "The Arranger",
    body: "Your child loves taking songs apart and making them their own. We'd hand them music to rework and rearrange, so practice feels like play — and the fundamentals sneak in along the way.",
  },
};

const PREF: Pillar[] = ["H", "C", "A", "R"]; // tie-break order

export default function LearningStyleQuiz() {
  const [step, setStep] = useState(0);
  const scores = useRef<Record<Pillar, number>>({ H: 0, R: 0, C: 0, A: 0 });
  const [result, setResult] = useState<Pillar | null>(null);
  const liveRef = useRef<HTMLDivElement>(null);

  function choose(pillar: Pillar) {
    trackOnce("quiz_start", "lp_quiz_start");
    scores.current[pillar] += 1;
    track("lp_quiz_answer", { step: step + 1, pillar });

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const s = scores.current;
      let best: Pillar = PREF[0];
      let bestN = -1;
      for (const p of PREF) {
        if (s[p] > bestN) {
          best = p;
          bestN = s[p];
        }
      }
      setResult(best);
      track("lp_quiz_complete", { result: best, result_name: RESULTS[best].title });
    }
  }

  function reset() {
    scores.current = { H: 0, R: 0, C: 0, A: 0 };
    setResult(null);
    setStep(0);
  }

  const progress = result ? 100 : Math.round((step / QUESTIONS.length) * 100);

  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
            60-second quiz
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            What kind of little musician is your child?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-zinc-600">
            You already know your child better than anyone. Answer four quick
            questions and we&rsquo;ll show you where <em>they</em> would shine
            &mdash; and exactly how we&rsquo;d teach them.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#efe1d2] bg-white shadow-warm-lg">
          {/* progress */}
          <div className="h-1.5 w-full bg-zinc-100">
            <div
              className="h-full bg-accent transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-7 sm:p-9">
            <div ref={liveRef} aria-live="polite" className="sr-only">
              {result
                ? `Result: ${RESULTS[result].title}`
                : `Question ${step + 1} of ${QUESTIONS.length}`}
            </div>

            {!result ? (
              <div key={step} className="lp-fade-slide">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Question {step + 1} of {QUESTIONS.length}
                </p>
                <h3 className="mb-6 text-xl font-bold leading-snug text-zinc-900">
                  {QUESTIONS[step].q}
                </h3>
                <div className="flex flex-col gap-3">
                  {QUESTIONS[step].options.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => choose(opt.pillar)}
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-left text-[15px] font-medium text-zinc-800 transition-all hover:border-accent hover:bg-accent/[0.04] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {opt.label}
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-zinc-300 transition-colors group-hover:border-accent group-hover:text-accent">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="lp-fade-scale text-center">
                <span className="inline-block rounded-full bg-accent/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-accent">
                  Pillar: {RESULTS[result].badge}
                </span>
                <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900">
                  {RESULTS[result].title}
                </h3>
                <p className="mx-auto mt-4 max-w-lg leading-relaxed text-zinc-600">
                  {RESULTS[result].body}
                </p>
                <p className="mx-auto mt-4 max-w-lg text-sm text-zinc-500">
                  Every Volz student learns all four pillars &mdash; Reading,
                  Composing, Hearing, and Arranging. We just start where your
                  child already shines.
                </p>
                <div className="mt-7 flex flex-col items-center gap-3">
                  <a
                    href="#book"
                    data-cta="quiz"
                    data-cta-detail={result}
                    className="inline-flex items-center gap-2 rounded-full bg-cta px-8 py-4 text-base font-bold text-white shadow-xl transition-all hover:bg-cta-hover hover:-translate-y-0.5"
                  >
                    Book my free 15-min call
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                    </svg>
                  </a>
                  <button
                    type="button"
                    onClick={reset}
                    className="text-sm font-semibold text-zinc-500 underline-offset-2 hover:text-accent hover:underline"
                  >
                    Retake the quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
