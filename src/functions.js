const ss = window.speechSynthesis
export const textToSpeech = (text) => {
    // let speech = new SpeechSynthesisUtterance(text);
    // speech.voice = ss.getVoices()[153]
    // ss.speak(speech)
    responsiveVoice.speak(text, "Japanese Male",{pitch: 1, rate: 1});
}