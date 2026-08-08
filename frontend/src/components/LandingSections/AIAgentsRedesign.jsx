import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoSection from "../common/VideoSection";

const agents = [
  {
    id: "hr",
    name: "Nora HR Agent",
    tagline: "Autonomous Personnel Coordination",
    color: "indigo",
    problem: "Manual attendance logging, delayed leave checks, and complex payroll spreadsheets.",
    solution: "A continuous coordinator checking timestamps, resolving salary updates, and resolving queries conversational-style.",
    metric: "94% Less HR Admin Time",
    icon: "👥",
    badge: "Active Coordination",
  },
  {
    id: "crm",
    name: "Nora CRM Agent",
    tagline: "Lead Intelligence & Follow-up",
    color: "rose",
    problem: "Slow lead validation, delayed introductory emails, and lost pipeline opportunities.",
    solution: "Auto-grades incoming leads, drafts tailored correspondence, and coordinates follow-ups in seconds.",
    metric: "+40% Sales Velocity",
    icon: "📊",
    badge: "Closing Optimization",
  },
  {
    id: "finance",
    name: "Nora Finance Agent",
    tagline: "Autonomous Ledger Management",
    color: "amber",
    problem: "Redundant manual invoice verification and manual accounting entries.",
    solution: "Reconciles inbound bank details with accounts, compiles tax forms, and flags variance trends.",
    metric: "Zero Reconciliation Lag",
    icon: "💰",
    badge: "Continuous Audit",
  },
  {
    id: "inventory",
    name: "Nora Stock Agent",
    tagline: "Just-In-Time Reorder Logic",
    color: "emerald",
    problem: "Manual stock reviews, warehouse sync delays, and unexpected item shortages.",
    solution: "Monitors SKU quantities, auto-compiles purchase requests, and synchronizes supplier data.",
    metric: "0% Inventory Shortages",
    icon: "📦",
    badge: "Predictive Fill",
  },
  {
    id: "sales",
    name: "Nora Sales Agent",
    tagline: "Lead Nurturing & Qualification",
    color: "blue",
    problem: "Cold outreach emails with low replies and slow sales cycles.",
    solution: "Sends personalized product introduction context, books calls, and alerts sales executives.",
    metric: "3.2x Lead Conversions",
    icon: "📈",
    badge: "Outbound Scale",
  },
];

export default function AIAgentsRedesign() {
  const [activeId, setActiveId] = useState("hr");
  const activeAgent = agents.find((a) => a.id === activeId);

  const colors = {
    indigo: "border-indigo-400 bg-indigo-50 text-indigo-700 hover:border-indigo-500",
    rose: "border-rose-400 bg-rose-50 text-rose-700 hover:border-rose-500",
    amber: "border-amber-400 bg-amber-50 text-amber-700 hover:border-amber-500",
    emerald: "border-emerald-400 bg-emerald-50 text-emerald-700 hover:border-emerald-500",
    blue: "border-blue-400 bg-blue-50 text-blue-700 hover:border-blue-500",
  };

  const glowColors = {
    indigo: "shadow-[0_10px_40px_rgba(99,102,241,0.15)]",
    rose: "shadow-[0_10px_40px_rgba(244,63,94,0.15)]",
    amber: "shadow-[0_10px_40px_rgba(245,158,11,0.15)]",
    emerald: "shadow-[0_10px_40px_rgba(16,185,129,0.15)]",
    blue: "shadow-[0_10px_40px_rgba(59,130,246,0.15)]",
  };

  return (
    <section className="py-32 bg-[#FCFBF9] text-[#0f172a] relative overflow-hidden border-t border-black/[0.03]">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Editorial Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 block">
            THE AI WORKFORCE
          </span>
          <h2 className="text-4xl md:text-5xl font-black font-outfit text-slate-900 tracking-tight">
            Meet the Nora Agent Guild.
          </h2>
          <p className="text-slate-500 leading-relaxed font-sans text-base">
            Each agent functions as an autonomous subject matter expert, specialized in resolving the operational friction of a specific department.
          </p>
        </div>

        {/* Dynamic Interactive Presentation Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Asymmetric Selection Menu */}
          <div className="lg:col-span-4 space-y-3">
            {agents.map((agent) => {
              const isActive = agent.id === activeId;
              return (
                <button
                  key={agent.id}
                  onClick={() => setActiveId(agent.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? "bg-white border-black/5 shadow-md shadow-black/[0.02]"
                      : "bg-transparent border-transparent hover:bg-white/40"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{agent.icon}</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{agent.name}</h4>
                      <p className="text-[11px] text-slate-400 font-sans tracking-wide mt-0.5">{agent.tagline}</p>
                    </div>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: High-Fidelity Details Showcase Card */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`bg-white rounded-[32px] border border-black/5 p-8 lg:p-12 ${glowColors[activeAgent.color]}`}
              >
                <div className="grid md:grid-cols-12 gap-8 items-center">
                  
                  {/* Copy details */}
                  <div className="md:col-span-6 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{activeAgent.icon}</span>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Agent Specialty</span>
                        <h3 className="text-2xl font-bold text-slate-900">{activeAgent.name}</h3>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Standard Problem</span>
                        <p className="text-xs text-slate-500 font-sans leading-relaxed">{activeAgent.problem}</p>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Nora Resolution</span>
                        <p className="text-xs text-slate-500 font-sans leading-relaxed">{activeAgent.solution}</p>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-black/5">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">Efficiency Metric</span>
                        <span className={`text-lg font-black font-outfit text-${activeAgent.color}-600`}>{activeAgent.metric}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full border border-slate-200`}>
                        {activeAgent.badge}
                      </span>
                    </div>
                  </div>

                  {/* Video/Fallback details */}
                  <div className="md:col-span-6">
                    <VideoSection type={activeAgent.id} className="shadow-lg border-black/[0.03]" />
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
