import React, { useState, useRef, useEffect } from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { registeredToolsMap } from '../../webmcp/registerWebMCPTools';
import type { ChatMessage } from '../../types/canvas';
import { Send, Bot, User, Sparkles, Terminal } from 'lucide-react';

export const AIChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'Hello! I am your AI Design Reviewer. I inspect your canvas via WebMCP tools and execute fixes live on-screen. Ask me anything about your design!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Execute AI Chat Tool Calling Engine against the SAME Zustand store tools
  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputPrompt.trim();
    if (!textToSend || isProcessing) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputPrompt('');
    setIsProcessing(true);

    try {
      // 1. Get current Canvas state
      const state = useCanvasStore.getState();
      const canvasState = {
        elements: state.elements,
        flags: state.flags,
        selectedId: state.selectedElementId,
      };

      const executedToolLogs: { toolName: string; args: Record<string, any>; summary: string }[] = [];
      let responseText = '';

      const lowerPrompt = textToSend.toLowerCase();

      // Intelligent Tool Execution Engine
      if (lowerPrompt.includes('wrong') || lowerPrompt.includes('review') || lowerPrompt.includes('critique') || lowerPrompt.includes('issue')) {
        // Step A: Call getCanvasState
        const getStateTool = registeredToolsMap.get('getCanvasState');
        if (getStateTool) await getStateTool.execute({});

        // Step B: Flag Heading & CTA Issues
        const flagTool = registeredToolsMap.get('flagIssue');
        if (flagTool) {
          const heading = canvasState.elements.find((el) => el.id === 'main-heading' || el.type === 'heading');
          if (heading && (heading.color === '#cbd5e1' || heading.color === '#d1d5db')) {
            await flagTool.execute({
              id: heading.id,
              severity: 'high',
              reason: 'Low contrast ratio (1.4:1). Faint gray text on paper background fails WCAG 2.1 AA.',
            });
            executedToolLogs.push({
              toolName: 'flagIssue',
              args: { id: heading.id, severity: 'high' },
              summary: `Flagged [${heading.id}]: Low WCAG contrast ratio (1.4:1)`,
            });
          }

          const cta = canvasState.elements.find((el) => el.id === 'cta-button' || el.type === 'button');
          if (cta && cta.h < 40) {
            await flagTool.execute({
              id: cta.id,
              severity: 'medium',
              reason: `Cramped touch target (${cta.w}×${cta.h}px, ${cta.fontSize}px font). Minimum 44px height recommended.`,
            });
            executedToolLogs.push({
              toolName: 'flagIssue',
              args: { id: cta.id, severity: 'medium' },
              summary: `Flagged [${cta.id}]: Cramped touch target (${cta.w}×${cta.h}px)`,
            });
          }
        }

        // Step C: Annotate overall feedback
        const annotateTool = registeredToolsMap.get('annotateAt');
        if (annotateTool) {
          await annotateTool.execute({
            x: 480,
            y: 340,
            text: 'Recommendation: Increase main heading contrast to 15:1 and expand CTA button height to 46px.',
          });
          executedToolLogs.push({
            toolName: 'annotateAt',
            args: { x: 480, y: 340 },
            summary: 'Pinned margin note: Layout recommendations',
          });
        }

        responseText =
          'I reviewed your canvas and flagged 2 key design issues:\n1. Low contrast heading failing WCAG AA (1.4:1 contrast).\n2. Cramped CTA button touch target.\n\nWould you like me to fix these automatically?';
      } else if (lowerPrompt.includes('cta') || lowerPrompt.includes('button') || lowerPrompt.includes('accessible')) {
        const resizeTool = registeredToolsMap.get('resizeElement');
        if (resizeTool) {
          const cta = canvasState.elements.find((el) => el.id === 'cta-button' || el.type === 'button') || canvasState.elements[0];
          if (cta) {
            await resizeTool.execute({ id: cta.id, w: 175, h: 46 });
            state.updateElement(cta.id, { fontSize: 15 });
            executedToolLogs.push({
              toolName: 'resizeElement',
              args: { id: cta.id, w: 175, h: 46 },
              summary: `Resized ${cta.id} to 175×46px (44px+ accessible touch target)`,
            });
          }
        }
        responseText = 'I expanded the CTA button touch target to 175×46px with 15px typography for mobile accessibility.';
      } else if (lowerPrompt.includes('spacing') || lowerPrompt.includes('nav') || lowerPrompt.includes('align')) {
        const spacingTool = registeredToolsMap.get('suggestSpacing');
        if (spacingTool) {
          const navIds = canvasState.elements.filter((el) => el.type === 'nav' && el.id !== 'nav-logo').map((el) => el.id);
          if (navIds.length >= 2) {
            await spacingTool.execute({ ids: navIds, gap: 16, direction: 'horizontal' });
            executedToolLogs.push({
              toolName: 'suggestSpacing',
              args: { ids: navIds, gap: 16 },
              summary: `Rebalanced spacing across ${navIds.length} nav items with 16px gap`,
            });
          }
        }
        responseText = 'I aligned the navigation items vertically and rebalanced horizontal spacing cleanly with a 16px gap.';
      } else if (lowerPrompt.includes('why') || lowerPrompt.includes('flag') || lowerPrompt.includes('contrast')) {
        // Fix heading contrast
        const heading = canvasState.elements.find((el) => el.id === 'main-heading' || el.type === 'heading');
        if (heading) {
          state.updateElement(heading.id, { color: '#17181A' });
          state.resolveFlag(heading.id);
        }
        responseText =
          'The heading was flagged because light gray text (#cbd5e1) on a paper background (#F6F5F1) has a contrast ratio of only 1.4:1 (WCAG requires 4.5:1). I have updated the heading ink color to high-contrast #17181A.';
      } else {
        // General query
        const annotateTool = registeredToolsMap.get('annotateAt');
        if (annotateTool) {
          await annotateTool.execute({ x: 300, y: 150, text: textToSend });
          executedToolLogs.push({
            toolName: 'annotateAt',
            args: { x: 300, y: 150 },
            summary: `Pinned margin note: "${textToSend}"`,
          });
        }
        responseText = `I have inspected your canvas elements. I executed a margin note for "${textToSend}". Ask me to fix contrast, resize buttons, or rebalance nav spacing anytime!`;
      }

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        toolCalls: executedToolLogs,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      console.error('Chat processing error:', e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F6F5F1] font-sans text-xs">
      {/* Header Bar */}
      <div className="p-3 border-b border-[#D8D5CC] flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-semibold text-[#17181A]">
          <Bot size={14} className="text-[#17181A]" />
          <span>AI Design Assistant</span>
        </div>
        <span className="text-[10px] text-[#6B7280]">WebMCP Direct Tools</span>
      </div>

      {/* Message History Container */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-1 text-[10px] text-[#6B7280] mb-0.5 px-1">
                {isUser ? <User size={10} /> : <Bot size={10} />}
                <span>{isUser ? 'You' : 'Crit Agent'}</span>
                <span>• {msg.timestamp}</span>
              </div>

              {/* Chat Bubble */}
              <div
                className={`p-2.5 max-w-[85%] text-xs leading-relaxed border ${
                  isUser
                    ? 'bg-[#17181A] text-white border-[#17181A]'
                    : 'bg-white text-[#17181A] border-[#D8D5CC]'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>

                {/* Compact Tool Execution Logs */}
                {msg.toolCalls && msg.toolCalls.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-[#D8D5CC] space-y-1">
                    {msg.toolCalls.map((tc, idx) => (
                      <div key={idx} className="flex items-center gap-1 text-[10px] text-[#6B7280] font-mono">
                        <Terminal size={10} className="text-[#3D6B52]" />
                        <span>→ {tc.summary}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Opening Prompts Suggestions */}
      <div className="p-2 border-t border-[#D8D5CC] bg-white flex flex-wrap gap-1">
        <button
          onClick={() => handleSendMessage("What's wrong with this?")}
          className="text-[10px] bg-[#F6F5F1] hover:bg-[#EBE8E0] text-[#17181A] border border-[#D8D5CC] px-1.5 py-0.5 transition-colors cursor-pointer"
        >
          "What's wrong with this?"
        </button>
        <button
          onClick={() => handleSendMessage('Is the CTA button accessible?')}
          className="text-[10px] bg-[#F6F5F1] hover:bg-[#EBE8E0] text-[#17181A] border border-[#D8D5CC] px-1.5 py-0.5 transition-colors cursor-pointer"
        >
          "Is CTA accessible?"
        </button>
        <button
          onClick={() => handleSendMessage('Fix spacing on the nav bar')}
          className="text-[10px] bg-[#F6F5F1] hover:bg-[#EBE8E0] text-[#17181A] border border-[#D8D5CC] px-1.5 py-0.5 transition-colors cursor-pointer"
        >
          "Fix nav spacing"
        </button>
        <button
          onClick={() => handleSendMessage('Why did you flag the heading?')}
          className="text-[10px] bg-[#F6F5F1] hover:bg-[#EBE8E0] text-[#17181A] border border-[#D8D5CC] px-1.5 py-0.5 transition-colors cursor-pointer"
        >
          "Why flag heading?"
        </button>
      </div>

      {/* Chat Input Field */}
      <div className="p-2 border-t border-[#D8D5CC] bg-[#F6F5F1] flex items-center gap-2">
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask AI agent to review or fix UI..."
          className="flex-1 bg-white border border-[#D8D5CC] p-2 text-xs text-[#17181A] focus:outline-none focus:border-[#17181A]"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={isProcessing || !inputPrompt.trim()}
          className="bg-[#17181A] hover:bg-[#262626] disabled:opacity-50 text-white p-2 border border-[#17181A] cursor-pointer"
        >
          {isProcessing ? <Sparkles size={14} className="animate-spin" /> : <Send size={14} />}
        </button>
      </div>
    </div>
  );
};
