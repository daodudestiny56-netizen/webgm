'use client';

import React from 'react';
import { useCanvasStore } from '@/store/useCanvasStore';
import type { ElementType } from '@/types/canvas';
import { Type, Square, LayoutTemplate, Layers, Trash2, Plus, Sparkles, Navigation, Image, RotateCcw } from 'lucide-react';

interface LeftToolboxProps {
  isCollapsed?: boolean;
}

export const LeftToolbox: React.FC<LeftToolboxProps> = ({ isCollapsed = false }) => {
  const { elements, addElement, selectedElementId, selectElement, deleteElement, clearCanvas, loadExampleLayout } =
    useCanvasStore();

  const toolItems: { type: ElementType; label: string; icon: React.ReactNode }[] = [
    { type: 'heading', label: 'Heading', icon: <Type size={14} /> },
    { type: 'text', label: 'Body Text', icon: <LayoutTemplate size={14} /> },
    { type: 'button', label: 'Button', icon: <Square size={14} /> },
    { type: 'nav', label: 'Nav Item', icon: <Navigation size={14} /> },
    { type: 'card', label: 'Image Block', icon: <Image size={14} /> },
    { type: 'badge', label: 'Container', icon: <Layers size={14} /> },
  ];

  if (isCollapsed) {
    return (
      <aside className="w-14 bg-[#F6F5F1] border-r-2 border-[#14161A] flex flex-col items-center py-4 gap-3 h-full font-sans select-none shrink-0">
        {toolItems.map((item) => (
          <button
            key={item.type}
            onClick={() => addElement(item.type)}
            className="w-10 h-10 flex items-center justify-center bg-white border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none text-[#14161A] cursor-pointer hover:bg-[#F2C94C]"
            title={`Add ${item.label}`}
          >
            {item.icon}
          </button>
        ))}

        <div className="w-8 border-b-2 border-[#14161A] my-1" />

        <button
          onClick={loadExampleLayout}
          className="w-10 h-10 flex items-center justify-center bg-[#F2C94C] border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] text-[#14161A] cursor-pointer hover:bg-white"
          title="Load Sample Layout"
        >
          <Sparkles size={14} />
        </button>
      </aside>
    );
  }

  return (
    <aside className="w-60 sm:w-64 bg-[#F6F5F1] border-r-2 border-[#14161A] flex flex-col h-full font-sans select-none shrink-0 overflow-hidden">
      {/* 1. Component Insertion Section */}
      <div className="p-3.5 border-b-2 border-[#14161A] bg-[#F6F5F1]">
        <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#14161A] mb-3 text-center flex items-center justify-center gap-1.5">
          <Plus size={13} className="text-[#14161A]" />
          <span>INSERT COMPONENTS</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          {toolItems.map((item) => (
            <button
              key={item.type}
              onClick={() => addElement(item.type)}
              className="neo-btn text-xs py-2 px-2.5 flex items-center justify-start gap-2 bg-white hover:bg-[#F2C94C] transition-colors w-full font-bold"
            >
              <span className="text-[#14161A]">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#D8D5CC]">
          <button
            onClick={loadExampleLayout}
            className="neo-btn neo-btn-primary text-[11px] py-1.5 px-2 flex items-center justify-center gap-1 font-bold"
            title="Load sample mockup"
          >
            <Sparkles size={12} />
            <span>Sample</span>
          </button>
          <button
            onClick={clearCanvas}
            className="neo-btn text-[11px] py-1.5 px-2 flex items-center justify-center gap-1 text-[#C1272D] font-bold"
            title="Clear all nodes"
          >
            <Trash2 size={12} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* 2. Layers Inspector Section */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#F6F5F1]">
        <div className="px-3 py-2.5 border-b-2 border-[#14161A] bg-white flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#14161A]">
            CANVAS LAYERS
          </span>
          <span className="neo-stamp neo-stamp-mark text-[9px] px-1.5 py-0">
            {elements.length} {elements.length === 1 ? 'NODE' : 'NODES'}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {elements.length === 0 ? (
            <div className="p-6 text-center text-[#6B7280] text-xs font-medium">
              No canvas elements.<br />Click a component above to insert.
            </div>
          ) : (
            elements.map((el) => {
              const isSelected = el.id === selectedElementId;
              return (
                <div
                  key={el.id}
                  onClick={() => selectElement(el.id)}
                  className={`w-full p-2 border-2 border-[#14161A] flex items-center justify-between text-xs font-bold cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#F2C94C] shadow-[2px_2px_0_#14161A] translate-x-[1px]'
                      : 'bg-white hover:bg-[#F6F5F1] shadow-[1px_1px_0_#14161A]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-1">
                    <span className="text-[10px] uppercase bg-white border border-[#14161A] px-1 py-0.2 font-extrabold text-[#14161A]">
                      {el.type}
                    </span>
                    <span className="truncate text-[#14161A] font-semibold">{el.id}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteElement(el.id);
                    }}
                    className="text-[#6B7280] hover:text-[#C1272D] p-1 transition-colors"
                    title="Delete layer"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </aside>
  );
};
