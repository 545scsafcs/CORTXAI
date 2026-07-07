import { useAgent } from "../../context/AgentContext";

export default function NoraPanel() {

  const { agent } = useAgent();

  return (

    <div
      className="
      rounded-3xl
      border
      border-cyan-400/20
      bg-gradient-to-br
      from-cyan-500/10
      to-blue-500/10
      p-8
      "
    >

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold">

            {agent.title}

          </h2>

          <p className="text-gray-400 mt-2">

            AI Workforce Controller

          </p>

        </div>

        <div
          className="
          w-4
          h-4
          rounded-full
          bg-green-400
          animate-pulse
          "
        />

      </div>

      <div className="mt-8 space-y-3">

        <p className="text-gray-300">

          Current Active Agent

        </p>

        <div
          className="
          inline-flex
          items-center
          gap-3
          rounded-xl
          bg-cyan-500/10
          border
          border-cyan-400/20
          px-5
          py-3
          "
        >

          <span className="text-2xl">

            🤖

          </span>

          <span className="text-cyan-300 font-semibold">

            {agent.title}

          </span>

        </div>

      </div>

      <div className="mt-8">

        <p className="text-gray-400 leading-7">

          Nora will execute all requests using the currently selected AI Agent.
          Switch agents anytime from the AI Agents page.

        </p>

      </div>

      <button
        className="
        mt-10
        rounded-xl
        bg-cyan-400
        text-black
        px-7
        py-3
        font-semibold
        hover:scale-105
        transition-all
        "
      >

        Talk to {agent.title}

      </button>

    </div>

  );

}