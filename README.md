# 365 Clicks

Plataforma visual para fotógrafos: descoberta, desafio diário de 365 dias, comunidade, educação, portfólio e experiências.

## Conteúdo

- `PRD_365_CLICKS.md` — PRD v2.0 (Home como galeria viva, inspirada na lógica de descoberta visual).
- `index.html` — índice do protótipo com as 58 páginas em iframes.
- `pages/` — 58 telas HTML independentes (Portal, Comunidade, 365 Challenge, Portfólio, Educação, Experiências, Foto Criativa, Comercial, Administração).
- `design-system/` — design system v0.1 criado a partir do benchmark de Unsplash, Pexels, Getty Images e Shutterstock: `tokens.css`, `components.css`, guia visual (`index.html`) e a Home nova (`home.html`).
- `tools/site-analyzer/` — ferramenta que analisa sites (design system, estrutura, desempenho, acessibilidade) e gera um relatório comparativo.

## Como visualizar

Abra `index.html` no navegador, ou sirva a pasta localmente:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

> Protótipo visual/HTML — sem banco de dados, autenticação ou upload real. As imagens são carregadas do Unsplash (requer internet).

## Próxima etapa

Consolidar as 58 telas em um design system único (tipografia, espaçamento, botões, cards, grid Masonry, header, navegação mobile, estados vazios, modais) e usá-lo para construir as telas reais.
