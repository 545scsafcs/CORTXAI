import React from "react";
import { motion } from "framer-motion";

export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
  className = "",
}) {
  return (
    <div className={`flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 w-fit overflow-x-auto ${className}`}>
      {tabs.map((tab) => {
        const id = typeof tab === "string" ? tab : tab.id;
        const label = typeof tab === "string" ? tab : tab.label;
        const isActive = activeTab === id;

        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`relative px-4 py-2 text-xs font-bold font-sans transition-colors duration-300 rounded-xl cursor-pointer ${
              isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-white rounded-xl border border-slate-200 shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
