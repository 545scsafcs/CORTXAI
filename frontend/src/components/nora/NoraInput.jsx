import { SendHorizontal } from "lucide-react";
import { useState } from "react";

export default function NoraInput({ sendMessage }) {
  const [text, setText] = useState("");

  function submit() {
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  }

  return (
    <div className="flex items-center gap-3 mt-4">
      <input
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            submit();
          }
        }}
        placeholder="Ask Nora anything..."
        className="
          flex-1
          h-12
          bg-white/5
          border
          border-white/10
          rounded-xl
          px-5
          text-sm
          text-white
          placeholder-gray-500
          outline-none
          focus:border-cyan-400/50
          focus:ring-2
          focus:ring-cyan-500/20
          transition-all
          duration-300
        "
      />

      <button
        onClick={submit}
        className="
          w-12
          h-12
          rounded-xl
          bg-cyan-400
          hover:bg-cyan-300
          text-black
          flex
          items-center
          justify-center
          transition-all
          duration-300
          hover:scale-105
          active:scale-95
          shadow-lg
          shadow-cyan-400/10
          cursor-pointer
        "
      >
        <SendHorizontal size={18} />
      </button>
    </div>
  );
}