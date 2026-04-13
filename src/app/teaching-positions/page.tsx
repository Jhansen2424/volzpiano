import StubPage from "@/app/components/StubPage";

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
      body={
        <div>
          <h2 className="text-xl font-bold text-zinc-900 mb-4">What we look for</h2>
          <ul className="space-y-2 text-zinc-600 leading-relaxed list-disc pl-6">
            <li>Strong musicianship and at least intermediate piano skills</li>
            <li>Genuine love of working with children</li>
            <li>Reliable transportation (you&rsquo;ll drive to students&rsquo; homes)</li>
            <li>Patience, adaptability, and a growth mindset</li>
          </ul>
          <p className="text-zinc-600 leading-relaxed mt-6">
            Click the button below to fill out our teaching application. We
            review every submission and reach out as openings come up in your
            area.
          </p>
        </div>
      }
    />
  );
}
