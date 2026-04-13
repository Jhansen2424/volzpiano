"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "@/lib/use-in-view";

/* ═══════════════════════════════════════════
   Animated Piano Keys Background (Hero)
   ═══════════════════════════════════════════ */
const TOTAL_KEYS = 28;

function isBlackKey(index: number): boolean {
  const p = index % 7;
  return p === 1 || p === 2 || p === 4 || p === 5 || p === 6;
}

function PianoKeysAnimation({ visible }: { visible: boolean }) {
  const [pressedKeys, setPressedKeys] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!visible) return;
    const sequence = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24, 26];
    let step = 0;
    const interval = setInterval(() => {
      const keyIndex = sequence[step % sequence.length];
      setPressedKeys(new Set([keyIndex]));
      setTimeout(() => {
        setPressedKeys((prev) => {
          const next = new Set(prev);
          next.delete(keyIndex);
          return next;
        });
      }, 400);
      step++;
    }, 300);
    return () => clearInterval(interval);
  }, [visible]);

  const whiteKeys: number[] = [];
  const blackKeys: { index: number; leftOffset: number }[] = [];
  let whiteIndex = 0;
  for (let i = 0; i < TOTAL_KEYS; i++) {
    if (!isBlackKey(i)) { whiteKeys.push(i); whiteIndex++; }
    else { blackKeys.push({ index: i, leftOffset: whiteIndex }); }
  }
  const w = 100 / whiteKeys.length;

  return (
    <div className="absolute inset-0 flex items-end justify-center overflow-hidden opacity-40">
      {whiteKeys.map((keyIdx, i) => (
        <div
          key={`w-${keyIdx}`}
          className="relative border-x border-white/10"
          style={{
            width: `${w}%`,
            height: pressedKeys.has(keyIdx) ? "88%" : "90%",
            background: pressedKeys.has(keyIdx)
              ? "linear-gradient(to bottom, #6343d4, #5235b8)"
              : "linear-gradient(to bottom, #fafafa, #e5e5e5)",
            borderRadius: "0 0 6px 6px",
            boxShadow: pressedKeys.has(keyIdx)
              ? "0 0 20px rgba(99,67,212,0.6), 0 0 40px rgba(99,67,212,0.3), inset 0 -2px 4px rgba(0,0,0,0.15)"
              : "inset 0 -4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.2)",
            transform: pressedKeys.has(keyIdx) ? "translateY(3px)" : "translateY(0)",
            opacity: visible ? 1 : 0,
            transition: `opacity 0.8s ease-out ${i * 0.03}s, transform 0.15s ease-out, height 0.15s ease-out, background 0.2s ease-out, box-shadow 0.2s ease-out`,
          }}
        />
      ))}
      {blackKeys.map(({ index: keyIdx, leftOffset }) => (
        <div
          key={`b-${keyIdx}`}
          className="absolute"
          style={{
            width: `${w * 0.6}%`,
            height: pressedKeys.has(keyIdx) ? "55%" : "58%",
            left: `${(leftOffset - 0.3) * w}%`,
            top: 0,
            background: pressedKeys.has(keyIdx)
              ? "linear-gradient(to bottom, #6343d4, #4a2fa6)"
              : "linear-gradient(to bottom, #222, #111)",
            borderRadius: "0 0 4px 4px",
            boxShadow: pressedKeys.has(keyIdx)
              ? "0 0 16px rgba(99,67,212,0.7), 0 0 32px rgba(99,67,212,0.3)"
              : "0 3px 6px rgba(0,0,0,0.4), inset 0 -2px 3px rgba(0,0,0,0.3)",
            transform: pressedKeys.has(keyIdx) ? "translateY(2px)" : "translateY(0)",
            zIndex: 2,
            opacity: visible ? 1 : 0,
            transition: `opacity 0.6s ease-out ${leftOffset * 0.03}s, transform 0.15s ease-out, height 0.15s ease-out, background 0.2s ease-out, box-shadow 0.2s ease-out`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Piano Quiz — fun, parent-friendly
   ═══════════════════════════════════════════ */
type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "How many keys does a standard full-size piano have?",
    options: ["66", "76", "88", "100"],
    correctIndex: 2,
    explanation: "A standard acoustic piano has 88 keys — 52 white and 36 black.",
  },
  {
    question: "Which of these is NOT a way kids naturally learn music?",
    options: ["Reading sheet music", "Playing by ear", "Composing", "Memorizing every key in alphabetical order"],
    correctIndex: 3,
    explanation: "Kids thrive when lessons match their natural strengths — reading, ear, and creativity all matter.",
  },
  {
    question: "What's the name of the lowest white key on a piano?",
    options: ["C", "A", "G", "F"],
    correctIndex: 1,
    explanation: "The lowest note on a standard 88-key piano is A0.",
  },
  {
    question: "Which composer started writing music as a young child?",
    options: ["Mozart", "Beethoven", "Chopin", "All of the above"],
    correctIndex: 3,
    explanation: "All three began composing as children — proof that early lessons can spark a lifetime of music.",
  },
  {
    question: "About how many minutes of daily practice is ideal for a young beginner?",
    options: ["5–10 minutes", "15–20 minutes", "45 minutes", "2 hours"],
    correctIndex: 1,
    explanation: "Short, consistent sessions (15–20 minutes) are far more effective than long, occasional ones.",
  },
  {
    question: "What does it mean to play a song 'by ear'?",
    options: [
      "Playing it with headphones on",
      "Figuring out the notes just by listening",
      "Playing very quietly",
      "Playing while reading sheet music",
    ],
    correctIndex: 1,
    explanation: "Playing by ear means recreating music just from hearing it — a skill we love to develop in students who shine at it.",
  },
];

function PianoQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [ref, visible] = useInView<HTMLElement>();

  const q = QUIZ_QUESTIONS[current];
  const isCorrect = selected !== null && selected === q.correctIndex;

  function pick(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correctIndex) setScore((s) => s + 1);
  }

  function next() {
    if (current + 1 >= QUIZ_QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }

  function reset() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 h-72 w-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #6343d4 0%, transparent 70%)" }}
      />
      <div
        className="relative mx-auto max-w-3xl px-6"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease-out",
        }}
      >
        <div className="text-center mb-10">
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-accent">
            For Parents — While You Wait
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
            The Volz Piano Quiz
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-accent" />
          <p className="mt-6 text-lg text-zinc-600">
            Six quick questions about piano, practice, and how kids learn music. No pressure — it&apos;s just for fun!
          </p>
        </div>

        {!finished ? (
          <div className="rounded-3xl border border-zinc-200 bg-white shadow-xl p-8 sm:p-10">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-semibold text-zinc-500">
                Question {current + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-sm font-semibold text-accent">Score: {score}</span>
            </div>

            <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-zinc-100">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${((current + (selected !== null ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            <h3 className="mt-8 mb-6 text-2xl font-bold text-zinc-900 sm:text-3xl">
              {q.question}
            </h3>

            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const isPicked = selected === i;
                const showCorrect = selected !== null && i === q.correctIndex;
                const showWrong = isPicked && i !== q.correctIndex;
                return (
                  <button
                    key={i}
                    onClick={() => pick(i)}
                    disabled={selected !== null}
                    className={`w-full rounded-xl border-2 px-5 py-4 text-left text-base font-medium transition-all ${
                      showCorrect
                        ? "border-green-500 bg-green-50 text-green-900"
                        : showWrong
                        ? "border-red-400 bg-red-50 text-red-900"
                        : selected !== null
                        ? "border-zinc-200 bg-zinc-50 text-zinc-500"
                        : "border-zinc-200 bg-white text-zinc-800 hover:border-accent hover:bg-orange-50 cursor-pointer"
                    }`}
                  >
                    <span className="mr-3 inline-block w-6 font-bold">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div className="mt-6 rounded-xl bg-zinc-50 border border-zinc-200 p-5">
                <p className={`mb-2 font-bold ${isCorrect ? "text-green-700" : "text-accent"}`}>
                  {isCorrect ? "Correct!" : "Not quite —"}
                </p>
                <p className="text-zinc-700">{q.explanation}</p>
                <button
                  onClick={next}
                  className="mt-5 inline-block rounded-full bg-cta px-8 py-3 text-base font-bold text-white shadow-md transition-all duration-200 hover:bg-cta-hover hover:shadow-lg hover:-translate-y-0.5"
                >
                  {current + 1 >= QUIZ_QUESTIONS.length ? "See My Score" : "Next Question"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-3xl border border-zinc-200 bg-white shadow-xl p-10 sm:p-12 text-center">
            <div className="mb-4 text-6xl font-black text-accent">
              {score} / {QUIZ_QUESTIONS.length}
            </div>
            <h3 className="mb-3 text-3xl font-extrabold text-zinc-900">
              {score === QUIZ_QUESTIONS.length
                ? "A perfect score!"
                : score >= QUIZ_QUESTIONS.length - 1
                ? "Practically a virtuoso!"
                : score >= QUIZ_QUESTIONS.length / 2
                ? "Nicely done!"
                : "Thanks for playing!"}
            </h3>
            <p className="mb-8 text-lg text-zinc-600">
              Want your child to learn this stuff (and a whole lot more) the fun way? We come to your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/schedule-call"
                className="inline-block rounded-full bg-cta px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:bg-cta-hover hover:shadow-xl hover:-translate-y-0.5"
              >
                Schedule a Call
              </Link>
              <button
                onClick={reset}
                className="inline-block rounded-full border-2 border-zinc-300 bg-white px-10 py-4 text-lg font-bold text-zinc-800 transition-all duration-200 hover:border-accent hover:text-accent cursor-pointer"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Page
   ═══════════════════════════════════════════ */
export default function VolzMethodPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 via-zinc-900/40 to-zinc-900 z-[1]" />
        <PianoKeysAnimation visible={visible} />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full opacity-25 blur-[120px] z-[1]"
          style={{ background: "radial-gradient(circle, #6343d4 0%, transparent 70%)" }}
        />
        <div className="relative z-[2] text-center px-6">
          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease-out 0.2s",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            The Complete{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Volz Method</span>
              <span
                className="absolute bottom-1 left-0 h-3 w-full bg-accent/30 -z-0 rounded-sm"
                style={{
                  transform: visible ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.6s ease-out 0.8s",
                }}
              />
            </span>
          </h1>
          <p
            className="mt-6 mx-auto max-w-2xl text-lg text-white/60 sm:text-xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease-out 0.5s",
            }}
          >
            A comprehensive approach to piano that meets every student where they are.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-zinc-900 to-transparent z-[1]" />
      </section>

      {/* ── Piano Quiz (replaces step-by-step method blocks) ── */}
      <PianoQuiz />
    </main>
  );
}
