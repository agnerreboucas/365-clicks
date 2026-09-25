/* 365 Clicks — Mídia 365: espaços pagos por mês
   Marcas (e fotógrafos, no destaque de perfil) compram espaço fixo na mídia do 365 Clicks
   e pagam uma mensalidade. Regras:
   - todo espaço aparece com o selo "Patrocinado";
   - nada de anúncio dentro das galerias de fotos, nem pop-up (regra do design system);
   - o criativo passa por aprovação antes de ir ao ar;
   - cobrança mensal recorrente; cancelamento com 30 dias de aviso.
   Valores são referência para validar. Anunciantes abaixo são exemplos fictícios. */
(function () {
  "use strict";

  var ESPACOS = [
    { id: "desafio", nome: "Patrocínio dos desafios do mês", onde: "Desafio do Dia e card do desafio na Home: “Desafios do mês apresentados por…”", formato: "Logo + frase de até 80 caracteres + link", preco: 3000, vagas: 1, para: "Marcas" },
    { id: "faixa", nome: "Faixa no topo do site", onde: "Barra no topo de todas as páginas, em rodízio com as ofertas do 365 Clicks", formato: "Texto de até 70 caracteres + link", preco: 1200, vagas: 3, para: "Marcas" },
    { id: "home", nome: "Card patrocinado na Home", onde: "Bloco entre Coleções e Eventos, fora da galeria", formato: "Imagem 16:9 + título + frase + link", preco: 900, vagas: 2, para: "Marcas" },
    { id: "radar", nome: "Apoio no Radar 365", onde: "Bloco de apoio nas 4 edições do mês da newsletter e na página do Radar", formato: "Logo + texto de até 200 caracteres + link", preco: 800, vagas: 2, para: "Marcas" },
    { id: "biblioteca", nome: "Apresentação de um elemento da Biblioteca", onde: "Página de uma técnica, linguagem, enquadramento ou equipamento: “Macro, apresentado por…”", formato: "Logo + frase + link", preco: 500, vagas: 34, para: "Marcas" },
    { id: "fotografo", nome: "Destaque de fotógrafo", onde: "Topo do diretório de Fotógrafos e “Fotógrafos para conhecer” na Home, com selo Destaque", formato: "Seu perfil", preco: 49, vagas: 10, para: "Fotógrafos" }
  ];

  var hoje = new Date(), ini = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  var EXEMPLOS = [
    { id: "ex-lentes", espaco: "desafio", anunciante: "Lentes Horizonte", texto: "Lentes para quem fotografa todos os dias.", link: "loja.html", inicio: ini.getTime(), meses: 3, status: "ativa", impressoes: 48210, cliques: 612, exemplo: true },
    { id: "ex-lab", espaco: "faixa", anunciante: "Laboratório Grão Fino", texto: "Impressão fine art com 15% para a comunidade 365", link: "loja.html", inicio: ini.getTime(), meses: 6, status: "ativa", impressoes: 91540, cliques: 1204, exemplo: true },
    { id: "ex-escola", espaco: "home", anunciante: "Escola Luz & Tempo", texto: "Curso de luz natural: turmas de novembro abertas.", titulo: "Aprenda a ler a luz", link: "cursos.html", inicio: ini.getTime(), meses: 2, status: "ativa", impressoes: 30120, cliques: 388, tone: "#4f4336", tone2: "#c09a6c", exemplo: true },
    { id: "ex-revista", espaco: "radar", anunciante: "Revista Olhar", texto: "Assine a revista impressa e receba 4 fotolivros por ano.", link: "radar.html", inicio: ini.getTime(), meses: 12, status: "ativa", impressoes: 12870, cliques: 301, exemplo: true },
    { id: "ex-tripe", espaco: "biblioteca", elemento: "equipamento-tripe", anunciante: "Tripés Serra", texto: "Estabilidade para as suas longas exposições.", link: "loja.html", inicio: ini.getTime(), meses: 3, status: "ativa", impressoes: 2140, cliques: 57, exemplo: true },
    { id: "ex-analise", espaco: "home", anunciante: "Estúdio Norte", texto: "Aluguel de estúdio por hora para ensaios.", titulo: "Estúdio Norte", link: "loja.html", inicio: ini.getTime(), meses: 1, status: "em análise", impressoes: 0, cliques: 0, exemplo: true }
  ];

  function ler(k, def) { try { return JSON.parse(localStorage.getItem(k) || "null") || def; } catch (e) { return def; } }
  function gravar(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function brl(v) { return "R$ " + v.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, "."); }

  function campanhas() {
    var dec = ler("c365-ads-decisoes", {});
    return ler("c365-campanhas", []).concat(EXEMPLOS).map(function (c) { return Object.assign({}, c, dec[c.id] || {}); });
  }
  function ativas(espaco) { return campanhas().filter(function (c) { return c.espaco === espaco && c.status === "ativa"; }); }
  function espaco(id) { return ESPACOS.filter(function (e) { return e.id === id; })[0]; }
  function livres(id) { return espaco(id).vagas - campanhas().filter(function (c) { return c.espaco === id && (c.status === "ativa" || c.status === "em análise"); }).length; }

  /* Métricas de entrega (no protótipo, contadas neste navegador) */
  function contar(id, tipo) {
    var m = ler("c365-ads-metricas", {});
    m[id] = m[id] || { i: 0, c: 0 };
    m[id][tipo]++;
    gravar("c365-ads-metricas", m);
  }
  function metricas(c) { var m = ler("c365-ads-metricas", {})[c.id] || { i: 0, c: 0 }; return { impressoes: (c.impressoes || 0) + m.i, cliques: (c.cliques || 0) + m.c }; }

  var ROOT = (window.C365 && window.C365.root) || "../";
  var pg = function (p) { return p.indexOf("http") === 0 ? p : ROOT + "pages/" + p; };
  function selo() { return '<span class="badge plain ad-badge">Patrocinado</span>'; }

  /* Preenche os espaços marcados com data-anuncio="desafio|home|radar|biblioteca" */
  function render() {
    document.querySelectorAll("[data-anuncio]").forEach(function (slot) {
      var tipo = slot.getAttribute("data-anuncio"), lista = ativas(tipo);
      if (tipo === "biblioteca") lista = lista.filter(function (c) { return c.elemento === slot.getAttribute("data-elemento"); });
      var c = lista[0];
      if (!c) { slot.innerHTML = tipo === "biblioteca" ? "" : '<a class="ad-vaga" href="' + pg("anuncie.html") + '">Espaço disponível para patrocínio →</a>'; return; }
      var link = ' href="' + pg(c.link) + '" data-ad="' + c.id + '"';
      if (tipo === "home") {
        slot.innerHTML = '<a class="ad-card"' + link + '><span class="ad-img" style="--tone:' + (c.tone || "#2c2c2a") + ";--tone2:" + (c.tone2 || "#6a6a64") + '"></span><span class="ad-body">' + selo() + "<strong>" + esc(c.titulo || c.anunciante) + '</strong><span class="small muted">' + esc(c.texto) + '</span><span class="small">' + esc(c.anunciante) + " →</span></span></a>";
      } else {
        var rot = { desafio: "Desafios do mês apresentados por", radar: "Esta edição tem o apoio de", biblioteca: "Apresentado por" }[tipo];
        slot.innerHTML = '<a class="ad-line"' + link + "><span><span class=\"eyebrow\">" + rot + "</span> <strong>" + esc(c.anunciante) + '</strong></span><span class="small muted">' + esc(c.texto) + "</span>" + selo() + "</a>";
      }
      contar(c.id, "i");
    });
    var faixa = ativas("faixa");
    if (window.C365 && window.C365.promos && faixa.length && !window.C365.promos._ads) {
      window.C365.promos._ads = true;
      faixa.forEach(function (c, i) { window.C365.promos.splice(1 + i * 2, 0, ["Patrocinado", c.anunciante + " · " + c.texto, c.link, "Saiba mais", c.id]); });
    }
  }
  document.addEventListener("click", function (e) { var a = e.target.closest("[data-ad]"); if (a) contar(a.getAttribute("data-ad"), "c"); });

  window.Anuncios = { espacos: ESPACOS, espaco: espaco, campanhas: campanhas, ativas: ativas, livres: livres, metricas: metricas, render: render, brl: brl, esc: esc, ler: ler, gravar: gravar };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render); else render();
})();
