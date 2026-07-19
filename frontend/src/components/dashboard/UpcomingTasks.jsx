import React from "react";
import { CheckSquare } from "lucide-react";

const tasks = [
  "Review Payroll",
  "Approve Leave",
  "Inventory Audit",
  "Generate GST Report",
  "Call Premium Client",
];

export default function UpcomingTasks() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-white font-outfit flex items-center gap-2">
        <CheckSquare size={20} className="text-cyan-400" /> Upcoming Tasks
      </h2>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task}
            className="rounded-xl bg-white/[0.01] border border-white/5 p-4 flex items-center gap-3 hover:border-cyan-500/20 hover:bg-white/[0.02] transition-all duration-300 group"
          >
            <div className="w-5 h-5 rounded-md border border-white/20 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-500/10 transition-colors duration-300">
              <span className="w-1.5 h-1.5 rounded-sm bg-cyan-400 scale-0 group-hover:scale-100 transition-transform duration-300" />
            </div>
            <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors duration-300 font-outfit mt-0.5">
              {task}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}