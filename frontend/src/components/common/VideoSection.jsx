import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function VideoSection({
  videoUrl,
  type = "analytics", // 'hr' | 'crm' | 'finance' | 'inventory' | 'sales' | 'analytics'
  className = "",
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      if (isInView) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isInView, videoUrl]);

  // Premium Animated SVG Fallback Dashboards - Handcrafted UI feel
  const renderInteractiveFallback = () => {
    switch (type) {
      case "hr":
        return (
          <div className="absolute inset-0 bg-[#faf9f6] flex flex-col p-6 font-sans">
            {/* HR Org Visualizer */}
            <div className="flex justify-between items-center border-b border-black/5 pb-4 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-600">Nora AI Workforce Orchestrator</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-4 items-center">
              <div className="col-span-1 flex flex-col gap-3">
                <div className="p-3 bg-white rounded-xl border border-black/5 shadow-sm hover:border-indigo-300 transition duration-300">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs mb-2">👤</div>
                  <div className="h-2 w-12 bg-slate-300 rounded mb-1"></div>
                  <div className="h-1.5 w-16 bg-slate-200 rounded"></div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-black/5 shadow-sm hover:border-indigo-300 transition duration-300">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs mb-2">👥</div>
                  <div className="h-2 w-16 bg-slate-300 rounded mb-1"></div>
                  <div className="h-1.5 w-10 bg-slate-200 rounded"></div>
                </div>
              </div>

              <div className="col-span-1 flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-indigo-500/5 rounded-full blur-lg animate-pulse"></div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/10">
                    🧠
                  </div>
                  {/* Floating connect lines */}
                  <svg className="absolute -inset-10 w-36 h-36 pointer-events-none" viewBox="0 0 100 100">
                    <line x1="15" y1="50" x2="35" y2="50" stroke="rgba(99,102,241,0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="85" y1="50" x2="65" y2="50" stroke="rgba(99,102,241,0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
                  </svg>
                </div>
              </div>

              <div className="col-span-1 flex flex-col gap-3">
                <div className="p-3 bg-white rounded-xl border border-black/5 shadow-sm hover:border-indigo-300 transition duration-300">
                  <div className="h-4 w-4 rounded bg-cyan-100 text-center text-[10px] mb-2">⚡</div>
                  <div className="h-2 w-14 bg-slate-300 rounded mb-1"></div>
                  <div className="h-1.5 w-12 bg-slate-200 rounded"></div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-black/5 shadow-sm hover:border-indigo-300 transition duration-300">
                  <div className="h-4 w-4 rounded bg-emerald-100 text-center text-[10px] mb-2">✓</div>
                  <div className="h-2 w-10 bg-slate-300 rounded mb-1"></div>
                  <div className="h-1.5 w-16 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-black/5 text-[9px] font-mono text-slate-400 mt-2">
              &gt;_ nora.hr.align("attendance", "payroll") // SUCCESS
            </div>
          </div>
        );

      case "crm":
        return (
          <div className="absolute inset-0 bg-[#f7f5f0] flex flex-col p-6 font-sans">
            <div className="flex justify-between items-center border-b border-black/5 pb-4 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-rose-500">Nora CRM Lead Intelligence</span>
              <span className="text-[10px] text-slate-400 font-mono">Conversion: 84.6%</span>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-black/5 shadow-sm p-4 flex flex-col justify-between">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Lead Scoring</span>
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center mt-2">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-rose-500" strokeDasharray="92, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-xl font-bold font-outfit text-rose-600">92</span>
                    <span className="block text-[8px] text-slate-400 font-bold uppercase">HOT</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 flex flex-col justify-center">
                <div className="bg-white p-2.5 rounded-lg border border-black/5 shadow-sm flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>
                  <div className="flex-1">
                    <div className="h-1.5 w-16 bg-slate-300 rounded mb-1"></div>
                    <div className="h-1 w-20 bg-slate-100 rounded"></div>
                  </div>
                  <span className="text-[9px] font-bold text-rose-500">Auto-Followup</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-black/5 shadow-sm flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                  <div className="flex-1">
                    <div className="h-1.5 w-12 bg-slate-300 rounded mb-1"></div>
                    <div className="h-1 w-16 bg-slate-100 rounded"></div>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400">Scheduled</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "finance":
        return (
          <div className="absolute inset-0 bg-[#ffffff] flex flex-col p-6 font-sans">
            <div className="flex justify-between items-center border-b border-black/5 pb-4 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-600">Nora Automated Ledger</span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 bg-opacity-70 px-2 py-0.5 rounded-full border border-emerald-100">+18.5% Growth</span>
            </div>
            <div className="flex-1 grid grid-cols-4 gap-2 items-end h-32 pt-4">
              {[60, 40, 85, 95].map((val, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${val}%` } : { height: 0 }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className="w-full bg-gradient-to-t from-amber-400 to-orange-500 rounded-t-lg shadow-sm"
                  ></motion.div>
                  <span className="text-[8px] font-mono text-slate-400 font-bold">Q{idx+1}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center text-[10px] border-t border-black/5 pt-3">
              <div className="flex items-center gap-1.5 text-slate-500">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> Ledger reconciled
              </div>
              <span className="font-mono font-bold text-slate-800">INR 1,45,20,380.00</span>
            </div>
          </div>
        );

      case "inventory":
        return (
          <div className="absolute inset-0 bg-[#f4f4f5] flex flex-col p-6 font-sans">
            <div className="flex justify-between items-center border-b border-black/5 pb-4 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-600">Nora Intelligent Stock Matrix</span>
              <span className="text-[10px] text-amber-500 font-bold font-mono">2 Low Stock Alerts</span>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-3">
              {[
                { name: "iPhone 15", qty: "45 Units", status: "Stable", col: "border-cyan-200 bg-cyan-50/20 text-cyan-600" },
                { name: "MacBook Pro", qty: "2 Units", status: "Reorder", col: "border-amber-300 bg-amber-50/30 text-amber-600 animate-pulse" },
                { name: "Studio Display", qty: "0 Units", status: "Out", col: "border-rose-200 bg-rose-50/20 text-rose-500" }
              ].map((item, idx) => (
                <div key={idx} className={`p-3 rounded-xl border ${item.col} flex flex-col justify-between shadow-sm`}>
                  <div>
                    <div className="h-1.5 w-12 bg-slate-300 rounded mb-1.5"></div>
                    <span className="text-xs font-bold text-slate-800 block">{item.name}</span>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-[10px] font-mono text-slate-500">{item.qty}</span>
                    <span className="text-[8px] uppercase tracking-wider font-bold">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "sales":
        return (
          <div className="absolute inset-0 bg-[#ffffff] flex flex-col p-6 font-sans">
            <div className="flex justify-between items-center border-b border-black/5 pb-4 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600">Nora Predictive Pipeline</span>
              <span className="text-[10px] text-blue-500 font-bold">14 Closing This Week</span>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-2">
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-[65%]" />
                <div className="bg-indigo-300 h-full w-[20%]" />
              </div>
              <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
                <span>65% Closed Won (INR 4.5M)</span>
                <span>20% Proposal Sent</span>
                <span>15% Qualified</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-black/5 flex items-center justify-between text-[10px] mt-2">
                <span className="text-slate-500">Predicted Monthly Revenue:</span>
                <span className="font-bold text-slate-800">INR 18,24,000</span>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="absolute inset-0 bg-[#faf9f6] flex flex-col p-6 font-sans">
            <div className="flex justify-between items-center border-b border-black/5 pb-4 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-600">Nora System Telemetry</span>
              <span className="text-[10px] text-indigo-500 font-mono">Normal Latency</span>
            </div>
            <div className="flex-1 flex items-center justify-center relative">
              {/* Radar circular pulse */}
              <div className="absolute w-32 h-32 border border-indigo-200 rounded-full animate-ping"></div>
              <div className="absolute w-20 h-20 border border-indigo-100 rounded-full"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-lg shadow-indigo-300"></div>
            </div>
            <div className="text-[9px] text-center text-slate-400 mt-2 font-mono">
              Analyzing telemetry metrics... OK
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full rounded-2xl md:rounded-[32px] overflow-hidden border border-black/5 shadow-2xl shadow-black/5 aspect-[16/10] bg-slate-100 ${className}`}
    >
      {videoUrl ? (
        <>
          <video
            ref={videoRef}
            src={videoUrl}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-xs">
                Loading
              </div>
            </div>
          )}
        </>
      ) : (
        renderInteractiveFallback()
      )}
    </motion.div>
  );
}
