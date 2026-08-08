import React from "react";
import Button from "../ui/Button";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/65 backdrop-blur-xl border border-black/[0.04] rounded-2xl px-8 py-3.5 flex items-center justify-between shadow-sm shadow-black/[0.01]"
        >
          {/* Brand Logo */}
          <h1 className="text-xl font-black font-outfit tracking-tight text-slate-900 cursor-pointer">
            CortxAI
          </h1>

          {/* Nav links */}
          <nav className="hidden md:flex gap-10 text-xs font-bold tracking-wider uppercase text-slate-500 font-sans">
            <a href="#features" className="hover:text-slate-900 transition-colors duration-300">
              Features
            </a>
            <a href="#solutions" className="hover:text-slate-900 transition-colors duration-300">
              Solutions
            </a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors duration-300">
              Pricing Scale
            </a>
            <a href="#solutions" className="hover:text-slate-900 transition-colors duration-300">
              Security
            </a>
          </nav>

          {/* Portal CTA */}
          <Button
            to="/login"
            className="px-5 py-2.5 text-[11px] font-bold tracking-wider uppercase rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all duration-300 shadow-sm shadow-slate-900/5 hover:scale-102"
          >
            Launch Command Center
          </Button>
        </motion.div>
      </div>
    </header>
  );
}