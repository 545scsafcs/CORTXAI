import React, { useEffect, useRef } from "react";
import { Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VoiceOrb({ listening, onClick, micLevel = 0 }) {
  const canvasRef = useRef(null);

  // Dynamic canvas-based Siri-like wave animation inside the orb
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // When listening, draw multi-colored overlapping waves
      if (listening) {
        phase += 0.15 + micLevel * 0.1; // speed scales with volume

        // We draw 3 colored overlapping sine waves
        const waveConfig = [
          { color: "rgba(6, 182, 212, 0.4)", amp: 16 + micLevel * 50, freq: 0.04 },  // Cyan
          { color: "rgba(99, 102, 241, 0.35)", amp: 10 + micLevel * 40, freq: 0.03 }, // Indigo
          { color: "rgba(139, 92, 246, 0.25)", amp: 6 + micLevel * 30, freq: 0.06 },  // Purple
        ];

        waveConfig.forEach((cfg) => {
          ctx.beginPath();
          ctx.strokeStyle = cfg.color;
          ctx.lineWidth = 2.5;

          for (let x = 0; x < width; x++) {
            // Apply a bell-curve envelope so waves pinch at edges
            const envelope = Math.sin((x / width) * Math.PI);
            const y = centerY + Math.sin(x * cfg.freq + phase) * cfg.amp * envelope;

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        });
      } else {
        // Rhythmic breathing wave when idle
        phase += 0.03;
        ctx.beginPath();
        ctx.strokeStyle = "rgba(6, 182, 212, 0.15)";
        ctx.lineWidth = 1.5;

        for (let x = 0; x < width; x++) {
          const envelope = Math.sin((x / width) * Math.PI);
          const y = centerY + Math.sin(x * 0.02 + phase) * 4 * envelope;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [listening, micLevel]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Glow Rings behind orb */}
      <AnimatePresence>
        {listening && (
          <>
            {/* Outer Ring 1 */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1.6, opacity: [0.6, 0.1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
              className="absolute w-24 h-24 rounded-full border border-cyan-400/50 pointer-events-none shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            />
            {/* Outer Ring 2 */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 2.2, opacity: [0.4, 0.05, 0] }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.7, ease: "easeOut" }}
              className="absolute w-24 h-24 rounded-full border border-cyan-500/20 pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      {/* Main Core Orb */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 border cursor-pointer select-none ${
          listening
            ? "bg-slate-950/70 border-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.45)]"
            : "bg-[#0c1226]/80 border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_25px_rgba(6,182,212,0.15)]"
        }`}
      >
        {/* Waveform Canvas Overlay */}
        <canvas
          ref={canvasRef}
          width={96}
          height={96}
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
        />

        {/* Pulse scale layout overlay */}
        {listening && (
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-2 rounded-full bg-cyan-500/10 border border-cyan-400/20"
          />
        )}

        {/* Microphone symbol */}
        <Mic
          size={32}
          className={`relative z-20 transition-all duration-500 ${
            listening ? "text-cyan-400 scale-110 drop-shadow-[0_0_8px_#22d3ee]" : "text-slate-300"
          }`}
        />
      </motion.button>

      {/* Recording indicator label */}
      <div className="h-5 mt-2 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {listening ? (
            <motion.span
              key="listening-lbl"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-bold"
            >
              Listening...
            </motion.span>
          ) : (
            <motion.span
              key="idle-lbl"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="text-[10px] uppercase font-mono tracking-widest text-slate-500 hover:text-slate-400 cursor-pointer"
            >
              Click to talk
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}