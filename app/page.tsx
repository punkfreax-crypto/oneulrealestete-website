import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WhySection from "@/components/sections/WhySection";
import ServicesSection from "@/components/sections/ServicesSection";
import BranchesSection from "@/components/sections/BranchesSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import CtaSection from "@/components/sections/CtaSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <WhySection />
        <ServicesSection />
        <BranchesSection />
        <ReviewsSection />
        <ContactSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
