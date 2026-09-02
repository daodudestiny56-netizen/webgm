import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#17181A] font-sans overflow-x-hidden flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-[#D8D5CC] bg-[#F6F5F1] sticky top-0 z-50">
        <div className="max-w-[960px] mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <span className="font-extrabold text-[15px] tracking-tight text-[#17181A]">CRIT STUDIO</span>
          <Link
            to="/workspace"
            className="text-[13px] font-semibold text-[#17181A] border-b border-[#17181A] pb-0.5 hover:text-[#6B7280] hover:border-[#6B7280] transition-colors flex items-center gap-1.5"
          >
            Launch Workspace
            <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-[960px] mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-16 sm:pb-20 text-center">
        <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#6B7280] mb-6">
          WebMCP Challenge 2026 Submission
        </p>

        <h1 className="text-[32px] sm:text-[48px] md:text-[56px] font-extrabold tracking-tight text-[#17181A] leading-[1.08] mb-6">
          Give your AI agent<br />
          hands, not just words.
        </h1>

        <p className="text-[15px] sm:text-[17px] text-[#6B7280] max-w-[520px] mx-auto leading-relaxed mb-10">
          Crit Studio exposes design canvases as WebMCP tools so AI agents can flag, drag, resize, and rebalance UI issues live.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5 mb-20">
          <Link
            to="/workspace"
            className="bg-[#17181A] text-white text-[13px] font-semibold px-6 py-3 border border-[#17181A] flex items-center gap-2 hover:bg-[#2a2b2d] transition-colors"
          >
            Open Workspace
            <ArrowRight size={14} />
          </Link>
          <a
            href="#how-it-works"
            className="text-[13px] font-semibold text-[#17181A] border-b border-[#17181A] pb-0.5 hover:text-[#6B7280] hover:border-[#6B7280] transition-colors"
          >
            How It Works
          </a>
        </div>

        {/* Workspace Preview — fully contained */}
        <div className="max-w-[720px] mx-auto border border-[#D8D5CC] bg-white overflow-hidden">
          {/* Window chrome bar */}
          <div className="h-8 px-3 bg-[#F6F5F1] border-b border-[#D8D5CC] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-[7px] h-[7px] rounded-full bg-[#D8D5CC]" />
              <div className="w-[7px] h-[7px] rounded-full bg-[#D8D5CC]" />
              <div className="w-[7px] h-[7px] rounded-full bg-[#D8D5CC]" />
              <span className="ml-2 text-[10px] text-[#6B7280] font-mono">PROOFREADING_PREVIEW</span>
            </div>
            <span className="text-[10px] text-[#6B7280] font-mono">800 x 580</span>
          </div>

          {/* Canvas area — aspect-ratio contained, overflow hidden */}
          <div className="relative w-full aspect-[16/9] bg-[#F6F5F1] overflow-hidden p-5 sm:p-7">
            {/* Nav mockup */}
            <div className="flex items-center gap-5 border-b border-[#D8D5CC] pb-2.5 mb-5 text-[12px] text-[#17181A]">
              <span className="font-extrabold text-[13px]">ACME UI</span>
              <span>Products</span>
              <span>Solutions</span>
              <span className="hidden sm:inline">Enterprise</span>
            </div>

            {/* Heading mockup with proofreader mark */}
            <div className="max-w-[360px] relative">
              <div className="relative mb-2">
                <h2 className="text-[18px] sm:text-[22px] font-bold text-[#c0c4cc] leading-tight">
                  The All-In-One Platform for Modern Teams
                </h2>
                <svg className="absolute -inset-1 w-[104%] h-[130%] pointer-events-none" viewBox="0 0 400 80" preserveAspectRatio="none">
                  <ellipse cx="200" cy="40" rx="190" ry="35" fill="none" stroke="#B3261E" strokeWidth="1.8" strokeDasharray="5 2" />
                </svg>
              </div>
              <p className="text-[11px] text-[#6B7280] mb-3">Streamline team workflows and automate visual QA.</p>
              <div className="inline-block bg-[#17181A] text-white text-[11px] px-3 py-1.5 font-semibold">
                Start Free Trial
              </div>
            </div>

            {/* Margin note */}
            <div className="hidden sm:block absolute right-5 top-14 w-[170px] border-l-2 border-[#B3261E] pl-2.5">
              <p className="text-[11px] font-semibold text-[#B3261E] leading-snug">
                Low WCAG contrast (1.4:1). Gray text on paper fails accessibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[960px] mx-auto px-5 sm:px-8 w-full">
        <div className="border-t border-[#D8D5CC]" />
      </div>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-[960px] mx-auto px-5 sm:px-8 py-20 sm:py-24">
        <div className="text-center mb-14">
          <h2 className="text-[24px] sm:text-[32px] font-extrabold tracking-tight text-[#17181A] mb-3">
            How It Works
          </h2>
          <p className="text-[14px] text-[#6B7280] max-w-[420px] mx-auto">
            Three steps from mockup to AI-reviewed, spatially-corrected design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {[
            {
              title: 'Build a Mockup',
              desc: 'Place headings, text, buttons, and graphics on the canvas with the Figma-style toolbox.',
            },
            {
              title: 'Talk to the AI',
              desc: 'Ask natural questions in the docked chat. The AI reads your canvas state and responds with tool actions.',
            },
            {
              title: 'Watch It Execute',
              desc: 'Proofreader marks drop in redline ink, touch targets resize, and layouts reflow live on screen.',
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`py-6 sm:py-0 sm:px-7 text-center ${
                i < 2 ? 'border-b md:border-b-0 md:border-r border-[#D8D5CC]' : ''
              }`}
            >
              <h3 className="font-bold text-[15px] text-[#17181A] mb-2">{item.title}</h3>
              <p className="text-[13px] text-[#6B7280] leading-relaxed max-w-[240px] mx-auto">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[960px] mx-auto px-5 sm:px-8 w-full">
        <div className="border-t border-[#D8D5CC]" />
      </div>

      {/* Why WebMCP */}
      <section className="max-w-[960px] mx-auto px-5 sm:px-8 py-20 sm:py-24">
        <div className="text-center mb-14">
          <h2 className="text-[24px] sm:text-[32px] font-extrabold tracking-tight text-[#17181A] mb-3">
            Why WebMCP?
          </h2>
          <p className="text-[14px] text-[#6B7280] max-w-[480px] mx-auto leading-relaxed">
            Traditional AI tools describe problems in paragraphs. WebMCP lets the agent execute spatial operations directly through{' '}
            <code className="text-[12px] font-mono text-[#17181A] border-b border-[#D8D5CC]">navigator.modelContext</code>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 max-w-[640px] mx-auto">
          <div className="py-6 sm:py-0 sm:pr-8 text-center sm:text-right border-b sm:border-b-0 sm:border-r border-[#D8D5CC]">
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6B7280] mb-3">
              Traditional Chat / Vision
            </p>
            <p className="text-[13px] text-[#6B7280] leading-relaxed">
              "Your CTA needs more padding." You still translate words into pixels yourself. Vision models approximate clicks slowly.
            </p>
          </div>

          <div className="py-6 sm:py-0 sm:pl-8 text-center sm:text-left">
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#17181A] mb-3">
              WebMCP Spatial Tools
            </p>
            <p className="text-[13px] text-[#17181A]/70 leading-relaxed">
              Agent executes structured canvas operations -- flagIssue, moveElement, resizeElement, suggestSpacing -- directly in page JavaScript.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[960px] mx-auto px-5 sm:px-8 w-full">
        <div className="border-t border-[#D8D5CC]" />
      </div>

      {/* Closing CTA */}
      <section className="max-w-[960px] mx-auto px-5 sm:px-8 py-20 sm:py-24 text-center">
        <h3 className="text-[20px] sm:text-[28px] font-extrabold text-[#17181A] mb-3">
          Ready to see it live?
        </h3>
        <p className="text-[14px] text-[#6B7280] mb-8 max-w-[400px] mx-auto">
          Open the workspace, build a mockup, and let the AI agent critique and fix your design in real-time.
        </p>
        <Link
          to="/workspace"
          className="inline-flex items-center gap-2 bg-[#17181A] text-white text-[13px] font-semibold px-7 py-3 border border-[#17181A] hover:bg-[#2a2b2d] transition-colors"
        >
          Launch Workspace
          <ArrowRight size={14} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#D8D5CC] py-8 mt-auto">
        <div className="max-w-[960px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-[11px] text-[#6B7280]">
          <span className="font-semibold text-[#17181A]">Crit Studio</span>
          <span className="hidden sm:inline text-[#D8D5CC]">|</span>
          <span>OpenAI WebMCP Challenge 2026</span>
          <span className="hidden sm:inline text-[#D8D5CC]">|</span>
          <span>React + TypeScript + Zustand</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
