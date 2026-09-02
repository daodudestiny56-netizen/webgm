import React, { useState } from 'react';
import { PropertiesPanel } from './PropertiesPanel';
import { AIChatPanel } from './AIChatPanel';
import { Sliders, MessageSquare } from 'lucide-react';

export const RightDock: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'properties' | 'chat'>('chat');

  return (
    <aside className="w-72 sm:w-80 bg-[#F6F5F1] border-l border-[#D8D5CC] flex flex-col h-full font-sans shrink-0">
      {/* Dock Tabs Header */}
      <div className="flex items-center border-b border-[#D8D5CC] bg-[#F6F5F1] shrink-0">
        <button
          onClick={() => setActiveTab('properties')}
          className={`flex-1 py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'properties'
              ? 'border-[#17181A] text-[#17181A] bg-white'
              : 'border-transparent text-[#6B7280] hover:text-[#17181A]'
          }`}
        >
          <Sliders size={13} />
          <span>Properties</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'chat'
              ? 'border-[#17181A] text-[#17181A] bg-white'
              : 'border-transparent text-[#6B7280] hover:text-[#17181A]'
          }`}
        >
          <MessageSquare size={13} />
          <span>AI Assistant</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'properties' ? <PropertiesPanel /> : <AIChatPanel />}
      </div>
    </aside>
  );
};
