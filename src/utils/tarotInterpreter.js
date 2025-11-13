// Tarot Interpretation System with DeepSeek AI Integration

export class TarotInterpreter {
  constructor(apiKey = null) {
    this.apiKey = apiKey;
    this.deepSeekApiUrl = 'https://api.deepseek.com/v1/chat/completions';
  }

  // Generate interpretation using DeepSeek AI
  async generateInterpretationWithAI(readingData) {
    if (!this.apiKey) {
      console.log('No API key provided, using local interpretation');
      return this.generateLocalInterpretation(readingData);
    }

    try {
      const systemPrompt = this.getSystemPrompt();
      const userPrompt = this.buildUserPrompt(readingData);

      const response = await fetch(this.deepSeekApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: userPrompt
            }
          ],
          temperature: 0.8,
          max_tokens: 800,
          top_p: 0.95,
          frequency_penalty: 0.2,
          presence_penalty: 0.3
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('DeepSeek API Error:', errorData);
        throw new Error(`DeepSeek API request failed: ${response.status}`);
      }

      const data = await response.json();
      const interpretation = data.choices[0].message.content;

      console.log('✨ Interpretação gerada com sucesso pela IA');
      return interpretation;

    } catch (error) {
      console.error('AI Interpretation Error:', error);
      console.log('Falling back to local interpretation');
      return this.generateLocalInterpretation(readingData);
    }
  }

  // System prompt - Define o papel e expertise do tarólogo
  getSystemPrompt() {
    return `Você é um Tarólogo Místico experiente e sábio, com décadas de prática na arte milenar da leitura de Tarô.

SEU PAPEL:
- Mestre em simbolismo esotérico, arquétipos junguianos e sabedoria ancestral
- Intérprete profundo das 78 cartas do Tarô (22 Arcanos Maiores + 56 Arcanos Menores)
- Conselheiro espiritual compassivo que oferece orientação transformadora
- Especialista em leituras intuitivas que conectam passado, presente e futuro

SEU ESTILO DE LEITURA:
- Linguagem poética, mística mas acessível
- Tom caloroso, acolhedor e encorajador
- Interpretações profundas que vão além do óbvio
- Conexão entre as cartas e a jornada pessoal do consulente
- Foco em empoderamento e transformação positiva

ESTRUTURA DA INTERPRETAÇÃO:
1. Abertura mística (1-2 frases que capturam a essência da tiragem)
2. Análise detalhada de cada carta em sua posição
3. Síntese das energias e mensagens principais
4. Orientação prática e inspiradora (como aplicar na vida)
5. Encerramento esperançoso e empoderador

IMPORTANTE:
- Respeite o significado tradicional de cada carta
- Considere cartas invertidas como bloqueios ou aspectos internos
- Conecte as cartas entre si, mostrando a narrativa completa
- Seja específico mas não determinista (o futuro não é fixo)
- Use metáforas e simbolismo quando apropriado
- Mantenha a interpretação em aproximadamente 250-300 palavras

ELEMENTOS A INCLUIR:
- Significado simbólico das cartas
- Relação com a posição na tiragem
- Influências do elemento (Fogo, Água, Ar, Terra)
- Mensagem central para o consulente
- Ação ou reflexão sugerida`;
  }

  // Build detailed user prompt with reading data
  buildUserPrompt(readingData) {
    const { spread, cards } = readingData;
    const revealedCards = cards.filter(c => c.revealed);

    let prompt = `LEITURA DE TARÔ SOLICITADA:\n\n`;
    prompt += `📖 TIPO DE TIRAGEM: ${spread.name}\n`;
    prompt += `Propósito: ${spread.description}\n\n`;

    prompt += `🃏 CARTAS REVELADAS:\n\n`;

    revealedCards.forEach((card, index) => {
      prompt += `Carta ${index + 1}:\n`;
      prompt += `• Posição: ${card.position.name}\n`;
      prompt += `• Significado da Posição: ${card.position.description}\n`;
      prompt += `• Carta: ${card.name} ${card.isReversed ? '(INVERTIDA ⚠️)' : ''}\n`;
      prompt += `• Arcano: ${card.arcana === 'major' ? 'Maior' : 'Menor'}\n`;

      if (card.element) {
        prompt += `• Elemento: ${card.element}\n`;
      }

      if (card.suit) {
        const suitNames = {
          wands: 'Paus (Fogo)',
          cups: 'Copas (Água)',
          swords: 'Espadas (Ar)',
          pentacles: 'Ouros (Terra)'
        };
        prompt += `• Naipe: ${suitNames[card.suit]}\n`;
      }

      if (card.keywords && card.keywords.length > 0) {
        prompt += `• Palavras-chave: ${card.keywords.join(', ')}\n`;
      }

      if (card.description) {
        prompt += `• Significado tradicional: ${card.description}\n`;
      }

      if (card.upright && !card.isReversed) {
        prompt += `• Aspectos positivos: ${card.upright.join(', ')}\n`;
      }

      if (card.reversed && card.isReversed) {
        prompt += `• Aspectos da inversão: ${card.reversed.join(', ')}\n`;
      }

      prompt += `\n`;
    });

    prompt += `\n📜 INSTRUÇÕES PARA A INTERPRETAÇÃO:\n`;
    prompt += `Faça uma leitura profunda e personalizada considerando:\n`;
    prompt += `1. O significado individual de cada carta\n`;
    prompt += `2. A posição de cada carta na tiragem\n`;
    prompt += `3. As cartas invertidas (se houver) como bloqueios ou aspectos internos\n`;
    prompt += `4. A narrativa completa que as cartas contam juntas\n`;
    prompt += `5. Orientação prática para o consulente\n\n`;
    prompt += `Use linguagem mística, poética e inspiradora. Seja encorajador mas honesto.`;

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

// Quick interpretation generator - now uses AI if API key is available
export const generateQuickInterpretation = async (readingData) => {
  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
  const interpreter = new TarotInterpreter(apiKey);

  // Try AI interpretation first, fallback to local if fails
  try {
    return await interpreter.generateInterpretationWithAI(readingData);
  } catch (error) {
    console.error('Error generating AI interpretation:', error);
    return interpreter.generateLocalInterpretation(readingData);
  }
};

export default TarotInterpreter;
