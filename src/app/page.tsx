import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MorningSection } from "@/components/MorningSection";
import { AfternoonSection } from "@/components/AfternoonSection";
import { EveningSection } from "@/components/EveningSection";
import { TerraceSection } from "@/components/TerraceSection";
import { MenuExplorer } from "@/components/MenuExplorer";
import { InfoSection } from "@/components/InfoSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MorningSection />
        <AfternoonSection />
        <EveningSection />
        <TerraceSection />
        <MenuExplorer />
        <InfoSection />
      </main>
      <Footer />
    </>
  );
}
