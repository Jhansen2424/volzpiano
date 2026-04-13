import StubPage from "@/app/components/StubPage";

export default function CartPage() {
  return (
    <StubPage
      badge="Cart"
      title="Your"
      highlight="Cart"
      description="We don&rsquo;t sell products directly through our website. Check out our recommended digital piano setups instead — we link straight to a trusted retailer."
      primaryCta={{ href: "/digital-piano", label: "See Recommendations" }}
    />
  );
}
