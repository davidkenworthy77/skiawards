import { motion } from "motion/react";
import Footer from "../components/Footer";
import Spotlight from "../components/Spotlight";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ShieldCheck, Zap } from "lucide-react";

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="text-xs font-bold uppercase tracking-widest">2026 Industry Report</div>
          <div className="w-24"></div> {/* Spacer */}
        </div>
      </nav>

      <main>
        {/* Editorial Header */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
             <img 
              src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2076&auto=format&fit=crop" 
              alt="Mountain Landscape"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/40 mb-6 block">Annual Publication</span>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-none">
                The Future of <br />
                <span className="italic font-light">Alpine Excellence</span>
              </h1>
              <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
                An in-depth analysis of the technological shifts, environmental challenges, 
                and design philosophies shaping the 2026 ski season.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="py-24 px-6 bg-white text-black">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px flex-1 bg-black/10"></div>
              <BookOpen size={24} className="text-black/20" />
              <div className="h-px flex-1 bg-black/10"></div>
            </div>
            
            <h2 className="text-3xl font-bold mb-8">Executive Summary</h2>
            <div className="space-y-6 text-lg text-black/70 font-light leading-relaxed">
              <p>
                The 2026 season marks a pivotal moment in mountain resort history. We are seeing a 
                divergence between traditional "heritage" resorts and a new class of "engineered" 
                destinations. While Whistler Blackcomb maintains its crown through sheer scale, 
                the emergence of Mirage Mountain signals a shift toward hyper-efficient, 
                tech-integrated mountain experiences.
              </p>
              <p>
                Infrastructure is no longer just about moving people uphill; it's about seamless 
                connectivity. The "Zero-Wait" philosophy pioneered by Mirage Mountain has forced 
                established players to accelerate their lift modernization programs by nearly a decade.
              </p>
            </div>
          </div>
        </section>

        {/* Mirage Mountain Deep Dive */}
        <Spotlight />

        {/* Future Outlook Section */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-8">2027 & Beyond: <br />What's Next?</h2>
                <div className="space-y-12">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <ShieldCheck size={24} className="text-white/40" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Climate Resilience</h3>
                      <p className="text-white/60 font-light">Resorts are investing billions in high-altitude snowmaking and terrain preservation to combat shorter seasons.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <Zap size={24} className="text-white/40" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Autonomous Operations</h3>
                      <p className="text-white/60 font-light">Mirage Mountain's fleet of autonomous groomers is just the beginning. Expect fully automated lift systems by 2028.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 rounded-3xl p-12 border border-white/10">
                <h3 className="text-2xl font-bold mb-6">Key Industry Metrics</h3>
                <div className="space-y-8">
                  {[
                    { label: "Global Skier Visits", value: "+4.2%", color: "bg-green-500" },
                    { label: "Infrastructure Spend", value: "$2.8B", color: "bg-blue-500" },
                    { label: "Average Lift Ticket", value: "$245", color: "bg-red-500" },
                    { label: "Sustainability Score", value: "82/100", color: "bg-emerald-500" },
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/40 uppercase tracking-widest font-bold">{stat.label}</span>
                        <span className="font-mono font-bold">{stat.value}</span>
                      </div>
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: '70%' }}
                          className={`h-full ${stat.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
