# 365 Clicks

Plataforma visual para fotógrafos: descoberta, desafio diário de 365 dias, comunidade, educação, portfólio e experiências.

## Conteúdo

- `PRD_365_CLICKS.md` — PRD v2.0 (Home como galeria viva, inspirada na lógica de descoberta visual).
- `PRD_EVOLUCAO_365.md` — adendo: Motor dos 365 Desafios, Matriz Criativa, Biblioteca de Conhecimento, Linha Editorial, Radar 365 e relacionamentos.
- `PLANO_WORDPRESS.md` e `plano.html` — diagnóstico das telas e plano para levar o protótipo ao WordPress.
- `conteudo/` — planilha do calendário editorial; `tools/importar_calendario.py` gera `pages/calendario-365.js`.
- `index.html` — índice do protótipo: as 71 telas por módulo, com pré-visualização em desktop ou celular.
- `design-system/` — design system v0.1 do 365 Clicks (benchmark de Unsplash, Pexels, Getty Images e Shutterstock). Guia de implementação em `design-system/README.md`.
  - `tokens.css` — fonte da verdade: cores, tipografia, espaçamento, raios, sombras e layout, mais o tema escuro derivado e os apelidos usados pelas telas.
  - `tailwind.preset.js` — os mesmos tokens para projetos com Tailwind.
  - `decisoes.html` e `home.html` — guia visual do benchmark e a Home de referência (usam `components-v0.css`).
  - `components.css` — componentes do protótipo, seguindo as regras do v0.1: botões, formulários, chips, badges, avatares, foto e grid Masonry, 365 Challenge, métricas, tabela, listas, abas, estado vazio, modal, toast, cabeçalho e navegação mobile.
  - `app.js` — mapa do site (fonte única das 71 telas) e shell compartilhado: cabeçalho, menu "Mais", gaveta e barra inferior mobile, abas do módulo, rodapé, Masonry por linha, tema, modais e toasts.
  - `viewer.js` — visualizador de fotos (descrição, EXIF, comentários, @menções, marcações), proteção contra cópia, contato com o fotógrafo e rastreio de visualizações, cliques e contatos.
  - `upload.js` — compressor: corta nos 3 formatos padrão e gera versões WebP leves (teto de 2 MB).
  - `index.html` — biblioteca de componentes do protótipo.
- `tools/site-analyzer/` — ferramenta que analisa sites (design system, estrutura, desempenho, acessibilidade) e gera um relatório comparativo.
- `pages/` — 71 telas HTML (Portal, Comunidade, 365 Challenge, Portfólio, Educação, Experiências, Foto Criativa, Comercial, Administração). Home, Desafio do Dia, Fotografia, Meu Perfil, Admin Usuários e todo o fluxo de eventos e cursos (vitrines, páginas das ofertas, Inscrição, Meus Ingressos, Termos e Admin Eventos) já usam os componentes; as demais usam o sistema, mas ainda têm o conteúdo genérico do protótipo.

## Fotos e rastreio

`pages/fotos.js` é o catálogo de fotos e fotógrafos do protótipo. Na página publicada, o rastreio grava no banco compartilhado do artifact (`stats/` agregados por dia e `leads/`, visíveis só para administradores); abrindo os arquivos localmente, grava no navegador. O painel fica em `pages/admin-contatos.html`.

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
