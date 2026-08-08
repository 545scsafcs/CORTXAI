import React from "react";
import { TrendingUp, ShoppingBag, CheckCircle, Cpu } from "lucide-react";

const getIcon = (title) => {
  if (title.includes("Revenue")) return <TrendingUp size={20} className="text-cyan-600" />;
  if (title.includes("Orders")) return <ShoppingBag size={20} className="text-indigo-600" />;
  if (title.includes("Attendance")) return <CheckCircle size={20} className="text-emerald-600" />;
  return <Cpu size={20} className="text-slate-700" />;
};

const data = [
  ["Today's Revenue", "₹3.2L"],
  ["Today's Orders", "54"],
  ["Attendance", "98%"],
  ["AI Requests", "284"],
];

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
      {data.map(([title, value]) => (
        <div
          key={title}
          className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xl shadow-slate-200/40 hover:-translate-y-1 transition-all duration-300 group hover:border-slate-300 relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider font-outfit">
              {title}
            </p>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              {getIcon(title)}
            </div>
          </div>
          
          <h2 className="text-3xl font-black mt-4 text-slate-900 font-outfit tracking-tight">
            {value}
          </h2>
        </div>
      ))}
    </div>
  );
}