import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "max-w-xl",
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", duration: 0.4 }}
          className={`relative w-full ${maxWidth} rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-2xl z-10 space-y-6 overflow-hidden`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              {title && <h3 className="text-xl font-bold font-outfit text-slate-900">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-500 font-sans mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[70vh] overflow-y-auto scrollbar-thin pr-1 text-slate-800">{children}</div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function Drawer({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end font-sans">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
          className="relative w-full max-w-md h-full bg-white border-l border-slate-200 p-6 shadow-2xl z-10 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="text-lg font-bold font-outfit text-slate-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-6 scrollbar-thin text-slate-800">{children}</div>
        </motion.aside>
      </div>
    </AnimatePresence>
  );
}
