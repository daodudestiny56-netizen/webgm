import React, { useState } from 'react';
import { useCanvasStore } from '../store/useCanvasStore';
import { LeftToolbox } from '../components/Workspace/LeftToolbox';
import { Canvas } from '../components/Canvas/Canvas';
import { RightDock } from '../components/Workspace/RightDock';
import { AgentSimulator } from '../components/AgentPanel/AgentSimulator';
import { Footer } from '../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { RotateCcw, Columns, Terminal, Home } from 'lucide-react';

export const WorkspacePage: React.FC = () => {
  const { resetToFlawedMockup, toggleBeforeAfter, isBeforeAfterMode, loadExampleLayout } = useCanvasStore();
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  const isWebMCPNative = typeof navigator !== 'undefined' && Boolean(navigator.modelContext);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#F6F5F1] font-sans text-xs overflow-hidden">
      {/* Slim Top Bar */}
      <header className="h-10 px-4 bg-[#F6F5F1] border-b border-[#D8D5CC] flex items-center justify-between font-sans select-none shrink-0">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-[#17181A] hover:underline flex items-center gap-1 font-bold text-sm">
            <Home size={14} />
            <span>CRIT STUDIO</span>
          </Link>
          <span className="text-[#D8D5CC]">/</span>
          <span className="font-semibold text-xs text-[#17181A]">ACME_PROTOTYPE_01.fig</span>
          <span className="text-[10px] font-semibold text-[#3D6B52] bg-[#3D6B52]/10 px-2 py-0.5 border border-[#3D6B52]/30">
            {isWebMCPNative ? 'WebMCP Native' : 'WebMCP Native'}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <button onClick={loadExampleLayout} className="editorial-btn" title="Load sample baseline layout">
            <span>Load Sample</span>
          </button>

          <button onClick={resetToFlawedMockup} className="editorial-btn" title="Reset baseline">
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>

          <button
            onClick={toggleBeforeAfter}
            className={`editorial-btn ${isBeforeAfterMode ? 'border-b-[#17181A]' : ''}`}
          >
            <Columns size={12} />
            <span>{isBeforeAfterMode ? 'Exit Diff' : 'Before/After Diff'}</span>
          </button>

          <button onClick={() => setIsSimulatorOpen((prev) => !prev)} className="editorial-btn">
            <Terminal size={12} />
            <span>{isSimulatorOpen ? 'Hide Console' : 'WebMCP Console'}</span>
          </button>
        </div>
      </header>

      {/* WebMCP Tool Log Console Drawer */}
      {isSimulatorOpen && (
        <div className="p-2 border-b border-[#D8D5CC] bg-[#17181A] text-white shrink-0">
          <AgentSimulator isOpen={isSimulatorOpen} onClose={() => setIsSimulatorOpen(false)} />
        </div>
      )}

      {/* Main 3-Panel Figma Workspace Shell */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Toolbox */}
        <LeftToolbox />

        {/* Center Canvas */}
        <main className="flex-1 flex flex-col overflow-hidden p-2">
          <Canvas />
        </main>

        {/* Right Properties / AI Assistant Dock */}
        <RightDock />
      </div>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
};

export default WorkspacePage;
