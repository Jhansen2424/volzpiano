import type { Metadata } from "next";
import Link from "next/link";
import LandingPage, { LandingSection } from "@/app/components/landing/LandingPage";
import { SERVICE_AREAS } from "@/lib/areas";
import { OG_IMAGES } from "@/lib/site";

const TITLE = "Utah Fits All Scholarship Piano Lessons | Volz Piano";
const DESCRIPTION =
  "Volz Method accepts the Utah Fits All Scholarship for in-home piano lessons. How to use your scholarship for lessons, step by step, and what to check first.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/utah-fits-all-piano-lessons" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/utah-fits-all-piano-lessons",
    type: "website",
    images: OG_IMAGES,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const link = "font-semibold text-brand-ink underline underline-offset-2 hover:no-underline";

// Reviewed October 2026. Program rules, deadlines and legal status can change:
// re-check the official portal and update REVIEWED when you do.
const REVIEWED = "October 2026";

const STEPS = [
  {
    title: "Check your scholarship status",
    body: "Log in to the program's official portal to confirm your child's scholarship, your available funds, and this year's rules for approved expenses.",
  },
  {
    title: "Book a free 15-minute call",
    body: "Tell us you're using Utah Fits All. We'll answer your questions and give you an exact price for your area.",
  },
  {
    title: "We help with what you need",
    body: "We'll walk you through the steps for paying for lessons with your scholarship, so you're not sorting it out alone.",
  },
  {
    title: "Lessons start at home",
    body: "Your teacher drives to your house each week. Same teacher, month-to-month, tailored to how your child learns.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Can I use the Utah Fits All Scholarship for piano lessons?",
    a: "Volz Method accepts the Utah Fits All Scholarship. What your family can use funds for is set by the program each year, so check your account on the official portal, then mention the scholarship on your free call and we'll help with the rest.",
  },
  {
    q: "Do you get money for homeschooling your kids in Utah?",
    a: "Utah Fits All is a state scholarship that eligible Utah students, including many homeschool families, can use for approved education expenses. Eligibility, amounts and deadlines are set by the program, so the official portal is the place to confirm what applies to your family.",
  },
  {
    q: "What if I missed this year's application window?",
    a: "You can still start lessons and pay directly. Check the official portal for future application dates; if your child receives a scholarship later, let us know.",
  },
  {
    q: "How much do lessons cost?",
    a: "Lessons are $29–$52 per half hour, depending on your city and how many students are in your home. Multi-student discounts are available.",
  },
  {
    q: "Is the program going to continue?",
    a: "The Utah Fits All program has faced a legal challenge, and its future depends on the courts and the legislature. We'll keep accepting it while it runs. Check the official portal for its current status.",
  },
];

export default function UtahFitsAllPage() {
  return (
    <LandingPage
      path="/utah-fits-all-piano-lessons"
      eyebrow="Utah Fits All Scholarship"
      title="Piano Lessons with the"
      highlight="Utah Fits All Scholarship"
      intro="Volz Method accepts the Utah Fits All Scholarship. If your child has a scholarship, you may be able to put it toward in-home piano lessons with a teacher who comes to your house."
      crumbs={[{ name: "Utah Fits All Scholarship", href: "/utah-fits-all-piano-lessons" }]}
      serviceName="In-home piano lessons with the Utah Fits All Scholarship"
      areaServed={[
        { type: "State", name: "Utah" },
        ...SERVICE_AREAS.map((a) => ({ type: "AdministrativeArea" as const, name: `${a.county}, Utah` })),
      ]}
      faqs={FAQ_ITEMS}
      faqHeading="Utah Fits All and piano lessons: common questions"
    >
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="max-w-3xl text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            How to use your scholarship for piano lessons
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-3xl border border-zinc-200 bg-cream p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold text-zinc-900">{s.title}</h3>
                <p className="mt-2 text-zinc-700">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <LandingSection heading="What to check before you start" tone="cream">
        <p>
          Utah Fits All is a state program, and its rules belong to the program, not to us. Eligibility, the amount
          available, deadlines and the list of approved expenses can change from year to year. Before you count on
          scholarship funds for lessons, confirm the current details in your account on the program&rsquo;s official
          portal, run by its program manager,{" "}
          <a href="https://support.withodyssey.com/hc/en-us" className={link} rel="noopener noreferrer" target="_blank">
            Odyssey<span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
        <p>
          Homeschool families often use the scholarship for lessons during the school day, when daytime slots are
          easier to find. See our page on{" "}
          <Link href="/homeschool-piano-lessons-utah" className={link}>
            homeschool piano lessons
          </Link>
          , and our{" "}
          <Link href="/how-to-afford-piano-lessons-in-utah-scholarships-and-budgeting" className={link}>
            guide to affording piano lessons in Utah
          </Link>{" "}
          for other ways to budget.
        </p>
        <p className="text-base text-zinc-600">Information on this page was last reviewed in {REVIEWED}.</p>
      </LandingSection>
    </LandingPage>
  );
}
