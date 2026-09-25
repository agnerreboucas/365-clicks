# Site Analyzer

Ferramenta de benchmark: recebe um ou mais sites e extrai o design system de cada um, a estrutura da página e métricas de qualidade. Depois gera um relatório comparativo lado a lado.

## O que ela extrai

- **Cores:** texto, fundos e bordas, ordenadas pelo quanto aparecem na página.
- **Tipografia:** famílias, escala de tamanhos, pesos, altura de linha e o estilo de h1, h2, h3, parágrafo e botões.
- **Espaçamento e forma:** valores de espaçamento mais usados, detecção da grade base (4px/8px), raios de borda, sombras e largura máxima do conteúdo.
- **Variáveis CSS** do `:root`, quando o site já tem design tokens.
- **Estrutura:** títulos (h1–h3), menu, CTAs com o estilo de cada um, formulários, busca e imagens.
- **Desempenho:** TTFB, LCP, tempo de carregamento, número de requisições e peso transferido.
- **Acessibilidade e mobile:** textos com contraste baixo (WCAG), imagens sem `alt`, rolagem horizontal e alvos de toque pequenos.
- **Prints:** desktop (primeira dobra e após rolar) e mobile.

## Como usar

```bash
cd tools/site-analyzer
npm install

# 1. Analisar (quantos sites quiser)
node analyze.js https://site-a.com https://site-b.com https://site-c.com --out reports/benchmark-fotografia

# 2. Gerar o relatório comparativo
node report.js reports/benchmark-fotografia
# → reports/benchmark-fotografia/report.html
```

A pasta de saída contém `analysis.json` (todos os dados brutos), os prints e o `report.html`.

## Próximas etapas

- Avaliação com IA: enviar `analysis.json` e os prints para o Claude, que aponta o que é bom e o que é ruim em cada site.
- Geração do "site campeão": um design system e uma estrutura de página novos e originais, inspirados nos pontos fortes de cada concorrente, sem copiar textos, imagens ou identidade.
- Exportação dos tokens (CSS, Tailwind, JSON para Figma).

## Limitações

- Sites com proteção anti-bot forte podem bloquear o acesso (o relatório mostra o erro).
- As cores das fotos não entram na paleta: ela vem apenas do CSS.
- Os valores são inferidos pela frequência de uso e precisam de revisão humana.
