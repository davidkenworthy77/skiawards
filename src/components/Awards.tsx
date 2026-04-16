import { motion } from "motion/react";
import { AWARDS } from "../constants";
import { Trophy, Mountain, Zap, Snowflake, GlassWater } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Trophy,
  Mountain,
  Zap,
  Snowflake,
  GlassWater
};

export default function Awards() {
  return (
    <section className="py-24 px-4 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Category Awards
          </h2>
          <p className="text-black/40 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Recognizing excellence in specific disciplines across the mountain landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AWARDS.map((award, index) => {
            const Icon = ICON_MAP[award.icon];
            return (
              <motion.div
                key={award.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-10 bg-[#f9f9f9] rounded-3xl border border-black/5 hover:border-black/10 transition-all duration-300 group"
              >
                <div className="mb-8 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:shadow-md transition-shadow">
                  <Icon size={32} className="text-black" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-2">
                  {award.category}
                </h3>
                <h4 className="text-2xl font-bold mb-4">
                  {award.winner}
                </h4>
                <p className="text-black/60 leading-relaxed font-light">
                  {award.justification}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
