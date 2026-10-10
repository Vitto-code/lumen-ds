import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateTokensCss } from './generate-css';

const PROJECT_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

/** Ordem de cascata do bundle final: base antes de utilitarios e componentes. */
const STYLE_ORDER = [
  'src/styles/base/reset.css',
  'src/styles/base/typography.css',
  'src/styles/utilities/a11y.css',
  'src/styles/utilities/layout.css',
  'src/styles/components/button.css',
  'src/styles/components/badge.css',
  'src/styles/components/input.css',
  'src/styles/components/alert.css',
  'src/styles/components/card.css',
] as const;

export interface BuildResult {
  tokensPath: string;
  bundlePath: string;
  bytes: number;
}

/**
 * Gera `tokens.css` (so as custom properties) e `lumen.css` (tokens + todos
 * os estilos concatenados) dentro de `outDir`.
 */
export function buildTokens(outDir: string): BuildResult {
  const tokensCss = generateTokensCss();
  const parts = STYLE_ORDER.map((relativePath) => readFileSync(join(PROJECT_ROOT, relativePath), 'utf8'));
  const bundle = [tokensCss, ...parts].join('\n');

  // resolve() respeita outDir absoluto (usado nos testes) e relativo (CLI).
  const targetDir = resolve(PROJECT_ROOT, outDir);
  mkdirSync(targetDir, { recursive: true });

  const tokensPath = join(targetDir, 'tokens.css');
  const bundlePath = join(targetDir, 'lumen.css');
  writeFileSync(tokensPath, tokensCss);
  writeFileSync(bundlePath, bundle);

  return { tokensPath, bundlePath, bytes: Buffer.byteLength(bundle) };
}

const isMain = process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const outDir = process.env.BUILD_OUT_DIR ?? 'dist';
  const result = buildTokens(outDir);
  console.log(`[build] ${outDir}/tokens.css gerado`);
  console.log(`[build] ${outDir}/lumen.css gerado (${result.bytes} bytes)`);
}
