# 🔮 Tarô Místico - Aplicativo de Leitura de Tarô com Avatar Animado

Um aplicativo web interativo de leitura de Tarô com avatares animados que falam e movimentam a boca sincronizada com a voz.

## ✨ Características

### 🎭 Dois Avatares Únicos

1. **Guia Alegre** - Personagem carismático e vibrante
   - Cabelo cacheado e energia colorida
   - Roupa arco-íris
   - Personalidade acolhedora e entusiasmada

2. **Guia Místico** - Personagem contemplativo e sábio
   - Cabelo longo escuro e barba
   - Capa azul celestial
   - Aura mística e profunda

### 🎤 Sistema de Text-to-Speech

- **Web Speech API** integrada
- Seletor de vozes disponíveis
- Controles de velocidade e tom
- Suporte para vozes em português

### 🎨 Animações e Efeitos

- Sincronização labial com a fala
- Aura brilhante pulsante durante a fala
- Estrelas e elementos flutuantes
- Gradientes místicos e efeitos glassmorphism
- Transições suaves entre estados

### 🎯 Interface Intuitiva

- Design responsivo
- Paleta de cores mística (roxo, índigo, azul noturno)
- Exemplos de falas pré-definidos
- Controles de voz ajustáveis
- Alternância fácil entre avatares

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

O aplicativo estará disponível em `http://localhost:5173/`

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para UI
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de CSS utilitário
- **Lucide React** - Ícones
- **Web Speech API** - Text-to-Speech nativo do navegador

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── JoyfulAvatar.jsx      # Avatar alegre em SVG
│   ├── MysticalAvatar.jsx    # Avatar místico em SVG
│   ├── VoiceControls.jsx     # Controles de voz e TTS
│   └── ExampleTexts.jsx      # Botões de exemplos de texto
├── utils/
│   └── speechSynthesis.js    # Lógica de TTS e sincronização
├── App.jsx                   # Componente principal
├── index.css                 # Estilos globais
└── main.jsx                  # Ponto de entrada
```

## 🎮 Como Usar

1. **Escolha um Avatar**: Clique em "Guia Alegre" ou "Guia Místico"
2. **Digite ou Selecione um Texto**:
   - Digite seu próprio texto no campo
   - Ou clique em um dos exemplos pré-definidos
3. **Configure a Voz**:
   - Escolha uma voz do seletor
   - Ajuste velocidade e tom
4. **Clique em Falar**: Observe o avatar ganhar vida com boca sincronizada!
5. **Pare a Qualquer Momento**: Use o botão "Parar" para interromper

## 🎨 Personalização

### Adicionar Novos Exemplos de Texto

Edite o arquivo `src/components/ExampleTexts.jsx`:

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

### Modificar Cores do Tema

Edite `tailwind.config.js` para personalizar as cores:

```javascript
theme: {
  extend: {
    colors: {
      'mystical-purple': '#4c1d95',
      // adicione suas cores aqui
    }
  }
}
```

## 🔮 Roadmap - Próximas Funcionalidades

### Fase 2
- [ ] Integração com ElevenLabs API (vozes ultra-realistas)
- [ ] Sistema completo de leitura de Tarô
- [ ] Baralho de 78 cartas interativo
- [ ] Diferentes tipos de tiragem (3 cartas, Cruz Céltica)
- [ ] Mais expressões faciais nos avatares

### Fase 3
- [ ] Integração com IA para interpretações personalizadas
- [ ] Sistema de salvamento de leituras
- [ ] Exportar leituras em PDF
- [ ] Múltiplos avatares temáticos
- [ ] Personalização completa de cores e temas
- [ ] Música ambiente opcional

## 🌐 Compatibilidade de Navegadores

- Chrome/Edge ✅ (Melhor experiência)
- Firefox ✅
- Safari ✅
- Opera ✅

**Nota**: A Web Speech API tem melhor suporte em navegadores baseados em Chromium.

## 📝 Licença

Este projeto está sob a licença MIT.

## 🙏 Agradecimentos

Desenvolvido com energia mística e tecnologia moderna! ✨

---

**Dica**: Para melhor experiência, use fones de ouvido e permita o áudio no navegador!
