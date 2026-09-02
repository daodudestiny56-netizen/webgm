'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { CanvasElement } from '@/types/canvas';
import { useCanvasStore } from '@/store/useCanvasStore';

interface CanvasElementItemProps {
  element: CanvasElement;
}

export const CanvasElementItem: React.FC<CanvasElementItemProps> = ({ element }) => {
  const { selectedElementId, selectElement, updateElement } = useCanvasStore();
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initialElX: number; initialElY: number } | null>(null);

  const isSelected = selectedElementId === element.id;

  // Handle Drag Start
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialElX: element.x,
      initialElY: element.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !dragStartRef.current) return;
      const dx = e.clientX - dragStartRef.current.startX;
      const dy = e.clientY - dragStartRef.current.startY;
      const newX = Math.max(0, Math.round(dragStartRef.current.initialElX + dx));
      const newY = Math.max(0, Math.round(dragStartRef.current.initialElY + dy));
      updateElement(element.id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        dragStartRef.current = null;
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, element.id, updateElement]);

  const getBorderStyle = () => {
    if (isSelected) return '2px solid #14161A';
    if (element.borderColor) return `2px solid ${element.borderColor}`;
    if (element.type === 'button') return '2px solid #14161A';
    if (element.type === 'card' || element.type === 'nav') return '2px solid #14161A';
    return '2px solid transparent';
  };

  const getBoxShadow = () => {
    if (isSelected) return '3px 3px 0 #14161A';
    if (element.type === 'button') return '2px 2px 0 #14161A';
    if (element.type === 'card') return '2px 2px 0 #14161A';
    return 'none';
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        selectElement(element.id);
      }}
      onMouseDown={handleMouseDown}
      className={`canvas-element absolute group cursor-grab active:cursor-grabbing ${
        isDragging ? 'is-dragging opacity-90 z-50' : ''
      }`}
      style={{
        left: element.x,
        top: element.y,
        width: element.w,
        height: element.h,
        color: element.color,
        backgroundColor: element.backgroundColor,
        fontSize: element.fontSize,
        fontWeight: element.fontWeight || 600,
        zIndex: isSelected ? 35 : element.zIndex || 5,
        border: getBorderStyle(),
        boxShadow: getBoxShadow(),
        borderRadius: 0,
        padding: element.padding || (element.type === 'button' ? '6px 14px' : '4px 8px'),
        display: 'flex',
        alignItems: 'center',
        justifyContent: element.type === 'heading' || element.type === 'text' ? 'flex-start' : 'center',
        lineHeight: 1.25,
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
      }}
    >
      {/* Content Rendering */}
      {element.type === 'card' ? (
        <div className="flex flex-col items-center justify-center p-3 text-center w-full h-full">
          <p className="font-sans text-xs font-bold text-[#14161A] whitespace-pre-line leading-relaxed">
            {element.text}
          </p>
        </div>
      ) : (
        <span className="w-full whitespace-normal break-words leading-tight">{element.text}</span>
      )}

      {/* Selected Indicator Badge (Neobrutalist Stamp) */}
      {isSelected && (
        <div className="absolute -top-6 left-0 bg-[#14161A] text-[#F6F5F1] font-sans text-[10px] font-bold px-1.5 py-0.5 border border-[#14161A] shadow-[2px_2px_0_#14161A] flex items-center gap-1 z-50 pointer-events-none whitespace-nowrap">
          <span>
            {element.id} [{element.x}, {element.y}] {element.w}×{element.h}px
          </span>
        </div>
      )}
    </div>
  );
};
