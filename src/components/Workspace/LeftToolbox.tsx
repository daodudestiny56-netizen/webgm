import React from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';
import type { ElementType } from '../../types/canvas';
import { Type, Square, LayoutTemplate, Layers, Trash2, Plus, Sparkles, Navigation, Image } from 'lucide-react';

export const LeftToolbox: React.FC = () => {
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

  return (
    <aside className="w-56 bg-[#F6F5F1] border-r border-[#D8D5CC] flex flex-col h-full font-sans select-none">
      {/* Toolbox Section */}
      <div className="p-3 border-b border-[#D8D5CC]">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] mb-2 flex items-center justify-between">
          <span>Insert Components</span>
          <span className="text-[10px] text-[#6B7280]">Figma Mode</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {toolItems.map((item) => (
            <button
              key={item.type}
              onClick={() => addElement(item.type)}
              className="flex items-center gap-1.5 p-2 bg-white border border-[#D8D5CC] hover:border-[#17181A] text-xs font-medium text-[#17181A] transition-colors cursor-pointer"
              title={`Add ${item.label} to canvas`}
            >
              <Plus size={12} className="text-[#6B7280]" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Setup Actions */}
      <div className="p-3 border-b border-[#D8D5CC] flex items-center justify-between text-xs">
        <button
          onClick={loadExampleLayout}
          className="editorial-btn text-xs font-semibold text-[#17181A]"
          title="Populate sample mockup elements"
        >
          <Sparkles size={12} />
          <span>Load Example</span>
        </button>

        <button
          onClick={clearCanvas}
          className="editorial-btn text-xs text-[#B3261E]"
          title="Clear all elements from canvas"
        >
          <Trash2 size={12} />
          <span>Clear Canvas</span>
        </button>
      </div>

      {/* Layers List */}
      <div className="flex-1 p-3 overflow-y-auto">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] mb-2 flex items-center justify-between">
          <span>Canvas Layers</span>
          <span>{elements.length}</span>
        </div>

        <div className="space-y-1">
          {elements.length === 0 ? (
            <div className="text-[11px] text-[#6B7280] py-4 text-center border border-dashed border-[#D8D5CC] p-2">
              Canvas is empty. Click a component above to insert.
            </div>
          ) : (
            elements.map((el) => {
              const isSelected = selectedElementId === el.id;
              return (
                <div
                  key={el.id}
                  onClick={() => selectElement(el.id)}
                  className={`flex items-center justify-between p-1.5 border text-xs cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#17181A] text-white border-[#17181A]'
                      : 'bg-white text-[#17181A] border-[#D8D5CC] hover:border-[#17181A]'
                  }`}
                >
                  <span className="truncate max-w-[130px] font-medium">{el.id}</span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteElement(el.id);
                    }}
                    className={`hover:text-red-500 p-0.5 ${isSelected ? 'text-slate-300' : 'text-[#6B7280]'}`}
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
