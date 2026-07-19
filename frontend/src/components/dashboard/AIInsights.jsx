import React from "react";
import { Sparkles, AlertTriangle, TrendingUp, Bot, ArrowDownRight } from "lucide-react";

export default function AIInsights() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/20 p-8 backdrop-blur-xl shadow-xl relative overflow-hidden group">
      {/* Dynamic neon blur accent */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
      
      <h2 className="text-2xl font-bold text-white font-outfit flex items-center gap-2">
        <Sparkles className="text-cyan-400 animate-pulse" size={22} /> AI Insights
      </h2>

      <div className="space-y-4 mt-6">
        <InsightItem
          icon={<TrendingUp size={16} className="text-green-400" />}
          text="Revenue may increase by 18% this month."
          bgColor="bg-green-500/5 border-green-500/10"
        />
        <InsightItem
          icon={<AlertTriangle size={16} className="text-yellow-400" />}
          text="Low inventory detected in Warehouse A."
          bgColor="bg-yellow-500/5 border-yellow-500/10"
        />
        <InsightItem
          icon={<Bot size={16} className="text-cyan-400" />}
          text="Nora recommends hiring 2 support staff."
          bgColor="bg-cyan-500/5 border-cyan-500/10"
        />
        <InsightItem
          icon={<ArrowDownRight size={16} className="text-purple-400" />}
          text="Finance expenses reduced by 12%."
          bgColor="bg-purple-500/5 border-purple-500/10"
        />
      </div>
    </div>
  );
}

function InsightItem({ icon, text, bgColor }) {
  return (
    <div className={`flex items-start gap-3 p-4 rounded-2xl border ${bgColor} hover:bg-white/[0.02] transition-all duration-300`}>
      <div className="p-2 bg-white/5 rounded-xl border border-white/5 shrink-0">
        {icon}
      </div>
      <p className="text-xs font-semibold text-gray-300 leading-relaxed font-outfit mt-1.5">
        {text}
      </p>
    </div>
  );
}