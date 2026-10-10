/**
 * Calculo de contraste segundo WCAG 2.x:
 * https://www.w3.org/TR/WCAG/#dfn-relative-luminance
 */
function linearize(channel: number): number {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number {
  const channels = [1, 3, 5].map((start) => Number.parseInt(hex.slice(start, start + 2), 16));
  if (channels.some(Number.isNaN)) {
    throw new Error(`Cor hexadecimal invalida: ${hex}`);
  }
  const [r, g, b] = channels.map(linearize);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(foreground: string, background: string): number {
  const lumA = relativeLuminance(foreground);
  const lumB = relativeLuminance(background);
  const [lighter, darker] = lumA >= lumB ? [lumA, lumB] : [lumB, lumA];
  return (lighter + 0.05) / (darker + 0.05);
}
