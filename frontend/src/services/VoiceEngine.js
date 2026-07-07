let recognition = null;

let wakeCallback = null;
let commandCallback = null;

let mode = "wake"; // wake | command

function createRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.error("Speech Recognition not supported");
    return null;
  }

  const sr = new SpeechRecognition();

  sr.lang = "en-US";
  sr.continuous = true;
  sr.interimResults = true;
  sr.maxAlternatives = 1;

  sr.onresult = (event) => {
    let transcript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript.toLowerCase();
    }

    console.log(mode.toUpperCase(), transcript);

    if (mode === "wake") {
      if (
        transcript.includes("hey nora") ||
        transcript.includes("hi nora") ||
        transcript.includes("hello nora")
      ) {
        mode = "command";
        wakeCallback?.();
      }
      return;
    }

    if (mode === "command") {
      mode = "wake";
      commandCallback?.(transcript);
    }
  };

  sr.onend = () => {
    try {
      sr.start();
    // eslint-disable-next-line no-empty
    } catch {}
  };

  return sr;
}

export function initVoiceEngine(onWake, onCommand) {
  wakeCallback = onWake;
  commandCallback = onCommand;

  if (!recognition) {
    recognition = createRecognition();
  }

  try {
    recognition.start();
  // eslint-disable-next-line no-empty
  } catch {}
}

export function stopVoiceEngine() {
  recognition?.stop();
}