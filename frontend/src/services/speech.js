import { startWakeWord } from "./wakeWord";

let commandRecognition;

export function startListening(callback) {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) return;

  commandRecognition = new SpeechRecognition();

  commandRecognition.lang = "en-US";

  commandRecognition.continuous = false;

  commandRecognition.interimResults = false;

  commandRecognition.maxAlternatives = 1;

  commandRecognition.onresult = (event) => {

    const text = event.results[0][0].transcript;

    callback(text);

  };

  commandRecognition.onerror = () => {

    commandRecognition.stop();

  };

  commandRecognition.onend = () => {

    setTimeout(() => {

      startWakeWord(() => {

        window.dispatchEvent(
          new Event("wake-nora")
        );

      });

    }, 1000);

  };

  commandRecognition.start();

}