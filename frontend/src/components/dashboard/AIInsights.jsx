import React from "react";
import { Sparkles, AlertTriangle, TrendingUp, Bot, ArrowDownRight } from "lucide-react";

export default function AIInsights() {
  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden font-sans">
      <h2 className="text-xl font-bold text-slate-900 font-outfit flex items-center gap-2">
        <Sparkles className="text-indigo-600 animate-pulse" size={20} /> AI Autonomous Insights
      </h2>

      <div className="space-y-4 mt-6">
        <InsightItem
          icon={<TrendingUp size={16} className="text-emerald-600" />}
          text="Revenue may increase by 18% this month."
          bgColor="bg-emerald-50 border-emerald-200"
        />
        <InsightItem
          icon={<AlertTriangle size={16} className="text-amber-600" />}
          text="Low inventory detected in Warehouse A."
          bgColor="bg-amber-50 border-amber-200"
        />
        <InsightItem
          icon={<Bot size={16} className="text-indigo-600" />}
          text="Nora recommends hiring 2 support staff."
          bgColor="bg-indigo-50 border-indigo-200"
        />
        <InsightItem
          icon={<ArrowDownRight size={16} className="text-purple-600" />}
          text="Finance expenses reduced by 12%."
          bgColor="bg-purple-50 border-purple-200"
        />
      </div>
    </div>
  );
}

function InsightItem({ icon, text, bgColor }) {
  return (
    <div className={`flex items-start gap-3 p-4 rounded-2xl border ${bgColor} transition-all duration-200`}>
      <div className="p-2 bg-white rounded-xl border border-slate-200 shrink-0 shadow-sm">
        {icon}
      </div>
      <p className="text-xs font-bold text-slate-900 leading-relaxed font-outfit mt-1">
        {text}
      </p>
    </div>
  );
}