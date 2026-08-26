import type { Metadata } from "next";
import Image from "next/image";
import {
  BookingSection,
  Faq,
  HowItWorks,
  OfferCard,
  TrustBar,
} from "../_components/sections";
import SocialProof from "../_components/SocialProof";
import { BookButton, CallLink, Stars } from "../_components/ui";
import { RATING, REVIEW_COUNT, SERVICE_AREA } from "../_components/lpData";
import LpAnalytics from "../_components/LpAnalytics";
import CityText from "../_components/CityText";
import AreaCheck from "../_components/AreaCheck";
import PlayableKeyboard from "../_components/PlayableKeyboard";
import LearningStyleQuiz from "../_components/LearningStyleQuiz";
import { FloatingNotes, WaveDivider } from "../_components/Decor";

/**
 * VARIANT B — "Outcome / method-forward".
 * Hypothesis: parents burned by the "took lessons for years, quit, can't play"
 * experience convert best on the promise that kids actually stick with it —
 * via a method tailored to how their brain learns. Longer, problem→proof→offer.
 */
export const metadata: Metadata = {
  title: "Piano Lessons Kids Actually Love | Volz Method — In-Home in Utah & Idaho",
  description:
    "Most kids quit piano because they're forced to learn one way. The Volz Method teaches the music your child wants to play, tailored to how they learn. In-home lessons, free 15-minute call.",
  alternates: { canonical: "/lp/piano-lessons-kids-love" },
};

const PAINS = [
  "“I took piano for years as a kid — and I can’t play a thing now.”",
  "Practice turns into a nightly battle nobody enjoys.",
  "The method book is boring, so interest fades and they quit.",
];

const FIXES = [
  {
    title: "We teach the music they want to play",
    body: "Kids stay motivated when they're working toward songs they actually love — not just the next page in a method book.",
  },
  {
    title: "We teach to how their brain learns",
    body: "Some kids read music naturally; others play by ear or love to compose. We lean into each child's strength instead of forcing one path.",
  },
  {
    title: "Early wins build momentum",
    body: "When a child sounds good early, practice stops being a fight — and the habit sticks for years, not months.",
  },
];

const PILLARS = [
  { letter: "R", title: "Reading", body: "Traditional sight-reading, taught to every student and emphasized for the kids who take to it." },
  { letter: "C", title: "Composing", body: "Writing original music — plus the patterns and theory that make music actually work." },
  { letter: "H", title: "Hearing", body: "Playing by ear, ear training, and recognizing chords and intervals." },
  { letter: "A", title: "Arranging", body: "Taking songs apart and putting them back together to make them their own." },
];

export default function VariantBKidsLove() {
  return (
    <main>
      <LpAnalytics variant="B" name="piano-lessons-kids-love" />

      {/* ── Hero (emotional, photo-led) ── */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-zinc-900">
        <Image
          src="/hero-bg-lp.jpg"
          alt="A child playing piano at home during an in-home lesson"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e1226]/88 via-[#2a1a2e]/72 to-[#33223a]/40" />
        <FloatingNotes className="text-white" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 sm:px-10">
          <div className="max-w-2xl" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>
            <p
              className="text-sm font-bold uppercase tracking-[0.18em] text-brand"
              style={{ animation: "fadeSlideIn 0.6s ease-out both" }}
            >
              The Volz Method · In-Home Lessons
            </p>
            <h1
              className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ animation: "fadeSlideIn 0.6s ease-out 0.08s both" }}
            >
              We Drive to{" "}
              <span className="text-brand">Your House.</span>
            </h1>
            <p
              className="mt-5 max-w-xl text-lg text-white/80"
              style={{ animation: "fadeSlideIn 0.6s ease-out 0.16s both" }}
            >
              Most kids quit piano because they&rsquo;re forced to learn one way.
              The Volz Method teaches the music your child <em>wants</em> to play
              — tailored to how their brain actually learns. In-home, across{" "}
              <CityText fallback={SERVICE_AREA} />.
            </p>
            <div
              className="mt-6 flex items-center gap-3"
              style={{ animation: "fadeSlideIn 0.6s ease-out 0.24s both" }}
            >
              <Stars className="h-5 w-5" />
              <span className="text-sm font-medium text-white/70">
                {RATING} stars · {REVIEW_COUNT} parent reviews
              </span>
            </div>
            <div
              className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
              style={{ animation: "fadeSlideIn 0.6s ease-out 0.32s both" }}
            >
              <BookButton label="Book My Free Call" source="hero" />
              <CallLink />
            </div>
          </div>
        </div>
        <WaveDivider fill="#faf7f2" />
      </section>

      <TrustBar />

      {/* ── Problem → Solution ── */}
      <section className="bg-blush py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Pain */}
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                Sound familiar?
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
                Why most kids quit piano
              </h2>
              <ul className="mt-6 space-y-4">
                {PAINS.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-zinc-600">
                    <svg className="mt-1 h-5 w-5 shrink-0 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="italic">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Fix */}
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                What we do differently
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
                Lessons built to stick
              </h2>
              <ul className="mt-6 space-y-5">
                {FIXES.map((f) => (
                  <li key={f.title} className="flex items-start gap-3">
                    <svg className="mt-0.5 h-6 w-6 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-zinc-900">{f.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-600">{f.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Four Pillars ── */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
              Four ways to learn music — not one
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
              Every student is taught all four pillars, with extra focus on
              whichever one they&rsquo;re wired for.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <div key={p.title} className="rounded-3xl border border-[#efe6d8] bg-white p-7 shadow-warm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-xl font-extrabold text-white">
                  {p.letter}
                </div>
                <h3 className="mb-2 text-lg font-bold text-zinc-900">{p.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-600">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LearningStyleQuiz />

      <SocialProof heading="Kids who found their thing" />

      {/* ── Teacher-training trust nugget ── */}
      <section className="bg-blush py-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xl font-semibold leading-relaxed text-zinc-800 sm:text-2xl">
            Every Volz Method teacher trains for{" "}
            <span className="text-accent">three months</span> in the method
            before they ever teach a single lesson.
          </p>
        </div>
      </section>

      <PlayableKeyboard />
      <AreaCheck />
      <OfferCard />
      <HowItWorks />
      <BookingSection heading="Book your free 15-minute call" />
      <Faq />
    </main>
  );
}
