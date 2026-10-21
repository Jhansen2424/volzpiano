import type { Metadata } from "next";
import Link from "next/link";
import { getArea, SERVICE_AREAS, type ServiceArea } from "@/lib/areas";
import { OG_IMAGES } from "@/lib/site";
import { FAQS } from "@/app/lp/_components/lpData";
import LandingPage, { LandingSection } from "./LandingPage";

/** Shared questions every county page answers after its local ones. */
const SHARED_FAQ_QUESTIONS = [
  "Is there a contract?",
  "My child has never played piano. Is that okay?",
  "What happens on the free call?",
];

export function areaMetadata(slug: string): Metadata {
  const area = getArea(slug);
  const title = `${area.metaTitle} | Volz Piano`;
  return {
    title: { absolute: title },
    description: area.metaDescription,
    alternates: { canonical: `/${area.slug}` },
    openGraph: {
      title,
      description: area.metaDescription,
      url: `/${area.slug}`,
      type: "website",
      images: OG_IMAGES,
    },
    twitter: { card: "summary_large_image", title, description: area.metaDescription },
  };
}

export default function AreaPage({ slug }: { slug: string }) {
  const area: ServiceArea = getArea(slug);
  const cities = area.zones.flatMap((z) => z.cities);
  const faqs = [
    ...area.faqs,
    ...FAQS.filter((f) => SHARED_FAQ_QUESTIONS.includes(f.q)).map((f) => ({ q: f.q, a: f.a })),
  ];
  const nearby = area.nearby.map((s) => SERVICE_AREAS.find((a) => a.slug === s)!).filter(Boolean);

  return (
    <LandingPage
      path={`/${area.slug}`}
      eyebrow={`In-home lessons · ${area.label}`}
      title="In-Home Piano Lessons in"
      highlight={area.county}
      intro={area.heroLine}
      crumbs={[
        { name: "Areas we serve", href: "/areas-we-serve" },
        { name: area.label, href: `/${area.slug}` },
      ]}
      serviceName={`In-home piano lessons in ${area.county}, Utah`}
      areaServed={[
        { type: "AdministrativeArea", name: `${area.county}, Utah` },
        ...cities.map((c) => ({ type: "City" as const, name: `${c}, Utah` })),
      ]}
      faqs={faqs}
      faqHeading={`Piano lessons in ${area.county}: common questions`}
    >
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
              Where our teachers drive in {area.county}
            </h2>
            <p className="mt-4 text-lg text-zinc-700">
              A Volz Method teacher can come to your home in any of these {cities.length} cities.
            </p>
          </div>
          <div className={`mt-10 grid gap-6 ${area.zones.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
            {area.zones.map((zone) => (
              <div key={zone.name} className="rounded-3xl border border-zinc-200 bg-cream p-6">
                <h3 className="text-lg font-bold text-zinc-900">{zone.name}</h3>
                <ul className="mt-3 space-y-1.5 text-zinc-700">
                  {zone.cities.map((city) => (
                    <li key={city} className="flex items-center gap-2">
                      <svg className="h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 text-zinc-600">
            Live in {area.askAbout.slice(0, -1).join(", ")} or {area.askAbout.at(-1)}?{" "}
            <Link href="/schedule-call" className="font-semibold text-brand-ink underline underline-offset-2 hover:no-underline">
              Book a free call
            </Link>{" "}
            and we&rsquo;ll tell you right away whether a teacher can reach you.
          </p>
        </div>
      </section>

      <LandingSection heading={`What lessons look like in ${area.county}`} tone="cream">
        {area.local.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
        <p>
          Prefer the details first? See{" "}
          <Link href="/pricing" className="font-semibold text-brand-ink underline underline-offset-2 hover:no-underline">
            how lessons and pricing work
          </Link>
          , or browse{" "}
          <Link href="/areas-we-serve" className="font-semibold text-brand-ink underline underline-offset-2 hover:no-underline">
            every area we serve
          </Link>
          {nearby.length > 0 && (
            <>
              , including{" "}
              {nearby.map((n, i) => (
                <span key={n.slug}>
                  {i > 0 && " and "}
                  <Link href={`/${n.slug}`} className="font-semibold text-brand-ink underline underline-offset-2 hover:no-underline">
                    {n.county}
                  </Link>
                </span>
              ))}
            </>
          )}
          .
        </p>
      </LandingSection>
    </LandingPage>
  );
}
