import React, { useEffect, useRef } from "react";
import { X, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNoraPresence } from "../../context/NoraPresenceContext";
import NoraMarkdown from "./NoraMarkdown";

export default function HistoryDrawer() {
  const { messages, isHistoryOpen, setIsHistoryOpen } = useNoraPresence();
  const containerRef = useRef(null);

  // Auto scroll to bottom of log when opened
  useEffect(() => {
    if (isHistoryOpen && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [isHistoryOpen, messages]);

  return (
    <AnimatePresence>
      {isHistoryOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="absolute inset-0 z-40 bg-white rounded-2xl p-4 flex flex-col justify-between border border-slate-200 shadow-lg"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 select-none">
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-outfit">Conversation History</h4>
              <p className="text-[9px] text-slate-400 font-mono mt-0.5">Complete session transcript log</p>
            </div>
            <button
              onClick={() => setIsHistoryOpen(false)}
              className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>

          {/* Messages Log */}
          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto py-3 space-y-3 scrollbar-thin select-text min-h-0"
          >
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-xs italic">
                No logs recorded yet.
              </div>
            ) : (
              messages.map((msg, index) => {
                const isUser = msg.role === "user";
                return (
                  <div key={index} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
                    {!isUser && (
                      <div className="w-6 h-6 rounded-full bg-[#0F172A] flex items-center justify-center text-cyan-400 shrink-0 shadow-sm">
                        <Bot size={11} />
                      </div>
                    )}
                    <div
                      className={`px-3 py-2 rounded-2xl text-xs max-w-[80%] leading-relaxed ${
                        isUser
                          ? "bg-teal-50 border border-teal-200 text-teal-800 rounded-tr-none"
                          : "bg-slate-50 border border-slate-200 text-slate-700 rounded-tl-none"
                      }`}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap font-sans">{msg.text}</p>
                      ) : (
                        <NoraMarkdown content={msg.text} />
                      )}
                    </div>
                    {isUser && (
                      <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shrink-0 shadow-sm">
                        <User size={11} />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer note */}
          <div className="pt-2 border-t border-slate-100 text-center text-[9px] text-slate-400 font-mono select-none">
            Telemetry transaction ledger encrypted
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
