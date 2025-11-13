import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Moon, BookOpen, Mic2 } from 'lucide-react';
import JoyfulAvatar from './components/JoyfulAvatar';
import MysticalAvatar from './components/MysticalAvatar';
import VoiceControls from './components/VoiceControls';
import ExampleTexts from './components/ExampleTexts';
import TarotReading from './components/TarotReading';
import TTSSettings from './components/TTSSettings';
import SpeechHandler from './utils/speechSynthesis';
import ElevenLabsTTS from './utils/elevenLabsTTS';
import { generateQuickInterpretation } from './utils/tarotInterpreter';

function App() {
  const [mode, setMode] = useState('voice'); // 'voice' or 'tarot'
  const [avatarType, setAvatarType] = useState('joyful'); // 'joyful' or 'mystical'
  const [mouthState, setMouthState] = useState('closed'); // 'closed', 'open', 'wide'
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [text, setText] = useState('');

  // TTS Engine selection
  const [ttsEngine, setTtsEngine] = useState('web'); // 'web' or 'elevenlabs'

  // Web Speech API states
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  // ElevenLabs states
  const [elevenLabsVoices, setElevenLabsVoices] = useState([]);
  const [selectedElevenLabsVoice, setSelectedElevenLabsVoice] = useState('');
  const [isLoadingVoices, setIsLoadingVoices] = useState(false);

  const speechHandlerRef = useRef(null);
  const elevenLabsRef = useRef(null);

  // Initialize ElevenLabs
  useEffect(() => {
    const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;

    if (apiKey) {
      elevenLabsRef.current = new ElevenLabsTTS(apiKey);

      // Load ElevenLabs voices
      const loadElevenLabsVoices = async () => {
        setIsLoadingVoices(true);
        try {
          const voices = await elevenLabsRef.current.getVoices();
          setElevenLabsVoices(voices);

          // Select first Portuguese or English voice
          const portugueseVoice = voices.find(v =>
            v.labels?.language?.toLowerCase().includes('portuguese')
          );
          const englishVoice = voices.find(v =>
            v.labels?.language?.toLowerCase().includes('english')
          );

          if (portugueseVoice) {
            setSelectedElevenLabsVoice(portugueseVoice.voice_id);
          } else if (englishVoice) {
            setSelectedElevenLabsVoice(englishVoice.voice_id);
          } else if (voices.length > 0) {
            setSelectedElevenLabsVoice(voices[0].voice_id);
          }
        } catch (error) {
          console.error('Error loading ElevenLabs voices:', error);
        } finally {
          setIsLoadingVoices(false);
        }
      };

      loadElevenLabsVoices();

      // Setup callbacks for ElevenLabs
      elevenLabsRef.current.setOnSpeakStart(() => {
        setIsSpeaking(true);
      });

      elevenLabsRef.current.setOnSpeakEnd(() => {
        setIsSpeaking(false);
        setMouthState('closed');
      });

      elevenLabsRef.current.setOnSpeaking(() => {
        setMouthState((prev) => {
          const states = ['closed', 'open', 'wide', 'open'];
          const currentIndex = states.indexOf(prev);
          return states[(currentIndex + 1) % states.length];
        });
      });
    }
  }, []);

  // Initialize Web Speech API
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
      if (elevenLabsRef.current) {
        elevenLabsRef.current.stop();
      }
    };
  }, []);

  const handleSpeak = async () => {
    if (!text.trim()) return;

    if (ttsEngine === 'elevenlabs' && elevenLabsRef.current && selectedElevenLabsVoice) {
      // Use ElevenLabs
      try {
        await elevenLabsRef.current.speak(text, selectedElevenLabsVoice);
      } catch (error) {
        console.error('ElevenLabs TTS error:', error);
        // Fallback to Web Speech
        if (speechHandlerRef.current) {
          speechHandlerRef.current.speak(text, selectedVoice, rate, pitch);
        }
      }
    } else {
      // Use Web Speech API
      if (speechHandlerRef.current) {
        speechHandlerRef.current.speak(text, selectedVoice, rate, pitch);
      }
    }
  };

  const handleStop = () => {
    if (speechHandlerRef.current) {
      speechHandlerRef.current.stop();
    }
    if (elevenLabsRef.current) {
      elevenLabsRef.current.stop();
    }
    setIsSpeaking(false);
    setMouthState('closed');
  };

  const handleTextSelect = (selectedText) => {
    setText(selectedText);
  };

  // Handle tarot interpretation
  const handleInterpretation = (readingData) => {
    const interpretation = generateQuickInterpretation(readingData);
    setText(interpretation);

    // Auto-speak interpretation
    setTimeout(async () => {
      if (ttsEngine === 'elevenlabs' && elevenLabsRef.current && selectedElevenLabsVoice) {
        try {
          await elevenLabsRef.current.speak(interpretation, selectedElevenLabsVoice);
        } catch (error) {
          console.error('ElevenLabs TTS error:', error);
          if (speechHandlerRef.current) {
            speechHandlerRef.current.speak(interpretation, selectedVoice, rate, pitch);
          }
        }
      } else if (speechHandlerRef.current) {
        speechHandlerRef.current.speak(interpretation, selectedVoice, rate, pitch);
      }
    }, 500);
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
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 mb-4 text-glow">
            🔮 Tarô Místico 🔮
          </h1>
          <p className="text-purple-200 text-lg md:text-xl mb-6">
            Escolha seu guia espiritual e ouça as mensagens dos arcanos
          </p>

          {/* Mode Selector */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setMode('voice')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                mode === 'voice'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                  : 'glass-effect text-purple-300 hover:text-white'
              }`}
            >
              <Mic2 size={20} />
              Modo Voz
            </button>

            <button
              onClick={() => setMode('tarot')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                mode === 'tarot'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50'
                  : 'glass-effect text-purple-300 hover:text-white'
              }`}
            >
              <BookOpen size={20} />
              Leitura de Tarô
            </button>
          </div>
        </header>

        {mode === 'voice' ? (
          <>
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
                  <span className="text-purple-200 font-semibold">
                    {ttsEngine === 'elevenlabs' ? 'Falando com ElevenLabs...' : 'Falando...'}
                  </span>
                </div>
              </div>
            )}

            {/* TTS Settings */}
            <div className="mb-8 max-w-2xl mx-auto">
              <TTSSettings
                ttsEngine={ttsEngine}
                onEngineChange={setTtsEngine}
                elevenLabsVoices={elevenLabsVoices}
                selectedElevenLabsVoice={selectedElevenLabsVoice}
                onElevenLabsVoiceChange={setSelectedElevenLabsVoice}
                isLoadingVoices={isLoadingVoices}
              />
            </div>

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
          </>
        ) : (
          <>
            {/* Tarot Reading Mode */}
            <div className="mb-12">
              <TarotReading onInterpretation={handleInterpretation} />
            </div>

            {/* Show avatar when there's interpretation */}
            {text && (
              <>
                {/* Avatar Selector */}
                <div className="flex justify-center gap-4 mb-8">
                  <button
                    onClick={() => setAvatarType('joyful')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm ${
                      avatarType === 'joyful'
                        ? 'bg-gradient-to-r from-pink-600 to-yellow-600 text-white shadow-lg'
                        : 'glass-effect text-purple-300 hover:text-white'
                    }`}
                  >
                    <Sparkles size={16} />
                    Alegre
                  </button>

                  <button
                    onClick={() => setAvatarType('mystical')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm ${
                      avatarType === 'mystical'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                        : 'glass-effect text-purple-300 hover:text-white'
                    }`}
                  >
                    <Moon size={16} />
                    Místico
                  </button>
                </div>

                {/* Avatar Display */}
                <div className="flex justify-center mb-8">
                  <div className="transform transition-all duration-500 scale-75">
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
                      <span className="text-purple-200 font-semibold">Narrando interpretação...</span>
                    </div>
                  </div>
                )}

                {/* Interpretation Text Display */}
                <div className="glass-effect rounded-xl p-6 shadow-2xl mb-8 max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold text-purple-200 mb-4 flex items-center gap-2">
                    <Sparkles className="text-purple-400" size={24} />
                    Interpretação
                  </h3>
                  <div className="text-purple-100 leading-relaxed whitespace-pre-wrap">
                    {text}
                  </div>

                  {/* Voice controls for interpretation */}
                  <div className="mt-6 flex gap-4 justify-center">
                    <button
                      onClick={handleSpeak}
                      disabled={isSpeaking}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-200"
                    >
                      {isSpeaking ? 'Falando...' : 'Ouvir Interpretação'}
                    </button>

                    {isSpeaking && (
                      <button
                        onClick={handleStop}
                        className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-200"
                      >
                        Parar
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* Footer */}
        <footer className="text-center text-purple-400 text-sm mt-12">
          <p>✨ Desenvolvido com energia mística e tecnologia moderna ✨</p>
          <p className="text-xs mt-2 text-purple-500">
            Fase 2: Sistema completo de Tarô com interpretação por IA
            {ttsEngine === 'elevenlabs' && ' + ElevenLabs TTS Premium'}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
