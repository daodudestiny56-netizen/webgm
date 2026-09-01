export type ElementType = 'heading' | 'button' | 'image' | 'nav' | 'text' | 'card' | 'badge';

export interface CanvasElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  color: string;
  backgroundColor: string;
  fontSize: number;
  borderColor?: string;
  borderRadius?: number;
  fontWeight?: string | number;
  padding?: string;
  opacity?: number;
  zIndex?: number;
  selected?: boolean;
}

export type SeverityLevel = 'low' | 'medium' | 'high';

export interface FlaggedIssue {
  id: string;
  elementId: string;
  severity: SeverityLevel;
  reason: string;
  resolved?: boolean;
  createdAt: number;
}

export interface AnnotationPin {
  id: string;
  x: number;
  y: number;
  text: string;
  createdAt: number;
}

export interface AgentCursorState {
  visible: boolean;
  x: number;
  y: number;
  targetId?: string;
  actionLabel?: string;
  toolName?: string;
  timestamp: number;
}

export interface ToolLogEntry {
  id: string;
  timestamp: string;
  toolName: string;
  args: Record<string, unknown>;
  result: Record<string, unknown>;
  success: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  toolCalls?: { toolName: string; args: Record<string, any>; summary: string }[];
}

// WebMCP Type Declarations on Window Navigator
export interface WebMCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
  execute: (args: Record<string, any>) => Promise<any> | any;
}

export interface ModelContext {
  registerTool: (tool: WebMCPTool) => void;
  unregisterTool?: (name: string) => void;
  getTools?: () => WebMCPTool[];
}

declare global {
  interface Navigator {
    modelContext?: ModelContext;
  }
}
