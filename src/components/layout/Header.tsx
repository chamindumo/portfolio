import React from 'react';
import { CornerBracket } from '../ui/CornerBracket';
import { ThemeMode } from '../../hooks/useTheme';
import { useScrollProgress } from '../../hooks/useScrollProgress';

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenMenu: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  onOpenMenu,
  activeSection,
}) => {
  const { scrollProgress } = useScrollProgress();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-[var(--header-height)] border-b border-[var(--border-primary)] bg-[var(--background-primary)]/85 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-[var(--grid-max-width)] mx-auto h-full px-3 md:px-6 flex items-center justify-between relative">
        
        {/* Left: Menu Trigger Button [ M ] */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenMenu}
            className="relative h-9 w-9 md:h-10 md:w-10 flex items-center justify-center font-mono text-sm tracking-wider text-[var(--text-primary)] hover:text-white bg-[var(--background-secondary)] hover:bg-[var(--accent-primary)]/20 transition-all border border-[var(--border-primary)] group"
            aria-label="Open Navigation Blueprint"
          >
            <CornerBracket size={6} />
            <span className="font-semibold transition-transform group-hover:scale-110">M</span>
          </button>

          {/* Section Indicator & Scroll Telemetry (Desktop) */}
          <div className="hidden md:flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-[var(--text-quaternary)]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              <span>SEC // {activeSection.toUpperCase()}</span>
            </div>
            <span className="opacity-30">|</span>
            <div className="flex items-center gap-1 text-[var(--text-tertiary)] font-tabular">
              <span>POS //</span>
              <span className="text-[var(--accent-primary)] font-bold">{String(scrollProgress).padStart(2, '0')}%</span>
            </div>
          </div>
        </div>

        {/* Center: Architectural Wordmark Logo & Avatar */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
          <a
            href="#hero"
            className="flex items-center gap-2 tracking-[0.2em] font-sans font-extrabold text-sm md:text-base text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors select-none"
          >
            <img
              src="/chamindu.jpg"
              alt="Chamindu Moramudali"
              className="w-5 h-5 rounded-full object-cover border border-[var(--accent-primary)]/60"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://avatars.githubusercontent.com/u/101978359?v=4';
              }}
            />
            <span className="font-mono text-[var(--accent-primary)]">[</span>
            <span>CHAMINDU</span>
            <span className="text-[var(--text-quaternary)] font-normal hidden sm:inline">MORAMUDALI</span>
            <span className="font-mono text-[var(--accent-primary)]">]</span>
          </a>
        </div>

        {/* Center Crosshair Decoration */}
        <div className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 translate-y-1/2 pointer-events-none text-[var(--crosshair-color)] font-mono text-xs select-none">
          +
        </div>

        {/* Right: Status badge & AM/PM Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 border border-[var(--border-secondary)] bg-[var(--background-secondary)] text-[10px] font-mono tracking-wider text-[var(--text-tertiary)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>OPEN FOR COMMISSIONS</span>
          </div>

          {/* Language selector */}
          <div className="hidden sm:flex items-center text-xs font-mono px-2 py-1 border border-[var(--border-secondary)] text-[var(--text-tertiary)]">
            <span className="text-[var(--text-primary)] font-medium">EN</span>
            <span className="mx-1 opacity-40">/</span>
            <span className="opacity-40">AU</span>
          </div>

          {/* AM / PM Theme Switch Button */}
          <button
            onClick={onToggleTheme}
            className="relative h-9 px-3 flex items-center justify-center font-mono text-xs font-medium border border-[var(--border-primary)] bg-[var(--background-secondary)] hover:bg-[var(--background-tertiary)] transition-colors overflow-hidden group"
            aria-label="Toggle Theme (AM / PM)"
            title={`Switch to ${theme === 'dark' ? 'AM (Light)' : 'PM (Dark)'}`}
          >
            <CornerBracket size={5} />
            <div className="flex flex-col items-center justify-center h-4 overflow-hidden">
              <span 
                className={`transition-transform duration-300 font-bold ${
                  theme === 'dark' ? 'text-[var(--accent-primary)] translate-y-0' : '-translate-y-full text-[var(--text-quaternary)]'
                }`}
              >
                PM
              </span>
              <span 
                className={`transition-transform duration-300 font-bold ${
                  theme === 'light' ? 'text-[var(--accent-primary)] -translate-y-full' : 'translate-y-0 text-[var(--text-quaternary)]'
                }`}
              >
                AM
              </span>
            </div>
          </button>
        </div>

      </div>

      {/* Global Scroll Progress Bar Line (vanlent.dev CAD progress indicator) */}
      <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[var(--border-secondary)] overflow-hidden">
        <div 
          className="h-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};
