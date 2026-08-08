import React from "react";
import { motion } from "framer-motion";

const quotes = [
  {
    text: "“CORTXAI has fundamentally altered our ops velocity. Nora handles our inventory and matches accounts without manual oversight. We eliminated three spreadsheets on day one.”",
    author: "Elena Rostova",
    role: "VP of Operations, Vercel Inc",
  },
  {
    text: "“Running HR leave schedules, sales payouts, and multi-channel marketing context in one neocortex feels like magic. It’s what enterprise software should have always been.”",
    author: "Marc Andre-Vigne",
    role: "Founder, Linear App Ltd",
  },
  {
    text: "“The data security options were a hard requirement for us. We deployed Nora on-premise inside our AWS VPC, keeping customer records completely air-gapped.”",
    author: "Siddharth Mehta",
    role: "Chief Security Architect, Stripe India",
  },
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-[#ffffff] text-[#0f172a] relative overflow-hidden border-t border-black/[0.03]">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 block">
            CLIENT PERSPECTIVES
          </span>
          <h2 className="text-4xl md:text-5xl font-black font-outfit text-slate-900 tracking-tight">
            Loved by builders. Trusted by leaders.
          </h2>
        </div>

        {/* Asymmetrical Testimonials Masonry Layout */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {quotes.map((q, idx) => {
            const offsets = ["mt-0", "mt-8 md:mt-12", "mt-0 md:mt-6"];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`p-8 rounded-3xl bg-[#FCFBF9] border border-black/5 shadow-sm hover:shadow-md transition-all duration-300 ${offsets[idx]}`}
              >
                <p className="text-base md:text-lg text-slate-700 font-sans leading-relaxed italic mb-8">
                  {q.text}
                </p>
                <div className="border-t border-black/5 pt-4">
                  <h5 className="text-sm font-bold text-slate-900">{q.author}</h5>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5">{q.role}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
