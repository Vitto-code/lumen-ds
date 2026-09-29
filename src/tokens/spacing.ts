/** Escala de espacamento em multiplos de 4px (0.25rem). */
export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.5rem',
  6: '2rem',
  8: '3rem',
  10: '4rem',
} as const;

export const radii = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  full: '999px',
} as const;

export const shadows = {
  sm: '0 1px 2px rgb(0 0 0 / 0.06)',
  md: '0 4px 8px rgb(0 0 0 / 0.08)',
  lg: '0 8px 24px rgb(0 0 0 / 0.12)',
} as const;
