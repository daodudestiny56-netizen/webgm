import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, ShieldAlert, CheckCircle2, XCircle, Check, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-[#F6F5F1] text-[#14161A] font-sans flex flex-col items-center">
      {/* 
        Main Layout Column:
        - Capped at max-w-5xl (1024px) centered with mx-auto
        - Explicit Flexbox Gap (gap-12 sm:gap-16 md:gap-20) guarantees 48px-80px clear vertical spacing between sections
        - Flanked by warm --paper background
      */}
      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 flex flex-col gap-12 sm:gap-16 md:gap-20 flex-1">
        
        {/* 1. Header Navigation Bar */}
        <header className="w-full bg-[#F6F5F1] border-2 border-[#14161A] shadow-[3px_3px_0_#14161A] px-6 sm:px-8 py-4 sm:py-4.5 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#14161A]">CRIT STUDIO</span>
            <span className="text-[11px] text-[#6B7280] font-bold border-l-2 border-[#14161A] pl-3 hidden sm:inline">
              WebMCP Design Canvas Engine
            </span>
          </div>

          <Link href="/workspace" className="neo-btn-primary text-xs px-4 py-2 min-h-[38px]">
            <span>Launch Workspace</span>
            <ArrowRight size={13} />
          </Link>
        </header>

        {/* 2. Hero Box Container */}
        <section className="w-full bg-white border-2 border-[#14161A] shadow-[4px_4px_0_#14161A] p-8 sm:p-12 md:p-14 text-center flex flex-col items-center">
          {/* Submission Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F6F5F1] border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] px-3.5 py-1.5 mb-6 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#14161A]">
            <Zap size={13} className="fill-[#F2C94C] text-[#14161A]" />
            <span>WebMCP Challenge 2026 Submission</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#14161A] leading-[1.15] mb-5 max-w-2xl">
            Give your AI agent hands,<br className="hidden sm:inline" /> not just words.
          </h1>

          {/* Subhead */}
          <p className="text-xs sm:text-sm md:text-base text-[#6B7280] max-w-lg mx-auto leading-relaxed mb-9 font-medium">
            Crit Studio exposes design canvases as WebMCP tools so AI agents can inspect coordinates, flag visual flaws, resize touch targets, and rebalance layouts live on screen.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            <Link href="/workspace" className="neo-btn-primary text-xs sm:text-sm px-7 py-3.5 min-h-[48px] w-full sm:w-auto text-center justify-center">
              <span>Open Interactive Workspace</span>
              <ArrowRight size={14} />
            </Link>

            <a href="#how-it-works" className="neo-btn text-xs sm:text-sm px-7 py-3.5 min-h-[48px] w-full sm:w-auto text-center justify-center">
              <span>See How It Works</span>
            </a>
          </div>
        </section>

        {/* 3. Three Simple Steps Section */}
        <section id="how-it-works" className="w-full flex flex-col gap-4">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#14161A] px-1">
            Three Simple Steps to Review Any Canvas
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full">
            {[
              {
                step: '1',
                title: 'Build a Mockup',
                desc: 'Place headings, text, buttons, and blocks on the canvas or seed an existing layout.',
              },
              {
                step: '2',
                title: 'Talk to the AI',
                desc: 'AI calls getCanvasState to inspect exact element coordinates and font properties.',
              },
              {
                step: '3',
                title: 'Watch Live Execution',
                desc: 'Agent stamps redline flags, resizes touch targets, and aligns spacing in real time.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="w-full bg-white border-2 border-[#14161A] shadow-[3px_3px_0_#14161A] p-6 sm:p-7 flex flex-col text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-7 h-7 border-2 border-[#14161A] bg-[#F2C94C] flex items-center justify-center font-extrabold text-xs text-[#14161A]">
                    {item.step}
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-[#14161A]">{item.title}</h3>
                </div>
                <p className="text-xs text-[#6B7280] leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Canvas Review Document Preview Card */}
        <section id="canvas-preview" className="w-full flex flex-col gap-4">
          {/* Section Header Bar */}
          <div className="w-full bg-[#14161A] text-white px-5 py-3 border-2 border-[#14161A] shadow-[3px_3px_0_#14161A] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles size={13} className="text-[#F2C94C]" />
              <span>Example Review: acme-landing.fig</span>
            </div>
            <Link
              href="/workspace"
              className="text-[10px] font-bold bg-[#F2C94C] text-[#14161A] px-3 py-1 border border-[#14161A] hover:bg-white transition-colors"
            >
              OPEN IN WORKSPACE -&gt;
            </Link>
          </div>

          {/* Report Document Box */}
          <div className="w-full bg-white border-2 border-[#14161A] shadow-[4px_4px_0_#14161A] p-6 sm:p-8 overflow-hidden flex flex-col gap-6">
            {/* Inner Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b-2 border-[#14161A] gap-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-base sm:text-xl font-extrabold text-[#14161A]">acme-landing.fig</h2>
                  <span className="neo-stamp neo-stamp-mark text-[9px]">LIVE CANVAS</span>
                </div>
                <p className="text-xs text-[#6B7280] mt-1 font-medium">
                  Audited via WebMCP Tools: <code className="bg-[#F6F5F1] border border-[#14161A] px-1.5 py-0.5 font-bold">getCanvasState</code>, <code className="bg-[#F6F5F1] border border-[#14161A] px-1.5 py-0.5 font-bold">flagIssue</code>
                </p>
              </div>

              {/* Audit Grade Badge */}
              <div className="self-start sm:self-auto border-2 border-[#C1272D] bg-[#F6F5F1] px-3.5 py-1.5 shadow-[2px_2px_0_#C1272D]">
                <div className="text-[9px] font-extrabold uppercase text-[#C1272D] tracking-wider">
                  2 ISSUES FLAGGED
                </div>
                <div className="text-xs font-black text-[#14161A]">WCAG AA REVIEW</div>
              </div>
            </div>

            {/* Vector Canvas Preview Box */}
            <div className="w-full aspect-[800/440] bg-[#F6F5F1] border-2 border-[#14161A] overflow-hidden relative">
              <svg
                viewBox="0 0 800 440"
                className="w-full h-full block select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Grid Pattern */}
                <defs>
                  <pattern id="cardGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#D8D5CC" />
                  </pattern>
                </defs>
                <rect width="800" height="440" fill="#F6F5F1" />
                <rect width="800" height="440" fill="url(#cardGrid)" />

                {/* Navbar */}
                <g transform="translate(30, 20)">
                  <rect x="0" y="0" width="740" height="40" fill="#ffffff" stroke="#14161A" strokeWidth="2" />
                  <text x="16" y="25" fill="#14161A" fontSize="14" fontWeight="800" fontFamily="sans-serif">
                    ACME UI
                  </text>
                  <text x="470" y="25" fill="#14161A" fontSize="12" fontWeight="600" fontFamily="sans-serif">
                    Products
                  </text>
                  <text x="550" y="25" fill="#14161A" fontSize="12" fontWeight="600" fontFamily="sans-serif">
                    Solutions
                  </text>
                  <text x="635" y="25" fill="#14161A" fontSize="12" fontWeight="600" fontFamily="sans-serif">
                    Enterprise
                  </text>
                </g>

                {/* Flagged Heading */}
                <g transform="translate(30, 75)">
                  <rect
                    x="-3"
                    y="-3"
                    width="446"
                    height="68"
                    fill="#ffffff"
                    stroke="#C1272D"
                    strokeWidth="2.5"
                  />
                  <text x="12" y="26" fill="#94a3b8" fontSize="18" fontWeight="800" fontFamily="sans-serif">
                    The All-In-One Platform for Teams
                  </text>
                  <text x="12" y="48" fill="#94a3b8" fontSize="13" fontWeight="600" fontFamily="sans-serif">
                    Built for rapid product &amp; design reviews.
                  </text>

                  {/* Stamp */}
                  <g transform="translate(315, -12)">
                    <rect x="0" y="0" width="128" height="20" fill="#C1272D" stroke="#14161A" strokeWidth="1.5" />
                    <text x="8" y="14" fill="#F6F5F1" fontSize="9" fontWeight="800" fontFamily="sans-serif">
                      FLAG // HIGH SEVERITY
                    </text>
                  </g>
                </g>

                {/* Leader line */}
                <line x1="475" y1="108" x2="515" y2="108" stroke="#14161A" strokeWidth="1.5" strokeDasharray="3 2" />
                <circle cx="475" cy="108" r="3" fill="#14161A" />

                {/* Margin Note Card */}
                <g transform="translate(515, 75)">
                  <rect x="0" y="0" width="255" height="68" fill="#F6F5F1" stroke="#14161A" strokeWidth="2" />
                  <rect x="2" y="2" width="255" height="68" fill="none" stroke="#14161A" strokeWidth="1.5" />
                  <rect x="8" y="8" width="5" height="5" fill="#C1272D" />
                  <text x="18" y="13" fill="#14161A" fontSize="9" fontWeight="800" fontFamily="sans-serif">
                    HIGH PRIORITY // WCAG 1.4:1
                  </text>
                  <line x1="8" y1="18" x2="247" y2="18" stroke="#D8D5CC" strokeWidth="1" />
                  <text x="8" y="32" fill="#14161A" fontSize="10.5" fontWeight="500" fontFamily="sans-serif">
                    Faint gray text on paper fails AA.
                  </text>
                  <text x="8" y="46" fill="#14161A" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">
                    Suggested ink: #14161A (15:1).
                  </text>
                </g>

                {/* Subtext */}
                <g transform="translate(30, 160)">
                  <text x="0" y="15" fill="#6B7280" fontSize="13" fontWeight="500" fontFamily="sans-serif">
                    Streamline workflows, audit design iterations, and automate visual QA checks.
                  </text>
                </g>

                {/* CTA Button */}
                <g transform="translate(30, 195)">
                  <rect x="0" y="0" width="155" height="38" fill="#14161A" stroke="#14161A" strokeWidth="2" />
                  <text x="20" y="24" fill="#ffffff" fontSize="12" fontWeight="700" fontFamily="sans-serif">
                    Start Free Trial -&gt;
                  </text>
                </g>

                {/* Agent Cursor */}
                <g transform="translate(410, 215)">
                  <circle cx="0" cy="0" r="4" fill="#14161A" />
                  <rect x="8" y="-11" width="160" height="20" fill="#F6F5F1" stroke="#14161A" strokeWidth="1.5" />
                  <text x="14" y="3" fill="#14161A" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">
                    [flagIssue] Inspected Heading
                  </text>
                </g>

                {/* Right Dashboard Block */}
                <g transform="translate(515, 160)">
                  <rect x="0" y="0" width="255" height="74" fill="#ffffff" stroke="#14161A" strokeWidth="2" />
                  <text x="16" y="32" fill="#14161A" fontSize="11" fontWeight="700" fontFamily="sans-serif">
                    [ ACME APP DASHBOARD ]
                  </text>
                  <text x="16" y="50" fill="#6B7280" fontSize="10" fontWeight="500" fontFamily="sans-serif">
                    Analytics &amp; Visual Metrics
                  </text>
                </g>
              </svg>
            </div>

            {/* Findings Table */}
            <div className="w-full border-2 border-[#14161A] bg-white">
              <div className="bg-[#F6F5F1] px-4 py-2 border-b-2 border-[#14161A] text-[10px] font-extrabold uppercase tracking-wider text-[#14161A]">
                CRITIQUE FINDINGS &amp; TOOL AUDIT LOGS
              </div>
              <div className="divide-y divide-[#D8D5CC] text-xs">
                <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#C1272D] border border-[#14161A]" />
                    <span className="font-bold text-[#14161A]">Heading Color Contrast</span>
                    <code className="text-[10px] bg-[#F6F5F1] border border-[#14161A] px-1.5 py-0.5 font-bold">#cbd5e1 on #F6F5F1</code>
                  </div>
                  <span className="text-[11px] font-bold text-[#C1272D] self-start sm:self-auto">
                    FAILED WCAG AA (1.4:1)
                  </span>
                </div>

                <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#2F7A5C] border border-[#14161A]" />
                    <span className="font-bold text-[#14161A]">Navbar Layout &amp; Spacing</span>
                    <code className="text-[10px] bg-[#F6F5F1] border border-[#14161A] px-1.5 py-0.5 font-bold">gap: 16px horizontal</code>
                  </div>
                  <span className="text-[11px] font-bold text-[#2F7A5C] self-start sm:self-auto">
                    ALIGNED // 4 ITEMS
                  </span>
                </div>

                <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#F2C94C] border border-[#14161A]" />
                    <span className="font-bold text-[#14161A]">CTA Touch Target Size</span>
                    <code className="text-[10px] bg-[#F6F5F1] border border-[#14161A] px-1.5 py-0.5 font-bold">155×38px -&gt; 175×46px</code>
                  </div>
                  <span className="text-[11px] font-bold text-[#14161A] self-start sm:self-auto">
                    ACCESSIBLE TARGET
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Why WebMCP Comparison Section */}
        <section className="w-full flex flex-col gap-4">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#14161A] px-1">
            Why WebMCP? Spatial Tools vs Passive Chat
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 w-full">
            {/* Traditional Chat Card */}
            <div className="w-full bg-white border-2 border-[#14161A] shadow-[3px_3px_0_#14161A] p-6 sm:p-7 border-t-4 border-t-[#C1272D] flex flex-col">
              <div className="inline-flex items-center gap-1.5 self-start bg-[#C1272D] text-[#F6F5F1] px-2.5 py-1 border border-[#14161A] font-bold text-[9px] uppercase tracking-wider mb-4">
                <ShieldAlert size={11} />
                <span>TRADITIONAL CHAT / VISION</span>
              </div>

              <h4 className="font-extrabold text-base text-[#14161A] mb-1.5">Passive Text Descriptions</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed font-medium mb-5">
                AI generates verbose text advice. You manually interpret and tweak coordinates yourself.
              </p>

              <div className="border-t border-[#D8D5CC] pt-4 space-y-2.5 mt-auto text-xs">
                <div className="flex items-start gap-2 text-[#14161A]">
                  <XCircle size={14} className="text-[#C1272D] shrink-0 mt-0.5" />
                  <span>Ambiguous feedback (&quot;make button bigger&quot;)</span>
                </div>
                <div className="flex items-start gap-2 text-[#14161A]">
                  <XCircle size={14} className="text-[#C1272D] shrink-0 mt-0.5" />
                  <span>Vision models approximate clicks unreliably</span>
                </div>
                <div className="flex items-start gap-2 text-[#14161A]">
                  <XCircle size={14} className="text-[#C1272D] shrink-0 mt-0.5" />
                  <span>Zero direct execution on the DOM or canvas</span>
                </div>
              </div>
            </div>

            {/* WebMCP Spatial Card */}
            <div className="w-full bg-white border-2 border-[#14161A] shadow-[3px_3px_0_#14161A] p-6 sm:p-7 border-t-4 border-t-[#2F7A5C] flex flex-col">
              <div className="inline-flex items-center gap-1.5 self-start bg-[#2F7A5C] text-[#F6F5F1] px-2.5 py-1 border border-[#14161A] font-bold text-[9px] uppercase tracking-wider mb-4">
                <CheckCircle2 size={11} />
                <span>WEBMCP SPATIAL TOOLS</span>
              </div>

              <h4 className="font-extrabold text-base text-[#14161A] mb-1.5">Direct Canvas Execution</h4>
              <p className="text-xs text-[#14161A]/80 leading-relaxed font-medium mb-5">
                AI calls structured browser tools, mutating element coordinates and spacing live.
              </p>

              <div className="border-t border-[#D8D5CC] pt-4 space-y-2.5 mt-auto text-xs">
                <div className="flex items-start gap-2 text-[#14161A]">
                  <Check size={14} className="text-[#2F7A5C] shrink-0 mt-0.5 font-bold" />
                  <span>Structured tools: <code className="bg-[#F6F5F1] border border-[#14161A] px-1.5 py-0.5 font-bold text-[11px]">flagIssue</code>, <code className="bg-[#F6F5F1] border border-[#14161A] px-1.5 py-0.5 font-bold text-[11px]">resizeElement</code></span>
                </div>
                <div className="flex items-start gap-2 text-[#14161A]">
                  <Check size={14} className="text-[#2F7A5C] shrink-0 mt-0.5 font-bold" />
                  <span>Exact coordinate inspection via <code className="bg-[#F6F5F1] border border-[#14161A] px-1.5 py-0.5 font-bold text-[11px]">getCanvasState</code></span>
                </div>
                <div className="flex items-start gap-2 text-[#14161A]">
                  <Check size={14} className="text-[#2F7A5C] shrink-0 mt-0.5 font-bold" />
                  <span>Changes reflow with sub-pixel precision</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Closing CTA Box */}
        <section className="w-full bg-white border-2 border-[#14161A] shadow-[4px_4px_0_#14161A] p-8 sm:p-12 text-center flex flex-col items-center">
          <h3 className="text-xl sm:text-3xl font-extrabold text-[#14161A] mb-3">
            Ready to review your layout?
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7280] mb-7 max-w-md mx-auto font-medium">
            Open the workspace, place your components, and let the AI critique and reflow your design in real time.
          </p>
          <Link href="/workspace" className="neo-btn-primary text-xs sm:text-sm px-8 py-3.5 min-h-[48px] inline-flex">
            <span>Launch Interactive Workspace</span>
            <ArrowRight size={14} />
          </Link>
        </section>

        {/* 7. Footer Bar */}
        <footer className="w-full bg-[#F6F5F1] border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] px-6 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3.5 text-xs text-[#6B7280]">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#14161A]">CRIT STUDIO</span>
            <span className="text-[#14161A] font-bold">•</span>
            <span>WebMCP Challenge 2026</span>
          </div>

          <div className="flex items-center gap-3 font-semibold text-[#14161A]">
            <span>Next.js 16 + TypeScript + Zustand</span>
            <span className="text-[#D8D5CC]">|</span>
            <span className="border border-[#14161A] bg-[#F2C94C] px-2 py-0.5 text-[10px] font-extrabold shadow-[1px_1px_0_#14161A]">
              6 TOOLS REGISTERED
            </span>
          </div>
        </footer>

      </main>
    </div>
  );
}
