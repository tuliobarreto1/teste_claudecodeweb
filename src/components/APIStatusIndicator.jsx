import React from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const APIStatusIndicator = () => {
  const hasElevenLabs = !!import.meta.env.VITE_ELEVENLABS_API_KEY;
  const hasDeepSeek = !!import.meta.env.VITE_DEEPSEEK_API_KEY;

  return (
    <div className="glass-effect rounded-lg p-4 mb-6 max-w-2xl mx-auto">
      <h3 className="text-purple-200 font-semibold text-sm mb-3 flex items-center gap-2">
        <AlertCircle size={16} />
        Status das APIs
      </h3>

      <div className="space-y-2 text-sm">
        {/* ElevenLabs Status */}
        <div className="flex items-center gap-2">
          {hasElevenLabs ? (
            <CheckCircle2 className="text-green-400" size={16} />
          ) : (
            <XCircle className="text-red-400" size={16} />
          )}
          <span className={hasElevenLabs ? 'text-green-300' : 'text-red-300'}>
            ElevenLabs TTS: {hasElevenLabs ? 'Configurado ✓' : 'Não configurado'}
          </span>
        </div>

        {/* DeepSeek Status */}
        <div className="flex items-center gap-2">
          {hasDeepSeek ? (
            <CheckCircle2 className="text-green-400" size={16} />
          ) : (
            <XCircle className="text-red-400" size={16} />
          )}
          <span className={hasDeepSeek ? 'text-green-300' : 'text-red-300'}>
            DeepSeek AI: {hasDeepSeek ? 'Configurado ✓' : 'Não configurado'}
          </span>
        </div>
      </div>

      {/* Instructions if not configured */}
      {(!hasElevenLabs || !hasDeepSeek) && (
        <div className="mt-3 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-200 text-xs">
            ⚠️ Para ativar as APIs premium:
          </p>
          <ol className="text-yellow-300 text-xs mt-2 ml-4 list-decimal space-y-1">
            <li>Crie um arquivo <code className="bg-black/30 px-1 rounded">.env</code> na raiz do projeto</li>
            <li>Adicione suas API keys (veja .env.example)</li>
            <li>Reinicie o servidor com <code className="bg-black/30 px-1 rounded">npm run dev</code></li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default APIStatusIndicator;
