import StubPage from "@/app/components/StubPage";

export default function ContactUsPage() {
  return (
    <StubPage
      badge="Contact"
      title="Let&rsquo;s Talk About"
      highlight="Piano Lessons"
      description="The fastest way to reach us is to schedule a free 15-minute phone consultation. We&rsquo;ll answer your questions, give you an exact price for your area, and — if you&rsquo;re ready — sign your child up."
      primaryCta={{ href: "/schedule-call", label: "Schedule a Free Call" }}
      body={
        <div className="text-center">
          <p className="text-zinc-600 leading-relaxed">
            Prefer email? Reach us at{" "}
            <a
              href="mailto:support@volzpiano.com"
              className="font-semibold text-accent hover:underline"
            >
              support@volzpiano.com
            </a>
            .
          </p>
        </div>
      }
    />
  );
}
