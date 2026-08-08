import React from "react";

export default function NoraTyping() {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-100 border border-slate-200 w-fit">
      <div
        className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce"
        style={{ animationDelay: "0ms" }}
      />
      <div
        className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <div
        className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );
}