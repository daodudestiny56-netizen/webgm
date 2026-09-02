import { useCanvasStore } from '../store/useCanvasStore';
import type { WebMCPTool } from '../types/canvas';

// Registry of tools for direct invocation by native WebMCP host or embedded AI Assistant
export const registeredToolsMap = new Map<string, WebMCPTool>();

export function registerWebMCPTools() {
  // Polyfill navigator.modelContext if missing in current browser environment
  if (typeof window !== 'undefined') {
    if (!navigator.modelContext) {
      const toolsList: WebMCPTool[] = [];
      navigator.modelContext = {
        registerTool: (tool: WebMCPTool) => {
          toolsList.push(tool);
          registeredToolsMap.set(tool.name, tool);
        },
        getTools: () => toolsList,
      };
    }
  }

  // Exactly the 6 mandatory WebMCP tools specified in Master Spec
  const tools: WebMCPTool[] = [
    {
      name: 'getCanvasState',
      description:
        'Call this tool FIRST, always, before performing any design critiques or canvas mutations. Returns the full element list: {id, type, x, y, w, h, color, fontSize, text, selected}[], along with active flagged issues and annotations.',
      inputSchema: {
        type: 'object',
        properties: {},
      },
      execute: async () => {
        const state = useCanvasStore.getState();
        const result = {
          elements: state.elements.map((el) => ({
            id: el.id,
            type: el.type,
            x: el.x,
            y: el.y,
            w: el.w,
            h: el.h,
            color: el.color,
            backgroundColor: el.backgroundColor,
            fontSize: el.fontSize,
            text: el.text,
            selected: el.id === state.selectedElementId,
          })),
          selectedElementId: state.selectedElementId,
          flags: state.flags,
          annotations: state.annotations,
        };
        state.logToolCall('getCanvasState', {}, result, true);
        return result;
      },
    },

    {
      name: 'flagIssue',
      description:
        'Flag a visual design issue on a specific canvas element. Draws a hard-bordered --redline outline + stamped severity badge ("low" | "medium" | "high"), anchored to the target element\'s top-right corner with a fixed offset. Never fixes, only flags.',
      inputSchema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID of the element to flag (e.g. "main-heading", "cta-button")' },
          severity: { type: 'string', enum: ['low', 'medium', 'high'], description: 'Severity level' },
          reason: { type: 'string', description: 'Clear explanation of the design or accessibility issue' },
        },
        required: ['id', 'severity', 'reason'],
      },
      execute: async (args: Record<string, any>) => {
        const { id, severity, reason } = args as { id: string; severity: 'low' | 'medium' | 'high'; reason: string };
        const state = useCanvasStore.getState();
        const el = state.elements.find((item) => item.id === id);
        if (!el) {
          const errRes = { error: `Element with id "${id}" not found.` };
          state.logToolCall('flagIssue', args, errRes, false);
          return errRes;
        }

        state.flagIssue(id, severity, reason);
        const res = { success: true, flaggedId: id, severity, reason };
        state.logToolCall('flagIssue', args, res, true);
        return res;
      },
    },

    {
      name: 'moveElement',
      description:
        'Reposition a single canvas element to new coordinates (x, y) with smooth animation (~300ms). Use ONLY for moving a single element.',
      inputSchema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Target element ID' },
          x: { type: 'number', description: 'New X coordinate in pixels' },
          y: { type: 'number', description: 'New Y coordinate in pixels' },
        },
        required: ['id', 'x', 'y'],
      },
      execute: async (args: Record<string, any>) => {
        const { id, x, y } = args as { id: string; x: number; y: number };
        const state = useCanvasStore.getState();
        const el = state.elements.find((item) => item.id === id);
        if (!el) {
          const errRes = { error: `Element with id "${id}" not found.` };
          state.logToolCall('moveElement', args, errRes, false);
          return errRes;
        }

        state.moveElement(id, x, y);
        const res = { success: true, id, newX: x, newY: y };
        state.logToolCall('moveElement', args, res, true);
        return res;
      },
    },

    {
      name: 'resizeElement',
      description:
        'Resize a single canvas element to new width (w) and height (h) dimensions with smooth animation (~300ms). Use for fixing cramped touch targets or expanding containers.',
      inputSchema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Target element ID' },
          w: { type: 'number', description: 'New width in pixels' },
          h: { type: 'number', description: 'New height in pixels' },
        },
        required: ['id', 'w', 'h'],
      },
      execute: async (args: Record<string, any>) => {
        const { id, w, h } = args as { id: string; w: number; h: number };
        const state = useCanvasStore.getState();
        const el = state.elements.find((item) => item.id === id);
        if (!el) {
          const errRes = { error: `Element with id "${id}" not found.` };
          state.logToolCall('resizeElement', args, errRes, false);
          return errRes;
        }

        state.resizeElement(id, w, h);
        const res = { success: true, id, newW: w, newH: h };
        state.logToolCall('resizeElement', args, res, true);
        return res;
      },
    },

    {
      name: 'suggestSpacing',
      description:
        'Redistribute equal spacing across a list of 2 or more canvas elements (e.g. navigation items) with animated before/after. Never used for a single element.',
      inputSchema: {
        type: 'object',
        properties: {
          ids: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of element IDs to re-space (e.g. ["nav-item-1", "nav-item-2", "nav-item-3"])',
          },
          gap: { type: 'number', description: 'Gap size in pixels between adjacent elements' },
          direction: {
            type: 'string',
            enum: ['horizontal', 'vertical'],
            description: 'Direction of spacing alignment (default: "horizontal")',
          },
        },
        required: ['ids', 'gap'],
      },
      execute: async (args: Record<string, any>) => {
        const { ids, gap, direction } = args as { ids: string[]; gap: number; direction?: 'horizontal' | 'vertical' };
        const state = useCanvasStore.getState();
        if (!ids || ids.length < 2) {
          const errRes = { error: 'suggestSpacing requires at least 2 element IDs.' };
          state.logToolCall('suggestSpacing', args, errRes, false);
          return errRes;
        }

        state.suggestSpacing(ids, gap, direction || 'horizontal');
        const res = { success: true, ids, gap, direction: direction || 'horizontal' };
        state.logToolCall('suggestSpacing', args, res, true);
        return res;
      },
    },

    {
      name: 'annotateAt',
      description:
        'Drop a flat bordered note card at exact canvas coordinates (x, y), connected to its target (if any) by a straight leader line. Use for macro layout comments or general recommendations.',
      inputSchema: {
        type: 'object',
        properties: {
          x: { type: 'number', description: 'Canvas X coordinate' },
          y: { type: 'number', description: 'Canvas Y coordinate' },
          text: { type: 'string', description: 'Comment or note text' },
        },
        required: ['x', 'y', 'text'],
      },
      execute: async (args: Record<string, any>) => {
        const { x, y, text } = args as { x: number; y: number; text: string };
        const state = useCanvasStore.getState();
        state.annotateAt(x, y, text);
        const res = { success: true, x, y, text };
        state.logToolCall('annotateAt', args, res, true);
        return res;
      },
    },
  ];

  // Register each tool via navigator.modelContext.registerTool
  tools.forEach((tool) => {
    registeredToolsMap.set(tool.name, tool);
    try {
      if (navigator.modelContext?.registerTool) {
        navigator.modelContext.registerTool(tool);
      }
    } catch (e) {
      console.warn(`Error registering WebMCP tool ${tool.name}:`, e);
    }
  });
}
