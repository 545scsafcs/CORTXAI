import React from "react";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function RevenueChart() {
  const bars = [45, 80, 65, 100, 70, 90, 120];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden font-sans">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-outfit">
            Weekly Revenue Overview
          </h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1 font-outfit">
            Last 7 Days Telemetry
          </p>
        </div>
        <div className="p-2.5 bg-indigo-50 rounded-xl border border-slate-200 text-indigo-600">
          <TrendingUp size={20} />
        </div>
      </div>

      <div className="flex items-end justify-between h-52 mt-8 px-2">
        {bars.map((bar, index) => (
          <div key={index} className="flex flex-col items-center flex-1 group/bar">
            <span className="opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200 text-[10px] font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md mb-2 font-mono shadow-sm">
              ₹{(bar * 3000).toLocaleString()}
            </span>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${bar / 1.5}%` }}
              transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
              className="w-9 rounded-xl bg-slate-900 hover:bg-indigo-600 transition-colors duration-200 shadow-sm"
            />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-3 font-mono">
              {days[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}