import React from 'react';
import { CornerBracket } from '../ui/CornerBracket';
import { ThemeMode } from '../../hooks/useTheme';
import { Layers, Terminal, Sparkles, Menu, Sun, Moon } from 'lucide-react';

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
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--background-primary)]/95 backdrop-blur-lg border-t border-[var(--border-primary)] px-3 py-2 transition-colors duration-300"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        
        {/* Menu button */}
        <button
          onClick={onOpenMenu}
          className="relative h-9 px-2.5 flex items-center gap-1.5 font-mono text-xs font-bold border border-[var(--border-primary)] bg-[var(--background-secondary)] text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors cursor-pointer"
          aria-label="Open Navigation Blueprint"
        >
          <CornerBracket size={4} />
          <Menu className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
          <span>MENU</span>
        </button>

        {/* Quick section links */}
        <div className="flex items-center gap-1">
          <a
            href="#work"
            className={`px-2 py-1.5 border font-mono text-[11px] flex items-center gap-1 transition-all ${
              activeSection === 'work'
                ? 'text-[var(--accent-primary)] border-[var(--accent-primary)]/50 bg-[var(--accent-primary)]/10 font-bold'
                : 'text-[var(--text-tertiary)] border-transparent hover:text-[var(--text-primary)]'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>WORK</span>
          </a>

          <a
            href="#services"
            className={`px-2 py-1.5 border font-mono text-[11px] flex items-center gap-1 transition-all ${
              activeSection === 'services'
                ? 'text-[var(--accent-primary)] border-[var(--accent-primary)]/50 bg-[var(--accent-primary)]/10 font-bold'
                : 'text-[var(--text-tertiary)] border-transparent hover:text-[var(--text-primary)]'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>SERVICES</span>
          </a>

          <a
            href="#contact"
            className={`px-2 py-1.5 border font-mono text-[11px] flex items-center gap-1 transition-all ${
              activeSection === 'contact'
                ? 'text-[var(--accent-primary)] border-[var(--accent-primary)]/50 bg-[var(--accent-primary)]/10 font-bold'
                : 'text-[var(--text-tertiary)] border-transparent hover:text-[var(--text-primary)]'
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span>CONTACT</span>
          </a>
        </div>

        {/* AM / PM Theme Switch */}
        <button
          onClick={onToggleTheme}
          className="relative h-9 px-2.5 flex items-center gap-1.5 font-mono text-xs font-bold border border-[var(--border-primary)] bg-[var(--background-secondary)] text-[var(--text-primary)] transition-colors cursor-pointer"
          aria-label="Toggle AM/PM theme"
          title={`Switch to ${theme === 'dark' ? 'AM (Light)' : 'PM (Dark)'}`}
        >
          <CornerBracket size={4} />
          {theme === 'dark' ? (
            <>
              <Moon className="w-3 h-3 text-[var(--accent-primary)]" />
              <span className="text-[var(--accent-primary)]">PM</span>
            </>
          ) : (
            <>
              <Sun className="w-3 h-3 text-amber-500" />
              <span className="text-amber-600 dark:text-amber-400">AM</span>
            </>
          )}
        </button>

      </div>
    </nav>
  );
};
