import { useEffect, useRef } from "react";

export default function NoraChat({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-hidden h-full">
      <div className="h-full overflow-y-auto rounded-2xl bg-white/[0.01] border border-white/5 p-4 space-y-4 scrollbar-thin">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`
                px-4.5
                py-3
                rounded-2xl
                max-w-[85%]
                whitespace-pre-wrap
                text-sm
                leading-relaxed
                shadow-sm
                ${
                  msg.role === "user"
                    ? "bg-gradient-to-tr from-cyan-500 to-cyan-400 text-black font-semibold shadow-cyan-500/5 rounded-tr-none"
                    : "bg-white/5 border border-white/5 text-gray-200 rounded-tl-none"
                }
              `}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>
    </div>
  );
}