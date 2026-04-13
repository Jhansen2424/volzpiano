import StubPage from "@/app/components/StubPage";

export default function ShopPage() {
  return (
    <StubPage
      badge="Shop"
      title="Recommended"
      highlight="Digital Pianos"
      description="We&rsquo;ve curated the best digital piano setups for at-home practice — fully weighted keys, sustain pedal, stand, and bench. See them on our Digital Piano page."
      primaryCta={{ href: "/digital-piano", label: "View Recommendations" }}
      body={
        <div className="text-center">
          <p className="text-zinc-600 leading-relaxed">
            We don&rsquo;t sell instruments directly — we point you to the
            exact gear our teachers recommend, so you can buy it from a
            trusted retailer.
          </p>
        </div>
      }
    />
  );
}
