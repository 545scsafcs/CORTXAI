import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

const plans = [
  {
    name: "Starter Workspace",
    price: "INR 0",
    period: "forever free",
    desc: "Coordinate basic operations and workflow tables.",
    users: "Up to 5 Users",
    features: [
      "HR Personnel Log",
      "Unified Stock Directory",
      "Manual Ledger Register",
      "Standard Email Helpdesk",
    ],
    cta: "Launch Workspace",
    variant: "secondary",
    tag: null,
  },
  {
    name: "Professional Core",
    price: "INR 18,500",
    period: "per workspace / mo",
    desc: "Complete cognitive coordination with active Nora AI.",
    users: "Unlimited Users",
    features: [
      "Everything in Starter",
      "CRM Lead Analytics",
      "Nora AI Active Agents",
      "Predictive Ledger Auditing",
      "Priority 1-Hour SLA Helpdesk",
    ],
    cta: "Start Free Trial",
    variant: "primary",
    tag: "RECOMMENDED",
  },
  {
    name: "Enterprise Sovereignty",
    price: "Custom",
    period: "annual parameters",
    desc: "Private nodes, dedicated models, custom orchestration.",
    users: "Large Organizations",
    features: [
      "On-Premise Cloud Deployments",
      "Dedicated Fine-Tuned LLM Weighting",
      "Direct API access to Nora Neocortex",
      "Redundant 24/7 Phone SLA Support",
    ],
    cta: "Request Demo Session",
    variant: "secondary",
    tag: "AIR-GAPPED SETUP",
  },
];

export default function PricingRedesign() {
  return (
    <section id="pricing" className="py-32 bg-[#F5F5F7] text-[#0f172a] relative overflow-hidden border-t border-black/[0.03]">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 block">
            WORKSPACE ACQUISITION
          </span>
          <h2 className="text-4xl md:text-5xl font-black font-outfit text-slate-900 tracking-tight">
            Transparent enterprise scales.
          </h2>
          <p className="text-slate-500 font-sans leading-relaxed text-base">
            Select the processing power and agent availability that fits your company size.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => {
            const isProfessional = p.tag === "RECOMMENDED";
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`rounded-[32px] p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  isProfessional
                    ? "bg-[#ffffff] border-2 border-slate-900 shadow-xl shadow-slate-900/5 z-10"
                    : "bg-white/50 border border-slate-200/60 shadow-sm"
                }`}
              >
                {p.tag && (
                  <span className={`absolute top-5 right-5 text-[8px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    isProfessional ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 border border-slate-200"
                  }`}>
                    {p.tag}
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-outfit">{p.name}</h3>
                  <p className="text-xs text-slate-400 font-sans mt-2">{p.desc}</p>

                  <div className="mt-8 flex items-baseline gap-1">
                    <span className="text-4xl font-black font-outfit text-slate-900">{p.price}</span>
                    <span className="text-xs text-slate-400 font-sans"> / {p.period}</span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-500 font-mono mt-1 uppercase tracking-wide">{p.users}</p>

                  {/* Divider */}
                  <div className="h-px bg-black/5 my-8" />

                  <div className="space-y-4">
                    {p.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-center gap-3 text-xs text-slate-600 font-sans font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12">
                  <Button
                    to="/login"
                    variant={isProfessional ? "primary" : "outline"}
                    className={`w-full py-4 text-xs font-bold uppercase tracking-wider rounded-2xl ${
                      isProfessional
                        ? "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/10"
                        : "border-slate-300 text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    {p.cta}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
