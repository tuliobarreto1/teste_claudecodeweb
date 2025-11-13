// ElevenLabs API Integration for premium TTS

export class ElevenLabsTTS {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.elevenlabs.io/v1';
    this.audioElement = null;
    this.onSpeakStart = null;
    this.onSpeakEnd = null;
    this.onSpeaking = null;
    this.animationInterval = null;
  }

  // Get available voices from ElevenLabs
  async getVoices() {
    try {
      const response = await fetch(`${this.baseUrl}/voices`, {
        headers: {
          'xi-api-key': this.apiKey
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch voices');
      }

      const data = await response.json();
      return data.voices || [];
    } catch (error) {
      console.error('ElevenLabs API Error:', error);
      return [];
    }
  }

  // Generate speech from text
  async speak(text, voiceId, settings = {}) {
    try {
      const {
        stability = 0.5,
        similarityBoost = 0.5,
        style = 0,
        useSpeakerBoost = true
      } = settings;

      const response = await fetch(
        `${this.baseUrl}/text-to-speech/${voiceId}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': this.apiKey
          },
          body: JSON.stringify({
            text: text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability,
              similarity_boost: similarityBoost,
              style,
              use_speaker_boost: useSpeakerBoost
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Stop any currently playing audio
      this.stop();

      // Create and play audio element
      this.audioElement = new Audio(audioUrl);

      this.audioElement.onloadedmetadata = () => {
        if (this.onSpeakStart) this.onSpeakStart();
        this.startMouthAnimation();
      };

      this.audioElement.onended = () => {
        if (this.onSpeakEnd) this.onSpeakEnd();
        this.stopMouthAnimation();
        URL.revokeObjectURL(audioUrl);
      };

      this.audioElement.onerror = (error) => {
        console.error('Audio playback error:', error);
        if (this.onSpeakEnd) this.onSpeakEnd();
        this.stopMouthAnimation();
      };

      await this.audioElement.play();

      return true;
    } catch (error) {
      console.error('ElevenLabs TTS Error:', error);
      if (this.onSpeakEnd) this.onSpeakEnd();
      return false;
    }
  }

  // Stop speaking
  stop() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.audioElement = null;
    }
    this.stopMouthAnimation();
  }

  // Check if speaking
  isSpeaking() {
    return this.audioElement && !this.audioElement.paused;
  }

  // Start mouth animation
  startMouthAnimation() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }

    this.animationInterval = setInterval(() => {
      if (this.onSpeaking && this.isSpeaking()) {
        this.onSpeaking();
      }
    }, 150);
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

// Recommended mystical voices for ElevenLabs (examples)
export const MYSTICAL_VOICES = {
  joyful: {
    name: 'Bella - Energetic & Warm',
    id: '21m00Tcm4TlvDq8ikWAM', // Example voice ID
    settings: {
      stability: 0.4,
      similarityBoost: 0.7,
      style: 0.3
    }
  },
  mystical: {
    name: 'Callum - Deep & Mysterious',
    id: 'N2lVS1w4EtoT3dr4eOWO', // Example voice ID
    settings: {
      stability: 0.6,
      similarityBoost: 0.6,
      style: 0.2
    }
  }
};

export default ElevenLabsTTS;
