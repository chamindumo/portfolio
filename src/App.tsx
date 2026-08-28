import React, { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { useGridMetrics } from './hooks/useGridMetrics';
import { GridBackground } from './components/ui/GridBackground';
import { CosmicStarfield } from './components/3d/CosmicStarfield';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { MenuOverlay } from './components/layout/MenuOverlay';
import { HeroSection } from './components/sections/HeroSection';
import { WorkSection } from './components/sections/WorkSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { MetricsSection } from './components/sections/MetricsSection';
import { AboutSection } from './components/sections/AboutSection';
import { FooterSection } from './components/sections/FooterSection';
import { CustomCursor } from './components/ui/CustomCursor';

export function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  useGridMetrics(); // Initializes dynamic CSS grid variables based on viewport
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = ['hero', 'work', 'services', 'metrics', 'about', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.25 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)] transition-colors duration-300 font-sans selection:bg-[#00d8ff]/20 selection:text-[#00d8ff]">
      {/* Precision CAD Custom Cursor for Desktop */}
      <CustomCursor />

      {/* 1. Deep 3D Cosmic Starfield from dungyov.com (drifts with 3D parallax & scroll warp) */}
      <CosmicStarfield isDark={isDark} />

      {/* 2. Background blueprint grid overlay */}
      <GridBackground />

      {/* 3. Top Header */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenMenu={() => setMenuOpen(true)}
        activeSection={activeSection}
      />

      {/* 5. Navigation Blueprint Drawer */}
      <MenuOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeSection={activeSection}
      />

      {/* 6. Main Content */}
      <main className="relative z-10">
        <HeroSection isDark={isDark} />
        <WorkSection />
        <ServicesSection />
        <MetricsSection />
        <AboutSection />
        <FooterSection />
      </main>

      {/* 7. Mobile Floating Action Dock */}
      <BottomNav
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenMenu={() => setMenuOpen(true)}
        activeSection={activeSection}
      />
    </div>
  );
}

export default App;
