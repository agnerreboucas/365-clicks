# 365 Clicks

Plataforma visual para fotógrafos: descoberta, desafio diário de 365 dias, comunidade, educação, portfólio e experiências.

## Conteúdo

- `PRD_365_CLICKS.md` — PRD v2.0 (Home como galeria viva, inspirada na lógica de descoberta visual).
- `index.html` — índice do protótipo: as 61 telas por módulo, com pré-visualização em desktop ou celular.
- `design-system/` — design system v1.0 do 365 Clicks:
  - `tokens.css` — cor (tema claro e escuro), tipografia, espaço, raio, sombra e movimento.
  - `components.css` — botões, formulários, chips, badges, avatares, foto e grid Masonry, 365 Challenge, métricas, tabela, listas, abas, estado vazio, modal, toast, cabeçalho e navegação mobile.
  - `app.js` — mapa do site (fonte única das 61 telas) e shell compartilhado: cabeçalho, menu "Mais", gaveta e barra inferior mobile, abas do módulo, rodapé, Masonry por linha, tema, modais e toasts.
  - `index.html` — guia visual com todos os tokens e componentes.
- `pages/` — 61 telas HTML (Portal, Comunidade, 365 Challenge, Portfólio, Educação, Experiências, Foto Criativa, Comercial, Administração). Home, Desafio do Dia, Fotografia, Meu Perfil, Admin Usuários e todo o fluxo de eventos e cursos (vitrines, páginas das ofertas, Inscrição, Meus Ingressos, Termos e Admin Eventos) já usam os componentes; as demais usam o sistema, mas ainda têm o conteúdo genérico do protótipo.

## Eventos e cursos

`pages/ofertas.js` guarda os eventos, os cursos e os textos dos termos (uso de imagem, contrato, participação e privacidade). Para criar uma oferta nova, adicione um item em `OFERTAS` e uma página com `<div data-oferta="slug"></div>`. A inscrição fica em `inscricao.html#slug`.

## Nova tela

```html
<link rel="stylesheet" href="../design-system/tokens.css">
<link rel="stylesheet" href="../design-system/components.css">
<script src="../design-system/app.js" defer></script>

<body data-page="slug-da-tela">
  <header data-shell></header>
  <main>…</main>
  <footer data-shell></footer>
</body>
```

Para aparecer na navegação, adicione a tela ao `SITEMAP` em `design-system/app.js`.

## Como visualizar

Abra `index.html` no navegador, ou sirva a pasta localmente:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

> Protótipo visual/HTML — sem banco de dados, autenticação ou upload real. As imagens são carregadas do Unsplash (requer internet); sem conexão, cada foto mostra sua cor dominante no lugar.

## Próxima etapa

Refazer as telas restantes com os componentes do design system, módulo por módulo.
