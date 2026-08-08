import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { speak } from "../services/speak";
import { useEmployee } from "./EmployeeContext";

const NoraPresenceContext = createContext(null);

export function NoraPresenceProvider({ children }) {
  const { employee } = useEmployee();
  
  // State Machine: BOOT, IDLE, LISTENING, UNDERSTANDING, THINKING, GENERATING, SPEAKING, SUCCESS, ERROR, SLEEP
  const [aiState, setAiState] = useState("BOOT");
  
  // Awareness states
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const [inhaling, setInhaling] = useState(false);
  const [passiveMode, setPassiveMode] = useState(false);
  
  // Subtitle/Conversation log states
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Ref trackers
  const inactivityTimerRef = useRef(null);
  const mouseMoveTimerRef = useRef(null);
  const subtitleFadeTimerRef = useRef(null);
  const speakTimeoutRef = useRef(null);
  const blinkTimeoutRef = useRef(null);

  // 1. Mouse cursor tracking (FaceTime Parallax & Eye Contact)
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Clear return-to-center timer
      if (mouseMoveTimerRef.current) clearTimeout(mouseMoveTimerRef.current);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);

      // Normalize cursor coordinate between -1.0 and 1.0
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setCursorOffset({ x: x * 0.7, y: y * 0.7 }); // Subtle coordinate weight
      setPassiveMode(false);

      // If user stops moving mouse, head/eyes slowly return to center
      mouseMoveTimerRef.current = setTimeout(() => {
        setCursorOffset({ x: 0, y: 0 });
      }, 2000);

      // Handle long inactivity: after 25s, Nora relaxes and shows a soft reminder
      inactivityTimerRef.current = setTimeout(() => {
        if (aiState === "IDLE") {
          setCurrentSubtitle("I'm here whenever you're ready.");
          setIsSubtitleVisible(true);
          // Fade away after 5s
          setTimeout(() => setIsSubtitleVisible(false), 5000);
        }
      }, 25000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseMoveTimerRef.current) clearTimeout(mouseMoveTimerRef.current);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [aiState]);

  // 2. Tab focus monitoring (Passive vs Active)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setPassiveMode(true);
        if (aiState === "IDLE") {
          setAiState("SLEEP"); // Nora rests when user minimizes portal
        }
      } else {
        setPassiveMode(false);
        if (aiState === "SLEEP") {
          setAiState("IDLE"); // Looks back at user when focus returns
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [aiState]);

  // 3. Randomized micro blinking loop (closed eye crossfade)
  useEffect(() => {
    if (aiState === "SLEEP") {
      setIsBlinking(false);
      return;
    }

    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 140); // Standard human blink duration

      // Schedule next blink at random interval (3-7s)
      const nextDelay = 3000 + Math.random() * 4000;
      blinkTimeoutRef.current = setTimeout(triggerBlink, nextDelay);
    };

    blinkTimeoutRef.current = setTimeout(triggerBlink, 3500);

    return () => {
      if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
    };
  }, [aiState]);

  // 4. Lipsync trigger loop (semi-random high frequency toggling during speech)
  useEffect(() => {
    let lipsyncInterval;
    if (aiState === "SPEAKING" || aiState === "GREETING") {
      lipsyncInterval = setInterval(() => {
        setMouthOpen((prev) => !prev);
      }, 150 + Math.random() * 80); // Toggles mouth matching vocal syllables
    } else {
      setMouthOpen(false);
    }

    return () => {
      if (lipsyncInterval) clearInterval(lipsyncInterval);
    };
  }, [aiState]);

  // Track whether greeting is in progress to avoid overriding GREETING state with SPEAKING
  const greetingActiveRef = useRef(false);

  // 5. Speech boundary listener to sync visual lip movements
  useEffect(() => {
    const handleSpeechEvent = (e) => {
      const { type } = e.detail;
      if (type === "start") {
        // Don't override GREETING state — wave animation handles it
        if (!greetingActiveRef.current) {
          setAiState("SPEAKING");
        }
      } else if (type === "word") {
        // Toggle mouth open briefly on word triggers
        setMouthOpen(true);
        setTimeout(() => setMouthOpen(false), 80);
      } else if (type === "end") {
        // If greeting is active, do not force aiState to IDLE immediately;
        // let the 3D canvas complete the wave sequence cleanly!
        if (greetingActiveRef.current) {
          greetingActiveRef.current = false;
        } else {
          setAiState("IDLE");
        }
        setMouthOpen(false);
        // Fade subtitle caption out after 4 seconds of silence
        if (subtitleFadeTimerRef.current) clearTimeout(subtitleFadeTimerRef.current);
        subtitleFadeTimerRef.current = setTimeout(() => {
          setIsSubtitleVisible(false);
        }, 4000);
      }
    };

    window.addEventListener("nora-speech-event", handleSpeechEvent);
    return () => {
      window.removeEventListener("nora-speech-event", handleSpeechEvent);
    };
  }, []);

  const streamIntervalRef = useRef(null);

  // Stop all speech, clear speech queues, timers, and reset state
  const stopAllSpeech = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (speakTimeoutRef.current) clearTimeout(speakTimeoutRef.current);
    if (subtitleFadeTimerRef.current) clearTimeout(subtitleFadeTimerRef.current);
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);

    setAiState("IDLE");
    setMouthOpen(false);
    setInhaling(false);
    setIsSubtitleVisible(false);
    setCurrentSubtitle("");
  }, []);

  // 6. Subtitle word-by-word streaming helper
  const streamSubtitles = (text) => {
    if (subtitleFadeTimerRef.current) clearTimeout(subtitleFadeTimerRef.current);
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    
    setIsSubtitleVisible(true);
    setCurrentSubtitle("");

    const words = text.split(" ");
    let currentIdx = 0;
    
    // Typing animation rate (approx. 220ms per word)
    streamIntervalRef.current = setInterval(() => {
      setCurrentSubtitle((prev) => {
        const next = words.slice(0, currentIdx + 1).join(" ");
        currentIdx++;
        if (currentIdx >= words.length) {
          if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
        }
        return next;
      });
    }, 220);
  };

  // 7. Context-Aware response engine with humanized delay
  const speakResponse = async (text) => {
    if (speakTimeoutRef.current) clearTimeout(speakTimeoutRef.current);

    setAiState("THINKING");

    // Humanized randomized processing delay (280ms - 540ms)
    const delay = 280 + Math.random() * 260;

    speakTimeoutRef.current = setTimeout(() => {
      // Transition to Generating
      setAiState("GENERATING");
      
      // Inhale trigger (subtle shoulder lift before speaking)
      setInhaling(true);
      
      setTimeout(() => {
        setInhaling(false);
        setAiState("SPEAKING");

        // Add to history log
        setMessages((prev) => [...prev, { role: "assistant", text }]);
        
        // Start streaming subtitles and vocal speech
        streamSubtitles(text);
        speak(text);
      }, 350); // Inhale duration
    }, delay);
  };

  // 8. Greeting-specific speech engine (plays Wave animation instead of Talking)
  const speakGreeting = (text) => {
    if (speakTimeoutRef.current) clearTimeout(speakTimeoutRef.current);

    greetingActiveRef.current = true;

    // Set GREETING state immediately — this triggers Wave animation + greeting smile in 3D canvas
    setAiState("GREETING");

    // Add to history log if not already present
    setMessages((prev) => (prev.length === 0 ? [{ role: "assistant", text }] : prev));

    // Start streaming subtitles and vocal speech
    streamSubtitles(text);
    speak(text);
  };

  // Record user message
  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { role: "user", text }]);
  };

  return (
    <NoraPresenceContext.Provider
      value={{
        aiState,
        setAiState,
        cursorOffset,
        isBlinking,
        mouthOpen,
        inhaling,
        passiveMode,
        currentSubtitle,
        isSubtitleVisible,
        messages,
        addUserMessage,
        speakResponse,
        speakGreeting,
        stopAllSpeech,
        isHistoryOpen,
        setIsHistoryOpen,
      }}
    >
      {children}
    </NoraPresenceContext.Provider>
  );
}

export function useNoraPresence() {
  const context = useContext(NoraPresenceContext);
  if (!context) {
    throw new Error("useNoraPresence must be used inside a NoraPresenceProvider");
  }
  return context;
}
