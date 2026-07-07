import { Mic } from "lucide-react";

export default function VoiceOrb({ listening, onClick }) {

  return (

    <button

      onClick={onClick}

      className={`

      relative

      w-32

      h-32

      rounded-full

      flex

      items-center

      justify-center

      transition-all

      duration-500

      ${

        listening

          ? "bg-cyan-400 scale-110 shadow-[0_0_120px_#22d3ee]"

          : "bg-cyan-500 hover:scale-105 shadow-[0_0_60px_#22d3ee]"

      }

      `}

    >

      <span

        className={`

        absolute

        inset-0

        rounded-full

        border

        border-cyan-300

        ${

          listening

            ? "animate-ping"

            : ""

        }

        `}

      />

      <span

        className={`

        absolute

        inset-3

        rounded-full

        border

        border-cyan-300/40

        ${

          listening

            ? "animate-pulse"

            : ""

        }

        `}

      />

      <Mic

        size={48}

        className="text-black relative z-10"

      />

    </button>

  );

}