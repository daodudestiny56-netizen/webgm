import React, { useState, useEffect } from 'react';
import { useCanvasStore } from '../store/useCanvasStore';
import { LeftToolbox } from '../components/Workspace/LeftToolbox';
import { Canvas } from '../components/Canvas/Canvas';
import { RightDock } from '../components/Workspace/RightDock';
import { AgentSimulator } from '../components/AgentPanel/AgentSimulator';
import { Footer } from '../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { RotateCcw, Columns, Terminal, Home, Layout, Sliders, MessageSquare, Bot } from 'lucide-react';

export const WorkspacePage: React.FC = () => {
  const { resetToFlawedMockup, toggleBeforeAfter, isBeforeAfterMode, loadExampleLayout } = useCanvasStore();
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<'canvas' | 'toolbox' | 'dock'>('canvas');
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1280);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 640;
  const isTablet = windowWidth > 640 && windowWidth < 1024;

  return (
    <div className="flex flex-col h-screen w-screen bg-[#F6F5F1] font-sans text-xs overflow-hidden">
      {/* Slim Top Bar */}
      <header className="h-10 px-3 sm:px-4 bg-[#F6F5F1] border-b border-[#D8D5CC] flex items-center justify-between font-sans select-none shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/" className="text-[#17181A] hover:underline flex items-center gap-1 font-bold text-xs sm:text-sm">
            <Home size={14} />
            <span className="hidden xs:inline">CRIT STUDIO</span>
          </Link>
          <span className="text-[#D8D5CC] hidden sm:inline">/</span>
          <span className="font-semibold text-xs text-[#17181A] truncate max-w-[120px] sm:max-w-none">
            ACME_PROTOTYPE.fig
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={loadExampleLayout} className="editorial-btn text-xs" title="Load sample layout">
            <span className="hidden sm:inline">Load Sample</span>
            <span className="sm:hidden">Sample</span>
          </button>

          <button onClick={resetToFlawedMockup} className="editorial-btn text-xs" title="Reset baseline">
            <RotateCcw size={12} />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={toggleBeforeAfter}
            className={`editorial-btn text-xs ${isBeforeAfterMode ? 'border-b-[#17181A]' : ''}`}
          >
            <Columns size={12} />
            <span className="hidden sm:inline">{isBeforeAfterMode ? 'Exit Diff' : 'Diff'}</span>
          </button>

          <button onClick={() => setIsSimulatorOpen((prev) => !prev)} className="editorial-btn text-xs">
            <Terminal size={12} />
            <span className="hidden sm:inline">{isSimulatorOpen ? 'Hide Console' : 'Console'}</span>
          </button>
        </div>
      </header>

      {/* WebMCP Tool Log Console Drawer */}
      {isSimulatorOpen && (
        <div className="p-2 border-b border-[#D8D5CC] bg-[#17181A] text-white shrink-0 max-h-60 overflow-y-auto">
          <AgentSimulator isOpen={isSimulatorOpen} onClose={() => setIsSimulatorOpen(false)} />
        </div>
      )}

      {/* Main Responsive Workspace Layout */}
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
                  className="absolute bottom-4 right-4 bg-[#17181A] text-white p-3 border border-[#17181A] shadow-md flex items-center gap-1.5 z-40 text-xs font-semibold cursor-pointer"
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
            <div className="h-12 bg-[#F6F5F1] border-t border-[#D8D5CC] flex items-center justify-around font-sans shrink-0 z-50">
              <button
                onClick={() => setMobileTab('canvas')}
                className={`flex flex-col items-center justify-center flex-1 h-full text-[10px] font-medium ${
                  mobileTab === 'canvas' ? 'text-[#17181A] font-bold border-t-2 border-[#17181A]' : 'text-[#6B7280]'
                }`}
              >
                <Layout size={14} />
                <span>Canvas</span>
              </button>

              <button
                onClick={() => setMobileTab('toolbox')}
                className={`flex flex-col items-center justify-center flex-1 h-full text-[10px] font-medium ${
                  mobileTab === 'toolbox' ? 'text-[#17181A] font-bold border-t-2 border-[#17181A]' : 'text-[#6B7280]'
                }`}
              >
                <Sliders size={14} />
                <span>Toolbox</span>
              </button>

              <button
                onClick={() => setMobileTab('dock')}
                className={`flex flex-col items-center justify-center flex-1 h-full text-[10px] font-medium ${
                  mobileTab === 'dock' ? 'text-[#17181A] font-bold border-t-2 border-[#17181A]' : 'text-[#6B7280]'
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
};

export default WorkspacePage;
