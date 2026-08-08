import React from "react";
import { motion } from "framer-motion";

const companies = [
  { name: "Apple", logo: "" },
  { name: "OpenAI", logo: "✴" },
  { name: "Stripe", logo: "stripe" },
  { name: "Linear", logo: "linear" },
  { name: "Arc", logo: "arc" },
  { name: "Vercel", logo: "▲ vercel" },
  { name: "Framer", logo: "framer" },
  { name: "Notion", logo: "notion" },
  { name: "Tesla", logo: "tesla" },
];

export default function TrustedCompanies() {
  return (
    <section className="py-16 bg-[#ffffff] border-y border-black/[0.04] overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-slate-400 mb-10">
          Orchestrating operations for progressive enterprises worldwide
        </p>

        <div className="relative flex items-center justify-center w-full">
          {/* Gradients to hide edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex gap-16 items-center whitespace-nowrap overflow-x-hidden py-2 select-none w-full">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{
                ease: "linear",
                duration: 25,
                repeat: Infinity,
              }}
              className="flex gap-20 items-center justify-around min-w-full text-slate-400 font-medium font-outfit"
            >
              {companies.map((c, i) => (
                <div key={i} className="flex items-center gap-2 hover:text-slate-900 transition-colors duration-300 cursor-default">
                  <span className="text-xl font-bold tracking-tight">{c.logo}</span>
                  <span className="text-sm font-semibold tracking-wider font-sans uppercase text-[11px]">{c.name}</span>
                </div>
              ))}
              {/* Duplicate for infinite loop */}
              {companies.map((c, i) => (
                <div key={`dup-${i}`} className="flex items-center gap-2 hover:text-slate-900 transition-colors duration-300 cursor-default">
                  <span className="text-xl font-bold tracking-tight">{c.logo}</span>
                  <span className="text-sm font-semibold tracking-wider font-sans uppercase text-[11px]">{c.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
