"use client";

import { useState, useRef, useEffect } from "react";

type LearnerType = {
  title: string;
  description: string;
  emoji: string;
  tip: string;
};

const learnerTypes: Record<string, LearnerType> = {
  visual: {
    title: "The Visual Learner",
    emoji: "👁️",
    description:
      "You learn best by seeing! Sheet music, finger placement charts, and watching demonstrations are your superpowers. You likely pick up patterns quickly by observing.",
    tip: "Our teachers use color-coded notation and visual aids tailored just for visual learners like you.",
  },
  auditory: {
    title: "The Ear Player",
    emoji: "👂",
    description:
      "You have a natural ear for music! You pick up melodies quickly just by listening and can often replay songs after hearing them a few times. Playing by ear is your gift.",
    tip: "We nurture ear players with listen-and-play exercises and help you develop your incredible natural talent.",
  },
  kinesthetic: {
    title: "The Hands-On Explorer",
    emoji: "🤲",
    description:
      "You learn by doing! You need to feel the keys, experiment with sounds, and discover music through touch and movement. Repetition and muscle memory are your best friends.",
    tip: "Our lessons include lots of hands-on exploration, improvisation games, and technique-building exercises.",
  },
  creative: {
    title: "The Creative Composer",
    emoji: "🎨",
    description:
      "You're driven by creativity! You love making up your own tunes, changing songs to make them your own, and expressing yourself through music. Rules are just suggestions to you.",
    tip: "We channel your creativity with composition exercises and let you arrange your favorite songs your way.",
  },
};

const questions = [
  {
    question: "When you hear a catchy song, what do you do first?",
    answers: [
      { text: "Look up the sheet music or chords", type: "visual" },
      { text: "Try to hum or sing it back", type: "auditory" },
      { text: "Start tapping the rhythm on a table", type: "kinesthetic" },
      { text: "Imagine your own version of it", type: "creative" },
    ],
  },
  {
    question: "How do you prefer to learn something new?",
    answers: [
      { text: "Watch a video or read instructions", type: "visual" },
      { text: "Have someone explain it to me", type: "auditory" },
      { text: "Jump in and try it myself", type: "kinesthetic" },
      { text: "Figure out my own way to do it", type: "creative" },
    ],
  },
  {
    question: "What sounds most fun at a piano?",
    answers: [
      { text: "Learning to read and play a real piece", type: "visual" },
      { text: "Playing a song I heard on the radio", type: "auditory" },
      { text: "Experimenting with different sounds and keys", type: "kinesthetic" },
      { text: "Making up my own song", type: "creative" },
    ],
  },
  {
    question: "When you're stuck on something difficult, you usually...",
    answers: [
      { text: "Look for a diagram or visual guide", type: "visual" },
      { text: "Ask someone to walk me through it", type: "auditory" },
      { text: "Keep practicing until I get it", type: "kinesthetic" },
      { text: "Try a completely different approach", type: "creative" },
    ],
  },
  {
    question: "What would make you most excited about piano lessons?",
    answers: [
      { text: "Being able to read any piece of music", type: "visual" },
      { text: "Playing songs perfectly by ear", type: "auditory" },
      { text: "Having amazing technique and speed", type: "kinesthetic" },
      { text: "Writing my own music", type: "creative" },
    ],
  },
];

export default function LearnerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    visual: 0,
    auditory: 0,
    kinesthetic: 0,
    creative: 0,
  });
  const [result, setResult] = useState<LearnerType | null>(null);
  const [started, setStarted] = useState(false);
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

  const handleAnswer = (type: string) => {
    const newScores = { ...scores, [type]: scores[type] + 1 };
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const topType = Object.entries(newScores).reduce((a, b) =>
        b[1] > a[1] ? b : a
      )[0];
      setResult(learnerTypes[topType]);
    }
  };

  const reset = () => {
    setCurrentQuestion(0);
    setScores({ visual: 0, auditory: 0, kinesthetic: 0, creative: 0 });
    setResult(null);
    setStarted(false);
  };

  const progress = ((currentQuestion + (result ? 1 : 0)) / questions.length) * 100;

  return (
    <section ref={sectionRef} className="bg-zinc-50 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-20">
        <div
          className="text-center mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease-out",
          }}
        >
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
            What Kind of Learner Are You?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600">
            Take this quick quiz to discover your musical learning style. We tailor every lesson to how your brain works best.
          </p>
          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-brand" />
        </div>

        <div
          className="mx-auto max-w-2xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease-out 0.2s",
          }}
        >
          <div className="rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
            {!started ? (
              <div className="p-8 sm:p-12 text-center">
                <div className="text-6xl mb-6">🎹</div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-3">
                  Discover Your Learning Style
                </h3>
                <p className="text-zinc-600 mb-8">
                  Answer 5 quick questions and find out how you learn music best. It only takes a minute!
                </p>
                <button
                  onClick={() => setStarted(true)}
                  className="inline-block rounded-full bg-cta px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:bg-cta-hover hover:shadow-xl hover:-translate-y-0.5"
                >
                  Start the Quiz
                </button>
              </div>
            ) : result ? (
              <div className="p-8 sm:p-12 text-center">
                <div className="text-6xl mb-4">{result.emoji}</div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">
                  You&rsquo;re {result.title}!
                </h3>
                <p className="text-zinc-600 mb-6 leading-relaxed">
                  {result.description}
                </p>
                <div className="rounded-xl bg-brand/10 border border-brand/20 p-5 mb-8 text-left">
                  <p className="text-sm font-semibold text-brand mb-1">
                    How we teach you:
                  </p>
                  <p className="text-zinc-700 text-sm leading-relaxed">
                    {result.tip}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="/schedule-call"
                    className="inline-block rounded-full bg-cta px-8 py-3 font-bold text-white shadow-lg transition-all duration-200 hover:bg-cta-hover hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Schedule a Lesson
                  </a>
                  <button
                    onClick={reset}
                    className="inline-block rounded-full border-2 border-zinc-300 px-8 py-3 font-bold text-zinc-600 transition-all duration-200 hover:border-zinc-400 hover:text-zinc-800"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 sm:p-12">
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-zinc-500 mb-2">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-100">
                    <div
                      className="h-2 rounded-full bg-brand transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mb-6">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {questions[currentQuestion].answers.map((answer, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(answer.type)}
                      className="w-full text-left rounded-xl border-2 border-zinc-200 p-4 text-zinc-700 font-medium transition-all duration-200 hover:border-brand hover:bg-brand/5 hover:text-zinc-900 active:scale-[0.98]"
                    >
                      {answer.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
