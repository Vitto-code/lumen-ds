# Decisoes tecnicas

Registro das decisoes relevantes do projeto, com contexto, alternativas e consequencias.

## 1. CSS puro com custom properties em vez de preprocessador ou framework

**Contexto.** O projeto precisa de tokens, dark mode e componentes reutilizaveis, e queremos que o resultado final seja consumivel por qualquer projeto web, com ou sem toolchain.

**Opcoes consideradas.**
- Sass: maduro, mas exige etapa de compilacao e adiciona dependencia de build para quem consome.
- Tailwind CSS: produtivo para aplicacoes, mas acopla o design system a classes utilitarias geradas e a um build com PostCSS.
- CSS puro com custom properties: nativo, sem dependencias, suporte universal a variaveis.

**Decisao.** CSS puro com custom properties, sem preprocessador.

**Consequencias.** Zero dependencias de producao e consumo trivial (um `<link>`). Abre-se mao de mixins, funcoes e nesting legado; parte disso e compensada por `color-mix()` nativo e pelo gerador de tokens.

## 2. Tokens em TypeScript como fonte unica da verdade

**Contexto.** Tokens definidos diretamente em CSS sao dificeis de validar; tokens em JSON nao tem tipagem nem derivacao de valores.

**Opcoes consideradas.**
- Tokens escritos a mao em CSS: simples, mas sem validacao possivel em tempo de teste.
- JSON + script de geracao: validavel, mas sem tipagem e sem comentarios estruturados.
- TypeScript + gerador: tipado, testavel, permite derivar temas a partir da paleta.

**Decisao.** Tokens em `src/tokens/*.ts`; `src/scripts/build-tokens.ts` gera o CSS.

**Consequencias.** Mudancas de design sao type-checked e testaveis (contraste, escalas). Custo: um passo de build (subsegundo) e a necessidade de rodar o build antes de servir o demo.

## 3. Dark mode em duas vias: media query + atributo, sem JS obrigatorio

**Contexto.** Dark mode pode depender de JavaScript (classe togglada) ou ser declarativo. Depender de JS quebra com scripts desabilitados e causa flash de tema errado.

**Opcoes consideradas.**
- Apenas `prefers-color-scheme`: zero JS, mas o usuario nao consegue escolher tema diferente do sistema.
- Apenas classe/atributo via JS: controle total, mas exige JS e causa FOUC de tema.
- Hibrido: media query como default, `[data-theme]` como override, JS apenas para persistir.

**Decisao.** Hibrido, com o tema escuro declarado duas vezes no CSS gerado.

**Consequencias.** Funciona sem JavaScript e respeita escolha explicita do usuario. Custo: os tokens escuros aparecem duplicados no bundle (media query e atributo), algumas dezenas de bytes.

## 4. Contraste WCAG verificado em testes automatizados

**Contexto.** Em design systems, a regressao mais comum e silenciosa e de contraste: alguem ajusta uma cor e um par texto/fundo deixa de atender AA.

**Opcoes consideradas.**
- Revisao visual/manual: nao escala e depende de memoria.
- Ferramenta externa (axe, Lighthouse) no CI: cobre o demo, mas nao cobre combinacoes nao renderizadas.
- Teste unitario calculando luminancia/razao de contraste sobre os tokens: cobre todos os pares definidos, independente de renderizacao.

**Decisao.** Testes unitarios com a formula oficial da WCAG sobre todos os pares texto/fundo dos dois temas, com limiar AA (4.5:1 texto, 3:1 foco).

**Consequencias.** Qualquer regressao de contraste falha no CI antes do merge. Limitacao: cobre apenas os pares declarados no teste; novos componentes devem registrar seus pares.

## 5. Build por concatenacao ordenada em vez de bundler

**Contexto.** O CSS final precisa de ordem de cascata previsivel (reset -> base -> utilities -> components).

**Opcoes consideradas.**
- `@import` nativo em producao: funciona, mas gera uma requisicao por arquivo e e render-blocking em cadeia.
- PostCSS/Lightning CSS: resolvem imports e minificam, ao custo de mais dependencias e configuracao.
- Concatenacao explicita em `STYLE_ORDER`: uma requisicao, ordem deterministica, zero dependencias.

**Decisao.** Concatenacao simples com ordem declarada em `src/scripts/build-tokens.ts`.

**Consequencias.** Build instantaneo e facil de inspecionar. Se o numero de componentes crescer muito ou surgir necessidade de minificacao/tree-shaking de CSS, esta decisao deve ser revista primeiro.
