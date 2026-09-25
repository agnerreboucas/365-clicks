# 365 Clicks — Design System v0.1

Guia de implementação. Serve para pessoas e para o Claude Code aplicarem este design system em outro projeto.

## Arquivos

| Arquivo | O que é |
|---|---|
| `tokens.css` | **Fonte da verdade.** Todas as variáveis CSS: cores, tipografia, espaçamento, raios, sombras, layout |
| `components.css` | Componentes prontos em CSS puro (header, busca, chips, botões, galeria masonry, desafio do dia, cards, coleções, CTA, footer, tabbar mobile) |
| `tailwind.preset.js` | Os mesmos tokens em formato de preset do Tailwind |
| `home.html` | Home de referência, seguindo a ordem do PRD |
| `index.html` | Guia visual: benchmark dos concorrentes, decisões, cores, tipografia, componentes e regras |

## Como aplicar em outro projeto

1. Copie `tokens.css` para o projeto e importe-o uma vez, no CSS global.
2. Carregue as fontes (Google Fonts):
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
   ```
   Em Next.js, use `next/font/google` com `Inter` e `Instrument_Serif`.
3. Escolha a forma de estilizar:
   - **CSS puro / CSS Modules:** use `components.css` como base, ou recrie cada classe dentro dos componentes usando as variáveis.
   - **Tailwind:** adicione `presets: [require('./tailwind.preset.js')]` no `tailwind.config.js` e use as classes (`bg-accent`, `text-muted`, `rounded-card`, `p-5`...).
4. Transforme os blocos de `components.css` em componentes do framework (React, Vue...), mantendo nomes e variantes:
   `Button` (primary, dark, secondary, ghost; sm, md, lg), `SearchBar` (normal, lg), `Chip`, `Tag`, `MasonryGallery` + `PhotoCard`, `ChallengeCard`, `ProgressBar`, `PhotographerCard`, `CollectionCard`, `Rail`, `SiteHeader`, `SiteFooter`, `MobileTabBar`, `CtaBand`.
5. Use `home.html` como referência visual e estrutural para montar a Home.

## Regras que não podem ser quebradas

- **A foto vem primeiro.** Interface neutra; nada compete com as imagens.
- **O accent (#C2410C) é raro.** Só na ação principal, no desafio do dia e no progresso. No máximo um botão laranja por bloco.
- **A galeria não corta fotos.** A masonry respeita a proporção original (`aspect-ratio` vindo da largura e altura reais da foto).
- **Texto sobre foto sempre com overlay** (`--overlay-photo` ou `--overlay-hero`).
- **Contraste mínimo AA (4.5:1)** para todo texto. Não clareie o `--c-muted`.
- **Alvos de toque de 36 a 44px** no mínimo.
- **O autor aparece em toda foto.**
- **Sem anúncios, pop-ups ou banners dentro da galeria.**
- **"Carregar mais" no lugar de rolagem infinita**, para o rodapé continuar acessível.
- **Espaçamento sempre na grade** (`--sp-1` a `--sp-9`). Não invente valores soltos.
- **Instrument Serif só em momentos editoriais** (coleções, chamadas grandes), nunca em textos longos ou na interface.

## Prompt pronto para o Claude Code

Cole isto no Claude Code do outro projeto:

> Quero implementar o design system do 365 Clicks neste projeto. Ele está no repositório GitHub `agnerreboucas/365-clicks`, branch `claude/great-feynman-xbon3j`, pasta `design-system/`. Leia primeiro o `design-system/README.md` e siga as regras dele. Depois:
> 1. traga os tokens (`tokens.css`, ou `tailwind.preset.js` se o projeto usar Tailwind) e as fontes;
> 2. crie os componentes listados no README no padrão deste projeto;
> 3. refaça a Home usando o `home.html` como referência.
>
> Antes de mudar qualquer coisa, me mostre o plano e o que vai mudar nos arquivos existentes.
