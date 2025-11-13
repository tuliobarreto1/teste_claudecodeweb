import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Moon } from 'lucide-react';
import JoyfulAvatar from './components/JoyfulAvatar';
import MysticalAvatar from './components/MysticalAvatar';
import VoiceControls from './components/VoiceControls';
import ExampleTexts from './components/ExampleTexts';
import SpeechHandler from './utils/speechSynthesis';

function App() {
  const [avatarType, setAvatarType] = useState('joyful'); // 'joyful' or 'mystical'
  const [mouthState, setMouthState] = useState('closed'); // 'closed', 'open', 'wide'
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [text, setText] = useState('');
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  const speechHandlerRef = useRef(null);

  // Initialize speech handler
  useEffect(() => {
    speechHandlerRef.current = new SpeechHandler();

    // Load voices
    const loadVoices = () => {
      const voices = speechHandlerRef.current.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);

        // Try to select a Portuguese voice by default
        const ptBrVoiceIndex = voices.findIndex(voice =>
          voice.lang.includes('pt-BR') || voice.lang.includes('pt')
        );
        if (ptBrVoiceIndex !== -1) {
          setSelectedVoice(ptBrVoiceIndex);
        }
      }
    };

    // Voices may not be loaded immediately
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Set callbacks for speech events
    speechHandlerRef.current.setOnSpeakStart(() => {
      setIsSpeaking(true);
    });

    speechHandlerRef.current.setOnSpeakEnd(() => {
      setIsSpeaking(false);
      setMouthState('closed');
    });

    speechHandlerRef.current.setOnSpeaking(() => {
      // Cycle through mouth states
      setMouthState((prev) => {
        const states = ['closed', 'open', 'wide', 'open'];
        const currentIndex = states.indexOf(prev);
        return states[(currentIndex + 1) % states.length];
      });
    });

    return () => {
      if (speechHandlerRef.current) {
        speechHandlerRef.current.stop();
      }
    };
  }, []);

  const handleSpeak = () => {
    if (text.trim() && speechHandlerRef.current) {
      speechHandlerRef.current.speak(text, selectedVoice, rate, pitch);
    }
  };

  const handleStop = () => {
    if (speechHandlerRef.current) {
      speechHandlerRef.current.stop();
      setIsSpeaking(false);
      setMouthState('closed');
    }
  };

  const handleTextSelect = (selectedText) => {
    setText(selectedText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-900 overflow-x-hidden">
      {/* Animated background stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 mb-4 text-glow">
            🔮 Tarô Místico 🔮
          </h1>
          <p className="text-purple-200 text-lg md:text-xl">
            Escolha seu guia espiritual e ouça as mensagens dos arcanos
          </p>
        </header>

        {/* Avatar Selector */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setAvatarType('joyful')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              avatarType === 'joyful'
                ? 'bg-gradient-to-r from-pink-600 to-yellow-600 text-white shadow-lg shadow-pink-500/50'
                : 'glass-effect text-purple-300 hover:text-white'
            }`}
          >
            <Sparkles size={20} />
            Guia Alegre
          </button>

          <button
            onClick={() => setAvatarType('mystical')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              avatarType === 'mystical'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50'
                : 'glass-effect text-purple-300 hover:text-white'
            }`}
          >
            <Moon size={20} />
            Guia Místico
          </button>
        </div>

        {/* Avatar Display */}
        <div className="flex justify-center mb-12">
          <div className="transform transition-all duration-500">
            {avatarType === 'joyful' ? (
              <JoyfulAvatar mouthState={mouthState} isSpeaking={isSpeaking} />
            ) : (
              <MysticalAvatar mouthState={mouthState} isSpeaking={isSpeaking} />
            )}
          </div>
        </div>

        {/* Speaking Indicator */}
        {isSpeaking && (
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 glass-effect px-6 py-3 rounded-full">
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
              <span className="text-purple-200 font-semibold">Falando...</span>
            </div>
          </div>
        )}

        {/* Voice Controls */}
        <div className="mb-8">
          <VoiceControls
            onSpeak={handleSpeak}
            onStop={handleStop}
            isSpeaking={isSpeaking}
            availableVoices={availableVoices}
            selectedVoice={selectedVoice}
            onVoiceChange={setSelectedVoice}
            rate={rate}
            onRateChange={setRate}
            pitch={pitch}
            onPitchChange={setPitch}
            text={text}
            onTextChange={setText}
          />
        </div>

        {/* Example Texts */}
        <div className="mb-12">
          <ExampleTexts avatarType={avatarType} onSelectText={handleTextSelect} />
        </div>

        {/* Footer */}
        <footer className="text-center text-purple-400 text-sm">
          <p>✨ Desenvolvido com energia mística e tecnologia moderna ✨</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
