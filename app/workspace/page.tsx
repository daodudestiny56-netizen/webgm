'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCanvasStore } from '@/store/useCanvasStore';
import { LeftToolbox } from '@/components/Workspace/LeftToolbox';
import { Canvas } from '@/components/Canvas/Canvas';
import { RightDock } from '@/components/Workspace/RightDock';
import { AgentSimulator } from '@/components/AgentPanel/AgentSimulator';
import { Footer } from '@/components/Footer/Footer';
import { registerWebMCPTools } from '@/webmcp/registerWebMCPTools';
import { RotateCcw, Columns, Terminal, Home, Layout, Sliders, MessageSquare, Bot } from 'lucide-react';

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
    <div className="flex flex-col h-screen w-full max-w-full bg-[#F6F5F1] font-sans text-xs overflow-hidden">
      {/* Top Bar */}
      <header className="h-11 px-3 sm:px-4 bg-[#F6F5F1] border-b-2 border-[#14161A] flex items-center justify-between font-sans select-none shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="text-[#14161A] hover:underline flex items-center gap-1.5 font-extrabold text-xs sm:text-sm tracking-tight"
          >
            <Home size={14} />
            <span className="hidden xs:inline">CRIT STUDIO</span>
          </Link>
          <span className="text-[#14161A] font-bold hidden sm:inline">/</span>
          <span className="font-bold text-xs text-[#14161A] truncate max-w-[120px] sm:max-w-none">
            ACME_PROTOTYPE.fig
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button onClick={loadExampleLayout} className="neo-btn text-xs" title="Load sample layout">
            <span className="hidden sm:inline">Load Sample</span>
            <span className="sm:hidden">Sample</span>
          </button>

          <button onClick={resetToFlawedMockup} className="neo-btn text-xs" title="Reset baseline">
            <RotateCcw size={12} />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={toggleBeforeAfter}
            className={`neo-btn text-xs ${isBeforeAfterMode ? 'bg-[#F2C94C]' : ''}`}
          >
            <Columns size={12} />
            <span className="hidden sm:inline">{isBeforeAfterMode ? 'Exit Diff' : 'Diff'}</span>
          </button>

          <button onClick={() => setIsSimulatorOpen((prev) => !prev)} className="neo-btn text-xs">
            <Terminal size={12} />
            <span className="hidden sm:inline">{isSimulatorOpen ? 'Hide Console' : 'Console'}</span>
          </button>
        </div>
      </header>

      {/* WebMCP Tool Log Console Drawer */}
      {isSimulatorOpen && (
        <div className="p-2 border-b-2 border-[#14161A] bg-[#14161A] text-white shrink-0 max-h-60 overflow-y-auto">
          <AgentSimulator isOpen={isSimulatorOpen} onClose={() => setIsSimulatorOpen(false)} />
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Desktop / Tablet Left Toolbox */}
        {!isMobile && <LeftToolbox isCollapsed={isTablet} />}

        {/* Mobile View Switching */}
        {isMobile ? (
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {mobileTab === 'canvas' && (
              <main className="flex-1 flex flex-col p-1 overflow-hidden relative">
                <Canvas />
                {/* Floating AI Chat Trigger on Mobile */}
                <button
                  onClick={() => setMobileTab('dock')}
                  className="absolute bottom-4 right-4 neo-btn-primary p-3 flex items-center gap-1.5 z-40 text-xs font-bold cursor-pointer"
                >
                  <Bot size={16} />
                  <span>AI Assistant</span>
                </button>
              </main>
            )}

            {mobileTab === 'toolbox' && (
              <div className="flex-1 overflow-y-auto">
                <LeftToolbox isCollapsed={false} />
              </div>
            )}

            {mobileTab === 'dock' && (
              <div className="flex-1 overflow-hidden">
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
            <main className="flex-1 flex flex-col overflow-hidden p-2">
              <Canvas />
            </main>

            <RightDock />
          </>
        )}
      </div>

      {/* Minimal Footer */}
      {!isMobile && <Footer />}
    </div>
  );
}
