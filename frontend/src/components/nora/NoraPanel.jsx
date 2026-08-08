import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Bot, User as UserIcon, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import NoraVisual from "./NoraVisual";
import VoiceOrb from "./VoiceOrb";
import NoraInput from "./NoraInput";
import NoraTyping from "./NoraTyping";
import NoraMarkdown from "./NoraMarkdown";

import { startListening } from "../../services/speech";
import { askGemini } from "../../services/gemini";
import { speak, stopSpeech } from "../../services/speak";

import { useAgent } from "../../context/AgentContext";
import { useNora } from "../../context/NoraContext";
import { useEmployee } from "../../context/EmployeeContext";
import { NoraPresenceProvider, useNoraPresence } from "../../context/NoraPresenceContext";

function NoraPanelContent({ isPanelOpen }) {
  const navigate = useNavigate();
  const { agent } = useAgent();
  const { setOpen } = useNora();
  const { employee } = useEmployee();

  const {
    aiState,
    setAiState,
    messages,
    addUserMessage,
    speakResponse,
    speakGreeting,
  } = useNoraPresence();

  // Visual layout states
  const [listening, setListening] = useState(false);
  const [typing, setTyping] = useState(false);
  const [micLevel, setMicLevel] = useState(0);

  // Audio analyzer refs
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const micStreamRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Auto-scroll ref
  const chatScrollRef = useRef(null);
  const userScrolledUpRef = useRef(false);

  // Handle scroll detection
  const handleScroll = () => {
    if (!chatScrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatScrollRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 80;
    userScrolledUpRef.current = !isAtBottom;
  };

  // Scroll to bottom when new messages arrive or typing status changes
  useEffect(() => {
    if (!userScrolledUpRef.current && chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, typing, aiState]);

  // Trigger greeting sequence every time panel opens — uses Wave animation + soft smile + speech
  useEffect(() => {
    if (isPanelOpen) {
      const name = employee?.firstName || "Vineet";
      const greetingText = `Hello ${name}, I'm Nora. How can I assist you today?`;
      speakGreeting(greetingText);
    }
  }, [isPanelOpen]);

  // Web Audio microphone telemetry
  const startAudioAnalyzer = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      const audioCtx = new AudioContextClass();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      source.connect(analyser);
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        setMicLevel(Math.min(average / 64, 1.0));
        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };

      updateVolume();
    } catch (err) {
      console.warn("Speech audio analyzer access error: ", err);
    }
  };

  const stopAudioAnalyzer = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch {}
    }
    analyserRef.current = null;
    micStreamRef.current = null;
    audioContextRef.current = null;
    setMicLevel(0);
  };

  async function handleCommand(text) {
    const command = text.toLowerCase();
    
    const triggers = [
      { words: ["dashboard"], text: "Opening Dashboard", path: "/dashboard", state: "SUCCESS" },
      { words: ["hr", "human resources"], text: "Opening Human Resources", path: "/dashboard/hr", state: "SUCCESS" },
      { words: ["inventory", "stock"], text: "Opening Inventory", path: "/dashboard/inventory", state: "SUCCESS" },
      { words: ["finance", "ledgers"], text: "Opening Finance", path: "/dashboard/finance", state: "SUCCESS" },
      { words: ["analytics", "kpi"], text: "Opening Analytics", path: "/dashboard/analytics", state: "SUCCESS" },
      { words: ["agent", "guild"], text: "Opening AI Agents", path: "/dashboard/agents", state: "SUCCESS" },
      { words: ["settings"], text: "Opening Settings", path: "/dashboard/settings", state: "SUCCESS" },
    ];

    for (const trig of triggers) {
      if (trig.words.some((word) => command.includes(word))) {
        setAiState(trig.state);
        speak(trig.text);
        
        setTimeout(() => {
          navigate(trig.path);
          setOpen(false);
        }, 1200);
        return true;
      }
    }

    if (command.includes("sleep") || command.includes("shut down") || command.includes("go to sleep")) {
      setAiState("SLEEP");
      speak("Going to sleep now. Wake me up when you need assistance.");
      return true;
    }

    return false;
  }

  async function askAI(text) {
    try {
      setTyping(true);
      setAiState("THINKING");

      const response = await askGemini(text, agent);
      
      setTyping(false);
      await speakResponse(response.reply);
    } catch (err) {
      setTyping(false);
      setAiState("ERROR");
      const errorMsg = err.message || "Unable to process request. Please try again.";
      await speakResponse(errorMsg);
    }
  }

  async function manualSend(text) {
    if (!text || !text.trim() || typing || aiState === "THINKING" || aiState === "GENERATING") return;
    
    const trimmed = text.trim();
    addUserMessage(trimmed);

    const handled = await handleCommand(trimmed);
    if (handled) return;

    await askAI(trimmed);
  }

  function startVoice() {
    if (listening || typing || aiState === "THINKING") return;

    setListening(true);
    setAiState("LISTENING");
    startAudioAnalyzer();

    speak("Listening");

    startListening(async (text) => {
      setListening(false);
      stopAudioAnalyzer();

      if (!text || !text.trim()) return;

      addUserMessage(text.trim());

      const handled = await handleCommand(text.trim());
      if (handled) return;

      await askAI(text.trim());
    });
  }

  const isProcessing = typing || aiState === "THINKING" || aiState === "GENERATING";

  return (
    <div className="h-full flex flex-col min-h-0 relative select-none font-sans bg-[#F7F8FA] p-1">
      
      {/* 3D Nora Avatar View (Waist-Up Crop, Light Mode) */}
      <div className="shrink-0 w-full mb-2">
        <NoraVisual micLevel={micLevel} />
      </div>

      {/* Main Conversation Scroll Stream (ChatGPT / Copilot Style) */}
      <div
        ref={chatScrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-1 py-2 space-y-3 scrollbar-thin select-text min-h-0"
      >
        {messages.map((msg, index) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={index}
              className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="w-6 h-6 rounded-lg bg-[#0F172A] flex items-center justify-center text-teal-400 shrink-0 shadow-xs mt-0.5">
                  <Bot size={12} />
                </div>
              )}

              <div
                className={`text-xs max-w-[85%] leading-relaxed ${
                  isUser
                    ? "bg-[#0F172A] text-white rounded-2xl rounded-tr-xs px-3.5 py-2.5 shadow-xs font-sans"
                    : "bg-white border border-slate-200 text-[#111111] rounded-2xl rounded-tl-xs px-3.5 py-3 shadow-xs"
                }`}
              >
                {!isUser && (
                  <div className="flex items-center gap-1.5 mb-1 select-none">
                    <span className="text-[11px] font-bold text-teal-600 font-outfit uppercase tracking-wider">Nora AI</span>
                    <span className="text-[9px] text-slate-400 font-mono">Assistant</span>
                  </div>
                )}

                {isUser ? (
                  <p className="whitespace-pre-wrap font-sans text-white text-xs">{msg.text}</p>
                ) : (
                  <div className="text-[#111111]">
                    <NoraMarkdown content={msg.text} />
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-6 h-6 rounded-lg bg-slate-200 flex items-center justify-center text-slate-600 shrink-0 shadow-xs mt-0.5">
                  <UserIcon size={12} />
                </div>
              )}
            </div>
          );
        })}

        {/* Animated Typing / Thinking State Indicator */}
        {isProcessing && (
          <div className="flex gap-2 justify-start">
            <div className="w-6 h-6 rounded-lg bg-[#0F172A] flex items-center justify-center text-teal-400 shrink-0 shadow-xs mt-0.5">
              <Bot size={12} />
            </div>
            <div className="bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-tl-xs px-3.5 py-2 shadow-xs flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium font-sans">Nora is thinking...</span>
              <NoraTyping />
            </div>
          </div>
        )}
      </div>

      {/* Voice Orb indicator when listening */}
      {listening && (
        <div className="shrink-0 flex justify-center py-2">
          <VoiceOrb
            listening={listening}
            onClick={() => {
              stopAudioAnalyzer();
              setListening(false);
              setAiState("IDLE");
            }}
            micLevel={micLevel}
          />
        </div>
      )}

      {/* Bottom Input Area with Quick Action Chips */}
      <div className="shrink-0 pt-2 border-t border-slate-200/80 bg-[#F7F8FA]">
        <NoraInput
          sendMessage={manualSend}
          onMicClick={startVoice}
          disabled={isProcessing}
        />
      </div>
    </div>
  );
}

export default function NoraPanel({ isPanelOpen = true }) {
  return (
    <NoraPresenceProvider>
      <NoraPanelContent isPanelOpen={isPanelOpen} />
    </NoraPresenceProvider>
  );
}