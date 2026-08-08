import React from "react";
import { motion } from "framer-motion";

export default function HowNoraSolves() {
  return (
    <section className="py-32 bg-[#ffffff] text-[#0f172a] relative overflow-hidden">
      {/* Delicate circular gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-400/5 to-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-600 mb-6 block">
          The Cognitive Core Solution
        </span>

        <h2 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 tracking-tight leading-[1.1] mb-8">
          Nora is your company's digital neocortex.
        </h2>

        <p className="text-xl text-slate-500 leading-relaxed font-sans max-w-2xl mx-auto mb-16">
          Instead of building fragile integrations or custom APIs, Nora acts as a single intelligence layer running over your entire operational data. CRM pipelines, payroll tables, stock registers, and expense metrics become instantly aware of each other.
        </p>

        {/* Visual Conceptual Nerve Center Graph */}
        <div className="relative h-64 max-w-lg mx-auto flex items-center justify-center border border-black/5 bg-[#FCFBF9] rounded-[32px] p-8 shadow-sm">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          
          <div className="relative flex items-center justify-center">
            {/* Core Nora node */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-400/10 z-20">
              <span className="text-white text-lg">🧠</span>
            </div>
            
            {/* Pulsing ring */}
            <div className="absolute w-24 h-24 border border-cyan-400/25 rounded-full animate-ping pointer-events-none" />
            <div className="absolute w-36 h-36 border border-indigo-400/10 rounded-full pointer-events-none" />

            {/* Orbiting child lines */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const x = Math.cos((angle * Math.PI) / 180) * 110;
              const y = Math.sin((angle * Math.PI) / 180) * 110;
              const labels = ["HR", "CRM", "Sales", "Inventory", "Finance", "Data"];
              return (
                <div
                  key={i}
                  className="absolute z-10 flex flex-col items-center"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-[10px] font-bold tracking-wider text-slate-700 hover:border-cyan-400 transition duration-300"
                  >
                    {labels[i]}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
