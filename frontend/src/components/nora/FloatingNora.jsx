import React, { useEffect, useRef, useState } from "react";
import { Bot, X, Sparkles } from "lucide-react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNora } from "../../context/NoraContext";
import NoraPanel from "./NoraPanel";
import { startWakeWord } from "../../services/wakeWord";

import { stopSpeech } from "../../services/speak";

export default function FloatingNora() {
  const { open, setOpen } = useNora();
  const location = useLocation();
  const drawerRef = useRef(null);

  // Stop speech when panel closes or on navigation
  useEffect(() => {
    if (!open) {
      stopSpeech();
    }
  }, [open]);

  useEffect(() => {
    stopSpeech();
    setOpen(false);
  }, [location, setOpen]);

  // Click outside to close helper
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target || !document.body.contains(event.target)) {
        return;
      }
      if (drawerRef.current && drawerRef.current.contains(event.target)) {
        return;
      }
      const trigger = document.getElementById("nora-trigger");
      if (trigger && trigger.contains(event.target)) {
        return;
      }
      setOpen(false);
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("pointerdown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [open, setOpen]);

  // Escape key to close helper
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, setOpen]);

  // Initialize voice wake word listener
  useEffect(() => {
    async function initVoice() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          startWakeWord(() => {
            setOpen(true);
          });
        }
      } catch (err) {
        // Voice permissions handled gracefully
      }
    }
    initVoice();
  }, [setOpen]);

  const userRole = localStorage.getItem("userRole");

  // Enforce Landing Page Rule: hide Nora entirely on public marketing page
  if (location.pathname === "/" || !userRole) {
    return null;
  }

  return (
    <>
      {/* Floating Ask Nora Trigger Button — CortxAI Branded */}
      <AnimatePresence>
        {!open && (
          <motion.button
            id="nora-trigger"
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(6, 182, 212, 0.18)" }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#0F172A] text-white shadow-lg hover:shadow-xl border border-slate-700/50 transition-all duration-300 cursor-pointer group font-sans font-bold text-xs tracking-wide"
          >
            <div className="relative w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-400 to-teal-500 flex items-center justify-center shadow-sm">
              <Sparkles size={11} className="text-white" />
              <span className="absolute inset-0 rounded-full bg-cyan-400/25 animate-ping" />
            </div>
            <span className="group-hover:text-cyan-300 transition">
              Ask Nora AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Slide-over Panel (Permanently mounted for instant 0ms WebGL rendering) */}
      <div
        className={`fixed inset-0 z-50 flex justify-end items-stretch p-3 font-sans transition-all duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0 invisible"
        }`}
      >
        {/* Soft Backdrop */}
        <div
          className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Light Mode SaaS Panel — CortxAI Design System */}
        <div
          ref={drawerRef}
          onMouseDown={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-[420px] h-full bg-white border border-slate-200 rounded-2xl shadow-2xl z-10 flex flex-col pointer-events-auto overflow-hidden transition-all duration-300 ease-out ${
            open ? "translate-x-0 scale-100" : "translate-x-full scale-95"
          }`}
        >
          {/* Panel Header — Light Mode */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 shrink-0 bg-slate-50/80">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-[#0F172A] flex items-center justify-center text-cyan-400 shadow-sm">
                <Bot size={14} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-800 font-outfit leading-none tracking-wide uppercase">Nora Operating Layer</h3>
                <span className="text-[9px] text-teal-600 font-mono tracking-widest uppercase font-semibold">system_online</span>
              </div>
            </div>

            {/* Close Panel */}
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>

          {/* Dynamic Panel Content Container */}
          <div className="flex-1 min-h-0 px-3 py-2 overflow-hidden">
            <NoraPanel isPanelOpen={open} />
          </div>
        </div>
      </div>
    </>
  );
}