import React from "react";
import { motion } from "framer-motion";

const securityFeatures = [
  {
    title: "Isolated Data Spaces",
    desc: "Every enterprise client gets a fully separated network namespace. Your business context is never used to train global AI weights.",
    icon: "🔒",
  },
  {
    title: "Local On-Prem Deployments",
    desc: "For heavy compliance sectors, Nora runs inside your private AWS/Azure cloud or air-gapped physical server nodes.",
    icon: "🏢",
  },
  {
    title: "Continuous SOC2 & ISO Log Audit",
    desc: "Nora tracks telemetry and ledger entries continuously, generating compliance compliance logs ready for external auditors.",
    icon: "📋",
  },
];

export default function EnterpriseSecurity() {
  return (
    <section className="py-32 bg-[#FCFBF9] text-[#0f172a] relative overflow-hidden border-t border-black/[0.03]">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Visual abstract firewall graphic */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <div className="relative w-80 h-80 rounded-[48px] bg-white border border-slate-200 shadow-xl flex items-center justify-center p-8 overflow-hidden hover:scale-102 transition duration-500">
              {/* Pulse lines */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0%,transparent_60%)]" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm mb-6 text-3xl">
                  🛡️
                </div>
                <h4 className="text-lg font-bold font-outfit text-slate-800 text-center">Nora Shield Engine</h4>
                <p className="text-xs text-slate-400 text-center mt-2 max-w-xs font-sans">
                  Active defense layer scanning memory tables, queries, and data ports.
                </p>
                <div className="mt-6 flex gap-2">
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100 uppercase">AES-256</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 uppercase">SOC2</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-cyan-50 text-cyan-600 rounded-full border border-cyan-100 uppercase">GDPR</span>
                </div>
              </div>

              {/* Decorative nodes */}
              <div className="absolute top-6 left-6 w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <div className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-indigo-400 animate-pulse" />
            </div>
          </div>

          {/* Core Copy */}
          <div className="lg:col-span-6 space-y-8 order-1 lg:order-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 block">
              ENTERPRISE TRUST
            </span>
            
            <h2 className="text-4xl md:text-5xl font-black font-outfit text-slate-900 tracking-tight leading-[1.1]">
              Bank-grade parameters. Zero data compromises.
            </h2>
            
            <p className="text-slate-500 font-sans leading-relaxed text-base">
              Nora operates under strict compliance standards. We guarantee data separation and compile logs at every action layer.
            </p>

            <div className="space-y-6 pt-4">
              {securityFeatures.map((feat, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <span className="text-2xl mt-1">{feat.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{feat.title}</h4>
                    <p className="text-xs text-slate-500 font-sans mt-1 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
