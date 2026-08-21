import type { Metadata } from "next";
import {
  BookingSection,
  DrivingPianoArt,
  Faq,
  HowItWorks,
  OfferCard,
  Testimonials,
  TrustBar,
} from "../_components/sections";
import { BookButton, CallLink, Stars } from "../_components/ui";
import { PRICE, RATING, REVIEW_COUNT, SERVICE_AREA } from "../_components/lpData";
import LpAnalytics from "../_components/LpAnalytics";
import CityText from "../_components/CityText";
import AreaCheck from "../_components/AreaCheck";
import PlayableKeyboard from "../_components/PlayableKeyboard";
import LearningStyleQuiz from "../_components/LearningStyleQuiz";

/**
 * VARIANT A — "Convenience / offer-forward".
 * Hypothesis: busy parents convert best on frictionless in-home logistics +
 * a transparent, low-commitment offer. Short, price-and-benefit-led.
 */
export const metadata: Metadata = {
  title: "In-Home Piano Lessons in Utah & Idaho | Volz Method",
  description:
    "A trained piano teacher comes to your home — you never drive. Free 15-minute call, exact price, no contracts. $29–$52 per half hour across Utah & Idaho.",
  alternates: { canonical: "/lp/in-home-piano-lessons" },
};

const BENEFITS = [
  {
    title: "We come to you",
    body: "Your teacher drives to your home. No loading the kids in the car, no cross-town commute, no waiting room.",
  },
  {
    title: "Lessons at your own piano",
    body: "Kids learn faster and feel more comfortable playing in their own space — right where they'll practice all week.",
  },
  {
    title: "One consistent teacher",
    body: "The same teacher every week — trained three months in the Volz Method before their very first lesson.",
  },
  {
    title: "No contracts, ever",
    body: "Month-to-month billing. Adjust, pause, or stop whenever life changes. Nothing to lock into.",
  },
];

export default function VariantAInHome() {
  return (
    <main>
      <LpAnalytics variant="A" name="in-home-piano-lessons" />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-zinc-900">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-80 w-[560px] -translate-x-1/2 rounded-full opacity-20 blur-[130px]"
          style={{ background: "radial-gradient(circle, #6343d4 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:py-24">
          {/* Copy */}
          <div>
            <p
              className="text-sm font-bold uppercase tracking-[0.18em] text-brand"
              style={{ animation: "fadeSlideIn 0.6s ease-out both" }}
            >
              In-Home Piano Lessons · <CityText fallback={SERVICE_AREA} />
            </p>
            <h1
              className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ animation: "fadeSlideIn 0.6s ease-out 0.08s both" }}
            >
              Piano Lessons —{" "}
              <span className="text-brand">Without the Drive.</span>
            </h1>
            <p
              className="mt-5 max-w-xl text-lg text-white/70"
              style={{ animation: "fadeSlideIn 0.6s ease-out 0.16s both" }}
            >
              A trained Volz Method teacher comes to your house. You never fight
              traffic, wrangle siblings, or sit in a waiting room. Book a free
              15-minute call and get your exact price today.
            </p>

            {/* Price + rating inline */}
            <div
              className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2"
              style={{ animation: "fadeSlideIn 0.6s ease-out 0.24s both" }}
            >
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white">{PRICE}</span>
                <span className="text-sm text-white/50">/ half hour</span>
              </div>
              <div className="flex items-center gap-2">
                <Stars className="h-4 w-4" />
                <span className="text-sm text-white/60">
                  {RATING} · {REVIEW_COUNT} reviews
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div
              className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
              style={{ animation: "fadeSlideIn 0.6s ease-out 0.32s both" }}
            >
              <BookButton label="Book My Free Call" source="hero" />
              <CallLink />
            </div>
          </div>

          {/* Art */}
          <div className="relative" style={{ animation: "fadeSlideIn 0.8s ease-out 0.3s both" }}>
            <DrivingPianoArt className="mx-auto h-auto w-full max-w-[560px] select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]" />
          </div>
        </div>
      </section>

      <TrustBar />

      {/* ── Benefits ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
              The easiest piano lessons you&rsquo;ll ever schedule
            </h2>
            <p className="mt-4 text-lg text-zinc-600">
              Everything about the Volz Method is built to remove friction — so
              your child actually starts, and keeps going.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-2xl border border-zinc-100 bg-cream p-7 shadow-sm">
                <h3 className="mb-2 text-lg font-bold text-zinc-900">{b.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-600">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AreaCheck />
      <OfferCard />
      <PlayableKeyboard />
      <HowItWorks />
      <Testimonials />
      <LearningStyleQuiz />
      <BookingSection />
      <Faq />
    </main>
  );
}
