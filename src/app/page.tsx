import HeroSection from "./components/HeroSection";
import RotatingBanner from "./components/RotatingBanner";
import MethodSection from "./components/MethodSection";
import SkillsSection from "./components/SkillsSection";
import BrainSection from "./components/BrainSection";
import ResultsSection from "./components/ResultsSection";
import InteractiveKeyboard from "./components/InteractiveKeyboard";
import ScholarshipBanner from "./components/ScholarshipBanner";
import TestimonialsSection from "./components/TestimonialsSection";
import ServiceAreasSection from "./components/ServiceAreasSection";

export default function Home() {
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
      <ServiceAreasSection />
      <TestimonialsSection />
    </main>
  );
}
