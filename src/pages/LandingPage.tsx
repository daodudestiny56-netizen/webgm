import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Eye, LayoutGrid, MessageSquare } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0D0D0F] text-white font-sans overflow-x-hidden flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-white/10 bg-[#0D0D0F]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-extrabold text-base tracking-tight text-white">CRIT STUDIO</span>
            <div className="h-4 w-px bg-white/20 hidden sm:block" />
            <span className="text-xs text-white/50 hidden sm:inline tracking-wide">
              WebMCP Design Canvas
            </span>
          </div>

          <Link
            to="/workspace"
            className="bg-white text-[#0D0D0F] text-xs font-bold px-5 py-2.5 flex items-center gap-2 hover:bg-white/90 transition-colors min-h-[44px]"
          >
            Launch Workspace
            <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full px-5 sm:px-8 pt-20 sm:pt-28 pb-16 text-center overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-[11px] font-semibold tracking-widest text-white/70 px-4 py-1.5 mb-8 uppercase">
            <Zap size={12} className="text-amber-400" />
            WebMCP Challenge 2026 Submission
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 mx-auto">
            Give your AI agent
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
              hands, not just words.
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed mb-10">
            Crit Studio exposes design canvases as WebMCP tools so AI agents can flag, drag, resize, and rebalance UI issues live.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link
              to="/workspace"
              className="bg-white text-[#0D0D0F] text-sm font-bold px-7 py-3.5 flex items-center gap-2.5 hover:bg-white/90 transition-all min-h-[48px] shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              Open Interactive Workspace
              <ArrowRight size={16} />
            </Link>

            <a
              href="#how-it-works"
              className="text-sm font-semibold text-white/60 hover:text-white transition-colors min-h-[48px] flex items-center gap-1"
            >
              See How It Works
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Canvas Preview Frame */}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute -inset-px bg-gradient-to-b from-white/20 to-white/5 pointer-events-none" />
          <div className="bg-[#161618] border border-white/10 p-1.5 shadow-2xl shadow-black/50">
            {/* Title Bar */}
            <div className="h-9 px-4 bg-[#1C1C1F] border-b border-white/10 flex items-center justify-between text-[11px] text-white/40 font-mono">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="ml-2 text-white/30">PROOFREADING_PREVIEW</span>
              </div>
              <span className="text-white/20">800 x 580</span>
            </div>

            {/* Canvas Content */}
            <div className="relative w-full aspect-[16/9] bg-[#F6F5F1] p-5 sm:p-8 overflow-hidden">
              {/* Fake Ruler Ticks */}
              <div className="absolute top-0 left-0 right-0 h-2 flex">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="flex-1 border-r border-[#D8D5CC]/40" style={{ height: i % 5 === 0 ? '8px' : '4px' }} />
                ))}
              </div>

              {/* Nav mockup */}
              <div className="flex items-center gap-5 border-b border-[#D8D5CC] pb-3 mb-5 mt-2 font-sans text-xs text-[#17181A]">
                <span className="font-extrabold text-sm">ACME UI</span>
                <span>Products</span>
                <span>Solutions</span>
                <span className="hidden sm:inline">Enterprise</span>
              </div>

              {/* Hero heading mockup */}
              <div className="max-w-sm sm:max-w-md relative">
                <div className="relative mb-2">
                  <h2 className="text-lg sm:text-2xl font-bold text-[#c0c4cc] leading-tight">
                    The All-In-One Platform for Modern Teams
                  </h2>

                  {/* Red pen circle */}
                  <svg className="absolute -inset-1.5 w-[106%] h-[130%] pointer-events-none" viewBox="0 0 400 80" preserveAspectRatio="none">
                    <ellipse cx="200" cy="40" rx="190" ry="35" fill="none" stroke="#B3261E" strokeWidth="2" strokeDasharray="6 2" opacity="0.8" />
                  </svg>
                </div>

                <p className="text-[11px] text-[#6B7280] mb-3">
                  Streamline team workflows and automate visual QA.
                </p>
                <div className="inline-block bg-[#17181A] text-white text-[11px] px-3 py-1.5 font-bold">
                  Start Free Trial
                </div>
              </div>

              {/* Margin Note */}
              <div className="hidden sm:block absolute right-5 top-16 w-[180px]">
                <div className="bg-white border border-[#B3261E]/30 p-2.5 shadow-sm">
                  <div className="text-[10px] font-bold text-[#B3261E] mb-0.5 uppercase tracking-wider">Proof Mark</div>
                  <p className="text-[11px] text-[#B3261E]/80 leading-snug">
                    Low WCAG contrast (1.4:1). Gray text fails accessibility.
                  </p>
                </div>
                {/* Leader line */}
                <svg className="absolute -left-12 top-4 w-12 h-8 pointer-events-none" viewBox="0 0 48 32">
                  <path d="M 48 8 Q 30 8 12 16" fill="none" stroke="#B3261E" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.5" />
                </svg>
              </div>
            </div>
          </div>

          {/* Glow effect under frame */}
          <div className="absolute -bottom-8 left-1/4 right-1/4 h-16 bg-gradient-to-t from-transparent via-amber-500/5 to-transparent blur-2xl pointer-events-none" />
        </div>
      </section>

      {/* Tool Strip */}
      <section className="w-full border-y border-white/10 bg-[#111113] py-6">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-white/30">
            <span className="uppercase tracking-widest text-[10px] text-white/20 font-semibold">6 WebMCP Tools:</span>
            {['getCanvasState', 'flagIssue', 'moveElement', 'resizeElement', 'suggestSpacing', 'annotateAt'].map((t) => (
              <code key={t} className="font-mono text-amber-400/60 bg-white/5 px-2 py-0.5 border border-white/5">{t}</code>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="w-full bg-[#0D0D0F] py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
              How It Works
            </h2>
            <p className="text-sm text-white/40 max-w-md mx-auto">
              Three steps from mockup to AI-reviewed, spatially-corrected design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: <LayoutGrid size={20} />,
                title: 'Build a Mockup',
                desc: 'Place headings, text, buttons, and graphics on the canvas with the Figma-style toolbox.',
                accent: 'from-blue-500/20 to-blue-600/5',
              },
              {
                step: '02',
                icon: <MessageSquare size={20} />,
                title: 'Talk to the AI',
                desc: '"What\'s wrong with this?" -- The embedded AI reads your canvas and responds with tool actions.',
                accent: 'from-amber-500/20 to-amber-600/5',
              },
              {
                step: '03',
                icon: <Eye size={20} />,
                title: 'Watch It Execute',
                desc: 'Proofreader marks drop in redline ink, touch targets resize, and layouts reflow live.',
                accent: 'from-emerald-500/20 to-emerald-600/5',
              },
            ].map((item) => (
              <div
                key={item.step}
                className={`relative bg-gradient-to-b ${item.accent} border border-white/10 p-7 flex flex-col text-center group hover:border-white/20 transition-colors`}
              >
                <div className="text-[10px] font-mono text-white/20 tracking-widest mb-4">{item.step}</div>
                <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center text-white/60 bg-white/5 border border-white/10">
                  {item.icon}
                </div>
                <h3 className="font-bold text-base text-white mb-2">{item.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why WebMCP */}
      <section className="w-full bg-[#111113] py-20 sm:py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
              Why WebMCP?
            </h2>
            <p className="text-sm text-white/40 max-w-lg mx-auto leading-relaxed">
              Traditional AI tools describe problems in paragraphs. WebMCP lets the agent execute spatial operations directly through{' '}
              <code className="text-amber-400/80 bg-white/5 px-1.5 py-0.5 border border-white/5 font-mono text-[11px]">navigator.modelContext</code>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="border border-red-500/20 bg-red-500/5 p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <span className="font-bold text-sm text-red-400">Traditional Chat / Vision</span>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">
                "Your CTA button needs more padding." You still have to translate words into pixels yourself. Vision models approximate clicks slowly and unreliably.
              </p>
            </div>

            <div className="border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                <span className="font-bold text-sm text-emerald-400">WebMCP Spatial Tools</span>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">
                Agent executes structured canvas operations -- flagIssue, moveElement, resizeElement, suggestSpacing -- directly in page JavaScript with instant precision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="w-full border-t border-white/10 bg-[#0D0D0F] py-14">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3">Ready to see it live?</h3>
          <p className="text-sm text-white/40 mb-8 max-w-md mx-auto">
            Open the workspace, build a mockup, and let the AI agent critique and fix your design in real-time.
          </p>

          <Link
            to="/workspace"
            className="inline-flex items-center gap-2.5 bg-white text-[#0D0D0F] text-sm font-bold px-8 py-4 hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.12)]"
          >
            Launch Workspace
            <ArrowRight size={16} />
          </Link>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4 text-[11px] text-white/25">
            <span className="font-semibold text-white/40">Crit Studio</span>
            <span>OpenAI WebMCP Challenge 2026</span>
            <span>React + TypeScript + Zustand</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
