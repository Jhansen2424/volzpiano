# PPC Landing Pages (`/lp`)

Distraction-free, conversion-focused landing pages for **paid search / PPC**
traffic. They are intentionally **not** part of the site's normal navigation and
are **noindexed** — they exist to be pointed at by Google Ads (or Meta/other
paid) campaigns only.

## The A/B test

Both variants sell the exact same thing (in-home Volz Method piano lessons) and
share the **same offer facts, trust signals, and conversion action**. They
differ in **one deliberate variable: the core value-proposition angle**. That's
what makes this a clean, learnable test — and the winning angle also tells you
which ad copy to lean into.

| | Variant A | Variant B |
|---|---|---|
| **URL** | `/lp/in-home-piano-lessons` | `/lp/piano-lessons-kids-love` |
| **Angle** | Convenience / offer-forward | Outcome / method-forward |
| **Headline** | "Piano Lessons — Without the Drive." | "Piano Lessons Your Kid Won't Want to Quit." |
| **Hypothesis** | Busy parents convert on frictionless "we come to you" logistics + a transparent, no-contract price. | Parents burned by the "took lessons for years, quit, can't play" story convert on the promise kids actually stick with it. |
| **Structure** | Short. Price + benefits early, then offer → proof → book. | Longer. Problem → method → proof → offer → book. |
| **Hero art** | Driving-piano cartoon (the convenience punchline) | Real child at the piano (emotional) |

Both funnel to the **same Calendly booking**, which (per Calendly's event
settings) redirects to **`/thank-you`**, where the existing Google Ads
conversion tag (`AW-755139969`) fires. So every landing page reports into the
**same conversion** — you compare which URL produced more of them.

## How to run the test in Google Ads (recommended: a true 50/50 split)

Pointing two different ad groups at the two URLs would confound the *angle* with
the *audience/keywords*. To isolate the angle, split the **same** traffic:

1. **Google Ads → Experiments → Custom experiment** (or **Campaign draft &
   experiment**) on the campaign whose keywords you want to test.
2. In the experiment arm, override the ads' **Final URL** to point at the other
   variant. Base = Variant A URL, Experiment = Variant B URL (or vice-versa).
3. Set the experiment **split to 50/50** and run until each arm has enough
   conversions to reach significance (rule of thumb: ≥ ~50–100 conversions per
   arm, or use Google's "experiment is significant" flag).
4. Compare **Conversion rate** and **Cost / conversion** between arms. Roll the
   winner out to 100%.

Alternative (quicker, less rigorous): run both URLs as **Final URL variations**
within one ad, or as two ads in the same ad group set to "Optimize/Rotate."

## Interactive modules (what makes these unlike a normal PPC page)

Each is a self-contained client component under `_components/`, dropped into
both variants so the A/B variable stays *only* the angle. They exist to
*demonstrate* the product and remove real friction, not for novelty.

- **`PlayableKeyboard.tsx` — a real, playable piano.** Web Audio (no samples, no
  network, CSP-safe; AudioContext created on first gesture). Guided glowing keys
  walk the visitor through "Twinkle, Twinkle" or "Ode to Joy"; "Play it for me"
  auto-demos; completion → booking CTA. The single most on-brand possible
  element — the visitor *plays piano* on the ad.
- **`LearningStyleQuiz.tsx` — "What kind of little musician is your child?"** A
  4-question micro-commitment mapping the child to one of the four Volz pillars
  (Reading/Composing/Hearing/Arranging) with a personalized "how we'd teach
  them" result. It proves the method's promise ("we teach to how your child
  learns") *by personalizing*. Multi-step micro-commitments with a real payoff
  are the best-evidenced interactive uplift pattern.
- **`AreaCheck.tsx` — "Do we come to your area?"** Two taps confirm the service
  area and show the **real published price range** (never a fabricated exact
  number) with the multi-student discount noted; exact quote still comes on the
  call. Answers the two biggest local-PPC unknowns (coverage + cost).
- **`CityText.tsx` — dynamic text replacement (message match).** Point a
  city-keyword ad at `…?city=Sandy` and the hero greets that parent by town.
  Renders the fallback on the server / first paint, then swaps in the sanitized
  `?city` in an effect — no hydration mismatch, no layout shift. Message match
  is the biggest lever in the CRO literature.

## Measurement / instrumentation

`LpAnalytics.tsx` (one per page) plus `track.ts` push a full funnel to
`window.dataLayer` — a harmless no-op until a GTM container or GA4 is added, at
which point every step is segmentable by `lp_variant`:

| event | fires when |
|---|---|
| `lp_view` | page view (`lp_variant`, `lp_name`) |
| `lp_scroll` | 25 / 50 / 75 / 100% depth |
| `lp_engaged_time` | on leave (`seconds`) |
| `lp_quiz_start` / `lp_quiz_answer` / `lp_quiz_complete` | quiz funnel (+ `result`) |
| `lp_keyboard_play` / `lp_keyboard_song_start` / `lp_keyboard_song_complete` | keyboard |
| `lp_areacheck_start` / `lp_areacheck_region` / `lp_areacheck_result` | area check |
| `lp_booking_view` | Calendly facade loads |
| `lp_cta_click` | any Book/Call click, with `source` (`hero`, `sticky_bar`, `quiz`, `keyboard`, `area_check`, `offer`, `call_link`, …) via one delegated listener |

So you can see *where* each angle engages people and which element drives the
booking — not just the final conversion (which Google Ads still records per-URL).

## Design / performance notes

- **Static shell + interactive islands.** The pages still prerender as static
  HTML (`○`); the hero/LCP is server-rendered with an eager `priority` image.
  The interactive modules are client components below the fold, so they add zero
  cost to first paint.
- **Calendly loads on scroll-proximity, not on paint.** `BookingEmbed.tsx` shows
  a branded, height-reserved placeholder and injects the heavy scheduler iframe
  via `IntersectionObserver` (600px rootMargin) — protecting LCP/INP with no
  extra click. Verified: no `iframe[src*=calendly]` exists until the booking
  section nears the viewport.
- **Accessibility:** quiz/keyboard/area-check are fully keyboard-operable (the
  keyboard even plays on the A–L row when focused), announce state via
  `aria-live`, and every reveal/animation is disabled under
  `prefers-reduced-motion` (see the `.lp-*` classes in `globals.css`).
- **Site chrome suppressed** on `/lp`; slim header + minimal footer + **sticky
  mobile CTA** with tap-to-call. **noindex/nofollow**, not in `sitemap.ts`.

## Honesty guardrails (do not "improve" these away)

CRO research strongly recommends a **safety-trust cluster** ("background-checked,
insured teachers") next to the CTA — it's the #1 objection for in-home
children's services and most competitors under-play it. We did **not** add it,
because we cannot verify those claims. **If the client confirms real credentials
(background checks, insurance, references), adding them by the CTA is likely the
single highest-impact next change.** Likewise, the area check shows a price
*range*, never an invented exact number, and never tells a parent we *don't*
serve them — only "book and we'll confirm your street."

## Adding another variant (C, D, …)

1. Create `lp/<your-slug>/page.tsx`.
2. Compose shared sections from `sections.tsx` + `ui.tsx`, drop in
   `<LpAnalytics variant="C" name="…" />`, and reuse the interactive modules
   (`AreaCheck`, `PlayableKeyboard`, `LearningStyleQuiz`) verbatim.
3. Write a distinct hero + section order for the new hypothesis. **Never fork the
   facts** — price/phone/reviews/FAQ all live in `lpData.ts`.
4. Point an ad or experiment arm at the new URL; it's instrumented automatically.
