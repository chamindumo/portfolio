import React from 'react';
import { CornerBracket } from '../ui/CornerBracket';
import { ThemeMode } from '../../hooks/useTheme';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { Menu, Sun, Moon, Radio } from 'lucide-react';

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

  const navLinks = [
    { label: 'WORK', href: '#work', id: 'work' },
    { label: 'SERVICES', href: '#services', id: 'services' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-[var(--header-height)] border-b border-[var(--border-primary)] bg-[var(--background-primary)]/90 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-[var(--grid-max-width)] mx-auto h-full px-3 md:px-6 flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity & Avatar (Anchored cleanly on the left - Zero overlap) */}
        <div className="flex items-center shrink-0">
          <a
            href="#hero"
            className="flex items-center gap-2 tracking-[0.12em] font-sans font-extrabold text-sm md:text-base text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors select-none group"
          >
            <img
              src="/chamindu.jpg"
              alt="Chamindu Moramudali"
              className="w-6 h-6 rounded-full object-cover border border-[var(--accent-primary)]/60 group-hover:scale-105 transition-transform"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://avatars.githubusercontent.com/u/101978359?v=4';
              }}
            />
            <span className="font-mono text-[var(--accent-primary)] font-bold">[</span>
            <span className="font-black text-[var(--text-primary)]">CHAMINDU</span>
            <span className="text-[var(--text-quaternary)] font-medium hidden sm:inline">MORAMUDALI</span>
            <span className="font-mono text-[var(--accent-primary)] font-bold">]</span>
          </a>
        </div>

        {/* Center: Quick Direct Navigation Links (Flex flow - Perfectly centered, never colliding) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 font-mono text-xs" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`px-2.5 py-1 transition-all border whitespace-nowrap ${
                  isActive
                    ? 'text-[var(--accent-primary)] border-[var(--accent-primary)]/40 bg-[var(--accent-primary)]/10 font-bold'
                    : 'text-[var(--text-tertiary)] border-transparent hover:text-[var(--text-primary)] hover:border-[var(--border-secondary)]'
                }`}
              >
                <span className="opacity-50 mr-1">//</span>
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Location, Status, AM/PM Toggle & Menu Drawer Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Location Badge (Colombo, Sri Lanka) */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 border border-[var(--border-secondary)] bg-[var(--background-secondary)] text-[11px] font-mono text-[var(--text-tertiary)]">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span className="text-[var(--text-primary)] font-medium">COLOMBO</span>
            <span className="text-[var(--accent-primary)] font-bold">LK</span>
          </div>

          {/* Status Badge */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 border border-[var(--border-secondary)] bg-[var(--background-secondary)] text-[11px] font-mono text-[var(--text-tertiary)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-semibold text-emerald-400">AVAILABLE</span>
          </div>

          {/* Crystal-Clear AM / PM Theme Switch Button */}
          <button
            onClick={onToggleTheme}
            className="relative h-9 px-2.5 sm:px-3 flex items-center gap-1.5 sm:gap-2 font-mono text-xs font-bold border border-[var(--border-primary)] bg-[var(--background-secondary)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-all cursor-pointer select-none group"
            aria-label={`Toggle Theme (Current: ${theme === 'dark' ? 'PM Dark' : 'AM Light'})`}
            title={`Switch to ${theme === 'dark' ? 'AM (Light Mode)' : 'PM (Dark Mode)'}`}
          >
            <CornerBracket size={5} />
            
            {theme === 'dark' ? (
              <>
                <Moon className="w-3.5 h-3.5 text-[var(--accent-primary)] group-hover:-rotate-12 transition-transform" />
                <span className="text-[var(--accent-primary)] tracking-wider">PM</span>
                <span className="hidden md:inline text-[10px] text-[var(--text-quaternary)] font-normal">// NIGHT</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-45 transition-transform" />
                <span className="text-amber-600 dark:text-amber-400 tracking-wider">AM</span>
                <span className="hidden md:inline text-[10px] text-[var(--text-quaternary)] font-normal">// DAY</span>
              </>
            )}
          </button>

          {/* Menu Drawer Button [ MENU ] */}
          <button
            onClick={onOpenMenu}
            className="relative h-9 px-2.5 sm:px-3 flex items-center gap-1.5 sm:gap-2 font-mono text-xs font-bold tracking-wider text-[var(--text-primary)] hover:text-[var(--accent-primary)] bg-[var(--background-secondary)] hover:bg-[var(--background-tertiary)] transition-all border border-[var(--border-primary)] group cursor-pointer"
            aria-label="Open Navigation Blueprint"
          >
            <CornerBracket size={5} />
            <Menu className="w-3.5 h-3.5 text-[var(--accent-primary)] group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-semibold">MENU</span>
          </button>
        </div>

      </div>

      {/* Global Scroll Progress Bar Line (CAD architectural tracker) */}
      <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[var(--border-secondary)] overflow-hidden">
        <div 
          className="h-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};
