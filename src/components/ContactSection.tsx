import React, { useState } from 'react';
import { Mail, Github, Linkedin, FileText, Check, ArrowRight, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'ninhanh917@gmail.com';

  const handleCopyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" className="relative py-32 bg-[#040407] text-[#e0e0e8] overflow-hidden">
      {/* Orbital Curve & Celestial Horizon backdrop */}
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-t from-cyan-600/15 via-blue-900/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[900px] h-[300px] border-t border-cyan-500/20 rounded-[100%] pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 tech-grid opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Quote banner matching mockup */}
        <div className="text-right mb-12">
          <span className="font-mono text-xs md:text-sm text-cyan-400/90 tracking-widest uppercase">
            &ldquo;BETTER SYSTEMS. A BRIGHTER TOMORROW.&rdquo;
          </span>
        </div>

        {/* Big Bold Call to Action */}
        <div className="max-w-4xl space-y-6 mb-16">
          <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>09 // INITIATE TRANSMISSION</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display text-white tracking-tight leading-[1.1]">
            LET'S BUILD <br />
            SOMETHING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-white">
              INTERESTING.
            </span>
          </h2>

          <p className="text-slate-400 text-base md:text-xl font-light max-w-2xl leading-relaxed">
            Available for opportunities in autonomous agent engineering, production RAG systems, and resilient distributed platforms.
          </p>

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${email}`}
              onClick={() => soundManager.playClick()}
              className="inline-flex items-center gap-3 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs md:text-sm font-bold tracking-wider rounded transition-all duration-200 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] cursor-pointer"
            >
              <span>EMAIL ME</span>
              <ArrowRight size={15} />
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-6 py-4 border border-white/15 hover:border-cyan-400/50 bg-white/[0.02] hover:bg-cyan-950/20 text-slate-200 font-mono text-xs md:text-sm rounded transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span className="text-emerald-400">COPIED TO CLIPBOARD!</span>
                </>
              ) : (
                <>
                  <Mail size={14} className="text-cyan-400" />
                  <span>COPY EMAIL ADDRESS</span>
                </>
              )}
            </button>
          </div>

          {/* Social and Profile links */}
          <div className="pt-8 flex flex-wrap items-center gap-6 font-mono text-xs text-slate-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Github size={14} />
              <span>GitHub ↗</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Linkedin size={14} />
              <span>LinkedIn ↗</span>
            </a>
            <a
              href="#hero"
              onClick={() => soundManager.playClick()}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <FileText size={14} />
              <span>Download CV (PDF) ↗</span>
            </a>
          </div>
        </div>

        {/* Bottom Editorial Footer */}
        <div className="pt-16 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <div>
            <span className="text-white font-bold">DUC ANH</span> · SOFTWARE & AI SYSTEMS ENGINEER
          </div>
          <div>
            DESIGNED WITH CINEMATIC DISCIPLINE · © 2026
          </div>
        </div>
      </div>
    </footer>
  );
};
