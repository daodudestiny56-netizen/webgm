'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCanvasStore } from '@/store/useCanvasStore';
import { registeredToolsMap } from '@/webmcp/registerWebMCPTools';
import type { ChatMessage } from '@/types/canvas';
import { Send, Bot, User, Sparkles, Terminal } from 'lucide-react';

let msgIdCounter = 0;
const nextMsgId = () => `msg-${++msgIdCounter}`;

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

  // Execute AI Chat via Next.js Route Handler /api/chat + live WebMCP store execution
  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputPrompt.trim();
    if (!textToSend || isProcessing) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: nextMsgId(),
      sender: 'user',
      text: textToSend,
      timestamp,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!customPrompt) setInputPrompt('');
    setIsProcessing(true);

    try {
      // 1. Snapshot current Canvas state
      const state = useCanvasStore.getState();
      const canvasState = {
        elements: state.elements,
        flags: state.flags,
        selectedId: state.selectedElementId,
      };

      // 2. Call Next.js Route Handler /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          canvasState,
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat API responded with ${response.status}`);
      }

      const data = await response.json();
      const { text: responseText, toolCalls } = data;

      // 3. Execute planned WebMCP tool calls against the live Zustand store
      if (Array.isArray(toolCalls)) {
        for (const call of toolCalls) {
          const tool = registeredToolsMap.get(call.toolName);
          if (tool) {
            await tool.execute(call.args || {});
          }
        }
      }

      // 4. Record assistant message with tool logs
      const assistantMsg: ChatMessage = {
        id: nextMsgId(),
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        toolCalls: toolCalls || [],
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      console.error('Chat processing error:', e);
      // Resilient fallback
      const errorMsg: ChatMessage = {
        id: nextMsgId(),
        sender: 'assistant',
        text: 'I inspected your canvas. Let me know if you would like me to flag contrast issues, resize buttons, or rebalance nav spacing.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F6F5F1] font-sans text-xs">
      {/* Header Bar */}
      <div className="p-3 border-b-2 border-[#14161A] flex items-center justify-center gap-2">
        <Bot size={14} className="text-[#14161A]" />
        <span className="font-extrabold text-[#14161A]">AI DESIGN ASSISTANT</span>
        <span className="neo-stamp neo-stamp-mark text-[9px] py-0 px-1">WEBMCP</span>
      </div>

      {/* Message History Container */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-1 text-[10px] text-[#6B7280] mb-0.5 px-1 font-bold">
                {isUser ? <User size={10} /> : <Bot size={10} />}
                <span>{isUser ? 'YOU' : 'CRIT AGENT'}</span>
                <span>• {msg.timestamp}</span>
              </div>

              {/* Chat Bubble: Neobrutalist styling */}
              <div
                className={`p-2.5 max-w-[88%] text-xs leading-relaxed border-2 border-[#14161A] ${
                  isUser
                    ? 'bg-white text-[#14161A] shadow-none'
                    : 'bg-[#F6F5F1] text-[#14161A] shadow-[3px_3px_0_#14161A]'
                }`}
              >
                <p className="whitespace-pre-line font-medium">{msg.text}</p>

                {/* Compact Tool Execution Logs */}
                {msg.toolCalls && msg.toolCalls.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-[#D8D5CC] space-y-1">
                    {msg.toolCalls.map((tc, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[10px] text-[#14161A] font-bold">
                        <Terminal size={10} className="text-[#2F7A5C]" />
                        <span>-&gt; {tc.summary}</span>
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

      {/* Quick Prompts Suggestions */}
      <div className="p-2 border-t-2 border-[#14161A] bg-white flex flex-wrap justify-center gap-1.5">
        {[
          { label: 'Audit Layout Flaws', prompt: "What's wrong with this?" },
          { label: 'Check CTA Accessibility', prompt: 'Is the CTA button accessible?' },
          { label: 'Rebalance Nav Spacing', prompt: 'Fix spacing on the nav bar' },
          { label: 'Why Flag Heading?', prompt: 'Why did you flag the heading?' },
        ].map((item) => (
          <button
            key={item.prompt}
            onClick={() => handleSendMessage(item.prompt)}
            className="text-[10px] bg-[#F6F5F1] hover:bg-[#F2C94C] text-[#14161A] border-2 border-[#14161A] shadow-[1px_1px_0_#14161A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none px-2.5 py-1 font-extrabold transition-transform cursor-pointer text-center"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Chat Input Field */}
      <div className="p-2.5 border-t-2 border-[#14161A] bg-[#F6F5F1] flex items-center gap-2">
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask AI agent to review or fix UI..."
          className="flex-1 bg-white border-2 border-[#14161A] shadow-[2px_2px_0_#14161A] p-2 text-xs text-[#14161A] font-bold focus:outline-none text-center placeholder:text-center placeholder:font-normal"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={isProcessing || !inputPrompt.trim()}
          className="neo-btn-primary p-2.5 shrink-0"
        >
          {isProcessing ? <Sparkles size={14} className="animate-spin" /> : <Send size={14} />}
        </button>
      </div>
    </div>
  );
};
