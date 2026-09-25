/* 365 Clicks — shell compartilhado do protótipo
   Renderiza cabeçalho, navegação completa, barra inferior mobile, sub-navegação do módulo e rodapé
   a partir de um único mapa do site. Também organiza o grid Masonry por linha, alterna o tema
   e liga modais, toasts e ações dos cards. */
(function () {
  "use strict";

  var script = document.currentScript;
  var ROOT = new URL("../", script ? script.src : location.href).href;
  var page = function (slug) { return ROOT + "pages/" + slug + ".html"; };

  /* ---------- Mapa do site: fonte única das 58 telas ---------- */
  var SITEMAP = [
    { id: "portal", name: "Portal", pages: [
      ["home", "Home", "Galeria viva + desafio diário"],
      ["explorar", "Explorar", "Descubra fotografias, temas e tendências"],
      ["fotografias", "Fotografias", "Biblioteca visual da comunidade"],
      ["fotografia", "Fotografia", "Página individual da fotografia"],
      ["fotografos", "Fotógrafos", "Diretório de fotógrafos"],
      ["blog", "Blog", "Conteúdo editorial"],
      ["artigo", "Artigo", "Conteúdo individual"],
      ["nunca-tirei", "A foto que eu nunca tirei", "Blog e livro colaborativo"],
      ["radar", "Radar 365", "Newsletter semanal da fotografia"],
      ["sobre", "Sobre", "Manifesto e história"],
      ["contato", "Contato", "Fale com o 365 Clicks"],
      ["ajuda", "Central de Ajuda", "FAQ e suporte"]
    ]},
    { id: "comunidade", name: "Comunidade", pages: [
      ["cadastro", "Criar conta", "Cadastro e termo do fotógrafo"],
      ["feed", "Feed", "Fotografias de quem você segue"],
      ["perfil", "Meu Perfil", "Rede social + portfólio"],
      ["editar-perfil", "Editar Perfil", "Configuração do perfil público"],
      ["publicar", "Publicar", "Envie uma nova fotografia"],
      ["seguidores", "Seguidores", "Pessoas que acompanham você"],
      ["seguindo", "Seguindo", "Fotógrafos acompanhados"],
      ["notificacoes", "Notificações", "Atividade da comunidade"],
      ["mensagens", "Mensagens", "Networking entre fotógrafos"],
      ["configuracoes", "Configurações", "Conta, privacidade e notificações"]
    ]},
    { id: "challenge", name: "365 Challenge", pages: [
      ["desafios", "Desafios 365", "Central dos 365 desafios"],
      ["desafio-do-dia", "Desafio do Dia", "Dia 127/365 — Água + Reflexos"],
      ["calendario", "Calendário", "Visão dos 365 dias"],
      ["meus-desafios", "Meus Desafios", "Progresso, sequência e pontuação"],
      ["ranking", "Ranking", "Classificação da comunidade"],
      ["conquistas", "Conquistas", "Badges e marcos"]
    ]},
    { id: "portfolio", name: "Portfólio", pages: [
      ["portfolio", "Portfólio", "Seleção profissional"],
      ["projetos", "Projetos", "Séries fotográficas autorais"],
      ["projeto", "Projeto", "São Paulo Invisível"],
      ["colecoes", "Coleções", "Organize e descubra coleções"],
      ["equipamentos", "Equipamentos", "Câmeras, lentes e acessórios"]
    ]},
    { id: "educacao", name: "Educação", pages: [
      ["cursos", "Cursos", "Formação em fotografia"],
      ["biblioteca", "Biblioteca", "Técnicas, enquadramentos, linguagens e equipamentos"],
      ["curso", "Curso", "Fotografia de Rua — do olhar à narrativa"],
      ["meus-cursos", "Meus Cursos", "Progresso educacional"],
      ["aula", "Aula", "Player e materiais da aula"],
      ["ebooks", "E-books", "Biblioteca digital"],
      ["exercicios", "Exercícios", "Prática fotográfica"]
    ]},
    { id: "experiencias", name: "Experiências", pages: [
      ["eventos", "Eventos", "Experiências presenciais"],
      ["foto-na-paulista", "Foto na Paulista", "Workshop fotográfico"],
      ["foto-no-parque", "Foto no Parque", "Encontro gratuito"],
      ["oferta", "Palestra online", "Como vender suas fotos"],
      ["inscricao", "Inscrição", "Ingresso, dados, termos e pagamento"],
      ["meus-ingressos", "Meus Ingressos", "Inscrições, status e cancelamento"],
      ["termos", "Termos e contratos", "Uso de imagem, contrato e cancelamento"]
    ]},
    { id: "criativa", name: "Foto Criativa", pages: [
      ["foto-criativa", "Foto Criativa", "Ferramentas para desbloquear ideias"],
      ["gerador-ideias", "Gerador de Ideias", "Gere uma proposta fotográfica"],
      ["gerador-desafio", "Gerador de Desafio", "Crie um desafio personalizado"],
      ["roteiros", "Roteiros", "Planeje uma saída fotográfica"],
      ["inspiracao", "Inspiração", "Referências visuais"]
    ]},
    { id: "comercial", name: "Comercial", pages: [
      ["loja", "Loja", "App, livros, e-books e camisetas"],
      ["anuncie", "Anuncie", "Espaços de mídia com mensalidade"],
      ["minhas-campanhas", "Minhas campanhas", "Painel do anunciante"],
      ["planos", "Planos", "Free + 365 + Clube"],
      ["assinatura", "Assinatura", "Escolha e gerencie seu plano"],
      ["checkout", "Checkout", "Pagamento"],
      ["minha-assinatura", "Minha Assinatura", "Plano, cobrança e cancelamento"],
      ["minhas-compras", "Minhas Compras", "Histórico de compras"]
    ]},
    { id: "admin", name: "Administração", pages: [
      ["admin", "Dashboard", "Visão operacional"],
      ["admin-contatos", "Contatos e métricas", "Visualizações, cliques e contatos"],
      ["admin-anuncios", "Mídia e anunciantes", "Espaços, campanhas e receita mensal"],
      ["admin-usuarios", "Usuários", "Gestão de usuários"],
      ["admin-fotos", "Moderação", "Denúncias de comentários e fotos"],
      ["admin-desafios", "Desafios", "Criador dos 365 desafios"],
      ["admin-cursos", "Cursos", "Gestão educacional"],
      ["admin-eventos", "Eventos", "Gestão de experiências"],
      ["admin-assinaturas", "Assinaturas", "Planos e assinantes"],
      ["admin-conteudo", "Conteúdo", "CMS"],
      ["admin-gamificacao", "Gamificação", "Pontos, níveis e badges"]
    ]}
  ];

  /* Navegação principal: slug do link → módulo que ele representa */
  var PRIMARY = [
    ["explorar", "Explorar", "portal"],
    ["desafios", "Desafios", "challenge"],
    ["fotografos", "Fotógrafos", null],
    ["cursos", "Cursos", "educacao"],
    ["eventos", "Eventos", "experiencias"],
    ["loja", "Loja", "comercial"]
  ];

  /* ---------- Ícones (traço 1.8, grade de 24) ---------- */
  var ICONS = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    bookmark: '<path d="M6 4h12v16l-6-4-6 4z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-5.5 8-5.5s6.5 1.5 8 5.5"/>',
    home: '<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z"/>',
    compass: '<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    flame: '<path d="M12 21c-4 0-6.5-2.7-6.5-6.2 0-3.4 2.5-5.3 3.5-8.3 1.6 1.2 2.4 2.7 2.5 4.2 1-1 1.6-2.4 1.6-4.2 3 2.2 5.4 5.3 5.4 8.5 0 3.4-2.5 6-6.5 6z"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2-1.2L14 3h-4l-.6 2.6a7 7 0 0 0-2 1.2l-2.3-.9-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.9a7 7 0 0 0 2 1.2L10 21h4l.6-2.6a7 7 0 0 0 2-1.2l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z"/>'
  };
  function icon(name, cls) {
    return '<svg class="i ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }
  window.C365 = { icon: icon, sitemap: SITEMAP, page: page, root: ROOT };

  /* ---------- Página atual ---------- */
  var current = document.body.getAttribute("data-page") ||
    (location.pathname.split("/").pop() || "").replace(/\.html$/, "");
  var currentModule = null;
  SITEMAP.forEach(function (m) {
    m.pages.forEach(function (p) { if (p[0] === current) currentModule = m; });
  });

  function cur(slug) { return slug === current ? ' aria-current="page"' : ""; }

  /* ---------- Tema ---------- */
  var THEME_KEY = "c365-theme";
  function storedTheme() { try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; } }
  function applyTheme(t) {
    if (t) document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
  }
  function effectiveTheme() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  applyTheme(storedTheme());
  function toggleTheme() {
    var next = effectiveTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    syncThemeButtons();
  }
  function syncThemeButtons() {
    var dark = effectiveTheme() === "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
      b.innerHTML = icon(dark ? "sun" : "moon");
      b.setAttribute("aria-label", dark ? "Usar tema claro" : "Usar tema escuro");
    });
  }

  /* ---------- Shell ---------- */
  function renderHeader(el) {
    var moreMenu = SITEMAP.map(function (m) {
      return '<section><div class="menu-label">' + m.name + "</div>" +
        m.pages.slice(0, 5).map(function (p) { return '<a href="' + page(p[0]) + '"' + cur(p[0]) + ">" + p[1] + "</a>"; }).join("") +
        (m.pages.length > 5 ? '<a href="' + page(m.pages[0][0]) + '" class="small">+ ' + (m.pages.length - 5) + " telas</a>" : "") +
        "</section>";
    }).join("");
    var inPrimary = PRIMARY.some(function (l) { return l[0] === current; });
    el.className = "site-header";
    el.innerHTML =
      '<button class="btn btn-ghost btn-icon menu-toggle" type="button" data-drawer-open aria-label="Abrir menu">' + icon("menu") + "</button>" +
      '<a class="logo" href="' + page("home") + '" aria-label="365 Clicks — início">365<b>·</b>CLICKS</a>' +
      '<nav class="site-nav" aria-label="Principal">' +
        PRIMARY.map(function (l) { return '<a href="' + page(l[0]) + '"' + cur(l[0]) + ">" + l[1] + "</a>"; }).join("") +
        '<div class="more' + (currentModule && !inPrimary && current !== "home" ? " is-current" : "") + '"><button type="button" aria-expanded="false" aria-haspopup="true" data-more>Mais ' + icon("chevron", "i-sm") + '</button><div class="menu" hidden>' + moreMenu + "</div></div>" +
      "</nav>" +
      '<form class="header-search search-field" role="search" data-search>' + icon("search") +
        '<label class="sr-only" for="q-header">Pesquisar</label><input class="input" id="q-header" type="search" placeholder="Pesquisar fotos, fotógrafos, desafios"></form>' +
      '<div class="header-actions">' +
        '<button class="btn btn-ghost btn-icon" type="button" data-theme-toggle></button>' +
        '<a class="btn btn-ghost btn-icon dot-badge hide-mobile" href="' + page("notificacoes") + '" aria-label="Notificações (3 novas)">' + icon("bell") + "</a>" +
        '<button class="btn btn-ghost btn-icon hide-mobile" type="button" data-account aria-expanded="false" aria-label="Minha conta"><span class="avatar avatar-sm" style="--av:var(--accent-soft)">MA</span></button>' +
        '<div class="menu" data-account-menu hidden>' +
          '<a href="' + page("perfil") + '">' + icon("user", "i-sm") + "Meu perfil</a>" +
          '<a href="' + page("meus-desafios") + '">' + icon("target", "i-sm") + "Meus desafios</a>" +
          '<a href="' + page("portfolio") + '">' + icon("grid", "i-sm") + "Portfólio</a>" +
          '<a href="' + page("minha-assinatura") + '">' + icon("bookmark", "i-sm") + "Minha assinatura</a>" +
          '<a href="' + page("configuracoes") + '">' + icon("settings", "i-sm") + "Configurações</a>" +
          '<hr><a href="' + page("admin") + '">Administração</a>' +
        "</div>" +
        '<a class="btn hide-mobile" href="' + page("publicar") + '">' + icon("camera", "i-sm") + "Publicar</a>" +
      "</div>";
  }


  /* ---------- Faixa de ofertas (receita: cursos, e-books, palestras, eventos, loja) ---------- */
  var PROMOS = [
    ["Curso", "Fotografia de Rua: inscrições abertas, início em 3/11", "curso.html", "Ver curso"],
    ["Palestra", "Como vender suas fotos · 14/10, ao vivo · R$ 49", "oferta.html#palestra-vender-fotos", "Garantir vaga"],
    ["Evento", "Foto na Paulista · 18/10 · últimas 9 vagas", "foto-na-paulista.html", "Inscrever-se"],
    ["E-book", "Guia de Exposição sem Mistério · R$ 29", "loja.html#ebooks", "Comprar"],
    ["Loja", "Livro “A foto que eu nunca tirei” em pré-venda", "loja.html", "Ver na loja"]
  ];
  C365.promos = PROMOS;
  function renderPromo(header) {
    var hoje = new Date().toDateString();
    try { if (localStorage.getItem("c365-promo-off") === hoje) return; } catch (e) {}
    var bar = document.createElement("div");
    bar.className = "promo";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Ofertas");
    var i = 0;
    function show() {
      var p = PROMOS[i % PROMOS.length];
      bar.querySelector(".promo-item").innerHTML = '<span class="promo-tag' + (p[4] ? " is-ad" : "") + '">' + p[0] + '</span><span class="promo-text">' + p[1] + '</span><a href="' + ROOT + "pages/" + p[2] + '"' + (p[4] ? ' data-ad="' + p[4] + '"' : "") + ">" + p[3] + " →</a>";
    }
    bar.innerHTML = '<div class="promo-item" aria-live="off"></div><button type="button" class="promo-close" aria-label="Fechar ofertas até amanhã">' + icon("close", "i-sm") + "</button>";
    header.parentNode.insertBefore(bar, header);
    show();
    var pausa = false;
    bar.addEventListener("mouseenter", function () { pausa = true; });
    bar.addEventListener("mouseleave", function () { pausa = false; });
    bar.addEventListener("focusin", function () { pausa = true; });
    if (!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) {
      setInterval(function () { if (!pausa && !document.hidden) { i++; show(); } }, 6000);
    }
    bar.querySelector(".promo-close").addEventListener("click", function () {
      bar.remove();
      try { localStorage.setItem("c365-promo-off", hoje); } catch (e) {}
    });
  }

  function renderTabbar() {
    var nav = document.createElement("nav");
    nav.className = "tabbar";
    nav.setAttribute("aria-label", "Navegação rápida");
    var items = [["home", "Início", "home"], ["explorar", "Explorar", "compass"], ["publicar", "Publicar", "plus"], ["desafios", "Desafios", "target"], ["perfil", "Perfil", "user"]];
    nav.innerHTML = items.map(function (t) {
      return '<a href="' + page(t[0]) + '"' + cur(t[0]) + (t[0] === "publicar" ? ' class="shoot"' : "") + ">" + icon(t[2]) + "<span>" + t[1] + "</span></a>";
    }).join("");
    document.body.appendChild(nav);
  }

  function renderDrawer() {
    var d = document.createElement("div");
    d.className = "drawer";
    d.hidden = true;
    d.setAttribute("role", "dialog");
    d.setAttribute("aria-modal", "true");
    d.setAttribute("aria-label", "Menu");
    d.innerHTML = '<div class="modal-backdrop" data-drawer-close></div><div class="drawer-panel">' +
      '<div class="drawer-head"><a class="logo" href="' + page("home") + '">365<b>·</b>CLICKS</a>' +
      '<button class="btn btn-ghost btn-icon" type="button" data-drawer-close aria-label="Fechar menu">' + icon("close") + "</button></div>" +
      '<form class="search-field" role="search" data-search style="margin-bottom:16px">' + icon("search") + '<label class="sr-only" for="q-drawer">Pesquisar</label><input class="input" id="q-drawer" type="search" placeholder="Pesquisar"></form>' +
      SITEMAP.map(function (m) {
        return "<details" + (m === currentModule ? " open" : "") + "><summary>" + m.name + ' <span class="count">' + m.pages.length + "</span></summary>" +
          m.pages.map(function (p) { return '<a href="' + page(p[0]) + '"' + cur(p[0]) + ">" + p[1] + "</a>"; }).join("") + "</details>";
      }).join("") +
      '<div class="cluster" style="margin-top:20px"><button class="btn btn-secondary btn-sm" type="button" data-theme-toggle></button><span class="small">Tema</span></div>' +
      "</div>";
    document.body.appendChild(d);
    return d;
  }

  function renderSubnav() {
    if (!currentModule || current === "home") return;
    var main = document.querySelector("main");
    if (!main || main.querySelector(".subnav")) return;
    var nav = document.createElement("nav");
    nav.className = "subnav";
    nav.setAttribute("aria-label", currentModule.name);
    nav.innerHTML = '<span class="eyebrow">' + currentModule.name + '</span><div class="tabs">' +
      currentModule.pages.map(function (p) { return '<a href="' + page(p[0]) + '"' + cur(p[0]) + ">" + p[1] + "</a>"; }).join("") + "</div>";
    main.insertBefore(nav, main.firstChild);
  }

  function renderFooter(el) {
    el.className = "site-footer";
    var col = function (titulo, itens) { return "<div><h4>" + titulo + "</h4>" + itens.map(function (i) { return '<a href="' + page(i[0]) + '">' + i[1] + "</a>"; }).join("") + "</div>"; };
    el.innerHTML = '<div class="footer-grid"><div><a class="logo" href="' + page("home") + '">365<b>·</b>CLICKS</a><p>Fotografe. Compartilhe. Evolua.</p></div>' +
      col("Descobrir", [["explorar", "Explorar"], ["colecoes", "Coleções"], ["fotografos", "Fotógrafos"], ["nunca-tirei", "A foto que eu nunca tirei"]]) +
      col("Praticar", [["desafio-do-dia", "Desafio do dia"], ["desafios", "Semana de desafios"], ["foto-criativa", "Foto Criativa"], ["cursos", "Cursos"]]) +
      col("Comunidade", [["eventos", "Eventos"], ["blog", "Blog"], ["ranking", "Ranking"], ["loja", "Loja"]]) +
      col("365 Clicks", [["sobre", "Sobre"], ["planos", "Planos"], ["anuncie", "Anuncie"], ["ajuda", "Ajuda"], ["termos", "Termos"]]) + "</div>";
  }

  /* ---------- Masonry por linha ---------- */
  /* CSS columns ordena de cima para baixo; aqui distribuímos cada item na coluna mais curta,
     usando a proporção declarada (--ratio), para manter a ordem de leitura por linha. */
  function ratioOf(card) {
    var img = card.querySelector("img");
    var r = img && (img.style.getPropertyValue("--ratio") || card.style.getPropertyValue("--ratio"));
    if (r && r.indexOf("/") > -1) { var p = r.split("/"); return parseFloat(p[1]) / parseFloat(p[0]); }
    if (img && img.naturalWidth) return img.naturalHeight / img.naturalWidth;
    return 1.25;
  }
  function layoutMasonry(grid, force) {
    var items = grid._items || (grid._items = Array.prototype.slice.call(grid.querySelectorAll(":scope > .card, :scope > .masonry-col > .card")));
    var min = parseFloat(getComputedStyle(grid).getPropertyValue("--masonry-min")) || 240;
    var gap = parseFloat(getComputedStyle(grid).getPropertyValue("--masonry-gap")) || 16;
    var cols = Math.max(1, Math.min(items.length, Math.floor((grid.clientWidth + gap) / (min + gap))));
    if (window.innerWidth <= 800) cols = Math.max(2, cols);
    if (!force && grid._cols === cols) return;
    grid._cols = cols;
    var colEls = [], heights = [];
    for (var i = 0; i < cols; i++) { var c = document.createElement("div"); c.className = "masonry-col"; colEls.push(c); heights.push(0); }
    items.forEach(function (card) {
      var k = heights.indexOf(Math.min.apply(null, heights));
      colEls[k].appendChild(card);
      heights[k] += ratioOf(card) + 0.18; /* 0.18 ≈ legenda abaixo da foto */
    });
    grid.innerHTML = "";
    colEls.forEach(function (c) { grid.appendChild(c); });
    grid.classList.add("is-masonry");
  }
  /* "Carregar mais" nas galerias verticais (o rodapé continua acessível); o Feed horizontal segue infinito */
  /* "Carregar mais" → rolagem infinita pelos desafios anteriores.
     O primeiro clique carrega o bloco do desafio de ontem; a partir daí, cada vez que a pessoa chega
     perto do fim, entra o bloco do desafio anterior (anteontem, e assim por diante), com o nome do desafio.
     Para não prender o rodapé para sempre, depois de 30 desafios aparece o link para o arquivo. */
  var MAX_BLOCOS = 30;
  function carregarMais() {
    document.querySelectorAll(".grid").forEach(function (g) {
      if (g.hasAttribute("data-sem-mais") || g.hasAttribute("data-bloco") || g.querySelectorAll(".card").length < 8 || g._maisPronto) return;
      g._maisPronto = true;
      var modelo = (g._items || g.querySelectorAll(".card"))[0];
      var box = document.createElement("div");
      box.className = "load-more";
      box.innerHTML = '<button class="btn btn-secondary" type="button">Carregar mais fotografias</button>';
      g.parentNode.insertBefore(box, g.nextSibling);
      var fim = document.createElement("div");
      fim.className = "infinite-sentinel";
      fim.setAttribute("aria-hidden", "true");
      var bloco = 0, ativo = false, carregando = false, obs = null, ancora = box;

      function desafioAnterior(k) {
        if (!window.Desafios) return null;
        var d = new Date(); d.setDate(d.getDate() - k);
        return window.Desafios.doDia(d);
      }
      function novoBloco() {
        if (carregando || bloco >= MAX_BLOCOS) return;
        carregando = true;
        bloco++;
        var ds = desafioAnterior(bloco);
        var sec = document.createElement("section");
        sec.className = "infinite-block";
        sec.innerHTML = '<div class="infinite-head"><span class="eyebrow">' + (bloco === 1 ? "Desafio de ontem" : ds ? ds.nomeDia.charAt(0).toUpperCase() + ds.nomeDia.slice(1) + ", " + window.Desafios.dataCurta(ds.inicio) : "Mais fotografias") + "</span>" +
          (ds ? '<h3>Dia ' + ds.dia + " · " + ds.tema + ' <span class="small muted">· ' + ds.tecnica + "</span></h3>" : "") + "</div>";
        var grid = document.createElement("div");
        grid.className = "grid";
        grid.setAttribute("data-bloco", String(bloco));
        for (var i = 0; i < 8; i++) {
          var n = modelo.cloneNode(true);
          n.removeAttribute("data-photo");
          var h = n.querySelector(".card-hit"); if (h) h.remove();
          n.querySelectorAll("[aria-pressed]").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
          grid.appendChild(n);
        }
        sec.appendChild(grid);
        ancora.parentNode.insertBefore(sec, ancora.nextSibling);
        ancora = sec;
        if (C365.viewer && window.Fotos) {
          var l = window.Fotos.lista, desloc = (bloco * 5) % l.length;
          C365.viewer.hidratar(grid, l.slice(desloc).concat(l.slice(0, desloc)));
        }
        layoutMasonry(grid, true);
        sec.parentNode.insertBefore(fim, sec.nextSibling);
        if (bloco >= MAX_BLOCOS) {
          if (obs) obs.disconnect();
          var arq = document.createElement("div");
          arq.className = "load-more";
          arq.innerHTML = '<a class="btn btn-secondary" href="' + page("desafios") + '">Ver o arquivo de desafios</a>';
          fim.replaceWith(arq);
        }
        carregando = false;
      }
      box.firstChild.addEventListener("click", function () {
        if (ativo) return;
        ativo = true;
        box.remove();
        ancora = g;
        novoBloco();
        if ("IntersectionObserver" in window) {
          obs = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) novoBloco(); }); }, { rootMargin: "600px 0px" });
          obs.observe(fim);
        } else {
          window.addEventListener("scroll", function () { if (fim.getBoundingClientRect().top < window.innerHeight + 600) novoBloco(); }, { passive: true });
        }
      });
    });
  }
  C365.carregarMais = carregarMais;
  C365.masonry = function () { document.querySelectorAll(".grid").forEach(function (g) { layoutMasonry(g, true); }); };
  /* Chegadas por link compartilhado (UTM + ref): base do ranking de quem traz visitas */
  (function () {
    try {
      var q = new URLSearchParams(location.search);
      if (q.get("utm_source") || q.get("ref")) {
        var l = JSON.parse(localStorage.getItem("c365-chegadas") || "[]");
        l.push({ fonte: q.get("utm_source"), meio: q.get("utm_medium"), foto: q.get("utm_content"), ref: q.get("ref"), em: Date.now() });
        localStorage.setItem("c365-chegadas", JSON.stringify(l.slice(-1000)));
      }
    } catch (e) {}
  })();
  function initMasonry() {
    var grids = Array.prototype.slice.call(document.querySelectorAll(".grid"));
    if (!grids.length) return;
    grids.forEach(function (g) { layoutMasonry(g, true); });
    var t;
    window.addEventListener("resize", function () {
      clearTimeout(t);
      t = setTimeout(function () { document.querySelectorAll(".grid").forEach(function (g) { layoutMasonry(g, false); }); }, 120);
    });
  }

  /* ---------- Interações ---------- */
  function toast(msg) {
    var host = document.querySelector(".toasts");
    if (!host) { host = document.createElement("div"); host.className = "toasts"; host.setAttribute("role", "status"); host.setAttribute("aria-live", "polite"); document.body.appendChild(host); }
    var t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = icon("check") + "<span></span>";
    t.lastChild.textContent = msg;
    host.appendChild(t);
    setTimeout(function () { t.remove(); }, 2600);
  }
  window.C365.toast = toast;

  var lastFocus = null;
  function openLayer(el) { lastFocus = document.activeElement; el.hidden = false; var f = el.querySelector("button, a, input"); if (f) f.focus(); }
  function closeLayer(el) { el.hidden = true; if (lastFocus && lastFocus.focus) lastFocus.focus(); }

  function closeMenus(except) {
    document.querySelectorAll("[data-more], [data-account]").forEach(function (b) {
      var m = b.hasAttribute("data-more") ? b.nextElementSibling : document.querySelector("[data-account-menu]");
      if (m && m !== except) { m.hidden = true; b.setAttribute("aria-expanded", "false"); }
    });
  }

  function bind(drawer) {
    document.addEventListener("click", function (e) {
      var t = e.target.closest("button, a, [data-drawer-close], [data-modal-close]");
      if (!t) { closeMenus(); return; }
      if (t.hasAttribute("data-theme-toggle")) { toggleTheme(); return; }
      if (t.hasAttribute("data-drawer-open")) { openLayer(drawer); return; }
      if (t.hasAttribute("data-drawer-close")) { closeLayer(drawer); return; }
      if (t.hasAttribute("data-more") || t.hasAttribute("data-account")) {
        var menu = t.hasAttribute("data-more") ? t.nextElementSibling : document.querySelector("[data-account-menu]");
        var open = menu.hidden;
        closeMenus(menu);
        menu.hidden = !open;
        t.setAttribute("aria-expanded", String(open));
        return;
      }
      if (t.hasAttribute("data-modal-open")) { var m = document.getElementById(t.getAttribute("data-modal-open")); if (m) openLayer(m); return; }
      if (t.hasAttribute("data-modal-close")) { closeLayer(t.closest(".modal")); if (t.getAttribute("data-toast")) toast(t.getAttribute("data-toast")); return; }
      if (t.hasAttribute("data-toggle")) {
        var on = t.getAttribute("aria-pressed") !== "true";
        t.setAttribute("aria-pressed", String(on));
        var msg = on ? t.getAttribute("data-on") : t.getAttribute("data-off");
        if (msg) toast(msg);
        return;
      }
      if (t.hasAttribute("data-toast")) { toast(t.getAttribute("data-toast")); return; }
      if (!t.closest(".menu")) closeMenus();
    });
    document.addEventListener("click", function (e) {
      var chip = e.target.closest(".chips .chip");
      if (!chip) return;
      chip.parentNode.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      closeMenus();
      if (!drawer.hidden) closeLayer(drawer);
      document.querySelectorAll(".modal:not([hidden])").forEach(closeLayer);
    });
    document.addEventListener("submit", function (e) {
      if (!e.target.matches("[data-search], [data-demo-form]")) return;
      e.preventDefault();
      var q = e.target.querySelector("input");
      toast(e.target.hasAttribute("data-search") ? "Busca por “" + (q && q.value || "tudo") + "” — disponível na versão funcional" : "Enviado (demonstração)");
    });
  }

  function markBrokenImages() {
    document.querySelectorAll("img").forEach(function (img) {
      /* Sem rede (ou imagem bloqueada): troca por um pixel transparente e deixa aparecer a cor dominante (--tone). */
      function broken() {
        if (img.classList.contains("is-broken")) return;
        img.classList.add("is-broken");
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      }
      if (img.complete && img.naturalWidth === 0 && img.src) broken();
      img.addEventListener("error", broken);
    });
  }

  function init() {
    var header = document.querySelector("header[data-shell], header.site-header");
    if (header) {
      document.body.classList.add("has-shell");
      renderHeader(header);
      renderPromo(header);
      renderTabbar();
      var drawer = renderDrawer();
      bind(drawer);
      renderSubnav();
    } else {
      bind(document.createElement("div"));
    }
    /* Espaços patrocinados (Mídia 365) em todas as páginas */
    if (!window.Anuncios) carregar([ROOT + "pages/anuncios.js"], function () {});
    var footer = document.querySelector("footer[data-shell]");
    if (footer) renderFooter(footer);
    syncThemeButtons();
    if (window.matchMedia) matchMedia("(prefers-color-scheme: dark)").addEventListener("change", syncThemeButtons);
    markBrokenImages();
    /* Páginas com fotos carregam o catálogo e o visualizador antes de montar o Masonry */
    if (document.querySelector(".card, [data-feed], [data-photos], [data-open-photo]")) {
      carregar([ROOT + "pages/fotos.js", window.Ofertas ? null : ROOT + "pages/ofertas.js", window.CALENDARIO_365 ? null : ROOT + "pages/calendario-365.js", window.Desafios ? null : ROOT + "pages/desafios.js", ROOT + "design-system/viewer.js"], function () {
        if (C365.viewer) C365.viewer.hidratar();
        markBrokenImages();
        initMasonry();
        carregarMais();
        document.dispatchEvent(new CustomEvent("c365:fotos"));
      });
    } else {
      initMasonry();
    }
  }

  function carregar(urls, done) {
    urls = urls.filter(Boolean);
    (function next(i) {
      if (i >= urls.length) return done();
      var s = document.createElement("script");
      s.src = urls[i];
      s.onload = s.onerror = function () { next(i + 1); };
      document.head.appendChild(s);
    })(0);
  }
  C365.carregar = carregar;

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
