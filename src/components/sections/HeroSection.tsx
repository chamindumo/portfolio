import React from 'react';
import { CornerBracket } from '../ui/CornerBracket';
import { RealSpaceRocket } from '../3d/RealSpaceRocket';
import { ScrollReveal } from '../ui/ScrollReveal';
import { profileData } from '../../data/portfolioData';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { ArrowDown, Radio, Activity } from 'lucide-react';

interface HeroSectionProps {
  isDark: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isDark }) => {
  const { scrollY } = useScrollProgress();

  // Parallax offset for display words on scroll
  const parallaxOffset = Math.min(scrollY * 0.15, 60);

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex flex-col justify-between pt-[var(--header-height)] pb-12 px-4 md:px-8 border-b border-[var(--border-primary)] overflow-hidden"
    >
      {/* Top Quadrant Markers (vanlent.dev style) */}
      <ScrollReveal direction="down" delay={100} duration={0.6}>
        <div className="max-w-[var(--grid-max-width)] mx-auto w-full pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Top-Left: Identity & Discipline with Operator Avatar */}
          <div className="flex items-start gap-3.5">
            <div className="relative p-0.5 border border-[var(--border-primary)] bg-[var(--background-tertiary)] shrink-0 corner-bracket-container">
              <CornerBracket size={4} />
              <img
                src={profileData.avatarUrl}
                alt={profileData.name}
                className="w-9 h-9 object-cover transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://avatars.githubusercontent.com/u/101978359?v=4';
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-primary)] font-bold tracking-widest">
                <span>01 . </span>
                <span>SOFTWARE ENGINEER // REACT, REACT NATIVE &amp; AI FORENSICS</span>
              </div>
              <p className="font-mono text-xs text-[var(--text-tertiary)] max-w-md">
                {profileData.tagline}
              </p>
            </div>
          </div>

          {/* Top-Right: Coordinates & Telemetry */}
          <div className="flex flex-col md:items-end gap-1 font-mono text-xs text-[var(--text-tertiary)]">
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span className="text-[var(--text-primary)] font-medium">LOC: {profileData.location}</span>
            </div>
            <div className="opacity-60 text-[11px]">COORD: {profileData.coordinates}</div>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Centerpiece: Split Typographic Wordmark & REAL 3D SPACE ROCKET */}
      <div className="max-w-[var(--grid-max-width)] mx-auto w-full my-auto py-4 relative flex items-center justify-center">
        
        {/* Large Background Wordmark Framing */}
        <div className="w-full flex items-center justify-between pointer-events-none select-none px-2 sm:px-4 md:px-6">
          
          {/* Left Hero Word */}
          <div 
            className="hidden md:flex flex-col text-left transition-transform duration-100 ease-out shrink-0"
            style={{ transform: `translateY(${-parallaxOffset}px)` }}
          >
            <span className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tighter text-[var(--text-primary)] leading-none opacity-95 whitespace-nowrap">
              CHAMINDU
            </span>
            <span className="font-mono text-[11px] lg:text-xs tracking-[0.25em] text-[var(--text-quaternary)] mt-2">
              // ARCHITECTURE &amp; CODE
            </span>
          </div>

          {/* Real 3D Space Rocket Viewport Centerpiece */}
          <div className="relative w-[260px] sm:w-[300px] md:w-[360px] lg:w-[400px] h-[380px] sm:h-[440px] md:h-[480px] mx-2 sm:mx-4 md:mx-6 shrink-0 z-10 flex items-center justify-center pointer-events-auto">
            {/* Subtle Blueprint Grid Crosshairs & Architectural Glass Framing */}
            <div className="absolute inset-1 pointer-events-none bg-[var(--background-secondary)]/70 dark:bg-white/[0.02] border border-[var(--border-primary)]/70 backdrop-blur-xs shadow-[0_8px_30px_rgba(2,132,199,0.06)] dark:shadow-none transition-all">
              <CornerBracket size={8} />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--crosshair-color)] font-mono text-xs select-none">
                +
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[var(--crosshair-color)] font-mono text-xs select-none">
                +
              </div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 text-[var(--crosshair-color)] font-mono text-xs select-none">
                +
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-[var(--crosshair-color)] font-mono text-xs select-none">
                +
              </div>
            </div>

            {/* Real 3D Space Rocket Scene */}
            <RealSpaceRocket isDark={isDark} />
          </div>

          {/* Right Hero Word */}
          <div 
            className="hidden md:flex flex-col text-right items-end transition-transform duration-100 ease-out shrink-0"
            style={{ transform: `translateY(${parallaxOffset}px)` }}
          >
            <span className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tighter text-[var(--text-primary)] leading-none opacity-95 whitespace-nowrap">
              ENGINEER
            </span>
            <span className="font-mono text-[11px] lg:text-xs tracking-[0.25em] text-[var(--text-quaternary)] mt-2">
              FULL-STACK SYSTEMS //
            </span>
          </div>
        </div>

        {/* Mobile Name Heading fallback */}
        <div className="md:hidden text-center mt-2">
          <h1 className="font-sans font-black text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)]">
            CHAMINDU MORAMUDALI
          </h1>
          <p className="font-mono text-xs text-[var(--accent-primary)] mt-0.5 tracking-wider uppercase">
            React, React Native &amp; AI Forensics
          </p>
        </div>

      </div>

      {/* Bottom Quadrants & Technical Telemetry Ticker */}
      <ScrollReveal direction="up" delay={200} duration={0.6}>
        <div className="max-w-[var(--grid-max-width)] mx-auto w-full pt-6 border-t border-[var(--border-secondary)] flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
          
          {/* Bottom Left: Availability Ticker */}
          <div className="flex items-center gap-3 text-[var(--text-tertiary)]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-primary)]"></span>
            </span>
            <span className="text-[var(--text-primary)] font-semibold">
              {profileData.availability}
            </span>
          </div>

          {/* Center: Scroll Down CAD Prompt */}
          <a
            href="#work"
            className="flex items-center gap-2 px-3 py-1.5 border border-[var(--border-primary)] bg-[var(--background-secondary)] text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-colors group"
          >
            <CornerBracket size={4} />
            <span>INITIALIZE ARCHIVE</span>
            <ArrowDown className="w-3.5 h-3.5 text-[var(--accent-primary)] group-hover:translate-y-0.5 transition-transform" />
          </a>

          {/* Bottom Right: Academic & Institutional Credential */}
          <div className="hidden lg:flex items-center gap-2 text-[var(--text-quaternary)]">
            <Activity className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span>{profileData.university} // COMPUTER SCIENCE</span>
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
};
