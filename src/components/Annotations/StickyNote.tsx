import React from 'react';
import type { AnnotationPin } from '../../types/canvas';
import { MessageSquare } from 'lucide-react';

interface StickyNoteProps {
  annotation: AnnotationPin;
  pinX: number;
  pinY: number;
}

export const StickyNote: React.FC<StickyNoteProps> = ({ annotation, pinX, pinY }) => {
  return (
    <div
      className="sticky-note group"
      style={{
        left: pinX,
        top: pinY,
        zIndex: 100, // Higher z-index than flag badges so note is never clipped
      }}
    >
      <div className="flex items-center gap-1 font-mono font-bold text-[10px] text-amber-900 border-b border-amber-800/30 pb-1 mb-1">
        <MessageSquare size={12} className="text-amber-800" />
        <span>AGENT ANNOTATION</span>
      </div>
      <p className="text-amber-950 font-medium leading-snug">{annotation.text}</p>
    </div>
  );
};
