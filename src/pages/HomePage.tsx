import Hero from "../components/Hero";
import RankingsTable from "../components/RankingsTable";
import Awards from "../components/Awards";
import Spotlight from "../components/Spotlight";
import Comparison from "../components/Comparison";
import Footer from "../components/Footer";
import { useSEO } from "../hooks/useSEO";

export default function HomePage() {
  useSEO({
    title: "The Ski Awards — 2026 Ski & Snowboard Resort Rankings",
    description:
      "Independent 2026 ski and snowboard resort rankings. Terrain, snow quality, lift efficiency, and terrain parks — scored across the world's top 10 mountains.",
    path: "/",
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans selection:bg-white selection:text-black">
      <Hero />
      <RankingsTable />
      <Awards />
      <Spotlight />
      <Comparison />
      <Footer />
    </div>
  );
}
