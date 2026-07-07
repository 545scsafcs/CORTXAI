import { useEffect, useRef } from "react";

export default function NoraChat({ messages }) {

  const bottomRef = useRef(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({

      behavior: "smooth"

    });

  }, [messages]);

  return (

    <div className="flex-1 overflow-hidden">

      <div
        className="
        h-full
        overflow-y-auto
        rounded-3xl
        bg-[#0f172a]
        border
        border-cyan-500/20
        p-6
        space-y-5
        "
      >

        {messages.map((msg, index) => (

          <div

            key={index}

            className={`flex ${

              msg.role === "user"

                ? "justify-end"

                : "justify-start"

            }`}

          >

            <div

              className={`

              px-5

              py-3

              rounded-2xl

              max-w-[82%]

              whitespace-pre-wrap

              leading-7

              ${

                msg.role === "user"

                  ? "bg-cyan-400 text-black"

                  : "bg-white/10 text-white"

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