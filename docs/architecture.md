# Arquitetura

## Visao geral

O lumen-ds tem tres camadas: **tokens** (dados em TypeScript), **build** (geracao de CSS) e **estilos** (CSS puro que consome as custom properties geradas). Nada em `src/styles/` contem valores fixos de cor, espacamento ou tipografia.

```mermaid
flowchart LR
    subgraph Tokens["src/tokens (fonte unica)"]
        C[colors.ts<br/>paleta + temas light/dark]
        S[spacing.ts<br/>espacamento, raios, sombras]
        TY[typography.ts<br/>familias, tamanhos, pesos]
    end

    subgraph Build["src/scripts"]
        G[generate-css.ts<br/>tokens -> custom properties]
        B[build-tokens.ts<br/>gera tokens.css + lumen.css]
    end

    subgraph Estilos["src/styles"]
        BASE[base/<br/>reset + tipografia]
        UT[utilities/<br/>a11y + layout]
        CP[components/<br/>button, badge, input, alert, card]
    end

    Tokens --> G --> B
    Estilos --> B
    B --> DIST[dist/<br/>tokens.css + lumen.css]
    DIST --> DEMO[src/demo/index.html]
    DIST --> LIB[projetos consumidores]

    subgraph Qualidade
        T1[tests/contrast.test.ts<br/>WCAG AA nos 2 temas]
        T2[tests/tokens.test.ts<br/>integridade e escalas]
        T3[tests/build.test.ts<br/>saida do gerador]
        CIW[GitHub Actions<br/>lint + test + build]
    end

    Tokens --> T1 & T2
    Build --> T3
    T1 & T2 & T3 --> CIW
```

## Fluxo de dados

1. Uma mudanca de design comeca em `src/tokens/` (ex.: nova cor de destaque).
2. `npm run build` regenera `dist/tokens.css` e `dist/lumen.css`.
3. Componentes refletem a mudanca automaticamente, pois so usam `var(--lumen-*)`.
4. `npm test` valida que o novo valor mantem contraste AA nos dois temas.

## Estrategia de temas

```mermaid
flowchart TD
    A[Pagina carrega] --> B{data-theme definido?}
    B -- "light" --> C[Tema claro]
    B -- "dark" --> D[Tema escuro]
    B -- nao --> E{prefers-color-scheme?}
    E -- dark --> D
    E -- light/sem suporte --> C
    F[Toggle do usuario] -->|persiste em localStorage| B
```

O toggle no demo escreve `data-theme` no `<html>` antes do primeiro paint (script inline no `<head>`), evitando o flash de tema errado (FOUC de tema).

## Decisoes de estrutura

- `src/tokens/` e TypeScript (nao JSON) para ter tipagem, comentarios e derivacao de valores a partir da paleta.
- A ordem de cascata do bundle e explicita em `STYLE_ORDER` em `src/scripts/build-tokens.ts`, nao dependente de ordem alfabetica de arquivos.
- `dist/` e artefato de build: nao versionado, sempre reproduzivel com `npm run build`.
