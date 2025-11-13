import React, { useState, useEffect } from 'react';
import { Play, Square, Volume2, Gauge } from 'lucide-react';

const VoiceControls = ({
  onSpeak,
  onStop,
  isSpeaking,
  availableVoices,
  selectedVoice,
  onVoiceChange,
  rate,
  onRateChange,
  pitch,
  onPitchChange,
  text,
  onTextChange
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Text Input */}
      <div className="glass-effect rounded-xl p-6 shadow-2xl">
        <label className="block text-purple-200 font-semibold mb-3 text-sm uppercase tracking-wide">
          Texto para Falar
        </label>
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          className="w-full h-32 bg-slate-900/50 text-white rounded-lg p-4 border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
          placeholder="Digite ou escolha um exemplo abaixo..."
        />
      </div>

      {/* Voice Settings */}
      <div className="glass-effect rounded-xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Volume2 className="text-purple-400" size={20} />
          <h3 className="text-purple-200 font-semibold text-sm uppercase tracking-wide">
            Configurações de Voz
          </h3>
        </div>

        {/* Voice Selector */}
        <div>
          <label className="block text-purple-300 text-sm mb-2">
            Selecionar Voz
          </label>
          <select
            value={selectedVoice}
            onChange={(e) => onVoiceChange(parseInt(e.target.value))}
            className="w-full bg-slate-900/50 text-white rounded-lg p-3 border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            {availableVoices.map((voice, index) => (
              <option key={index} value={index}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>

        {/* Rate Control */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-purple-300 text-sm flex items-center gap-2">
              <Gauge size={16} />
              Velocidade
            </label>
            <span className="text-purple-400 text-sm font-mono">{rate.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => onRateChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Pitch Control */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-purple-300 text-sm flex items-center gap-2">
              <Volume2 size={16} />
              Tom
            </label>
            <span className="text-purple-400 text-sm font-mono">{pitch.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => onPitchChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onSpeak}
          disabled={isSpeaking || !text.trim()}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        >
          <Play size={20} fill="currentColor" />
          Falar
        </button>

        <button
          onClick={onStop}
          disabled={!isSpeaking}
          className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        >
          <Square size={20} fill="currentColor" />
          Parar
        </button>
      </div>

      {/* Custom styles for sliders */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a855f7, #ec4899);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a855f7, #ec4899);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
        }

        .slider::-webkit-slider-thumb:hover {
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.8);
        }

        .slider::-moz-range-thumb:hover {
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.8);
        }
      `}</style>
    </div>
  );
};

export default VoiceControls;
