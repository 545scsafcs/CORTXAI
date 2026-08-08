import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

export default function CTARedesign() {
  return (
    <section className="py-32 bg-[#ffffff] text-[#0f172a] relative overflow-hidden border-t border-black/[0.03]">
      {/* Decorative ambient blur light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-cyan-400/5 to-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8 relative z-10 text-center space-y-8">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          IMMEDIATE ACQUISITION
        </span>

        <h2 className="text-5xl md:text-7xl font-black font-outfit text-slate-900 tracking-tight leading-[1.05] max-w-4xl mx-auto">
          Operating the future of enterprise software.
        </h2>

        <p className="text-lg md:text-xl text-slate-500 font-sans leading-relaxed max-w-2xl mx-auto">
          Redesign your company workflows today. Align CRM databases, personnel tables, and expense ledger metrics within one continuous nervous system.
        </p>

        <div className="flex justify-center gap-6 mt-12 flex-wrap items-center">
          <Button
            to="/login"
            className="px-10 py-5 rounded-2xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition duration-300 shadow-xl shadow-slate-900/10"
          >
            Launch Command Center
          </Button>

          <Button
            to="/login"
            variant="outline"
            className="px-10 py-5 rounded-2xl border-slate-300 text-slate-800 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition duration-300"
          >
            Book Demo Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
