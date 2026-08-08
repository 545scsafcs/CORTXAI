import React from "react";

export default function Badge({
  children,
  variant = "info", // 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'cyan' | 'neutral'
  size = "md", // 'sm' | 'md' | 'lg'
  className = "",
}) {
  const styles = {
    success: "bg-emerald-50 text-emerald-800 border-emerald-200/90 font-extrabold",
    warning: "bg-amber-50 text-amber-900 border-amber-200/90 font-extrabold",
    danger: "bg-rose-50 text-rose-800 border-rose-200/90 font-extrabold",
    info: "bg-blue-50 text-blue-900 border-blue-200/90 font-extrabold",
    purple: "bg-purple-50 text-purple-900 border-purple-200/90 font-extrabold",
    cyan: "bg-cyan-50 text-cyan-900 border-cyan-200/90 font-extrabold",
    neutral: "bg-slate-100 text-slate-800 border-slate-250 font-extrabold",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[9px]",
    md: "px-2.5 py-1 text-[10px]",
    lg: "px-3 py-1.5 text-xs",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-full border ${styles[variant] || styles.info} ${sizes[size]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
