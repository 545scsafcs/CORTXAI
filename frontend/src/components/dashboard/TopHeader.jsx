import React from "react";
import { Bell, Search, UserCircle } from "lucide-react";

export default function TopHeader() {
  return (
    <div className="flex justify-between items-center mb-8 bg-white/[0.01] border border-white/5 px-6 py-4 rounded-3xl backdrop-blur-md shadow-sm">
      {/* Search Input */}
      <div className="relative w-full max-w-sm">
        <span className="absolute left-4 top-3.5 text-gray-400">
          <Search size={16} />
        </span>
        <input
          placeholder="Search reports, agents, invoices..."
          className="w-full rounded-2xl bg-[#0B1220] border border-white/5 py-3 pl-12 pr-4 text-xs font-semibold text-white placeholder-gray-500 outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button className="relative w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/10 transition-all duration-300 group cursor-pointer">
          <Bell size={18} className="group-hover:animate-swing" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400 shadow-md shadow-cyan-500/30"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-white/10 pl-6">
          <div className="w-9 h-9 rounded-xl bg-cyan-500 flex items-center justify-center text-black font-black font-outfit text-sm shadow-md shadow-cyan-500/10">
            V
          </div>
          <div className="hidden sm:block text-left">
            <h4 className="text-xs font-bold text-white font-outfit">Vineet Yadav</h4>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Founder</span>
          </div>
        </div>
      </div>
    </div>
  );
}