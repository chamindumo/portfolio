import React from 'react';
import { CornerBracket } from '../ui/CornerBracket';
import { ThemeMode } from '../../hooks/useTheme';
import { Layers, Terminal, Sparkles } from 'lucide-react';

interface BottomNavProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenMenu: () => void;
  activeSection: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  theme,
  onToggleTheme,
  onOpenMenu,
  activeSection,
}) => {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--background-primary)]/90 backdrop-blur-lg border-t border-[var(--border-primary)] px-3 py-2"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        
        {/* Menu [ M ] button */}
        <button
          onClick={onOpenMenu}
          className="relative h-10 w-10 flex items-center justify-center font-mono text-sm font-bold border border-[var(--border-primary)] bg-[var(--background-secondary)] text-[var(--text-primary)]"
          aria-label="Open Navigation"
        >
          <CornerBracket size={5} />
          <span>M</span>
        </button>

        {/* Quick section links */}
        <div className="flex items-center gap-1">
          <a
            href="#work"
            className={`p-2 border border-transparent font-mono text-xs flex items-center gap-1.5 transition-colors ${
              activeSection === 'work'
                ? 'text-[var(--accent-primary)] border-[var(--border-primary)] bg-[var(--background-secondary)]'
                : 'text-[var(--text-tertiary)]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>WORK</span>
          </a>

          <a
            href="#services"
            className={`p-2 border border-transparent font-mono text-xs flex items-center gap-1.5 transition-colors ${
              activeSection === 'services'
                ? 'text-[var(--accent-primary)] border-[var(--border-primary)] bg-[var(--background-secondary)]'
                : 'text-[var(--text-tertiary)]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>SERVICES</span>
          </a>

          <a
            href="#contact"
            className={`p-2 border border-transparent font-mono text-xs flex items-center gap-1.5 transition-colors ${
              activeSection === 'contact'
                ? 'text-[var(--accent-primary)] border-[var(--border-primary)] bg-[var(--background-secondary)]'
                : 'text-[var(--text-tertiary)]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>CONTACT</span>
          </a>
        </div>

        {/* AM / PM Theme Switch */}
        <button
          onClick={onToggleTheme}
          className="relative h-10 px-3 flex items-center justify-center font-mono text-xs font-bold border border-[var(--border-primary)] bg-[var(--background-secondary)] text-[var(--accent-primary)]"
          aria-label="Toggle AM/PM theme"
        >
          <CornerBracket size={5} />
          <span>{theme === 'dark' ? 'PM' : 'AM'}</span>
        </button>

      </div>
    </nav>
  );
};
