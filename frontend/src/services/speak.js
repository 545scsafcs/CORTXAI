import { stopWakeWord } from "./wakeWord";

export function speak(text) {

  stopWakeWord();

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = "en-US";

  utterance.rate = 1;

  utterance.pitch = 1;

  utterance.volume = 1;

  const voices = speechSynthesis.getVoices();

  const female = voices.find(
    (v) =>
      v.name.toLowerCase().includes("zira") ||
      v.name.toLowerCase().includes("google") ||
      v.name.toLowerCase().includes("female")
  );

  if (female) {
    utterance.voice = female;
  }

  utterance.onend = () => {

    setTimeout(() => {

      // eslint-disable-next-line no-undef
      startWakeWord(() => {

        window.dispatchEvent(
          new Event("wake-nora")
        );

      });

    }, 500);

  };

  speechSynthesis.speak(utterance);

}