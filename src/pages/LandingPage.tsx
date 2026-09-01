import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#17181A] font-sans">
      {/* Slim Editorial Nav Header */}
      <header className="max-w-6xl mx-auto px-6 py-5 border-b border-[#D8D5CC] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-lg tracking-tight">CRIT STUDIO</span>
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
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-block bg-[#EBE8E0] border border-[#D8D5CC] text-[11px] font-semibold uppercase tracking-wider text-[#17181A] px-3 py-1 mb-6">
          WebMCP Challenge 2026 Submission
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#17181A] leading-tight mb-6 max-w-3xl mx-auto">
          Give your AI agent hands, not just words.
        </h1>

        <p className="text-base md:text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed mb-8">
          Crit Studio exposes design canvases as WebMCP tools so AI agents can flag, drag, resize, and rebalance UI issues live — not describe them in chat.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            to="/workspace"
            className="bg-[#17181A] hover:bg-[#262626] text-white text-sm font-semibold px-6 py-3 border border-[#17181A] flex items-center gap-2 transition-colors"
          >
            <span>Open Interactive Workspace</span>
            <ArrowRight size={15} />
          </Link>

          <a
            href="#how-it-works"
            className="text-xs font-semibold text-[#17181A] underline hover:text-[#6B7280] transition-colors"
          >
            See How It Works
          </a>
        </div>

        {/* Realistic Canvas Preview Frame */}
        <div className="relative border border-[#D8D5CC] bg-white p-2 max-w-4xl mx-auto shadow-sm">
          <div className="h-7 px-3 bg-[#F6F5F1] border-b border-[#D8D5CC] flex items-center justify-between text-[11px] text-[#6B7280]">
            <span className="font-semibold text-[#17181A]">MANUSCRIPT CANVAS // PROOFREADING_PREVIEW</span>
            <span>800 × 580 px</span>
          </div>

          <div className="relative h-[340px] bg-[#F6F5F1] border border-[#D8D5CC] overflow-hidden p-6 text-left">
            {/* Nav mockup */}
            <div className="flex items-center gap-6 border-b border-[#D8D5CC] pb-3 mb-6">
              <span className="font-extrabold text-sm text-[#17181A]">ACME UI</span>
              <span className="text-xs text-[#17181A]">Products</span>
              <span className="text-xs text-[#17181A]">Solutions</span>
              <span className="text-xs text-[#17181A]">Enterprise</span>
            </div>

            {/* Hero content mockup */}
            <div className="max-w-md">
              <h2 className="text-2xl font-bold text-[#cbd5e1] mb-2 leading-tight relative">
                The All-In-One Platform for Modern Teams
                {/* SVG Proofreader Circle Mark */}
                <svg className="absolute -inset-2 w-[110%] h-[130%] pointer-events-none overflow-visible">
                  <path
                    d="M 10 25 C 10 5, 420 5, 420 25 C 420 45, 10 45, 10 25"
                    fill="none"
                    stroke="#B3261E"
                    strokeWidth="1.8"
                    strokeDasharray="4 1"
                  />
                  <path
                    d="M 420 25 Q 450 15 480 35"
                    fill="none"
                    stroke="#B3261E"
                    strokeWidth="1.2"
                    strokeDasharray="3 2"
                  />
                </svg>
              </h2>
              <p className="text-xs text-[#6B7280] mb-4">
                Streamline team workflows and automate visual QA checks.
              </p>
              <div className="inline-block bg-[#17181A] text-white text-xs px-3 py-1.5 font-bold">
                Start Free Trial -&gt;
              </div>
            </div>

            {/* Handwritten Margin Note Overlay */}
            <div className="absolute right-8 top-20 max-w-[220px]">
              <p className="font-sans text-xs font-semibold text-[#B3261E] border-l-2 border-[#B3261E] pl-2">
                [Proof Mark] Low WCAG contrast ratio (1.4:1). Faint gray text on paper fails accessibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-16 border-t border-[#D8D5CC]">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#17181A] mb-3">
            How Crit Studio Works
          </h2>
          <p className="text-sm text-[#6B7280] max-w-lg mx-auto">
            A 3-step collaborative design review workflow powered by WebMCP tool calling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 border border-[#D8D5CC]">
            <div className="w-8 h-8 bg-[#17181A] text-white flex items-center justify-center font-bold text-sm mb-4">
              1
            </div>
            <h3 className="font-bold text-base text-[#17181A] mb-2">Build or Edit a Mockup</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Place headings, body text, buttons, and blocks manually on the canvas using the Figma-style component toolbox.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#D8D5CC]">
            <div className="w-8 h-8 bg-[#17181A] text-white flex items-center justify-center font-bold text-sm mb-4">
              2
            </div>
            <h3 className="font-bold text-base text-[#17181A] mb-2">Talk to Embedded AI</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Ask natural questions in the docked chat panel: "What's wrong with this?", "Is the CTA button accessible?", or "Fix nav spacing."
            </p>
          </div>

          <div className="bg-white p-6 border border-[#D8D5CC]">
            <div className="w-8 h-8 bg-[#17181A] text-white flex items-center justify-center font-bold text-sm mb-4">
              3
            </div>
            <h3 className="font-bold text-base text-[#17181A] mb-2">Watch Live Execution</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Watch proofreader marks drop in redline ink, touch targets resize, and layouts reflow smoothly in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Why WebMCP Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-[#D8D5CC] bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#17181A] mb-4">
            Why WebMCP?
          </h2>
          <p className="text-sm text-[#6B7280] leading-relaxed mb-8">
            Every traditional AI design tool takes a screenshot and writes a paragraph of text: "Your CTA button needs more padding." You still have to translate words into pixels yourself. WebMCP lets the browser expose structured canvas tools (<code className="bg-[#F6F5F1] px-1.5 py-0.5 border border-[#D8D5CC]">navigator.modelContext.registerTool</code>) directly to the AI agent. The agent doesn't guess pixel coordinates from screenshots — it reads exact state and acts with instant precision.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-[#F6F5F1] border border-[#D8D5CC]">
              <span className="font-bold text-xs text-[#B3261E] block mb-1">Traditional Chat / Vision</span>
              <p className="text-xs text-[#6B7280]">
                Chatbots describe problems in paragraphs. Vision models approximate clicks slowly and unreliably.
              </p>
            </div>

            <div className="p-4 bg-[#F6F5F1] border border-[#D8D5CC]">
              <span className="font-bold text-xs text-[#3D6B52] block mb-1">WebMCP Spatial Tools</span>
              <p className="text-xs text-[#6B7280]">
                Agent executes structured canvas operations (flagIssue, moveElement, suggestSpacing) directly in page JS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-[#D8D5CC] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs text-[#6B7280]">
          <span className="font-semibold text-[#17181A]">Crit Studio</span> — OpenAI WebMCP Challenge 2026
        </div>

        <Link
          to="/workspace"
          className="bg-[#17181A] hover:bg-[#262626] text-white text-xs font-semibold px-5 py-2.5 border border-[#17181A] flex items-center gap-1.5"
        >
          <span>Launch Workspace</span>
          <ArrowRight size={13} />
        </Link>
      </footer>
    </div>
  );
};

export default LandingPage;
