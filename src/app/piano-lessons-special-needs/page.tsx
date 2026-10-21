import type { Metadata } from "next";
import Link from "next/link";
import LandingPage, { LandingSection } from "@/app/components/landing/LandingPage";
import { SERVICE_AREAS } from "@/lib/areas";
import { OG_IMAGES } from "@/lib/site";
import { FAQS } from "@/app/lp/_components/lpData";

const TITLE = "Special Needs Piano Lessons for Kids in Utah | Volz Piano";
const DESCRIPTION =
  "One-on-one piano lessons at home for kids with autism, ADHD and sensory differences, with a teacher who adapts every lesson. In-home across Utah.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/piano-lessons-special-needs" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/piano-lessons-special-needs",
    type: "website",
    images: OG_IMAGES,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const link = "font-semibold text-brand-ink underline underline-offset-2 hover:no-underline";

const ADAPTATIONS = [
  {
    title: "Short, varied activities",
    body: "A 30-minute lesson moves between short tasks, so focus gets a reset before frustration sets in.",
  },
  {
    title: "A predictable routine",
    body: "The same teacher, the same day, the same kinds of activities in the same order, so your child knows what's coming.",
  },
  {
    title: "More than one way in",
    body: "If reading notes is hard, a child can start by ear or by composing. The four pillars give every learner a route.",
  },
  {
    title: "Music they choose",
    body: "Songs your child already loves turn focus from a fight into something they want to do.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Can autistic kids take piano lessons?",
    a: "Yes. Many children with autism enjoy piano, and one-on-one lessons at home, with a consistent teacher and routine, suit a lot of them well. Tell us about your child on the free call and we'll talk honestly about fit.",
  },
  {
    q: "Are piano lessons good for kids with ADHD?",
    a: "Research on music training and attention is promising but still early, and piano isn't a treatment. What lessons can offer is a structured, rewarding activity with quick feedback. Our guide to piano lessons for kids with ADHD goes deeper.",
  },
  {
    q: "Are your teachers music therapists?",
    a: "No. Our teachers are piano teachers, and lessons are music education, not therapy. Every teacher trains for three months in the Volz Method, which centers on adapting each lesson to how a child learns.",
  },
  {
    q: "Can I stay during lessons?",
    a: "Of course. Many parents stay nearby at first, especially while their child gets comfortable with a new teacher. You know your child best, and your teacher will want your input.",
  },
  ...FAQS.filter((f) => f.q === "Is there a contract?" || f.q === "What happens on the free call?").map((f) => ({
    q: f.q,
    a: f.a,
  })),
];

export default function SpecialNeedsPianoPage() {
  return (
    <LandingPage
      path="/piano-lessons-special-needs"
      eyebrow="Lessons that adapt"
      title="Piano Lessons for Kids with"
      highlight="Special Needs"
      intro="One-on-one lessons at home with a teacher who adapts every lesson to how your child learns, including children with autism, ADHD and sensory differences."
      crumbs={[{ name: "Special needs piano lessons", href: "/piano-lessons-special-needs" }]}
      serviceName="In-home piano lessons for children with special needs in Utah"
      areaServed={[
        { type: "State", name: "Utah" },
        ...SERVICE_AREAS.map((a) => ({ type: "AdministrativeArea" as const, name: `${a.county}, Utah` })),
      ]}
      faqs={FAQ_ITEMS}
      faqHeading="Adaptive piano lessons: common questions"
    >
      <LandingSection heading="Why lessons at home can help">
        <p>
          For a lot of children who learn differently, the setting matters as much as the teaching. At home there&rsquo;s
          no unfamiliar building, no waiting room and no drive after a long day. Your child plays on their own piano,
          in a room they know, with the same teacher every week.
        </p>
        <p>
          The Volz Method was built on the idea that there&rsquo;s no single right way to learn music. That same
          flexibility is what many children with autism, ADHD or sensory differences need from a teacher.
        </p>
      </LandingSection>

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="max-w-3xl text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            How teachers adapt a lesson
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {ADAPTATIONS.map((a) => (
              <li key={a.title} className="rounded-3xl border border-[#efe6d8] bg-white p-6">
                <h3 className="text-lg font-bold text-zinc-900">{a.title}</h3>
                <p className="mt-2 text-zinc-700">{a.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-lg text-zinc-700">
            Every child is different, so start with a conversation. On the free call, tell us what works for your child
            and what doesn&rsquo;t, and we&rsquo;ll be honest about whether we&rsquo;re a good fit. For more, read our{" "}
            <Link href="/piano-lessons-for-kids-with-adhd-parent-guide" className={link}>
              parent&rsquo;s guide to piano lessons for kids with ADHD
            </Link>
            .
          </p>
        </div>
      </section>
    </LandingPage>
  );
}
