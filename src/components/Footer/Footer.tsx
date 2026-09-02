import React from 'react';
import { ShieldCheck, Cpu, Code2, MousePointerClick, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  const cards = [
    {
      icon: <Cpu size={14} className="text-[#14161A]" />,
      title: '1. WebMCP Native',
      desc: (
        <>
          Exposes canvas store directly to agents via{' '}
          <code className="bg-white border border-[#14161A] px-1 font-bold">navigator.modelContext</code>.
        </>
      ),
    },
    {
      icon: <MousePointerClick size={14} className="text-[#14161A]" />,
      title: '2. Spatial Action',
      desc: 'Moves elements, resizes touch targets, and rebalances spacing with live visual execution.',
    },
    {
      icon: <ShieldCheck size={14} className="text-[#C1272D]" />,
      title: '3. Stamped Rejections',
      desc: 'Stamps issue severity badges in redline ink with straight leader lines to margin notes.',
    },
    {
      icon: <MessageSquare size={14} className="text-[#2F7A5C]" />,
      title: '4. Approved Resolution',
      desc: 'Resolved fixes switch to confirmed green stamps, maintaining a complete audit trail.',
    },
  ];

  return (
    <footer className="w-full bg-[#F6F5F1] p-3 flex flex-col gap-3 text-xs font-sans border-t-2 border-[#14161A] shrink-0">
      {/* 4 Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white p-3 border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] text-center flex flex-col items-center"
          >
            <div className="flex items-center justify-center gap-1.5 font-extrabold text-[#14161A] mb-1">
              {card.icon}
              <span>{card.title}</span>
            </div>
            <p className="text-[11px] text-[#6B7280] leading-snug text-center font-medium">
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Bottom */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#D8D5CC] pt-2 text-[11px] text-[#6B7280] gap-2 font-medium">
        <div className="flex items-center gap-2">
          <Code2 size={13} className="text-[#14161A]" />
          <span className="font-bold text-[#14161A]">Crit Studio // Next.js App Router // WebMCP Challenge 2026</span>
        </div>
        <div className="flex items-center gap-3">
          <span>React 19 + TypeScript + Zustand</span>
          <span className="neo-stamp neo-stamp-mark text-[9px] py-0 px-1">
            6/6 TOOLS REGISTERED
          </span>
        </div>
      </div>
    </footer>
  );
};
