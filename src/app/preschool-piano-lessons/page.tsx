import type { Metadata } from "next";
import Link from "next/link";
import LandingPage, { LandingSection } from "@/app/components/landing/LandingPage";
import { SERVICE_AREAS } from "@/lib/areas";
import { OG_IMAGES } from "@/lib/site";
import { FAQS } from "@/app/lp/_components/lpData";

const TITLE = "Piano Lessons for Preschoolers at Home in Utah | Volz Piano";
const DESCRIPTION =
  "Is 3 too early for piano? Not when lessons fit a 3-year-old. Short, playful in-home piano lessons for preschoolers in Utah. The teacher drives to you.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/preschool-piano-lessons" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/preschool-piano-lessons", type: "website", images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const link = "font-semibold text-brand-ink underline underline-offset-2 hover:no-underline";

const LESSON_PARTS = [
  { title: "Rhythm and movement", body: "Clapping, marching and tapping out beats, so rhythm lives in their body before it's on a page." },
  { title: "Finding their way around the keys", body: "Spotting the groups of black keys, finding C, and learning that low and high live on opposite ends." },
  { title: "Songs they already know", body: "Picking out simple tunes by ear, the start of the Hearing pillar, so they make real music fast." },
  { title: "Little bursts of focus", body: "The lesson moves between short activities, so a young attention span stays engaged the whole time." },
];

const FAQ_ITEMS = [
  {
    q: "Is 3 years old too early for piano lessons?",
    a: "Not when lessons are built for a 3-year-old. Most 3- and 4-year-olds aren't ready for formal, sit-still lessons, but short, playful lessons build rhythm, listening and finger coordination that pay off when structured lessons begin.",
  },
  {
    q: "Can a 2 year old start piano lessons?",
    a: "We usually suggest waiting until about 3. Until then, singing, dancing and banging out rhythms together at home is the best preparation, and it's free.",
  },
  {
    q: "How long are lessons for young kids?",
    a: "Lessons are 30 minutes, broken into short activities so a young child stays engaged. Your teacher reads your child's energy and switches gears when needed.",
  },
  {
    q: "Should I stay in the room?",
    a: "For the first few lessons with a young child, yes: being nearby helps them settle. Over time you can step back. Your teacher will guide you.",
  },
  ...FAQS.filter((f) => f.q === "Is there a contract?" || f.q === "What happens on the free call?").map((f) => ({
    q: f.q,
    a: f.a,
  })),
];

export default function PreschoolPianoPage() {
  return (
    <LandingPage
      path="/preschool-piano-lessons"
      eyebrow="Ages 3 to 5"
      title="Piano Lessons for"
      highlight="Preschoolers"
      intro="Short, playful lessons at home that build a real musical foundation for 3-, 4- and 5-year-olds. The teacher comes to you, so your little one learns somewhere familiar."
      crumbs={[{ name: "Preschool piano lessons", href: "/preschool-piano-lessons" }]}
      serviceName="In-home piano lessons for preschoolers in Utah"
      areaServed={[
        { type: "State", name: "Utah" },
        ...SERVICE_AREAS.map((a) => ({ type: "AdministrativeArea" as const, name: `${a.county}, Utah` })),
      ]}
      faqs={FAQ_ITEMS}
      faqHeading="Piano for preschoolers: common questions"
    >
      <LandingSection heading="Is 3 too early for piano?">
        <p>
          Not when the lessons fit a 3-year-old. Most 3- and 4-year-olds aren&rsquo;t ready for formal lessons:
          fingers are still developing, attention spans are short, and fine motor control is still on its way. But
          this is a golden window for building a musical foundation, and that&rsquo;s what preschool lessons are for.
        </p>
        <p>
          Around ages 5 to 6, most children are ready for more structured lessons, and the foundation they built
          early makes that step easier. For the full picture, read{" "}
          <Link href="/best-age-to-start-piano-lessons" className={link}>
            what is the best age to start piano lessons?
          </Link>
        </p>
      </LandingSection>

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="max-w-3xl text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            What a preschool lesson looks like
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {LESSON_PARTS.map((p) => (
              <li key={p.title} className="rounded-3xl border border-[#efe6d8] bg-white p-6">
                <h3 className="text-lg font-bold text-zinc-900">{p.title}</h3>
                <p className="mt-2 text-zinc-700">{p.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-lg text-zinc-700">
            Being at home helps, too: no new building, no waiting room, just a familiar room and their own piano.
            Wondering how much to be involved? See{" "}
            <Link href="/should-you-sit-in-on-your-childs-piano-lesson" className={link}>
              should you sit in on your child&rsquo;s piano lesson?
            </Link>
          </p>
        </div>
      </section>
    </LandingPage>
  );
}
