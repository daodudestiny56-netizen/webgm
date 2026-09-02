import type { CanvasElement, FlaggedIssue, AnnotationPin, ToolLogEntry } from '@/types/canvas';

export interface AuditSessionData {
  elements: CanvasElement[];
  flags: FlaggedIssue[];
  annotations: AnnotationPin[];
  toolLogs: ToolLogEntry[];
}

/**
 * Generates a clean, comprehensive Markdown report of the design audit session.
 */
export function generateAuditReportMarkdown(data: AuditSessionData): string {
  const { elements, flags, annotations, toolLogs } = data;
  const timestamp = new Date().toISOString();
  const humanTime = new Date().toLocaleString();

  const totalElements = elements.length;
  const totalFlags = flags.length;
  const resolvedFlags = flags.filter((f) => f.resolved).length;
  const openFlags = totalFlags - resolvedFlags;

  let md = `# Crit Studio — Design Audit Report\n\n`;
  md += `**Document:** ACME_PROTOTYPE.fig  \n`;
  md += `**Generated At:** ${humanTime} (${timestamp})  \n`;
  md += `**Engine:** WebMCP Design Canvas Engine v1.0  \n\n`;

  md += `## 1. Session Summary\n\n`;
  md += `- **Total Elements on Canvas:** ${totalElements}\n`;
  md += `- **Total Issues Flagged:** ${totalFlags}\n`;
  md += `- **Issues Resolved / Fixed:** ${resolvedFlags}\n`;
  md += `- **Open Flaws Remaining:** ${openFlags}\n`;
  md += `- **Total WebMCP Tool Invocations:** ${toolLogs.length}\n\n`;

  md += `## 2. Flagged Issues & Design Flaws\n\n`;
  if (flags.length === 0) {
    md += `*No issues flagged in this session.*\n\n`;
  } else {
    md += `| Severity | Target Element | Reason | Status |\n`;
    md += `| :--- | :--- | :--- | :--- |\n`;
    flags.forEach((f) => {
      const statusText = f.resolved ? 'RESOLVED (Fixed)' : 'OPEN (Failing)';
      md += `| **${f.severity.toUpperCase()}** | \`${f.elementId}\` | ${f.reason.replace(/\|/g, '\\|')} | **${statusText}** |\n`;
    });
    md += `\n`;
  }

  md += `## 3. Element Inventory\n\n`;
  if (elements.length === 0) {
    md += `*Canvas is empty.*\n\n`;
  } else {
    md += `| Element ID | Type | Coordinates (x, y) | Dimensions (w × h) | Color | Font Size | Text / Label |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;
    elements.forEach((el) => {
      const sanitizedText = el.text ? el.text.replace(/\n/g, ' ').replace(/\|/g, '\\|') : '-';
      md += `| \`${el.id}\` | ${el.type} | (${el.x}, ${el.y}) | ${el.w} × ${el.h}px | \`${el.color}\` | ${el.fontSize}px | ${sanitizedText} |\n`;
    });
    md += `\n`;
  }

  md += `## 4. Pinned Annotations & Margin Notes\n\n`;
  if (annotations.length === 0) {
    md += `*No annotations placed.*\n\n`;
  } else {
    md += `| ID | Position (x, y) | Target ID | Note Content |\n`;
    md += `| :--- | :--- | :--- | :--- |\n`;
    annotations.forEach((a) => {
      const target = a.targetId ? `\`${a.targetId}\`` : 'Canvas';
      md += `| \`${a.id}\` | (${a.x}, ${a.y}) | ${target} | ${a.text.replace(/\|/g, '\\|')} |\n`;
    });
    md += `\n`;
  }

  md += `## 5. WebMCP Tool Execution Trail\n\n`;
  if (toolLogs.length === 0) {
    md += `*No WebMCP tools invoked yet.*\n\n`;
  } else {
    md += `| Time | Tool Name | Arguments | Status |\n`;
    md += `| :--- | :--- | :--- | :--- |\n`;
    toolLogs.forEach((log) => {
      const argsStr = JSON.stringify(log.args).replace(/\|/g, '\\|');
      const status = log.success ? 'Success' : 'Failed';
      md += `| ${log.timestamp} | \`${log.toolName}\` | \`${argsStr}\` | ${status} |\n`;
    });
    md += `\n`;
  }

  md += `---\n*Report compiled autonomously via Crit Studio WebMCP Audit Engine.*\n`;
  return md;
}

/**
 * Generates structured JSON representation of the session audit.
 */
export function generateAuditReportJson(data: AuditSessionData): string {
  const payload = {
    metadata: {
      appName: 'Crit Studio',
      engine: 'WebMCP Design Canvas Engine v1.0',
      document: 'ACME_PROTOTYPE.fig',
      exportedAt: new Date().toISOString(),
    },
    summary: {
      totalElements: data.elements.length,
      totalFlags: data.flags.length,
      resolvedFlags: data.flags.filter((f) => f.resolved).length,
      openFlags: data.flags.filter((f) => !f.resolved).length,
      totalToolCalls: data.toolLogs.length,
    },
    flags: data.flags,
    elements: data.elements,
    annotations: data.annotations,
    toolExecutionTrail: data.toolLogs,
  };

  return JSON.stringify(payload, null, 2);
}

/**
 * Client-side file downloader using Blob and anchor download.
 */
export function triggerFileDownload(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
