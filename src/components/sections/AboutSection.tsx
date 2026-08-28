import React, { useState } from 'react';
import { CornerBracket } from '../ui/CornerBracket';
import { ScrollReveal } from '../ui/ScrollReveal';
import { profileData, skillsData } from '../../data/portfolioData';
import { GraduationCap, Code2, Terminal, Cpu, Download, Github, Linkedin, ExternalLink } from 'lucide-react';

type SkillCategory = 'all' | 'frontend' | 'backend' | 'cloud' | 'core';

export const AboutSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('all');

  const filteredSkills = skillsData.filter(
    (s) => selectedCategory === 'all' || s.category === selectedCategory
  );

  return (
    <section
      id="about"
      className="relative py-20 px-4 md:px-8 border-b border-[var(--border-primary)]"
    >
      <div className="max-w-[var(--grid-max-width)] mx-auto w-full">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50} duration={0.6}>
          <div className="pb-8 border-b border-[var(--border-secondary)]">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-primary)] font-bold tracking-widest uppercase">
              <span>05 . </span>
              <span>ENGINEERING DOSSIER</span>
            </div>
            <h2 className="font-sans font-extrabold text-3xl md:text-5xl text-[var(--text-primary)] mt-1 tracking-tight">
              Background, Mindset &amp; Skills
            </h2>
            <p className="font-mono text-xs text-[var(--text-tertiary)] mt-2 max-w-xl">
              A balance of algorithmic discipline, modern web technologies, and human-centered design principles.
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Grid: Biography & Technical Skills Matrix */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 cols): Photo Dossier, Bio & Academic Credentials */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* CAD Operator Portrait Card (vanlent.dev style) */}
            <ScrollReveal direction="right" delay={100} duration={0.7}>
              <div className="border border-[var(--border-primary)] bg-[var(--background-secondary)] p-4 relative corner-bracket-container overflow-hidden group">
                <CornerBracket size={8} />

                {/* Top Blueprint Header */}
                <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-quaternary)] pb-2.5 mb-3 border-b border-[var(--border-secondary)]">
                  <span>FIGURE 01 // OPERATOR IDENTIFICATION</span>
                  <span className="text-[var(--accent-primary)] font-bold">ACTIVE // VERIFIED</span>
                </div>

                {/* Image Frame with Corner CAD brackets and scanline effect */}
                <div className="relative aspect-[4/4.5] sm:aspect-[4/4] w-full overflow-hidden border border-[var(--border-primary)] bg-[var(--background-tertiary)] group">
                  <CornerBracket size={6} />
                  
                  <img
                    src={profileData.avatarUrl}
                    alt={profileData.name}
                    className="w-full h-full object-cover object-[center_20%] transition-all duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://avatars.githubusercontent.com/u/101978359?v=4';
                    }}
                  />

                  {/* CAD Crosshairs on image */}
                  <div className="absolute top-2 left-2 text-[var(--crosshair-color)] font-mono text-xs pointer-events-none">+</div>
                  <div className="absolute top-2 right-2 text-[var(--crosshair-color)] font-mono text-xs pointer-events-none">+</div>
                  <div className="absolute bottom-2 left-2 text-[var(--crosshair-color)] font-mono text-xs pointer-events-none">+</div>
                  <div className="absolute bottom-2 right-2 text-[var(--crosshair-color)] font-mono text-xs pointer-events-none">+</div>

                  {/* Bottom Image Overlay Tag */}
                  <div className="absolute bottom-0 inset-x-0 bg-[var(--background-primary)]/85 backdrop-blur-sm border-t border-[var(--border-secondary)] px-3 py-1.5 font-mono text-[11px] text-[var(--text-secondary)] flex items-center justify-between">
                    <span className="font-semibold text-[var(--text-primary)]">{profileData.name}</span>
                    <span className="text-[10px] text-[var(--accent-primary)] font-bold">MSc CYBER SECURITY &amp; FORENSICS</span>
                  </div>
                </div>

                {/* Direct Social Links Under Portrait */}
                <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-xs">
                  <a
                    href={profileData.socials[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-[var(--border-primary)] bg-[var(--background-tertiary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>{profileData.socials[0].handle}</span>
                  </a>

                  <a
                    href={profileData.socials[1].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-[var(--border-primary)] bg-[var(--background-tertiary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LINKEDIN</span>
                  </a>
                </div>

              </div>
            </ScrollReveal>

            {/* Biography Card */}
            <ScrollReveal direction="right" delay={180} duration={0.7}>
              <div className="border border-[var(--border-primary)] bg-[var(--background-secondary)] p-6 relative corner-bracket-container">
                <CornerBracket size={8} />

                <div className="flex items-center justify-between font-mono text-xs text-[var(--text-quaternary)] pb-4 border-b border-[var(--border-secondary)]">
                  <span>IDENTITY // {profileData.name.toUpperCase()}</span>
                  <span>STATUS // ENROLLED &amp; ACTIVE</span>
                </div>

                <div className="space-y-4 mt-6 font-sans text-sm text-[var(--text-secondary)] leading-relaxed">
                  {profileData.bioParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                {/* Education Module */}
                <div className="mt-8 pt-6 border-t border-[var(--border-secondary)] flex items-start gap-4">
                  <div className="p-3 border border-[var(--border-primary)] bg-[var(--background-tertiary)] text-[var(--accent-primary)]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-[var(--accent-primary)] uppercase tracking-wider font-bold">
                      ACADEMIC INSTITUTION
                    </div>
                    <div className="font-sans font-bold text-base text-[var(--text-primary)] mt-0.5">
                      {profileData.university}
                    </div>
                    <div className="font-mono text-xs text-[var(--text-tertiary)] mt-0.5">
                      {profileData.degree}
                    </div>
                  </div>
                </div>

                {/* Resume / Contact Button */}
                <div className="mt-6 pt-6 border-t border-[var(--border-secondary)]">
                  <a
                    href="#contact"
                    className="w-full py-2.5 px-4 border border-[var(--border-primary)] bg-[var(--background-tertiary)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] font-mono text-xs font-semibold transition-all flex items-center justify-center gap-2 relative group"
                  >
                    <CornerBracket size={4} />
                    <Download className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>REQUEST CURRICULUM VITAE</span>
                  </a>
                </div>

              </div>
            </ScrollReveal>

            {/* Quick Core Principles Card */}
            <ScrollReveal direction="right" delay={250} duration={0.7}>
              <div className="border border-[var(--border-primary)] bg-[var(--background-secondary)] p-5 relative corner-bracket-container">
                <CornerBracket size={6} />
                
                <div className="font-mono text-[11px] text-[var(--text-quaternary)] uppercase tracking-wider mb-3">
                  // ENGINEERING PRINCIPLES
                </div>

                <ul className="space-y-2 font-mono text-xs text-[var(--text-secondary)]">
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--accent-primary)] font-bold">01.</span>
                    <span>Zero bloat: minimize bundle payloads and runtime overhead.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--accent-primary)] font-bold">02.</span>
                    <span>End-to-end type safety across backend and frontend contracts.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--accent-primary)] font-bold">03.</span>
                    <span>Architectural resilience: gracefully handle network degradation.</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

          </div>

          {/* Right Column (7 cols): Interactive Technical Skills Matrix */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            <ScrollReveal direction="left" delay={200} duration={0.7}>
              <div className="border border-[var(--border-primary)] bg-[var(--background-secondary)] p-6 relative corner-bracket-container">
                <CornerBracket size={8} />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--border-secondary)] gap-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-primary)] font-bold">
                    <Code2 className="w-4 h-4 text-[var(--accent-primary)]" />
                    <span>TECHNICAL CAPABILITIES MATRIX</span>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex flex-wrap gap-1 font-mono text-[10px]">
                    {(['all', 'frontend', 'backend', 'cloud', 'core'] as SkillCategory[]).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2.5 py-1 uppercase transition-all ${
                          selectedCategory === cat
                            ? 'border border-[var(--accent-primary)] bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] font-bold'
                            : 'border border-[var(--border-secondary)] bg-[var(--background-tertiary)] text-[var(--text-tertiary)] hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredSkills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="p-3 border border-[var(--border-primary)] bg-[var(--background-tertiary)] flex items-center justify-between group hover:border-[var(--accent-primary)] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-[var(--accent-primary)] opacity-70 group-hover:opacity-100" />
                        <span className="font-sans text-xs font-semibold text-[var(--text-primary)]">
                          {skill.name}
                        </span>
                      </div>

                      <span className="font-mono text-[10px] uppercase px-2 py-0.5 border border-[var(--border-secondary)] bg-[var(--background-primary)] text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)]">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Architecture Blueprint Footnote */}
                <div className="mt-6 pt-4 border-t border-[var(--border-secondary)] flex items-center justify-between font-mono text-[10px] text-[var(--text-quaternary)]">
                  <span>PARADIGM: DISTRIBUTED &amp; COMPOSABLE</span>
                  <span>TOTAL SKILLS CATALOGED: {skillsData.length}</span>
                </div>

              </div>
            </ScrollReveal>

            {/* Workflow Milestones Blueprint */}
            <ScrollReveal direction="left" delay={300} duration={0.7}>
              <div className="border border-[var(--border-primary)] bg-[var(--background-secondary)] p-6 relative corner-bracket-container">
                <CornerBracket size={6} />
                
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-quaternary)] uppercase tracking-wider mb-4">
                  <Cpu className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                  <span>// ENGINEERING TIMELINE</span>
                </div>

                <div className="space-y-5 border-l border-[var(--border-primary)] ml-2 pl-4 font-mono text-xs">
                  {/* Master's Degree (Current / In Progress) */}
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse -ml-[21px]" />
                      <span className="text-emerald-400 font-bold tracking-wider text-[11px]">2024 — PRESENT // READING</span>
                    </div>
                    <div className="font-sans font-bold text-sm text-[var(--text-primary)] mt-1">
                      MSc in Cyber Security &amp; Digital Forensics
                    </div>
                    <p className="text-[var(--text-tertiary)] font-sans text-xs mt-1 leading-relaxed">
                      Advanced post-graduate specialization in digital media forensics, steganography payload detection, Multi-Task &amp; Transfer Learning for cyber defense (Cybervali), and cryptographic vulnerability analysis.
                    </p>
                  </div>

                  {/* Bachelor's Degree (Completed / Graduated) */}
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] -ml-[21px]" />
                      <span className="text-[var(--accent-primary)] font-bold tracking-wider text-[11px]">GRADUATED // COMPLETED</span>
                    </div>
                    <div className="font-sans font-bold text-sm text-[var(--text-primary)] mt-1">
                      BEng (Hons) in Software Engineering // IIT &amp; University of Westminster (UK)
                    </div>
                    <p className="text-[var(--text-tertiary)] font-sans text-xs mt-1 leading-relaxed">
                      Informatics Institute of Technology (IIT) Sri Lanka in partnership with the University of Westminster (UK). Core foundations in software architecture, distributed systems, algorithms, and full-stack engineering.
                    </p>
                  </div>

                  {/* Professional Experience */}
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--text-quaternary)] -ml-[21px]" />
                      <span className="text-[var(--text-quaternary)] font-bold tracking-wider text-[11px]">2023 — PRESENT</span>
                    </div>
                    <div className="font-sans font-bold text-sm text-[var(--text-primary)] mt-1">
                      Software Engineer // React, React Native &amp; Automation
                    </div>
                    <p className="text-[var(--text-tertiary)] font-sans text-xs mt-1 leading-relaxed">
                      Engineering production web applications with React &amp; TypeScript, cross-platform mobile apps with React Native, and autonomous enterprise webhook pipelines using n8n.
                    </p>
                  </div>
                </div>

              </div>
            </ScrollReveal>

          </div>

        </div>

      </div>
    </section>
  );
};
