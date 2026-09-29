/**
 * Paleta base e temas semanticos de cor.
 *
 * Componentes nunca usam a paleta diretamente: eles consomem os tokens
 * semanticos (surface, textPrimary, accent...), o que permite trocar o
 * tema sem tocar em nenhum componente.
 */
export const palette = {
  zinc: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  blue: {
    300: '#93c5fd',
    400: '#60a5fa',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
  },
  red: {
    400: '#f87171',
    700: '#b91c1c',
  },
  green: {
    400: '#4ade80',
    700: '#15803d',
  },
  amber: {
    400: '#fbbf24',
    700: '#b45309',
  },
} as const;

export interface ColorTheme {
  surface: string;
  surfaceMuted: string;
  textPrimary: string;
  textSecondary: string;
  textInverse: string;
  accent: string;
  accentHover: string;
  accentContrast: string;
  border: string;
  focusRing: string;
  danger: string;
  dangerContrast: string;
  success: string;
  successContrast: string;
  warning: string;
  warningContrast: string;
}

export const lightTheme: ColorTheme = {
  surface: '#ffffff',
  surfaceMuted: palette.zinc[100],
  textPrimary: palette.zinc[900],
  textSecondary: palette.zinc[600],
  textInverse: palette.zinc[50],
  accent: palette.blue[700],
  accentHover: palette.blue[800],
  accentContrast: '#ffffff',
  border: palette.zinc[300],
  focusRing: palette.blue[600],
  danger: palette.red[700],
  dangerContrast: '#ffffff',
  success: palette.green[700],
  successContrast: '#ffffff',
  warning: palette.amber[700],
  warningContrast: '#ffffff',
};

export const darkTheme: ColorTheme = {
  surface: palette.zinc[900],
  surfaceMuted: palette.zinc[800],
  textPrimary: palette.zinc[50],
  textSecondary: palette.zinc[400],
  textInverse: palette.zinc[900],
  accent: palette.blue[400],
  accentHover: palette.blue[300],
  accentContrast: palette.zinc[900],
  border: palette.zinc[700],
  focusRing: palette.blue[400],
  danger: palette.red[400],
  dangerContrast: palette.zinc[900],
  success: palette.green[400],
  successContrast: palette.zinc[900],
  warning: palette.amber[400],
  warningContrast: palette.zinc[900],
};
