import React from 'react';
import type { FlaggedIssue, AnnotationPin } from '../../types/canvas';

interface ProofreaderFlagProps {
  flag: FlaggedIssue;
  elementX: number;
  elementY: number;
  elementW: number;
  elementH: number;
  noteX: number;
  noteY: number;
}

export const ProofreaderFlagMark: React.FC<ProofreaderFlagProps> = ({
  flag,
  elementX,
  elementY,
  elementW,
  elementH,
  noteX,
  noteY,
}) => {
  const isResolved = Boolean(flag.resolved);
  const color = isResolved ? '#2F7A5C' : '#C1272D'; // --confirm vs --redline
  const severity = flag.severity || 'medium';

  // Unequal visual weight based on severity
  const borderThickness = severity === 'high' ? 3 : severity === 'medium' ? 2 : 1.5;
  const shadowOffset = severity === 'high' ? 3 : 2;

  // Center connection points for straight leader line
  const startX = elementX + elementW;
  const startY = elementY + elementH / 2;
  const endX = noteX;
  const endY = noteY + 16;

  return (
    <>
      {/* 1. Hard Outline Box directly around the flagged element */}
      <div
        className="absolute pointer-events-none z-30"
        style={{
          left: elementX - 4,
          top: elementY - 4,
          width: elementW + 8,
          height: elementH + 8,
          border: `${borderThickness}px solid ${color}`,
          boxShadow: `${shadowOffset}px ${shadowOffset}px 0 ${color}`,
        }}
      >
        {/* Stamped Badge on the Top-Right Corner */}
        <div
          className="absolute -top-3.5 -right-3 neo-stamp"
          style={{
            backgroundColor: color,
            color: '#F6F5F1',
            border: '2px solid #14161A',
            boxShadow: '2px 2px 0 #14161A',
          }}
        >
          {isResolved ? 'APPROVED // FIXED' : `FLAG // ${severity.toUpperCase()}`}
        </div>
      </div>

      {/* 2. Straight Leader Line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke="#14161A"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
        <circle cx={startX} cy={startY} r="3" fill="#14161A" />
      </svg>

      {/* 3. Margin Note: Index Card Pinned to Canvas */}
      <div
        className="absolute z-40 pointer-events-auto max-w-[220px] bg-[#F6F5F1] p-2.5 select-none"
        style={{
          left: noteX,
          top: noteY,
          border: '2px solid #14161A',
          boxShadow: '3px 3px 0 #14161A',
        }}
      >
        <div className="flex items-center gap-1.5 mb-1 pb-1 border-b border-[#D8D5CC]">
          <span
            className="w-2 h-2"
            style={{ backgroundColor: color }}
          />
          <span className="font-bold text-[10px] uppercase tracking-wider text-[#14161A]">
            {isResolved ? 'RESOLVED ISSUE' : `${severity.toUpperCase()} PRIORITY`}
          </span>
        </div>
        <p className="font-sans text-xs text-[#14161A] leading-snug font-medium">
          {flag.reason}
        </p>
      </div>
    </>
  );
};

interface ProofreaderAnnotationProps {
  annotation: AnnotationPin;
  noteX: number;
  noteY: number;
}

export const ProofreaderAnnotationMark: React.FC<ProofreaderAnnotationProps> = ({
  annotation,
  noteX,
  noteY,
}) => {
  return (
    <>
      {/* Straight Leader Line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
        <line
          x1={annotation.x}
          y1={annotation.y}
          x2={noteX}
          y2={noteY + 12}
          stroke="#14161A"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
        <circle cx={annotation.x} cy={annotation.y} r="3" fill="#14161A" />
      </svg>

      {/* Margin Note: Index Card */}
      <div
        className="absolute z-40 pointer-events-auto max-w-[220px] bg-[#F6F5F1] p-2.5 select-none"
        style={{
          left: noteX,
          top: noteY,
          border: '2px solid #14161A',
          boxShadow: '3px 3px 0 #14161A',
        }}
      >
        <div className="flex items-center gap-1.5 mb-1 pb-1 border-b border-[#D8D5CC]">
          <span className="w-2 h-2 bg-[#F2C94C] border border-[#14161A]" />
          <span className="font-bold text-[10px] uppercase tracking-wider text-[#14161A]">
            AGENT NOTE
          </span>
        </div>
        <p className="font-sans text-xs text-[#14161A] leading-snug font-medium">
          {annotation.text}
        </p>
      </div>
    </>
  );
};
