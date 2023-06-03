import { reactive } from "vue";

// const ss = window.speechSynthesis
export const ttsInfo = reactive({
    volume: 1
})
export const textToSpeech = (text) => {
    // let speech = new SpeechSynthesisUtterance(text);
    // speech.voice = ss.getVoices()[153]
    // ss.speak(speech)

    responsiveVoice.speak(text, "Japanese Male",{pitch: 1, rate: 1, volume: ttsInfo.volume });
}