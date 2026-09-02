/**
 * WCAG 2.1 Relative Luminance and Contrast Ratio Calculations
 * Standard mathematical implementation with zero external dependencies.
 */

export interface ContrastResult {
  ratio: number;
  formattedRatio: string;
  isCompliant: boolean;
  textColor: string;
  bgColor: string;
}

/**
 * Parses hex color strings (e.g. #fff, #ffffff, #14161A) to RGB numbers.
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let clean = hex.trim().replace(/^#/, '');

  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((c) => c + c)
      .join('');
  }

  if (clean.length !== 6) {
    return null;
  }

  const num = parseInt(clean, 16);
  if (isNaN(num)) return null;

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * Calculates WCAG 2.1 relative luminance for an sRGB channel.
 * L = 0.2126 * R + 0.7152 * G + 0.0722 * B
 */
export function getRelativeLuminance(rgb: { r: number; g: number; b: number }): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.04045 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Computes the contrast ratio between foreground and background colors according to WCAG 2.1.
 * Ratio = (L1 + 0.05) / (L2 + 0.05)
 */
export function computeContrastRatio(
  foregroundHex: string,
  backgroundHex: string = '#F6F5F1',
  fontSize: number = 14,
  fontWeight: string | number = 400
): ContrastResult {
  const fgRgb = hexToRgb(foregroundHex) || { r: 20, g: 22, b: 26 };
  const bgRgb = hexToRgb(backgroundHex) || { r: 246, g: 245, b: 241 };

  const l1 = getRelativeLuminance(fgRgb);
  const l2 = getRelativeLuminance(bgRgb);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  const ratio = (lighter + 0.05) / (darker + 0.05);
  const roundedRatio = Math.round(ratio * 10) / 10;

  // WCAG AA threshold: 4.5:1 for normal text, 3:1 for large text (>= 18px or bold >= 14px)
  const isBold = typeof fontWeight === 'number' ? fontWeight >= 700 : fontWeight === 'bold' || fontWeight === '800';
  const isLargeText = fontSize >= 18 || (isBold && fontSize >= 14);
  const threshold = isLargeText ? 3.0 : 4.5;

  return {
    ratio: roundedRatio,
    formattedRatio: `${roundedRatio}:1`,
    isCompliant: ratio >= threshold,
    textColor: foregroundHex,
    bgColor: backgroundHex,
  };
}
