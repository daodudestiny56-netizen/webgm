import React, { useState } from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { registeredToolsMap } from '../../webmcp/registerWebMCPTools';
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
    } catch (e: any) {
      alert(`Invalid JSON or tool execution error: ${e.message}`);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="w-full p-4 bg-[#17181A] text-white my-2 border border-[#17181A] font-sans text-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal size={15} className="text-cyan-400" />
          <span className="font-semibold text-xs text-white">WebMCP Tool Execution Console</span>
          <span className="text-[11px] text-slate-400 border border-slate-700 px-2 py-0.5">
            {registeredToolsMap.size} Tools Registered
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white text-xs flex items-center gap-1 cursor-pointer"
        >
          <span>Close Console</span>
          <X size={13} />
        </button>
      </div>

      {/* Main Grid: Left = Quick Tool Execution Form, Right = Real-time Tool Call History */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Column: Direct Execution Form */}
        <div className="md:col-span-5 bg-slate-900 p-3 border border-slate-800 flex flex-col gap-2">
          <label className="text-slate-400 text-[11px] font-semibold">SELECT WEBMCP TOOL:</label>
          <select
            value={selectedTool}
            onChange={(e) => handleToolChange(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white p-2 text-xs focus:outline-none focus:border-cyan-400"
          >
            {Array.from(registeredToolsMap.keys()).map((name) => (
              <option key={name} value={name}>
                navigator.modelContext.execute('{name}')
              </option>
            ))}
          </select>

          <label className="text-slate-400 text-[11px] font-semibold mt-1">JSON INPUT ARGUMENTS:</label>
          <textarea
            value={customArgsJson}
            onChange={(e) => setCustomArgsJson(e.target.value)}
            rows={5}
            className="w-full bg-slate-950 text-cyan-300 font-mono text-[11px] p-2 border border-slate-800 focus:outline-none focus:border-cyan-500 resize-none"
          />

          <button
            onClick={handleExecuteSelectedTool}
            disabled={isExecuting}
            className="mt-1 w-full bg-white hover:bg-slate-200 text-black font-semibold py-1.5 px-3 border border-black flex items-center justify-center gap-2 cursor-pointer text-xs"
          >
            {isExecuting ? <RefreshCw size={13} className="animate-spin" /> : <Play size={13} />}
            <span>Execute Tool Call</span>
          </button>
        </div>

        {/* Right Column: Tool Call Logs */}
        <div className="md:col-span-7 bg-slate-950 p-3 border border-slate-800 flex flex-col h-64 overflow-hidden">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
            <span className="text-slate-400 text-[11px] font-semibold">REAL-TIME TOOL LOGS ({toolLogs.length})</span>
            <span className="text-slate-500 text-[10px]">Zustand Store Sync</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {toolLogs.length === 0 ? (
              <div className="text-slate-600 text-center py-8 text-xs">
                No tool calls logged yet. Trigger tools via Agent script or Console.
              </div>
            ) : (
              toolLogs.map((log) => (
                <div key={log.id} className="bg-slate-900 border border-slate-800 p-2 text-[11px]">
                  <div className="flex items-center justify-between text-cyan-400 font-semibold mb-1">
                    <span className="flex items-center gap-1.5">
                      {log.success ? (
                        <CheckCircle size={12} className="text-emerald-400" />
                      ) : (
                        <AlertCircle size={12} className="text-rose-400" />
                      )}
                      <span>{log.toolName}</span>
                    </span>
                    <span className="text-slate-500 text-[10px]">{log.timestamp}</span>
                  </div>

                  <div className="text-slate-300 text-[10px] pl-3 border-l border-slate-700">
                    <div>
                      <span className="text-amber-400 font-semibold">args: </span>
                      {JSON.stringify(log.args)}
                    </div>
                    <div>
                      <span className="text-emerald-400 font-semibold">result: </span>
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
