/* 365 Clicks — compressor e padronização de imagens no envio
   1. A foto original (até 25 MB) é guardada em arquivo privado, só para o autor e para licenciamento.
   2. Ela é cortada num dos três formatos padrão e convertida para WebP em quatro versões.
   3. O site carrega só a versão do tamanho certo (srcset): 45–500 KB em vez de megabytes.
   Aqui a conversão roda no navegador para a demonstração; na versão funcional ela roda no servidor
   (ex.: libvips/sharp), que também gera AVIF e remove o GPS das versões públicas. */
(function () {
  "use strict";
  var LIMITE = 2 * 1024 * 1024;          /* teto da maior versão pública */
  var LIMITE_ORIGINAL = 25 * 1024 * 1024; /* teto do arquivo enviado */

  var FORMATOS = {
    horizontal: { nome: "Horizontal", ratio: "3/2", w: 2048, h: 1365 },
    vertical: { nome: "Vertical", ratio: "4/5", w: 1638, h: 2048 },
    quadrada: { nome: "Quadrada", ratio: "1/1", w: 2048, h: 2048 }
  };
  /* Versões geradas: lado maior em px e qualidade WebP */
  var VERSOES = [
    { id: "alta", nome: "Alta (zoom e licenciamento)", lado: 2048, q: 0.82 },
    { id: "tela", nome: "Visualizador", lado: 1600, q: 0.8 },
    { id: "grade", nome: "Galeria e feed", lado: 800, q: 0.78 },
    { id: "mini", nome: "Miniatura", lado: 400, q: 0.75 }
  ];
  var MIN_LADO = 1080;

  function sugerir(w, h) { var r = w / h; return r > 1.15 ? "horizontal" : r < 0.87 ? "vertical" : "quadrada"; }
  function mb(bytes) { return bytes >= 1048576 ? (bytes / 1048576).toFixed(1).replace(".", ",") + " MB" : Math.max(1, Math.round(bytes / 1024)) + " KB"; }

  function carregarImagem(src) {
    return new Promise(function (ok, erro) {
      var img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = function () { ok(img); };
      img.onerror = erro;
      img.src = src;
    });
  }
  function codificar(canvas, q) {
    return new Promise(function (ok) { canvas.toBlob(ok, "image/webp", q); }).then(function (b) {
      /* Navegadores sem codificador WebP devolvem PNG: usa JPEG no lugar */
      if (b && b.type === "image/webp") return b;
      return new Promise(function (ok) { canvas.toBlob(ok, "image/jpeg", q + 0.05); });
    });
  }

  /* Corta no formato, gera as versões e garante que a maior fique abaixo de 2 MB */
  async function processar(src, formato) {
    var f = FORMATOS[formato], img = await carregarImagem(src);
    var alvoR = f.w / f.h, sw = img.naturalWidth, sh = img.naturalHeight, sx = 0, sy = 0;
    if (sw / sh > alvoR) { var nw = sh * alvoR; sx = (sw - nw) / 2; sw = nw; } else { var nh = sw / alvoR; sy = (sh - nh) / 2; sh = nh; }
    var versoes = [];
    for (var i = 0; i < VERSOES.length; i++) {
      var v = VERSOES[i], escala = Math.min(1, v.lado / Math.max(sw, sh));
      var w = Math.round(sw * escala), h = Math.round(sh * escala);
      var c = document.createElement("canvas");
      c.width = w; c.height = h;
      var ctx = c.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
      var q = v.q, blob = await codificar(c, q);
      if (!blob) throw new Error("codificar");
      while (i === 0 && blob.size > LIMITE && q > 0.5) { q -= 0.07; blob = await codificar(c, q); }
      versoes.push({ id: v.id, nome: v.nome, w: w, h: h, bytes: blob.size, tipo: blob.type === "image/webp" ? "WebP" : "JPEG", url: URL.createObjectURL(blob) });
    }
    var alta = versoes[0];
    return { versoes: versoes, url: alta.url, w: alta.w, h: alta.h, bytes: alta.bytes, tipo: alta.tipo, pequena: Math.min(alta.w, alta.h) < MIN_LADO };
  }

  /* Estimativa usada quando a imagem não pode ser processada aqui (ex.: foto de exemplo de outro site) */
  function estimar(formato) {
    var f = FORMATOS[formato], kb = { alta: 620, tela: 410, grade: 135, mini: 42 };
    return {
      estimado: true, w: f.w, h: f.h, bytes: kb.alta * 1024, tipo: "WebP", pequena: false,
      versoes: VERSOES.map(function (v) { var e = v.lado / Math.max(f.w, f.h); return { id: v.id, nome: v.nome, w: Math.round(f.w * e), h: Math.round(f.h * e), bytes: kb[v.id] * 1024, tipo: "WebP" }; })
    };
  }

  window.C365 = window.C365 || {};
  window.C365.upload = { FORMATOS: FORMATOS, VERSOES: VERSOES, LIMITE: LIMITE, LIMITE_ORIGINAL: LIMITE_ORIGINAL, MIN_LADO: MIN_LADO, sugerir: sugerir, processar: processar, estimar: estimar, mb: mb, carregarImagem: carregarImagem };
})();
