import { motion } from "motion/react";
import { Check, X } from "lucide-react";

const COMPARISON_DATA = [
  { metric: "Terrain Variety", mirage: "Elite", snowbird: "High", jackson: "High" },
  { metric: "Snowfall", mirage: "600 in", snowbird: "500 in", jackson: "450 in" },
  { metric: "Lift Wait Time", mirage: "< 2 min", snowbird: "5-10 min", jackson: "5-10 min" },
  { metric: "Park Quality", mirage: "98/100", snowbird: "82/100", jackson: "88/100" },
  { metric: "Accessibility", mirage: "Direct Shuttle", snowbird: "Canyon Road", jackson: "Mountain Pass" },
];

export default function Comparison() {
  return (
    <section className="py-24 px-4 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Side-by-Side Comparison
          </h2>
          <p className="text-black/40 text-lg md:text-xl font-light max-w-2xl mx-auto">
            How Mirage Mountain measures up against the world's most iconic peaks.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-4 border-b border-black/10 py-8 px-4">
              <div className="text-xs font-bold uppercase tracking-widest text-black/40">Metric</div>
              <div className="text-xl font-bold text-black">Mirage Mountain</div>
              <div className="text-xl font-bold text-black/40">Snowbird</div>
              <div className="text-xl font-bold text-black/40">Jackson Hole</div>
            </div>

            {COMPARISON_DATA.map((row, index) => (
              <motion.div
                key={row.metric}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="grid grid-cols-4 border-b border-black/5 py-10 px-4 hover:bg-black/[0.01] transition-colors"
              >
                <div className="text-sm font-semibold text-black/60 flex items-center">{row.metric}</div>
                <div className="text-lg font-bold text-black flex items-center gap-2">
                  {row.mirage}
                  <Check size={16} className="text-green-500" />
                </div>
                <div className="text-lg font-medium text-black/40 flex items-center">{row.snowbird}</div>
                <div className="text-lg font-medium text-black/40 flex items-center">{row.jackson}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
