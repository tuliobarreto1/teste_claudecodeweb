import React from 'react';
import { Sparkles, Moon } from 'lucide-react';

const ExampleTexts = ({ avatarType, onSelectText }) => {
  const joyfulExamples = [
    "Que alegria te receber aqui! As cartas estão brilhando hoje, cheias de energia positiva para você!",
    "Olha só que maravilha! O Universo está conspirando a seu favor. Vamos ver o que as cartas revelam!",
    "Oba! Sinto vibrações incríveis! Prepare-se para descobertas fantásticas no seu caminho!",
    "Que energia maravilhosa! As estrelas dançam em celebração à sua presença aqui hoje!"
  ];

  const mysticalExamples = [
    "As estrelas se alinham. Os arcanos revelam verdades ocultas em seu destino.",
    "Observe as sombras e a luz. O equilíbrio universal guia sua jornada.",
    "Os mistérios antigos sussurram. Esteja preparado para a transformação.",
    "No silêncio das esferas celestiais, os segredos do cosmos se desvelam."
  ];

  const examples = avatarType === 'joyful' ? joyfulExamples : mysticalExamples;
  const Icon = avatarType === 'joyful' ? Sparkles : Moon;
  const iconColor = avatarType === 'joyful' ? 'text-pink-400' : 'text-indigo-400';
  const buttonGradient = avatarType === 'joyful'
    ? 'from-pink-600/20 to-yellow-600/20 hover:from-pink-600/30 hover:to-yellow-600/30 border-pink-500/30'
    : 'from-indigo-600/20 to-purple-600/20 hover:from-indigo-600/30 hover:to-purple-600/30 border-indigo-500/30';

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="glass-effect rounded-xl p-6 shadow-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Icon className={iconColor} size={20} />
          <h3 className="text-purple-200 font-semibold text-sm uppercase tracking-wide">
            Exemplos de Falas
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {examples.map((text, index) => (
            <button
              key={index}
              onClick={() => onSelectText(text)}
              className={`bg-gradient-to-br ${buttonGradient} border p-4 rounded-lg text-left text-purple-100 text-sm hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95`}
            >
              <div className="flex items-start gap-2">
                <Icon className={`${iconColor} flex-shrink-0 mt-1`} size={16} />
                <p className="line-clamp-3">{text}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExampleTexts;
