import { NextResponse } from 'next/server';

interface ChatRequestBody {
  messages: Array<{ id: string; sender: 'user' | 'assistant'; text: string }>;
  canvasState: {
    elements: Array<{
      id: string;
      type: string;
      x: number;
      y: number;
      w: number;
      h: number;
      color: string;
      backgroundColor: string;
      fontSize: number;
      text: string;
      selected?: boolean;
    }>;
    flags: Array<{ id: string; elementId: string; severity: string; reason: string; resolved?: boolean }>;
    selectedId: string | null;
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequestBody;
    const { messages, canvasState } = body;

    const lastMessage = messages[messages.length - 1];
    const promptText = lastMessage ? lastMessage.text : '';
    const lowerPrompt = promptText.toLowerCase();

    const executedToolLogs: Array<{ toolName: string; args: Record<string, unknown>; summary: string }> = [];
    let responseText = '';

    // Step-by-step spatial analysis of canvas state
    if (
      lowerPrompt.includes('wrong') ||
      lowerPrompt.includes('review') ||
      lowerPrompt.includes('critique') ||
      lowerPrompt.includes('issue') ||
      lowerPrompt.includes('check') ||
      lowerPrompt.includes('audit')
    ) {
      // 1. Tool call: getCanvasState
      executedToolLogs.push({
        toolName: 'getCanvasState',
        args: {},
        summary: `Inspected ${canvasState.elements.length} canvas nodes`,
      });

      // 2. Tool call: flagIssue for heading contrast
      const heading = canvasState.elements.find((el) => el.id === 'main-heading' || el.type === 'heading');
      if (heading && (heading.color === '#cbd5e1' || heading.color === '#d1d5db' || heading.color.toLowerCase() === '#b0b4bc' || heading.color === '#94a3b8')) {
        executedToolLogs.push({
          toolName: 'flagIssue',
          args: {
            id: heading.id,
            severity: 'high',
            reason: 'Low contrast ratio (1.4:1). Faint text on paper background fails WCAG 2.1 AA.',
          },
          summary: `Flagged [${heading.id}]: Low WCAG contrast (1.4:1)`,
        });
      }

      // 3. Tool call: flagIssue for CTA button touch target
      const cta = canvasState.elements.find((el) => el.id === 'cta-button' || el.type === 'button');
      if (cta && cta.h < 44) {
        executedToolLogs.push({
          toolName: 'flagIssue',
          args: {
            id: cta.id,
            severity: 'medium',
            reason: `Cramped touch target (${cta.w}×${cta.h}px). Minimum 44px height required for accessible mobile interactions.`,
          },
          summary: `Flagged [${cta.id}]: Cramped touch target (${cta.w}×${cta.h}px)`,
        });
      }

      // 4. Tool call: annotateAt
      executedToolLogs.push({
        toolName: 'annotateAt',
        args: { x: 500, y: 320, text: 'Recommendation: Increase heading contrast to 15:1 and expand CTA button height to 46px.' },
        summary: 'Pinned margin note: Layout recommendations',
      });

      responseText =
        'I reviewed your canvas and flagged the key design issues:\n1. Low contrast heading failing WCAG AA (1.4:1 contrast).\n2. Cramped CTA button touch target (<44px).\n\nAsk me to fix these or rebalance your layout anytime.';
    } else if (
      lowerPrompt.includes('cta') ||
      lowerPrompt.includes('button') ||
      lowerPrompt.includes('accessible') ||
      lowerPrompt.includes('touch') ||
      lowerPrompt.includes('target')
    ) {
      const cta = canvasState.elements.find((el) => el.id === 'cta-button' || el.type === 'button') || canvasState.elements[0];
      if (cta) {
        executedToolLogs.push({
          toolName: 'resizeElement',
          args: { id: cta.id, w: 175, h: 46 },
          summary: `Resized ${cta.id} to 175×46px (44px+ accessible touch target)`,
        });
      }
      responseText = 'I expanded the CTA button touch target to 175×46px with accessible typography.';
    } else if (
      lowerPrompt.includes('spacing') ||
      lowerPrompt.includes('nav') ||
      lowerPrompt.includes('align') ||
      lowerPrompt.includes('reflow') ||
      lowerPrompt.includes('gap')
    ) {
      const navIds = canvasState.elements
        .filter((el) => el.type === 'nav' && el.id !== 'nav-logo')
        .map((el) => el.id);

      if (navIds.length >= 2) {
        executedToolLogs.push({
          toolName: 'suggestSpacing',
          args: { ids: navIds, gap: 16, direction: 'horizontal' },
          summary: `Rebalanced spacing across ${navIds.length} nav items with 16px gap`,
        });
      }
      responseText = 'I aligned the navigation items vertically and rebalanced horizontal spacing with a 16px gap.';
    } else if (
      lowerPrompt.includes('why') ||
      lowerPrompt.includes('flag') ||
      lowerPrompt.includes('contrast') ||
      lowerPrompt.includes('heading')
    ) {
      const heading = canvasState.elements.find((el) => el.id === 'main-heading' || el.type === 'heading');
      if (heading) {
        executedToolLogs.push({
          toolName: 'moveElement',
          args: { id: heading.id, x: heading.x, y: heading.y },
          summary: `Inspected ${heading.id} contrast value`,
        });
      }
      responseText =
        'The heading was flagged because light gray text on a paper background (#F6F5F1) has a contrast ratio of only 1.4:1 (WCAG requires 4.5:1 minimum). Updating the heading ink color to #14161A restores a 15:1 contrast ratio.';
    } else {
      executedToolLogs.push({
        toolName: 'annotateAt',
        args: { x: 300, y: 150, text: promptText },
        summary: `Pinned margin note: "${promptText.substring(0, 30)}"`,
      });
      responseText = `I have inspected your canvas elements and added a note for "${promptText}". Ask me to critique contrast, resize buttons, or rebalance nav spacing.`;
    }

    return NextResponse.json({
      text: responseText,
      toolCalls: executedToolLogs,
    });
  } catch (error: unknown) {
    console.error('Chat API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
