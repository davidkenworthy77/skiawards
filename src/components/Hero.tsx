import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Image/Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=2070&auto=format&fit=crop"
          alt="Snowy Mountain Peaks"
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#0a0a0a]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-semibold tracking-widest uppercase mb-4">
            #1 Overall — Whistler Blackcomb
          </span>
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tight leading-[0.9] mb-6">
            2026 Ski & Snowboard <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
              Resort Rankings
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Independent rankings based on terrain, snow quality, and rider experience. 
            Discover the elite destinations defining the future of mountain travel.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <Link 
            to="/rankings"
            className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
          >
            Explore Rankings
          </Link>
          <Link 
            to="/report"
            className="px-8 py-4 bg-transparent text-white font-semibold border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            View Full Report
          </Link>
        </motion.div>
      </div>


      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/40 cursor-pointer"
        onClick={() => {
          document.getElementById('rankings')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
