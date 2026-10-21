import type { Metadata } from "next";
import Link from "next/link";
import LandingPage, { LandingSection } from "@/app/components/landing/LandingPage";
import { SERVICE_AREAS } from "@/lib/areas";
import { OG_IMAGES } from "@/lib/site";
import { FAQS } from "@/app/lp/_components/lpData";

const TITLE = "Homeschool Piano Lessons in Utah, at Home | Volz Piano";
const DESCRIPTION =
  "In-home piano lessons that fit your homeschool day: daytime slots, one-on-one teaching, and the Utah Fits All Scholarship accepted. The teacher drives to you.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/homeschool-piano-lessons-utah" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/homeschool-piano-lessons-utah",
    type: "website",
    images: OG_IMAGES,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const link = "font-semibold text-brand-ink underline underline-offset-2 hover:no-underline";

const OPTIONS = [
  {
    title: "Co-op or group classes",
    body: "Social and affordable, but the group sets the pace, and one teacher splitting attention across many kids can't tailor much to your child.",
  },
  {
    title: "Online lessons",
    body: "Convenient, but for younger children a screen struggles with hand position, playing together and holding attention.",
  },
  {
    title: "In-home private lessons",
    body: "A dedicated teacher comes to you and works one-on-one at your own piano, adapting every lesson to your child. Fully individualized, with no driving.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Do you get money for homeschooling your kids in Utah?",
    a: "Many Utah homeschool families use the Utah Fits All Scholarship, a state program for approved education expenses. Volz Method accepts it. Eligibility and approved expenses are set by the program each year, so confirm the current rules in your account on the official portal.",
  },
  {
    q: "Can piano count toward our homeschool curriculum?",
    a: "Many homeschool families count piano toward fine arts, music or electives, and a weekly lesson plus practice is easy to document. How it fits depends on your framework, so confirm the specifics for your setup.",
  },
  {
    q: "Are daytime lessons available?",
    a: "Often, yes. Homeschool families aren't competing for the crowded after-school slots, so a mid-morning or early-afternoon time is frequently open. Ask about your preferred times on the free call.",
  },
  {
    q: "We have several kids. How does that work?",
    a: "Siblings can take lessons back-to-back in one visit, and multi-student discounts apply. Lessons are $29–$52 per half hour depending on your city and number of students.",
  },
  ...FAQS.filter((f) => f.q === "Is there a contract?" || f.q === "What happens on the free call?").map((f) => ({
    q: f.q,
    a: f.a,
  })),
];

export default function HomeschoolPianoPage() {
  return (
    <LandingPage
      path="/homeschool-piano-lessons-utah"
      eyebrow="For homeschool families"
      title="Homeschool Piano Lessons"
      highlight="in Utah"
      intro="One-on-one lessons at home that slot into your school day like any other subject, with a curriculum built on four pillars. We accept the Utah Fits All Scholarship."
      crumbs={[{ name: "Homeschool piano lessons", href: "/homeschool-piano-lessons-utah" }]}
      serviceName="In-home piano lessons for homeschool families in Utah"
      areaServed={[
        { type: "State", name: "Utah" },
        ...SERVICE_AREAS.map((a) => ({ type: "AdministrativeArea" as const, name: `${a.county}, Utah` })),
      ]}
      faqs={FAQ_ITEMS}
      faqHeading="Homeschool piano lessons: common questions"
    >
      <LandingSection heading="Piano fits the way you already homeschool">
        <p>
          Homeschooling is built around flexibility, individual pace and learning that sticks, and piano checks every
          box. It builds focus, patience, pattern recognition and creative expression in one subject. Best of all, it
          can happen when your child is fresh and the house is calm, not squeezed into a tired evening.
        </p>
        <p>
          A Volz Method teacher arrives at your scheduled time, works one-on-one with your child for a focused half
          hour, and leaves a specific practice plan for the week. Your child keeps the same teacher every week, and the
          four pillars (reading, composing, hearing and arranging) give them a complete musical education, not just a
          few memorized songs.
        </p>
      </LandingSection>

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="max-w-3xl text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            In-home, co-op or online?
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {OPTIONS.map((o) => (
              <li key={o.title} className="rounded-3xl border border-[#efe6d8] bg-white p-6">
                <h3 className="text-lg font-bold text-zinc-900">{o.title}</h3>
                <p className="mt-2 text-zinc-700">{o.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-lg text-zinc-700">
            Paying with a scholarship? See{" "}
            <Link href="/utah-fits-all-piano-lessons" className={link}>
              how to use Utah Fits All for piano lessons
            </Link>
            . Choosing when to start? Read about{" "}
            <Link href="/best-age-to-start-piano-lessons" className={link}>
              the best age to start piano
            </Link>
            .
          </p>
        </div>
      </section>
    </LandingPage>
  );
}
