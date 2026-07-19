import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import VoiceOrb from "./VoiceOrb";
import NoraChat from "./NoraChat";
import NoraInput from "./NoraInput";
import NoraTyping from "./NoraTyping";
import NoraVoiceWave from "./NoraVoiceWave";

import { startListening } from "../../services/speech";
import { askGemini } from "../../services/gemini";
import { speak } from "../../services/speak";

import { useAgent } from "../../context/AgentContext";
import { useNora } from "../../context/NoraContext";

export default function NoraPanel() {

  const navigate = useNavigate();

  const { agent } = useAgent();
  const { setOpen } = useNora();

  const [listening, setListening] = useState(false);

  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: `Hello 👋 I am ${agent.title}. How can I help you today?`,
    },
  ]);

  useEffect(() => {
    function wakeHandler() {

      speak("Yes Vineet.");

      setTimeout(() => {
        startVoice();
      }, 700);

    }

    window.addEventListener("wake-nora", wakeHandler);

    return () => {
      window.removeEventListener("wake-nora", wakeHandler);
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    setMessages([
      {
        role: "assistant",
        text: `Hello 👋 I am ${agent.title}. How can I help you today?`,
      },
    ]);

  }, [agent]);

  async function handleCommand(text) {

    const command = text.toLowerCase();

    if (command.includes("dashboard")) {
      speak("Opening Dashboard");
      navigate("/dashboard");
      setOpen(false);
      return true;
    }

    if (command.includes("hr")) {
      speak("Opening Human Resources");
      navigate("/dashboard/hr");
      setOpen(false);
      return true;
    }

    if (command.includes("inventory")) {
      speak("Opening Inventory");
      navigate("/dashboard/inventory");
      setOpen(false);
      return true;
    }

    if (command.includes("finance")) {
      speak("Opening Finance");
      navigate("/dashboard/finance");
      setOpen(false);
      return true;
    }

    if (command.includes("analytics")) {
      speak("Opening Analytics");
      navigate("/dashboard/analytics");
      setOpen(false);
      return true;
    }

    if (command.includes("agent")) {
      speak("Opening AI Agents");
      navigate("/dashboard/agents");
      setOpen(false);
      return true;
    }

    if (command.includes("settings")) {
      speak("Opening Settings");
      navigate("/dashboard/settings");
      setOpen(false);
      return true;
    }

    return false;

  }

  async function askAI(text) {

    try {

      setTyping(true);

      const response = await askGemini(text, agent);

      setTyping(false);

      speak(response.reply);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: response.reply,
        },
      ]);

    } catch (err) {

      setTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: err.message,
        },
      ]);

    }

  }

  async function manualSend(text) {

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text,
      },
    ]);

    const handled = await handleCommand(text);

    if (handled) return;

    await askAI(text);

  }

  function startVoice() {

    if (listening) return;

    setListening(true);

    speak("Listening");

    startListening(async (text) => {

      setListening(false);

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          text,
        },
      ]);

      const handled = await handleCommand(text);

      if (handled) return;

      await askAI(text);

    });

  }

  return (

    <div className="h-full flex flex-col">

      <div className="flex-1 overflow-hidden">

        <NoraChat messages={messages} />

      </div>

      {typing && (

        <div className="mt-3">

          <NoraTyping />

        </div>

      )}

      <div className="flex justify-center mt-4">

        <VoiceOrb
          listening={listening}
          onClick={startVoice}
        />

      </div>

      <div className="flex justify-center mt-3 mb-5">

        <NoraVoiceWave />

      </div>

      <NoraInput
        sendMessage={manualSend}
      />

    </div>

  );

}