import React from "react";

export default function KPICard({ title, value, change }) {
  const isNegative = change && change.includes("-");
  return (
    <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 backdrop-blur-xl shadow-xl hover:-translate-y-1.5 transition-all duration-300 group hover:border-cyan-500/30 hover:shadow-[0_15px_40px_rgba(6,182,212,0.06)] relative overflow-hidden">
      {/* Visual lighting accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
      
      <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider font-outfit">
        {title}
      </p>
      
      <h2 className="text-4xl font-black mt-3 text-white font-outfit tracking-tight">
        {value}
      </h2>
      
      <div className="mt-4 flex items-center gap-2">
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            isNegative
              ? "bg-red-500/10 text-red-400 border border-red-500/10"
              : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/10"
          }`}
        >
          {change}
        </span>
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          VS LAST MONTH
        </span>
      </div>
    </div>
  );
}