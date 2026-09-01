import { create } from 'zustand';
import type { CanvasElement, FlaggedIssue, AnnotationPin, AgentCursorState, ToolLogEntry, ElementType } from '../types/canvas';

// Default Sample Baseline Layout
export const SAMPLE_MOCKUP_ELEMENTS: CanvasElement[] = [
  {
    id: 'nav-logo',
    type: 'nav',
    x: 40,
    y: 35,
    w: 110,
    h: 36,
    text: 'ACME UI',
    color: '#17181A',
    backgroundColor: '#EBE8E0',
    fontSize: 16,
    fontWeight: 800,
    zIndex: 10,
  },
  {
    id: 'nav-item-1',
    type: 'nav',
    x: 180,
    y: 26, // misaligned y flaw
    w: 90,
    h: 32,
    text: 'Products',
    color: '#17181A',
    backgroundColor: '#ffffff',
    fontSize: 14,
    fontWeight: 600,
    zIndex: 10,
  },
  {
    id: 'nav-item-2',
    type: 'nav',
    x: 260, // cramped/overlapping gap flaw
    y: 42, // misaligned y flaw
    w: 95,
    h: 32,
    text: 'Solutions',
    color: '#17181A',
    backgroundColor: '#ffffff',
    fontSize: 14,
    fontWeight: 600,
    zIndex: 10,
  },
  {
    id: 'nav-item-3',
    type: 'nav',
    x: 345,
    y: 22, // misaligned y flaw
    w: 95,
    h: 32,
    text: 'Enterprise',
    color: '#17181A',
    backgroundColor: '#ffffff',
    fontSize: 14,
    fontWeight: 600,
    zIndex: 10,
  },
  {
    id: 'nav-item-4',
    type: 'nav',
    x: 430, // cramped gap flaw
    y: 36, // misaligned y flaw
    w: 80,
    h: 32,
    text: 'Pricing',
    color: '#17181A',
    backgroundColor: '#ffffff',
    fontSize: 14,
    fontWeight: 600,
    zIndex: 10,
  },
  {
    id: 'main-heading',
    type: 'heading',
    x: 40,
    y: 105,
    w: 450,
    h: 95,
    text: 'The All-In-One Platform for Modern Teams',
    color: '#cbd5e1', // Fail WCAG contrast (1.4:1)
    backgroundColor: 'transparent',
    fontSize: 28,
    fontWeight: 800,
    zIndex: 5,
  },
  {
    id: 'sub-text',
    type: 'text',
    x: 40,
    y: 210,
    w: 450,
    h: 70,
    text: 'Streamline team workflows, track design iterations, and automate routine visual QA checks in real-time.',
    color: '#6B7280',
    backgroundColor: 'transparent',
    fontSize: 14,
    fontWeight: 400,
    zIndex: 5,
  },
  {
    id: 'cta-button',
    type: 'button',
    x: 40,
    y: 295,
    w: 110, // Cramped! Should be ~180px
    h: 28,  // Cramped! Should be ~48px
    text: 'Start Free Trial ->',
    color: '#ffffff',
    backgroundColor: '#17181A',
    fontSize: 11, // Tiny text!
    fontWeight: 700,
    zIndex: 8,
  },
  {
    id: 'hero-image-block',
    type: 'card',
    x: 520,
    y: 105,
    w: 240,
    h: 240,
    text: '[ ACME APP DASHBOARD ]\n\nAnalytics & Visual Metrics',
    color: '#17181A',
    backgroundColor: '#EBE8E0',
    fontSize: 13,
    fontWeight: 600,
    zIndex: 4,
  },
];

interface CanvasStoreState {
  elements: CanvasElement[];
  flags: FlaggedIssue[];
  annotations: AnnotationPin[];
  agentCursor: AgentCursorState;
  toolLogs: ToolLogEntry[];
  selectedElementId: string | null;
  isBeforeAfterMode: boolean;
  beforeSnapshot: CanvasElement[] | null;

  // Actions
  setElements: (elements: CanvasElement[]) => void;
  addElement: (type: ElementType) => void;
  deleteElement: (id: string) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  moveElement: (id: string, x: number, y: number) => void;
  resizeElement: (id: string, w: number, h: number) => void;
  flagIssue: (elementId: string, severity: 'low' | 'medium' | 'high', reason: string) => void;
  resolveFlag: (elementId: string) => void;
  removeFlag: (flagId: string) => void;
  annotateAt: (x: number, y: number, text: string) => void;
  suggestSpacing: (ids: string[], gap: number, direction?: 'horizontal' | 'vertical') => void;
  setAgentCursor: (cursor: Partial<AgentCursorState>) => void;
  clearAgentCursor: () => void;
  logToolCall: (toolName: string, args: Record<string, unknown>, result: Record<string, unknown>, success?: boolean) => void;
  selectElement: (id: string | null) => void;
  toggleBeforeAfter: () => void;
  clearCanvas: () => void;
  loadExampleLayout: () => void;
  resetToFlawedMockup: () => void;
  applyFullAgentFixes: () => void;
}

export const useCanvasStore = create<CanvasStoreState>((set, get) => ({
  elements: SAMPLE_MOCKUP_ELEMENTS,
  flags: [],
  annotations: [],
  agentCursor: {
    visible: false,
    x: 0,
    y: 0,
    timestamp: Date.now(),
  },
  toolLogs: [],
  selectedElementId: null,
  isBeforeAfterMode: false,
  beforeSnapshot: SAMPLE_MOCKUP_ELEMENTS,

  setElements: (elements) => set({ elements }),

  addElement: (type) => {
    const count = get().elements.length + 1;
    let newEl: CanvasElement;

    const baseId = `${type}-${count}`;
    const defaultX = 200 + (count % 4) * 20;
    const defaultY = 150 + (count % 4) * 20;

    switch (type) {
      case 'heading':
        newEl = {
          id: baseId,
          type: 'heading',
          x: defaultX,
          y: defaultY,
          w: 380,
          h: 60,
          text: 'New Heading Title',
          color: '#17181A',
          backgroundColor: 'transparent',
          fontSize: 26,
          fontWeight: 800,
          zIndex: 10,
        };
        break;
      case 'text':
        newEl = {
          id: baseId,
          type: 'text',
          x: defaultX,
          y: defaultY,
          w: 360,
          h: 50,
          text: 'Add body copy description text here.',
          color: '#6B7280',
          backgroundColor: 'transparent',
          fontSize: 14,
          fontWeight: 400,
          zIndex: 8,
        };
        break;
      case 'button':
        newEl = {
          id: baseId,
          type: 'button',
          x: defaultX,
          y: defaultY,
          w: 160,
          h: 42,
          text: 'Action Button ->',
          color: '#ffffff',
          backgroundColor: '#17181A',
          fontSize: 14,
          fontWeight: 700,
          zIndex: 15,
        };
        break;
      case 'nav':
        newEl = {
          id: baseId,
          type: 'nav',
          x: defaultX,
          y: 32,
          w: 90,
          h: 32,
          text: 'Nav Item',
          color: '#17181A',
          backgroundColor: '#ffffff',
          fontSize: 14,
          fontWeight: 600,
          zIndex: 12,
        };
        break;
      case 'card':
        newEl = {
          id: baseId,
          type: 'card',
          x: defaultX,
          y: defaultY,
          w: 220,
          h: 180,
          text: '[ Image / Graphic Block ]',
          color: '#17181A',
          backgroundColor: '#EBE8E0',
          fontSize: 13,
          fontWeight: 600,
          zIndex: 5,
        };
        break;
      default: // badge / container
        newEl = {
          id: baseId,
          type: 'badge',
          x: defaultX,
          y: defaultY,
          w: 200,
          h: 120,
          text: 'Container Box',
          color: '#17181A',
          backgroundColor: '#ffffff',
          fontSize: 13,
          fontWeight: 500,
          zIndex: 4,
        };
    }

    set({
      elements: [...get().elements, newEl],
      selectedElementId: newEl.id,
    });
  },

  deleteElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      flags: state.flags.filter((f) => f.elementId !== id),
      selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
    })),

  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) => (el.id === id ? { ...el, ...updates } : el)),
    })),

  moveElement: (id, x, y) => {
    const el = get().elements.find((item) => item.id === id);
    if (!el) return;

    set({
      agentCursor: {
        visible: true,
        x: x + el.w / 2,
        y: y + el.h / 2,
        targetId: id,
        actionLabel: `Moving ${id} to (${Math.round(x)}, ${Math.round(y)})`,
        toolName: 'moveElement',
        timestamp: Date.now(),
      },
      elements: get().elements.map((item) => (item.id === id ? { ...item, x, y } : item)),
    });
  },

  resizeElement: (id, w, h) => {
    const el = get().elements.find((item) => item.id === id);
    if (!el) return;

    const updatedFlags = get().flags.map((f) => (f.elementId === id ? { ...f, resolved: true } : f));

    set({
      flags: updatedFlags,
      agentCursor: {
        visible: true,
        x: el.x + w / 2,
        y: el.y + h / 2,
        targetId: id,
        actionLabel: `Resizing ${id} to ${Math.round(w)}×${Math.round(h)}px`,
        toolName: 'resizeElement',
        timestamp: Date.now(),
      },
      elements: get().elements.map((item) => (item.id === id ? { ...item, w, h } : item)),
    });
  },

  flagIssue: (elementId, severity, reason) => {
    const el = get().elements.find((item) => item.id === elementId);
    const newFlag: FlaggedIssue = {
      id: `flag-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      elementId,
      severity,
      reason,
      resolved: false,
      createdAt: Date.now(),
    };

    set({
      flags: [...get().flags.filter((f) => f.elementId !== elementId), newFlag],
      agentCursor: el
        ? {
            visible: true,
            x: el.x + el.w / 2,
            y: el.y,
            targetId: elementId,
            actionLabel: `Marked: ${reason.substring(0, 30)}...`,
            toolName: 'flagIssue',
            timestamp: Date.now(),
          }
        : get().agentCursor,
    });
  },

  resolveFlag: (elementId) =>
    set((state) => ({
      flags: state.flags.map((f) => (f.elementId === elementId ? { ...f, resolved: true } : f)),
    })),

  removeFlag: (flagId) =>
    set((state) => ({
      flags: state.flags.filter((f) => f.id !== flagId),
    })),

  annotateAt: (x, y, text) => {
    const newPin: AnnotationPin = {
      id: `pin-${Date.now()}`,
      x,
      y,
      text,
      createdAt: Date.now(),
    };

    set({
      annotations: [...get().annotations, newPin],
      agentCursor: {
        visible: true,
        x,
        y,
        actionLabel: `Margin Note: "${text.substring(0, 25)}..."`,
        toolName: 'annotateAt',
        timestamp: Date.now(),
      },
    });
  },

  suggestSpacing: (ids, gap, direction = 'horizontal') => {
    const state = get();
    const targetElements = state.elements.filter((el) => ids.includes(el.id));

    if (targetElements.length < 2) return;

    let updatedElements = [...state.elements];

    if (direction === 'horizontal') {
      const sorted = [...targetElements].sort((a, b) => a.x - b.x);
      const targetY = 32;
      let currentX = sorted[0].x;

      sorted.forEach((el, index) => {
        if (index > 0) {
          currentX += sorted[index - 1].w + gap;
        }
        updatedElements = updatedElements.map((item) =>
          item.id === el.id ? { ...item, x: currentX, y: targetY } : item
        );
      });
    } else {
      const sorted = [...targetElements].sort((a, b) => a.y - b.y);
      const targetX = sorted[0].x;
      let currentY = sorted[0].y;

      sorted.forEach((el, index) => {
        if (index > 0) {
          currentY += sorted[index - 1].h + gap;
        }
        updatedElements = updatedElements.map((item) =>
          item.id === el.id ? { ...item, x: targetX, y: currentY } : item
        );
      });
    }

    const firstEl = targetElements[0];
    set({
      elements: updatedElements,
      agentCursor: {
        visible: true,
        x: firstEl.x + 100,
        y: firstEl.y + 20,
        actionLabel: `Rebalanced spacing across ${ids.length} items (${gap}px gap)`,
        toolName: 'suggestSpacing',
        timestamp: Date.now(),
      },
    });
  },

  setAgentCursor: (cursor) =>
    set((state) => ({
      agentCursor: { ...state.agentCursor, ...cursor, visible: true, timestamp: Date.now() },
    })),

  clearAgentCursor: () =>
    set((state) => ({
      agentCursor: { ...state.agentCursor, visible: false },
    })),

  logToolCall: (toolName, args, result, success = true) => {
    const entry: ToolLogEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      toolName,
      args,
      result,
      success,
    };
    set((state) => ({
      toolLogs: [entry, ...state.toolLogs].slice(0, 30),
    }));
  },

  selectElement: (id) => set({ selectedElementId: id }),

  toggleBeforeAfter: () => set((state) => ({ isBeforeAfterMode: !state.isBeforeAfterMode })),

  clearCanvas: () => set({ elements: [], flags: [], annotations: [], selectedElementId: null }),

  loadExampleLayout: () =>
    set({
      elements: SAMPLE_MOCKUP_ELEMENTS,
      flags: [],
      annotations: [],
      beforeSnapshot: SAMPLE_MOCKUP_ELEMENTS,
      selectedElementId: null,
    }),

  resetToFlawedMockup: () =>
    set({
      elements: SAMPLE_MOCKUP_ELEMENTS,
      flags: [],
      annotations: [],
      agentCursor: { visible: false, x: 0, y: 0, timestamp: Date.now() },
      isBeforeAfterMode: false,
    }),

  applyFullAgentFixes: () => {
    const state = get();
    const fixedElements = state.elements.map((el) => {
      if (el.id === 'main-heading') {
        return { ...el, color: '#17181A' };
      }
      if (el.id === 'cta-button') {
        return { ...el, w: 175, h: 46, fontSize: 15 };
      }
      return el;
    });

    const navItems = ['nav-item-1', 'nav-item-2', 'nav-item-3', 'nav-item-4'];
    let startX = 180;
    const gap = 16;
    const targetY = 32;

    const finalElements = fixedElements.map((el) => {
      if (navItems.includes(el.id)) {
        const updated = { ...el, x: startX, y: targetY };
        startX += el.w + gap;
        return updated;
      }
      return el;
    });

    const resolvedFlags = state.flags.map((f) => ({ ...f, resolved: true }));

    set({
      elements: finalElements,
      flags: resolvedFlags,
      agentCursor: {
        visible: true,
        x: 300,
        y: 200,
        actionLabel: 'Applied full layout reflow & contrast corrections',
        toolName: 'applyFullAgentFixes',
        timestamp: Date.now(),
      },
    });
  },
}));
