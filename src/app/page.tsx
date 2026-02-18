import HeroSection from "./components/HeroSection";
import RotatingBanner from "./components/RotatingBanner";
import MethodSection from "./components/MethodSection";
import SkillsSection from "./components/SkillsSection";
import BrainSection from "./components/BrainSection";
import ResultsSection from "./components/ResultsSection";
import ScholarshipBanner from "./components/ScholarshipBanner";
import TestimonialsSection from "./components/TestimonialsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <RotatingBanner />
      <MethodSection />
      <SkillsSection />
      <BrainSection />
      <ResultsSection />
      <ScholarshipBanner />
      <TestimonialsSection />
    </main>
  );
}
