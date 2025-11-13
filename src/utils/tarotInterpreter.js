// Tarot Interpretation System (can integrate with Claude API or use local logic)

export class TarotInterpreter {
  constructor(apiKey = null) {
    this.apiKey = apiKey;
    this.claudeApiUrl = 'https://api.anthropic.com/v1/messages';
  }

  // Generate interpretation using Claude API (if API key provided)
  async generateInterpretationWithAI(readingData) {
    if (!this.apiKey) {
      return this.generateLocalInterpretation(readingData);
    }

    try {
      const prompt = this.buildPrompt(readingData);

      const response = await fetch(this.claudeApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1024,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Claude API request failed');
      }

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error('AI Interpretation Error:', error);
      return this.generateLocalInterpretation(readingData);
    }
  }

  // Build prompt for AI
  buildPrompt(readingData) {
    const { spread, cards } = readingData;

    let prompt = `Você é um místico leitor de Tarô experiente. Faça uma interpretação profunda e personalizada da seguinte leitura:\n\n`;
    prompt += `Tipo de Tiragem: ${spread.name}\n`;
    prompt += `Descrição: ${spread.description}\n\n`;
    prompt += `Cartas reveladas:\n`;

    cards.forEach((card, index) => {
      if (card.revealed) {
        prompt += `\n${index + 1}. Posição: ${card.position.name} (${card.position.description})\n`;
        prompt += `   Carta: ${card.name}${card.isReversed ? ' (Invertida)' : ''}\n`;
        prompt += `   Palavras-chave: ${card.keywords?.join(', ')}\n`;
        if (card.description) {
          prompt += `   Significado: ${card.description}\n`;
        }
      }
    });

    prompt += `\nPor favor, forneça uma interpretação calorosa, mística e encorajadora (máximo 250 palavras). Use uma linguagem poética mas acessível. Foque em dar orientação prática e esperançosa.`;

    return prompt;
  }

  // Generate local interpretation (fallback without API)
  generateLocalInterpretation(readingData) {
    const { spread, cards } = readingData;
    const revealedCards = cards.filter(c => c.revealed);

    let interpretation = `🔮 **${spread.name}** 🔮\n\n`;

    if (revealedCards.length === 0) {
      return interpretation + "Revele as cartas para receber sua interpretação.";
    }

    // Opening
    interpretation += this.getOpeningMessage(spread.id);
    interpretation += "\n\n";

    // Card-by-card interpretation
    revealedCards.forEach((card, index) => {
      interpretation += `**${card.position.name}**: `;
      interpretation += `${card.name}${card.isReversed ? ' (Invertida)' : ''}\n`;

      if (card.isReversed) {
        interpretation += `Esta carta aparece invertida, sugerindo ${this.getReversedMeaning(card)}. `;
      } else {
        interpretation += `${card.description || 'Esta carta traz energias de ' + card.keywords?.join(', ')}. `;
      }

      interpretation += this.getPositionInterpretation(card.position.name, card);
      interpretation += "\n\n";
    });

    // Closing message
    interpretation += this.getClosingMessage(revealedCards);

    return interpretation;
  }

  // Helper methods for local interpretation
  getOpeningMessage(spreadId) {
    const openings = {
      single: "As energias cósmicas revelam uma mensagem importante para você hoje.",
      three_card: "Vejo aqui o desenrolar de sua jornada através do tempo...",
      celtic_cross: "Os arcanos abrem uma janela profunda para sua situação atual...",
      love: "O coração fala através das cartas, revelando os segredos do amor...",
      career: "As forças universais iluminam seu caminho profissional..."
    };
    return openings[spreadId] || "As cartas revelam sua história...";
  }

  getReversedMeaning(card) {
    const reversals = [
      "bloqueios ou resistência nesta área",
      "energias internas que precisam de atenção",
      "um convite para olhar de outra perspectiva",
      "desafios que estão sendo processados internamente"
    ];
    return reversals[Math.floor(Math.random() * reversals.length)];
  }

  getPositionInterpretation(position, card) {
    const keywords = card.keywords || [];
    const mainKeyword = keywords[0] || 'transformação';

    const templates = {
      'Passado': `Estas influências moldaram quem você é hoje, trazendo lições de ${mainKeyword}.`,
      'Presente': `No momento atual, a energia de ${mainKeyword} está ativa em sua vida.`,
      'Futuro': `O caminho à frente brilha com possibilidades de ${mainKeyword}.`,
      'Mensagem do Dia': `Hoje, foque na energia de ${mainKeyword} para guiar suas ações.`,
      'Você': `Sua essência nesta situação carrega ${mainKeyword}.`,
      'Parceiro': `A outra pessoa traz energia de ${mainKeyword} para a dinâmica.`,
      'Desafio': `O obstáculo a superar está relacionado a ${mainKeyword}.`,
      'Conselho': `A sabedoria dos arcanos sugere abraçar ${mainKeyword}.`,
      'Resultado': `O desfecho provável aponta para ${mainKeyword}.`
    };

    return templates[position] || `Esta posição revela aspectos importantes de ${mainKeyword}.`;
  }

  getClosingMessage(cards) {
    const hasReversed = cards.some(c => c.isReversed);
    const hasMajor = cards.some(c => c.arcana === 'major');

    let closing = "✨ ";

    if (hasMajor) {
      closing += "A presença de Arcanos Maiores indica que forças significativas estão em jogo. ";
    }

    if (hasReversed) {
      closing += "As cartas invertidas sugerem trabalho interno e reflexão. ";
    }

    closing += "Lembre-se: o Tarô ilumina possibilidades, mas você sempre tem o poder de escolher seu caminho. Confie em sua intuição e siga adiante com coragem e sabedoria.";

    return closing;
  }
}

// Quick interpretation generator (no API needed)
export const generateQuickInterpretation = (readingData) => {
  const interpreter = new TarotInterpreter();
  return interpreter.generateLocalInterpretation(readingData);
};

export default TarotInterpreter;
