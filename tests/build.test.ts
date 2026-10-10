import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { buildTokens } from '../src/scripts/build-tokens';
import { generateTokensCss, toKebab } from '../src/scripts/generate-css';
import { themes } from '../src/tokens/index';

describe('toKebab', () => {
  it('converte camelCase para kebab-case', () => {
    expect(toKebab('surfaceMuted')).toBe('surface-muted');
    expect(toKebab('accent')).toBe('accent');
    expect(toKebab('2xl')).toBe('2xl');
  });
});

describe('generateTokensCss', () => {
  const css = generateTokensCss();

  it('gera bloco :root, media query de dark mode e override manual', () => {
    expect(css).toContain(':root {');
    expect(css).toContain('@media (prefers-color-scheme: dark)');
    expect(css).toContain(":root:not([data-theme='light'])");
    expect(css).toContain("[data-theme='dark']");
  });

  it('declara todos os tokens semanticos nos dois temas', () => {
    for (const key of Object.keys(themes.light)) {
      const variable = `--lumen-color-${toKebab(key)}:`;
      const occurrences = css.split(variable).length - 1;
      expect(occurrences, variable).toBe(3);
    }
  });

  it('nao declara a mesma variavel duas vezes no mesmo escopo', () => {
    const rootBlock = css.slice(css.indexOf(':root {'), css.indexOf('@media'));
    const names = [...rootBlock.matchAll(/(--lumen-[a-z0-9-]+):/g)].map((match) => match[1]);
    expect(new Set(names).size).toBe(names.length);
  });

  it('nao contem valores indefinidos', () => {
    expect(css).not.toContain('undefined');
    expect(css).not.toContain('NaN');
  });
});

describe('buildTokens', () => {
  const outDir = join(mkdtempSync(join(tmpdir(), 'lumen-build-')), 'dist');

  afterAll(() => {
    rmSync(join(outDir, '..'), { recursive: true, force: true });
  });

  it('escreve tokens.css e lumen.css no diretorio de saida', () => {
    const result = buildTokens(outDir);
    const tokens = readFileSync(result.tokensPath, 'utf8');
    const bundle = readFileSync(result.bundlePath, 'utf8');

    expect(tokens).toContain('--lumen-color-accent:');
    expect(bundle).toContain('box-sizing: border-box');
    expect(bundle).toContain('.lumen-btn--primary');
    expect(bundle.length).toBeGreaterThan(tokens.length);
    expect(result.bytes).toBe(Buffer.byteLength(bundle));
  });
});
