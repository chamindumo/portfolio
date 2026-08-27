import React, { useState } from 'react';
import { CornerBracket } from '../ui/CornerBracket';
import { ScrollReveal } from '../ui/ScrollReveal';
import { featuredProjects } from '../../data/portfolioData';
import { ExternalLink, Github, Monitor, Smartphone, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export const WorkSection: React.FC = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeDesktopScreen, setActiveDesktopScreen] = useState(0);
  const [activeMobileScreen, setActiveMobileScreen] = useState(0);

  const project = featuredProjects[activeProjectIndex];

  const handleNextProject = () => {
    setActiveProjectIndex((prev) => (prev + 1) % featuredProjects.length);
    setActiveDesktopScreen(0);
    setActiveMobileScreen(0);
  };

  const handlePrevProject = () => {
    setActiveProjectIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
    setActiveDesktopScreen(0);
    setActiveMobileScreen(0);
  };

  return (
    <section
      id="work"
      className="relative py-20 px-4 md:px-8 border-b border-[var(--border-primary)]"
    >
      <div className="max-w-[var(--grid-max-width)] mx-auto w-full">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50} duration={0.6}>
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[var(--border-secondary)] gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-primary)] font-bold tracking-widest uppercase">
                <span>02 . </span>
                <span>SELECTED WORK</span>
              </div>
              <h2 className="font-sans font-extrabold text-3xl md:text-5xl text-[var(--text-primary)] mt-1 tracking-tight">
                Production Code &amp; Systems
              </h2>
            </div>

            {/* Project Carousel Controls */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-[var(--text-tertiary)] mr-2">
                PROJECT {project.number} / {String(featuredProjects.length).padStart(2, '0')}
              </span>
              <button
                onClick={handlePrevProject}
                className="p-2 border border-[var(--border-primary)] bg-[var(--background-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors relative"
                aria-label="Previous project"
              >
                <CornerBracket size={4} />
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextProject}
                className="p-2 border border-[var(--border-primary)] bg-[var(--background-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors relative"
                aria-label="Next project"
              >
                <CornerBracket size={4} />
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Interactive Showcase Grid: Dual Mockups & Specifications */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (7 cols): Desktop & Mobile Mockup Frames */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Desktop Mockup Frame with Scroll Reveal */}
            <ScrollReveal direction="up" delay={150} duration={0.7}>
              <div className="relative border border-[var(--border-primary)] bg-[var(--background-tertiary)] rounded-md overflow-hidden shadow-2xl corner-bracket-container">
                <CornerBracket size={8} />

                {/* Desktop Browser Top Bar */}
                <div className="h-8 bg-[var(--background-primary)] border-b border-[var(--border-primary)] px-3 flex items-center justify-between font-mono text-[10px] text-[var(--text-quaternary)]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-2 font-mono hidden sm:inline text-[var(--text-tertiary)]">
                      https://{project.id}.systems/preview
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Monitor className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>DESKTOP VIEW</span>
                  </div>
                </div>

                {/* Desktop Screen Viewport */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                  <img
                    src={project.desktopScreenshots[activeDesktopScreen]?.url}
                    alt={project.desktopScreenshots[activeDesktopScreen]?.title}
                    className="w-full h-full object-cover object-top transition-all duration-500 hover:scale-[1.02]"
                  />
                  
                  {/* Overlay Caption Bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-[var(--background-primary)]/85 backdrop-blur-sm border-t border-[var(--border-secondary)] px-3 py-1.5 font-mono text-[11px] text-[var(--text-secondary)] flex items-center justify-between">
                    <span>{project.desktopScreenshots[activeDesktopScreen]?.caption}</span>
                    <span className="text-[var(--text-quaternary)]">
                      {activeDesktopScreen + 1} / {project.desktopScreenshots.length}
                    </span>
                  </div>
                </div>

                {/* Desktop Thumbnail Gallery Selector (Matches vanlent.dev) */}
                <div className="p-2.5 bg-[var(--background-primary)] border-t border-[var(--border-secondary)] flex gap-2 overflow-x-auto">
                  {project.desktopScreenshots.map((screen, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveDesktopScreen(idx)}
                      className={`relative flex-1 min-w-[70px] max-w-[120px] aspect-[16/10] border rounded overflow-hidden transition-all ${
                        activeDesktopScreen === idx
                          ? 'border-[var(--accent-primary)] ring-1 ring-[var(--accent-primary)] opacity-100'
                          : 'border-[var(--border-secondary)] opacity-50 hover:opacity-90'
                      }`}
                    >
                      <img src={screen.url} alt={screen.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Mobile Viewport Preview + Live Metrics Strip */}
            <ScrollReveal direction="up" delay={250} duration={0.7}>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                
                {/* Mobile Phone Mockup (4 cols) */}
                <div className="sm:col-span-5 relative border border-[var(--border-primary)] bg-[var(--background-tertiary)] rounded-2xl overflow-hidden shadow-xl p-1.5 max-w-[220px] mx-auto w-full">
                  <CornerBracket size={6} />
                  <div className="rounded-xl overflow-hidden border border-[var(--border-secondary)]">
                    {/* Phone Speaker Notch */}
                    <div className="h-4 bg-[var(--background-primary)] flex items-center justify-center">
                      <span className="w-10 h-1 bg-[var(--border-primary)] rounded-full" />
                    </div>
                    
                    {/* Mobile Screen */}
                    <div className="aspect-[9/16] w-full overflow-hidden bg-black">
                      <img
                        src={project.mobileScreenshots[activeMobileScreen]?.url}
                        alt="Mobile Preview"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* Mobile Thumbnail Switcher */}
                    <div className="p-1 bg-[var(--background-primary)] flex gap-1 justify-center">
                      {project.mobileScreenshots.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveMobileScreen(idx)}
                          className={`h-1.5 rounded-full transition-all ${
                            activeMobileScreen === idx ? 'w-4 bg-[var(--accent-primary)]' : 'w-1.5 bg-[var(--border-primary)]'
                          }`}
                          aria-label={`Show mobile screen ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Project Metrics Card (7 cols) */}
                <div className="sm:col-span-7 flex flex-col gap-3">
                  <div className="p-4 border border-[var(--border-primary)] bg-[var(--background-secondary)] relative corner-bracket-container">
                    <CornerBracket size={6} />
                    <div className="font-mono text-[10px] text-[var(--accent-primary)] uppercase tracking-wider mb-2 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>SYSTEM TELEMETRY</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="flex items-center justify-between border-b border-[var(--border-secondary)] pb-1.5 last:border-b-0">
                          <span className="font-mono text-xs text-[var(--text-tertiary)]">{m.label}</span>
                          <span className="font-mono text-xs font-bold text-[var(--text-primary)] px-2 py-0.5 border border-[var(--border-secondary)] bg-[var(--background-tertiary)]">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct Action Buttons */}
                  <div className="flex items-center gap-3 font-mono text-xs">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 border border-[var(--border-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-white transition-all flex items-center justify-center gap-1.5 relative group font-bold"
                      >
                        <CornerBracket size={4} />
                        <span>INITIALIZE DEMO</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 border border-[var(--border-primary)] bg-[var(--background-secondary)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent-primary)] transition-all flex items-center gap-1.5 relative group"
                      >
                        <CornerBracket size={4} />
                        <Github className="w-3.5 h-3.5" />
                        <span>SOURCE</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </ScrollReveal>

          </div>

          {/* Right Column (5 cols): Project Architectural Dossier with Scroll Reveal */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Main Project Card */}
            <ScrollReveal direction="left" delay={200} duration={0.7}>
              <div className="border border-[var(--border-primary)] bg-[var(--background-secondary)] p-6 relative corner-bracket-container">
                <CornerBracket size={8} />

                <div className="flex items-center justify-between font-mono text-xs text-[var(--text-quaternary)] pb-4 border-b border-[var(--border-secondary)]">
                  <span>CAT // {project.category.toUpperCase()}</span>
                  <span>YEAR // {project.year}</span>
                </div>

                <h3 className="font-sans font-black text-2xl md:text-3xl text-[var(--text-primary)] mt-4 tracking-tight">
                  {project.title}
                </h3>

                <p className="font-mono text-xs text-[var(--accent-primary)] mt-1 font-semibold">
                  {project.subtitle}
                </p>

                <p className="font-sans text-sm text-[var(--text-secondary)] mt-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies Matrix (Matches vanlent.dev logo masks) */}
                <div className="mt-6 pt-4 border-t border-[var(--border-secondary)]">
                  <div className="font-mono text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-3">
                    // TECHNOLOGICAL STACK
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-mono border border-[var(--border-secondary)] bg-[var(--background-tertiary)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-white transition-colors cursor-default"
                        style={{ borderLeftColor: tech.color, borderLeftWidth: '3px' }}
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </ScrollReveal>

            {/* Quick Project Switcher Tabs */}
            <ScrollReveal direction="left" delay={300} duration={0.7}>
              <div className="border border-[var(--border-primary)] bg-[var(--background-secondary)] p-4 relative corner-bracket-container">
                <CornerBracket size={6} />
                
                <div className="font-mono text-[10px] text-[var(--text-quaternary)] uppercase tracking-widest mb-3">
                  // ARCHIVE INDEX
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {featuredProjects.map((item, idx) => {
                    const isCurrent = idx === activeProjectIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveProjectIndex(idx);
                          setActiveDesktopScreen(0);
                          setActiveMobileScreen(0);
                        }}
                        className={`text-left p-2.5 border font-mono text-xs transition-all flex items-center justify-between ${
                          isCurrent
                            ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--text-primary)] font-bold'
                            : 'border-transparent text-[var(--text-tertiary)] hover:bg-[var(--background-tertiary)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[var(--accent-primary)] font-bold">{item.number}</span>
                          <span>{item.title}</span>
                        </div>
                        <span className="text-[10px] opacity-50">{item.year}</span>
                      </button>
                    );
                  })}
                </div>

              </div>
            </ScrollReveal>

          </div>

        </div>

      </div>
    </section>
  );
};
