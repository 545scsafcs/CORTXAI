import React from "react";

export default function NoraTyping() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-white/5 border border-white/5 w-fit">
      <div
        className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
        style={{ animationDelay: "0ms" }}
      />
      <div
        className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <div
        className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );
}