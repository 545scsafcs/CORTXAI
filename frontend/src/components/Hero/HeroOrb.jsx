import React from "react";
import { motion } from "framer-motion";

const modules = [
  { name: "HR", icon: "👥", angle: 0 },
  { name: "CRM", icon: "📊", angle: 45 },
  { name: "Sales", icon: "📈", angle: 90 },
  { name: "Inventory", icon: "📦", angle: 135 },
  { name: "Finance", icon: "💰", angle: 180 },
  { name: "Analytics", icon: "⚡", angle: 225 },
  { name: "Support", icon: "💬", angle: 270 },
  { name: "Projects", icon: "🗂️", angle: 315 },
];

export default function HeroOrb() {
  return (
    <div className="relative w-full max-w-[550px] aspect-square flex items-center justify-center select-none">
      
      {/* Central Nora Core Neocortex */}
      <div className="relative w-72 h-72 flex items-center justify-center z-20">
        
        {/* Layer 1: Ambient outer blur glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-[-40px] rounded-full bg-gradient-to-tr from-cyan-400/20 via-blue-500/10 to-indigo-600/20 blur-[60px]"
        />

        {/* Layer 2: Pulse Ring */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full border border-cyan-400/20 shadow-[0_0_80px_rgba(6,182,212,0.15)]"
        />

        {/* Layer 3: Main Organic Orb with blend modes */}
        <motion.div
          animate={{
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center p-[2px] shadow-[0_0_100px_rgba(6,182,212,0.35)]"
        >
          <div className="w-full h-full rounded-full bg-slate-950/80 backdrop-blur-3xl flex flex-col items-center justify-center text-center">
            {/* Core logo indicator */}
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-2xl mb-1"
            >
              🧠
            </motion.div>
            <h2 className="text-2xl font-black font-outfit text-white tracking-widest uppercase">
              Nora OS
            </h2>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest font-mono">
                Continuous
              </span>
            </div>
          </div>
        </motion.div>

        {/* Inner Voice Calling/Wave representation */}
        <svg className="absolute w-56 h-56 pointer-events-none opacity-30" viewBox="0 0 100 100">
          <motion.circle
            cx="50" cy="50" r="38"
            fill="none" stroke="#22d3ee" strokeWidth="0.5"
            strokeDasharray="2 6"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="50" cy="50" r="44"
            fill="none" stroke="#6366f1" strokeWidth="0.5"
            strokeDasharray="4 8"
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          />
        </svg>

      </div>

      {/* Orbiting Modules (Counter-rotation approach) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[80%] h-[80%] z-30"
      >
        {modules.map((m, idx) => {
          // Angle in radians
          const rad = (m.angle * Math.PI) / 180;
          // Offset coordinates based on circle bounds
          const x = Math.cos(rad) * 100;
          const y = Math.sin(rad) * 100;

          return (
            <div
              key={idx}
              className="absolute"
              style={{
                top: `calc(50% + ${y}%)`,
                left: `calc(50% + ${x}%)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Counter-rotation to keep the cards upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
                whileHover={{ scale: 1.06, y: -4 }}
                className="bg-white/70 backdrop-blur-md border border-black/[0.04] shadow-md px-4 py-2.5 rounded-2xl flex items-center gap-2.5 cursor-default hover:bg-white transition-colors duration-300 min-w-[100px] justify-center"
              >
                <span className="text-base">{m.icon}</span>
                <span className="text-[10px] font-bold text-slate-800 tracking-wide uppercase font-sans">
                  {m.name}
                </span>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

    </div>
  );
}