/**
 * Shared template for the organic SEO landing pages (service areas, Utah Fits
 * All, preschool, homeschool, special needs).
 *
 * It follows the blueprint in the approved landing-page plan:
 *   1. Hero: the place or audience, the promise, the proof, one action
 *   2. Trust strip
 *   3. The page's own content (children): the only section that changes from
 *      page to page, and what keeps these from being templated doorway pages
 *   4. How it works · 5. The Volz Method · 6. Pricing · testimonials
 *   7. FAQ (answers the questions Google shows for the page's search)
 *   8. Booking, plus a sticky booking button on phones
 *
 * Unlike the /lp pages (noindex, paid traffic, no site nav), these are
 * indexable and sit inside the normal site header and footer. They reuse the
 * /lp sections so facts, offer and conversion stay identical: every booking
 * goes through the same Calendly flow to /thank-you.
 *
 * Server component, no client JS beyond the lazy Calendly embed.
 */
import Link from "next/link";
import { serializeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";
import BookingEmbed from "@/app/lp/_components/BookingEmbed";
import { HowItWorks, OfferCard, Testimonials, TrustBar } from "@/app/lp/_components/sections";
import { BookButton, Stars } from "@/app/lp/_components/ui";
import { PRICE, PRICE_UNIT, RATING, REVIEW_COUNT } from "@/app/lp/_components/lpData";

export type Crumb = { name: string; href: string };
export type Faq = { q: string; a: string };

const PILLARS = [
  { letter: "R", title: "Reading", body: "Traditional sight-reading, taught to every student and emphasized for the kids who take to it." },
  { letter: "C", title: "Composing", body: "Writing original music — plus the patterns and theory that make music actually work." },
  { letter: "H", title: "Hearing", body: "Playing by ear, ear training, and recognizing chords and intervals." },
  { letter: "A", title: "Arranging", body: "Taking songs apart and putting them back together to make them their own." },
];

export default function LandingPage({
  path,
  eyebrow,
  title,
  highlight,
  intro,
  crumbs,
  serviceName,
  areaServed,
  faqs,
  faqHeading = "Questions parents ask us",
  children,
}: {
  /** Route path, e.g. "/piano-lessons-salt-lake-county". */
  path: string;
  eyebrow: string;
  title: string;
  /** Second line of the H1, shown in the accent color. */
  highlight?: string;
  intro: string;
  /** Breadcrumb trail AFTER Home, ending with this page. */
  crumbs: Crumb[];
  /** Service schema name, e.g. "In-home piano lessons in Salt Lake County". */
  serviceName: string;
  /** Places for the Service schema's areaServed. */
  areaServed: { type: "State" | "AdministrativeArea" | "City"; name: string }[];
  faqs: Faq[];
  faqHeading?: string;
  children: React.ReactNode;
}) {
  const url = `${SITE_URL}${path}`;
  const trail: Crumb[] = [{ name: "Home", href: "/" }, ...crumbs];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: serviceName,
      serviceType: "In-home piano lessons",
      url,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: areaServed.map((a) => ({ "@type": a.type, name: a.name })),
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "29",
        highPrice: "52",
        offerCount: "1",
        description: "Half-hour in-home piano lesson",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: trail.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: `${SITE_URL}${c.href === "/" ? "" : c.href}`,
      })),
    },
  ];

  return (
    <main>
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
      ))}

      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-zinc-900 pt-36 pb-20 sm:pt-40 sm:pb-24">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-72 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[120px]"
          style={{ background: "radial-gradient(circle, #6343d4 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/75">
            <ol className="flex flex-wrap items-center justify-center gap-2">
              {trail.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i === trail.length - 1 ? (
                    <span aria-current="page" className="text-white">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={c.href} className="underline-offset-2 hover:underline">
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <span className="inline-block rounded-full bg-accent/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-accent-light">
            {eyebrow}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            {title}
            {highlight && (
              <>
                {" "}
                <span className="text-accent-light">{highlight}</span>
              </>
            )}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75 sm:text-xl">{intro}</p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <BookButton label="Book a Free 15-Min Call" source="seo_hero" />
            <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-white/75">
              <span className="inline-flex items-center gap-1.5">
                <Stars className="h-4 w-4" />
                {RATING} from {REVIEW_COUNT} Google reviews
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {PRICE} {PRICE_UNIT}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* 2. Trust strip */}
      <TrustBar />

      {/* 3. The page's own content */}
      {children}

      {/* 4. How it works */}
      <HowItWorks />

      {/* 5. The Volz Method */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
              Four ways to learn, shaped around your child
            </h2>
            <p className="mt-4 text-zinc-600">
              Every child learns music differently. Volz Method teachers work with all four pillars and lean into the
              ones your child takes to, so lessons build on their strengths.
            </p>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <li key={p.title} className="rounded-3xl border border-zinc-200 bg-cream p-6">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-lg font-extrabold text-white"
                >
                  {p.letter}
                </span>
                <h3 className="mt-4 text-lg font-bold text-zinc-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{p.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center">
            <Link
              href="/volz-method-best-piano-teaching-medthod"
              className="font-semibold text-brand-ink underline underline-offset-2 hover:no-underline"
            >
              See how the Volz Method works
            </Link>
          </p>
        </div>
      </section>

      {/* 6. Pricing */}
      <OfferCard />

      <Testimonials heading="What Volz families say" />

      {/* 7. FAQ */}
      <section className="bg-blush py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            {faqHeading}
          </h2>
          <div className="divide-y divide-[#efe1d2] rounded-3xl border border-[#efe1d2] bg-white shadow-warm">
            {faqs.map((f) => (
              <details key={f.q} className="group px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-zinc-900 marker:content-[''] [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base">{f.q}</h3>
                  <svg
                    className="h-5 w-5 shrink-0 text-accent transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
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

      {/* 8. Booking */}
      <section id="book" className="lp-plum relative scroll-mt-28 overflow-hidden py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand">The next step</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Book your free 15-minute call
            </h2>
            <p className="mt-4 text-white/75">
              Pick a time below. We&rsquo;ll answer your questions, give you an exact price for your area, and, if
              you&rsquo;re ready, match your child with a teacher. No pressure either way.
            </p>
          </div>
          <BookingEmbed height={820} />
        </div>
      </section>

      {/* Sticky booking button on phones */}
      <aside
        aria-label="Book a free call"
        data-sticky-cta
        className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-zinc-900/95 p-3 backdrop-blur sm:hidden"
      >
        <a
          href="#book"
          data-cta="seo_sticky"
          className="flex w-full items-center justify-center rounded-full bg-cta py-3 text-base font-bold text-white"
        >
          Book a Free 15-Min Call
        </a>
      </aside>
    </main>
  );
}

/** A simple content section for a landing page's own material (section 3). */
export function LandingSection({
  heading,
  children,
  tone = "white",
}: {
  heading: string;
  children: React.ReactNode;
  tone?: "white" | "cream";
}) {
  return (
    <section className={`${tone === "cream" ? "bg-cream" : "bg-white"} py-16 sm:py-24`}>
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">{heading}</h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-zinc-700">{children}</div>
      </div>
    </section>
  );
}
