import { motion } from "motion/react";
import RankingsTable from "../components/RankingsTable";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, Filter, BarChart3, Globe } from "lucide-react";

export default function RankingsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="text-xs font-bold uppercase tracking-widest">2026 Rankings Explorer</div>
          <div className="w-24"></div> {/* Spacer */}
        </div>
      </nav>

      <main>
        {/* Header Section */}
        <section className="py-20 px-6 border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
            >
              Deep Dive: <br />
              <span className="text-white/40">The 2026 Leaderboard</span>
            </motion.h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/40">
                  <Filter size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">Methodology</span>
                </div>
                <p className="text-white/60 font-light leading-relaxed">
                  Our proprietary algorithm weights terrain variety (30%), snow consistency (25%), 
                  lift infrastructure (20%), and freestyle facilities (25%) to determine the definitive ranking.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/40">
                  <BarChart3 size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">Data Points</span>
                </div>
                <p className="text-white/60 font-light leading-relaxed">
                  Over 1.2 million rider check-ins and 450 independent terrain audits were conducted 
                  across 85 resorts globally to ensure statistical significance.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/40">
                  <Globe size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">Regional Focus</span>
                </div>
                <p className="text-white/60 font-light leading-relaxed">
                  While North America dominates the top 10, the 2026 report sees a significant 
                  rise in Japanese and European alpine infrastructure investments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Rankings Table */}
        <RankingsTable />

        {/* Additional Content: Regional Breakdowns */}
        <section className="py-24 px-6 bg-white text-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12">Regional Power Rankings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { region: "Pacific Northwest", leader: "Whistler Blackcomb", trend: "+2.4%" },
                { region: "Rocky Mountains", leader: "Jackson Hole", trend: "+1.8%" },
                { region: "Wasatch Range", leader: "Snowbird", trend: "+3.1%" },
                { region: "Sierra Nevada", leader: "Mammoth Mountain", trend: "-0.5%" },
              ].map((item, i) => (
                <div key={i} className="p-8 bg-[#f9f9f9] rounded-2xl border border-black/5">
                  <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-2">{item.region}</p>
                  <p className="text-xl font-bold mb-4">{item.leader}</p>
                  <div className="flex items-center gap-2 text-sm font-mono">
                    <span className={item.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}>{item.trend}</span>
                    <span className="text-black/40">vs 2025</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
