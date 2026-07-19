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
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-white font-outfit flex items-center gap-2">
        <Award size={20} className="text-cyan-400" /> Team Performance
      </h2>

      <div className="space-y-5">
        {team.map(([name, value]) => (
          <div key={name} className="group">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors duration-300 font-outfit">
                {name} Department
              </span>
              <span className="text-sm font-bold text-cyan-400 font-mono">
                {value}%
              </span>
            </div>

            <div className="h-2 rounded-full bg-white/5 border border-white/5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-1000 ease-out group-hover:brightness-115"
                style={{
                  width: `${value}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}