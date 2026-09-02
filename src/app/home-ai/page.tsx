import type { Metadata } from "next";
import HeroSection from "../components/HeroSection";
import RotatingBanner from "../components/RotatingBanner";
import MethodSection from "../components/MethodSection";
import SkillsSection from "../components/SkillsSection";
import BrainSection from "../components/BrainSection";
import ResultsSection from "../components/ResultsSection";
import InteractiveKeyboard from "../components/InteractiveKeyboard";
import ScholarshipBanner from "../components/ScholarshipBanner";
import TestimonialsSection from "../components/TestimonialsSection";
import ChatWidget from "../components/ChatWidget";

/**
 * A duplicate of the homepage with the AI chat assistant mounted, for
 * previewing/testing the assistant before it goes on the live homepage.
 *
 * noindex + canonical to "/" so this copy never competes with the real
 * homepage for duplicate content.
 */
export const metadata: Metadata = {
  title: "Volz Method Piano Lessons",
  alternates: { canonical: "/" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function HomeWithAssistant() {
  return (
    <main>
      <HeroSection />
      <RotatingBanner />
      <MethodSection />
      <SkillsSection />
      <BrainSection />
      <ResultsSection />
      <InteractiveKeyboard />
      <ScholarshipBanner />
      <TestimonialsSection />
      {/* AI assistant — fixed/floating; guides visitors to book the free call */}
      <ChatWidget />
    </main>
  );
}
