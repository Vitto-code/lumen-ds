/** Escala tipografica e familias de fonte. */
export const fontFamilies = {
  base: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  mono: "ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace",
} as const;

export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
} as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const lineHeights = {
  tight: 1.25,
  base: 1.5,
  relaxed: 1.75,
} as const;
