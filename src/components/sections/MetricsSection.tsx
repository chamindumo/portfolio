import React, { useEffect, useState, useRef } from 'react';
import { CornerBracket } from '../ui/CornerBracket';
import { ScrollReveal } from '../ui/ScrollReveal';
import { metricsData } from '../../data/portfolioData';
import { Zap, Clock, ShieldCheck, FolderGit2, Activity } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Clock,
  ShieldCheck,
  FolderGit2,
};

interface CounterProps {
  value: string;
  isTriggered: boolean;
}

const AnimatedCounter: React.FC<CounterProps> = ({ value, isTriggered }) => {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isTriggered) return;

    // Check if numeric
    const cleanNum = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(cleanNum)) {
      setDisplayValue(value);
      return;
    }

    const hasDecimal = value.includes('.');
    const isLessThan = value.startsWith('<');
    const duration = 1400; // ms
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out expo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = ease * cleanNum;

      if (hasDecimal) {
        setDisplayValue((isLessThan ? '<' : '') + current.toFixed(2));
      } else {
        setDisplayValue((isLessThan ? '<' : '') + Math.round(current).toString());
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(update);
  }, [isTriggered, value]);

  return <>{displayValue}</>;
};

export const MetricsSection: React.FC = () => {
  const [sectionInView, setSectionInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="metrics"
      className="relative py-20 px-4 md:px-8 border-b border-[var(--border-primary)]"
    >
      <div className="max-w-[var(--grid-max-width)] mx-auto w-full">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50} duration={0.6}>
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[var(--border-secondary)] gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-primary)] font-bold tracking-widest uppercase">
                <span>04 . </span>
                <span>TELEMETRY &amp; BENCHMARKS</span>
              </div>
              <h2 className="font-sans font-extrabold text-3xl md:text-5xl text-[var(--text-primary)] mt-1 tracking-tight">
                Measurable Engineering Impact
              </h2>
            </div>

            {/* Realtime Engine Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 border border-emerald-500/40 bg-emerald-500/10 font-mono text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold">STATUS: SYSTEMS OPTIMAL</span>
            </div>
          </div>
        </ScrollReveal>

        {/* 4-Stat Metric Matrix with Scroll-Triggered Numbers */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData.map((m, idx) => {
            const Icon = iconMap[m.iconName] || Activity;
            return (
              <ScrollReveal
                key={m.id}
                direction="up"
                delay={100 * (idx + 1)}
                duration={0.7}
                className="h-full"
              >
                <div className="h-full border border-[var(--border-primary)] bg-[var(--background-secondary)] p-6 relative flex flex-col justify-between corner-bracket-container hover:border-[var(--accent-primary)] transition-colors group">
                  <CornerBracket size={6} />

                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-quaternary)] pb-3 border-b border-[var(--border-secondary)]">
                      <span>METRIC // {m.label}</span>
                      <Icon className="w-4 h-4 text-[var(--accent-primary)] group-hover:scale-110 transition-transform" />
                    </div>

                    {/* Stat Number with Animated Counter */}
                    <div className="mt-4 flex items-baseline gap-1 font-mono">
                      <span className="font-sans font-black text-4xl lg:text-5xl text-[var(--text-primary)] tracking-tight group-hover:text-[var(--accent-primary)] transition-colors font-tabular">
                        <AnimatedCounter value={m.value} isTriggered={sectionInView} />
                      </span>
                      {m.unit && (
                        <span className="font-mono text-lg text-[var(--accent-primary)] font-semibold">
                          {m.unit}
                        </span>
                      )}
                    </div>

                    <p className="font-sans text-xs text-[var(--text-secondary)] mt-3 leading-relaxed">
                      {m.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[var(--border-secondary)] font-mono text-[10px] text-[var(--text-quaternary)] flex items-center justify-between">
                    <span>AUDIT STATUS</span>
                    <span className="text-[var(--accent-primary)] font-medium">VERIFIED</span>
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
