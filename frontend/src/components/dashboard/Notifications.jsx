import React from "react";
import { Bell } from "lucide-react";

const notifications = [
  "Payroll generated successfully",
  "New Lead assigned",
  "Warehouse stock updated",
  "Nora completed AI analysis",
];

export default function Notifications() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/10 text-cyan-400">
          <Bell size={20} className="animate-swing" />
        </div>
        <h2 className="text-2xl font-bold text-white font-outfit">
          Notifications
        </h2>
      </div>

      <div className="space-y-4">
        {notifications.map((item, index) => (
          <div
            key={index}
            className="border-b border-white/5 last:border-b-0 pb-4 last:pb-0 hover:bg-white/[0.01] px-4 py-2 rounded-xl transition-all duration-300"
          >
            <p className="text-sm font-semibold text-gray-250 font-outfit leading-snug">
              {item}
            </p>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mt-2">
              Just now
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}