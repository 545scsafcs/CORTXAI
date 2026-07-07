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

    <div className="flex items-center gap-3 mt-5">

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
        h-14
        bg-[#111827]
        border
        border-cyan-500/20
        rounded-2xl
        px-6
        text-white
        outline-none
        focus:border-cyan-400
        transition
        "

      />

      <button

        onClick={submit}

        className="
        w-14
        h-14
        rounded-2xl
        bg-cyan-400
        text-black
        flex
        items-center
        justify-center
        hover:scale-105
        transition
        "

      >

        <SendHorizontal size={22} />

      </button>

    </div>

  );

}