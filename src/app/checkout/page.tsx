import StubPage from "@/app/components/StubPage";

export default function CheckoutPage() {
  return (
    <StubPage
      badge="Checkout"
      title="Sign Up for"
      highlight="Lessons"
      description="To enroll your child in piano lessons, schedule a free 15-minute phone consultation. We&rsquo;ll get you an exact price for your area and sign you up on the call."
      primaryCta={{ href: "/schedule-call", label: "Schedule a Call" }}
    />
  );
}
