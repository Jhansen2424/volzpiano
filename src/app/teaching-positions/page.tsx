import StubPage from "@/app/components/StubPage";
import MusicNotesHero from "./MusicNotesHero";

const openPositions = [
  {
    title: "In-Home Piano Teacher",
    pay: "$35–$45 per hour (while teaching)",
    cities: ["Sandy", "Draper", "Cottonwood Heights", "Midvale"],
    employmentType: "Part-time, 1099 contractor",
  },
  {
    title: "Experienced In-Home Piano Teacher",
    pay: "$40–$45 per hour (while teaching)",
    cities: ["Sandy", "Draper", "Midvale", "Cottonwood Heights"],
    employmentType: "Part-time, 1099 contractor",
  },
];

export default function TeachingPositionsPage() {
  return (
    <StubPage
      badge="Teaching Positions"
      title="Become a"
      highlight="Volz Piano Teacher"
      description="We hire dedicated piano teachers across Utah and Idaho. Every teacher is trained for three months in the Volz Method before they ever teach a single lesson."
      primaryCta={{
        href: "https://docs.google.com/forms/d/e/1FAIpQLSeiYwH4ZX0-0hpnOf1nlrVFqLOXYim6GuzQu1Iq_05524850w/viewform",
        label: "Apply to Teach",
      }}
      heroBackground={<MusicNotesHero />}
      body={
        <div>
          {/* Open Positions */}
          <h2 className="mb-4 text-xl font-bold text-zinc-900">
            Open Positions
          </h2>
          <div className="space-y-4">
            {openPositions.map((pos) => (
              <div
                key={pos.title}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
                    Now Hiring
                  </span>
                  <span className="text-xs text-zinc-500">
                    {pos.employmentType}
                  </span>
                </div>
                <h3 className="mb-3 text-lg font-extrabold text-zinc-900">
                  {pos.title}
                </h3>
                <dl className="space-y-2 text-sm text-zinc-600">
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-semibold text-zinc-900">Pay:</dt>
                    <dd>{pos.pay}</dd>
                  </div>
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-semibold text-zinc-900">Cities:</dt>
                    <dd>{pos.cities.join(", ")}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          {/* What we look for */}
          <h2 className="mt-10 mb-4 text-xl font-bold text-zinc-900">
            What we look for
          </h2>
          <ul className="list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
            <li>Strong musicianship and at least intermediate piano skills</li>
            <li>Genuine love of working with children</li>
            <li>Reliable transportation (you&rsquo;ll drive to students&rsquo; homes)</li>
            <li>Patience, adaptability, and a growth mindset</li>
          </ul>
          <p className="mt-6 leading-relaxed text-zinc-600">
            Click the button below to fill out our teaching application. We
            review every submission and reach out as openings come up in your
            area.
          </p>
        </div>
      }
    />
  );
}
