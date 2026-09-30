import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  palette,
  radii,
  shadows,
  spacing,
  themes,
} from '../tokens/index';

const PREFIX = 'lumen';

/** Converte camelCase/PascalCase para kebab-case (surfaceMuted -> surface-muted). */
export function toKebab(value: string): string {
  return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function declarations(tokens: Record<string, string | number>, group: string): string[] {
  return Object.entries(tokens).map(([key, value]) => `  --${PREFIX}-${group}-${toKebab(key)}: ${value};`);
}

function block(selector: string, lines: string[]): string {
  return `${selector} {\n${lines.join('\n')}\n}`;
}

/**
 * Gera o CSS de tokens com tres camadas:
 *  1. `:root` com a paleta, tokens de forma/tipo e o tema claro (default);
 *  2. `prefers-color-scheme: dark` aplicando o tema escuro quando o usuario
 *     nao escolheu um tema explicito;
 *  3. `[data-theme='dark']` para sobreposicao manual (toggle persistido).
 */
export function generateTokensCss(): string {
  const paletteLines = Object.entries(palette).flatMap(([scale, shades]) =>
    Object.entries(shades).map(([step, value]) => `  --${PREFIX}-${scale}-${step}: ${value};`),
  );

  const rootLines = [
    ...paletteLines,
    ...declarations(themes.light, 'color'),
    ...declarations(spacing, 'space'),
    ...declarations(radii, 'radius'),
    ...declarations(shadows, 'shadow'),
    ...declarations(fontFamilies, 'font-family'),
    ...declarations(fontSizes, 'font-size'),
    ...declarations(fontWeights, 'font-weight'),
    ...declarations(lineHeights, 'line-height'),
  ];

  const darkLines = declarations(themes.dark, 'color');

  const mediaBlock = [
    '@media (prefers-color-scheme: dark) {',
    "  :root:not([data-theme='light']) {",
    ...darkLines.map((line) => `  ${line}`),
    '  }',
    '}',
  ].join('\n');

  return [
    '/* Gerado por src/scripts/build-tokens.ts. Nao editar manualmente. */',
    block(':root', rootLines),
    mediaBlock,
    block("[data-theme='dark']", darkLines),
    '',
  ].join('\n\n');
}
