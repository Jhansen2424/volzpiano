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

## How conversions are attributed to a variant

- **In Google Ads:** the experiment arm (or the ad/URL) each records its own
  conversions — this is the primary, reliable signal. No code needed.
- **In GTM/GA (optional):** each page pushes a `dataLayer` event on view:
  `{ event: 'lp_view', lp_variant: 'A'|'B', lp_name: '…' }`. If a GTM container
  or GA4 is added later, you can segment by `lp_variant`. (GA4 is not currently
  installed — see the site review.)

## Design / performance notes

- **Zero custom client JS.** Sections are server components; the FAQ is a native
  `<details>` accordion; the Calendly embed is a native `loading="lazy"`
  iframe; all CTAs are anchor (`#book`) / `tel:` links. Fast load = better Ads
  Quality Score and lower bounce.
- **Site chrome is suppressed** on `/lp` (see the early-return guards in
  `components/Navbar.tsx` and `components/Footer.tsx`). Landing pages render
  their own slim header + minimal footer via `lp/layout.tsx`.
- **Sticky mobile CTA bar** ("Book Free Call" + tap-to-call) — most paid
  traffic is mobile and the conversion is a phone consult.
- **noindex/nofollow** is set for the whole `/lp` route group in `lp/layout.tsx`.
  They are not in `sitemap.ts`.

## Adding another variant (C, D, …)

1. Create `lp/<your-slug>/page.tsx`.
2. Import and compose the shared pieces from `lp/_components/sections.tsx`
   (`TrustBar`, `HowItWorks`, `OfferCard`, `Testimonials`, `Faq`,
   `BookingSection`) plus `ui.tsx` (`BookButton`, `CallLink`, `Stars`).
3. Write a distinct hero + section order for your new hypothesis. **Never fork
   the facts** — price, phone, reviews, and FAQ all live in
   `lp/_components/lpData.ts` so every variant stays consistent.
4. Give it a unique `dataLayer` `lp_variant` / `lp_name`, then point an ad or
   experiment arm at the new URL.
