# Crit Studio

Give your AI agent hands, not just words.

**Live Application:** [https://critstudio.vercel.app/](https://critstudio.vercel.app/)  
**Interactive Workspace:** [https://critstudio.vercel.app/workspace](https://critstudio.vercel.app/workspace)

Crit Studio is a design-review workspace that exposes a live canvas as [WebMCP](https://github.com/webmcp-org) tools — so an AI agent doesn't just describe what's wrong with a design in chat, it flags, moves, resizes, and rebalances the actual layout, live, with exact spatial precision.

Built for the OpenAI WebMCP Challenge 2026.

## The problem

Every existing AI design-feedback tool works the same way: you show it a screen, it writes a paragraph. "Your CTA needs more padding." You still have to translate that description back into a fix yourself. Design review is inherently spatial — but until now, no AI tool could actually point at or move anything.

## The idea

[WebMCP](https://github.com/webmcp-org) lets a web page expose structured, callable tools directly to an AI agent via `navigator.modelContext.registerTool()` — instead of the agent guessing through the DOM or approximating clicks from a screenshot. Crit Studio uses this to give an agent real spatial hands on a design canvas: it reads exact element coordinates, then acts on them directly.

## How it works

1. **Build a mockup** — place headings, text, buttons, nav items, and image blocks manually on the canvas using the Figma-style component toolbox.
2. **Talk to the AI** — ask the docked chat panel natural questions: "What's wrong with this?", "Is the CTA accessible?", "Fix the nav spacing."
3. **Watch it execute** — the agent calls WebMCP tools that flag issues, resize touch targets, rebalance spacing, and reflow the layout live on screen, with visible before/after changes.

You can drive the canvas two ways:
- **Built-in chat panel** — talks to an embedded LLM with function-calling (powered by OpenAI-compatible AgentRouter/OpenAI inference, with resilient deterministic fallback), wired to the exact same tool executors as the native path. Works out of the box, no external agent required.
- **Native WebMCP host** — any WebMCP-compatible agent (e.g. Chrome with the experimental flag, or a ChatGPT in-browser agent) can discover and call the same tools directly via `navigator.modelContext`.

## WebMCP tools

Six tools, registered via `navigator.modelContext.registerTool()`:

| Tool | Input | What it does |
|---|---|---|
| `getCanvasState` | `{}` | Returns the full element list (`id`, `type`, `x`, `y`, `w`, `h`, `color`, `fontSize`, `text`, `selected`). How the agent "sees" the board without vision. |
| `flagIssue` | `{ id, severity: "low"\|"medium"\|"high", reason }` | Flags an element with a bordered severity badge, anchored to its top-right corner. |
| `moveElement` | `{ id, x, y }` | Animates an element to a new position. |
| `resizeElement` | `{ id, w, h }` | Animates a resize. |
| `suggestSpacing` | `{ ids: string[], gap, direction? }` | Redistributes even spacing across a group of elements with an animated before/after. |
| `annotateAt` | `{ x, y, text }` | Drops a note card pinned to an exact canvas coordinate. |

Tool descriptions are written to be explicit about when each should (and shouldn't) be used, so the agent doesn't pick the wrong tool for a given fix.

## Key features

- **Live WebMCP Spatial Tool Execution**: Real-time canvas mutations triggered via structured agent tool calls with sub-pixel precision.
- **1-Click Export Design Audit Report**: Downloadable design critique summaries in formatted **Markdown (`.md`)** and structured **JSON (`.json`)** containing element inventories, flagged issue logs, and chronological WebMCP tool execution trails.
- **Live WCAG 2.1 Accessibility & Touch Target Overlay (`WCAG Grid`)**:
  - Exact mathematical relative luminance contrast ratio badges (e.g. `1.4:1 FAIL` in redline vs `18.1:1 PASS` in green confirm ink).
  - Dashed `44×44px` minimum tap-target bounding boxes around undersized interactive buttons and nav items.
- **Visual Before / After Diff Mode (`Diff Mode`)**: Side-by-side snapshot comparison between initial flawed baseline and resolved state.
- **WebMCP Tool Log Console Drawer (`Console`)**: Expandable inspection drawer rendering real-time execution logs for every tool call.
- **Framed Workspace with Outer Breathing Room**: Consistent 24px uniform outer margin framing the full three-panel studio shell.

## Tech stack

- **Next.js 16 (App Router)** + **TypeScript**
- **Zustand** — single source of truth for canvas state; every tool (manual editing, native WebMCP, and the chat panel) reads and writes the same store
- **WebMCP** via `navigator.modelContext`, with polyfill fallback for browsers without native support
- **DOM-based canvas** (absolutely-positioned elements, not `<canvas>`/WebGL)
- **AgentRouter / OpenAI API Integration** — route handler (`/api/chat`) for real model inference and function calling, with seamless fallback for guaranteed demo reliability

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000/) — the landing page. Click **Launch Workspace** or go directly to `/workspace`.

## Environment variables

Create a `.env.local` file for local development (or configure in the Vercel Dashboard for production):

```env
AGENTROUTER_API_KEY=your_key_here
AGENTROUTER_BASE_URL=https://agentrouter.org/v1
AGENTROUTER_MODEL=deepseek-v4-flash
```

*Note:* If no key is configured, Crit Studio automatically runs in zero-config autonomous mode using its built-in deterministic spatial engine.

## Testing native WebMCP support

`navigator.modelContext` is an early-preview browser API. To test the native (non-chat-panel) path:

- **Chrome**: enable `chrome://flags/#enable-experimental-web-platform-features`, restart, then visit the workspace and connect a WebMCP-aware agent/extension.
- **ChatGPT in-browser agent**: visit the workspace URL and ask it to review the canvas — it discovers the six registered tools automatically.

If native support isn't available in your browser, the app falls back to the `@mcp-b/global` polyfill automatically, and the built-in chat panel works regardless.

## Project structure

```text
app/
  layout.tsx        # root layout, font pairing + global styles
  page.tsx          # marketing landing page with interactive canvas preview
  workspace/
    page.tsx        # interactive design workspace shell
  api/
    chat/
      route.ts      # LLM route handler with real function calling + fallback
src/
  components/
    Canvas/         # drafting canvas, grid ticks, elements, WCAG overlay
    Workspace/      # left toolbox, right dock, AI chat panel, properties inspector
    AgentPanel/     # agent cursor indicator, tool log simulator console
    Annotations/    # proofreader flags, leader lines, pinned margin notes
  store/
    useCanvasStore  # unified Zustand store for manual edits & WebMCP tools
  utils/
    exportAuditReport.ts  # Markdown & JSON session audit export engine
    wcagMath.ts           # WCAG 2.1 relative luminance & contrast ratio math
    pinCollision.ts       # collision-free placement for margin notes
globals.css         # Neobrutalist design token system
```

## Design system

A project-grounded neobrutalist visual language — hard borders, flat colors, offset shadows — using a small, deliberate palette rather than generic defaults:

```css
--paper: #F6F5F1;    /* base background */
--ink: #14161A;      /* borders, text, structure */
--rule: #D8D5CC;     /* hairline dividers */
--redline: #C1272D;  /* flags and corrections */
--confirm: #2F7A5C;  /* resolved/fixed states */
--mark: #F2C94C;     /* highlighter accent — CTAs only */
```

Typography pairing:
- **Headings, stamps, buttons:** `Bricolage Grotesque`
- **Body text, descriptions, logs:** `Plus Jakarta Sans`

## Submission

OpenAI WebMCP Challenge 2026 — built solo.
- **Live Demo:** [https://critstudio.vercel.app/](https://critstudio.vercel.app/)
- **Workspace:** [https://critstudio.vercel.app/workspace](https://critstudio.vercel.app/workspace)
