import React, { useState } from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { registeredToolsMap } from '../../webmcp/registerWebMCPTools';
import { RotateCcw, Columns, Terminal, Cpu, PlayCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeaderProps {
  onToggleSimulator: () => void;
  isSimulatorOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSimulator, isSimulatorOpen }) => {
  const { resetToFlawedMockup, toggleBeforeAfter, isBeforeAfterMode } = useCanvasStore();
  const [isSimulatingDemo, setIsSimulatingDemo] = useState(false);
  const [demoStep, setDemoStep] = useState<string | null>(null);

  // Rehearse the exact 5-Step Demo Script specified in PRD
  const runFullDemoScenario = async () => {
    if (isSimulatingDemo) return;
    setIsSimulatingDemo(true);

    try {
      // Step 1: Reset to flawed mockup
      setDemoStep('1. Loading flawed mockup...');
      resetToFlawedMockup();
      await new Promise((r) => setTimeout(r, 600));

      // Step 2: Call getCanvasState
      setDemoStep('2. Agent calling getCanvasState()...');
      const getCanvasTool = registeredToolsMap.get('getCanvasState');
      if (getCanvasTool) await getCanvasTool.execute({});
      await new Promise((r) => setTimeout(r, 800));

      // Step 3: Flag Heading & CTA Issues
      setDemoStep('3. Agent flagging low contrast & cramped CTA...');
      const flagTool = registeredToolsMap.get('flagIssue');
      if (flagTool) {
        await flagTool.execute({
          id: 'main-heading',
          severity: 'high',
          reason: 'Low contrast ratio (1.4:1). Faint gray text on paper background fails WCAG 2.1 AA.',
        });
        await new Promise((r) => setTimeout(r, 700));
        await flagTool.execute({
          id: 'cta-button',
          severity: 'medium',
          reason: 'Cramped touch target (110x28px, 11px font). Needs minimum 44px height for accessibility.',
        });
      }
      await new Promise((r) => setTimeout(r, 1000));

      // Step 4: Rebalance Nav Spacing & Align Y
      setDemoStep('4. Agent calling suggestSpacing() & reflowing Nav Bar...');
      const spacingTool = registeredToolsMap.get('suggestSpacing');
      if (spacingTool) {
        await spacingTool.execute({
          ids: ['nav-item-1', 'nav-item-2', 'nav-item-3', 'nav-item-4'],
          gap: 16,
          direction: 'horizontal',
        });
      }
      await new Promise((r) => setTimeout(r, 1000));

      // Step 5: Resize CTA & Fix Heading Contrast
      setDemoStep('5. Agent calling resizeElement() & fixing heading contrast...');
      const resizeTool = registeredToolsMap.get('resizeElement');
      if (resizeTool) {
        await resizeTool.execute({
          id: 'cta-button',
          w: 175,
          h: 46,
        });
      }
      await new Promise((r) => setTimeout(r, 700));

      // Apply heading color update & update font size
      useCanvasStore.getState().updateElement('main-heading', { color: '#17181A' });
      useCanvasStore.getState().updateElement('cta-button', { fontSize: 15 });

      // Step 6: Annotate canvas
      setDemoStep('6. Agent pinning final sticky-note annotation...');
      const annotateTool = registeredToolsMap.get('annotateAt');
      if (annotateTool) {
        await annotateTool.execute({
          x: 520,
          y: 350,
          text: '[Fixed] Reflowed Nav Bar (16px gap), fixed CTA touch target (175x46px), and restored WCAG 15:1 contrast.',
        });
      }

      setDemoStep('Demo Script Complete!');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (err) {
      console.error('Demo simulation error:', err);
    } finally {
      setIsSimulatingDemo(false);
      setTimeout(() => setDemoStep(null), 3000);
    }
  };

  const isWebMCPNative = typeof navigator !== 'undefined' && Boolean(navigator.modelContext);

  return (
    <header className="w-full bg-[#F6F5F1] py-3 border-b border-[#D8D5CC] mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-sans">
      {/* Brand Title */}
      <div className="flex items-center gap-3">
        <h1 className="font-extrabold text-lg tracking-tight text-[#17181A]">CRIT STUDIO</h1>
        <span className="text-xs text-[#6B7280] font-medium border-l border-[#D8D5CC] pl-3">
          WebMCP Design Proofreading // navigator.modelContext
        </span>
        {isWebMCPNative && (
          <span className="text-[11px] font-semibold text-[#3D6B52] bg-[#3D6B52]/10 px-2 py-0.5 border border-[#3D6B52]/30">
            Native Host
          </span>
        )}
      </div>

      {/* Slim Text Links Toolbar */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
        <button onClick={resetToFlawedMockup} className="editorial-btn" title="Reset to initial flawed mockup">
          <RotateCcw size={13} />
          <span>Reset Baseline</span>
        </button>

        <button
          onClick={toggleBeforeAfter}
          className={`editorial-btn ${isBeforeAfterMode ? 'border-b-[#17181A]' : ''}`}
        >
          <Columns size={13} />
          <span>{isBeforeAfterMode ? 'Exit Diff' : 'Before/After Diff'}</span>
        </button>

        <button
          onClick={runFullDemoScenario}
          disabled={isSimulatingDemo}
          className="editorial-btn editorial-btn-primary"
        >
          {isSimulatingDemo ? (
            <>
              <Cpu size={13} className="animate-spin" />
              <span>{demoStep || 'Executing...'}</span>
            </>
          ) : (
            <>
              <PlayCircle size={13} />
              <span>Run Agent Script (1-Click)</span>
            </>
          )}
        </button>

        <button onClick={onToggleSimulator} className="editorial-btn">
          <Terminal size={13} />
          <span>{isSimulatorOpen ? 'Hide Tool Logs' : 'WebMCP Console'}</span>
        </button>
      </div>
    </header>
  );
};
