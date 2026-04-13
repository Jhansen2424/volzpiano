import StubPage from "@/app/components/StubPage";

export default function JobsPage() {
  return (
    <StubPage
      badge="Careers"
      title="Teach With"
      highlight="Volz Piano"
      description="We hire dedicated piano teachers in each geographic area we serve. Every Volz Method teacher is trained for three months in the method before they teach their first lesson."
      primaryCta={{
        href: "https://docs.google.com/forms/d/e/1FAIpQLSeiYwH4ZX0-0hpnOf1nlrVFqLOXYim6GuzQu1Iq_05524850w/viewform",
        label: "Apply to Teach",
      }}
      body={
        <div className="text-center">
          <p className="text-zinc-600 leading-relaxed">
            Click the button below to fill out our teaching application. We
            review every submission and reach out when an opening matches your
            location and experience.
          </p>
        </div>
      }
    />
  );
}
