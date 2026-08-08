import React, { useState, useRef } from "react";
import { SendHorizontal, Paperclip, Mic, X, Calendar, Briefcase, BarChart3, TrendingUp, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const QUICK_ACTIONS = [
  { label: "Check Attendance", icon: Calendar, prompt: "What is my attendance status for this month?" },
  { label: "Apply Leave", icon: Briefcase, prompt: "How do I apply for leave?" },
  { label: "Dashboard Summary", icon: BarChart3, prompt: "Give me my executive dashboard summary." },
  { label: "Salary Details", icon: TrendingUp, prompt: "Show my salary and payroll overview." },
  { label: "Employee Profile", icon: User, prompt: "Show my employee profile details." },
];

export default function NoraInput({ sendMessage, onMicClick, disabled = false }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (disabled) return;
    if (!text.trim() && !file) return;

    let finalMessage = text.trim();
    if (file) {
      finalMessage = `[File Attached: ${file.name}]\n${finalMessage}`;
    }

    sendMessage(finalMessage);
    setText("");
    setFile(null);
  };

  const handleChipClick = (prompt) => {
    if (disabled) return;
    sendMessage(prompt);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2 relative z-20 shrink-0">
      {/* Quick Action Suggestion Chips (Priority 13) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none select-none">
        {QUICK_ACTIONS.map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              disabled={disabled}
              onClick={() => handleChipClick(action.prompt)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 text-slate-700 hover:text-slate-900 text-[11px] font-medium transition cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs"
            >
              <Icon size={12} className="text-teal-600 shrink-0" />
              <span>{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* File Attachment Chip */}
      <AnimatePresence>
        {file && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs w-fit max-w-[90%]"
          >
            <Paperclip size={12} className="shrink-0" />
            <span className="truncate max-w-[180px] font-mono">{file.name}</span>
            <button
              onClick={removeFile}
              className="p-0.5 rounded-full hover:bg-teal-100 text-teal-500 hover:text-teal-700 transition cursor-pointer"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Input Field — Light Mode SaaS Design (Priority 7 & 14) */}
      <div className={`relative flex items-center bg-white border rounded-2xl px-3 py-2 shadow-sm transition-all duration-300 ${
        disabled
          ? "border-slate-200 opacity-70 bg-slate-50 cursor-not-allowed"
          : "border-slate-200 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/15"
      }`}>
        
        {/* Attachment Button */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />
        <button
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
          className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition active:scale-95 cursor-pointer shrink-0 disabled:opacity-50"
          title="Attach file"
        >
          <Paperclip size={16} />
        </button>

        {/* Text Input — Enter to send, Shift+Enter for newline */}
        <input
          disabled={disabled}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={disabled ? "Nora is processing..." : "Ask Nora anything..."}
          className="flex-1 bg-transparent border-0 outline-none text-[#111111] placeholder-slate-400 text-xs px-2 py-0.5 h-auto min-w-0 font-sans font-normal"
        />

        {/* Action Controls */}
        <div className="flex items-center gap-1 shrink-0">
          
          {/* Voice Mic Button */}
          {onMicClick && (
            <button
              disabled={disabled}
              onClick={onMicClick}
              className="p-1.5 rounded-xl text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition active:scale-95 cursor-pointer disabled:opacity-50"
              title="Voice Input"
            >
              <Mic size={16} />
            </button>
          )}

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={disabled || (!text.trim() && !file)}
            className={`p-2 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
              !disabled && (text.trim() || file)
                ? "bg-[#0F172A] text-white hover:bg-slate-800 hover:scale-105 active:scale-95 shadow-sm"
                : "bg-slate-100 text-slate-300 cursor-not-allowed"
            }`}
          >
            <SendHorizontal size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}