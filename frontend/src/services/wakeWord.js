let wakeRecognition = null;
let wakeEnabled = false;

export function stopWakeWord() {
  wakeEnabled = false;

  if (wakeRecognition) {
    wakeRecognition.onend = null;
    wakeRecognition.stop();
  }
}

export function startWakeWord(onWake) {

  if (wakeEnabled) return;

  wakeEnabled = true;

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) return;

  wakeRecognition = new SpeechRecognition();

  wakeRecognition.lang = "en-US";
  wakeRecognition.continuous = true;
  wakeRecognition.interimResults = true;

  wakeRecognition.onresult = (event) => {

    let transcript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript.toLowerCase();
    }

    console.log("Wake :", transcript);

    if (
      transcript.includes("hey nora") ||
      transcript.includes("hi nora") ||
      transcript.includes("hello nora")
    ) {

      stopWakeWord();

      onWake();

    }

  };

  wakeRecognition.onerror = () => {};

  wakeRecognition.onend = () => {

    if (wakeEnabled) {

      try {
        wakeRecognition.start();
      // eslint-disable-next-line no-empty
      } catch {}

    }

  };

  wakeRecognition.start();

} 