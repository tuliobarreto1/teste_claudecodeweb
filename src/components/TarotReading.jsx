import React, { useState } from 'react';
import { Shuffle, Sparkles, BookOpen, RefreshCw } from 'lucide-react';
import TarotCard from './TarotCard';
import { FULL_DECK, SPREAD_TYPES } from '../data/tarotDeck';

const TarotReading = ({ onInterpretation }) => {
  const [selectedSpread, setSelectedSpread] = useState(null);
  const [drawnCards, setDrawnCards] = useState([]);
  const [revealedCards, setRevealedCards] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

  // Shuffle deck and draw cards
  const shuffleAndDraw = (spreadType) => {
    setIsShuffling(true);

    setTimeout(() => {
      const shuffled = [...FULL_DECK].sort(() => Math.random() - 0.5);
      const cardCount = spreadType.positions.length;
      const drawn = shuffled.slice(0, cardCount).map((card, index) => ({
        ...card,
        isReversed: Math.random() > 0.7, // 30% chance of reversed
        position: spreadType.positions[index]
      }));

      setDrawnCards(drawn);
      setRevealedCards([]);
      setSelectedSpread(spreadType);
      setIsShuffling(false);
    }, 1500);
  };

  // Reveal a single card
  const revealCard = (index) => {
    if (!revealedCards.includes(index)) {
      setRevealedCards([...revealedCards, index]);
    }
  };

  // Reveal all cards
  const revealAll = () => {
    setRevealedCards(drawnCards.map((_, i) => i));
  };

  // Reset reading
  const reset = () => {
    setSelectedSpread(null);
    setDrawnCards([]);
    setRevealedCards([]);
  };

  // Get interpretation from AI
  const getInterpretation = () => {
    if (onInterpretation) {
      const readingData = {
        spread: selectedSpread,
        cards: drawnCards.map((card, index) => ({
          ...card,
          revealed: revealedCards.includes(index)
        }))
      };
      onInterpretation(readingData);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {!selectedSpread ? (
        // Spread Selection
        <div className="glass-effect rounded-xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-purple-400" size={32} />
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Escolha sua Tiragem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(SPREAD_TYPES).map((spread) => (
              <button
                key={spread.id}
                onClick={() => shuffleAndDraw(spread)}
                disabled={isShuffling}
                className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 border border-purple-500/30 rounded-xl p-6 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Sparkles className="text-purple-400 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-bold text-purple-200 mb-1">{spread.name}</h3>
                    <p className="text-sm text-purple-300/80">{spread.description}</p>
                  </div>
                </div>
                <div className="text-xs text-purple-400 font-semibold">
                  {spread.positions.length} {spread.positions.length === 1 ? 'carta' : 'cartas'}
                </div>
              </button>
            ))}
          </div>

          {isShuffling && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-3 glass-effect px-8 py-4 rounded-full">
                <Shuffle className="text-purple-400 animate-spin" size={24} />
                <span className="text-purple-200 font-semibold text-lg">Embaralhando as cartas...</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Card Display
        <div className="space-y-6">
          {/* Header with spread info */}
          <div className="glass-effect rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  {selectedSpread.name}
                </h2>
                <p className="text-purple-300">{selectedSpread.description}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={revealAll}
                  disabled={revealedCards.length === drawnCards.length}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-200"
                >
                  <Sparkles className="inline mr-2" size={16} />
                  Revelar Todas
                </button>
                <button
                  onClick={reset}
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-200"
                >
                  <RefreshCw className="inline mr-2" size={16} />
                  Nova Tiragem
                </button>
              </div>
            </div>
          </div>

          {/* Cards display */}
          <div className="glass-effect rounded-xl p-8 shadow-2xl">
            <div className={`flex flex-wrap justify-center gap-6 ${
              drawnCards.length > 5 ? 'gap-4' : 'gap-6'
            }`}>
              {drawnCards.map((card, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <TarotCard
                    card={card}
                    isRevealed={revealedCards.includes(index)}
                    isReversed={card.isReversed}
                    position={card.position.name}
                    onClick={() => revealCard(index)}
                  />
                  <div className="text-center max-w-[160px]">
                    <p className="text-purple-200 font-semibold text-sm mb-1">
                      {card.position.name}
                    </p>
                    {card.position.description && (
                      <p className="text-purple-400 text-xs">{card.position.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interpretation button */}
          {revealedCards.length === drawnCards.length && (
            <div className="glass-effect rounded-xl p-6 shadow-2xl text-center">
              <button
                onClick={getInterpretation}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <Sparkles className="inline mr-2" size={20} />
                Obter Interpretação com IA
              </button>
              <p className="text-purple-400 text-sm mt-3">
                O avatar irá interpretar sua leitura com sabedoria mística
              </p>
            </div>
          )}

          {/* Cards revealed info */}
          <div className="text-center">
            <p className="text-purple-300 text-sm">
              Cartas reveladas: {revealedCards.length} / {drawnCards.length}
            </p>
            <p className="text-purple-400 text-xs mt-1">
              Clique nas cartas para revelá-las uma por uma
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TarotReading;
