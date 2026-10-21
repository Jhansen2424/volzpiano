import Link from "next/link";
import LpAnalytics from "@/app/lp/_components/LpAnalytics";
import { Stars } from "@/app/lp/_components/ui";
import { CALENDLY_URL, PRICE, PRICE_UNIT, RATING, REVIEW_COUNT } from "@/app/lp/_components/lpData";

/**
 * The booking page every "Schedule a Call" button leads to.
 *
 * Built for conversion on phones: the calendar sits on the first screen, with
 * the price, the reviews and what the call is right beside it. Server-rendered
 * so the text paints immediately (no JS-gated fade-in), and the Calendly
 * iframe loads straight away because it's the reason the visitor is here.
 */
const CALL_STEPS = [
  {
    title: "We get to know your child",
    body: "Their age, any experience, and how they like to learn: reading, playing by ear, making up songs.",
  },
  {
    title: "You get an exact price",
    body: "Lessons are $29–$52 per half hour depending on your city and how many students are in your home.",
  },
  {
    title: "If you're ready, we match a teacher",
    body: "A trained Volz Method teacher who drives to your house, same teacher every week. No pressure either way.",
  },
];

const TRUST = [
  `${PRICE} ${PRICE_UNIT}`,
  "Month-to-month, no long-term contract",
  "Utah Fits All Scholarship accepted",
];

export default function ScheduleCallPage() {
  return (
    <main>
      <LpAnalytics variant="booking" name="schedule-call" />

      {/* Compact hero: say what the call is, then get out of the way */}
      <section className="bg-zinc-900 pt-32 pb-10 sm:pt-36 sm:pb-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            Book your free <span className="text-brand">15-minute call</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
            Pick a time below. It&rsquo;s free, it takes 15 minutes, and there&rsquo;s no obligation.
          </p>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-white/75">
            <Stars className="h-4 w-4" />
            <span>
              {RATING} from {REVIEW_COUNT} Google reviews
            </span>
          </p>
        </div>
      </section>

      {/* Calendar first on phones; on desktop it sits beside what to expect */}
      <section className="bg-white py-8 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_1.35fr] lg:items-start">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">What happens on the call</h2>
            <ol className="mt-6 space-y-5">
              {CALL_STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-extrabold text-white"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-zinc-900">{step.title}</h3>
                    <p className="mt-1 text-zinc-700">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ul className="mt-8 space-y-2 border-t border-zinc-200 pt-6 text-zinc-700">
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <svg className="h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-zinc-600">
              Want the details first? See{" "}
              <Link href="/pricing" className="font-semibold text-brand-ink underline underline-offset-2 hover:no-underline">
                how lessons and pricing work
              </Link>{" "}
              or{" "}
              <Link href="/areas-we-serve" className="font-semibold text-brand-ink underline underline-offset-2 hover:no-underline">
                where our teachers drive
              </Link>
              .
            </p>
          </div>

          <div className="order-1 lg:order-2">
            {/* Negative margin lets the 320px-min-width widget bleed to the
                viewport edge on phones so it never overflows. */}
            <div className="-mx-6 overflow-hidden rounded-2xl border border-zinc-200 shadow-lg sm:mx-0">
              <iframe
                src={CALENDLY_URL}
                title="Schedule your free 15-minute call"
                className="w-full border-0"
                style={{ height: "800px" }}
              />
            </div>
            <p lang="es" className="mt-4 text-center text-sm text-zinc-600">
              No hablamos espa&ntilde;ol. Si necesita un traductor, debe proporcionar uno en el momento de la cita.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
