import React from "react";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";
import { motion } from "framer-motion";

export default function HeroContent() {
  return (
    <div className="relative z-10 w-full pr-0 lg:pr-8">
      
      {/* Small badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/5 bg-slate-50 shadow-sm"
      >
        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
          Continuous Cognitive Control
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-6 text-5xl md:text-7xl font-black font-outfit text-slate-900 tracking-tight leading-[1.05]"
      >
        The AI Business
        <br />
        <span className="text-nora-gradient bg-clip-text">
          Operating System.
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-8 text-lg md:text-xl text-slate-500 leading-relaxed max-w-xl font-sans"
      >
        CORTXAI consolidates HR, CRM, Inventory, Finance, Sales and autonomous AI Agents into a unified, continuous database powered by Nora. Eliminate the fragmentation tax of disconnected software tools.
      </motion.p>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <HeroButtons />
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <HeroStats />
      </motion.div>

    </div>
  );
}