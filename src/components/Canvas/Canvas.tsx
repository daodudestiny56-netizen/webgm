import React, { useRef } from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { CanvasElementItem } from './CanvasElementItem';
import { ProofreaderFlagMark, ProofreaderAnnotationMark } from '../Annotations/ProofreaderMark';
import { AgentCursor } from '../AgentPanel/AgentCursor';
import { getNonOverlappingPosition } from '../../utils/pinCollision';
import type { BoundingBox } from '../../utils/pinCollision';

export const Canvas: React.FC = () => {
  const { elements, flags, annotations, selectElement, isBeforeAfterMode, beforeSnapshot } = useCanvasStore();
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).classList.contains('drafting-table-bg')) {
      selectElement(null);
    }
  };

  // Compute collision-free positions for margin notes
  const placedBoxes: BoundingBox[] = [];

  // Register element bounding boxes as obstacles
  elements.forEach((el) => {
    placedBoxes.push({ x: el.x, y: el.y, w: el.w, h: el.h });
  });

  // Calculate Margin Note Positions for Flag Issues
  const computedFlags = flags.map((flag) => {
    const targetEl = elements.find((el) => el.id === flag.elementId);
    if (!targetEl) return null;

    // Anchor margin note to right side or bottom of element
    const initialBox: BoundingBox = {
      x: Math.min(560, targetEl.x + targetEl.w + 16),
      y: Math.max(10, targetEl.y - 8),
      w: 220,
      h: 55,
    };

    const finalBox = getNonOverlappingPosition(initialBox, placedBoxes, 45);
    placedBoxes.push(finalBox);

    return {
      flag,
      targetEl,
      noteX: finalBox.x,
      noteY: finalBox.y,
    };
  });

  // Calculate Margin Note Positions for Annotations
  const computedAnnotations = annotations.map((annotation) => {
    const initialBox: BoundingBox = {
      x: Math.min(560, annotation.x),
      y: annotation.y + 12,
      w: 220,
      h: 55,
    };

    const finalBox = getNonOverlappingPosition(initialBox, placedBoxes, 45);
    placedBoxes.push(finalBox);

    return {
      annotation,
      noteX: finalBox.x,
      noteY: finalBox.y,
    };
  });

  // Generate Drafting Table Ruler Ticks (Top & Left Edges)
  const topTicks = Array.from({ length: 40 }, (_, i) => i * 20);
  const leftTicks = Array.from({ length: 28 }, (_, i) => i * 20);

  return (
    <div className="relative w-full h-[580px] overflow-hidden flex flex-col my-2 bg-[#F6F5F1] border border-[#D8D5CC]">
      {/* Editorial Canvas Status Bar */}
      <div className="h-8 px-4 bg-[#F6F5F1] border-b border-[#D8D5CC] flex items-center justify-between font-sans text-xs text-[#17181A]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-xs tracking-wider uppercase">DRAFTING CANVAS // MOCKUP_01</span>
          <span className="text-[#6B7280]">({elements.length} DOM nodes)</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-[#6B7280]">
          {flags.length > 0 && (
            <span className="text-[#B3261E] font-semibold">
              {flags.length} {flags.length === 1 ? 'Proof Mark' : 'Proof Marks'}
            </span>
          )}
          {annotations.length > 0 && (
            <span className="text-[#17181A] font-semibold">
              {annotations.length} Margin Notes
            </span>
          )}
          <span>800 × 580 px</span>
        </div>
      </div>

      {/* Main Drafting Table Surface */}
      <div
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="relative flex-1 w-full h-full bg-[#F6F5F1] overflow-hidden cursor-crosshair select-none drafting-table-bg"
      >
        {/* Top Ruler Ticks */}
        <div className="absolute top-0 left-0 right-0 h-3 border-b border-[#D8D5CC]/60 flex pointer-events-none z-10">
          {topTicks.map((x) => (
            <div
              key={`top-tick-${x}`}
              className="absolute top-0 border-l border-[#D8D5CC]"
              style={{
                left: x,
                height: x % 100 === 0 ? '12px' : '5px',
              }}
            />
          ))}
        </div>

        {/* Left Ruler Ticks */}
        <div className="absolute top-0 left-0 bottom-0 w-3 border-r border-[#D8D5CC]/60 flex flex-col pointer-events-none z-10">
          {leftTicks.map((y) => (
            <div
              key={`left-tick-${y}`}
              className="absolute left-0 border-t border-[#D8D5CC]"
              style={{
                top: y,
                width: y % 100 === 0 ? '12px' : '5px',
              }}
            />
          ))}
        </div>

        {/* Render Canvas Elements */}
        {elements.map((element) => (
          <CanvasElementItem key={element.id} element={element} />
        ))}

        {/* Render Proofreader Flag Marks & Handwritten Margin Notes */}
        {computedFlags.map((item) => {
          if (!item) return null;
          return (
            <ProofreaderFlagMark
              key={item.flag.id}
              flag={item.flag}
              elementX={item.targetEl.x}
              elementY={item.targetEl.y}
              elementW={item.targetEl.w}
              elementH={item.targetEl.h}
              noteX={item.noteX}
              noteY={item.noteY}
            />
          );
        })}

        {/* Render Proofreader Margin Annotations */}
        {computedAnnotations.map((item) => (
          <ProofreaderAnnotationMark
            key={item.annotation.id}
            annotation={item.annotation}
            noteX={item.noteX}
            noteY={item.noteY}
          />
        ))}

        {/* Render Minimal Agent Cursor */}
        <AgentCursor />

        {/* Before/After Diff Mode Overlay */}
        {isBeforeAfterMode && beforeSnapshot && (
          <div className="absolute inset-0 bg-[#F6F5F1]/95 backdrop-blur-[1px] z-50 flex flex-col p-4 pointer-events-auto border-t border-[#D8D5CC]">
            <div className="border-b border-[#D8D5CC] pb-2 text-xs font-semibold text-[#17181A] flex justify-between items-center mb-3">
              <span>BEFORE vs AFTER MANUSCRIPT DIFF</span>
              <span className="text-[#6B7280]">Left: Original Flawed Baseline | Right: Current Canvas</span>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4">
              {/* Before Snapshot */}
              <div className="relative border border-dashed border-[#B3261E] bg-[#B3261E]/5 p-2 rounded-none overflow-hidden">
                <div className="absolute top-2 left-2 text-[11px] font-semibold text-[#B3261E] z-10">BEFORE (3 Issues)</div>
                {beforeSnapshot.map((el) => (
                  <div
                    key={el.id}
                    className="absolute border border-[#B3261E]/40 text-[10px] text-[#B3261E] flex items-center justify-center p-1 overflow-hidden"
                    style={{ left: el.x * 0.45, top: el.y * 0.45, width: el.w * 0.45, height: el.h * 0.45 }}
                  >
                    {el.id}
                  </div>
                ))}
              </div>

              {/* After State */}
              <div className="relative border border-solid border-[#3D6B52] bg-[#3D6B52]/5 p-2 rounded-none overflow-hidden">
                <div className="absolute top-2 left-2 text-[11px] font-semibold text-[#3D6B52] z-10">AFTER (Agent Fixed)</div>
                {elements.map((el) => (
                  <div
                    key={el.id}
                    className="absolute border border-[#3D6B52]/40 text-[10px] text-[#3D6B52] flex items-center justify-center p-1 overflow-hidden"
                    style={{ left: el.x * 0.45, top: el.y * 0.45, width: el.w * 0.45, height: el.h * 0.45 }}
                  >
                    {el.id}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
