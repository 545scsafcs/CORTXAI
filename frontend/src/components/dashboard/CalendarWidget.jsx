import React from "react";
import { Calendar } from "lucide-react";

export default function CalendarWidget() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/40 font-sans">
      <h2 className="text-xl font-bold mb-6 text-slate-900 font-outfit flex items-center gap-2">
        <Calendar size={18} className="text-indigo-600" /> July 2026 Schedule
      </h2>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-[10px] font-bold uppercase tracking-wider text-slate-400 py-1 font-mono"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: 31 }, (_, i) => {
          const isToday = i + 1 === 21;
          return (
            <button
              key={i}
              className={`aspect-square rounded-xl text-xs font-bold font-mono transition duration-150 ${
                isToday
                  ? "bg-slate-900 text-white shadow-md font-black"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}