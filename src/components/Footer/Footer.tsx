import React from 'react';
import { ShieldCheck, Cpu, Code2, MousePointerClick, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F6F5F1] p-4 mt-2 flex flex-col gap-4 text-xs font-sans border-t border-[#D8D5CC]">
      {/* 4 Cards explaining Editorial Proofreading Metaphor */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-white p-3 border border-[#D8D5CC]">
          <div className="flex items-center gap-1.5 font-semibold text-[#17181A] mb-1">
            <Cpu size={14} className="text-[#17181A]" />
            <span>1. WebMCP Native</span>
          </div>
          <p className="text-[11px] text-[#6B7280] leading-snug">
            Exposes canvas store directly to agents via <code className="bg-[#EBE8E0] px-1">navigator.modelContext</code>.
          </p>
        </div>

        <div className="bg-white p-3 border border-[#D8D5CC]">
          <div className="flex items-center gap-1.5 font-semibold text-[#17181A] mb-1">
            <MousePointerClick size={14} className="text-[#17181A]" />
            <span>2. Spatial Action</span>
          </div>
          <p className="text-[11px] text-[#6B7280] leading-snug">
            Moves elements, resizes touch targets, and rebalances spacing with live visual execution.
          </p>
        </div>

        <div className="bg-white p-3 border border-[#D8D5CC]">
          <div className="flex items-center gap-1.5 font-semibold text-[#17181A] mb-1">
            <ShieldCheck size={14} className="text-[#B3261E]" />
            <span>3. Proofreader Marks</span>
          </div>
          <p className="text-[11px] text-[#6B7280] leading-snug">
            Circles issues in redline ink with leader lines to handwritten margin notes.
          </p>
        </div>

        <div className="bg-white p-3 border border-[#D8D5CC]">
          <div className="flex items-center gap-1.5 font-semibold text-[#17181A] mb-1">
            <MessageSquare size={14} className="text-[#3D6B52]" />
            <span>4. History & Resolution</span>
          </div>
          <p className="text-[11px] text-[#6B7280] leading-snug">
            Resolved fixes transition to confirm ink, maintaining a complete manuscript audit trail.
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="flex flex-col md:flex-row items-center justify-between border-t border-[#D8D5CC] pt-3 text-[11px] text-[#6B7280] gap-2">
        <div className="flex items-center gap-2">
          <Code2 size={13} />
          <span>Crit Studio — Editorial Proofreading Canvas // WebMCP Challenge 2026</span>
        </div>
        <div className="flex items-center gap-3">
          <span>React + TypeScript + Zustand</span>
          <span className="font-semibold text-[#17181A]">6/6 Tools Registered</span>
        </div>
      </div>
    </footer>
  );
};
