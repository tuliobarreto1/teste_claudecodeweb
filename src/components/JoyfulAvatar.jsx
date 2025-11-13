import React from 'react';
import { Sparkles } from 'lucide-react';

const JoyfulAvatar = ({ mouthState = 'closed', isSpeaking = false }) => {
  // Mouth paths for different states
  const mouthPaths = {
    closed: 'M 180 240 Q 200 245 220 240',
    open: 'M 180 240 Q 200 255 220 240',
    wide: 'M 180 235 Q 200 265 220 235'
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Aura effect when speaking */}
      {isSpeaking && (
        <div className="absolute inset-0 animate-pulse-slow">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-yellow-500/30 rounded-full blur-3xl"></div>
        </div>
      )}

      {/* Floating sparkles */}
      {isSpeaking && (
        <>
          <Sparkles
            className="absolute top-10 left-10 text-yellow-400 animate-float"
            size={24}
          />
          <Sparkles
            className="absolute top-16 right-12 text-pink-400 animate-float"
            size={20}
            style={{ animationDelay: '0.5s' }}
          />
          <Sparkles
            className="absolute bottom-20 left-16 text-purple-400 animate-float"
            size={18}
            style={{ animationDelay: '1s' }}
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
        {/* Background circle */}
        <circle cx="200" cy="200" r="150" fill="url(#joyfulGradient)" />

        <defs>
          <linearGradient id="joyfulGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <animate
              attributeName="x1"
              values="0%;100%;0%"
              dur="5s"
              repeatCount="indefinite"
            />
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          <radialGradient id="faceGradient">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fbbf24" />
          </radialGradient>
        </defs>

        {/* Face */}
        <circle cx="200" cy="200" r="120" fill="url(#faceGradient)" stroke="#f59e0b" strokeWidth="3" />

        {/* Curly hair */}
        <g fill="#7c2d12">
          {/* Top curls */}
          <circle cx="150" cy="100" r="25" />
          <circle cx="180" cy="85" r="28" />
          <circle cx="210" cy="80" r="30" />
          <circle cx="240" cy="85" r="28" />
          <circle cx="270" cy="100" r="25" />

          {/* Side curls */}
          <circle cx="120" cy="130" r="22" />
          <circle cx="105" cy="165" r="20" />
          <circle cx="280" cy="130" r="22" />
          <circle cx="295" cy="165" r="20" />
        </g>

        {/* Eyes */}
        <g>
          {/* Left eye */}
          <ellipse cx="170" cy="180" rx="12" ry="18" fill="#422006" />
          <ellipse cx="172" cy="178" rx="5" ry="8" fill="white" />

          {/* Right eye */}
          <ellipse cx="230" cy="180" rx="12" ry="18" fill="#422006" />
          <ellipse cx="232" cy="178" rx="5" ry="8" fill="white" />
        </g>

        {/* Mustache */}
        <g fill="#7c2d12">
          <path d="M 180 220 Q 170 215 160 220 Q 165 225 175 223" />
          <path d="M 220 220 Q 230 215 240 220 Q 235 225 225 223" />
        </g>

        {/* Mouth - animated */}
        <path
          d={mouthPaths[mouthState]}
          fill="none"
          stroke="#dc2626"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Rosy cheeks */}
        <circle cx="150" cy="210" r="15" fill="#fda4af" opacity="0.6" />
        <circle cx="250" cy="210" r="15" fill="#fda4af" opacity="0.6" />

        {/* Earrings */}
        <g fill="#fbbf24" stroke="#f59e0b" strokeWidth="2">
          <circle cx="100" cy="200" r="8" />
          <circle cx="300" cy="200" r="8" />
        </g>

        {/* Rainbow shirt/clothing */}
        <rect
          x="120"
          y="310"
          width="160"
          height="100"
          rx="10"
          fill="url(#rainbowGradient)"
        />

        <defs>
          <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="20%" stopColor="#f97316" />
            <stop offset="40%" stopColor="#fbbf24" />
            <stop offset="60%" stopColor="#34d399" />
            <stop offset="80%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Decorative tarot card - "The Star" */}
        <g transform="translate(320, 350)">
          <rect x="0" y="0" width="50" height="80" rx="4" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
          <text x="25" y="25" fontSize="12" fill="#fbbf24" textAnchor="middle">XVII</text>
          <polygon points="25,35 20,50 30,45 15,45 25,60 35,45 20,45 30,50" fill="#fbbf24" />
        </g>
      </svg>
    </div>
  );
};

export default JoyfulAvatar;
