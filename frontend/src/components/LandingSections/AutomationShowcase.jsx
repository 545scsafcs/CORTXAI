import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    id: "sale",
    title: "1. Revenue Event Received",
    subtitle: "Sales Representative closes INR 1,250,000 deal.",
    system: "CRM & SALES",
    status: "reconciling",
    icon: "📈",
  },
  {
    id: "inventory",
    title: "2. Inventory Allocated",
    subtitle: "Stock Matrix checks main warehouse, updates count.",
    system: "INVENTORY MATRIX",
    status: "updating",
    icon: "📦",
  },
  {
    id: "finance",
    title: "3. Double-Entry Balance logged",
    subtitle: "Ledger registers asset debit & revenue credit, files tax columns.",
    system: "AUTOMATED LEDGER",
    status: "posting",
    icon: "💰",
  },
  {
    id: "hr",
    title: "4. Representative Commission Align",
    subtitle: "Payroll adds 4.5% commission parameter to sales staff profile.",
    system: "PEOPLE & PAYROLL",
    status: "completed",
    icon: "👥",
  },
];

export default function AutomationShowcase() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-[#090A0F] text-white relative overflow-hidden">
      {/* Mesh background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,230,255,0.04)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/2 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Narrative text */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400 block">
              Continuous Coordination Flow
            </span>
            
            <h2 className="text-4xl md:text-5xl font-black font-outfit text-white tracking-tight leading-[1.1]">
              Watch Nora coordinate your enterprise.
            </h2>
            
            <p className="text-slate-400 font-sans leading-relaxed text-base">
              Traditional software waits for you to check records. Nora runs in the background, listening to transactions and updating dependent business nodes instantly.
            </p>

            {/* Stepper progress block */}
            <div className="space-y-4 pt-6">
              {steps.map((step, idx) => {
                const isActive = idx === activeStep;
                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveStep(idx)}
                    className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex gap-4 items-center ${
                      isActive
                        ? "bg-white/5 border-cyan-500/30"
                        : "bg-transparent border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <span className="text-2xl">{step.icon}</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{step.title}</h4>
                      <p className="text-xs text-slate-400 font-sans mt-0.5">{step.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Live Interactive Vector flowchart */}
          <div className="lg:col-span-7 flex justify-center items-center h-[400px] relative border border-white/5 bg-white/[0.01] rounded-[32px] overflow-hidden p-8">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:30px_30px]" />
            
            {/* Nora Core node */}
            <div className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-600 flex items-center justify-center shadow-[0_0_60px_rgba(6,182,212,0.3)] z-20">
              <span className="text-xl">🧠</span>
              {/* Core orbit outline */}
              <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-pulse" />
            </div>

            {/* Step Nodes positioning */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* SVG connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 400">
                {/* Node coordinates:
                    Nora (Center): 250, 200
                    Sales (Top Left): 100, 100
                    Inventory (Top Right): 400, 100
                    Finance (Bottom Right): 400, 300
                    HR (Bottom Left): 100, 300
                */}
                <g stroke="rgba(255,255,255,0.06)" strokeWidth="2">
                  <line x1="100" y1="100" x2="250" y2="200" />
                  <line x1="400" y1="100" x2="250" y2="200" />
                  <line x1="400" y1="300" x2="250" y2="200" />
                  <line x1="100" y1="300" x2="250" y2="200" />
                </g>

                {/* Pulsing signal lines travel along connections depending on active step */}
                <g stroke="url(#activeGrad)" strokeWidth="3" strokeLinecap="round">
                  {activeStep === 0 && (
                    <motion.line
                      x1="100" y1="100" x2="250" y2="200"
                      strokeDasharray="10 10"
                      animate={{ strokeDashoffset: [0, -50] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  {activeStep === 1 && (
                    <motion.line
                      x1="250" y1="200" x2="400" y2="100"
                      strokeDasharray="10 10"
                      animate={{ strokeDashoffset: [0, 50] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  {activeStep === 2 && (
                    <motion.line
                      x1="250" y1="200" x2="400" y2="300"
                      strokeDasharray="10 10"
                      animate={{ strokeDashoffset: [0, 50] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  {activeStep === 3 && (
                    <motion.line
                      x1="250" y1="200" x2="100" y2="300"
                      strokeDasharray="10 10"
                      animate={{ strokeDashoffset: [0, 50] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </g>

                <defs>
                  <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Node components */}
              <div
                className={`absolute transition-all duration-500 rounded-2xl p-3 border text-center ${
                  activeStep === 0 ? "bg-cyan-500/10 border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.15)]" : "bg-white/[0.02] border-white/5"
                }`}
                style={{ top: "60px", left: "40px", width: "120px" }}
              >
                <span className="text-xl">📈</span>
                <h5 className="text-[10px] font-bold mt-1">CRM Sales</h5>
              </div>

              <div
                className={`absolute transition-all duration-500 rounded-2xl p-3 border text-center ${
                  activeStep === 1 ? "bg-emerald-500/10 border-emerald-400/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]" : "bg-white/[0.02] border-white/5"
                }`}
                style={{ top: "60px", right: "40px", width: "120px" }}
              >
                <span className="text-xl">📦</span>
                <h5 className="text-[10px] font-bold mt-1">Inventory Matrix</h5>
              </div>

              <div
                className={`absolute transition-all duration-500 rounded-2xl p-3 border text-center ${
                  activeStep === 2 ? "bg-amber-500/10 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.15)]" : "bg-white/[0.02] border-white/5"
                }`}
                style={{ bottom: "60px", right: "40px", width: "120px" }}
              >
                <span className="text-xl">💰</span>
                <h5 className="text-[10px] font-bold mt-1">Finance Ledger</h5>
              </div>

              <div
                className={`absolute transition-all duration-500 rounded-2xl p-3 border text-center ${
                  activeStep === 3 ? "bg-indigo-500/10 border-indigo-400/50 shadow-[0_0_30px_rgba(99,102,241,0.15)]" : "bg-white/[0.02] border-white/5"
                }`}
                style={{ bottom: "60px", left: "40px", width: "120px" }}
              >
                <span className="text-xl">👥</span>
                <h5 className="text-[10px] font-bold mt-1">HR Payroll</h5>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
