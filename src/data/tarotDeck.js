// Complete Tarot Deck - 78 cards (22 Major Arcana + 56 Minor Arcana)

export const MAJOR_ARCANA = [
  {
    id: 0,
    name: "O Louco",
    nameEn: "The Fool",
    arcana: "major",
    upright: ["Inícios, espontaneidade, fé, inocência"],
    reversed: ["Imprudência, risco, ingenuidade"],
    description: "O Louco representa novos começos, aventuras e liberdade. É o início de uma jornada espiritual.",
    keywords: ["novos começos", "aventura", "fé", "liberdade"],
    element: "Ar",
    astrology: "Urano"
  },
  {
    id: 1,
    name: "O Mago",
    nameEn: "The Magician",
    arcana: "major",
    upright: ["Manifestação, recursos, poder, ação inspirada"],
    reversed: ["Manipulação, talentos desperdiçados"],
    description: "O Mago tem todas as ferramentas para manifestar seus desejos. Representa habilidade e determinação.",
    keywords: ["poder", "habilidade", "concentração", "ação"],
    element: "Ar",
    astrology: "Mercúrio"
  },
  {
    id: 2,
    name: "A Sacerdotisa",
    nameEn: "The High Priestess",
    arcana: "major",
    upright: ["Intuição, sabedoria interior, mistério, subconsciente"],
    reversed: ["Segredos, desconexão interior"],
    description: "A Sacerdotisa representa intuição, sabedoria divina feminina e os mistérios do inconsciente.",
    keywords: ["intuição", "mistério", "sabedoria", "subconsciente"],
    element: "Água",
    astrology: "Lua"
  },
  {
    id: 3,
    name: "A Imperatriz",
    nameEn: "The Empress",
    arcana: "major",
    upright: ["Feminilidade, beleza, natureza, abundância"],
    reversed: ["Dependência, sufocar, esvaziamento"],
    description: "A Imperatriz simboliza a mãe natureza, fertilidade, abundância e nutrição.",
    keywords: ["abundância", "natureza", "fertilidade", "criação"],
    element: "Terra",
    astrology: "Vênus"
  },
  {
    id: 4,
    name: "O Imperador",
    nameEn: "The Emperor",
    arcana: "major",
    upright: ["Autoridade, estrutura, controle, paternidade"],
    reversed: ["Dominação, rigidez, inflexibilidade"],
    description: "O Imperador representa autoridade, estrutura e o poder do pensamento racional.",
    keywords: ["autoridade", "estrutura", "controle", "estabilidade"],
    element: "Fogo",
    astrology: "Áries"
  },
  {
    id: 5,
    name: "O Hierofante",
    nameEn: "The Hierophant",
    arcana: "major",
    upright: ["Tradição, conformidade, moralidade, ética"],
    reversed: ["Rebelião, subversão, novas abordagens"],
    description: "O Hierofante representa tradições espirituais, educação formal e instituições.",
    keywords: ["tradição", "educação", "crença", "conformidade"],
    element: "Terra",
    astrology: "Touro"
  },
  {
    id: 6,
    name: "Os Enamorados",
    nameEn: "The Lovers",
    arcana: "major",
    upright: ["Amor, harmonia, relacionamentos, escolhas"],
    reversed: ["Desarmonia, desequilíbrio, desalinhamento"],
    description: "Os Enamorados representam amor, harmonia e escolhas importantes em relacionamentos.",
    keywords: ["amor", "união", "escolhas", "valores"],
    element: "Ar",
    astrology: "Gêmeos"
  },
  {
    id: 7,
    name: "O Carro",
    nameEn: "The Chariot",
    arcana: "major",
    upright: ["Controle, força de vontade, sucesso, determinação"],
    reversed: ["Falta de controle, agressão, falta de direção"],
    description: "O Carro simboliza triunfo, força de vontade e determinação em superar obstáculos.",
    keywords: ["vitória", "controle", "determinação", "ação"],
    element: "Água",
    astrology: "Câncer"
  },
  {
    id: 8,
    name: "A Força",
    nameEn: "Strength",
    arcana: "major",
    upright: ["Força interior, bravura, compaixão, foco"],
    reversed: ["Dúvida, fraqueza, insegurança"],
    description: "A Força representa coragem, paciência e controle através da compaixão.",
    keywords: ["coragem", "paciência", "compaixão", "controle"],
    element: "Fogo",
    astrology: "Leão"
  },
  {
    id: 9,
    name: "O Eremita",
    nameEn: "The Hermit",
    arcana: "major",
    upright: ["Busca interior, introspecção, ser sozinho, orientação interior"],
    reversed: ["Isolamento, solidão, retirada"],
    description: "O Eremita representa busca espiritual, introspecção e sabedoria interior.",
    keywords: ["introspecção", "sabedoria", "solidão", "busca"],
    element: "Terra",
    astrology: "Virgem"
  },
  {
    id: 10,
    name: "A Roda da Fortuna",
    nameEn: "Wheel of Fortune",
    arcana: "major",
    upright: ["Boa sorte, karma, ciclos de vida, destino"],
    reversed: ["Má sorte, resistência à mudança, ciclos negativos"],
    description: "A Roda da Fortuna simboliza os ciclos da vida, destino e mudanças inevitáveis.",
    keywords: ["destino", "mudança", "ciclos", "sorte"],
    element: "Fogo",
    astrology: "Júpiter"
  },
  {
    id: 11,
    name: "A Justiça",
    nameEn: "Justice",
    arcana: "major",
    upright: ["Justiça, equidade, verdade, causa e efeito"],
    reversed: ["Injustiça, desonestidade, falta de responsabilidade"],
    description: "A Justiça representa verdade, imparcialidade e as leis de causa e efeito.",
    keywords: ["justiça", "verdade", "equilíbrio", "lei"],
    element: "Ar",
    astrology: "Libra"
  },
  {
    id: 12,
    name: "O Enforcado",
    nameEn: "The Hanged Man",
    arcana: "major",
    upright: ["Pausa, entrega, deixar ir, nova perspectiva"],
    reversed: ["Atrasos, resistência, impasse"],
    description: "O Enforcado representa sacrifício, rendição e uma nova perspectiva através da pausa.",
    keywords: ["sacrifício", "perspectiva", "pausa", "entrega"],
    element: "Água",
    astrology: "Netuno"
  },
  {
    id: 13,
    name: "A Morte",
    nameEn: "Death",
    arcana: "major",
    upright: ["Finais, mudança, transformação, transição"],
    reversed: ["Resistência à mudança, não conseguir deixar ir"],
    description: "A Morte representa transformação, finais necessários e renovação profunda.",
    keywords: ["transformação", "final", "mudança", "renovação"],
    element: "Água",
    astrology: "Escorpião"
  },
  {
    id: 14,
    name: "A Temperança",
    nameEn: "Temperance",
    arcana: "major",
    upright: ["Equilíbrio, moderação, paciência, propósito"],
    reversed: ["Desequilíbrio, excesso, falta de visão"],
    description: "A Temperança simboliza equilíbrio, moderação e encontrar o meio-termo.",
    keywords: ["equilíbrio", "moderação", "paciência", "harmonia"],
    element: "Fogo",
    astrology: "Sagitário"
  },
  {
    id: 15,
    name: "O Diabo",
    nameEn: "The Devil",
    arcana: "major",
    upright: ["Aprisionamento, vícios, sexualidade, materialismo"],
    reversed: ["Libertação, desapego, exploração de sombras"],
    description: "O Diabo representa vícios, dependências e a sombra que nos prende.",
    keywords: ["vícios", "materialismo", "aprisionamento", "sombra"],
    element: "Terra",
    astrology: "Capricórnio"
  },
  {
    id: 16,
    name: "A Torre",
    nameEn: "The Tower",
    arcana: "major",
    upright: ["Mudança súbita, revelação, ruptura, despertar"],
    reversed: ["Evitar desastre, medo da mudança, revelação adiada"],
    description: "A Torre representa mudanças repentinas, revelações chocantes e despertar.",
    keywords: ["mudança súbita", "revelação", "caos", "despertar"],
    element: "Fogo",
    astrology: "Marte"
  },
  {
    id: 17,
    name: "A Estrela",
    nameEn: "The Star",
    arcana: "major",
    upright: ["Esperança, fé, propósito, renovação, espiritualidade"],
    reversed: ["Falta de fé, desesperança, desconexão"],
    description: "A Estrela simboliza esperança, inspiração e renovação espiritual.",
    keywords: ["esperança", "fé", "inspiração", "serenidade"],
    element: "Ar",
    astrology: "Aquário"
  },
  {
    id: 18,
    name: "A Lua",
    nameEn: "The Moon",
    arcana: "major",
    upright: ["Ilusão, medo, ansiedade, subconsciente, intuição"],
    reversed: ["Liberação do medo, verdade revelada, ansiedade reprimida"],
    description: "A Lua representa ilusões, medos, o subconsciente e a intuição profunda.",
    keywords: ["ilusão", "intuição", "medo", "subconsciente"],
    element: "Água",
    astrology: "Peixes"
  },
  {
    id: 19,
    name: "O Sol",
    nameEn: "The Sun",
    arcana: "major",
    upright: ["Alegria, sucesso, celebração, positividade"],
    reversed: ["Pessimismo, depressão, tristeza"],
    description: "O Sol representa alegria, sucesso, vitalidade e positividade radiante.",
    keywords: ["alegria", "sucesso", "vitalidade", "positividade"],
    element: "Fogo",
    astrology: "Sol"
  },
  {
    id: 20,
    name: "O Julgamento",
    nameEn: "Judgement",
    arcana: "major",
    upright: ["Julgamento, renascimento, perdão, chamado interior"],
    reversed: ["Dúvida de si mesmo, autojulgamento, falta de perdão"],
    description: "O Julgamento representa despertar espiritual, renascimento e chamado superior.",
    keywords: ["julgamento", "renascimento", "perdão", "chamado"],
    element: "Fogo",
    astrology: "Plutão"
  },
  {
    id: 21,
    name: "O Mundo",
    nameEn: "The World",
    arcana: "major",
    upright: ["Conclusão, realização, viagens, sucesso"],
    reversed: ["Busca de conclusão, falta de encerramento"],
    description: "O Mundo representa conclusão, realização e o fim de um ciclo importante.",
    keywords: ["conclusão", "realização", "sucesso", "integração"],
    element: "Terra",
    astrology: "Saturno"
  }
];

// Minor Arcana structure (simplified - can be expanded with full descriptions)
export const SUITS = {
  WANDS: "wands",
  CUPS: "cups",
  SWORDS: "swords",
  PENTACLES: "pentacles"
};

export const MINOR_ARCANA = [
  // Wands (Fire) - Energy, Passion, Creativity
  ...Array.from({ length: 14 }, (_, i) => ({
    id: 22 + i,
    suit: SUITS.WANDS,
    rank: i < 10 ? (i + 1).toString() : ["Pajem", "Cavaleiro", "Rainha", "Rei"][i - 10],
    name: `${i < 10 ? (i + 1) : ["Pajem", "Cavaleiro", "Rainha", "Rei"][i - 10]} de Paus`,
    nameEn: `${i < 10 ? (i + 1) : ["Page", "Knight", "Queen", "King"][i - 10]} of Wands`,
    arcana: "minor",
    element: "Fogo",
    keywords: ["energia", "paixão", "criatividade", "ação"]
  })),

  // Cups (Water) - Emotions, Relationships, Intuition
  ...Array.from({ length: 14 }, (_, i) => ({
    id: 36 + i,
    suit: SUITS.CUPS,
    rank: i < 10 ? (i + 1).toString() : ["Pajem", "Cavaleiro", "Rainha", "Rei"][i - 10],
    name: `${i < 10 ? (i + 1) : ["Pajem", "Cavaleiro", "Rainha", "Rei"][i - 10]} de Copas`,
    nameEn: `${i < 10 ? (i + 1) : ["Page", "Knight", "Queen", "King"][i - 10]} of Cups`,
    arcana: "minor",
    element: "Água",
    keywords: ["emoção", "relacionamento", "intuição", "amor"]
  })),

  // Swords (Air) - Intellect, Communication, Conflict
  ...Array.from({ length: 14 }, (_, i) => ({
    id: 50 + i,
    suit: SUITS.SWORDS,
    rank: i < 10 ? (i + 1).toString() : ["Pajem", "Cavaleiro", "Rainha", "Rei"][i - 10],
    name: `${i < 10 ? (i + 1) : ["Pajem", "Cavaleiro", "Rainha", "Rei"][i - 10]} de Espadas`,
    nameEn: `${i < 10 ? (i + 1) : ["Page", "Knight", "Queen", "King"][i - 10]} of Swords`,
    arcana: "minor",
    element: "Ar",
    keywords: ["intelecto", "comunicação", "conflito", "verdade"]
  })),

  // Pentacles (Earth) - Material, Money, Career
  ...Array.from({ length: 14 }, (_, i) => ({
    id: 64 + i,
    suit: SUITS.PENTACLES,
    rank: i < 10 ? (i + 1).toString() : ["Pajem", "Cavaleiro", "Rainha", "Rei"][i - 10],
    name: `${i < 10 ? (i + 1) : ["Pajem", "Cavaleiro", "Rainha", "Rei"][i - 10]} de Ouros`,
    nameEn: `${i < 10 ? (i + 1) : ["Page", "Knight", "Queen", "King"][i - 10]} of Pentacles`,
    arcana: "minor",
    element: "Terra",
    keywords: ["material", "dinheiro", "carreira", "saúde"]
  }))
];

export const FULL_DECK = [...MAJOR_ARCANA, ...MINOR_ARCANA];

// Spread types
export const SPREAD_TYPES = {
  SINGLE: {
    id: "single",
    name: "Carta Única",
    description: "Uma carta para orientação rápida",
    positions: [{ name: "Mensagem do Dia" }]
  },
  THREE_CARD: {
    id: "three_card",
    name: "Três Cartas",
    description: "Passado, Presente e Futuro",
    positions: [
      { name: "Passado", description: "Influências do passado" },
      { name: "Presente", description: "Situação atual" },
      { name: "Futuro", description: "Tendências futuras" }
    ]
  },
  CELTIC_CROSS: {
    id: "celtic_cross",
    name: "Cruz Céltica",
    description: "Leitura completa e profunda",
    positions: [
      { name: "Presente", description: "Situação atual" },
      { name: "Desafio", description: "Obstáculos imediatos" },
      { name: "Passado", description: "Fundação da situação" },
      { name: "Futuro Próximo", description: "O que está chegando" },
      { name: "Acima", description: "Melhores resultados possíveis" },
      { name: "Abaixo", description: "Fundações ocultas" },
      { name: "Conselho", description: "Orientação" },
      { name: "Influências Externas", description: "Fatores externos" },
      { name: "Esperanças e Medos", description: "Sentimentos internos" },
      { name: "Resultado", description: "Resultado provável" }
    ]
  },
  LOVE: {
    id: "love",
    name: "Amor",
    description: "Tiragem para relacionamentos",
    positions: [
      { name: "Você", description: "Sua energia no relacionamento" },
      { name: "Parceiro", description: "Energia do parceiro" },
      { name: "Conexão", description: "A energia entre vocês" },
      { name: "Desafios", description: "Obstáculos" },
      { name: "Potencial", description: "Para onde pode ir" }
    ]
  },
  CAREER: {
    id: "career",
    name: "Carreira",
    description: "Orientação profissional",
    positions: [
      { name: "Situação Atual", description: "Sua posição agora" },
      { name: "Desafios", description: "Obstáculos profissionais" },
      { name: "Oportunidades", description: "Possibilidades" },
      { name: "Ação Sugerida", description: "O que fazer" },
      { name: "Resultado", description: "Possível desfecho" }
    ]
  }
};

export default FULL_DECK;
