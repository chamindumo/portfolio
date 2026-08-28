import React from 'react';

export const GridBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Blueprint grid lines */}
      <div className="absolute inset-0 blueprint-grid-bg opacity-75 transition-opacity duration-300" />

      {/* Radiant Top Ambient Glow Aura (Gives light mode vibrant life & dark mode cosmic depth) */}
      <div 
        className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-40 dark:opacity-20 transition-all duration-500"
        style={{
          background: 'radial-gradient(circle, #38bdf8 0%, #6366f1 45%, #a855f7 70%, transparent 85%)',
        }}
      />

      {/* Bottom Subtle Ambient Tint */}
      <div 
        className="absolute -bottom-[150px] right-1/4 w-[600px] h-[400px] rounded-full blur-[160px] pointer-events-none opacity-25 dark:opacity-15 transition-all duration-500"
        style={{
          background: 'radial-gradient(circle, #0284c7 0%, #06b6d4 50%, transparent 80%)',
        }}
      />

      {/* Decorative architectural crosshairs */}
      <div className="absolute top-1/4 left-10 text-[var(--crosshair-color)] font-mono text-xs select-none">
        +
      </div>
      <div className="absolute top-1/4 right-10 text-[var(--crosshair-color)] font-mono text-xs select-none">
        +
      </div>
      <div className="absolute top-2/4 left-1/4 text-[var(--crosshair-color)] font-mono text-xs select-none">
        +
      </div>
      <div className="absolute top-2/4 right-1/4 text-[var(--crosshair-color)] font-mono text-xs select-none">
        +
      </div>
      <div className="absolute top-3/4 left-10 text-[var(--crosshair-color)] font-mono text-xs select-none">
        +
      </div>
      <div className="absolute top-3/4 right-10 text-[var(--crosshair-color)] font-mono text-xs select-none">
        +
      </div>

      {/* Ambient gradient vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, transparent 45%, var(--background-primary) 96%)',
        }}
      />
    </div>
  );
};
