import React from "react";
import { Clock } from "lucide-react";

const activity = [
  "New employee joined system",
  "Inventory warehouse matrix updated",
  "Customer invoice generated",
  "Nora AI completed payroll reconciliations",
  "Monthly performance report exported",
];

export default function RecentActivity() {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/40 font-sans">
      <h2 className="text-xl font-bold mb-6 text-slate-900 font-outfit flex items-center gap-2">
        <Clock size={18} className="text-indigo-600" /> Recent System Activity
      </h2>

      <div className="space-y-3">
        {activity.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 px-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition duration-200"
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
              <p className="text-xs font-bold text-slate-900 font-outfit">
                {item}
              </p>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
              {index + 2}m ago
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}