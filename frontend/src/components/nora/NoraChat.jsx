import React from "react";
import { useNoraPresence } from "../../context/NoraPresenceContext";
import NoraMarkdown from "./NoraMarkdown";

export default function NoraChat() {
  const { currentSubtitle, isSubtitleVisible, aiState } = useNoraPresence();

  return (
    <div className={`w-full flex justify-center py-2 relative z-20 transition-all duration-700 ease-in-out ${
      isSubtitleVisible && currentSubtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
    }`}>
      {/* Subtitle card — Light Mode */}
      <div className="w-[95%] bg-white/95 border border-slate-200 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-md flex flex-col items-center justify-center gap-2 select-text">
        <div className="text-center text-sm leading-relaxed text-slate-700 font-sans font-medium tracking-wide">
          <NoraMarkdown content={currentSubtitle} />
        </div>

        {/* Audio wave visualizer */}
        {aiState === "SPEAKING" && (
          <div className="flex items-center justify-center gap-1.5 h-3.5 mt-0.5 select-none opacity-80">
            <span className="w-0.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "0ms", animationDuration: "0.6s" }} />
            <span className="w-0.5 h-3 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "150ms", animationDuration: "0.5s" }} />
            <span className="w-0.5 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "300ms", animationDuration: "0.7s" }} />
            <span className="w-0.5 h-4.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "100ms", animationDuration: "0.6s" }} />
            <span className="w-0.5 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "450ms", animationDuration: "0.8s" }} />
            <span className="w-0.5 h-3 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "200ms", animationDuration: "0.5s" }} />
            <span className="w-0.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "350ms", animationDuration: "0.6s" }} />
          </div>
        )}
      </div>
    </div>
  );
}