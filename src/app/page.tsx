import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MorningSection } from "@/components/MorningSection";
import { AfternoonSection } from "@/components/AfternoonSection";
import { EveningSection } from "@/components/EveningSection";
import { FoodShowcase } from "@/components/FoodShowcase";
import { TerraceSection } from "@/components/TerraceSection";
import { MenuExplorer } from "@/components/MenuExplorer";
import { InfoSection } from "@/components/InfoSection";
import { Footer } from "@/components/Footer";
import { ScrollUrlTracker } from "@/components/ScrollUrlTracker";

export default function Home() {
  return (
    <>
      <ScrollUrlTracker />
      <Navbar />
      <main>
        <Hero />
        <MorningSection />
        <AfternoonSection />
        <EveningSection />
        <FoodShowcase />
        <TerraceSection />
        <MenuExplorer />
        <InfoSection />
      </main>
      <Footer />
    </>
  );
}
