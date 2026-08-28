/**
 * Reusable landing-page sections. Server components, no client JS.
 *
 * Pages compose these in whatever order their hypothesis calls for. The FAQ
 * uses native <details> (zero-JS accordion) and the booking widget uses a
 * native lazy-loaded iframe, so the whole page ships as static HTML.
 */
import Image from "next/image";
import BookingEmbed from "./BookingEmbed";
import { WaveDivider } from "./Decor";
import {
  FAQS,
  HOW_IT_WORKS,
  PRICE,
  PRICE_UNIT,
  RATING,
  REVIEW_COUNT,
  SERVICE_AREA,
  TESTIMONIALS,
  TRUST_CHIPS,
} from "./lpData";
import { BookButton, ChipIcon, Stars } from "./ui";

/* ── Trust bar ───────────────────────────────────────────────────────── */
export function TrustBar() {
  return (
    <section className="border-y border-[#ecdfce] bg-cream">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-4 sm:justify-between">
        {TRUST_CHIPS.map((chip) => (
          <div key={chip.label} className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
            <span className="text-accent">
              <ChipIcon name={chip.icon} className="h-4 w-4" />
            </span>
            {chip.label}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── How it works ────────────────────────────────────────────────────── */
export function HowItWorks() {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            From click to first lesson in 3 steps
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-brand" />
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {HOW_IT_WORKS.map((s) => (
            <div key={s.step} className="relative rounded-3xl border border-[#efe6d8] bg-white p-7 shadow-warm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-lg font-extrabold text-white">
                {s.step}
              </div>
              <h3 className="mb-2 text-lg font-bold text-zinc-900">{s.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-600">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Offer card ──────────────────────────────────────────────────────── */
export function OfferCard() {
  return (
    <section className="bg-blush py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="overflow-hidden rounded-3xl border border-[#efe1d2] bg-gradient-to-b from-white to-cream shadow-warm-lg">
          <div className="lp-plum border-b border-white/5 px-8 py-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">In-home piano lessons</p>
            <div className="mt-3 flex items-baseline justify-center gap-2">
              <span className="text-5xl font-extrabold text-white sm:text-6xl">{PRICE}</span>
              <span className="text-lg font-medium text-white/60">/ {PRICE_UNIT.replace("per ", "")}</span>
            </div>
            <p className="mt-3 text-sm text-white/60">
              Exact price depends on your city &amp; number of students. Multi-student discounts available.
            </p>
          </div>
          <div className="px-8 py-8">
            <ul className="mx-auto max-w-md space-y-3">
              {[
                "Free 15-minute call — no cost, no obligation",
                "The teacher drives to your home each week",
                "Month-to-month — stop anytime with one month's notice",
                "Same teacher every lesson, trained in the Volz Method",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 text-zinc-700">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base">{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col items-center gap-3">
              <BookButton label="Get My Exact Price" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ────────────────────────────────────────────────────── */
export function Testimonials({ heading = "Parents and kids love it" }: { heading?: string }) {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="mb-10 flex flex-col items-center text-center">
          <Stars />
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">{heading}</h2>
          <p className="mt-2 text-zinc-500">
            Rated {RATING} stars across {REVIEW_COUNT} Google reviews
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-3xl border border-[#efe6d8] bg-white p-7 shadow-warm">
              <Stars className="h-4 w-4" />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-zinc-700 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-bold text-zinc-900">{t.name}</span>
                <span className="text-zinc-500"> · {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ (zero-JS <details> accordion) ───────────────────────────────── */
export function Faq({ group }: { group?: "logistics" | "method" }) {
  const items = group ? FAQS.filter((f) => f.group === group || f.group === "both") : FAQS;
  return (
    <section className="bg-blush py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
          Questions parents ask us
        </h2>
        <div className="divide-y divide-[#efe1d2] rounded-3xl border border-[#efe1d2] bg-white shadow-warm">
          {items.map((f) => (
            <details key={f.q} className="group px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-zinc-900 marker:content-[''] [&::-webkit-details-marker]:hidden">
                {f.q}
                <svg
                  className="h-5 w-5 shrink-0 text-accent transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Booking section (native lazy Calendly iframe) ───────────────────── */
export function BookingSection({
  eyebrow = "The next step",
  heading = "Book your free 15-minute call",
  sub = "Pick a time below — we keep it to 15 focused minutes because we know your day is full. We'll answer your questions, give you an exact price, and, if you're ready, match your child with a teacher. No pressure.",
}: {
  eyebrow?: string;
  heading?: string;
  sub?: string;
}) {
  return (
    <section id="book" className="lp-plum relative scroll-mt-20 overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 sm:px-10">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand">{eyebrow}</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{heading}</h2>
          <p className="mt-4 text-white/60">{sub}</p>
        </div>
        <BookingEmbed height={820} />
      </div>
      <WaveDivider fill="#fdf2ee" />
    </section>
  );
}

/* ── Hero convenience illustration (reuses the homepage cartoon) ─────── */
export function DrivingPianoArt({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/driving-piano-lp.png"
      alt="A Volz Method piano teacher driving to your house with a piano on the roof of the car"
      width={1600}
      height={1380}
      priority
      sizes="(max-width: 1024px) 90vw, 620px"
      className={className}
      style={{ animation: "heroDrive 4s ease-in-out infinite" }}
    />
  );
}

export { SERVICE_AREA };
