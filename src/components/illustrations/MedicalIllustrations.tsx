import React from 'react';

export const HeartIllustration: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="heartGrad" x1="20" y1="20" x2="80" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f43f5e" />
        <stop offset="0.6" stopColor="#e11d48" />
        <stop offset="1" stopColor="#be123c" />
      </linearGradient>
      <linearGradient id="aortaGrad" x1="45" y1="10" x2="65" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38bdf8" />
        <stop offset="1" stopColor="#0284c7" />
      </linearGradient>
      <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#f43f5e" floodOpacity="0.3" />
      </filter>
    </defs>
    {/* Aorta & Pulmonary Artery */}
    <path d="M42 28V16C42 13 46 11 50 11C54 11 58 13 58 16V26" stroke="url(#aortaGrad)" strokeWidth="6" strokeLinecap="round" />
    <path d="M50 11V7" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
    <path d="M45 12L38 8" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
    <path d="M55 12L62 8" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
    {/* Main Heart Muscle */}
    <path
      d="M50 86C50 86 20 66 18 42C16 26 28 18 38 22C44 24 48 30 50 34C52 30 56 24 62 22C72 18 84 26 82 42C80 66 50 86 50 86Z"
      fill="url(#heartGrad)"
      filter="url(#softGlow)"
    />
    {/* Muscle Highlights */}
    <path d="M26 36C24 46 30 62 48 76" stroke="#fda4af" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6" />
    <circle cx="34" cy="34" r="3" fill="#ffffff" fillOpacity="0.7" />
    {/* Pulse ECG Line */}
    <path d="M35 52H43L47 42L52 60L56 50L60 54H65" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LungsIllustration: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="lungLeft" x1="15" y1="30" x2="45" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2dd4bf" />
        <stop offset="1" stopColor="#0d9488" />
      </linearGradient>
      <linearGradient id="lungRight" x1="55" y1="30" x2="85" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38bdf8" />
        <stop offset="1" stopColor="#0284c7" />
      </linearGradient>
    </defs>
    {/* Trachea */}
    <path d="M50 14V38" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
    <path d="M46 20H54M46 26H54M46 32H54" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
    {/* Bronchi branches */}
    <path d="M50 38C44 42 38 46 32 50" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
    <path d="M50 38C56 42 62 46 68 50" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
    {/* Left Lung Lobe */}
    <path
      d="M44 40C44 40 40 32 30 32C20 32 14 42 14 58C14 74 24 84 38 84C42 84 44 80 44 76C44 68 40 56 44 40Z"
      fill="url(#lungLeft)"
    />
    {/* Right Lung Lobe */}
    <path
      d="M56 40C56 40 60 32 70 32C80 32 86 42 86 58C86 74 76 84 62 84C58 84 56 80 56 76C56 68 60 56 56 40Z"
      fill="url(#lungRight)"
    />
    {/* Internal subtle branch lines */}
    <path d="M26 48C28 56 34 64 36 74" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
    <path d="M74 48C72 56 66 64 64 74" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
  </svg>
);

export const BrainIllustration: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="brainGrad" x1="20" y1="20" x2="80" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#c084fc" />
        <stop offset="0.7" stopColor="#9333ea" />
        <stop offset="1" stopColor="#7e22ce" />
      </linearGradient>
    </defs>
    {/* Left Hemisphere */}
    <path
      d="M48 24C44 20 36 20 30 24C22 30 20 40 22 50C16 54 16 64 22 70C26 74 34 76 40 76C46 76 48 72 48 68V24Z"
      fill="url(#brainGrad)"
    />
    {/* Right Hemisphere */}
    <path
      d="M52 24C56 20 64 20 70 24C78 30 80 40 78 50C84 54 84 64 78 70C74 74 66 76 60 76C54 76 52 72 52 68V24Z"
      fill="url(#brainGrad)"
    />
    {/* Gyri Folds & Details */}
    <path d="M30 34C34 38 42 36 44 42" stroke="#f3e8ff" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M26 48C32 50 36 46 42 52" stroke="#f3e8ff" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M28 62C34 60 40 66 44 64" stroke="#f3e8ff" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M70 34C66 38 58 36 56 42" stroke="#f3e8ff" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M74 48C68 50 64 46 58 52" stroke="#f3e8ff" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M72 62C66 60 60 66 56 64" stroke="#f3e8ff" strokeWidth="2.5" strokeLinecap="round" />
    {/* Neuro Synapse Sparkle */}
    <circle cx="50" cy="18" r="3" fill="#38bdf8" />
    <line x1="50" y1="21" x2="50" y2="30" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
  </svg>
);

export const MedicalReportIllustration: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="paperGrad" x1="25" y1="15" x2="75" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" />
        <stop offset="1" stopColor="#f1f5f9" />
      </linearGradient>
      <linearGradient id="badgeGrad" x1="60" y1="65" x2="80" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10b981" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
    </defs>
    {/* Document shadow / border */}
    <rect x="22" y="14" width="56" height="74" rx="8" fill="#e2e8f0" />
    <rect x="20" y="12" width="56" height="74" rx="8" fill="url(#paperGrad)" stroke="#cbd5e1" strokeWidth="2" />
    {/* Top Header Bar */}
    <rect x="28" y="22" width="22" height="4" rx="2" fill="#0d9488" />
    <rect x="28" y="30" width="38" height="3" rx="1.5" fill="#94a3b8" />
    <rect x="28" y="38" width="40" height="3" rx="1.5" fill="#cbd5e1" />
    {/* Graph/Metric Bars inside report */}
    <rect x="28" y="48" width="12" height="2" rx="1" fill="#64748b" />
    <rect x="44" y="48" width="20" height="4" rx="2" fill="#14b8a6" />
    <rect x="28" y="56" width="12" height="2" rx="1" fill="#64748b" />
    <rect x="44" y="56" width="16" height="4" rx="2" fill="#38bdf8" />
    {/* Verified Official Seal */}
    <circle cx="68" cy="72" r="11" fill="url(#badgeGrad)" />
    <path d="M63 72L67 76L74 68" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PillsIllustration: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="capGrad1" x1="25" y1="25" x2="45" y2="55" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06b6d4" />
        <stop offset="1" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="capGrad2" x1="45" y1="45" x2="65" y2="75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fb7185" />
        <stop offset="1" stopColor="#e11d48" />
      </linearGradient>
      <linearGradient id="tabletGrad" x1="55" y1="20" x2="85" y2="50" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f8fafc" />
        <stop offset="1" stopColor="#cbd5e1" />
      </linearGradient>
    </defs>
    {/* Round tablet */}
    <circle cx="70" cy="35" r="16" fill="url(#tabletGrad)" stroke="#94a3b8" strokeWidth="2" />
    <line x1="60" y1="35" x2="80" y2="35" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
    {/* Rotated Capsule */}
    <g transform="rotate(-35 48 58)">
      {/* Top half */}
      <path d="M38 35C38 27 44 20 52 20C60 20 66 27 66 35V52H38V35Z" fill="url(#capGrad1)" />
      {/* Bottom half */}
      <path d="M38 52V69C38 77 44 84 52 84C60 84 66 77 66 69V52H38Z" fill="url(#capGrad2)" />
      {/* Capsule shine */}
      <path d="M42 28C42 24 45 23 48 23" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
      <line x1="38" y1="52" x2="66" y2="52" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.4" />
    </g>
  </svg>
);

export const DoctorAvatar: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="docGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ccfbf1" />
        <stop offset="1" stopColor="#99f6e4" />
      </linearGradient>
      <linearGradient id="scrubGrad" x1="30" y1="65" x2="70" y2="95" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0d9488" />
        <stop offset="1" stopColor="#0f766e" />
      </linearGradient>
    </defs>
    {/* Background Circle */}
    <circle cx="50" cy="50" r="46" fill="url(#docGrad)" stroke="#14b8a6" strokeWidth="2" />
    {/* Body / Scrubs */}
    <path d="M22 88C22 72 34 66 50 66C66 66 78 72 78 88" fill="url(#scrubGrad)" />
    {/* Stethoscope around neck */}
    <path d="M36 66C36 74 42 80 50 80C58 80 64 74 64 66" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" fill="none" />
    <circle cx="50" cy="81" r="3" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
    {/* Neck */}
    <rect x="44" y="52" width="12" height="16" fill="#fbcfe8" rx="4" />
    {/* Head */}
    <circle cx="50" cy="42" r="16" fill="#fde047" fillOpacity="0.4" />
    <circle cx="50" cy="42" r="16" fill="#fcd34d" />
    {/* Hair / Cap */}
    <path d="M34 40C34 30 40 25 50 25C60 25 66 30 66 40C66 42 63 36 50 36C37 36 34 42 34 40Z" fill="#1e293b" />
    {/* Friendly Face */}
    <circle cx="45" cy="42" r="2" fill="#0f172a" />
    <circle cx="55" cy="42" r="2" fill="#0f172a" />
    <path d="M46 48C48 51 52 51 54 48" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
    {/* AI Halo / Badge */}
    <circle cx="74" cy="26" r="10" fill="#38bdf8" />
    <path d="M71 26L73 28L78 23" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const VitalsMonitorIllustration: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="screenGrad" x1="20" y1="20" x2="80" y2="70" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0f172a" />
        <stop offset="1" stopColor="#1e293b" />
      </linearGradient>
    </defs>
    {/* Monitor Case */}
    <rect x="14" y="20" width="72" height="52" rx="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
    {/* Screen */}
    <rect x="18" y="24" width="64" height="44" rx="5" fill="url(#screenGrad)" />
    {/* ECG Pulse on Screen */}
    <path
      d="M20 46H32L36 34L40 56L44 42L48 48H56L60 38L64 52L68 46H80"
      stroke="#10b981"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Heart Rate Metric */}
    <text x="64" y="34" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="sans-serif">72</text>
    <text x="73" y="33" fill="#94a3b8" fontSize="5" fontFamily="sans-serif">bpm</text>
    {/* Stand */}
    <path d="M42 72L36 86H64L58 72" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
    <rect x="32" y="86" width="36" height="4" rx="2" fill="#64748b" />
  </svg>
);

export const MoodFace: React.FC<{ mood: 'great' | 'good' | 'neutral' | 'low' | 'anxious' | 'in_pain'; className?: string }> = ({ mood, className = "w-10 h-10" }) => {
  switch (mood) {
    case 'great':
      return (
        <svg viewBox="0 0 40 40" className={className}>
          <circle cx="20" cy="20" r="18" fill="#10b981" />
          <path d="M12 16C13 14 16 14 17 16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M23 16C24 14 27 14 28 16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M12 22C14 28 26 28 28 22H12Z" fill="#ffffff" />
        </svg>
      );
    case 'good':
      return (
        <svg viewBox="0 0 40 40" className={className}>
          <circle cx="20" cy="20" r="18" fill="#14b8a6" />
          <circle cx="14" cy="16" r="2" fill="#ffffff" />
          <circle cx="26" cy="16" r="2" fill="#ffffff" />
          <path d="M13 23C15 28 25 28 27 23" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'neutral':
      return (
        <svg viewBox="0 0 40 40" className={className}>
          <circle cx="20" cy="20" r="18" fill="#f59e0b" />
          <circle cx="14" cy="16" r="2" fill="#ffffff" />
          <circle cx="26" cy="16" r="2" fill="#ffffff" />
          <line x1="14" y1="24" x2="26" y2="24" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'low':
      return (
        <svg viewBox="0 0 40 40" className={className}>
          <circle cx="20" cy="20" r="18" fill="#3b82f6" />
          <circle cx="14" cy="16" r="2" fill="#ffffff" />
          <circle cx="26" cy="16" r="2" fill="#ffffff" />
          <path d="M14 26C16 22 24 22 26 26" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'anxious':
      return (
        <svg viewBox="0 0 40 40" className={className}>
          <circle cx="20" cy="20" r="18" fill="#8b5cf6" />
          <circle cx="14" cy="16" r="2.5" fill="#ffffff" />
          <circle cx="26" cy="16" r="2.5" fill="#ffffff" />
          <path d="M13 25Q16 22 20 25T27 25" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="10" cy="10" r="2" fill="#c4b5fd" />
        </svg>
      );
    case 'in_pain':
      return (
        <svg viewBox="0 0 40 40" className={className}>
          <circle cx="20" cy="20" r="18" fill="#ef4444" />
          <path d="M12 14L16 18M16 14L12 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <path d="M24 14L28 18M28 14L24 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="20" cy="26" rx="5" ry="3" fill="#ffffff" />
        </svg>
      );
  }
};
