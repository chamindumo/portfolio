import React, { useState } from 'react';
import { CornerBracket } from '../ui/CornerBracket';
import { ScrollReveal } from '../ui/ScrollReveal';
import { profileData } from '../../data/portfolioData';
import { useLocalTime } from '../../hooks/useLocalTime';
import confetti from 'canvas-confetti';
import { Send, CheckCircle, Mail, MapPin, Clock, Github, Linkedin, ArrowUp } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const times = useLocalTime();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Full-Stack Web Project',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
      
      // Fire subtle celebratory confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#38bdf8', '#0284c7', '#ffffff'],
      });
    }, 600);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="relative pt-20 pb-28 md:pb-16 px-4 md:px-8 bg-[var(--background-primary)] text-[var(--text-primary)]"
    >
      <div className="max-w-[var(--grid-max-width)] mx-auto w-full">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50} duration={0.6}>
          <div className="pb-8 border-b border-[var(--border-secondary)]">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-primary)] font-bold tracking-widest uppercase">
              <span>06 . </span>
              <span>TRANSMIT INQUIRY</span>
            </div>
            <h2 className="font-sans font-extrabold text-3xl md:text-5xl text-[var(--text-primary)] mt-1 tracking-tight">
              Let&apos;s Build Something Resilient
            </h2>
            <p className="font-mono text-xs text-[var(--text-tertiary)] mt-2 max-w-xl">
              Have a new product, system architecture, or full-stack web project in mind? Transmit a message below or reach out directly.
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Grid: Interactive Contact Form & Technical Direct Coordinates */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (7 cols): Interactive Blueprint Contact Form */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={150} duration={0.7}>
              <div className="border border-[var(--border-primary)] bg-[var(--background-secondary)] p-6 md:p-8 relative corner-bracket-container">
                <CornerBracket size={8} />

                <div className="font-mono text-xs text-[var(--text-quaternary)] pb-4 border-b border-[var(--border-secondary)] flex items-center justify-between">
                  <span>INTERFACE // DIRECT DISPATCH PROTOCOL</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    READY
                  </span>
                </div>

                {submitted ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-400">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="font-sans font-bold text-2xl text-[var(--text-primary)]">
                      Transmission Received
                    </h3>
                    <p className="font-mono text-xs text-[var(--text-tertiary)] max-w-sm">
                      Thank you for reaching out, {formData.name || 'there'}. I have logged your transmission and will respond promptly via email.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-4 py-2 font-mono text-xs border border-[var(--border-primary)] hover:border-[var(--accent-primary)] transition-colors text-[var(--accent-primary)]"
                    >
                      TRANSMIT ANOTHER MESSAGE
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Input */}
                      <div className="space-y-1.5">
                        <label className="block font-mono text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
                          Your Name <span className="text-[var(--accent-primary)]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Henderson"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2.5 bg-[var(--background-tertiary)] border border-[var(--border-primary)] text-sm font-sans text-[var(--text-primary)] placeholder-[var(--text-quaternary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                        />
                      </div>

                      {/* Email Input */}
                      <div className="space-y-1.5">
                        <label className="block font-mono text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
                          Email Address <span className="text-[var(--accent-primary)]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@organization.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3 py-2.5 bg-[var(--background-tertiary)] border border-[var(--border-primary)] text-sm font-sans text-[var(--text-primary)] placeholder-[var(--text-quaternary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Subject Selector */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
                        Project Scope / Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3 py-2.5 bg-[var(--background-tertiary)] border border-[var(--border-primary)] text-sm font-sans text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                      >
                        <option value="Full-Stack Web Project">Full-Stack Web &amp; Application Development</option>
                        <option value="Backend Architecture">Cloud Infrastructure &amp; API Systems</option>
                        <option value="Creative UI/UX">Creative WebGL &amp; Frontend Experience</option>
                        <option value="Consulting / Performance">Performance Audit &amp; Optimization</option>
                        <option value="Full-Time Engineering Role">Full-Time Engineering Opportunity</option>
                      </select>
                    </div>

                    {/* Message Field */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
                        Transmission Content <span className="text-[var(--accent-primary)]">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Provide context on your project timelines, technical goals, and requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3 py-2.5 bg-[var(--background-tertiary)] border border-[var(--border-primary)] text-sm font-sans text-[var(--text-primary)] placeholder-[var(--text-quaternary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-none"
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-3 px-6 border border-[var(--border-primary)] bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)] font-mono text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 relative group disabled:opacity-50"
                    >
                      <CornerBracket size={5} />
                      {isSending ? (
                        <span>ENCRYPTING &amp; DISPATCHING...</span>
                      ) : (
                        <>
                          <span>TRANSMIT DISPATCH</span>
                          <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column (5 cols): Direct Coordinates & Real-Time Clocks */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Direct Contact Points */}
            <ScrollReveal direction="left" delay={200} duration={0.7}>
              <div className="border border-[var(--border-primary)] bg-[var(--background-secondary)] p-6 relative corner-bracket-container">
                <CornerBracket size={8} />

                <div className="font-mono text-xs text-[var(--text-quaternary)] uppercase tracking-wider pb-3 border-b border-[var(--border-secondary)]">
                  // DIRECT COMMUNICATIONS
                </div>

                <div className="mt-4 space-y-4">
                  <a
                    href={`mailto:${profileData.email}`}
                    className="flex items-start gap-3 p-3 border border-[var(--border-primary)] bg-[var(--background-tertiary)] hover:border-[var(--accent-primary)] transition-colors group"
                  >
                    <Mail className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-mono text-[10px] text-[var(--text-quaternary)]">PRIMARY EMAIL</div>
                      <div className="font-mono text-xs text-[var(--text-primary)] font-semibold group-hover:text-[var(--accent-primary)] transition-colors">
                        {profileData.email}
                      </div>
                    </div>
                  </a>



                  <div className="flex items-start gap-3 p-3 border border-[var(--border-primary)] bg-[var(--background-tertiary)]">
                    <MapPin className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-mono text-[10px] text-[var(--text-quaternary)]">LOCATION COORDINATES</div>
                      <div className="font-mono text-xs text-[var(--text-primary)] font-semibold">
                        {profileData.location}
                      </div>
                      <div className="font-mono text-[10px] text-[var(--text-tertiary)] mt-0.5">
                        {profileData.coordinates}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="mt-6 pt-4 border-t border-[var(--border-secondary)]">
                  <div className="font-mono text-[10px] text-[var(--text-quaternary)] uppercase tracking-wider mb-2.5">
                    // CODE REPOSITORIES &amp; NETWORKS
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={profileData.socials[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 border border-[var(--border-primary)] bg-[var(--background-tertiary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] text-center font-mono text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GITHUB</span>
                    </a>

                    <a
                      href={profileData.socials[1].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 border border-[var(--border-primary)] bg-[var(--background-tertiary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] text-center font-mono text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LINKEDIN</span>
                    </a>
                  </div>
                </div>

              </div>
            </ScrollReveal>

            {/* Real-time Timezone Clocks */}
            <ScrollReveal direction="left" delay={300} duration={0.7}>
              <div className="border border-[var(--border-primary)] bg-[var(--background-secondary)] p-6 relative corner-bracket-container">
                <CornerBracket size={6} />

                <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-quaternary)] pb-3 border-b border-[var(--border-secondary)]">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                  <span>LOCAL TIME TELEMETRY</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="p-3 border border-[var(--border-primary)] bg-[var(--background-tertiary)]">
                    <div className="font-mono text-[10px] text-[var(--text-quaternary)]">COLOMBO (UTC+5:30)</div>
                    <div className="font-mono text-base font-bold text-[var(--text-primary)] mt-1 font-tabular">
                      {times.colombo || '--:--:--'}
                    </div>
                  </div>

                  <div className="p-3 border border-[var(--border-primary)] bg-[var(--background-tertiary)]">
                    <div className="font-mono text-[10px] text-[var(--text-quaternary)]">LONDON (UTC+0)</div>
                    <div className="font-mono text-base font-bold text-[var(--text-primary)] mt-1 font-tabular">
                      {times.london || '--:--:--'}
                    </div>
                  </div>
                </div>

              </div>
            </ScrollReveal>

          </div>

        </div>

        {/* Global Blueprint Footer Bar */}
        <div className="mt-16 pt-8 border-t border-[var(--border-primary)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--text-tertiary)]">
          <div className="flex items-center gap-3">
            <span className="text-[var(--accent-primary)] font-bold">[ CM ]</span>
            <span>&copy; {new Date().getFullYear()} CHAMINDU MORAMUDALI. ALL RIGHTS RESERVED.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 border border-[var(--border-primary)] bg-[var(--background-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors"
          >
            <span>ELEVATE TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
