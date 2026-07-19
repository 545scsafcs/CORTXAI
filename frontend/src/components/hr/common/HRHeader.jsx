import React from "react";

export default function HRHeader({ title, subtitle }) {
  return (
    <div className="mb-10 bg-white/[0.01] border border-white/5 p-8 rounded-3xl backdrop-blur-md shadow-sm relative overflow-hidden group">
      {/* Lighting accent decoration */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-outfit">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-400 mt-2.5 text-sm sm:text-base font-semibold leading-relaxed font-outfit">
          {subtitle}
        </p>
      )}
    </div>
  );
}
