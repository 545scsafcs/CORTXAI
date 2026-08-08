import React from "react";
import { useAgent } from "../../context/AgentContext";
import { useNora } from "../../context/NoraContext";
import { Bot, MessageSquare } from "lucide-react";

export default function NoraPanel() {
  const { agent } = useAgent();
  const { setOpen } = useNora();

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm">
            <Bot size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-outfit">
              {agent.title}
            </h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5 font-outfit">
              AI Agent Controller
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider font-mono">Active</span>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p className="text-xs font-bold text-slate-500 font-outfit uppercase tracking-wider">
          Active Workforce Agent:
        </p>
        <div className="inline-flex items-center gap-3 rounded-2xl bg-slate-50 border border-slate-200 px-5 py-3 shadow-inner">
          <span className="text-xl">🤖</span>
          <span className="text-slate-900 font-bold font-outfit text-sm">
            {agent.title}
          </span>
        </div>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed mt-6 font-sans">
        Nora AI will execute operational telemetry tasks using {agent.title}.
      </p>

      <button
        onClick={() => setOpen(true)}
        className="mt-6 w-full rounded-2xl bg-slate-900 hover:bg-slate-800 text-white py-3.5 text-xs font-bold transition duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md"
      >
        <MessageSquare size={16} /> Open Nora AI Console
      </button>
    </div>
  );
}