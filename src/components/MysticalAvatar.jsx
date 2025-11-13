import React from 'react';
import { Moon, Star } from 'lucide-react';

const MysticalAvatar = ({ mouthState = 'closed', isSpeaking = false }) => {
  // Mouth paths for different states
  const mouthPaths = {
    closed: 'M 180 250 Q 200 250 220 250',
    open: 'M 180 250 Q 200 260 220 250',
    wide: 'M 180 245 Q 200 270 220 245'
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Celestial aura when speaking */}
      {isSpeaking && (
        <div className="absolute inset-0 animate-pulse-slow">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/40 via-purple-600/40 to-blue-500/40 rounded-full blur-3xl"></div>
        </div>
      )}

      {/* Floating stars and moons */}
      {isSpeaking && (
        <>
          <Star
            className="absolute top-8 left-8 text-indigo-300 animate-float"
            size={28}
            fill="currentColor"
          />
          <Moon
            className="absolute top-12 right-10 text-purple-300 animate-float"
            size={24}
            style={{ animationDelay: '0.7s' }}
          />
          <Star
            className="absolute bottom-16 left-12 text-blue-300 animate-float"
            size={20}
            fill="currentColor"
            style={{ animationDelay: '1.2s' }}
          />
        </>
      )}

      {/* Main SVG Avatar */}
      <svg
        width="400"
        height="500"
        viewBox="0 0 400 500"
        className="relative z-10 drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="mysticalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="50%" stopColor="#4c1d95" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>

          <radialGradient id="faceMysticalGradient">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#d4a574" />
          </radialGradient>

          <linearGradient id="capeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#312e81" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
        </defs>

        {/* Background mystical circle */}
        <circle cx="200" cy="200" r="150" fill="url(#mysticalGradient)" opacity="0.3" />

        {/* Stars in background */}
        <g fill="#fbbf24" opacity="0.7">
          <circle cx="120" cy="120" r="2" />
          <circle cx="280" cy="140" r="3" />
          <circle cx="140" cy="280" r="2" />
          <circle cx="270" cy="270" r="2" />
          <circle cx="200" cy="100" r="2.5" />
        </g>

        {/* Cape/Cloak */}
        <path
          d="M 140 220 Q 120 250 110 320 L 110 420 Q 130 410 160 420 L 160 320 Z"
          fill="url(#capeGradient)"
          stroke="#1e40af"
          strokeWidth="2"
        />
        <path
          d="M 260 220 Q 280 250 290 320 L 290 420 Q 270 410 240 420 L 240 320 Z"
          fill="url(#capeGradient)"
          stroke="#1e40af"
          strokeWidth="2"
        />

        {/* Face */}
        <circle
          cx="200"
          cy="200"
          r="120"
          fill="url(#faceMysticalGradient)"
          stroke="#92400e"
          strokeWidth="2"
        />

        {/* Long dark hair */}
        <g fill="#1a1a1a">
          {/* Main hair */}
          <ellipse cx="200" cy="120" rx="130" ry="60" />
          <rect x="70" y="120" width="260" height="120" />

          {/* Hair strands */}
          <path d="M 70 180 Q 60 240 70 300" strokeWidth="3" stroke="#1a1a1a" fill="none" />
          <path d="M 100 190 Q 90 250 95 310" strokeWidth="3" stroke="#1a1a1a" fill="none" />
          <path d="M 300 190 Q 310 250 305 310" strokeWidth="3" stroke="#1a1a1a" fill="none" />
          <path d="M 330 180 Q 340 240 330 300" strokeWidth="3" stroke="#1a1a1a" fill="none" />

          {/* Side hair covering ears */}
          <ellipse cx="85" cy="200" rx="35" ry="80" />
          <ellipse cx="315" cy="200" rx="35" ry="80" />
        </g>

        {/* Beard */}
        <g fill="#1a1a1a">
          <path d="M 160 260 Q 180 280 200 285 Q 220 280 240 260 L 235 275 Q 220 290 200 295 Q 180 290 165 275 Z" />
          {/* Beard details */}
          <path d="M 170 265 Q 175 278 180 282" stroke="#333" strokeWidth="1.5" fill="none" />
          <path d="M 185 270 Q 190 282 195 286" stroke="#333" strokeWidth="1.5" fill="none" />
          <path d="M 205 270 Q 210 282 215 286" stroke="#333" strokeWidth="1.5" fill="none" />
          <path d="M 220 265 Q 225 278 230 282" stroke="#333" strokeWidth="1.5" fill="none" />
        </g>

        {/* Eyes - serious contemplative look */}
        <g>
          {/* Left eye */}
          <ellipse cx="170" cy="190" rx="10" ry="14" fill="#1f2937" />
          <ellipse cx="171" cy="188" rx="4" ry="6" fill="#94a3b8" />
          <ellipse cx="172" cy="186" rx="2" ry="3" fill="white" />

          {/* Right eye */}
          <ellipse cx="230" cy="190" rx="10" ry="14" fill="#1f2937" />
          <ellipse cx="231" cy="188" rx="4" ry="6" fill="#94a3b8" />
          <ellipse cx="232" cy="186" rx="2" ry="3" fill="white" />

          {/* Eyebrows - serious expression */}
          <path d="M 155 175 Q 165 172 180 175" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 220 175 Q 235 172 245 175" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>

        {/* Mouth - animated */}
        <path
          d={mouthPaths[mouthState]}
          fill="none"
          stroke="#7c2d12"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Golden brooch/medallion */}
        <g transform="translate(200, 320)">
          <circle cx="0" cy="0" r="18" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="0" cy="0" r="12" fill="none" stroke="#92400e" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="4" fill="#dc2626" />
          {/* Mystical symbol - triangle */}
          <path d="M 0,-8 L -7,6 L 7,6 Z" fill="none" stroke="#92400e" strokeWidth="1.5" />
        </g>

        {/* Decorative tarot card - "The Magician" */}
        <g transform="translate(20, 350)">
          <rect x="0" y="0" width="50" height="80" rx="4" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
          <text x="25" y="22" fontSize="12" fill="#818cf8" textAnchor="middle" fontWeight="bold">I</text>
          <text x="25" y="42" fontSize="8" fill="#c4b5fd" textAnchor="middle">THE</text>
          <text x="25" y="55" fontSize="9" fill="#c4b5fd" textAnchor="middle">MAGICIAN</text>
          {/* Infinity symbol */}
          <path d="M 15,65 Q 20,60 25,65 Q 30,70 35,65 Q 30,60 25,65 Q 20,70 15,65" fill="none" stroke="#818cf8" strokeWidth="1.5" />
        </g>

        {/* Third eye chakra symbol */}
        {isSpeaking && (
          <g opacity="0.7">
            <circle cx="200" cy="160" r="8" fill="none" stroke="#a855f7" strokeWidth="2" />
            <circle cx="200" cy="160" r="3" fill="#a855f7" />
          </g>
        )}
      </svg>
    </div>
  );
};

export default MysticalAvatar;
