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
    <div className="rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 p-8 space-y-6">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-400 rounded-xl text-black">
            <Bot size={22} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Nora HR Brain</h3>
            <p className="text-xs text-gray-400">Contextual Recruitment & Attendance Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs text-cyan-300 font-semibold uppercase tracking-wider">Active</span>
        </div>
      </div>

      {/* Chat scroll box */}
      <div className="h-44 overflow-y-auto space-y-3 pr-2 scrollbar-thin text-sm">
        {conversation.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-2xl max-w-[85%] ${
              msg.role === "user"
                ? "bg-cyan-500/20 text-white ml-auto border border-cyan-400/20"
                : "bg-white/5 text-gray-300 mr-auto border border-white/5"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="bg-white/5 text-gray-300 mr-auto border border-white/5 p-3.5 rounded-2xl max-w-[85%] flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Nora (e.g. 'How many developers do we have?')"
          className="w-full bg-[#0B1120] border border-white/10 p-4 rounded-xl pr-14 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-500/50"
        />
        <button
          type="submit"
          className="absolute right-3 top-3 p-2 bg-cyan-400 rounded-lg hover:bg-cyan-300 text-black transition"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
