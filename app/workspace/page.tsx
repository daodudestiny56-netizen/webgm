'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCanvasStore } from '@/store/useCanvasStore';
import { LeftToolbox } from '@/components/Workspace/LeftToolbox';
import { Canvas } from '@/components/Canvas/Canvas';
import { RightDock } from '@/components/Workspace/RightDock';
import { AgentSimulator } from '@/components/AgentPanel/AgentSimulator';
import { registerWebMCPTools } from '@/webmcp/registerWebMCPTools';
import { RotateCcw, Columns, Terminal, Home, Layout, Sliders, MessageSquare, Bot, Sparkles } from 'lucide-react';

export default function WorkspacePage() {
  const { resetToFlawedMockup, toggleBeforeAfter, isBeforeAfterMode, loadExampleLayout } = useCanvasStore();
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<'canvas' | 'toolbox' | 'dock'>('canvas');
  const [windowWidth, setWindowWidth] = useState<number>(1280);

  // Client-side only WebMCP tool registration on mount
  useEffect(() => {
    registerWebMCPTools();
  }, []);

  // Safe window resize handling
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 640;
  const isTablet = windowWidth > 640 && windowWidth < 1024;

  return (
    <div className="workspace-outer-frame h-screen w-screen max-w-full bg-[#F6F5F1] p-3 sm:p-4 md:p-5 lg:p-6 overflow-hidden flex flex-col box-border font-sans text-xs select-none">
      {/* Framed Workspace Shell Unit with Neobrutalist border & offset shadow */}
      <div className="flex-1 min-h-0 flex flex-col w-full h-full border-2 border-[#14161A] shadow-[4px_4px_0_#14161A] bg-[#F6F5F1] overflow-hidden relative">
        {/* Top Professional App Bar */}
        <header className="h-12 px-4 bg-[#F6F5F1] border-b-2 border-[#14161A] flex items-center justify-between font-sans shrink-0 z-30">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-[#14161A] flex items-center gap-2 font-extrabold text-sm tracking-tight hover:opacity-80 transition-opacity"
            >
              <Home size={15} />
              <span className="font-extrabold text-sm tracking-tight text-[#14161A]">CRIT STUDIO</span>
            </Link>
            <span className="text-[#14161A] font-bold">/</span>
            <div className="flex items-center gap-2 bg-white border-2 border-[#14161A] shadow-[1.5px_1.5px_0_#14161A] px-2.5 py-0.5 font-bold text-xs">
              <span className="text-[#14161A] font-extrabold">ACME_PROTOTYPE.fig</span>
              <span className="w-2 h-2 rounded-full bg-[#2F7A5C]" />
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={loadExampleLayout}
              className="neo-btn text-xs px-3 py-1.5 flex items-center gap-1.5 font-bold hover:bg-[#F2C94C]"
              title="Load sample layout"
            >
              <Sparkles size={13} />
              <span className="hidden sm:inline">Load Sample</span>
            </button>

            <button
              onClick={resetToFlawedMockup}
              className="neo-btn text-xs px-3 py-1.5 flex items-center gap-1.5 font-bold"
              title="Reset baseline"
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={toggleBeforeAfter}
              className={`neo-btn text-xs px-3 py-1.5 flex items-center gap-1.5 font-bold ${
                isBeforeAfterMode ? 'bg-[#F2C94C]' : ''
              }`}
            >
              <Columns size={13} />
              <span className="hidden sm:inline">{isBeforeAfterMode ? 'Exit Diff' : 'Diff Mode'}</span>
            </button>

            <button
              onClick={() => setIsSimulatorOpen((prev) => !prev)}
              className={`neo-btn text-xs px-3 py-1.5 flex items-center gap-1.5 font-bold ${
                isSimulatorOpen ? 'bg-[#14161A] text-white' : ''
              }`}
            >
              <Terminal size={13} />
              <span className="hidden sm:inline">{isSimulatorOpen ? 'Hide Console' : 'Console'}</span>
            </button>
          </div>
        </header>

        {/* WebMCP Tool Log Console Drawer */}
        {isSimulatorOpen && (
          <div className="p-3 border-b-2 border-[#14161A] bg-[#14161A] text-white shrink-0 max-h-64 overflow-y-auto">
            <AgentSimulator isOpen={isSimulatorOpen} onClose={() => setIsSimulatorOpen(false)} />
          </div>
        )}

        {/* Main Workspace 3-Panel Layout */}
        <div className="flex-1 min-h-0 flex overflow-hidden relative">
          {/* Desktop / Tablet Left Toolbox */}
          {!isMobile && <LeftToolbox isCollapsed={isTablet} />}

          {/* Mobile View Switching */}
          {isMobile ? (
            <div className="flex-1 min-h-0 flex flex-col overflow-hidden relative">
              {mobileTab === 'canvas' && (
                <main className="flex-1 min-h-0 flex flex-col p-1 overflow-hidden relative">
                  <Canvas />
                  {/* Floating AI Chat Trigger on Mobile */}
                  <button
                    onClick={() => setMobileTab('dock')}
                    className="absolute bottom-4 right-4 neo-btn-primary p-3.5 flex items-center gap-2 z-40 text-xs font-bold cursor-pointer shadow-[3px_3px_0_#14161A]"
                  >
                    <Bot size={16} />
                    <span>AI Assistant</span>
                  </button>
                </main>
              )}

              {mobileTab === 'toolbox' && (
                <div className="flex-1 min-h-0 overflow-y-auto">
                  <LeftToolbox isCollapsed={false} />
                </div>
              )}

              {mobileTab === 'dock' && (
                <div className="flex-1 min-h-0 overflow-hidden">
                  <RightDock />
                </div>
              )}

              {/* Mobile Bottom Tab Bar */}
              <div className="h-12 bg-[#F6F5F1] border-t-2 border-[#14161A] flex items-center justify-around font-sans shrink-0 z-50">
                <button
                  onClick={() => setMobileTab('canvas')}
                  className={`flex flex-col items-center justify-center flex-1 h-full text-[10px] font-bold ${
                    mobileTab === 'canvas' ? 'text-[#14161A] bg-[#F2C94C] border-t-2 border-[#14161A]' : 'text-[#6B7280]'
                  }`}
                >
                  <Layout size={14} />
                  <span>Canvas</span>
                </button>

                <button
                  onClick={() => setMobileTab('toolbox')}
                  className={`flex flex-col items-center justify-center flex-1 h-full text-[10px] font-bold ${
                    mobileTab === 'toolbox' ? 'text-[#14161A] bg-[#F2C94C] border-t-2 border-[#14161A]' : 'text-[#6B7280]'
                  }`}
                >
                  <Sliders size={14} />
                  <span>Toolbox</span>
                </button>

                <button
                  onClick={() => setMobileTab('dock')}
                  className={`flex flex-col items-center justify-center flex-1 h-full text-[10px] font-bold ${
                    mobileTab === 'dock' ? 'text-[#14161A] bg-[#F2C94C] border-t-2 border-[#14161A]' : 'text-[#6B7280]'
                  }`}
                >
                  <MessageSquare size={14} />
                  <span>AI Chat</span>
                </button>
              </div>
            </div>
          ) : (
            /* Desktop & Tablet Layout */
            <>
              <main className="flex-1 min-h-0 flex flex-col overflow-hidden p-2">
                <Canvas />
              </main>

              <RightDock />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
