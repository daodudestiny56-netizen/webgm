import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#17181A] font-sans overflow-x-hidden flex flex-col">
      {/* Slim Header Bar with 44px+ touch target */}
      <header className="w-full border-b border-[#D8D5CC] bg-[#F6F5F1] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-base tracking-tight text-[#17181A]">CRIT STUDIO</span>
            <span className="text-xs text-[#6B7280] border-l border-[#D8D5CC] pl-3 hidden sm:inline">
              WebMCP Design Canvas Engine
            </span>
          </div>

          <Link
            to="/workspace"
            className="editorial-btn editorial-btn-primary min-h-[44px] min-w-[44px] text-xs font-semibold flex items-center justify-center gap-1.5 px-3"
          >
            <span>Launch Workspace</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-8 text-center">
        <div className="inline-block bg-[#EBE8E0] border border-[#D8D5CC] text-[11px] font-semibold tracking-wider text-[#17181A] px-3 py-1 mb-4 uppercase">
          WebMCP Challenge 2026 Submission
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#17181A] leading-tight mb-4 max-w-3xl mx-auto">
          Give your AI agent hands, not just words.
        </h1>

        <p className="text-xs sm:text-base text-[#6B7280] max-w-xl mx-auto leading-relaxed mb-6">
          Crit Studio exposes design canvases as WebMCP tools so AI agents can flag, drag, resize, and rebalance UI issues live — not describe them in chat.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <Link
            to="/workspace"
            className="bg-[#17181A] hover:bg-[#262626] text-white text-xs font-semibold px-5 py-3 border border-[#17181A] flex items-center gap-2 transition-colors min-h-[44px]"
          >
            <span>Open Interactive Workspace</span>
            <ArrowRight size={14} />
          </Link>

          <a
            href="#how-it-works"
            className="text-xs font-semibold text-[#17181A] hover:text-[#6B7280] transition-colors border-b border-[#17181A] pb-0.5 min-h-[44px] flex items-center"
          >
            See How It Works
          </a>
        </div>

        {/* Self-Contained Aspect-Ratio Canvas Preview Box (Fix 1: Zero Section Overlap) */}
        <div className="w-full border border-[#D8D5CC] bg-white p-2 max-w-3xl mx-auto text-left shadow-sm mb-12">
          <div className="h-7 px-3 bg-[#F6F5F1] border-b border-[#D8D5CC] flex items-center justify-between text-[11px] text-[#6B7280] font-mono">
            <span className="font-semibold text-[#17181A] truncate">PROOFREADING_PREVIEW</span>
            <span>800 × 580 px</span>
          </div>

          <div className="relative w-full aspect-[800/440] bg-[#F6F5F1] border border-[#D8D5CC] p-4 sm:p-6 overflow-hidden">
            {/* Nav mockup */}
            <div className="flex items-center gap-4 sm:gap-6 border-b border-[#D8D5CC] pb-2 sm:pb-3 mb-4 sm:mb-6 font-sans text-xs">
              <span className="font-extrabold text-[#17181A]">ACME UI</span>
              <span className="text-[#17181A]">Products</span>
              <span className="text-[#17181A]">Solutions</span>
              <span className="text-[#17181A] hidden sm:inline">Enterprise</span>
            </div>

            {/* Hero content mockup */}
            <div className="max-w-xs sm:max-w-md relative">
              <div className="relative inline-block mb-2 sm:mb-3">
                <h2 className="text-base sm:text-xl md:text-2xl font-bold text-[#cbd5e1] leading-tight">
                  The All-In-One Platform for Modern Teams
                </h2>

                {/* SVG Proofreader Pen Circle around heading */}
                <svg className="absolute -inset-1 sm:-inset-2 w-[108%] h-[120%] pointer-events-none overflow-visible">
                  <ellipse
                    cx="50%"
                    cy="50%"
                    rx="48%"
                    ry="45%"
                    fill="none"
                    stroke="#B3261E"
                    strokeWidth="1.8"
                    strokeDasharray="4 1"
                  />
                </svg>
              </div>

              <p className="text-[10px] sm:text-xs text-[#6B7280] mb-3">
                Streamline team workflows, track design iterations, and automate visual QA checks.
              </p>

              <div className="inline-block bg-[#17181A] text-white text-[10px] sm:text-xs px-2.5 py-1 font-bold">
                Start Free Trial -&gt;
              </div>
            </div>

            {/* Margin Note Overlay */}
            <div className="hidden sm:block absolute right-4 top-12 max-w-[200px] bg-white/95 p-2 border border-[#B3261E]/40 shadow-sm">
              <p className="font-sans text-[11px] font-semibold text-[#B3261E] leading-tight">
                [Proof Mark] Low WCAG contrast ratio (1.4:1). Faint gray text on paper fails accessibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section (Starts cleanly below preview with zero overlap) */}
      <section id="how-it-works" className="w-full bg-[#F6F5F1] py-12 border-t border-[#D8D5CC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#17181A] mb-2">
              How Crit Studio Works
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] max-w-lg mx-auto">
              A 3-step collaborative design review workflow powered by WebMCP tool calling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white p-5 border border-[#D8D5CC]">
              <div className="w-7 h-7 bg-[#17181A] text-white flex items-center justify-center font-bold text-xs mb-3">
                1
              </div>
              <h3 className="font-bold text-sm text-[#17181A] mb-1.5">Build or Edit a Mockup</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Place headings, text blocks, buttons, and graphics manually on the canvas using the Figma-style component toolbox.
              </p>
            </div>

            <div className="bg-white p-5 border border-[#D8D5CC]">
              <div className="w-7 h-7 bg-[#17181A] text-white flex items-center justify-center font-bold text-xs mb-3">
                2
              </div>
              <h3 className="font-bold text-sm text-[#17181A] mb-1.5">Talk to Embedded AI</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Ask natural questions in the docked chat panel: "What's wrong with this?", "Is the CTA accessible?", or "Fix nav spacing."
              </p>
            </div>

            <div className="bg-white p-5 border border-[#D8D5CC]">
              <div className="w-7 h-7 bg-[#17181A] text-white flex items-center justify-center font-bold text-xs mb-3">
                3
              </div>
              <h3 className="font-bold text-sm text-[#17181A] mb-1.5">Watch Live Execution</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Watch proofreader marks drop in redline ink, touch targets resize, and layouts reflow smoothly in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why WebMCP Section */}
      <section className="w-full bg-white py-12 border-t border-[#D8D5CC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#17181A] mb-3">
              Why WebMCP?
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed mb-6">
              Every traditional AI design tool takes a screenshot and writes a paragraph of text: "Your CTA button needs more padding." You still have to translate words into pixels yourself. WebMCP lets the browser expose structured canvas tools (<code className="bg-[#F6F5F1] px-1.5 py-0.5 border border-[#D8D5CC] font-mono text-[11px]">navigator.modelContext.registerTool</code>) directly to the AI agent. The agent reads exact canvas state and acts with direct spatial precision.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="p-4 bg-[#F6F5F1] border border-[#D8D5CC]">
                <span className="font-bold text-xs text-[#B3261E] block mb-1">Traditional Chat / Vision</span>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Chatbots describe problems in text. Vision models approximate clicks slowly and unreliably.
                </p>
              </div>

              <div className="p-4 bg-[#F6F5F1] border border-[#D8D5CC]">
                <span className="font-bold text-xs text-[#3D6B52] block mb-1">WebMCP Spatial Tools</span>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Agent executes structured canvas operations (flagIssue, moveElement, suggestSpacing) directly in page JS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-[#D8D5CC] bg-[#F6F5F1] py-6 mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#17181A]">Crit Studio</span>
            <span>• OpenAI WebMCP Challenge 2026</span>
          </div>

          <Link
            to="/workspace"
            className="bg-[#17181A] hover:bg-[#262626] text-white text-xs font-semibold px-4 py-2 border border-[#17181A] flex items-center gap-1.5 transition-colors min-h-[44px]"
          >
            <span>Launch Workspace</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
