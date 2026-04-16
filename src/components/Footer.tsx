import { Instagram, Twitter, Facebook, Mountain } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-24 px-4 bg-[#0a0a0a] text-white/40 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-white mb-6">
              <Mountain size={24} />
              <span className="text-xl font-bold tracking-tighter uppercase">Peak Report</span>
            </Link>
            <p className="max-w-md font-light leading-relaxed mb-8">
              The definitive guide to the world's premier mountain destinations. 
              Our rankings are based on aggregated rider feedback, terrain analysis, 
              and performance metrics collected throughout the 2025/26 season.
            </p>
            <div className="flex gap-6">
              <Instagram size={20} className="hover:text-white transition-colors cursor-pointer" />
              <Twitter size={20} className="hover:text-white transition-colors cursor-pointer" />
              <Facebook size={20} className="hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link to="/rankings" className="hover:text-white transition-colors cursor-pointer">Full Rankings</Link></li>
              <li><Link to="/report" className="hover:text-white transition-colors cursor-pointer">Methodology</Link></li>
              <li className="hover:text-white transition-colors cursor-pointer">Resort Partners</li>
              <li className="hover:text-white transition-colors cursor-pointer">Contact Us</li>
            </ul>
          </div>


          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-white transition-colors cursor-pointer">Cookie Policy</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
          <p className="text-xs font-light tracking-widest uppercase">
            © 2026 Peak Report Media Group. All rights reserved.
          </p>
          <p className="text-[10px] font-light italic opacity-50">
            Rankings are independent and not sponsored by any featured resort.
          </p>
        </div>
      </div>
    </footer>
  );
}
