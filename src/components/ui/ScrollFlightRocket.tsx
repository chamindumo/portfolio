import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { CornerBracket } from './CornerBracket';
import { Rocket } from 'lucide-react';

export const ScrollFlightRocket: React.FC = () => {
  const { scrollProgress, scrollVelocity, scrollDirection } = useScrollProgress();

  const isThrusting = scrollVelocity > 0.4;
  const flameIntensity = Math.min(scrollVelocity * 0.35, 1.8);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center pointer-events-none select-none">
      
      {/* Flight Path Vertical Rail */}
      <div className="relative h-64 w-[1px] bg-[var(--border-secondary)] flex flex-col items-center justify-between">
        
        {/* Rail Top/Bottom Crosshairs */}
        <span className="text-[var(--crosshair-color)] font-mono text-[9px] -translate-y-2">+</span>
        <span className="text-[var(--crosshair-color)] font-mono text-[9px] translate-y-2">+</span>

        {/* Dynamic Rocket Cruiser that glides along the vertical rail with scroll progress */}
        <div
          className="absolute pointer-events-auto transition-transform duration-200 ease-out cursor-pointer group"
          style={{
            top: `${Math.min(92, Math.max(8, scrollProgress))}%`,
            transform: 'translate(-50%, -50%)',
          }}
          onClick={scrollToTop}
          title="Scroll Rocket // Click to Elevate to Orbit"
        >
          <div className="relative p-2 border border-[var(--border-primary)] bg-[var(--background-card)] backdrop-blur-md flex flex-col items-center justify-center corner-bracket-container shadow-lg hover:border-[var(--accent-primary)] transition-all">
            <CornerBracket size={4} />

            {/* Rocket Icon / Body that pitches and tilts with scroll */}
            <div
              className="relative transition-transform duration-300 ease-out"
              style={{
                transform: `rotate(${scrollDirection === 'down' ? 180 : 0}deg) scale(${isThrusting ? 1.15 : 1.0})`,
              }}
            >
              <Rocket
                className={`w-5 h-5 text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors ${
                  isThrusting ? 'text-[var(--accent-primary)] animate-pulse' : ''
                }`}
              />

              {/* Glowing Thruster Exhaust Flame */}
              {isThrusting && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-2 bg-gradient-to-t from-[var(--accent-primary)] via-cyan-300 to-transparent rounded-full blur-[1px] transition-all"
                  style={{
                    bottom: scrollDirection === 'down' ? 'auto' : '-16px',
                    top: scrollDirection === 'down' ? '-16px' : 'auto',
                    height: `${12 + flameIntensity * 14}px`,
                    transform: scrollDirection === 'down' ? 'rotate(180deg)' : 'none',
                  }}
                />
              )}
            </div>

            {/* Mini Telemetry Tag */}
            <div className="mt-1 font-mono text-[9px] text-[var(--accent-primary)] font-bold tracking-tighter font-tabular">
              {String(scrollProgress).padStart(2, '0')}%
            </div>
          </div>
        </div>

      </div>

      {/* Flight Label */}
      <div className="mt-4 font-mono text-[9px] text-[var(--text-quaternary)] tracking-widest uppercase [writing-mode:vertical-rl] opacity-60">
        MISSION // SCROLL
      </div>

    </div>
  );
};
