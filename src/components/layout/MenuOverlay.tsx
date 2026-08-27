import React, { useEffect } from 'react';
import { CornerBracket } from '../ui/CornerBracket';
import { profileData } from '../../data/portfolioData';
import { useLocalTime } from '../../hooks/useLocalTime';
import { X, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

const navItems = [
  { id: 'hero', number: '01', label: 'OVERVIEW // HERO', desc: 'Introduction & Interactive 3D Canvas' },
  { id: 'work', number: '02', label: 'SELECTED WORK', desc: 'Featured full-stack applications & mockups' },
  { id: 'services', number: '03', label: 'SERVICES', desc: 'Architecture, development & performance' },
  { id: 'metrics', number: '04', label: 'TELEMETRY', desc: 'Core Web Vitals & performance benchmarks' },
  { id: 'about', number: '05', label: 'ABOUT // DOSSIER', desc: 'Background, education & technical skills' },
  { id: 'contact', number: '06', label: 'TRANSMIT MESSAGE', desc: 'Inquiries, contracts & contact form' },
];

export const MenuOverlay: React.FC<MenuOverlayProps> = ({
  isOpen,
  onClose,
  activeSection,
}) => {
  const times = useLocalTime();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNavClick = (id: string) => {
    onClose();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[var(--background-primary)]/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8 lg:p-12 overflow-y-auto animate-in fade-in duration-200">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-[var(--border-primary)] pb-4 max-w-6xl w-full mx-auto">
        <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-tertiary)]">
          <img
            src={profileData.avatarUrl}
            alt={profileData.name}
            className="w-7 h-7 rounded-full object-cover border border-[var(--accent-primary)]/80"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://avatars.githubusercontent.com/u/101978359?v=4';
            }}
          />
          <span className="text-[var(--accent-primary)] font-bold">SYSTEM // NAVIGATION</span>
          <span className="hidden sm:inline opacity-30">|</span>
          <span className="hidden sm:inline">{profileData.coordinates}</span>
        </div>

        {/* Close Button [ X ] */}
        <button
          onClick={onClose}
          className="relative h-10 px-4 flex items-center justify-center font-mono text-xs font-semibold border border-[var(--border-primary)] bg-[var(--background-secondary)] hover:bg-[var(--background-tertiary)] text-[var(--text-primary)] transition-all group"
          aria-label="Close menu"
        >
          <CornerBracket size={5} />
          <div className="flex items-center gap-2">
            <X className="w-4 h-4 text-[var(--accent-primary)] group-hover:rotate-90 transition-transform" />
            <span>CLOSE [ESC]</span>
          </div>
        </button>
      </div>

      {/* Main navigation links */}
      <div className="max-w-6xl w-full mx-auto my-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative text-left p-4 md:p-6 border transition-all duration-200 group ${
                  isActive
                    ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10'
                    : 'border-[var(--border-primary)] bg-[var(--background-secondary)] hover:border-[var(--accent-primary)]/60 hover:bg-[var(--background-tertiary)]'
                }`}
              >
                <CornerBracket size={6} />
                
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs text-[var(--accent-primary)] font-bold">
                    {item.number}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--text-quaternary)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <div className="font-sans font-bold text-lg md:text-2xl text-[var(--text-primary)] tracking-wide group-hover:text-[var(--accent-primary)] transition-colors">
                  {item.label}
                </div>

                <div className="font-mono text-xs text-[var(--text-tertiary)] mt-1.5 line-clamp-1">
                  {item.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom status dossier */}
      <div className="max-w-6xl w-full mx-auto border-t border-[var(--border-primary)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--text-tertiary)]">
        {/* Local time tickers */}
        <div className="flex items-center gap-6">
          <div>
            <span className="opacity-50">COLOMBO (UTC+5:30):</span>{' '}
            <span className="text-[var(--text-primary)] font-semibold font-tabular">
              {times.colombo || '--:--:--'}
            </span>
          </div>
          <div>
            <span className="opacity-50">LONDON (UTC+0):</span>{' '}
            <span className="text-[var(--text-primary)] font-semibold font-tabular">
              {times.london || '--:--:--'}
            </span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={profileData.socials[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[var(--accent-primary)] transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GITHUB</span>
          </a>
          <a
            href={profileData.socials[1].url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[var(--accent-primary)] transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LINKEDIN</span>
          </a>
          <a
            href={profileData.socials[2].url}
            className="flex items-center gap-1 hover:text-[var(--accent-primary)] transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>EMAIL</span>
          </a>
        </div>
      </div>
    </div>
  );
};
