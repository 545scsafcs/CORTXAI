import React from "react";
import { Award } from "lucide-react";

const team = [
  ["HR", 94],
  ["Sales", 82],
  ["Finance", 76],
  ["CRM", 89],
  ["Support", 91],
];

export default function TeamPerformance() {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/40 font-sans">
      <h2 className="text-xl font-bold mb-6 text-slate-900 font-outfit flex items-center gap-2">
        <Award size={18} className="text-indigo-600" /> Department Health Scores
      </h2>

      <div className="space-y-4">
        {team.map(([name, value]) => (
          <div key={name} className="group">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-slate-900 font-outfit">
                {name} Department
              </span>
              <span className="text-xs font-bold text-indigo-600 font-mono">
                {value}%
              </span>
            </div>

            <div className="h-2 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-slate-900 transition-all duration-700 ease-out"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}