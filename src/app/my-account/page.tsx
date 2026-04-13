import StubPage from "@/app/components/StubPage";

export default function MyAccountPage() {
  return (
    <StubPage
      badge="My Account"
      title="Student"
      highlight="Portal"
      description="Sign in to access your lesson materials, track progress, and stay connected with your Volz Piano instructor."
      primaryCta={{ href: "/student-portal", label: "Go to Student Portal" }}
    />
  );
}
