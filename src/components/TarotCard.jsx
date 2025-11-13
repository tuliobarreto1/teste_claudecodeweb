import React from 'react';
import { Sparkles, Heart, Sword, Zap, Coins } from 'lucide-react';

const TarotCard = ({ card, isRevealed = false, isReversed = false, onClick, position }) => {
  const getSuitIcon = (suit) => {
    const icons = {
      wands: Zap,
      cups: Heart,
      swords: Sword,
      pentacles: Coins
    };
    return icons[suit] || Sparkles;
  };

  const getSuitColor = (suit) => {
    const colors = {
      wands: 'from-orange-500 to-red-500',
      cups: 'from-blue-500 to-cyan-500',
      swords: 'from-gray-500 to-slate-600',
      pentacles: 'from-yellow-500 to-amber-600'
    };
    return colors[suit] || 'from-purple-500 to-pink-500';
  };

  const Icon = card?.suit ? getSuitIcon(card.suit) : Sparkles;
  const gradient = card?.suit ? getSuitColor(card.suit) : 'from-purple-500 to-pink-500';

  return (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer transition-all duration-700 transform hover:scale-105 ${
        isRevealed ? '' : 'hover:rotate-2'
      }`}
      style={{
        perspective: '1000px',
        transform: isReversed && isRevealed ? 'rotate(180deg)' : ''
      }}
    >
      <div
        className={`relative w-40 h-64 transition-transform duration-700 transform-style-3d ${
          isRevealed ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card Back */}
        <div
          className="absolute inset-0 backface-hidden rounded-xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-950 rounded-xl border-4 border-purple-400/50 shadow-2xl p-4 flex flex-col items-center justify-center">
            {/* Mystical pattern */}
            <div className="w-full h-full border-2 border-purple-300/30 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>

              {/* Central star pattern */}
              <div className="relative z-10">
                <Sparkles className="text-purple-300 animate-pulse" size={48} />
              </div>

              {/* Corner decorations */}
              <div className="absolute top-2 left-2">
                <Sparkles className="text-purple-400/50" size={16} />
              </div>
              <div className="absolute top-2 right-2">
                <Sparkles className="text-purple-400/50" size={16} />
              </div>
              <div className="absolute bottom-2 left-2">
                <Sparkles className="text-purple-400/50" size={16} />
              </div>
              <div className="absolute bottom-2 right-2">
                <Sparkles className="text-purple-400/50" size={16} />
              </div>

              {/* Mystical text */}
              <div className="absolute bottom-4 text-purple-300 text-xs font-bold tracking-widest">
                TARÔ
              </div>
            </div>
          </div>
        </div>

        {/* Card Front */}
        <div
          className="absolute inset-0 backface-hidden rounded-xl rotate-y-180"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className={`w-full h-full bg-gradient-to-br ${gradient} rounded-xl border-4 border-yellow-400/70 shadow-2xl p-3 flex flex-col`}>
            {/* Card header */}
            <div className="text-center mb-2">
              {card?.arcana === 'major' && (
                <div className="text-yellow-200 text-xs font-bold mb-1">ARCANO MAIOR</div>
              )}
              <h3 className="text-white font-bold text-sm leading-tight drop-shadow-lg">
                {card?.name}
              </h3>
              {position && (
                <div className="text-yellow-200 text-xs mt-1 italic">{position}</div>
              )}
            </div>

            {/* Card illustration area */}
            <div className="flex-1 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm mb-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
              <Icon className="text-white/90 drop-shadow-2xl z-10" size={64} />

              {/* Roman numeral for major arcana */}
              {card?.arcana === 'major' && (
                <div className="absolute top-2 text-white/30 text-3xl font-bold">
                  {['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'][card.id]}
                </div>
              )}
            </div>

            {/* Keywords */}
            <div className="text-center">
              <div className="flex flex-wrap gap-1 justify-center">
                {card?.keywords?.slice(0, 2).map((keyword, idx) => (
                  <span key={idx} className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Element badge */}
            {card?.element && (
              <div className="text-center mt-1">
                <span className="text-xs text-yellow-200 font-semibold">{card.element}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reversed indicator */}
      {isReversed && isRevealed && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-lg z-20">
          Invertida
        </div>
      )}
    </div>
  );
};

export default TarotCard;
