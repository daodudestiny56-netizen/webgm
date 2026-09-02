'use client';

import React, { useState } from 'react';
import { useCanvasStore } from '@/store/useCanvasStore';
import { registeredToolsMap } from '@/webmcp/registerWebMCPTools';
import { Terminal, Play, CheckCircle, AlertCircle, RefreshCw, X } from 'lucide-react';

interface AgentSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AgentSimulator: React.FC<AgentSimulatorProps> = ({ isOpen, onClose }) => {
  const { toolLogs } = useCanvasStore();
  const [selectedTool, setSelectedTool] = useState<string>('getCanvasState');
  const [customArgsJson, setCustomArgsJson] = useState<string>('{}');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleToolChange = (toolName: string) => {
    setSelectedTool(toolName);
    switch (toolName) {
      case 'getCanvasState':
        setCustomArgsJson('{}');
        break;
      case 'flagIssue':
        setCustomArgsJson(
          JSON.stringify({ id: 'main-heading', severity: 'high', reason: 'Low WCAG contrast ratio (1.4:1)' }, null, 2)
        );
        break;
      case 'moveElement':
        setCustomArgsJson(JSON.stringify({ id: 'cta-button', x: 220, y: 250 }, null, 2));
        break;
      case 'resizeElement':
        setCustomArgsJson(JSON.stringify({ id: 'cta-button', w: 180, h: 48 }, null, 2));
        break;
      case 'suggestSpacing':
        setCustomArgsJson(
          JSON.stringify(
            { ids: ['nav-item-1', 'nav-item-2', 'nav-item-3', 'nav-item-4'], gap: 16, direction: 'horizontal' },
            null,
            2
          )
        );
        break;
      case 'annotateAt':
        setCustomArgsJson(
          JSON.stringify({ x: 300, y: 150, text: 'Consider increasing hero font size to 42px.' }, null, 2)
        );
        break;
    }
  };

  const handleExecuteSelectedTool = async () => {
    setIsExecuting(true);
    try {
      const tool = registeredToolsMap.get(selectedTool);
      if (!tool) {
        alert(`Tool ${selectedTool} not found`);
        return;
      }
      const parsedArgs = JSON.parse(customArgsJson);
      await tool.execute(parsedArgs);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      alert(`Invalid JSON or tool execution error: ${msg}`);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="w-full p-4 bg-[#F6F5F1] text-[#14161A] my-1 border-2 border-[#14161A] shadow-[4px_4px_0_#14161A] font-sans text-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-[#14161A]">
        <div className="flex items-center gap-2">
          <Terminal size={15} className="text-[#14161A]" />
          <span className="font-extrabold text-xs text-[#14161A]">WEBMCP TOOL EXECUTION CONSOLE</span>
          <span className="neo-stamp neo-stamp-mark text-[9px] py-0 px-1">
            {registeredToolsMap.size} TOOLS REGISTERED
          </span>
        </div>
        <button
          onClick={onClose}
          className="neo-btn text-[11px] py-0.5 px-2 flex items-center gap-1 cursor-pointer"
        >
          <span>Close</span>
          <X size={12} />
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Column: Direct Execution Form */}
        <div className="md:col-span-5 bg-white p-3 border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] flex flex-col gap-2">
          <label className="text-[#14161A] text-[11px] font-extrabold uppercase">SELECT WEBMCP TOOL:</label>
          <select
            value={selectedTool}
            onChange={(e) => handleToolChange(e.target.value)}
            className="w-full bg-[#F6F5F1] border-2 border-[#14161A] text-[#14161A] p-1.5 text-xs font-bold focus:outline-none"
          >
            {Array.from(registeredToolsMap.keys()).map((name) => (
              <option key={name} value={name}>
                navigator.modelContext.execute('{name}')
              </option>
            ))}
          </select>

          <label className="text-[#14161A] text-[11px] font-extrabold uppercase mt-1">JSON INPUT ARGUMENTS:</label>
          <textarea
            value={customArgsJson}
            onChange={(e) => setCustomArgsJson(e.target.value)}
            rows={4}
            className="w-full bg-[#F6F5F1] text-[#14161A] font-bold text-xs p-2 border-2 border-[#14161A] focus:outline-none resize-none"
          />

          <button
            onClick={handleExecuteSelectedTool}
            disabled={isExecuting}
            className="mt-1 w-full neo-btn-primary py-2 text-xs font-bold"
          >
            {isExecuting ? <RefreshCw size={13} className="animate-spin" /> : <Play size={13} />}
            <span>Execute Tool Call</span>
          </button>
        </div>

        {/* Right Column: Tool Call Logs */}
        <div className="md:col-span-7 bg-white p-3 border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] flex flex-col h-60 overflow-hidden">
          <div className="flex items-center justify-between pb-2 border-b-2 border-[#14161A] mb-2">
            <span className="text-[#14161A] text-[11px] font-extrabold">REAL-TIME TOOL LOGS ({toolLogs.length})</span>
            <span className="text-[#6B7280] text-[10px] font-bold">Zustand Store Sync</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {toolLogs.length === 0 ? (
              <div className="text-[#6B7280] text-center py-8 text-xs font-medium">
                No tool calls logged yet. Trigger tools via Agent chat or Console.
              </div>
            ) : (
              toolLogs.map((log) => (
                <div key={log.id} className="bg-[#F6F5F1] border-2 border-[#14161A] shadow-[1px_1px_0_#14161A] p-2 text-[11px]">
                  <div className="flex items-center justify-between text-[#14161A] font-bold mb-1">
                    <span className="flex items-center gap-1.5">
                      {log.success ? (
                        <CheckCircle size={12} className="text-[#2F7A5C]" />
                      ) : (
                        <AlertCircle size={12} className="text-[#C1272D]" />
                      )}
                      <span>{log.toolName}</span>
                    </span>
                    <span className="text-[#6B7280] text-[10px]">{log.timestamp}</span>
                  </div>

                  <div className="text-[#14161A] text-[10px] pl-2 border-l-2 border-[#14161A]">
                    <div>
                      <span className="font-extrabold text-[#14161A]">args: </span>
                      {JSON.stringify(log.args)}
                    </div>
                    <div>
                      <span className="font-extrabold text-[#2F7A5C]">result: </span>
                      {JSON.stringify(log.result)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
