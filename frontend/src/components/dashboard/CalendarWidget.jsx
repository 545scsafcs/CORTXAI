import React from "react";
import { Calendar } from "lucide-react";

export default function CalendarWidget() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-white font-outfit flex items-center gap-2">
        <Calendar size={20} className="text-cyan-400" /> July 2026
      </h2>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-[10px] font-bold uppercase tracking-wider text-gray-500 py-2 font-mono"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: 31 }, (_, i) => {
          const isToday = i + 1 === 18; // 18 Jul 2026
          return (
            <button
              key={i}
              className={`aspect-square rounded-lg text-xs font-semibold font-mono transition-all duration-300 ${
                isToday
                  ? "bg-gradient-to-tr from-cyan-500 to-cyan-400 text-black font-black shadow-lg shadow-cyan-500/20"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
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