import React from "react";
import { motion } from "framer-motion";

export default function GlassCard({
  children,
  className = "",
  dept = "business", // 'hr' | 'crm' | 'finance' | 'inventory' | 'sales' | 'business' | 'admin' | 'employee'
  accent = false,
  onClick,
  ...props
}) {
  const deptBorders = {
    hr: "hover:border-indigo-300",
    crm: "hover:border-rose-300",
    finance: "hover:border-amber-300",
    inventory: "hover:border-emerald-300",
    sales: "hover:border-blue-300",
    business: "hover:border-cyan-300",
    admin: "hover:border-red-300",
    employee: "hover:border-teal-300",
  };

  const accentBars = {
    hr: "bg-indigo-600",
    crm: "bg-rose-500",
    finance: "bg-amber-500",
    inventory: "bg-emerald-500",
    sales: "bg-blue-600",
    business: "bg-slate-900",
    admin: "bg-red-500",
    employee: "bg-teal-600",
  };

  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={`relative rounded-3xl bg-white border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-all duration-200 group overflow-hidden ${deptBorders[dept] || deptBorders.business} ${className}`}
      {...props}
    >
      {accent && (
        <div
          className={`absolute top-0 left-0 right-0 h-1 ${accentBars[dept] || accentBars.business}`}
        />
      )}
      {children}
    </motion.div>
  );
}
