# 🔮 Tarô Místico - Aplicativo Completo de Leitura de Tarô com Avatar Animado

Um aplicativo web interativo de leitura de Tarô com avatares animados que falam, movimentam a boca sincronizada com a voz e interpretam leituras de 78 cartas.

## ✨ Características Principais

### 🎭 Dois Avatares Únicos Animados

1. **Guia Alegre** - Personagem carismático e vibrante
   - Cabelo cacheado e energia colorida
   - Roupa arco-íris com gradientes animados
   - Personalidade acolhedora e entusiasmada
   - Brincos dourados e bigode estiloso

2. **Guia Místico** - Personagem contemplativo e sábio
   - Cabelo longo escuro e barba detalhada
   - Capa azul celestial com broche dourado
   - Aura mística e profunda
   - Terceiro olho que aparece durante a fala

### 🃏 Sistema Completo de Tarô (NOVO - Fase 2!)

- **78 Cartas do Tarô**
  - 22 Arcanos Maiores completos (O Louco até O Mundo)
  - 56 Arcanos Menores (4 naipes: Paus, Copas, Espadas, Ouros)
  - Descrições detalhadas e palavras-chave para cada carta
  - Cartas reversas com significados alternativos

- **5 Tipos de Tiragem**
  - **Carta Única**: Orientação rápida do dia
  - **Três Cartas**: Passado, Presente e Futuro
  - **Cruz Céltica**: Leitura completa e profunda (10 cartas)
  - **Amor**: Tiragem especializada em relacionamentos (5 cartas)
  - **Carreira**: Orientação profissional (5 cartas)

- **Interatividade das Cartas**
  - Animação de embaralhamento com efeito visual
  - Cartas em 3D com flip animation
  - Revelar uma por uma ou todas de uma vez
  - Indicação de posição e significado para cada carta
  - Sistema de cartas invertidas (30% de chance)

### 🤖 Sistema de Interpretação com IA

- **Interpretação Automática**
  - Geração inteligente de leituras baseadas nas cartas sorteadas
  - Interpretações personalizadas por posição
  - Linguagem mística mas acessível
  - Consideração de cartas reversas

- **Integração com Claude API** (Opcional)
  - Suporte para interpretações ainda mais profundas usando IA
  - Basta adicionar sua API key no `.env`
  - Fallback para interpretação local se não configurado

- **Avatar Narra a Interpretação**
  - Interpretação é automaticamente falada pelo avatar escolhido
  - Sincronização labial durante a narração
  - Controles para pausar/reproduzir

### 🎤 Sistema Avançado de Text-to-Speech

- **Web Speech API** integrada (gratuita)
  - Seletor de vozes disponíveis
  - Controles de velocidade (0.5x a 2x)
  - Controles de tom (0.5 a 2)
  - Suporte automático para vozes em português

- **ElevenLabs API Integration** (Premium - Opcional)
  - Vozes ultra-realistas e naturais
  - Qualidade superior para experiência profissional
  - Configurável via `.env`
  - Sistema de fallback automático

### 🎨 Animações e Efeitos Visuais

- Sincronização labial perfeita com a fala
- Aura brilhante pulsante durante a fala
- Estrelas, luas e elementos flutuantes
- Gradientes místicos e efeitos glassmorphism
- Transições suaves entre estados e modos
- Animações 3D nas cartas de Tarô
- Efeito de flip realista
- Background com estrelas animadas

### 🎯 Interface Intuitiva de Dois Modos

**Modo Voz**: Experimente os avatares falantes
- Digite ou selecione textos
- Ajuste voz, velocidade e tom
- Exemplos pré-definidos por personalidade

**Modo Leitura de Tarô**: Consulte os arcanos
- Escolha tipo de tiragem
- Embaralhe e tire as cartas
- Revele e interprete sua leitura
- Ouça a interpretação narrada

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone <repository-url>
cd teste_claudecodeweb

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

O aplicativo estará disponível em `http://localhost:5173/`

### Configuração Opcional (APIs Premium)

Copie o arquivo `.env.example` para `.env` e adicione suas chaves:

```bash
cp .env.example .env
```

Edite `.env`:

```env
# Para vozes premium (opcional)
VITE_ELEVENLABS_API_KEY=your_api_key_here

# Para interpretações com IA avançada (opcional)
VITE_CLAUDE_API_KEY=your_api_key_here
```

**Nota**: O aplicativo funciona perfeitamente sem essas chaves, usando alternativas gratuitas!

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para UI
- **Vite 7** - Build tool e dev server ultrarrápido
- **Tailwind CSS v4** - Framework de CSS moderno
- **Lucide React** - Ícones lindos e modernos
- **Web Speech API** - Text-to-Speech nativo do navegador
- **ElevenLabs API** (Opcional) - Vozes premium
- **Claude API** (Opcional) - IA para interpretações

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── JoyfulAvatar.jsx       # Avatar alegre em SVG animado
│   ├── MysticalAvatar.jsx     # Avatar místico em SVG animado
│   ├── VoiceControls.jsx      # Controles de voz e TTS
│   ├── ExampleTexts.jsx       # Botões de exemplos de texto
│   ├── TarotCard.jsx          # Componente de carta 3D
│   └── TarotReading.jsx       # Sistema de tiragem de cartas
├── data/
│   └── tarotDeck.js           # Baralho completo (78 cartas)
├── utils/
│   ├── speechSynthesis.js     # TTS com Web Speech API
│   ├── elevenLabsTTS.js       # Integração ElevenLabs (opcional)
│   └── tarotInterpreter.js    # Sistema de interpretação IA
├── App.jsx                    # Componente principal
├── index.css                  # Estilos globais e animações
└── main.jsx                   # Ponto de entrada
```

## 🎮 Como Usar

### Modo Voz

1. **Escolha um Avatar**: Clique em "Guia Alegre" ou "Guia Místico"
2. **Digite ou Selecione um Texto**:
   - Digite seu próprio texto no campo
   - Ou clique em um dos exemplos pré-definidos
3. **Configure a Voz**:
   - Escolha uma voz do seletor
   - Ajuste velocidade e tom
4. **Clique em Falar**: Observe o avatar ganhar vida com boca sincronizada!
5. **Pare a Qualquer Momento**: Use o botão "Parar"

### Modo Leitura de Tarô

1. **Acesse o Modo Tarô**: Clique no botão "Leitura de Tarô" no topo
2. **Escolha uma Tiragem**:
   - Carta Única para orientação rápida
   - Três Cartas para visão temporal
   - Cruz Céltica para leitura profunda
   - Amor ou Carreira para áreas específicas
3. **Aguarde o Embaralhamento**: Veja as cartas sendo embaralhadas
4. **Revele as Cartas**: Clique nas cartas para revelá-las uma por uma
5. **Obtenha Interpretação**: Clique em "Obter Interpretação com IA"
6. **Ouça a Leitura**: O avatar narrará a interpretação para você!

## 🎨 Personalização

### Adicionar Novos Exemplos de Texto

Edite `src/components/ExampleTexts.jsx`:

```javascript
const joyfulExamples = [
  "Seu novo texto alegre aqui!",
  // ...
];

const mysticalExamples = [
  "Seu novo texto místico aqui!",
  // ...
];
```

### Modificar o Baralho de Tarô

Edite `src/data/tarotDeck.js` para adicionar descrições personalizadas ou novos significados.

### Customizar Cores

Edite `src/index.css` na seção `@theme`:

```css
@theme {
  --color-mystical-purple: #4c1d95;
  --color-mystical-indigo: #312e81;
  /* adicione suas cores aqui */
}
```

## 🎯 Funcionalidades Implementadas

### ✅ Fase 1 - MVP
- [x] Dois avatares SVG animados
- [x] Sincronização labial com TTS
- [x] Web Speech API integration
- [x] Controles de voz (velocidade, tom)
- [x] Interface mística com glassmorphism
- [x] Design responsivo

### ✅ Fase 2 - Sistema Completo de Tarô
- [x] Baralho completo de 78 cartas
- [x] 5 tipos de tiragem diferentes
- [x] Sistema de embaralhamento
- [x] Cartas 3D com flip animation
- [x] Sistema de cartas reversas
- [x] Integração ElevenLabs API (opcional)
- [x] Sistema de interpretação com IA
- [x] Integração Claude API (opcional)
- [x] Modo dual (Voz + Tarô)
- [x] Narração automática de interpretações

### 🔮 Fase 3 - Futuras Melhorias
- [ ] Histórico de leituras salvas
- [ ] Exportar leituras em PDF
- [ ] Mais avatares temáticos
- [ ] Expressões faciais variadas
- [ ] Música ambiente opcional
- [ ] Sistema de favoritos
- [ ] Compartilhamento social
- [ ] Modo escuro/claro
- [ ] Animações de partículas avançadas

## 🌐 Compatibilidade de Navegadores

- Chrome/Edge ✅ (Melhor experiência)
- Firefox ✅
- Safari ✅
- Opera ✅

**Nota**: Web Speech API funciona melhor em navegadores Chromium.

## 🐛 Troubleshooting

### Vozes não aparecem
- Aguarde alguns segundos para as vozes carregarem
- Recarregue a página
- Verifique permissões de áudio do navegador

### Cartas não viram
- Verifique se o navegador suporta CSS 3D transforms
- Tente em um navegador moderno

### Interpretação não funciona
- É normal! A interpretação local sempre funciona
- Para IA avançada, configure as API keys no `.env`

## 📝 Licença

Este projeto está sob a licença MIT.

## 🙏 Agradecimentos

Desenvolvido com energia mística, paixão por Tarô e tecnologia moderna! ✨

Agradecimentos especiais às tecnologias que tornaram isso possível:
- React e comunidade open-source
- Tailwind CSS team
- Lucide Icons
- Web Standards (Speech API)

---

## 💫 Dicas para Melhor Experiência

1. **Use fones de ouvido** para melhor qualidade de áudio
2. **Permita o áudio** quando o navegador solicitar
3. **Experimente vozes diferentes** - algumas são melhores que outras
4. **Teste as diferentes tiragens** - cada uma serve para diferentes propósitos
5. **Leia a interpretação** enquanto ouve para melhor compreensão
6. **Configure APIs premium** se quiser a melhor experiência possível

**Aproveite sua jornada mística! 🔮✨**
