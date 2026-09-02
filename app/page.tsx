import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#14161A] font-sans flex flex-col w-full overflow-x-hidden">
      {/* 1. Header Navigation */}
      <header className="w-full border-b-2 border-[#14161A] bg-[#F6F5F1] sticky top-0 z-50">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-base tracking-tight text-[#14161A]">CRIT STUDIO</span>
            <span className="text-xs text-[#6B7280] font-bold border-l-2 border-[#14161A] pl-3 hidden sm:inline">
              WebMCP Design Canvas
            </span>
          </div>

          <Link href="/workspace" className="neo-btn-primary text-xs min-h-[36px]">
            <span>Launch Workspace</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24 text-center flex flex-col items-center">
        {/* Submission Badge */}
        <div className="inline-flex items-center gap-2 bg-[#F6F5F1] border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] px-3 py-1 mb-6 text-[11px] font-bold uppercase tracking-wider text-[#14161A]">
          <Zap size={12} className="fill-[#F2C94C] text-[#14161A]" />
          <span>WebMCP Challenge 2026 Submission</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#14161A] leading-[1.1] mb-5 max-w-3xl">
          Give your AI agent hands, not just words.
        </h1>

        {/* Hero Subhead */}
        <p className="text-sm sm:text-base text-[#6B7280] max-w-xl mx-auto leading-relaxed mb-8 font-medium">
          Crit Studio exposes design canvases as WebMCP tools so AI agents can inspect coordinates, flag visual flaws, resize touch targets, and rebalance layouts live on screen.
        </p>

        {/* CTA Button Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
          <Link href="/workspace" className="neo-btn-primary text-sm px-6 py-3 min-h-[44px]">
            <span>Open Interactive Workspace</span>
            <ArrowRight size={15} />
          </Link>

          <a href="#how-it-works" className="neo-btn text-sm px-6 py-3 min-h-[44px]">
            <span>See How It Works</span>
          </a>
        </div>

        {/* Canvas Preview Container — Fixed Aspect Ratio 800/580 with Total Containment */}
        <div className="w-full max-w-3xl mx-auto border-2 border-[#14161A] shadow-[4px_4px_0_#14161A] sm:shadow-[6px_6px_0_#14161A] bg-white overflow-hidden text-left">
          {/* Chrome Top Bar */}
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

          {/* Scaled Canvas Preview Vector Illustration */}
          <div className="w-full aspect-[800/580] bg-[#F6F5F1] overflow-hidden relative">
            <svg
              viewBox="0 0 800 580"
              className="w-full h-full block select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Grid Dots */}
              <defs>
                <pattern id="previewGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#D8D5CC" />
                </pattern>
              </defs>
              <rect width="800" height="580" fill="#F6F5F1" />
              <rect width="800" height="580" fill="url(#previewGrid)" />

              {/* Rulers */}
              <line x1="0" y1="20" x2="800" y2="20" stroke="#D8D5CC" strokeWidth="1" />
              <line x1="20" y1="0" x2="20" y2="580" stroke="#D8D5CC" strokeWidth="1" />

              {/* Mock Nav Bar */}
              <g transform="translate(40, 40)">
                <rect x="0" y="0" width="720" height="46" fill="#ffffff" stroke="#14161A" strokeWidth="2" />
                <text x="18" y="28" fill="#14161A" fontSize="15" fontWeight="800" fontFamily="sans-serif">
                  ACME UI
                </text>
                <text x="440" y="28" fill="#14161A" fontSize="13" fontWeight="600" fontFamily="sans-serif">
                  Products
                </text>
                <text x="525" y="28" fill="#14161A" fontSize="13" fontWeight="600" fontFamily="sans-serif">
                  Solutions
                </text>
                <text x="610" y="28" fill="#14161A" fontSize="13" fontWeight="600" fontFamily="sans-serif">
                  Enterprise
                </text>
              </g>

              {/* Flagged Heading Element */}
              <g transform="translate(40, 120)">
                {/* Redline Outline Box */}
                <rect
                  x="-4"
                  y="-4"
                  width="458"
                  height="78"
                  fill="#ffffff"
                  stroke="#C1272D"
                  strokeWidth="3"
                />
                <text x="12" y="32" fill="#94a3b8" fontSize="22" fontWeight="800" fontFamily="sans-serif">
                  The All-In-One Platform for Modern Teams
                </text>
                <text x="12" y="58" fill="#94a3b8" fontSize="16" fontWeight="700" fontFamily="sans-serif">
                  Built for rapid product and engineering cycles.
                </text>

                {/* Stamped Redline Badge */}
                <g transform="translate(320, -14)">
                  <rect x="0" y="0" width="134" height="22" fill="#C1272D" stroke="#14161A" strokeWidth="2" />
                  <text x="8" y="15" fill="#F6F5F1" fontSize="10" fontWeight="800" fontFamily="sans-serif">
                    FLAG // HIGH SEVERITY
                  </text>
                </g>
              </g>

              {/* Straight Leader Line from Heading to Margin Note */}
              <line
                x1="498"
                y1="155"
                x2="540"
                y2="155"
                stroke="#14161A"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <circle cx="498" cy="155" r="3.5" fill="#14161A" />

              {/* Pinned Margin Note Card */}
              <g transform="translate(540, 120)">
                <rect
                  x="0"
                  y="0"
                  width="220"
                  height="78"
                  fill="#F6F5F1"
                  stroke="#14161A"
                  strokeWidth="2"
                />
                {/* Shadow */}
                <rect x="3" y="3" width="220" height="78" fill="none" stroke="#14161A" strokeWidth="2" />

                {/* Note Header */}
                <rect x="8" y="8" width="6" height="6" fill="#C1272D" />
                <text x="18" y="14" fill="#14161A" fontSize="9" fontWeight="800" fontFamily="sans-serif">
                  HIGH PRIORITY // WCAG 1.4:1
                </text>
                <line x1="8" y1="20" x2="212" y2="20" stroke="#D8D5CC" strokeWidth="1" />

                {/* Note Body */}
                <text x="8" y="36" fill="#14161A" fontSize="11" fontWeight="500" fontFamily="sans-serif">
                  Faint gray text on paper fails AA.
                </text>
                <text x="8" y="52" fill="#14161A" fontSize="11" fontWeight="500" fontFamily="sans-serif">
                  Suggested ink: #14161A (15:1).
                </text>
              </g>

              {/* Sub-text Element */}
              <g transform="translate(40, 225)">
                <text x="0" y="16" fill="#6B7280" fontSize="14" fontWeight="500" fontFamily="sans-serif">
                  Streamline team workflows, track design iterations, and automate routine visual QA checks.
                </text>
              </g>

              {/* CTA Button Element */}
              <g transform="translate(40, 275)">
                <rect x="0" y="0" width="160" height="42" fill="#14161A" stroke="#14161A" strokeWidth="2" />
                <text x="24" y="26" fill="#ffffff" fontSize="13" fontWeight="700" fontFamily="sans-serif">
                  Start Free Trial -&gt;
                </text>
              </g>

              {/* Agent Cursor Indicator */}
              <g transform="translate(420, 285)">
                <circle cx="0" cy="0" r="4" fill="#14161A" />
                <rect x="10" y="-12" width="165" height="22" fill="#F6F5F1" stroke="#14161A" strokeWidth="1.5" />
                <text x="16" y="3" fill="#14161A" fontSize="10" fontWeight="700" fontFamily="sans-serif">
                  [flagIssue] Inspected Heading
                </text>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* Hairline Divider */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border-t border-[#D8D5CC]" />
      </div>

      {/* 3. How It Works Section (3 Steps, Equal Grid Gap) */}
      <section id="how-it-works" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block bg-[#F6F5F1] border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] px-2.5 py-0.5 mb-3 text-[10px] font-bold uppercase tracking-wider text-[#14161A]">
            WORKFLOW
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#14161A] mb-3">
            How Crit Studio Works
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] max-w-md mx-auto font-medium leading-relaxed">
            A real-time design critique loop powered by direct WebMCP tool execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: '1',
              title: 'Build a Mockup',
              desc: 'Place headings, body text, buttons, and graphics on the canvas using the component toolbox or load an existing layout.',
            },
            {
              step: '2',
              title: 'Talk to the AI',
              desc: 'Ask natural questions in the docked chat. The AI calls getCanvasState to inspect exact element coordinates and font properties.',
            },
            {
              step: '3',
              title: 'Watch Live Execution',
              desc: 'The agent flags contrast issues with redline stamps, resizes cramped touch targets, and aligns navigation spacing live on screen.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-[#F6F5F1] border-2 border-[#14161A] shadow-[3px_3px_0_#14161A] p-6 flex flex-col items-center text-center"
            >
              {/* Step Digit in Plain Bordered Square */}
              <div className="w-7 h-7 border-2 border-[#14161A] bg-white flex items-center justify-center font-extrabold text-xs mb-4 text-[#14161A]">
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

      {/* 4. Why WebMCP Section (Two Balanced Comparison Cards) */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block bg-[#F6F5F1] border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] px-2.5 py-0.5 mb-3 text-[10px] font-bold uppercase tracking-wider text-[#14161A]">
            PARADIGM SHIFT
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#14161A] mb-3">
            Why WebMCP?
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] max-w-md mx-auto leading-relaxed font-medium">
            Comparing passive text descriptions with structured spatial execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Traditional Chat Card */}
          <div className="bg-[#F6F5F1] border-2 border-[#14161A] shadow-[3px_3px_0_#14161A] p-6 border-t-4 border-t-[#C1272D] flex flex-col text-center">
            <div className="inline-flex items-center justify-center gap-1.5 self-center bg-[#C1272D] text-[#F6F5F1] px-2.5 py-0.5 border border-[#14161A] font-bold text-[10px] uppercase tracking-wider mb-4">
              <ShieldAlert size={12} />
              <span>TRADITIONAL CHAT / VISION</span>
            </div>
            <h4 className="font-extrabold text-base text-[#14161A] mb-2">Passive Text Descriptions</h4>
            <p className="text-xs text-[#6B7280] leading-relaxed font-medium">
              The AI returns paragraphs of text like &quot;your button needs 16px padding.&quot; You still have to manually translate words into pixel changes. Vision models approximate clicks slowly and unreliably.
            </p>
          </div>

          {/* WebMCP Spatial Card */}
          <div className="bg-[#F6F5F1] border-2 border-[#14161A] shadow-[3px_3px_0_#14161A] p-6 border-t-4 border-t-[#2F7A5C] flex flex-col text-center">
            <div className="inline-flex items-center justify-center gap-1.5 self-center bg-[#2F7A5C] text-[#F6F5F1] px-2.5 py-0.5 border border-[#14161A] font-bold text-[10px] uppercase tracking-wider mb-4">
              <CheckCircle2 size={12} />
              <span>WEBMCP SPATIAL TOOLS</span>
            </div>
            <h4 className="font-extrabold text-base text-[#14161A] mb-2">Direct Canvas Execution</h4>
            <p className="text-xs text-[#14161A]/80 leading-relaxed font-medium">
              The AI calls structured JavaScript tools directly in browser memory — executing <code className="font-bold text-[#14161A] bg-white border border-[#14161A] px-1">flagIssue</code>, <code className="font-bold text-[#14161A] bg-white border border-[#14161A] px-1">resizeElement</code>, and <code className="font-bold text-[#14161A] bg-white border border-[#14161A] px-1">suggestSpacing</code> with exact coordinates.
            </p>
          </div>
        </div>
      </section>

      {/* Hairline Divider */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border-t border-[#D8D5CC]" />
      </div>

      {/* 5. Closing CTA */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14161A] mb-3">
          Ready to review your layout?
        </h3>
        <p className="text-sm text-[#6B7280] mb-8 max-w-md mx-auto font-medium">
          Open the workspace, build a mockup, and let the AI agent critique and fix your design in real-time.
        </p>
        <Link href="/workspace" className="neo-btn-primary text-sm px-8 py-3.5 min-h-[44px]">
          <span>Launch Interactive Workspace</span>
          <ArrowRight size={15} />
        </Link>
      </section>

      {/* 6. Footer */}
      <footer className="w-full border-t border-[#D8D5CC] bg-[#F6F5F1] py-8 mt-auto">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#14161A]">CRIT STUDIO</span>
            <span className="text-[#14161A] font-bold">•</span>
            <span>WebMCP Challenge 2026</span>
          </div>

          <div className="flex items-center gap-3 font-semibold text-[#14161A]">
            <span>Next.js 16 + TypeScript + Zustand</span>
            <span className="text-[#D8D5CC]">|</span>
            <span className="border-2 border-[#14161A] bg-[#F2C94C] px-2 py-0.5 text-[10px] font-extrabold shadow-[1px_1px_0_#14161A]">
              6 TOOLS REGISTERED
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
