import React from 'react';

export const GridBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Blueprint grid lines */}
      <div className="absolute inset-0 blueprint-grid-bg opacity-75" />

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
          background: 'radial-gradient(ellipse at 50% 30%, transparent 40%, var(--background-primary) 95%)',
        }}
      />
    </div>
  );
};
