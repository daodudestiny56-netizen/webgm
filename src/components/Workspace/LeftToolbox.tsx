'use client';

import React from 'react';
import { useCanvasStore } from '@/store/useCanvasStore';
import type { ElementType } from '@/types/canvas';
import { Type, Square, LayoutTemplate, Layers, Trash2, Plus, Sparkles, Navigation, Image } from 'lucide-react';

interface LeftToolboxProps {
  isCollapsed?: boolean;
}

export const LeftToolbox: React.FC<LeftToolboxProps> = ({ isCollapsed = false }) => {
  const { elements, addElement, selectedElementId, selectElement, deleteElement, clearCanvas, loadExampleLayout } =
    useCanvasStore();

  const toolItems: { type: ElementType; label: string; icon: React.ReactNode }[] = [
    { type: 'heading', label: 'Heading', icon: <Type size={13} /> },
    { type: 'text', label: 'Body Text', icon: <LayoutTemplate size={13} /> },
    { type: 'button', label: 'Button', icon: <Square size={13} /> },
    { type: 'nav', label: 'Nav Item', icon: <Navigation size={13} /> },
    { type: 'card', label: 'Image Block', icon: <Image size={13} /> },
    { type: 'badge', label: 'Container', icon: <Layers size={13} /> },
  ];

  if (isCollapsed) {
    return (
      <aside className="w-12 bg-[#F6F5F1] border-r-2 border-[#14161A] flex flex-col items-center py-3 gap-2 h-full font-sans select-none shrink-0">
        {toolItems.map((item) => (
          <button
            key={item.type}
            onClick={() => addElement(item.type)}
            className="w-9 h-9 flex items-center justify-center bg-white border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none text-[#14161A] cursor-pointer"
            title={`Add ${item.label}`}
          >
            {item.icon}
          </button>
        ))}

        <div className="w-6 border-b-2 border-[#14161A] my-1" />

        <button
          onClick={loadExampleLayout}
          className="w-9 h-9 flex items-center justify-center bg-[#F2C94C] border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] text-[#14161A] cursor-pointer"
          title="Load Example"
        >
          <Sparkles size={13} />
        </button>
      </aside>
    );
  }

  return (
    <aside className="w-56 bg-[#F6F5F1] border-r-2 border-[#14161A] flex flex-col h-full font-sans select-none shrink-0">
      {/* Toolbox Section */}
      <div className="p-3 border-b-2 border-[#14161A]">
        <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#14161A] mb-2.5 text-center">
          INSERT COMPONENTS
        </div>

        <div className="grid grid-cols-2 gap-2">
          {toolItems.map((item) => (
            <button
              key={item.type}
              onClick={() => addElement(item.type)}
              className="flex items-center justify-center gap-1.5 p-2 bg-white border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none text-xs font-bold text-[#14161A] transition-transform cursor-pointer"
              title={`Add ${item.label} to canvas`}
            >
              <Plus size={11} className="text-[#14161A] shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Setup Actions */}
      <div className="p-3 border-b-2 border-[#14161A] flex items-center justify-center gap-2 text-xs">
        <button
          onClick={loadExampleLayout}
          className="neo-btn text-xs font-bold flex-1"
          title="Populate sample mockup elements"
        >
          <Sparkles size={12} className="text-[#14161A]" />
          <span>Load Sample</span>
        </button>

        <button
          onClick={clearCanvas}
          className="neo-btn text-xs font-bold text-[#C1272D]"
          title="Clear all elements from canvas"
        >
          <Trash2 size={12} />
          <span>Clear</span>
        </button>
      </div>

      {/* Layers List */}
      <div className="flex-1 p-3 overflow-y-auto">
        <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#14161A] mb-2.5 flex items-center justify-between">
          <span>CANVAS LAYERS</span>
          <span className="bg-[#14161A] text-[#F6F5F1] text-[10px] w-5 h-5 flex items-center justify-center font-bold">
            {elements.length}
          </span>
        </div>

        <div className="space-y-1.5">
          {elements.length === 0 ? (
            <div className="text-[11px] text-[#6B7280] py-6 text-center border-2 border-dashed border-[#14161A] p-3 font-medium">
              Canvas is empty.<br />Click a component above to insert.
            </div>
          ) : (
            elements.map((el) => {
              const isSelected = selectedElementId === el.id;
              return (
                <div
                  key={el.id}
                  onClick={() => selectElement(el.id)}
                  className={`flex items-center justify-between p-2 border-2 border-[#14161A] text-xs cursor-pointer transition-transform ${
                    isSelected
                      ? 'bg-[#14161A] text-white shadow-[2px_2px_0_#F2C94C]'
                      : 'bg-white text-[#14161A] shadow-[2px_2px_0_#14161A] hover:bg-[#F6F5F1]'
                  }`}
                >
                  <span className="truncate max-w-[130px] font-bold">{el.id}</span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteElement(el.id);
                    }}
                    className={`p-0.5 shrink-0 cursor-pointer ${isSelected ? 'text-red-300' : 'text-[#6B7280] hover:text-[#C1272D]'}`}
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
