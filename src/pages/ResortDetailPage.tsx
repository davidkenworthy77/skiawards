import { motion } from "motion/react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { RESORTS } from "../constants";
import Footer from "../components/Footer";
import { ArrowLeft, Star, MapPin, Wind, CloudSnow, Navigation, MessageSquare, Calendar } from "lucide-react";
import { useEffect } from "react";

export default function ResortDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const resort = RESORTS.find((r) => r.slug === slug);

  useEffect(() => {
    if (!resort) {
      navigate("/");
    }
  }, [resort, navigate]);

  if (!resort) return null;

  const scoreCategories = [
    { label: "Terrain Variety", score: resort.terrainScore, icon: MapPin },
    { label: "Terrain Park", score: resort.parkScore, icon: Wind },
    { label: "Snow Quality", score: resort.snowQuality, icon: CloudSnow },
    { label: "Lift Efficiency", score: resort.liftEfficiency, icon: Navigation },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Sticky Header */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to Rankings</span>
          </Link>
          <div className="text-xs font-bold uppercase tracking-widest">{resort.name} — Detailed Report</div>
          <button className="px-6 py-2 bg-white text-black text-xs font-bold uppercase rounded-full hover:bg-white/90 transition-all">
            Book Now
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-end pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={resort.heroImage}
              alt={resort.name}
              className="w-full h-full object-cover opacity-50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          </div>

          {resort.openingDate && (
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: -12 }}
              transition={{ type: "spring", stiffness: 140, damping: 12, delay: 0.4 }}
              className="absolute top-24 right-6 md:right-16 z-20 pointer-events-none select-none"
            >
              <div className="relative flex flex-col items-center justify-center w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-black shadow-[0_0_60px_rgba(251,146,60,0.5)] border-4 border-white">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] opacity-70">Opening</span>
                <span className="text-3xl md:text-5xl font-black leading-none mt-1">{resort.openingDate.replace(/^Winter\s*/i, "")}</span>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] mt-1 opacity-70">Season</span>
              </div>
            </motion.div>
          )}
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <span className="px-4 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest">
                  Ranked #{resort.rank} Overall
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                {resort.hypeRank && (
                  <span className="px-4 py-1 bg-orange-500/20 backdrop-blur-md border border-orange-400/50 text-orange-200 rounded-full text-xs font-bold uppercase tracking-widest">
                    Hype Rank · Not Yet Open
                  </span>
                )}
              </div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">{resort.name}</h1>
              <p className="text-xl text-white/60 font-light max-w-2xl">{resort.description}</p>
            </motion.div>
          </div>
        </section>

        {/* Scores Breakdown */}
        <section className="py-24 px-6 border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {scoreCategories.map((cat, i) => (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 bg-white/5 rounded-3xl border border-white/10"
                >
                  <div className="flex items-center justify-between mb-6">
                    <cat.icon size={24} className="text-white/40" />
                    <span className="text-3xl font-mono font-bold">{cat.score}</span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">{cat.label}</p>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${cat.score}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-white"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats & Description */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-3xl font-bold mb-8">Resort Overview</h2>
              <div className="prose prose-invert max-w-none text-white/60 font-light leading-relaxed space-y-6">
                <p>
                  Experience the pinnacle of alpine riding at {resort.name}. Our 2026 evaluation highlights 
                  the resort's commitment to maintaining world-class standards across all categories. 
                  Whether you're hunting for deep powder in the back bowls or progressing in the 
                  award-winning terrain parks, {resort.name} delivers a consistent, high-performance experience.
                </p>
                <p>
                  The resort's infrastructure has seen significant investment over the last 24 months, 
                  resulting in a {resort.liftEfficiency}/100 lift efficiency score—one of the highest in our 
                  global database. This ensures that your time is spent on the slopes, not in the queues.
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8">
                {resort.stats && Object.entries(resort.stats).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-1">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-xl font-bold font-mono">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <MessageSquare size={28} className="text-white/40" />
                Rider Reviews
              </h2>
              <div className="space-y-8">
                {resort.reviews.map((review, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="p-8 bg-white/[0.02] rounded-3xl border border-white/5"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-bold text-lg">{review.user}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-yellow-400">
                            {[...Array(review.rating)].map((_, j) => (
                              <Star key={j} size={12} fill="currentColor" />
                            ))}
                          </div>
                          <div className="flex items-center gap-1 text-white/20 text-xs uppercase tracking-widest font-bold">
                            <Calendar size={12} />
                            {review.date}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-white/60 font-light leading-relaxed italic">"{review.comment}"</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="p-8 bg-white/5 rounded-3xl border border-dashed border-white/20 text-center">
                <p className="text-white/40 text-sm font-light mb-4">Have you visited {resort.name} recently?</p>
                <button className="text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
                  Submit Your Review
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Suggestion: Live Conditions (Mocked) */}
        <section className="py-24 px-6 bg-white text-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
              <div>
                <h2 className="text-4xl font-bold tracking-tight mb-2">Live Conditions</h2>
                <p className="text-black/40 font-light">Real-time data from {resort.name} summit station.</p>
              </div>
              <div className="text-right">
                <p className="text-6xl font-bold font-mono">24°F</p>
                <p className="text-xs font-bold uppercase tracking-widest text-black/40">Light Snow</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "24h Snow", value: "4 in" },
                { label: "Base Depth", value: "82 in" },
                { label: "Wind Speed", value: "12 mph" },
                { label: "Visibility", value: "Excellent" },
              ].map((stat, i) => (
                <div key={i} className="p-8 bg-[#f9f9f9] rounded-2xl border border-black/5">
                  <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold font-mono">{stat.value}</p>
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
