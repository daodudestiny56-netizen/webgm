'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useCanvasStore } from '@/store/useCanvasStore';
import { CanvasElementItem } from './CanvasElementItem';
import { ProofreaderFlagMark, ProofreaderAnnotationMark } from '../Annotations/ProofreaderMark';
import { AgentCursor } from '../AgentPanel/AgentCursor';
import { getNonOverlappingPosition } from '@/utils/pinCollision';
import type { BoundingBox } from '@/utils/pinCollision';
import { computeContrastRatio } from '@/utils/wcagMath';
import { Sparkles, Layers, Eye } from 'lucide-react';

export const Canvas: React.FC = () => {
  const { elements, flags, annotations, selectElement, isBeforeAfterMode, beforeSnapshot } = useCanvasStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);
  const [isWcagGridActive, setIsWcagGridActive] = useState<boolean>(false);

  // Auto-Scale Canvas to fit available container width cleanly
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      if (containerWidth > 0) {
        const newScale = Math.min(1, Math.max(0.4, containerWidth / 800));
        setScale(newScale);
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    window.addEventListener('resize', updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

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

    const initialBox: BoundingBox = {
      x: Math.min(560, targetEl.x + targetEl.w + 24),
      y: Math.max(20, targetEl.y - 10),
      w: 220,
      h: 60,
    };

    const finalBox = getNonOverlappingPosition(initialBox, placedBoxes, 50);
    placedBoxes.push(finalBox);

    return {
      flag,
      targetEl,
      noteX: finalBox.x,
      noteY: finalBox.y,
    };
  });

  // Calculate Margin Note Positions for Standalone Annotations
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

  // Live WCAG Contrast & Touch Target Overlay Computations
  const wcagOverlays = useMemo(() => {
    if (!isWcagGridActive) return { contrastBadges: [], touchTargets: [] };

    const contrastBadges = elements
      .filter((el) => el.text && el.text.trim().length > 0)
      .map((el) => {
        const bg = el.backgroundColor && el.backgroundColor !== 'transparent' ? el.backgroundColor : '#F6F5F1';
        const result = computeContrastRatio(el.color, bg, el.fontSize, el.fontWeight || 400);
        return {
          id: el.id,
          x: el.x,
          y: Math.max(12, el.y - 16),
          result,
        };
      });

    const touchTargets = elements
      .filter((el) => el.type === 'button' || el.type === 'nav')
      .filter((el) => el.w < 44 || el.h < 44)
      .map((el) => {
        const targetW = Math.max(44, el.w);
        const targetH = Math.max(44, el.h);
        return {
          id: el.id,
          x: el.x - (targetW - el.w) / 2,
          y: el.y - (targetH - el.h) / 2,
          w: targetW,
          h: targetH,
          actualW: el.w,
          actualH: el.h,
        };
      });

    return { contrastBadges, touchTargets };
  }, [elements, isWcagGridActive]);

  // Generate Drafting Table Ruler Ticks (Top & Left Edges)
  const topTicks = Array.from({ length: 40 }, (_, i) => i * 20);
  const leftTicks = Array.from({ length: 28 }, (_, i) => i * 20);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden flex flex-col my-1 bg-[#F6F5F1] border-2 border-[#14161A] shadow-[4px_4px_0_#14161A] select-none"
    >
      {/* Neobrutalist Status Bar */}
      <div className="h-8 px-3 bg-[#F6F5F1] border-b-2 border-[#14161A] flex items-center justify-between font-sans text-xs text-[#14161A] shrink-0 font-bold">
        <div className="flex items-center gap-2">
          <Layers size={13} className="text-[#14161A]" />
          <span className="font-extrabold text-xs tracking-wider uppercase">DRAFTING CANVAS</span>
          <span className="text-[#6B7280] font-normal hidden sm:inline">({elements.length} nodes)</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-[11px]">
          {/* Feature 2: WCAG Grid & Touch Targets Toggle */}
          <button
            onClick={() => setIsWcagGridActive(!isWcagGridActive)}
            className={`border border-[#14161A] px-2 py-0.5 font-extrabold transition-colors cursor-pointer flex items-center gap-1 text-[10px] ${
              isWcagGridActive
                ? 'bg-[#F2C94C] text-[#14161A] shadow-[1px_1px_0_#14161A]'
                : 'bg-white text-[#6B7280] hover:text-[#14161A]'
            }`}
            title="Toggle live accessibility and touch target overlay"
          >
            <Eye size={11} />
            <span>WCAG Grid</span>
          </button>

          {flags.length > 0 && (
            <span className="neo-stamp neo-stamp-redline">
              {flags.length} {flags.length === 1 ? 'FLAG' : 'FLAGS'}
            </span>
          )}
          {annotations.length > 0 && (
            <span className="neo-stamp neo-stamp-mark hidden sm:inline-flex">
              {annotations.length} NOTES
            </span>
          )}
          <span className="border border-[#14161A] bg-white px-1.5 py-0.5 font-bold">
            {Math.round(scale * 100)}%
          </span>
        </div>
      </div>

      {/* Auto-Scaled Viewport Container */}
      <div
        className="relative w-full overflow-hidden bg-[#F6F5F1] transition-all"
        style={{
          height: `${Math.round(580 * scale)}px`,
        }}
      >
        {/* Scaled Canvas Layer (Original 800×580 coordinate system) */}
        <div
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="relative w-[800px] h-[580px] bg-[#F6F5F1] cursor-crosshair drafting-table-bg origin-top-left"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {/* Top Ruler Ticks */}
          <div className="absolute top-0 left-0 right-0 h-3 border-b border-[#D8D5CC] flex pointer-events-none z-10">
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
          <div className="absolute top-0 left-0 bottom-0 w-3 border-r border-[#D8D5CC] flex flex-col pointer-events-none z-10">
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

          {/* Render All Canvas Elements */}
          {elements.map((el) => (
            <CanvasElementItem key={el.id} element={el} />
          ))}

          {/* Feature 2: WCAG Live Accessibility Overlay (When Toggled Active) */}
          {isWcagGridActive && (
            <>
              {/* 1. Touch Target Minimum 44×44px Bounding Boxes for Failing Elements */}
              {wcagOverlays.touchTargets.map((tt) => (
                <div
                  key={`tt-${tt.id}`}
                  className="absolute pointer-events-none z-30 border-2 border-dashed border-[#C1272D] flex items-start justify-end"
                  style={{
                    left: `${tt.x}px`,
                    top: `${tt.y}px`,
                    width: `${tt.w}px`,
                    height: `${tt.h}px`,
                  }}
                >
                  <span className="bg-[#C1272D] text-white text-[8px] font-extrabold px-1 py-0.2 tracking-tight">
                    44×44 MIN ({tt.actualW}×{tt.actualH})
                  </span>
                </div>
              ))}

              {/* 2. Live WCAG Relative Luminance Contrast Badges */}
              {wcagOverlays.contrastBadges.map((cb) => (
                <div
                  key={`cb-${cb.id}`}
                  className={`absolute pointer-events-none z-30 px-1 py-0.2 text-[8px] font-extrabold border border-[#14161A] bg-[#F6F5F1] shadow-[1px_1px_0_#14161A] ${
                    cb.result.isCompliant ? 'text-[#2F7A5C]' : 'text-[#C1272D]'
                  }`}
                  style={{
                    left: `${cb.x}px`,
                    top: `${cb.y}px`,
                  }}
                >
                  {cb.result.formattedRatio} {cb.result.isCompliant ? 'PASS' : 'FAIL'}
                </div>
              ))}
            </>
          )}

          {/* Render Proofreader Flags with Leader Lines & Pinned Notes */}
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

          {/* Render Agent Cursor */}
          <AgentCursor />

          {/* Before/After Diff Mode Overlay */}
          {isBeforeAfterMode && beforeSnapshot && (
            <div className="absolute inset-0 bg-[#F6F5F1] z-50 flex flex-col p-4 pointer-events-auto border-t-2 border-[#14161A]">
              <div className="border-b-2 border-[#14161A] pb-2 text-xs font-bold text-[#14161A] flex justify-between items-center mb-3">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={13} className="text-[#14161A]" />
                  <span>BEFORE vs AFTER DIFF</span>
                </span>
                <span className="text-[#6B7280] font-semibold text-[11px]">
                  Left: Original Baseline // Right: Current Canvas
                </span>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4">
                {/* Before Snapshot */}
                <div className="relative border-2 border-[#C1272D] shadow-[3px_3px_0_#C1272D] bg-white p-2 overflow-hidden">
                  <div className="absolute top-2 left-2 neo-stamp neo-stamp-redline z-10">
                    BEFORE BASELINE
                  </div>
                  {beforeSnapshot.map((el) => (
                    <div
                      key={el.id}
                      className="absolute border-2 border-[#C1272D] bg-[#F6F5F1] text-[9px] font-bold text-[#C1272D] flex items-center justify-center p-1 overflow-hidden"
                      style={{ left: el.x * 0.45, top: el.y * 0.45, width: el.w * 0.45, height: el.h * 0.45 }}
                    >
                      {el.id}
                    </div>
                  ))}
                </div>

                {/* After State */}
                <div className="relative border-2 border-[#2F7A5C] shadow-[3px_3px_0_#2F7A5C] bg-white p-2 overflow-hidden">
                  <div className="absolute top-2 left-2 neo-stamp neo-stamp-confirm z-10">
                    AFTER FIXES
                  </div>
                  {elements.map((el) => (
                    <div
                      key={el.id}
                      className="absolute border-2 border-[#2F7A5C] bg-[#F6F5F1] text-[9px] font-bold text-[#2F7A5C] flex items-center justify-center p-1 overflow-hidden"
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
    </div>
  );
};
