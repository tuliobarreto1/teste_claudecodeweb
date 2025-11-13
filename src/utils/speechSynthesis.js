// Speech Synthesis utility for handling TTS with Web Speech API

export class SpeechHandler {
  constructor() {
    this.synth = window.speechSynthesis;
    this.utterance = null;
    this.onSpeakStart = null;
    this.onSpeakEnd = null;
    this.onSpeaking = null;
  }

  // Get available voices
  getVoices() {
    return this.synth.getVoices();
  }

  // Speak text with given voice and settings
  speak(text, voiceIndex = 0, rate = 1, pitch = 1) {
    // Stop any ongoing speech
    this.stop();

    const voices = this.getVoices();

    this.utterance = new SpeechSynthesisUtterance(text);

    if (voices[voiceIndex]) {
      this.utterance.voice = voices[voiceIndex];
    }

    this.utterance.rate = rate;
    this.utterance.pitch = pitch;

    // Event listeners
    this.utterance.onstart = () => {
      if (this.onSpeakStart) this.onSpeakStart();
      this.startMouthAnimation();
    };

    this.utterance.onend = () => {
      if (this.onSpeakEnd) this.onSpeakEnd();
      this.stopMouthAnimation();
    };

    this.utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      if (this.onSpeakEnd) this.onSpeakEnd();
      this.stopMouthAnimation();
    };

    this.synth.speak(this.utterance);
  }

  // Stop speaking
  stop() {
    this.synth.cancel();
    this.stopMouthAnimation();
  }

  // Check if speaking
  isSpeaking() {
    return this.synth.speaking;
  }

  // Start mouth animation
  startMouthAnimation() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }

    this.animationInterval = setInterval(() => {
      if (this.onSpeaking && this.synth.speaking) {
        this.onSpeaking();
      }
    }, 150); // Update mouth position every 150ms
  }

  // Stop mouth animation
  stopMouthAnimation() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  // Set callbacks
  setOnSpeakStart(callback) {
    this.onSpeakStart = callback;
  }

  setOnSpeakEnd(callback) {
    this.onSpeakEnd = callback;
  }

  setOnSpeaking(callback) {
    this.onSpeaking = callback;
  }
}

export default SpeechHandler;
