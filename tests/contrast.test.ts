import { describe, expect, it } from 'vitest';
import { themes } from '../src/tokens/index';
import { contrastRatio } from './helpers/contrast';

/** WCAG AA: 4.5:1 para texto normal, 3:1 para componentes de interface. */
const AA_TEXT = 4.5;
const AA_NON_TEXT = 3;

describe.each(Object.entries(themes))('tema %s', (_name, theme) => {
  it.each([
    ['textPrimary', 'surface'],
    ['textSecondary', 'surface'],
    ['textSecondary', 'surfaceMuted'],
    ['accentContrast', 'accent'],
    ['dangerContrast', 'danger'],
    ['successContrast', 'success'],
    ['warningContrast', 'warning'],
    ['accent', 'surface'],
  ] as const)('%s sobre %s atinge contraste AA de texto', (fg, bg) => {
    const ratio = contrastRatio(theme[fg], theme[bg]);
    expect(ratio, `${theme[fg]} sobre ${theme[bg]}: ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it('anel de foco se destaca da superficie (contraste nao-textual)', () => {
    const ratio = contrastRatio(theme.focusRing, theme.surface);
    expect(ratio, `${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(AA_NON_TEXT);
  });
});
