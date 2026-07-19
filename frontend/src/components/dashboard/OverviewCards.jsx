import React from "react";
import { TrendingUp, ShoppingBag, CheckCircle, Cpu } from "lucide-react";

const getIcon = (title) => {
  if (title.includes("Revenue")) return <TrendingUp size={20} className="text-cyan-400" />;
  if (title.includes("Orders")) return <ShoppingBag size={20} className="text-purple-400" />;
  if (title.includes("Attendance")) return <CheckCircle size={20} className="text-green-400" />;
  return <Cpu size={20} className="text-blue-400" />;
};

const data = [
  ["Today's Revenue", "₹3.2L"],
  ["Today's Orders", "54"],
  ["Attendance", "98%"],
  ["AI Requests", "284"],
];

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map(([title, value]) => (
        <div
          key={title}
          className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 backdrop-blur-xl shadow-xl hover:-translate-y-1.5 transition-all duration-300 group hover:border-cyan-500/30 hover:shadow-[0_15px_40px_rgba(6,182,212,0.06)] relative overflow-hidden"
        >
          {/* Accent radial glow overlay */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
          
          <div className="flex justify-between items-start">
            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider font-outfit">
              {title}
            </p>
            <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 shadow-inner">
              {getIcon(title)}
            </div>
          </div>
          
          <h2 className="text-4xl font-black mt-4 text-white font-outfit tracking-tight">
            {value}
          </h2>
        </div>
      ))}
    </div>
  );
}