import React from 'react';

interface CADRocketWidgetProps {
  scrollProgress: number; // 0 to 100
  scrollVelocity?: number;
  scrollDirection?: 'up' | 'down';
  className?: string;
  onClick?: () => void;
}

export const CADRocketWidget: React.FC<CADRocketWidgetProps> = ({
  scrollProgress,
  scrollVelocity = 0,
  className = '',
  onClick,
}) => {
  const isThrusting = scrollVelocity > 0.2;

  // Format 2-digit number: 00 to 99
  const displayNum = String(Math.min(99, Math.max(0, Math.round(scrollProgress)))).padStart(2, '0');

  return (
    <div
      onClick={onClick}
      className={`relative w-[84px] h-[126px] sm:w-[92px] sm:h-[138px] bg-[#101217]/95 border border-[var(--border-primary)] flex flex-col items-center justify-between p-3 select-none overflow-hidden transition-all duration-300 ${className} group cursor-pointer`}
      style={{
        boxShadow: isThrusting
          ? '0 0 28px rgba(0, 216, 255, 0.4), inset 0 0 16px rgba(0, 216, 255, 0.15)'
          : '0 12px 30px rgba(0, 0, 0, 0.8), 0 0 1px rgba(0, 216, 255, 0.2)',
      }}
      title="Click to elevate to orbit"
    >
      {/* 1. Precision Bright Cyan CAD Corner Brackets (Exact match to screenshot) */}
      <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00d8ff] pointer-events-none" />
      <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00d8ff] pointer-events-none" />
      <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00d8ff] pointer-events-none" />
      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00d8ff] pointer-events-none" />

      {/* 2. Vertical Cyan Glowing Neon Thruster Beam (Contained softly inside card) */}
      <div
        className="absolute right-3.5 top-3 bottom-3 w-4 rounded-full pointer-events-none transition-all duration-300"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 216, 255, 0.15) 0%, rgba(0, 216, 255, 0.95) 52%, rgba(0, 160, 255, 0.2) 100%)',
          filter: 'blur(6px)',
          opacity: isThrusting ? 1 : 0.85,
          transform: isThrusting ? 'scaleY(1.12)' : 'scaleY(1)',
        }}
        aria-hidden="true"
      />

      {/* 3. The Nice Rocket: Crisp, Clear, Recognizable & Beautifully Animated */}
      <div
        className="relative z-10 mt-1 transition-all duration-200 ease-out"
        style={{
          transform: isThrusting
            ? `translate(${(Math.random() - 0.5) * 1.5}px, -3px) scale(1.08)`
            : 'translate(0, 0)',
        }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        >
          {/* Main Rocket Fuselage Hull */}
          <path
            d="M28.5 5.5C28.5 5.5 22 8 18 14C14.5 19.2 14 24 14 27L21 34C24 34 28.8 33.5 34 30C40 26 42.5 19.5 42.5 19.5C42.5 19.5 41 12 36.5 7.5C32 3 28.5 5.5 28.5 5.5Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="fill-neutral-900/60"
          />

          {/* Cockpit Porthole Window with Glowing Cyan Core */}
          <circle
            cx="29"
            cy="19"
            r="3.5"
            stroke="currentColor"
            strokeWidth="2"
            className="fill-[#00d8ff]/30 text-[#00d8ff]"
          />
          <circle
            cx="29"
            cy="19"
            r="1.5"
            fill="#00d8ff"
            className="animate-pulse"
          />

          {/* Right Delta Wing Fin */}
          <path
            d="M27 32L34 37L37 31"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="fill-neutral-800/80"
          />

          {/* Left Delta Wing Fin */}
          <path
            d="M16 21L11 28L17 30"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="fill-neutral-800/80"
          />

          {/* Center Engine Thruster Nozzle */}
          <path
            d="M17.5 30.5L14 34L17 37L20.5 33.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="fill-neutral-850"
          />

          {/* Animated Thruster Flame Plume (Fiery Cyan / Electric Blue) */}
          <path
            d={
              isThrusting
                ? "M13.5 34.5C11 37 6 44 8 46C10 48 17 43 19.5 40.5L15 37.5L13.5 34.5Z"
                : "M14 34C12 36 9 40.5 10.5 42C12 43.5 16.5 40.5 18.5 38.5L15.5 36.5L14 34Z"
            }
            fill="url(#thrusterGradient)"
            stroke="#00d8ff"
            strokeWidth="1.2"
            className="transition-all duration-150 animate-pulse"
          />

          {/* Detached Exhaust Embers / Smoke Puffs */}
          <circle
            cx="8.5"
            cy="42.5"
            r={isThrusting ? "2.5" : "1.8"}
            stroke="#00d8ff"
            strokeWidth="1.5"
            className="fill-[#00d8ff]/20 animate-ping opacity-80"
          />
          <circle
            cx="5"
            cy="39"
            r="1.4"
            stroke="#00d8ff"
            strokeWidth="1.2"
            className="fill-cyan-300 opacity-60"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="thrusterGradient" x1="14" y1="34" x2="8" y2="45" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="0.4" stopColor="#00d8ff" />
              <stop offset="1" stopColor="#0284c7" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 4. Bright Cyan Monospace Digital Counter ("00" to "99") */}
      <div className="relative z-10 font-mono text-lg sm:text-xl font-extrabold tracking-widest text-[#00d8ff] font-tabular drop-shadow-[0_0_10px_rgba(0,216,255,0.75)]">
        {displayNum}
      </div>
    </div>
  );
};
