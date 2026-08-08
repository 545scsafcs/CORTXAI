import { startWakeWord, stopWakeWord } from "./wakeWord";

/**
 * Deterministic Female Voice Resolver with Indian English & Hindi Priority
 */
function getBestFemaleVoice(voices) {
  if (!voices || voices.length === 0) return null;

  // Filter out male voices
  const maleKeywords = ["male", "david", "mark", "george", "james", "richard", "adam", "guy", "stefan", "pavel", "diego"];
  const femaleOnly = voices.filter((v) => {
    const name = v.name.toLowerCase();
    return !maleKeywords.some((kw) => name.includes(kw));
  });

  const pool = femaleOnly.length > 0 ? femaleOnly : voices;

  // Tier 1: Indian English or Hindi Female Voices
  const indianFemale = pool.find((v) => {
    const name = v.name.toLowerCase();
    const lang = v.lang.toLowerCase();
    return (
      (lang.includes("en-in") || lang.includes("hi-in") || name.includes("india") || name.includes("indian")) &&
      (name.includes("heera") || name.includes("neerja") || name.includes("veena") || name.includes("female") || name.includes("google"))
    );
  });
  if (indianFemale) return indianFemale;

  // Tier 2: Any en-IN or hi-IN voice in female pool
  const anyIndian = pool.find((v) => {
    const lang = v.lang.toLowerCase();
    return lang.includes("en-in") || lang.includes("hi-in");
  });
  if (anyIndian) return anyIndian;

  // Tier 3: Known high-quality Female Voices
  const preferredFemaleNames = ["zira", "google us english", "samantha", "jenny", "karen", "victoria", "female"];
  const preferredFemale = pool.find((v) => {
    const name = v.name.toLowerCase();
    return preferredFemaleNames.some((p) => name.includes(p));
  });
  if (preferredFemale) return preferredFemale;

  // Tier 4: First female voice
  return pool[0];
}

export function speak(text) {
  stopWakeWord();

  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(text);

  // Detect Devanagari or Hindi text for language accent hint
  const hasHindiScript = /[\u0900-\u097F]/.test(text);
  utterance.lang = hasHindiScript ? "hi-IN" : "en-IN";

  utterance.rate = 1.0;  // Natural conversational speed
  utterance.pitch = 1.0; // Natural female pitch
  utterance.volume = 1;

  if (typeof window !== "undefined" && window.speechSynthesis) {
    const voices = speechSynthesis.getVoices();
    const bestVoice = getBestFemaleVoice(voices);
    if (bestVoice) {
      utterance.voice = bestVoice;
    }
  }

  // Sync state machine hooks
  utterance.onstart = () => {
    window.dispatchEvent(new CustomEvent("nora-speech-event", { detail: { type: "start" } }));
  };

  utterance.onboundary = (event) => {
    if (event.name === "word") {
      window.dispatchEvent(new CustomEvent("nora-speech-event", { detail: { type: "word", charIndex: event.charIndex } }));
    }
  };

  utterance.onerror = () => {
    window.dispatchEvent(new CustomEvent("nora-speech-event", { detail: { type: "end" } }));
  };

  utterance.onend = () => {
    window.dispatchEvent(new CustomEvent("nora-speech-event", { detail: { type: "end" } }));

    setTimeout(() => {
      startWakeWord(() => {
        window.dispatchEvent(new Event("wake-nora"));
      });
    }, 500);
  };

  if (typeof window !== "undefined" && window.speechSynthesis) {
    speechSynthesis.speak(utterance);
  }
}

export function stopSpeech() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  window.dispatchEvent(new CustomEvent("nora-speech-event", { detail: { type: "end" } }));
}