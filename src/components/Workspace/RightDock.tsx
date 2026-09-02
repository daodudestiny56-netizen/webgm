'use client';

import React, { useState } from 'react';
import { PropertiesPanel } from './PropertiesPanel';
import { AIChatPanel } from './AIChatPanel';
import { Sliders, MessageSquare } from 'lucide-react';

export const RightDock: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'properties' | 'chat'>('chat');

  return (
    <aside className="w-72 sm:w-80 bg-[#F6F5F1] border-l-2 border-[#14161A] flex flex-col h-full font-sans shrink-0">
      {/* Dock Tabs Header */}
      <div className="flex items-center border-b-2 border-[#14161A] bg-[#F6F5F1] shrink-0">
        <button
          onClick={() => setActiveTab('properties')}
          className={`flex-1 py-2.5 px-3 text-xs font-extrabold flex items-center justify-center gap-1.5 border-r-2 border-[#14161A] transition-colors cursor-pointer ${
            activeTab === 'properties'
              ? 'bg-[#F2C94C] text-[#14161A]'
              : 'bg-[#F6F5F1] text-[#6B7280] hover:text-[#14161A] hover:bg-white'
          }`}
        >
          <Sliders size={13} />
          <span>PROPERTIES</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2.5 px-3 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'chat'
              ? 'bg-[#F2C94C] text-[#14161A]'
              : 'bg-[#F6F5F1] text-[#6B7280] hover:text-[#14161A] hover:bg-white'
          }`}
        >
          <MessageSquare size={13} />
          <span>AI ASSISTANT</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'properties' ? <PropertiesPanel /> : <AIChatPanel />}
      </div>
    </aside>
  );
};
