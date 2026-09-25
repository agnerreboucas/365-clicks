/* 365 Clicks — visualizador de fotos, proteção de imagem, contato com o fotógrafo e rastreio
   Depende de app.js (C365), pages/fotos.js (Fotos) e pages/ofertas.js (Ofertas.termos). */
(function () {
  "use strict";
  var C = window.C365, F = window.Fotos, T = window.Ofertas && window.Ofertas.termos;
  if (!C || !F) return;
  var I = C.icon;
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function agora() { var d = new Date(); return d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }); }
  function hoje() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }

  /* ================= Rastreio =================
     Visualização (abrir a foto), clique em "Falar com o fotógrafo" e contato enviado.
     Na página publicada, grava no banco compartilhado do artifact (claude.use("db")):
       stats/<foto>~<visitante>~<dia>  → contadores agregados por dia (sem dados pessoais)
       leads/<id>                       → contatos enviados (leitura só para administradores)
     Sem banco (arquivo local), grava no navegador. */
  var Track = (function () {
    var db = null, uid = "local", cache = {};
    var ready = (async function () {
      try {
        if (window.claude && typeof window.claude.use === "function") {
          db = await window.claude.use("db");
          var u = await window.claude.use("user");
          if (u && typeof u.id === "function") {
            var id = await u.id();
            if (id) uid = String(id).replace(/[^A-Za-z0-9_\-.~:@+]/g, "_").slice(0, 80);
          }
        }
      } catch (e) { db = null; }
    })();

    function lerLocal(k) { try { return JSON.parse(localStorage.getItem(k) || "[]"); } catch (e) { return []; } }
    function gravarLocal(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

    function registrarLocal(tipo, foto) {
      var ev = lerLocal("c365-eventos");
      ev.push({ t: tipo, foto: foto.id, fotografo: foto.fotografo, dia: hoje(), em: Date.now() });
      gravarLocal("c365-eventos", ev.slice(-3000));
    }

    function agendar(entry) {
      clearTimeout(entry.timer);
      entry.timer = setTimeout(function () {
        var body = Object.assign({}, entry.data, { updatedAt: Date.now() });
        entry.chain = entry.chain.then(function () { return entry.ref.set(body); }).catch(function () {});
      }, 700);
    }

    async function registrar(tipo, foto) {
      registrarLocal(tipo, foto);
      await ready;
      if (!db) return;
      var key = foto.id + "~" + uid + "~" + hoje();
      var entry = cache[key];
      if (!entry) {
        var ref = db.doc("stats/" + key);
        entry = cache[key] = { ref: ref, chain: Promise.resolve(), timer: null };
        entry.loading = ref.get().then(function (s) {
          var d = s.exists ? s.data() : null;
          entry.data = { foto: foto.id, fotografo: foto.fotografo, dia: hoje(), views: d ? d.views || 0 : 0, clicks: d ? d.clicks || 0 : 0, leads: d ? d.leads || 0 : 0, shares: d ? d.shares || 0 : 0 };
        }).catch(function () { entry.data = { foto: foto.id, fotografo: foto.fotografo, dia: hoje(), views: 0, clicks: 0, leads: 0, shares: 0 }; });
      }
      await entry.loading;
      var campo = { view: "views", click: "clicks", lead: "leads", share: "shares" }[tipo];
      entry.data[campo] = (entry.data[campo] || 0) + 1;
      agendar(entry);
    }

    async function lead(dados) {
      var l = lerLocal("c365-leads");
      l.unshift(dados);
      gravarLocal("c365-leads", l.slice(0, 500));
      await ready;
      if (!db) return "local";
      try { await db.collection("leads").add(dados); return "db"; } catch (e) { return "local"; }
    }

    /* Leitura para o painel administrativo */
    async function ler() {
      await ready;
      if (db) {
        try {
          var s = await db.collection("stats").limit(1000).get();
          var l = await db.collection("leads").orderBy("em", "desc").limit(500).get();
          return { fonte: "db", stats: s.docs.map(function (d) { return d.data(); }), leads: l.docs.map(function (d) { return d.data(); }) };
        } catch (e) { /* cai para o navegador */ }
      }
      var agg = {};
      lerLocal("c365-eventos").forEach(function (e) {
        var k = e.foto + "~" + e.dia;
        var a = agg[k] || (agg[k] = { foto: e.foto, fotografo: e.fotografo, dia: e.dia, views: 0, clicks: 0, leads: 0, shares: 0 });
        a[{ view: "views", click: "clicks", lead: "leads", share: "shares" }[e.t]]++;
      });
      return { fonte: "local", stats: Object.keys(agg).map(function (k) { return agg[k]; }), leads: lerLocal("c365-leads") };
    }

    return { registrar: registrar, lead: lead, ler: ler, ready: ready };
  })();

  /* ================= Proteção ================= */
  var avisoEm = 0;
  function avisar() {
    if (Date.now() - avisoEm < 4000) return;
    avisoEm = Date.now();
    C.toast("Foto protegida por direitos autorais. Fale com o fotógrafo para licenciar.");
  }
  function protegido(el) { return el && el.closest && el.closest(".card, .protected, .viewer-stage, .feed-card, .photo"); }
  var escudoTimer;
  function escudo(ms) {
    document.body.classList.add("is-shielded");
    clearTimeout(escudoTimer);
    if (ms) escudoTimer = setTimeout(function () { if (document.hasFocus()) document.body.classList.remove("is-shielded"); }, ms);
  }
  document.addEventListener("contextmenu", function (e) { if (protegido(e.target)) { e.preventDefault(); avisar(); } });
  document.addEventListener("dragstart", function (e) { if (protegido(e.target)) e.preventDefault(); });
  document.addEventListener("keydown", function (e) {
    var k = (e.key || "").toLowerCase(), mod = e.ctrlKey || e.metaKey;
    if (mod && (k === "s" || k === "p")) { e.preventDefault(); escudo(1500); avisar(); }
    if (e.metaKey && e.shiftKey) escudo(3000);        /* macOS: Cmd+Shift+3/4/5 · Windows: Win+Shift+S */
    if (k === "printscreen") escudo(3000);
  });
  document.addEventListener("keyup", function (e) {
    if ((e.key || "").toLowerCase() === "printscreen") {
      escudo(3000); avisar();
      try { navigator.clipboard.writeText("Imagem protegida · 365 Clicks").catch(function () {}); } catch (x) {}
    }
  });
  /* Copiar (Ctrl/Cmd+C, menu, arrastar para outro app) fica bloqueado em fotos e no visualizador.
     Compartilhar continua liberado: o link é copiado pelo botão Compartilhar. */
  function dentroDeFoto() {
    var sel = window.getSelection && getSelection();
    var no = sel && sel.anchorNode && (sel.anchorNode.nodeType === 1 ? sel.anchorNode : sel.anchorNode.parentNode);
    return (document.body.classList.contains("viewer-open") && !(no && no.closest && no.closest("input, textarea, [data-share-url], .share-box"))) || protegido(no) || protegido(document.activeElement);
  }
  ["copy", "cut"].forEach(function (t) {
    document.addEventListener(t, function (e) {
      if (!dentroDeFoto()) return;
      e.preventDefault();
      try { e.clipboardData.setData("text/plain", "Foto protegida · 365 Clicks. Use o botão Compartilhar."); } catch (x) {}
      avisar();
    });
  });
  document.addEventListener("keydown", function (e) {
    var k = (e.key || "").toLowerCase();
    if ((e.ctrlKey || e.metaKey) && (k === "c" || k === "x" || k === "a") && dentroDeFoto()) { e.preventDefault(); avisar(); }
  });
  window.addEventListener("beforeprint", function () { escudo(0); });
  window.addEventListener("afterprint", function () { if (document.hasFocus()) document.body.classList.remove("is-shielded"); });
  window.addEventListener("blur", function () { escudo(0); });
  window.addEventListener("focus", function () { document.body.classList.remove("is-shielded"); });
  document.addEventListener("visibilitychange", function () { if (document.hidden) escudo(0); });

  function marcaDagua(texto) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="220"><text x="30" y="120" transform="rotate(-24 240 110)" font-family="Arial, sans-serif" font-size="15" fill="#fff" fill-opacity=".34">' +
      esc(texto) + "</text></svg>";
    return 'url("data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg) + '")';
  }

  /* ================= Cards das galerias ================= */
  function hidratar(root, ordem) {
    var fonte = ordem || F.lista;
    var cards = (root || document).querySelectorAll(ordem ? ".card" : ".card:not([data-photo])");
    var n = 0;
    cards.forEach(function (card) {
      var foto = fonte[n++ % fonte.length], ph = F.fotografo(foto.fotografo);
      card.setAttribute("data-photo", foto.id);
      var img = card.querySelector("img");
      if (img) {
        img.classList.remove("is-broken");
        img.src = foto.thumb;
        img.alt = foto.titulo + ", de " + ph.nome;
        img.setAttribute("draggable", "false");
        img.style.cssText = "--ratio:" + foto.ratio + ";--tone:" + foto.tone + ";--tone2:" + foto.tone2;
      }
      var cap = card.querySelector(".meta");
      if (cap) cap.innerHTML = "<b>" + esc(foto.titulo) + '</b><span class="small">@' + ph.id + " · " + esc(foto.local) + '</span><span class="exif">' + esc(foto.exif) + "</span>";
      var velho = card.querySelector(".card-hit");
      if (velho && ordem) velho.setAttribute("aria-label", "Abrir “" + foto.titulo + "”, de " + ph.nome);
      if (!velho) {
        var hit = document.createElement("button");
        hit.type = "button";
        hit.className = "card-hit";
        hit.setAttribute("aria-label", "Abrir “" + foto.titulo + "”, de " + ph.nome);
        card.insertBefore(hit, card.firstChild);
      }
    });
  }

  /* ================= Visualizador ================= */
  var V = null, contexto = [], atual = null, retorno = null;

  function montar() {
    V = document.createElement("div");
    V.className = "viewer";
    V.hidden = true;
    V.setAttribute("role", "dialog");
    V.setAttribute("aria-modal", "true");
    V.setAttribute("aria-labelledby", "viewer-title");
    V.innerHTML =
      '<div class="viewer-stage protected">' +
        '<div class="viewer-photo" aria-hidden="true"><div class="viewer-img"><div class="viewer-mark"></div><div class="viewer-guard"></div></div></div>' +
        '<button class="viewer-nav prev" type="button" data-v="prev" aria-label="Foto anterior">' + I("chevron") + "</button>" +
        '<button class="viewer-nav next" type="button" data-v="next" aria-label="Próxima foto">' + I("chevron") + "</button>" +
        '<span class="viewer-rights" data-rights></span>' +
      "</div>" +
      '<aside class="viewer-side">' +
        '<div class="viewer-top"><span class="mono" data-count></span><button class="btn btn-ghost btn-icon" type="button" data-v="close" aria-label="Fechar">' + I("close") + "</button></div>" +
        '<div data-panel="info"></div>' +
        '<div data-panel="contato" hidden></div>' +
      "</aside>";
    document.body.appendChild(V);

    V.addEventListener("click", function (e) {
      var b = e.target.closest("[data-v]");
      if (!b) return;
      var a = b.getAttribute("data-v");
      if (a === "close") fechar();
      else if (a === "prev") passo(-1);
      else if (a === "next") passo(1);
      else if (a === "contato") { Track.registrar("click", atual); mostrarContato(); }
      else if (a === "voltar") mostrarInfo();
      else if (a === "abrir") abrir(F.foto(b.getAttribute("data-id")), F.doFotografo(atual.fotografo));
      else if (a === "marcar") abrirMarcacao();
      else if (a === "compartilhar") abrirShare();
      else if (a === "copiar") copiar(b.getAttribute("data-canal"));
      else if (a === "salvar-tags") salvarMarcacao();
      else if (a === "mencionar") mencionar(b.getAttribute("data-id"));
      else if (a.indexOf("com-") === 0) acaoComentario(a, b.getAttribute("data-id"));
    });
    V.addEventListener("submit", function (e) { if (!enviarDenuncia(e) && !comentar(e)) enviarContato(e); });
  }

  function abrir(foto, lista, origem) {
    if (!foto) return;
    if (!V) montar();
    if (origem) retorno = origem;
    contexto = lista && lista.length ? lista : F.lista;
    atual = foto;
    var ph = F.fotografo(foto.fotografo);
    var img = V.querySelector(".viewer-img");
    img.style.backgroundImage = "url('" + foto.grande + "'), linear-gradient(160deg," + foto.tone2 + "," + foto.tone + ")";
    img.setAttribute("data-ratio", foto.ratio);
    V.querySelector(".viewer-mark").style.backgroundImage = marcaDagua("© " + ph.nome + " · 365 Clicks · " + agora());
    V.querySelector("[data-rights]").textContent = "© " + foto.data.slice(-4) + " " + ph.nome + " · Todos os direitos reservados";
    var idx = contexto.indexOf(foto);
    V.querySelector("[data-count]").textContent = idx > -1 ? (idx + 1) + " / " + contexto.length : "";
    renderInfo(foto, ph);
    renderSocial(foto);
    mostrarInfo();
    if (V.hidden) { V.hidden = false; document.body.classList.add("viewer-open"); V.querySelector('[data-v="close"]').focus(); }
    ajustar();
    Track.registrar("view", foto);
  }

  function renderInfo(foto, ph) {
    var outras = F.doFotografo(ph.id).filter(function (f) { return f.id !== foto.id; });
    V.querySelector('[data-panel="info"]').innerHTML =
      '<div class="cluster" style="gap:12px"><span class="avatar" style="--av:' + ph.av + '">' + F.iniciais(ph.nome) + '</span><div style="flex:1;min-width:0"><strong>' + esc(ph.nome) + '</strong><div class="small">@' + ph.id + " · " + esc(ph.cidade) + '</div></div><button class="btn btn-secondary btn-sm" type="button" aria-pressed="false" data-toggle data-on="Agora você segue ' + esc(ph.nome) + '">Seguir</button></div>' +
      '<div class="cluster" style="margin-top:20px;gap:8px"><span class="day">DIA <b>' + foto.dia + "</b>/365</span></div>" +
      '<h2 id="viewer-title" class="viewer-title">' + esc(foto.titulo) + "</h2>" +
      '<p class="viewer-desc">' + esc(foto.descricao) + "</p>" +
      '<dl class="kv" style="grid-template-columns:auto 1fr;margin:16px 0"><dt>Câmera</dt><dd style="text-align:left" class="mono">' + esc(foto.exif) + '</dd><dt>Local</dt><dd style="text-align:left">' + esc(foto.local) + '</dd><dt>Publicada</dt><dd style="text-align:left">' + esc(foto.data) + "</dd></dl>" +
      '<div class="cluster"><button class="btn btn-secondary btn-sm" type="button" aria-pressed="false" data-toggle data-on="Curtida registrada">' + I("heart", "i-sm") + " " + foto.curtidas + '</button><button class="btn btn-secondary btn-sm" type="button" aria-pressed="false" data-toggle data-on="Salva em Coleções">' + I("bookmark", "i-sm") + " Salvar</button>" + '<button class="btn btn-secondary btn-sm" type="button" data-v="compartilhar">Compartilhar</button></div><div data-share hidden></div>' +
      '<div class="viewer-cta"><strong>Quer usar esta foto?</strong><p class="small" style="margin:4px 0 12px">Esta foto não pode ser baixada. Para comprar, licenciar ou contratar um trabalho, fale direto com ' + esc(ph.nome.split(" ")[0]) + '.</p><button class="btn btn-primary btn-block" type="button" data-v="contato">Falar com o fotógrafo</button></div>' +
      (outras.length ? '<h3 class="viewer-more">Mais de ' + esc(ph.nome) + '</h3><div class="viewer-thumbs">' + outras.map(function (f) {
        return '<button type="button" class="viewer-thumb" data-v="abrir" data-id="' + f.id + '" aria-label="Abrir “' + esc(f.titulo) + '”" style="background-image:url(\'' + f.thumb + "'),linear-gradient(160deg," + f.tone2 + "," + f.tone + ')"></button>';
      }).join("") + "</div>" : "") +
      '<section class="viewer-social"><div class="cluster" style="justify-content:space-between"><h3 class="viewer-more" style="margin:0">Marcações</h3><button class="btn btn-ghost btn-sm" type="button" data-v="marcar">' + I("user", "i-sm") + ' Marcar fotógrafo</button></div>' +
        '<div class="cluster" data-tags style="margin-top:8px"></div><div data-tag-picker hidden></div></section>' +
      '<section class="viewer-social"><h3 class="viewer-more" style="margin-top:0">Comentários <span class="badge plain num" data-ncom></span></h3><div class="comments" data-comments></div>' +
        '<form class="comment-form" data-comentar><label class="sr-only" for="cm-texto">Comentário</label><div class="mention-wrap"><textarea class="textarea" id="cm-texto" rows="2" placeholder="Comente ou cite alguém com @"></textarea><div class="mention-list" data-mentions hidden></div></div><button class="btn btn-sm" type="submit">Comentar</button></form></section>' +
      '<p class="viewer-legal">Obra protegida pela Lei 9.610/98. É proibido baixar, capturar a tela, reproduzir ou publicar sem autorização por escrito do autor.</p>';
  }


  /* ================= Comentários, citações (@) e marcações =================
     Cada citação ou marcação gera uma notificação por e-mail para a pessoa (na versão funcional). */
  function lerJSON(k, def) { try { return JSON.parse(localStorage.getItem(k) || "null") || def; } catch (e) { return def; } }
  function gravarJSON(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function pessoaHTML(id) { var p = F.pessoa(id); return p ? esc(p.nome) : "@" + esc(id); }
  function realcar(texto) {
    return esc(texto).replace(/@([a-z0-9_.]+)/gi, function (m, h) { return F.pessoa(h.toLowerCase()) ? '<a class="mention" href="#">' + m + "</a>" : m; });
  }
  function notificar(ids, acao) {
    ids = ids.filter(function (id, i) { return F.pessoa(id) && ids.indexOf(id) === i; });
    if (!ids.length) return;
    var nomes = ids.map(function (id) { return F.pessoa(id).nome.split(" ")[0]; });
    C.toast((nomes.length === 1 ? nomes[0] + " recebeu" : nomes.join(", ") + " receberam") + " um e-mail: " + acao);
  }

  /* ---------- Comentários com moderação ----------
     Quem escreveu: edita (fica marcado "editado") e exclui.
     Quem recebeu (dono da foto): aprova ou recusa antes de aparecer, oculta e denuncia quem comentou.
     Qualquer pessoa pode denunciar um comentário. As denúncias vão para Admin → Moderação. */
  var EU_ID = "marcosandrade";
  function aprovaAntes() { try { var pf = JSON.parse(localStorage.getItem("c365-perfil") || "null"); return !pf || pf.aprovar !== false; } catch (e) { return true; } }
  function comentarios(foto) {
    var dono = foto.fotografo === EU_ID, mod = lerJSON("c365-com-mod-" + foto.id, {});
    var ex = F.comentariosExemplo(foto).map(function (c, i) {
      return Object.assign({ id: "ex-" + i, status: dono && aprovaAntes() && i === 0 ? "pendente" : "aprovado" }, c);
    });
    return ex.concat(lerJSON("c365-com-" + foto.id, [])).map(function (c) { return Object.assign({}, c, mod[c.id] || {}); })
      .filter(function (c) { return c.status !== "excluido" && c.status !== "recusado"; });
  }
  function salvarMod(foto, id, dados) {
    var mod = lerJSON("c365-com-mod-" + foto.id, {});
    mod[id] = Object.assign(mod[id] || {}, dados);
    gravarJSON("c365-com-mod-" + foto.id, mod);
  }
  function acoesComentario(c, dono) {
    var b = function (acao, rotulo) { return '<button type="button" class="btn btn-ghost btn-sm" data-v="' + acao + '" data-id="' + c.id + '">' + rotulo + "</button>"; };
    var out = [];
    if (c.autor === "voce") out.push(b("com-editar", "Editar"), b("com-excluir", "Excluir"));
    if (dono && c.autor !== "voce") {
      if (c.status === "pendente") out.push(b("com-aprovar", "Aprovar"), b("com-recusar", "Recusar"));
      else if (c.status === "oculto") out.push(b("com-aprovar", "Mostrar de novo"));
      else out.push(b("com-ocultar", "Ocultar"));
    }
    if (c.autor !== "voce") out.push(b("com-denunciar", "Denunciar"));
    return '<div class="comment-actions">' + out.join("") + "</div>";
  }
  function renderSocial(foto) {
    var tags = lerJSON("c365-tags-" + foto.id, []);
    V.querySelector("[data-tags]").innerHTML = tags.length
      ? tags.map(function (id) { var p = F.pessoa(id); return '<span class="chip" style="cursor:default"><span class="avatar avatar-sm" style="--size:22px;--av:' + p.av + '">' + F.iniciais(p.nome) + "</span>@" + id + "</span>"; }).join("")
      : '<span class="small">Ninguém marcado ainda. Marque um fotógrafo para mostrar esta foto a ele.</span>';
    var dono = foto.fotografo === EU_ID;
    var coms = comentarios(foto).filter(function (c) { return dono || c.autor === "voce" || c.status === "aprovado"; });
    var pend = coms.filter(function (c) { return c.status === "pendente"; }).length;
    V.querySelector("[data-ncom]").textContent = coms.filter(function (c) { return c.status === "aprovado"; }).length + (dono && pend ? " · " + pend + " para aprovar" : "");
    V.querySelector("[data-comments]").innerHTML = (dono ? '<p class="small muted" style="margin:0">Esta foto é sua. ' + (aprovaAntes() ? "Comentários novos só aparecem depois que você aprovar." : "Comentários aparecem na hora.") + ' <a href="editar-perfil.html#s-privacidade">Mudar</a></p>' : "") +
      coms.map(function (c) {
        var p = F.pessoa(c.autor) || { nome: "Você", av: "var(--accent-soft)" };
        var selo = c.status === "pendente" ? '<span class="badge badge-warning plain">' + (c.autor === "voce" ? "Aguardando aprovação" : "Para aprovar") + "</span>" : c.status === "oculto" ? '<span class="badge plain">Oculto</span>' : "";
        return '<div class="comment' + (c.status !== "aprovado" ? " is-muted" : "") + '" data-cid="' + c.id + '"><span class="avatar avatar-sm" style="--av:' + p.av + '">' + F.iniciais(p.nome) + '</span><div class="comment-body"><div><strong>' + esc(p.nome) + '</strong> <span class="small">· ' + esc(c.quando) + (c.editado ? " · editado" : "") + "</span> " + selo + '</div><div class="comment-text">' + realcar(c.texto) + "</div>" + acoesComentario(c, dono) + '<div class="comment-extra"></div></div></div>';
      }).join("");
  }
  function acharComentario(id) { return comentarios(atual).filter(function (c) { return c.id === id; })[0]; }
  function acaoComentario(acao, id) {
    var c = acharComentario(id); if (!c) return;
    var box = V.querySelector('[data-cid="' + id + '"] .comment-extra');
    if (acao === "com-editar") {
      box.innerHTML = '<label class="sr-only" for="ed-' + id + '">Editar comentário</label><textarea class="textarea" id="ed-' + id + '" rows="2">' + esc(c.texto) + '</textarea><div class="cluster" style="margin-top:6px"><button class="btn btn-sm" type="button" data-v="com-salvar" data-id="' + id + '">Salvar</button><button class="btn btn-ghost btn-sm" type="button" data-v="com-cancelar" data-id="' + id + '">Cancelar</button></div>';
      box.querySelector("textarea").focus();
    } else if (acao === "com-salvar") {
      var t = box.querySelector("textarea").value.trim();
      if (!t) { C.toast("O comentário não pode ficar vazio. Use Excluir."); return; }
      var lista = lerJSON("c365-com-" + atual.id, []);
      lista.forEach(function (x) { if (x.id === id) { x.texto = t.slice(0, 600); x.editado = true; } });
      gravarJSON("c365-com-" + atual.id, lista);
      renderSocial(atual); C.toast("Comentário editado");
    } else if (acao === "com-cancelar") { box.innerHTML = ""; }
    else if (acao === "com-excluir") {
      box.innerHTML = '<div class="notice warning"><span>Excluir este comentário? <button class="btn btn-sm btn-danger" type="button" data-v="com-excluir-ok" data-id="' + id + '">Excluir</button> <button class="btn btn-ghost btn-sm" type="button" data-v="com-cancelar" data-id="' + id + '">Manter</button></span></div>';
    } else if (acao === "com-excluir-ok") {
      gravarJSON("c365-com-" + atual.id, lerJSON("c365-com-" + atual.id, []).filter(function (x) { return x.id !== id; }));
      renderSocial(atual); C.toast("Comentário excluído");
    } else if (acao === "com-aprovar") { salvarMod(atual, id, { status: "aprovado" }); renderSocial(atual); C.toast("Comentário aprovado. " + (F.pessoa(c.autor) || {}).nome + " recebeu um e-mail."); }
    else if (acao === "com-recusar") { salvarMod(atual, id, { status: "recusado" }); renderSocial(atual); C.toast("Comentário recusado. Ele não aparece para ninguém."); }
    else if (acao === "com-ocultar") { salvarMod(atual, id, { status: "oculto" }); renderSocial(atual); C.toast("Comentário oculto. Só você ainda o vê."); }
    else if (acao === "com-denunciar") {
      box.innerHTML = '<form class="report" data-denuncia="' + id + '"><label class="label" for="dn-' + id + '">Por que você está denunciando?</label><select class="select" id="dn-' + id + '"><option>Ofensa, assédio ou discurso de ódio</option><option>Spam ou propaganda</option><option>Conteúdo impróprio</option><option>Uso indevido da minha foto ou do meu trabalho</option><option>Outro motivo</option></select>' +
        '<label class="sr-only" for="dd-' + id + '">Detalhes</label><textarea class="textarea" id="dd-' + id + '" rows="2" placeholder="Detalhes (opcional)"></textarea>' +
        '<label class="check"><input type="checkbox" id="db-' + id + '"> Bloquear ' + esc((F.pessoa(c.autor) || { nome: "esta pessoa" }).nome) + " (não poderá mais comentar nas suas fotos)</label>" +
        '<div class="cluster"><button class="btn btn-sm btn-danger" type="submit">Enviar denúncia</button><button class="btn btn-ghost btn-sm" type="button" data-v="com-cancelar" data-id="' + id + '">Cancelar</button></div></form>';
    }
  }
  function enviarDenuncia(e) {
    var f = e.target.closest("[data-denuncia]"); if (!f) return false;
    e.preventDefault();
    var id = f.getAttribute("data-denuncia"), c = acharComentario(id), autor = F.pessoa(c.autor) || { id: c.autor, nome: c.autor };
    var lista = lerJSON("c365-denuncias", []);
    lista.unshift({ tipo: "comentario", foto: atual.id, fotoTitulo: atual.titulo, fotografo: atual.fotografo, comentario: id, autor: autor.id, autorNome: autor.nome, texto: c.texto,
      motivo: f.querySelector("select").value, detalhes: f.querySelector("textarea").value.trim().slice(0, 500), bloqueou: f.querySelector("input[type=checkbox]").checked, por: EU_ID, em: Date.now(), status: "aberta" });
    gravarJSON("c365-denuncias", lista.slice(0, 200));
    if (atual.fotografo === EU_ID) salvarMod(atual, id, { status: "oculto" });
    renderSocial(atual);
    C.toast("Denúncia enviada para a moderação" + (atual.fotografo === EU_ID ? " e comentário ocultado" : "") + ". Resposta em até 24 h.");
    return true;
  }

  function abrirMarcacao() {
    var box = V.querySelector("[data-tag-picker]");
    if (!box.hidden) { box.hidden = true; return; }
    var ja = lerJSON("c365-tags-" + atual.id, []);
    box.innerHTML = '<div class="search-field" style="margin:12px 0 8px">' + I("search") + '<label class="sr-only" for="tag-q">Buscar pessoa</label><input class="input" id="tag-q" placeholder="Buscar fotógrafo"></div><div class="tag-options">' +
      F.pessoas.filter(function (p) { return p.id !== atual.fotografo; }).map(function (p) {
        return '<label class="check tag-opt" data-nome="' + esc(p.nome.toLowerCase() + " " + p.id) + '"><input type="checkbox" value="' + p.id + '"' + (ja.indexOf(p.id) > -1 ? " checked disabled" : "") + '> <span class="avatar avatar-sm" style="--av:' + p.av + '">' + F.iniciais(p.nome) + "</span> " + esc(p.nome) + ' <span class="small">@' + p.id + "</span></label>";
      }).join("") + '</div><button class="btn btn-sm" type="button" data-v="salvar-tags" style="margin-top:8px">Marcar e notificar por e-mail</button>';
    box.hidden = false;
    box.querySelector("#tag-q").focus();
  }
  function salvarMarcacao() {
    var box = V.querySelector("[data-tag-picker]");
    var novos = Array.prototype.map.call(box.querySelectorAll("input[type=checkbox]:checked:not(:disabled)"), function (i) { return i.value; });
    if (!novos.length) { C.toast("Escolha pelo menos uma pessoa"); return; }
    var tags = lerJSON("c365-tags-" + atual.id, []).concat(novos);
    gravarJSON("c365-tags-" + atual.id, tags);
    box.hidden = true;
    renderSocial(atual);
    notificar(novos, "você foi marcado em “" + atual.titulo + "”");
  }

  document.addEventListener("input", function (e) {
    if (e.target.id === "tag-q") {
      var q = e.target.value.toLowerCase();
      V.querySelectorAll(".tag-opt").forEach(function (l) { l.hidden = q && l.getAttribute("data-nome").indexOf(q) < 0; });
    }
    if (e.target.id === "cm-texto") {
      var t = e.target, antes = t.value.slice(0, t.selectionStart), m = antes.match(/@([a-z0-9_.]*)$/i), list = V.querySelector("[data-mentions]");
      if (!m) { list.hidden = true; return; }
      var q2 = m[1].toLowerCase();
      var achados = F.pessoas.filter(function (p) { return (p.id + " " + p.nome.toLowerCase()).indexOf(q2) > -1; }).slice(0, 5);
      list.innerHTML = achados.map(function (p) { return '<button type="button" data-v="mencionar" data-id="' + p.id + '"><span class="avatar avatar-sm" style="--av:' + p.av + '">' + F.iniciais(p.nome) + "</span>" + esc(p.nome) + ' <span class="small">@' + p.id + "</span></button>"; }).join("");
      list.hidden = !achados.length;
    }
  });

  function mencionar(id) {
    var t = V.querySelector("#cm-texto"), pos = t.selectionStart, antes = t.value.slice(0, pos).replace(/@([a-z0-9_.]*)$/i, "@" + id + " ");
    t.value = antes + t.value.slice(pos);
    t.focus();
    t.setSelectionRange(antes.length, antes.length);
    V.querySelector("[data-mentions]").hidden = true;
  }

  function comentar(e) {
    if (!e.target.matches("[data-comentar]")) return false;
    e.preventDefault();
    var t = V.querySelector("#cm-texto"), texto = t.value.trim();
    if (!texto) { t.focus(); return true; }
    var lista = lerJSON("c365-com-" + atual.id, []);
    var precisa = atual.fotografo !== EU_ID && atual.fotografo === "rafaborges"; /* exemplo: Rafael aprova comentários antes */
    lista.push({ id: "c" + Date.now(), autor: "voce", texto: texto.slice(0, 600), quando: "agora", status: precisa ? "pendente" : "aprovado" });
    gravarJSON("c365-com-" + atual.id, lista);
    t.value = "";
    renderSocial(atual);
    var citados = (texto.match(/@([a-z0-9_.]+)/gi) || []).map(function (x) { return x.slice(1).toLowerCase(); });
    var ph = F.fotografo(atual.fotografo);
    C.toast(atual.fotografo === EU_ID ? "Comentário publicado" : ph.nome.split(" ")[0] + (precisa ? " vai aprovar seu comentário antes de ele aparecer" : " recebeu um e-mail com seu comentário"));
    if (citados.length) setTimeout(function () { notificar(citados.filter(function (c) { return c !== ph.id; }), "você foi citado num comentário"); }, 900);
    return true;
  }

  /* Encaixa a foto na área disponível mantendo a proporção */
  function ajustar() {
    if (!V || V.hidden) return;
    var box = V.querySelector(".viewer-photo"), img = V.querySelector(".viewer-img");
    var r = (img.getAttribute("data-ratio") || "3/2").split("/"), ar = +r[0] / +r[1];
    var bw = box.clientWidth, bh = window.innerWidth <= 900 ? window.innerHeight * 0.62 : box.clientHeight;
    var w = bw, h = w / ar;
    if (h > bh) { h = bh; w = h * ar; }
    img.style.width = Math.round(w) + "px";
    img.style.height = Math.round(h) + "px";
  }
  window.addEventListener("resize", ajustar);


  /* ================= Compartilhamento com rastreio (UTM) =================
     A foto nunca é baixada: compartilha-se o link da página da foto. Cada link leva
     utm_source (canal), utm_medium, utm_campaign, utm_content (foto) e ref (quem compartilhou). */
  var SITE = "https://365clicks.com.br", EU = "marcosandrade";
  var CANAIS = [
    ["whatsapp", "WhatsApp", function (u, t) { return "https://wa.me/?text=" + encodeURIComponent(t + " " + u); }],
    ["facebook", "Facebook", function (u) { return "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(u); }],
    ["linkedin", "LinkedIn", function (u) { return "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(u); }],
    ["x", "X", function (u, t) { return "https://twitter.com/intent/tweet?url=" + encodeURIComponent(u) + "&text=" + encodeURIComponent(t); }]
  ];
  function linkUTM(foto, canal, medio) {
    return SITE + "/foto/" + foto.id + "?utm_source=" + canal + "&utm_medium=" + (medio || "social") + "&utm_campaign=compartilhar_foto&utm_content=" + foto.id + "&ref=" + EU;
  }
  function abrirShare() {
    var box = V.querySelector("[data-share]");
    if (!box.hidden) { box.hidden = true; return; }
    var ph = F.fotografo(atual.fotografo), texto = "“" + atual.titulo + "”, de " + ph.nome + ", no 365 Clicks";
    box.innerHTML = '<div class="share-box"><span class="small">Compartilhe o link da foto. Ela continua protegida: quem abrir vê no 365 Clicks.</span><div class="cluster">' +
      CANAIS.map(function (c) { return '<a class="btn btn-secondary btn-sm" target="_blank" rel="noopener" data-canal="' + c[0] + '" href="' + esc(c[2](linkUTM(atual, c[0]), texto)) + '">' + c[1] + "</a>"; }).join("") +
      '<button class="btn btn-secondary btn-sm" type="button" data-v="copiar" data-canal="instagram">Copiar para Instagram</button><button class="btn btn-secondary btn-sm" type="button" data-v="copiar" data-canal="link">Copiar link</button><button class="btn btn-secondary btn-sm" type="button" data-v="copiar" data-canal="site">Incorporar no site</button></div>' +
      '<code class="share-url" data-share-url>' + esc(linkUTM(atual, "link", "direto")) + "</code></div>";
    box.hidden = false;
  }
  function copiar(canal) {
    var ph = F.fotografo(atual.fotografo), u = linkUTM(atual, canal, canal === "site" ? "embed" : canal === "link" ? "direto" : "social");
    var txt = canal === "site"
      ? '<a href="' + u + '" target="_blank" rel="noopener">“' + atual.titulo + "”, de " + ph.nome + " · veja no 365 Clicks</a>"
      : canal === "instagram" ? "“" + atual.titulo + "”, de @" + ph.id + ". Veja a foto no 365 Clicks: " + u : u;
    V.querySelector("[data-share-url]").textContent = txt;
    var ok = function () { C.toast(canal === "site" ? "Código para o site copiado" : canal === "instagram" ? "Texto copiado: cole na legenda ou nos stories" : "Link copiado"); };
    try { navigator.clipboard.writeText(txt).then(ok, selecionar); } catch (e) { selecionar(); }
    registrarShare(canal);
  }
  function selecionar() { var el = V.querySelector("[data-share-url]"), r = document.createRange(); r.selectNodeContents(el); var sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); C.toast("Link selecionado. Copie com Ctrl+C"); }
  function registrarShare(canal) {
    Track.registrar("share", atual);
    try { var l = JSON.parse(localStorage.getItem("c365-shares") || "[]"); l.push({ foto: atual.id, fotografo: atual.fotografo, canal: canal, por: EU, em: Date.now() }); localStorage.setItem("c365-shares", JSON.stringify(l.slice(-1000))); } catch (e) {}
  }
  document.addEventListener("click", function (e) { var a = e.target.closest("a[data-canal]"); if (a && V && V.contains(a)) { registrarShare(a.getAttribute("data-canal")); C.toast("Compartilhamento registrado · " + a.textContent); } });

  function mostrarInfo() {
    V.querySelector('[data-panel="info"]').hidden = false;
    V.querySelector('[data-panel="contato"]').hidden = true;
  }

  function mostrarContato() {
    var ph = F.fotografo(atual.fotografo), t = T && T.contato;
    var ctx = { FOTOGRAFO: ph.nome, FOTO: atual.titulo };
    var termo = t ? t.secoes.map(function (s) { return "<h4>" + s[0] + "</h4><p>" + s[1].replace(/\{(\w+)\}/g, function (_, k) { return esc(ctx[k] || ""); }) + "</p>"; }).join("") : "";
    var p = V.querySelector('[data-panel="contato"]');
    p.innerHTML =
      '<button class="btn btn-ghost btn-sm" type="button" data-v="voltar" style="margin-left:-12px">← Voltar para a foto</button>' +
      '<h2 class="viewer-title">Falar com ' + esc(ph.nome) + "</h2>" +
      '<p class="small">Sobre a foto “' + esc(atual.titulo) + "”. " + esc(ph.nome.split(" ")[0]) + " recebe seu contato e responde por WhatsApp ou e-mail.</p>" +
      '<form class="stack" data-contato novalidate style="gap:14px">' +
        '<div class="field"><label class="label" for="ct-nome">Seu nome<span class="req">*</span></label><input class="input" id="ct-nome" autocomplete="name" required></div>' +
        '<div class="field"><label class="label" for="ct-tel">Telefone / WhatsApp<span class="req">*</span></label><input class="input" id="ct-tel" type="tel" inputmode="numeric" autocomplete="tel" placeholder="(11) 98765-4321" required></div>' +
        '<div class="field"><label class="label" for="ct-email">E-mail</label><input class="input" id="ct-email" type="email" autocomplete="email"></div>' +
        '<div class="field"><label class="label" for="ct-int">Interesse</label><select class="select" id="ct-int"><option>Comprar esta foto</option><option>Licenciar para uso comercial</option><option>Contratar um trabalho</option><option>Outro assunto</option></select></div>' +
        '<div class="field"><label class="label" for="ct-msg">Mensagem</label><textarea class="textarea" id="ct-msg" placeholder="Conte como pretende usar a foto: onde, por quanto tempo e em que tamanho."></textarea></div>' +
        (t ? '<details class="doc"><summary><span class="grow">' + t.titulo + '</span><span class="badge plain mono">v' + t.versao + "</span>" + I("chevron") + '</summary><div class="doc-body">' + termo + "</div></details>" : "") +
        '<label class="accept"><input type="checkbox" id="ct-termo" required><span>Li e aceito o <strong>Termo de Contato e Direitos Autorais</strong>. Sei que o 365 Clicks registra este contato e não interfere na negociação.</span></label>' +
        '<button class="btn btn-primary btn-block btn-lg" type="submit">Enviar para ' + esc(ph.nome.split(" ")[0]) + "</button>" +
      "</form>";
    V.querySelector('[data-panel="info"]').hidden = true;
    p.hidden = false;
    p.querySelector("#ct-nome").focus();
  }

  function mascaraTel(v) {
    v = v.replace(/\D/g, "").slice(0, 11);
    if (v.length <= 2) return v.length ? "(" + v : v;
    var r = v.slice(2);
    return "(" + v.slice(0, 2) + ") " + (r.length > 8 ? r.slice(0, 5) + "-" + r.slice(5) : r.length > 4 ? r.slice(0, 4) + "-" + r.slice(4) : r);
  }
  document.addEventListener("input", function (e) { if (e.target.id === "ct-tel") e.target.value = mascaraTel(e.target.value); });

  async function enviarContato(e) {
    if (!e.target.matches("[data-contato]")) return;
    e.preventDefault();
    var f = e.target, bad = [];
    f.querySelectorAll("[aria-invalid]").forEach(function (x) { x.removeAttribute("aria-invalid"); });
    var nome = f.querySelector("#ct-nome"), tel = f.querySelector("#ct-tel"), email = f.querySelector("#ct-email"), termo = f.querySelector("#ct-termo");
    if (!nome.value.trim()) bad.push(nome);
    if (tel.value.replace(/\D/g, "").length < 10) bad.push(tel);
    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) bad.push(email);
    if (!termo.checked) { termo.closest(".accept").setAttribute("aria-invalid", "true"); bad.push(termo); }
    bad.forEach(function (x) { if (x !== termo) x.setAttribute("aria-invalid", "true"); });
    if (bad.length) { bad[0].focus(); C.toast(bad[0] === termo ? "Aceite o termo para enviar" : "Confira os campos destacados"); return; }
    var ph = F.fotografo(atual.fotografo), btn = f.querySelector('[type="submit"]');
    btn.disabled = true;
    var dados = {
      nome: nome.value.trim(), telefone: tel.value, email: email.value.trim(),
      interesse: f.querySelector("#ct-int").value, mensagem: f.querySelector("#ct-msg").value.trim().slice(0, 1000),
      foto: atual.id, fotoTitulo: atual.titulo, fotografo: ph.id, fotografoNome: ph.nome,
      termo: "contato v" + (T && T.contato ? T.contato.versao : "1.0"), em: Date.now(), dia: hoje()
    };
    await Track.lead(dados);
    Track.registrar("lead", atual);
    btn.disabled = false;
    V.querySelector('[data-panel="contato"]').innerHTML =
      '<div class="notice success" style="margin-top:8px">' + I("check") + "<span>Mensagem enviada para <strong>" + esc(ph.nome) + "</strong>. Você recebe a resposta no WhatsApp " + esc(dados.telefone) + ".</span></div>" +
      '<p class="small" style="margin-top:16px">Registro do contato: ' + agora() + " · Termo de Contato e Direitos Autorais v" + (T && T.contato ? T.contato.versao : "1.0") + ".</p>" +
      '<button class="btn btn-secondary" type="button" data-v="voltar">Voltar para a foto</button>';
    C.toast("Contato enviado para " + ph.nome);
  }

  function passo(d) {
    var i = contexto.indexOf(atual);
    if (i < 0) return;
    abrir(contexto[(i + d + contexto.length) % contexto.length], contexto);
  }

  function fechar() {
    V.hidden = true;
    document.body.classList.remove("viewer-open");
    if (retorno && retorno.focus) retorno.focus();
  }

  document.addEventListener("keydown", function (e) {
    if (!V || V.hidden) return;
    if (e.key === "Escape") { e.stopPropagation(); if (!V.querySelector('[data-panel="contato"]').hidden) mostrarInfo(); else fechar(); }
    if (e.target.closest && e.target.closest("input, textarea, select")) return;
    if (e.key === "ArrowRight") passo(1);
    if (e.key === "ArrowLeft") passo(-1);
  }, true);

  /* Clique em qualquer card de foto abre o visualizador */
  document.addEventListener("click", function (e) {
    var hit = e.target.closest(".card-hit, [data-open-photo]");
    if (!hit) return;
    var card = hit.closest("[data-photo]") || hit;
    var id = card.getAttribute("data-photo") || hit.getAttribute("data-open-photo");
    var grid = card.closest(".grid, [data-feed]");
    var lista = grid ? Array.prototype.map.call(grid.querySelectorAll("[data-photo]"), function (c) { return F.foto(c.getAttribute("data-photo")); }) : null;
    var unicos = lista ? lista.filter(function (f, i) { return f && lista.indexOf(f) === i; }) : null;
    abrir(F.foto(id), unicos, hit);
  });

  C.viewer = { abrir: abrir, hidratar: hidratar };
  C.track = Track;
})();
