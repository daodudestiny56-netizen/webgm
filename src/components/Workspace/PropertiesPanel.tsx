import React from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { Sliders, Trash2 } from 'lucide-react';

export const PropertiesPanel: React.FC = () => {
  const { selectedElementId, elements, updateElement, deleteElement } = useCanvasStore();

  const selectedElement = elements.find((el) => el.id === selectedElementId);

  if (!selectedElement) {
    return (
      <div className="p-6 text-xs text-[#6B7280] font-sans flex flex-col items-center justify-center h-full text-center">
        <Sliders size={28} className="stroke-1 text-[#D8D5CC] mb-3" />
        <p className="font-semibold text-sm text-[#17181A] mb-1">No Element Selected</p>
        <p className="text-[11px] text-center text-balance leading-relaxed max-w-[180px]">
          Click an element on the canvas to inspect and edit its properties.
        </p>
      </div>
    );
  }

  return (
    <div className="p-3 bg-[#F6F5F1] font-sans text-xs flex flex-col gap-3 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#D8D5CC] pb-2.5">
        <span className="font-semibold text-xs text-[#17181A] uppercase tracking-wider text-center flex-1">
          LAYER // {selectedElement.id}
        </span>
        <button
          onClick={() => deleteElement(selectedElement.id)}
          className="text-[#B3261E] hover:underline flex items-center gap-1 cursor-pointer shrink-0 ml-2"
        >
          <Trash2 size={12} />
          <span>Delete</span>
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-3">
        {/* Text Content */}
        <div>
          <label className="text-[11px] font-semibold text-[#6B7280] block mb-1 text-center">Text Content</label>
          <textarea
            value={selectedElement.text}
            onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
            rows={3}
            className="w-full bg-white border border-[#D8D5CC] p-2 text-xs text-[#17181A] focus:outline-none focus:border-[#17181A] resize-y font-sans text-center"
          />
        </div>

        {/* Spatial Coordinates X, Y */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] font-semibold text-[#6B7280] block mb-1 text-center">X Pos (px)</label>
            <input
              type="number"
              value={selectedElement.x}
              onChange={(e) => updateElement(selectedElement.id, { x: Number(e.target.value) })}
              className="w-full bg-white border border-[#D8D5CC] p-1.5 text-xs text-[#17181A] focus:outline-none focus:border-[#17181A] text-center"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#6B7280] block mb-1 text-center">Y Pos (px)</label>
            <input
              type="number"
              value={selectedElement.y}
              onChange={(e) => updateElement(selectedElement.id, { y: Number(e.target.value) })}
              className="w-full bg-white border border-[#D8D5CC] p-1.5 text-xs text-[#17181A] focus:outline-none focus:border-[#17181A] text-center"
            />
          </div>
        </div>

        {/* Width & Height */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] font-semibold text-[#6B7280] block mb-1 text-center">Width (px)</label>
            <input
              type="number"
              value={selectedElement.w}
              onChange={(e) => updateElement(selectedElement.id, { w: Number(e.target.value) })}
              className="w-full bg-white border border-[#D8D5CC] p-1.5 text-xs text-[#17181A] focus:outline-none focus:border-[#17181A] text-center"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#6B7280] block mb-1 text-center">Height (px)</label>
            <input
              type="number"
              value={selectedElement.h}
              onChange={(e) => updateElement(selectedElement.id, { h: Number(e.target.value) })}
              className="w-full bg-white border border-[#D8D5CC] p-1.5 text-xs text-[#17181A] focus:outline-none focus:border-[#17181A] text-center"
            />
          </div>
        </div>

        {/* Typography & Colors */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] font-semibold text-[#6B7280] block mb-1 text-center">Font Size (px)</label>
            <input
              type="number"
              value={selectedElement.fontSize}
              onChange={(e) => updateElement(selectedElement.id, { fontSize: Number(e.target.value) })}
              className="w-full bg-white border border-[#D8D5CC] p-1.5 text-xs text-[#17181A] focus:outline-none focus:border-[#17181A] text-center"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#6B7280] block mb-1 text-center">Text Color</label>
            <div className="flex items-center justify-center gap-1.5 bg-white border border-[#D8D5CC] p-1.5">
              <input
                type="color"
                value={selectedElement.color.length === 7 ? selectedElement.color : '#17181A'}
                onChange={(e) => updateElement(selectedElement.id, { color: e.target.value })}
                className="w-5 h-5 border-none cursor-pointer p-0 shrink-0"
              />
              <span className="text-[10px] text-[#17181A] uppercase font-mono">{selectedElement.color}</span>
            </div>
          </div>
        </div>

        {/* Background Color */}
        <div>
          <label className="text-[11px] font-semibold text-[#6B7280] block mb-1 text-center">Background Fill</label>
          <div className="flex items-center justify-center gap-2 bg-white border border-[#D8D5CC] p-1.5">
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
              className="flex-1 bg-transparent text-xs text-[#17181A] focus:outline-none font-mono text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
