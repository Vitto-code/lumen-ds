import { darkTheme, lightTheme, palette } from './colors';
import { radii, shadows, spacing } from './spacing';
import { fontFamilies, fontSizes, fontWeights, lineHeights } from './typography';

export { darkTheme, lightTheme, palette };
export { fontFamilies, fontSizes, fontWeights, lineHeights, radii, shadows, spacing };

/** Temas disponiveis, usados pelo gerador de CSS e pelos testes. */
export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export type ThemeName = keyof typeof themes;
