import type { Metadata } from "next";
import Link from "next/link";
import LandingPage, { LandingSection } from "@/app/components/landing/LandingPage";
import { SERVICE_AREAS } from "@/lib/areas";
import { OG_IMAGES } from "@/lib/site";
import { FAQS } from "@/app/lp/_components/lpData";

const TITLE = "Piano Teachers That Come to Your House in Utah | Volz Piano";
const DESCRIPTION =
  "Volz Method piano teachers drive to homes across Salt Lake, Utah and Davis counties. See every city we serve and book a free 15-minute call.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/areas-we-serve" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/areas-we-serve", type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const link = "font-semibold text-brand-ink underline underline-offset-2 hover:no-underline";

const FAQ_ITEMS = [
  {
    q: "Do piano teachers come to your house?",
    a: "Ours do. A Volz Method teacher drives to your home each week and teaches your child one-on-one at your own piano, so you never load up the car or sit in a waiting room.",
  },
  {
    q: "How do I know if you serve my city?",
    a: "Check the lists on this page. If your city isn't listed, book a free 15-minute call and we'll tell you right away whether a teacher can reach you.",
  },
  {
    q: "How much does an in-home piano teacher cost?",
    a: "Volz Method lessons are $29–$52 per half hour. Your exact price depends on your city and how many students are in your home, and multi-student discounts are available.",
  },
  {
    q: "Do I need a piano at home?",
    a: "Yes. Lessons happen on the piano or keyboard your child practices on all week. If you don't have one yet, see the digital piano setups our teachers recommend.",
  },
  ...FAQS.filter((f) => f.q === "Is there a contract?" || f.q === "What happens on the free call?").map((f) => ({
    q: f.q,
    a: f.a,
  })),
];

export default function AreasWeServePage() {
  return (
    <LandingPage
      path="/areas-we-serve"
      eyebrow="Areas we serve"
      title="Piano Teachers That Come to"
      highlight="Your House"
      intro="Volz Method teachers drive to homes across Salt Lake, Utah and Davis counties, plus Roy and Hooper in Weber County. Find your city below."
      crumbs={[{ name: "Areas we serve", href: "/areas-we-serve" }]}
      serviceName="In-home piano lessons in Utah"
      areaServed={[
        { type: "State", name: "Utah" },
        ...SERVICE_AREAS.map((a) => ({ type: "AdministrativeArea" as const, name: `${a.county}, Utah` })),
      ]}
      faqs={FAQ_ITEMS}
    >
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">Find your city</h2>
            <p className="mt-4 text-lg text-zinc-700">
              We hire teachers inside each of these areas, so the teacher who comes to your home usually lives nearby.
            </p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {SERVICE_AREAS.map((area) => (
              <div key={area.slug} className="flex flex-col rounded-3xl border border-zinc-200 bg-cream p-7">
                <h3 className="text-xl font-bold text-zinc-900">{area.county}</h3>
                <ul className="mt-4 flex-1 space-y-4">
                  {area.zones.map((zone) => (
                    <li key={zone.name}>
                      <p className="text-sm font-semibold uppercase tracking-wide text-zinc-600">{zone.name}</p>
                      <p className="mt-1 text-zinc-800">{zone.cities.join(", ")}</p>
                    </li>
                  ))}
                </ul>
                <Link href={`/${area.slug}`} className={`mt-6 ${link}`}>
                  Piano lessons in {area.county}
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-8 text-zinc-600">
            Not on the list? Teachers may still reach you.{" "}
            <Link href="/schedule-call" className={link}>
              Book a free call
            </Link>{" "}
            and we&rsquo;ll check.
          </p>
        </div>
      </section>

      <LandingSection heading="Why a teacher who comes to you" tone="cream">
        <p>
          Yes, piano teachers can come to your house, and for most families it changes everything about lessons.
          There&rsquo;s no drive across town, no waiting room, and no carpool to coordinate. Your child learns on the
          same piano they practice on every day, so what they work on in the lesson carries straight over to practice.
        </p>
        <p>
          Your child keeps the same teacher every week. Each teacher trains for three months in the Volz Method as
          they begin, and every lesson is shaped around how your child learns. Read more about the{" "}
          <Link href="/the-hidden-benefits-of-piano-lessons-in-your-own-home" className={link}>
            benefits of lessons in your own home
          </Link>{" "}
          or how in-home compares with{" "}
          <Link href="/in-home-piano-lessons-vs-online-why-in-person-wins-for-kids" className={link}>
            online lessons
          </Link>
          .
        </p>
        <p>
          Need an instrument first? Here are the{" "}
          <Link href="/digital-piano" className={link}>
            digital piano setups our teachers recommend
          </Link>
          .
        </p>
      </LandingSection>
    </LandingPage>
  );
}
