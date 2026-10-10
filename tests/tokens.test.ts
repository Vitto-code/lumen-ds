import { describe, expect, it } from 'vitest';
import { fontSizes, lightTheme, palette, spacing, themes } from '../src/tokens/index';

const HEX_PATTERN = /^#[0-9a-f]{6}$/;

describe('temas', () => {
  it('claro e escuro expoem exatamente os mesmos tokens semanticos', () => {
    expect(Object.keys(themes.dark).sort()).toEqual(Object.keys(themes.light).sort());
  });

  it('todos os tokens de cor sao hexadecimais validos', () => {
    for (const [themeName, theme] of Object.entries(themes)) {
      for (const [token, value] of Object.entries(theme)) {
        expect(value, `${themeName}.${token}`).toMatch(HEX_PATTERN);
      }
    }
  });

  it('toda cor da paleta e hexadecimal valido', () => {
    for (const shades of Object.values(palette)) {
      for (const value of Object.values(shades)) {
        expect(value).toMatch(HEX_PATTERN);
      }
    }
  });

  it('o tema claro tem superficie mais clara que o texto primario', () => {
    expect(lightTheme.surface.toLowerCase()).toBe('#ffffff');
  });
});

describe('escalas', () => {
  it('espacamento cresce monotonicamente', () => {
    const values = Object.entries(spacing)
      .filter(([step]) => step !== '0')
      .map(([step, value]) => [Number(step), Number.parseFloat(value)] as const)
      .sort(([a], [b]) => a - b);
    for (let i = 1; i < values.length; i += 1) {
      expect(values[i][1]).toBeGreaterThan(values[i - 1][1]);
    }
  });

  it('tamanhos de fonte crescem monotonicamente', () => {
    const order = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;
    const values = order.map((key) => Number.parseFloat(fontSizes[key]));
    for (let i = 1; i < values.length; i += 1) {
      expect(values[i]).toBeGreaterThan(values[i - 1]);
    }
  });
});
