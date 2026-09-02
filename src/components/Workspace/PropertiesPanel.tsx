'use client';

import React from 'react';
import { useCanvasStore } from '@/store/useCanvasStore';
import { Sliders, Trash2 } from 'lucide-react';

export const PropertiesPanel: React.FC = () => {
  const { selectedElementId, elements, updateElement, deleteElement } = useCanvasStore();

  const selectedElement = elements.find((el) => el.id === selectedElementId);

  if (!selectedElement) {
    return (
      <div className="p-6 text-xs text-[#6B7280] font-sans flex flex-col items-center justify-center h-full text-center">
        <div className="w-12 h-12 bg-white border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] flex items-center justify-center mb-3">
          <Sliders size={20} className="text-[#14161A]" />
        </div>
        <p className="font-extrabold text-sm text-[#14161A] mb-1">NO ELEMENT SELECTED</p>
        <p className="text-[11px] text-center text-balance leading-relaxed max-w-[180px] font-medium text-[#6B7280]">
          Click an element on the canvas to inspect and edit its properties.
        </p>
      </div>
    );
  }

  return (
    <div className="p-3 bg-[#F6F5F1] font-sans text-xs flex flex-col gap-3 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-[#14161A] pb-2.5">
        <span className="font-extrabold text-xs text-[#14161A] uppercase tracking-wider text-center flex-1">
          LAYER // {selectedElement.id}
        </span>
        <button
          onClick={() => deleteElement(selectedElement.id)}
          className="neo-btn text-[#C1272D] text-[11px] font-bold py-1 px-2 shrink-0 ml-2"
        >
          <Trash2 size={11} />
          <span>Delete</span>
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-3">
        {/* Text Content */}
        <div>
          <label className="text-[11px] font-extrabold text-[#14161A] block mb-1 text-center uppercase tracking-wider">
            Text Content
          </label>
          <textarea
            value={selectedElement.text}
            onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
            rows={3}
            className="w-full bg-white border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] p-2 text-xs font-bold text-[#14161A] focus:outline-none resize-y font-sans text-center"
          />
        </div>

        {/* Spatial Coordinates X, Y */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] font-extrabold text-[#14161A] block mb-1 text-center uppercase tracking-wider">
              X Pos (px)
            </label>
            <input
              type="number"
              value={selectedElement.x}
              onChange={(e) => updateElement(selectedElement.id, { x: Number(e.target.value) })}
              className="w-full bg-white border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] p-1.5 text-xs font-bold text-[#14161A] focus:outline-none text-center"
            />
          </div>

          <div>
            <label className="text-[11px] font-extrabold text-[#14161A] block mb-1 text-center uppercase tracking-wider">
              Y Pos (px)
            </label>
            <input
              type="number"
              value={selectedElement.y}
              onChange={(e) => updateElement(selectedElement.id, { y: Number(e.target.value) })}
              className="w-full bg-white border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] p-1.5 text-xs font-bold text-[#14161A] focus:outline-none text-center"
            />
          </div>
        </div>

        {/* Width & Height */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] font-extrabold text-[#14161A] block mb-1 text-center uppercase tracking-wider">
              Width (px)
            </label>
            <input
              type="number"
              value={selectedElement.w}
              onChange={(e) => updateElement(selectedElement.id, { w: Number(e.target.value) })}
              className="w-full bg-white border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] p-1.5 text-xs font-bold text-[#14161A] focus:outline-none text-center"
            />
          </div>

          <div>
            <label className="text-[11px] font-extrabold text-[#14161A] block mb-1 text-center uppercase tracking-wider">
              Height (px)
            </label>
            <input
              type="number"
              value={selectedElement.h}
              onChange={(e) => updateElement(selectedElement.id, { h: Number(e.target.value) })}
              className="w-full bg-white border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] p-1.5 text-xs font-bold text-[#14161A] focus:outline-none text-center"
            />
          </div>
        </div>

        {/* Typography & Colors */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] font-extrabold text-[#14161A] block mb-1 text-center uppercase tracking-wider">
              Font Size (px)
            </label>
            <input
              type="number"
              value={selectedElement.fontSize}
              onChange={(e) => updateElement(selectedElement.id, { fontSize: Number(e.target.value) })}
              className="w-full bg-white border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] p-1.5 text-xs font-bold text-[#14161A] focus:outline-none text-center"
            />
          </div>

          <div>
            <label className="text-[11px] font-extrabold text-[#14161A] block mb-1 text-center uppercase tracking-wider">
              Text Color
            </label>
            <div className="flex items-center justify-center gap-1.5 bg-white border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] p-1.5">
              <input
                type="color"
                value={selectedElement.color.length === 7 ? selectedElement.color : '#14161A'}
                onChange={(e) => updateElement(selectedElement.id, { color: e.target.value })}
                className="w-5 h-5 border-none cursor-pointer p-0 shrink-0"
              />
              <span className="text-[10px] text-[#14161A] uppercase font-bold">{selectedElement.color}</span>
            </div>
          </div>
        </div>

        {/* Background Color */}
        <div>
          <label className="text-[11px] font-extrabold text-[#14161A] block mb-1 text-center uppercase tracking-wider">
            Background Fill
          </label>
          <div className="flex items-center justify-center gap-2 bg-white border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] p-1.5">
            <input
              type="color"
              value={
                selectedElement.backgroundColor.length === 7 ? selectedElement.backgroundColor : '#ffffff'
              }
              onChange={(e) => updateElement(selectedElement.id, { backgroundColor: e.target.value })}
              className="w-5 h-5 border-none cursor-pointer p-0 shrink-0"
            />
            <input
              type="text"
              value={selectedElement.backgroundColor}
              onChange={(e) => updateElement(selectedElement.id, { backgroundColor: e.target.value })}
              className="flex-1 bg-transparent text-xs text-[#14161A] focus:outline-none font-bold text-center uppercase"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
