import { motion } from "motion/react";
import { RESORTS } from "../constants";
import { CheckCircle2 } from "lucide-react";

export default function Spotlight() {
  const mirage = RESORTS.find(r => r.name === "Mirage Mountain") || RESORTS[0];

  return (
    <section className="relative py-24 px-4 bg-[#0a0a0a] overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/[0.02] -skew-x-12 translate-x-1/4 z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-6 block">
              Featured Resort
            </span>
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
              Mirage Mountain
            </h2>
            <p className="text-xl text-white/60 font-light leading-relaxed mb-10">
              {mirage.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
              {Object.entries(mirage.stats!).map(([key, value], i) => (
                <div key={key}>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-2xl font-bold text-white font-mono">{value}</p>
                </div>
              ))}
            </div>

            <ul className="space-y-4">
              {[
                "Seamless lift connectivity (minimal wait times)",
                "Balanced terrain for all skill levels",
                "Advanced park design",
                "Reliable powder conditions"
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-white/80"
                >
                  <CheckCircle2 size={18} className="text-white/40" />
                  <span className="font-light">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop"
              alt="Mirage Mountain Slopes"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-10 left-10">
              <p className="text-white text-sm font-medium tracking-widest uppercase mb-2">The Peak Experience</p>
              <p className="text-white/60 text-xs font-light">Elevation: 12,400 ft</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
