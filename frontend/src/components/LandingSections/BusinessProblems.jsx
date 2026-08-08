import React from "react";
import { motion } from "framer-motion";

export default function BusinessProblems() {
  return (
    <section id="solutions" className="py-32 bg-[#FCFBF9] text-[#0f172a] relative overflow-hidden">
      {/* Decorative cream/gold mesh gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f5f2eb] rounded-full blur-[100px] opacity-40 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Asymmetrical Editorial Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 block">
              THE ENTERPRISE GAP
            </span>
            
            <h2 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 tracking-tight leading-[1.08] max-w-2xl">
              The fragmentation tax is holding your company back.
            </h2>
            
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-sans max-w-xl">
              Modern companies run on 40+ disconnected software tools. One for HR, one for inventory, another for sales leads, and separate systems for accounting. 
            </p>
            
            <p className="text-base text-slate-400 leading-relaxed font-sans max-w-lg">
              Employees spend 3 hours a day copying and pasting data between tabs, double-checking spreadsheet metrics, and chasing manual approvals. This isn't just operational friction; it's a tax on growth.
            </p>

            <div className="pt-6">
              <div className="inline-flex items-center gap-2 group cursor-pointer">
                <span className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-slate-900 transition-colors duration-300">
                  How Nora eliminates the gap
                </span>
                <span className="text-sm text-slate-800 transform group-hover:translate-x-1.5 transition-transform duration-300">
                  →
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Interactive Imperfections & Stats Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-6 mt-8 lg:mt-0">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 rounded-3xl bg-white border border-slate-200/50 shadow-lg shadow-black/[0.01] flex flex-col justify-between aspect-[9/10] hover:shadow-xl transition-all duration-300"
            >
              <span className="text-5xl font-light font-outfit text-amber-500">62%</span>
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-2">Time Wasted</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Of executive hours spent aligning cross-department information.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 rounded-3xl bg-[#f5f2eb]/60 border border-slate-200/50 shadow-lg shadow-black/[0.01] flex flex-col justify-between aspect-[9/10] hover:shadow-xl transition-all duration-300 mt-8"
            >
              <span className="text-5xl font-light font-outfit text-rose-500">INR 4.5M</span>
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-2">Annual SaaS Cost</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Average company spend on redundant application licenses.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-8 rounded-3xl bg-[#f4f4f5]/60 border border-slate-200/50 shadow-lg shadow-black/[0.01] flex flex-col justify-between aspect-[9/10] hover:shadow-xl transition-all duration-300"
            >
              <span className="text-5xl font-light font-outfit text-indigo-500">4.2x</span>
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-2">Error Margin</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Increase in operational error rates when manual sync is required.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-8 rounded-3xl bg-white border border-slate-200/50 shadow-lg shadow-black/[0.01] flex flex-col justify-between aspect-[9/10] hover:shadow-xl transition-all duration-300 mt-8"
            >
              <span className="text-5xl font-light font-outfit text-emerald-500">22%</span>
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-2">Attrition Rate</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Spike in back-office employee attrition due to system fatigue.
                </p>
              </div>
            </motion.div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
