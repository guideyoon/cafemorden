import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import CTASection from "@/components/CTASection";
import SignatureSection from "@/components/SignatureSection";
import SpaceSection from "@/components/SpaceSection";
import TodayHours from "@/components/TodayHours";
import LocationSummary from "@/components/LocationSummary";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <CTASection />
      <TodayHours />
      <SignatureSection />
      <SpaceSection />
      <LocationSummary />
    </>
  );
}

