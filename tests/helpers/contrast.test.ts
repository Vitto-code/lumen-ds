import { describe, expect, it } from 'vitest';
import { contrastRatio, relativeLuminance } from '../helpers/contrast';

describe('contrastRatio', () => {
  it('retorna 21:1 para preto sobre branco', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0);
  });

  it('retorna 1:1 para cores iguais', () => {
    expect(contrastRatio('#1d4ed8', '#1d4ed8')).toBe(1);
  });

  it('e simetrico em relacao a frente e fundo', () => {
    expect(contrastRatio('#18181b', '#fafafa')).toBeCloseTo(contrastRatio('#fafafa', '#18181b'), 6);
  });
});

describe('relativeLuminance', () => {
  it('rejeita cores hexadecimais invalidas', () => {
    expect(() => relativeLuminance('#zzzzzz')).toThrow('Cor hexadecimal invalida');
  });
});
