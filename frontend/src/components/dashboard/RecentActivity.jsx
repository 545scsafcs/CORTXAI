import React from "react";
import { Clock } from "lucide-react";

const activity = [
  "New employee joined",
  "Inventory updated",
  "Invoice generated",
  "Nora completed payroll",
  "Monthly report exported",
];

export default function RecentActivity() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-white font-outfit flex items-center gap-2">
        <Clock size={20} className="text-cyan-400" /> Recent Activity
      </h2>

      <div className="space-y-4">
        {activity.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3.5 border-b border-white/5 last:border-b-0 hover:bg-white/[0.01] px-4 rounded-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 shadow-md shadow-cyan-500/30 animate-pulse shrink-0" />
              <p className="text-sm font-semibold text-gray-250 font-outfit leading-none mt-0.5">
                {item}
              </p>
            </div>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider font-mono">
              {index + 2}m ago
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}