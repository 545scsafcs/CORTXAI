import { Bot, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNora } from "../../context/NoraContext";
import NoraPanel from "./NoraPanel";
import { startWakeWord } from "../../services/wakeWord";

export default function FloatingNora() {
  const { open, setOpen } = useNora();
  const location = useLocation();
  const drawerRef = useRef(null);

  // Close when path/page changes
  useEffect(() => {
    setOpen(false);
  }, [location, setOpen]);

  // Listen for Escape key
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

  // Wake Word listener initialization
  useEffect(() => {
    async function initVoice() {
      try {
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        startWakeWord(() => {
          console.log("Wake Word Detected");
          setOpen(true);
          window.dispatchEvent(new Event("wake-nora"));
        });
      } catch (err) {
        console.log("Microphone Permission Denied or Not Available", err);
      }
    }
    initVoice();
  }, [setOpen]);

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-8 right-8 z-[9999] w-16 h-16 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-shadow hover:shadow-[0_0_50px_rgba(34,211,238,0.6)] cursor-pointer"
          >
            <Bot size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Drawer Overlay & Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            />

            {/* Glass Drawer Panel */}
            <motion.div
              ref={drawerRef}
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.5 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-4 right-4 bottom-4 z-[9999] w-[500px] max-w-[calc(100vw-2rem)] rounded-3xl bg-slate-950/70 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/[0.01]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center text-black shadow-lg shadow-cyan-500/10">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white leading-none font-outfit">
                      Nora AI
                    </h2>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 mt-1 block">
                      Autonomous Copilot
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-400 flex items-center justify-center transition-all duration-300"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Chat Viewport Area */}
              <div className="flex-1 overflow-hidden p-6 bg-slate-950/20">
                <NoraPanel />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}