import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useNoraPresence } from "../../context/NoraPresenceContext";
import Nora3DCanvas from "./Nora3DCanvas";

export default function NoraVisual({ micLevel = 0 }) {
  const { 
    aiState, 
    cursorOffset, 
    inhaling, 
    passiveMode 
  } = useNoraPresence();

  const [isNightMode, setIsNightMode] = useState(() => {
    try {
      const saved = localStorage.getItem("nora_night_mode");
      return saved !== null ? JSON.parse(saved) : true; // Default to Night Mode
    } catch {
      return true;
    }
  });

  const handleToggleNightMode = () => {
    setIsNightMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("nora_night_mode", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // FaceTime Parallax Skew (subtle for executive feel)
  const rotateX = -cursorOffset.y * 3;
  const rotateY = cursorOffset.x * 3;
  const translateX = cursorOffset.x * 2;
  const translateY = cursorOffset.y * 2;

  // Breathing timing
  const breathingDuration = passiveMode || aiState === "SLEEP" ? "6s" : "4.5s";

  return (
    <div className="w-full flex flex-col gap-2 shrink-0 select-none">
      
      {/* System Status Row — Rendered OUTSIDE the 3D Canvas Viewport */}
      <div className="flex justify-between items-center w-full px-0.5">
        {/* Status Live Indicator Badge */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border backdrop-blur-md shadow-xs transition-colors duration-300 ${
            isNightMode
              ? "bg-slate-900/90 border-slate-700/80 text-cyan-300"
              : "bg-white border-slate-200 text-slate-700 shadow-2xs"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${
            aiState === "LISTENING" ? "bg-teal-500 animate-ping" :
            aiState === "THINKING" || aiState === "UNDERSTANDING" || aiState === "GENERATING" ? "bg-amber-500 animate-pulse" :
            aiState === "SPEAKING" ? "bg-teal-500 animate-pulse" :
            aiState === "SUCCESS" ? "bg-emerald-500" :
            aiState === "ERROR" ? "bg-rose-500 animate-ping" :
            aiState === "SLEEP" ? "bg-slate-400" :
            "bg-emerald-500 animate-pulse" // idle / boot
          }`} />
          <span className="text-[10px] uppercase font-mono tracking-wider font-bold select-none">
            NORA AI • LIVE 3D
          </span>
        </div>

        {/* Day / Night Mode Pill Toggle Switch (CortxAI Design Language) */}
        <button
          onClick={handleToggleNightMode}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider transition-all duration-300 border cursor-pointer select-none active:scale-95 ${
            isNightMode
              ? "bg-slate-900/90 border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/10 hover:border-cyan-400"
              : "bg-white border-slate-200 text-slate-700 shadow-2xs hover:bg-slate-50 hover:border-slate-300"
          }`}
          title="Toggle Day/Night 3D Canvas Mode"
        >
          {isNightMode ? (
            <>
              <Moon size={11} className="text-cyan-400 animate-pulse" />
              <span>🌙 Night</span>
            </>
          ) : (
            <>
              <Sun size={11} className="text-amber-500" />
              <span>☀ Day</span>
            </>
          )}
        </button>
      </div>

      {/* Clean 3D Viewport Canvas Container (No in-canvas overlays consuming viewport space!) */}
      <div
        className={`relative w-full rounded-2xl overflow-hidden flex items-center justify-center shadow-xs transition-colors duration-300 ${
          isNightMode
            ? "bg-[#0B1020] border border-slate-800"
            : "bg-[#F7F8FA] border border-slate-200/90"
        }`}
        style={{ height: "clamp(190px, 28vh, 250px)" }}
      >
        {/* 3D Avatar Container with parallax & breathing */}
        <div
          className="absolute inset-0 flex items-center justify-center z-0 origin-center"
          style={{
            transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${translateY}px)`,
            transition: "transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
          }}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              animation: `breathe ${breathingDuration} ease-in-out infinite`,
              transform: inhaling ? "translateY(-3px) scaleY(1.01)" : "none",
            }}
          >
            {/* LIVE 3D WEBGL NORA CHARACTER */}
            <Nora3DCanvas isNightMode={isNightMode} />
          </div>
        </div>

        {/* Breathe keyframes */}
        <style>{`
          @keyframes breathe {
            0%, 100% { transform: translateY(0px) scaleY(1); }
            50% { transform: translateY(-2px) scaleY(1.006); }
          }
        `}</style>
      </div>
    </div>
  );
}
