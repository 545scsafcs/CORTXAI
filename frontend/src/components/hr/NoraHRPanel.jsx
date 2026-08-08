import React, { useState } from "react";
import { Send, Bot } from "lucide-react";
import { askGemini } from "../../services/gemini";

export default function NoraHRPanel() {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([
    {
      role: "assistant",
      text: "Hello! I am your HR assistant Nora. Ask me anything about employees, attendance, payroll, or leaves.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setInput("");
    setConversation((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
      // Direct Nora query with the HR agent context
      const res = await askGemini(userText, { id: "hr", title: "HR Agent" });
      setConversation((prev) => [...prev, { role: "assistant", text: res.reply }]);
    } catch (err) {
      setConversation((prev) => [
        ...prev,
        { role: "assistant", text: "Sorry, I am having trouble connecting to my brain right now." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-sm font-sans">
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#0F172A] rounded-2xl text-white shadow-xs">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-outfit">Nora HR Brain</h3>
            <p className="text-xs text-slate-500 font-medium">Contextual Recruitment & Attendance Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-emerald-800 font-extrabold uppercase tracking-wider font-mono">Active</span>
        </div>
      </div>

      {/* Chat scroll box */}
      <div className="h-48 overflow-y-auto space-y-3 pr-1 scrollbar-thin text-xs">
        {conversation.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-2xl max-w-[85%] font-medium leading-relaxed ${
              msg.role === "user"
                ? "bg-[#0F172A] text-white ml-auto border border-slate-900 shadow-xs"
                : "bg-slate-50 text-slate-900 mr-auto border border-slate-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="bg-slate-50 text-slate-600 mr-auto border border-slate-200 p-3.5 rounded-2xl max-w-[85%] flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Nora (e.g. 'How many developers do we have?')"
          className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-2xl pr-14 text-xs text-slate-900 font-medium placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 p-2 bg-[#0F172A] hover:bg-slate-800 rounded-xl text-white transition shadow-xs cursor-pointer"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
