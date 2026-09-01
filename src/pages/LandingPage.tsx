import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#17181A] font-sans overflow-x-hidden">
      {/* Header Bar */}
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
            className="editorial-btn editorial-btn-primary text-xs font-semibold flex items-center gap-1.5"
          >
            <span>Launch Workspace</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-10 text-center">
        <div className="inline-block bg-[#EBE8E0] border border-[#D8D5CC] text-[11px] font-semibold tracking-wider text-[#17181A] px-3 py-1 mb-5 uppercase">
          WebMCP Challenge 2026 Submission
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#17181A] leading-tight mb-5 max-w-3xl mx-auto">
          Give your AI agent hands, not just words.
        </h1>

        <p className="text-sm sm:text-base text-[#6B7280] max-w-2xl mx-auto leading-relaxed mb-8">
          Crit Studio exposes design canvases as WebMCP tools so AI agents can flag, drag, resize, and rebalance UI issues live — not describe them in chat.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Link
            to="/workspace"
            className="bg-[#17181A] hover:bg-[#262626] text-white text-xs font-semibold px-5 py-2.5 border border-[#17181A] flex items-center gap-2 transition-colors"
          >
            <span>Open Interactive Workspace</span>
            <ArrowRight size={14} />
          </Link>

          <a
            href="#how-it-works"
            className="text-xs font-semibold text-[#17181A] hover:text-[#6B7280] transition-colors border-b border-[#17181A] pb-0.5"
          >
            See How It Works
          </a>
        </div>

        {/* Canvas Preview Box */}
        <div className="border border-[#D8D5CC] bg-white p-2 max-w-3xl mx-auto text-left shadow-sm">
          <div className="h-8 px-3 bg-[#F6F5F1] border-b border-[#D8D5CC] flex items-center justify-between text-[11px] text-[#6B7280] font-mono">
            <span className="font-semibold text-[#17181A]">MANUSCRIPT CANVAS // PROOFREADING_PREVIEW</span>
            <span>800 × 580 px</span>
          </div>

          <div className="relative min-h-[300px] bg-[#F6F5F1] border border-[#D8D5CC] p-6 overflow-hidden">
            {/* Nav mockup */}
            <div className="flex items-center gap-6 border-b border-[#D8D5CC] pb-3 mb-6 font-sans">
              <span className="font-extrabold text-sm text-[#17181A]">ACME UI</span>
              <span className="text-xs text-[#17181A]">Products</span>
              <span className="text-xs text-[#17181A]">Solutions</span>
              <span className="text-xs text-[#17181A]">Enterprise</span>
            </div>

            {/* Hero content mockup */}
            <div className="max-w-md relative">
              <div className="relative inline-block mb-3">
                <h2 className="text-xl sm:text-2xl font-bold text-[#cbd5e1] leading-tight">
                  The All-In-One Platform for Modern Teams
                </h2>

                {/* SVG Proofreader Pen Circle around heading */}
                <svg className="absolute -inset-2 w-[108%] h-[120%] pointer-events-none overflow-visible">
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
                  <path
                    d="M 95% 50% Q 105% 40% 115% 60%"
                    fill="none"
                    stroke="#B3261E"
                    strokeWidth="1.2"
                    strokeDasharray="3 2"
                  />
                </svg>
              </div>

              <p className="text-xs text-[#6B7280] mb-4">
                Streamline team workflows, track design iterations, and automate visual QA checks.
              </p>

              <div className="inline-block bg-[#17181A] text-white text-xs px-3 py-1.5 font-bold">
                Start Free Trial -&gt;
              </div>
            </div>

            {/* Margin Note Overlay (Positioned cleanly) */}
            <div className="hidden sm:block absolute right-6 top-16 max-w-[210px] bg-white/90 p-2.5 border border-[#B3261E]/40 rounded-none shadow-sm">
              <p className="font-sans text-xs font-semibold text-[#B3261E] leading-snug">
                [Proof Mark] Low WCAG contrast ratio (1.4:1). Faint gray text on paper fails accessibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-4xl mx-auto px-4 sm:px-6 py-14 border-t border-[#D8D5CC]">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17181A] mb-2">
            How Crit Studio Works
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] max-w-lg mx-auto">
            A 3-step collaborative design review workflow powered by WebMCP tool calling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-5 border border-[#D8D5CC] flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 bg-[#17181A] text-white flex items-center justify-center font-bold text-xs mb-3">
                1
              </div>
              <h3 className="font-bold text-sm text-[#17181A] mb-1.5">Build or Edit a Mockup</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Place headings, text blocks, buttons, and graphics manually on the canvas using the Figma-style component toolbox.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 border border-[#D8D5CC] flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 bg-[#17181A] text-white flex items-center justify-center font-bold text-xs mb-3">
                2
              </div>
              <h3 className="font-bold text-sm text-[#17181A] mb-1.5">Talk to Embedded AI</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Ask natural questions in the docked chat panel: "What's wrong with this?", "Is the CTA accessible?", or "Fix nav spacing."
              </p>
            </div>
          </div>

          <div className="bg-white p-5 border border-[#D8D5CC] flex flex-col justify-between">
            <div>
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
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14 border-t border-[#D8D5CC] bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17181A] mb-3">
            Why WebMCP?
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed mb-8">
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
      </section>

      {/* Footer Call to Action */}
      <footer className="w-full border-t border-[#D8D5CC] bg-[#F6F5F1] py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#17181A]">Crit Studio</span>
            <span>• OpenAI WebMCP Challenge 2026</span>
          </div>

          <Link
            to="/workspace"
            className="bg-[#17181A] hover:bg-[#262626] text-white text-xs font-semibold px-4 py-2 border border-[#17181A] flex items-center gap-1.5 transition-colors"
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
