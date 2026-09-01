import React from 'react';
import type { FlaggedIssue } from '../../types/canvas';
import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useCanvasStore } from '../../store/useCanvasStore';

interface FlagPinProps {
  flag: FlaggedIssue;
  elementX: number;
  elementY: number;
  elementW: number;
  elementH: number;
  pinX: number;
  pinY: number;
}

export const FlagPin: React.FC<FlagPinProps> = ({
  flag,
  elementX,
  elementY,
  elementW,
  elementH,
  pinX,
  pinY,
}) => {
  const removeFlag = useCanvasStore((state) => state.removeFlag);

  const getSeverityStyle = () => {
    switch (flag.severity) {
      case 'high':
        return {
          bg: '#ff4757',
          color: '#ffffff',
          icon: <AlertTriangle size={13} className="stroke-[2.5]" />,
          label: 'CRITICAL',
          borderColor: '#ff4757',
        };
      case 'medium':
        return {
          bg: '#ff9f1a',
          color: '#1a1a1a',
          icon: <AlertCircle size={13} className="stroke-[2.5]" />,
          label: 'MEDIUM',
          borderColor: '#ff9f1a',
        };
      case 'low':
        return {
          bg: '#eccc68',
          color: '#1a1a1a',
          icon: <Info size={13} className="stroke-[2.5]" />,
          label: 'LOW',
          borderColor: '#eccc68',
        };
    }
  };

  const style = getSeverityStyle();

  return (
    <>
      {/* Target Element Dash Outline */}
      <div
        className="absolute pointer-events-none transition-all duration-300"
        style={{
          left: elementX - 4,
          top: elementY - 4,
          width: elementW + 8,
          height: elementH + 8,
          border: `3px dashed ${style.borderColor}`,
          borderRadius: 6,
          zIndex: 40,
        }}
      />

      {/* Flag Badge Anchored Top-Right of Element (+8px, -12px) */}
      <div
        className="absolute z-50 flex items-center gap-1.5 px-2.5 py-1 rounded border-2 border-black font-mono text-xs font-bold shadow-[2px_2px_0px_#000] cursor-pointer group"
        style={{
          left: pinX,
          top: pinY,
          backgroundColor: style.bg,
          color: style.color,
          transform: 'rotate(-1deg)',
        }}
      >
        {style.icon}
        <span>FLAG: {flag.elementId}</span>

        {/* Hover Tooltip showing full reason */}
        <div className="hidden group-hover:block absolute top-full left-0 mt-1 w-64 p-2.5 bg-black text-white rounded border border-gray-700 shadow-xl text-[11px] font-sans font-normal z-50 pointer-events-auto">
          <div className="flex items-center justify-between font-mono font-bold text-amber-400 mb-1">
            <span>[{flag.severity.toUpperCase()}] ISSUE</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFlag(flag.id);
              }}
              className="text-gray-400 hover:text-white"
              title="Dismiss flag"
            >
              <X size={12} />
            </button>
          </div>
          <p className="leading-snug">{flag.reason}</p>
        </div>
      </div>
    </>
  );
};
