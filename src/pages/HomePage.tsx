import Hero from "../components/Hero";
import RankingsTable from "../components/RankingsTable";
import Awards from "../components/Awards";
import Spotlight from "../components/Spotlight";
import Comparison from "../components/Comparison";
import Footer from "../components/Footer";

export default function HomePage() {
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
