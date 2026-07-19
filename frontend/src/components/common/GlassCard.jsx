import React from "react";
import clsx from "clsx";

export default function GlassCard({ children, className = "", onClick, ...props }) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "rounded-3xl bg-white/[0.02] border border-white/10 p-6 backdrop-blur-xl shadow-xl hover:-translate-y-1.5 transition-all duration-300 group hover:border-cyan-500/30 hover:shadow-[0_15px_40px_rgba(6,182,212,0.06)] relative overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Decorative inner glow ring */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
      {children}
    </div>
  );
}
