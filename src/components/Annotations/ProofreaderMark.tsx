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
  const strokeColor = isResolved ? '#3D6B52' : '#B3261E'; // --confirm vs --redline

  // Calculate anchor points for wobbly pen circle around element and leader line to note
  const cx = elementX + elementW / 2;
  const cy = elementY + elementH / 2;
  const rx = elementW / 2 + 6;
  const ry = elementH / 2 + 5;

  // Connection point on circle perimeter towards noteX, noteY
  const angle = Math.atan2(noteY - cy, noteX - cx);
  const startX = cx + rx * Math.cos(angle);
  const startY = cy + ry * Math.sin(angle);

  // Curved leader line path to note
  const midX = (startX + noteX) / 2 + 10;
  const midY = (startY + noteY) / 2 - 10;

  return (
    <>
      {/* SVG Layer for Pen Circle Mark & Curved Leader Line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible">
        {/* Wobbly Pen Circle around Element */}
        <path
          d={`M ${cx - rx} ${cy} 
             C ${cx - rx} ${cy - ry - 4}, ${cx + rx + 2} ${cy - ry}, ${cx + rx} ${cy} 
             C ${cx + rx - 2} ${cy + ry + 4}, ${cx - rx - 2} ${cy + ry}, ${cx - rx} ${cy}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="4 1"
          className="animate-draw-mark"
        />

        {/* Thin Pen Leader Line to Margin Note */}
        <path
          d={`M ${startX} ${startY} Q ${midX} ${midY} ${noteX} ${noteY + 12}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeDasharray="3 2"
          className="animate-draw-mark"
        />

        {/* Small Pen Tip Dot at Margin Note start */}
        <circle cx={startX} cy={startY} r="2.5" fill={strokeColor} />
      </svg>

      {/* Margin Note: Direct Ink on Paper (NO Box, NO Border, NO Shadow) */}
      <div
        className="absolute z-40 pointer-events-auto max-w-[220px] select-none"
        style={{ left: noteX, top: noteY }}
      >
        <p className={isResolved ? 'handwriting-note-confirm' : 'handwriting-note'}>
          {isResolved ? '[Fixed] ' : ''}
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
  const strokeColor = '#17181A'; // --ink

  return (
    <>
      {/* Small Leader Dot if offset */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible">
        <line
          x1={annotation.x}
          y1={annotation.y}
          x2={noteX}
          y2={noteY + 10}
          stroke={strokeColor}
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <circle cx={annotation.x} cy={annotation.y} r="2" fill={strokeColor} />
      </svg>

      {/* Margin Note: Ink on Paper (NO Box, NO Border, NO Shadow) */}
      <div
        className="absolute z-40 pointer-events-auto max-w-[240px] select-none"
        style={{ left: noteX, top: noteY }}
      >
        <p className="font-sans font-medium text-xs text-[#17181A] leading-snug border-l-2 border-[#17181A] pl-2 py-0.5">
          {annotation.text}
        </p>
      </div>
    </>
  );
};
