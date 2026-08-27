import React from 'react';
import { CornerBracket } from '../ui/CornerBracket';
import { ScrollReveal } from '../ui/ScrollReveal';
import { servicesData } from '../../data/portfolioData';
import { Layers, Server, Palette, Gauge, Check } from 'lucide-react';

const icons = [Layers, Server, Palette, Gauge];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative py-20 px-4 md:px-8 border-b border-[var(--border-primary)]"
    >
      <div className="max-w-[var(--grid-max-width)] mx-auto w-full">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50} duration={0.6}>
          <div className="pb-8 border-b border-[var(--border-secondary)]">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-primary)] font-bold tracking-widest uppercase">
              <span>03 . </span>
              <span>CAPABILITIES &amp; SERVICES</span>
            </div>
            <h2 className="font-sans font-extrabold text-3xl md:text-5xl text-[var(--text-primary)] mt-1 tracking-tight">
              Code, Performance, and Architecture
            </h2>
            <p className="font-mono text-xs text-[var(--text-tertiary)] mt-2 max-w-xl">
              Built from scratch with zero boilerplate. Tailor-made web solutions designed for high reliability, maximum speed, and intuitive user ergonomics.
            </p>
          </div>
        </ScrollReveal>

        {/* Modular Grid of Services with Cascading Stagger Delay */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((svc, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <ScrollReveal
                key={svc.id}
                direction="up"
                delay={100 * (idx + 1)}
                duration={0.7}
                className="h-full"
              >
                <div className="h-full border border-[var(--border-primary)] bg-[var(--background-secondary)] p-6 relative flex flex-col justify-between corner-bracket-container corner-hover-expand group hover:border-[var(--accent-primary)] transition-all duration-300">
                  <CornerBracket size={6} />

                  <div>
                    {/* Service Number & Icon */}
                    <div className="flex items-center justify-between font-mono text-xs text-[var(--text-quaternary)] pb-4 border-b border-[var(--border-secondary)]">
                      <span className="text-[var(--accent-primary)] font-bold">{svc.number}</span>
                      <Icon className="w-4 h-4 text-[var(--accent-primary)] group-hover:scale-110 transition-transform" />
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="font-sans font-bold text-lg text-[var(--text-primary)] mt-4 group-hover:text-[var(--accent-primary)] transition-colors leading-snug">
                      {svc.title}
                    </h3>

                    <p className="font-mono text-[11px] text-[var(--accent-primary)] mt-1 opacity-90">
                      {svc.tagline}
                    </p>

                    <p className="font-sans text-xs text-[var(--text-secondary)] mt-3 leading-relaxed">
                      {svc.description}
                    </p>

                    {/* Deliverables List */}
                    <div className="mt-6 pt-4 border-t border-[var(--border-secondary)]">
                      <div className="font-mono text-[10px] text-[var(--text-quaternary)] uppercase tracking-wider mb-2.5">
                        // DELIVERABLES
                      </div>
                      <ul className="space-y-1.5 font-mono text-xs text-[var(--text-secondary)]">
                        {svc.deliverables.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                            <span className="text-[11px] leading-tight">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tool Badges */}
                  <div className="mt-6 pt-4 border-t border-[var(--border-secondary)] flex flex-wrap gap-1">
                    {svc.tools.map((tool, toolIdx) => (
                      <span
                        key={toolIdx}
                        className="px-2 py-0.5 text-[10px] font-mono border border-[var(--border-secondary)] bg-[var(--background-tertiary)] text-[var(--text-tertiary)]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
