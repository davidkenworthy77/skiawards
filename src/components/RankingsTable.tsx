import { motion } from "motion/react";
import { RESORTS } from "../constants";
import { Star, TrendingUp, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function RankingsTable() {
  return (
    <section id="rankings" className="py-24 px-4 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Top 10 Resort Rankings
          </h2>
          <p className="text-white/40 text-lg md:text-xl font-light max-w-2xl">
            Our comprehensive evaluation of the world's premier mountain destinations, 
            ranked by performance across five critical categories.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-6 px-4 text-xs font-semibold uppercase tracking-widest text-white/40">Rank</th>
                <th className="py-6 px-4 text-xs font-semibold uppercase tracking-widest text-white/40">Resort Name</th>
                <th className="py-6 px-4 text-xs font-semibold uppercase tracking-widest text-white/40 hidden md:table-cell">Terrain</th>
                <th className="py-6 px-4 text-xs font-semibold uppercase tracking-widest text-white/40 hidden md:table-cell">Park</th>
                <th className="py-6 px-4 text-xs font-semibold uppercase tracking-widest text-white/40 hidden md:table-cell">Snow</th>
                <th className="py-6 px-4 text-xs font-semibold uppercase tracking-widest text-white/40 hidden md:table-cell">Lifts</th>
                <th className="py-6 px-4 text-xs font-semibold uppercase tracking-widest text-white/40">Overall</th>
              </tr>
            </thead>
            <tbody>
              {RESORTS.map((resort, index) => (
                <motion.tr
                  key={resort.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`group border-b border-white/5 hover:bg-white/[0.02] transition-colors ${resort.rank === 1 ? 'bg-white/[0.03]' : ''}`}
                >
                  <td className="py-8 px-4">
                    <span className={`text-2xl font-bold ${resort.rank === 1 ? 'text-white' : 'text-white/20'}`}>
                      {resort.rank.toString().padStart(2, '0')}
                    </span>
                  </td>
                  <td className="py-8 px-4">
                    <Link to={`/resort/${resort.slug}`} className="flex items-center gap-3 hover:text-white/80 transition-colors">
                      <span className="text-xl font-semibold group-hover:translate-x-1 transition-transform duration-300">
                        {resort.name}
                      </span>
                      {resort.rank === 1 && (
                        <Star size={16} className="text-white fill-white" />
                      )}
                    </Link>
                  </td>
                  <td className="py-8 px-4 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${resort.terrainScore}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-white/40"
                        />
                      </div>
                      <span className="text-sm font-mono text-white/40">{resort.terrainScore}</span>
                    </div>
                  </td>
                  <td className="py-8 px-4 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${resort.parkScore}%` }}
                          transition={{ duration: 1, delay: 0.6 }}
                          className="h-full bg-white/40"
                        />
                      </div>
                      <span className="text-sm font-mono text-white/40">{resort.parkScore}</span>
                    </div>
                  </td>
                  <td className="py-8 px-4 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${resort.snowQuality}%` }}
                          transition={{ duration: 1, delay: 0.7 }}
                          className="h-full bg-white/40"
                        />
                      </div>
                      <span className="text-sm font-mono text-white/40">{resort.snowQuality}</span>
                    </div>
                  </td>
                  <td className="py-8 px-4 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${resort.liftEfficiency}%` }}
                          transition={{ duration: 1, delay: 0.8 }}
                          className="h-full bg-white/40"
                        />
                      </div>
                      <span className="text-sm font-mono text-white/40">{resort.liftEfficiency}</span>
                    </div>
                  </td>
                  <td className="py-8 px-4">
                    <Link to={`/resort/${resort.slug}`} className="flex items-center gap-3">
                      <span className={`text-2xl font-bold font-mono ${resort.rank === 1 ? 'text-white' : 'text-white/60'}`}>
                        {resort.overallScore.toFixed(1)}
                      </span>
                      <ChevronRight size={16} className="text-white/20 group-hover:text-white transition-colors" />
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-white/40 text-sm italic">
          <TrendingUp size={16} />
          <span>Scores are calculated based on a weighted average of terrain, park, snow, and lift efficiency.</span>
        </div>
      </div>
    </section>
  );
}

