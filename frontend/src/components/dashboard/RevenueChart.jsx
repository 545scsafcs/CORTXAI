import React from "react";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function RevenueChart() {
  const bars = [45, 80, 65, 100, 70, 90, 120];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl shadow-xl relative overflow-hidden group">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-white font-outfit">
            Revenue Overview
          </h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1.5 font-outfit">
            Last 7 Days Trend
          </p>
        </div>
        <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/10 text-cyan-400">
          <TrendingUp size={20} />
        </div>
      </div>

      <div className="flex items-end justify-between h-56 mt-10 px-2">
        {bars.map((bar, index) => (
          <div key={index} className="flex flex-col items-center flex-1 group/bar">
            {/* Value Tooltip Hover Indicator */}
            <span className="opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300 text-[10px] font-bold text-cyan-300 bg-slate-900 border border-white/10 px-2 py-0.5 rounded-md mb-2 font-mono">
              ₹{(bar * 3000).toLocaleString()}
            </span>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${bar / 1.5}%` }}
              transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
              className="w-10 rounded-xl bg-gradient-to-t from-cyan-500 via-cyan-400 to-purple-500 hover:brightness-110 shadow-lg shadow-cyan-500/10 transition-all duration-300"
            />
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-3 font-mono">
              {days[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}