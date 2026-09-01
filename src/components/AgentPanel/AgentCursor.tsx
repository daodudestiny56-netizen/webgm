import React from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';

export const AgentCursor: React.FC = () => {
  const agentCursor = useCanvasStore((state) => state.agentCursor);

  if (!agentCursor.visible) return null;

  return (
    <div
      className="agent-cursor-minimal"
      style={{
        transform: `translate(${agentCursor.x}px, ${agentCursor.y}px)`,
      }}
    >
      {/* Minimal Ink Dot */}
      <div className="agent-cursor-dot-minimal" />

      {/* Label Text with NO background fill */}
      <div className="agent-cursor-label-minimal">
        {agentCursor.toolName ? `[${agentCursor.toolName}] ` : ''}
        {agentCursor.actionLabel || 'Agent Acting'}
      </div>
    </div>
  );
};
