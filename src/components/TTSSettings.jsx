import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, Settings } from 'lucide-react';

const TTSSettings = ({
  ttsEngine,
  onEngineChange,
  elevenLabsVoices,
  selectedElevenLabsVoice,
  onElevenLabsVoiceChange,
  isLoadingVoices
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-effect rounded-xl p-6 shadow-2xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-purple-200 hover:text-white transition-colors"
      >
        <div className="flex items-center gap-2">
          <Settings className="text-purple-400" size={20} />
          <h3 className="font-semibold text-sm uppercase tracking-wide">
            Configurações de Voz
          </h3>
        </div>
        <span className="text-xs text-purple-400">
          {isOpen ? '▼' : '▶'}
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4 animate-fadeIn">
          {/* TTS Engine Selector */}
          <div>
            <label className="block text-purple-300 text-sm mb-2 font-semibold">
              Motor de Voz
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onEngineChange('web')}
                className={`flex items-center gap-2 p-3 rounded-lg text-sm font-semibold transition-all ${
                  ttsEngine === 'web'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-slate-800/50 text-purple-300 hover:bg-slate-800'
                }`}
              >
                <Volume2 size={16} />
                <div className="text-left">
                  <div>Navegador</div>
                  <div className="text-xs opacity-70">Gratuito</div>
                </div>
              </button>

              <button
                onClick={() => onEngineChange('elevenlabs')}
                className={`flex items-center gap-2 p-3 rounded-lg text-sm font-semibold transition-all ${
                  ttsEngine === 'elevenlabs'
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg'
                    : 'bg-slate-800/50 text-purple-300 hover:bg-slate-800'
                }`}
              >
                <Sparkles size={16} />
                <div className="text-left">
                  <div>ElevenLabs</div>
                  <div className="text-xs opacity-70">Premium</div>
                </div>
              </button>
            </div>
          </div>

          {/* ElevenLabs Voice Selector */}
          {ttsEngine === 'elevenlabs' && (
            <div>
              <label className="block text-purple-300 text-sm mb-2">
                Voz Premium (ElevenLabs)
              </label>
              {isLoadingVoices ? (
                <div className="text-purple-400 text-sm p-3 text-center">
                  Carregando vozes...
                </div>
              ) : elevenLabsVoices.length > 0 ? (
                <select
                  value={selectedElevenLabsVoice}
                  onChange={(e) => onElevenLabsVoiceChange(e.target.value)}
                  className="w-full bg-slate-900/50 text-white rounded-lg p-3 border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  {elevenLabsVoices.map((voice) => (
                    <option key={voice.voice_id} value={voice.voice_id}>
                      {voice.name} - {voice.labels?.accent || 'Universal'}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="text-red-400 text-sm p-3 bg-red-900/20 rounded-lg">
                  ⚠️ Erro ao carregar vozes. Verifique sua API key.
                </div>
              )}

              {elevenLabsVoices.length > 0 && (
                <p className="text-purple-400 text-xs mt-2">
                  ✨ Vozes ultra-realistas com IA
                </p>
              )}
            </div>
          )}

          {/* Info about current engine */}
          <div className="text-xs text-purple-400 bg-purple-900/20 p-3 rounded-lg">
            {ttsEngine === 'web' ? (
              <p>🌐 Usando vozes do navegador (gratuito e offline)</p>
            ) : (
              <p>✨ Usando ElevenLabs - Vozes premium com qualidade superior</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TTSSettings;
