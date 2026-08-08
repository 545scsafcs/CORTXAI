import React from "react";
import { CheckSquare } from "lucide-react";

const tasks = [
  "Review Monthly Payroll Ledger",
  "Approve Pending Employee Leave Requests",
  "Warehouse Stock Audit Reconciliation",
  "Generate Quarterly Tax & GST Report",
  "Follow-up with Corporate Lead Accounts",
];

export default function UpcomingTasks() {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/40 font-sans">
      <h2 className="text-xl font-bold mb-6 text-slate-900 font-outfit flex items-center gap-2">
        <CheckSquare size={18} className="text-indigo-600" /> Action Items & Tasks
      </h2>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task}
            className="rounded-2xl bg-slate-50 border border-slate-200/80 p-3.5 flex items-center gap-3 hover:bg-slate-100 transition duration-200 group cursor-pointer"
          >
            <div className="w-4 h-4 rounded-md border border-slate-300 flex items-center justify-center group-hover:border-indigo-600 group-hover:bg-indigo-600 transition">
              <span className="w-1.5 h-1.5 rounded-sm bg-white opacity-0 group-hover:opacity-100 transition" />
            </div>
            <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition font-outfit">
              {task}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}