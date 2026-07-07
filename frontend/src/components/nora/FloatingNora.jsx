import { Bot, X } from "lucide-react";
import { useEffect } from "react";
import { useNora } from "../../context/NoraContext";
import NoraPanel from "./NoraPanel";

import { startWakeWord } from "../../services/wakeWord";

export default function FloatingNora() {

  const { open, setOpen } = useNora();

  useEffect(() => {

    async function initVoice() {

      try {

        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        startWakeWord(() => {

          console.log("Wake Word Detected");

          setOpen(true);

          window.dispatchEvent(
            new Event("wake-nora")
          );

        });

      } catch (err) {

        console.log("Microphone Permission Denied", err);

      }

    }

    initVoice();

  }, [setOpen]);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
          fixed
          bottom-8
          right-8
          z-[9999]

          w-16
          h-16

          rounded-full

          bg-cyan-400

          text-black

          shadow-[0_0_45px_#22d3ee]

          hover:scale-110

          transition-all
          duration-300
          "
        >
          <Bot className="mx-auto" size={30} />
        </button>
      )}

      {open && (
        <div
          className="
          fixed
          bottom-5
          right-5
          z-[9999]

          w-[680px]
          max-w-[96vw]

          h-[760px]

          bg-[#08111f]

          border
          border-cyan-500/20

          rounded-3xl

          shadow-[0_0_80px_rgba(34,211,238,0.18)]

          overflow-hidden

          flex
          flex-col
          "
        >
          <div className="flex items-center justify-between px-7 py-5 border-b border-white/10">

            <div>

              <h2 className="text-3xl font-bold">
                Nora AI
              </h2>

              <p className="text-green-400">
                ● Online
              </p>

            </div>

            <button
              onClick={() => setOpen(false)}
              className="hover:text-red-400 transition"
            >
              <X size={28} />
            </button>

          </div>

          <div className="flex-1 overflow-hidden">

            <NoraPanel />

          </div>

        </div>
      )}
    </>
  );
}