import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#14161A] font-sans flex flex-col w-full overflow-x-hidden">
      {/* Header */}
      <header className="w-full border-b-2 border-[#14161A] bg-[#F6F5F1] sticky top-0 z-50">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-base tracking-tight text-[#14161A]">CRIT STUDIO</span>
            <span className="text-xs text-[#6B7280] font-bold border-l-2 border-[#14161A] pl-3 hidden sm:inline">
              WebMCP Design Canvas
            </span>
          </div>

          <Link href="/workspace" className="neo-btn-primary text-xs">
            <span>Launch Workspace</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-12 sm:pb-16 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 bg-[#F6F5F1] border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] px-3 py-1 mb-5 text-[11px] font-bold uppercase tracking-wider text-[#14161A]">
          <Zap size={12} className="fill-[#F2C94C] text-[#14161A]" />
          WebMCP Challenge 2026 Submission
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#14161A] leading-[1.1] mb-5 max-w-3xl">
          Give your AI agent<br />
          hands, not just words.
        </h1>

        <p className="text-sm sm:text-base text-[#6B7280] max-w-xl mx-auto leading-relaxed mb-8">
          Crit Studio exposes design canvases as WebMCP tools so AI agents can flag, drag, resize, and rebalance UI issues live on-screen.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
          <Link href="/workspace" className="neo-btn-primary text-sm px-6 py-3">
            <span>Open Interactive Workspace</span>
            <ArrowRight size={15} />
          </Link>

          <a href="#how-it-works" className="neo-btn text-sm px-6 py-3">
            <span>See How It Works</span>
          </a>
        </div>

        {/* Workspace Preview Frame — Neobrutalist Contained Box */}
        <div className="w-full max-w-3xl mx-auto border-2 border-[#14161A] shadow-[4px_4px_0_#14161A] sm:shadow-[6px_6px_0_#14161A] bg-white overflow-hidden text-left">
          {/* Window Chrome Header Bar */}
          <div className="h-9 px-3 sm:px-4 bg-[#F6F5F1] border-b-2 border-[#14161A] flex items-center justify-between font-bold text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-[#F2C94C] border border-[#14161A]" />
              <span className="font-bold text-[11px] text-[#14161A] tracking-wider uppercase">
                CANVAS_PREVIEW // ACME_LANDING.FIG
              </span>
            </div>
            <span className="text-[10px] text-[#6B7280] font-bold border border-[#14161A] bg-white px-1.5 py-0.5">
              800 x 580 PX
            </span>
          </div>

          {/* Canvas View Area */}
          <div className="p-4 sm:p-6 bg-[#F6F5F1] select-none flex flex-col gap-4">
            {/* Nav Mockup */}
            <div className="flex items-center justify-between border-b-2 border-[#14161A] pb-3 text-xs text-[#14161A] font-bold">
              <span className="font-extrabold text-sm tracking-tight">ACME UI</span>
              <div className="flex items-center gap-2 sm:gap-4 font-semibold text-xs text-[#14161A]">
                <span>Products</span>
                <span className="hidden xs:inline">Solutions</span>
                <span className="border-2 border-[#14161A] px-2 py-0.5 bg-white shadow-[1px_1px_0_#14161A]">
                  Sign In
                </span>
              </div>
            </div>

            {/* Mockup Body Content with Flagged Element and Margin Note */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 pt-1">
              {/* Left Column: Flagged Hero Block */}
              <div className="flex-1 max-w-md">
                {/* Flagged Heading with Rejection Stamp */}
                <div className="relative inline-block border-2 border-[#C1272D] shadow-[2px_2px_0_#C1272D] sm:shadow-[3px_3px_0_#C1272D] p-2 bg-white">
                  <h3 className="text-sm sm:text-base font-bold text-[#94a3b8] leading-tight">
                    The All-In-One Platform for Modern Teams
                  </h3>
                  <div className="absolute -top-3 -right-2 neo-stamp neo-stamp-redline text-[9px]">
                    FLAG // HIGH SEVERITY
                  </div>
                </div>

                <p className="text-xs text-[#6B7280] leading-relaxed font-medium mt-3">
                  Streamline team workflows, track design iterations, and automate routine visual QA checks.
                </p>

                {/* CTA Button Mockup */}
                <div className="mt-3 inline-block bg-[#14161A] text-white text-xs px-3.5 py-1.5 font-bold border-2 border-[#14161A] shadow-[2px_2px_0_#14161A]">
                  Start Free Trial -&gt;
                </div>
              </div>

              {/* Right Column: Pinned Margin Note Card */}
              <div className="w-full sm:w-[220px] bg-white sm:bg-[#F6F5F1] p-3 border-2 border-[#14161A] shadow-[3px_3px_0_#14161A] shrink-0 self-start">
                <div className="flex items-center gap-1.5 mb-1 pb-1 border-b border-[#D8D5CC]">
                  <span className="w-2 h-2 bg-[#C1272D] inline-block" />
                  <span className="font-bold text-[10px] uppercase tracking-wider text-[#14161A]">
                    HIGH PRIORITY
                  </span>
                </div>
                <p className="text-xs text-[#14161A] leading-snug font-medium">
                  Low WCAG contrast ratio (1.4:1). Faint gray text on paper fails accessibility standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hairline Divider */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border-t border-[#D8D5CC]" />
      </div>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#F6F5F1] border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] px-2.5 py-0.5 mb-3 text-[10px] font-bold uppercase tracking-wider text-[#14161A]">
            WORKFLOW
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#14161A] mb-3">
            How Crit Studio Works
          </h2>
          <p className="text-sm text-[#6B7280] max-w-md mx-auto font-medium">
            A collaborative review loop powered by direct WebMCP tool calling on the canvas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {[
            {
              step: '1',
              title: 'Build a Mockup',
              desc: 'Place headings, text blocks, buttons, and graphics on the canvas using the component toolbox.',
            },
            {
              step: '2',
              title: 'Talk to the AI',
              desc: 'Ask natural questions in the docked chat. The AI inspects exact canvas coordinates and plans structural fixes.',
            },
            {
              step: '3',
              title: 'Watch Live Execution',
              desc: 'Flags stamp rejection marks, touch targets resize to 44px+, and layouts reflow live in real-time.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-[#F6F5F1] border-2 border-[#14161A] shadow-[3px_3px_0_#14161A] sm:shadow-[4px_4px_0_#14161A] p-5 sm:p-6 flex flex-col items-center text-center"
            >
              <div className="w-7 h-7 bg-[#F6F5F1] border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] flex items-center justify-center font-extrabold text-xs mb-4 text-[#14161A]">
                {item.step}
              </div>
              <h3 className="font-extrabold text-base text-[#14161A] mb-2">{item.title}</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hairline Divider */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border-t border-[#D8D5CC]" />
      </div>

      {/* Why WebMCP Comparison Section */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#F6F5F1] border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] px-2.5 py-0.5 mb-3 text-[10px] font-bold uppercase tracking-wider text-[#14161A]">
            PARADIGM SHIFT
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#14161A] mb-3">
            Why WebMCP?
          </h2>
          <p className="text-sm text-[#6B7280] max-w-md mx-auto leading-relaxed font-medium">
            Traditional AI tools describe problems in chat prose. WebMCP gives agents structured spatial tools directly in browser JavaScript.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-3xl mx-auto">
          {/* Traditional Chat Card */}
          <div className="bg-[#F6F5F1] border-2 border-[#14161A] shadow-[3px_3px_0_#14161A] sm:shadow-[4px_4px_0_#14161A] p-5 sm:p-6 border-t-4 border-t-[#C1272D] flex flex-col text-center">
            <div className="inline-flex items-center justify-center gap-1.5 self-center bg-[#C1272D] text-[#F6F5F1] px-2.5 py-0.5 border border-[#14161A] font-bold text-[10px] uppercase tracking-wider mb-3">
              <ShieldAlert size={11} />
              <span>TRADITIONAL CHAT / VISION</span>
            </div>
            <h4 className="font-bold text-sm text-[#14161A] mb-2">Passive Text Descriptions</h4>
            <p className="text-xs text-[#6B7280] leading-relaxed font-medium">
              &quot;Your CTA needs more padding.&quot; The user still translates words into pixels by hand. Vision models approximate clicks slowly and unreliably.
            </p>
          </div>

          {/* WebMCP Spatial Card */}
          <div className="bg-[#F6F5F1] border-2 border-[#14161A] shadow-[3px_3px_0_#14161A] sm:shadow-[4px_4px_0_#14161A] p-5 sm:p-6 border-t-4 border-t-[#2F7A5C] flex flex-col text-center">
            <div className="inline-flex items-center justify-center gap-1.5 self-center bg-[#2F7A5C] text-[#F6F5F1] px-2.5 py-0.5 border border-[#14161A] font-bold text-[10px] uppercase tracking-wider mb-3">
              <CheckCircle2 size={11} />
              <span>WEBMCP SPATIAL TOOLS</span>
            </div>
            <h4 className="font-bold text-sm text-[#14161A] mb-2">Direct Canvas Execution</h4>
            <p className="text-xs text-[#14161A]/80 leading-relaxed font-medium">
              Agent calls structured tools (<code className="font-bold text-[#14161A] bg-white border border-[#14161A] px-1">flagIssue</code>, <code className="font-bold text-[#14161A] bg-white border border-[#14161A] px-1">moveElement</code>, <code className="font-bold text-[#14161A] bg-white border border-[#14161A] px-1">resizeElement</code>) with sub-pixel spatial accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* Hairline Divider */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border-t border-[#D8D5CC]" />
      </div>

      {/* Closing CTA */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#14161A] mb-3">
          Ready to see it live?
        </h3>
        <p className="text-sm text-[#6B7280] mb-8 max-w-md mx-auto font-medium">
          Open the workspace, build a mockup, and let the AI agent critique and fix your design in real-time.
        </p>
        <Link href="/workspace" className="neo-btn-primary text-sm px-8 py-3.5">
          <span>Launch Interactive Workspace</span>
          <ArrowRight size={15} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#14161A] bg-[#F6F5F1] py-6 mt-auto">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#14161A]">CRIT STUDIO</span>
            <span className="text-[#14161A] font-bold">•</span>
            <span>OpenAI WebMCP Challenge 2026</span>
          </div>

          <div className="flex items-center gap-3 font-semibold text-[#14161A]">
            <span>React + TypeScript + Zustand</span>
            <span className="text-[#D8D5CC]">|</span>
            <span className="border-2 border-[#14161A] bg-[#F2C94C] px-2 py-0.5 text-[10px] font-extrabold shadow-[1px_1px_0_#14161A]">
              6 TOOLS READY
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
