import React from 'react';
import { ShieldCheck, Cpu, Code2, MousePointerClick, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  const cards = [
    {
      icon: <Cpu size={14} className="text-[#17181A]" />,
      title: '1. WebMCP Native',
      desc: (
        <>
          Exposes canvas store directly to agents via{' '}
          <code className="bg-[#EBE8E0] px-1">navigator.modelContext</code>.
        </>
      ),
    },
    {
      icon: <MousePointerClick size={14} className="text-[#17181A]" />,
      title: '2. Spatial Action',
      desc: 'Moves elements, resizes touch targets, and rebalances spacing with live visual execution.',
    },
    {
      icon: <ShieldCheck size={14} className="text-[#B3261E]" />,
      title: '3. Proofreader Marks',
      desc: 'Circles issues in redline ink with leader lines to handwritten margin notes.',
    },
    {
      icon: <MessageSquare size={14} className="text-[#3D6B52]" />,
      title: '4. History & Resolution',
      desc: 'Resolved fixes transition to confirm ink, maintaining a complete manuscript audit trail.',
    },
  ];

  return (
    <footer className="w-full bg-[#F6F5F1] p-4 mt-2 flex flex-col gap-4 text-xs font-sans border-t border-[#D8D5CC] shrink-0">
      {/* 4 Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {cards.map((card) => (
          <div key={card.title} className="bg-white p-3 border border-[#D8D5CC] text-center flex flex-col items-center">
            <div className="flex items-center justify-center gap-1.5 font-semibold text-[#17181A] mb-1.5">
              {card.icon}
              <span>{card.title}</span>
            </div>
            <p className="text-[11px] text-[#6B7280] leading-snug text-center text-balance">
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Bottom */}
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between border-t border-[#D8D5CC] pt-3 text-[11px] text-[#6B7280] gap-2 text-center">
        <div className="flex items-center gap-2">
          <Code2 size={13} />
          <span>Crit Studio -- Editorial Proofreading Canvas // WebMCP Challenge 2026</span>
        </div>
        <div className="flex items-center gap-3">
          <span>React + TypeScript + Zustand</span>
          <span className="font-semibold text-[#17181A]">6/6 Tools Registered</span>
        </div>
      </div>
    </footer>
  );
};
