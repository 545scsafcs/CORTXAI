import React from "react";

export default function HRHeader({ title, subtitle }) {
  return (
    <div className="mb-8 bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-600" />
      <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 font-outfit">
        {title}
      </h1>
      {subtitle && (
        <p className="text-slate-600 mt-2 text-xs sm:text-sm font-semibold leading-relaxed font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
}
