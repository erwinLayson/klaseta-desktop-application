import { Navbar } from "../components/landing/Navbar";
import { HeroSection } from "../components/landing/HeroSection";
import { FeaturesSection } from "../components/landing/FeaturesSection";
import { HowItWorksSection } from "../components/landing/HowItWorksSection";
import { ShowcaseSection } from "../components/landing/ShowcaseSection";
import { BenefitsSection } from "../components/landing/BenefitsSection";
import { CtaSection } from "../components/landing/CtaSection";
import { Footer } from "../components/landing/Footer";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FBFDFD] text-[#3C4044]">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ShowcaseSection />
        <BenefitsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
