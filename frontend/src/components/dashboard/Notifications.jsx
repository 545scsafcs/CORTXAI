import React from "react";
import { Bell } from "lucide-react";

const notifications = [
  "Payroll generated successfully for March",
  "New Enterprise Lead assigned to CRM pipeline",
  "Warehouse A stock levels updated",
  "Nora AI completed autonomous ledger analysis",
];

export default function Notifications() {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/40 font-sans">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-50 rounded-xl border border-slate-200 text-indigo-600">
          <Bell size={20} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 font-outfit">
          Notifications Stream
        </h2>
      </div>

      <div className="space-y-3">
        {notifications.map((item, index) => (
          <div
            key={index}
            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition duration-200"
          >
            <p className="text-xs font-bold text-slate-900 font-outfit leading-snug">
              {item}
            </p>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1.5 font-mono">
              Just now
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}