import React from "react";
import { useAgent } from "../../context/AgentContext";
import { useNora } from "../../context/NoraContext";
import { Bot, MessageSquare } from "lucide-react";

export default function NoraPanel() {
  const { agent } = useAgent();
  const { setOpen } = useNora();

  return (
    <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-8 backdrop-blur-xl shadow-xl relative overflow-hidden group">
      {/* Accent design glows */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center text-black shadow-lg shadow-cyan-500/10">
            <Bot size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white font-outfit">
              {agent.title}
            </h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1 block">
              AI Workforce Controller
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-md shadow-green-500/30" />
          <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Online</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-sm font-semibold text-gray-400 font-outfit">
          Current Active Agent:
        </p>
        <div className="inline-flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-5 py-3 shadow-inner">
          <span className="text-xl">🤖</span>
          <span className="text-cyan-300 font-bold font-outfit text-sm">
            {agent.title}
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-400 leading-relaxed mt-6 font-outfit">
        {agent.title} will execute all requests using the currently selected AI Agent.
        Switch agents anytime from the AI Agents page.
      </p>

      <button
        onClick={() => setOpen(true)}
        className="mt-6 w-full rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black py-4 text-sm font-bold transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
      >
        <MessageSquare size={16} /> Talk to {agent.title}
      </button>
    </div>
  );
}