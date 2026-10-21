import Link from "next/link";

/**
 * Answers the price questions Google shows for local piano-lesson searches
 * ("How much is a 30-minute piano lesson?", "Are 30-minute piano lessons
 * worth it?"), with Volz's published price next to typical Utah prices.
 *
 * The typical-price ranges come from competitors' own published pricing.
 * They go stale: re-check them quarterly and update PRICES_CHECKED.
 */
const PRICES_CHECKED = "October 2026";

const link = "font-semibold text-brand-ink underline underline-offset-2 hover:no-underline";

export default function PricingQuestions() {
  return (
    <section aria-labelledby="pricing-questions" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <h2 id="pricing-questions" className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
          How much is a 30-minute piano lesson?
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-zinc-700">
          <p>
            A 30-minute Volz Method lesson in your home costs $29–$52. Your exact price depends on your city and how
            many students are in your home, and families with more than one student get a multi-student discount.
          </p>
          <p>Every lesson includes:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>A teacher who drives to your house, so there&rsquo;s no studio commute</li>
            <li>The same teacher every week, trained for three months in the Volz Method</li>
            <li>A specific practice plan to follow until the next lesson</li>
            <li>Lessons shaped around how your child learns: reading, composing, hearing and arranging</li>
          </ul>
        </div>

        <h3 className="mt-12 text-2xl font-bold text-zinc-900">Typical piano lesson prices in Utah</h3>
        <p className="mt-4 text-lg leading-relaxed text-zinc-700">
          Utah providers that publish their prices for weekly 30-minute lessons commonly charge about $110&ndash;$185 a
          month, and some in-home providers charge around $75 a week. Studios may also add a travel fee to come to your
          home. Compare what&rsquo;s included, not just the price: who teaches, whether it&rsquo;s the same teacher
          every week, and whether you have to drive.
        </p>
        <p className="mt-3 text-sm text-zinc-600">Typical prices checked in {PRICES_CHECKED}.</p>

        <h3 className="mt-12 text-2xl font-bold text-zinc-900">Are 30-minute piano lessons worth it?</h3>
        <div className="mt-4 space-y-5 text-lg leading-relaxed text-zinc-700">
          <p>
            For most kids, yes. Young children&rsquo;s attention spans are limited, and a focused, engaging 30-minute
            lesson beats a 60-minute session that loses a child halfway through. Progress comes from what happens
            between lessons, which is why every lesson ends with a practice plan.
          </p>
          <p>
            Not sure how much practice is right? See our{" "}
            <Link href="/how-much-should-my-child-practice-piano-guide-by-age" className={link}>
              practice guide by age
            </Link>
            , or read the full{" "}
            <Link href="/how-much-do-piano-lessons-cost-in-utah-a-2026-parents-guide" className={link}>
              Utah piano lesson pricing guide
            </Link>
            . Using a scholarship?{" "}
            <Link href="/utah-fits-all-piano-lessons" className={link}>
              Here&rsquo;s how Utah Fits All works with lessons
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
