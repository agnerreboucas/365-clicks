/* 365 Clicks — calendário de desafios
   Regras:
   - Um desafio por dia, de 00:00:00 a 23:59:59 (horário de Brasília).
   - A semana começa no domingo: domingo é o dia 1 da semana, sábado o dia 7.
   - Cada desafio tem 4 características; a foto precisa cumprir pelo menos 2.
   - Só vale foto TIRADA dentro das 24 horas do desafio.
   - Os desafios da semana atual e da próxima ficam agendados com antecedência.
   Na versão funcional, o calendário vem do Admin → Desafios. */
(function () {
  "use strict";

  var MINIMO = 2;
  var PONTOS = { porCaracteristica: 2, noDia: 2 }; /* 4 × 2 + 2 = 10 pontos no máximo */

  /* Banco de desafios: tema, técnica e 4 características */
  var BANCO = [
    ["Água", "Reflexos", ["Um reflexo visível na água", "Água em movimento, gotas ou chuva", "Composição pelos terços", "Luz natural"]],
    ["Sombras", "Contraluz", ["Sombra como elemento principal", "Fonte de luz atrás do assunto", "Silhueta ou recorte", "Alto contraste"]],
    ["Janelas", "Enquadramento", ["Moldura natural dentro da foto", "Janela, porta ou vão", "Interior e exterior na mesma cena", "Linhas retas alinhadas"]],
    ["Movimento", "Velocidade baixa", ["Rastro de movimento", "Velocidade de 1/30s ou mais lenta", "Parte da cena nítida", "Pessoa, veículo ou água em movimento"]],
    ["Cores", "Complementares", ["Duas cores complementares", "Uma cor dominante", "Fundo simples", "Cor como assunto principal"]],
    ["Retrato", "Luz natural", ["Pessoa como assunto", "Luz de janela ou céu aberto", "Olhos nítidos", "Fundo desfocado"]],
    ["Geometria", "Linhas", ["Linhas que guiam o olhar", "Forma geométrica clara", "Simetria ou repetição", "Ponto de vista incomum"]],
    ["Texturas", "Macro", ["Textura como assunto", "Aproximação máxima", "Luz lateral realçando o relevo", "Sem fundo reconhecível"]],
    ["Rua", "Momento decisivo", ["Pessoas no espaço urbano", "Ação no auge", "Camadas (frente, meio e fundo)", "Sem pose"]],
    ["Noite", "Longa exposição", ["Foto depois do pôr do sol", "Exposição de 1s ou mais", "Luz artificial na cena", "Câmera apoiada ou em tripé"]],
    ["Minimalismo", "Espaço negativo", ["Um único assunto", "Mais de 60% de espaço vazio", "Paleta com até 3 cores", "Horizonte ou linha limpa"]],
    ["Cotidiano", "Detalhe", ["Objeto do dia a dia", "Plano fechado", "História sem mostrar pessoas", "Luz natural"]],
    ["Natureza", "Profundidade", ["Elemento natural em primeiro plano", "Profundidade de campo intencional", "Três planos distintos", "Céu fora do quadro ou mínimo"]],
    ["Preto e branco", "Tons", ["Foto em preto e branco", "Pretos e brancos puros na cena", "Contraste de texturas", "Forma mais importante que a cor"]]
  ];

  function meiaNoite(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0); }
  function diaDoAno(d) { return Math.round((meiaNoite(d) - new Date(d.getFullYear(), 0, 1)) / 864e5) + 1; }
  function domingoDe(d) { var x = meiaNoite(d); x.setDate(x.getDate() - x.getDay()); return x; }
  function semanaDoAno(d) { var ini = domingoDe(new Date(d.getFullYear(), 0, 1)); return Math.floor((domingoDe(d) - ini) / (7 * 864e5)) + 1; }
  var NOMES_DIA = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

  /* ---------- Motor dos 365 desafios (pages/calendario-365.js, gerado da planilha editorial) ----------
     Cada dia tem tema, objetivo, missão, técnica, enquadramento, linguagem, equipamento, combinação criativa,
     3 dicas de inspiração (não são requisitos) e variações para os anos 1, 2 e 3.
     As 4 características do desafio são os 4 elementos da combinação: técnica, enquadramento, linguagem e equipamento.
     O calendário segue o dia/mês de um ano de 365 dias; 29/02 repete o desafio de 28/02. */
  var CAL = window.CALENDARIO_365 || null;
  function diaCalendario(d) {
    var m = d.getMonth(), dd = d.getDate();
    if (m === 1 && dd === 29) dd = 28;
    return Math.round((new Date(2025, m, dd) - new Date(2025, 0, 1)) / 864e5) + 1;
  }
  /* Recursos que ocupam o lugar do equipamento (regras de compatibilidade da curadoria) */
  var RECURSOS = ["Foco e desfoque"];
  function rotuloEquip(valor) { return RECURSOS.indexOf(valor) > -1 ? "Recurso" : "Equipamento"; }
  function caracteristica(rotulo, valor) {
    if (valor === "Livre") return rotulo + " livre (sua escolha)";
    if (valor === "Close ou plano detalhe") return rotulo + ": close (pessoas) ou plano detalhe (objetos)";
    return rotulo + ": " + valor;
  }
  function doCalendario(n) {
    var r = CAL.dias[n - 1], tema = r[0], tl = tema.toLowerCase();
    var tec = CAL.tecnicas[r[3]], enq = CAL.enquadramentos[r[4]], ling = CAL.linguagens[r[5]], eq = CAL.equipamentos[r[6]];
    return {
      tema: tema, ciclo: CAL.ciclos[r[1]], objetivo: CAL.objetivos[r[2]],
      missao: "Crie uma fotografia a partir do tema '" + tema + "', buscando uma interpretação autoral.",
      tecnica: tec, enquadramento: enq, linguagem: ling, equipamento: eq,
      combinacao: [tema, tec, enq, ling, eq].join(" + "),
      caracteristicas: [caracteristica("Técnica", tec), caracteristica("Enquadramento", enq), caracteristica("Linguagem", ling), caracteristica(rotuloEquip(eq), eq)],
      dicas: ["Observe onde '" + tl + "' aparece de maneira inesperada.", "Mude distância, altura ou ponto de vista antes de apertar o disparador.", "Procure uma relação entre o tema e algo que normalmente passaria despercebido."],
      anos: ["Explore " + tl + " com foco em observação e técnica.", "Interprete " + tl + " de uma maneira diferente da proposta do primeiro ano.", "Transforme " + tl + " em uma narrativa ou conceito autoral."],
      artigo: "Como fotografar '" + tl + "'",
      referencias: "Fotógrafo + livro + filme/exposição relacionados a '" + tl + "'"
    };
  }

  /* Desafio de um dia do calendário */
  function doDia(data) {
    var inicio = meiaNoite(data), fim = new Date(inicio.getTime() + 864e5 - 1000);
    var n = CAL ? diaCalendario(inicio) : diaDoAno(inicio);
    var base = { id: inicio.getFullYear() + "-" + String(inicio.getMonth() + 1).padStart(2, "0") + "-" + String(inicio.getDate()).padStart(2, "0"),
      dia: n, semana: semanaDoAno(inicio), diaSemana: inicio.getDay() + 1, nomeDia: NOMES_DIA[inicio.getDay()], inicio: inicio, fim: fim };
    if (CAL) return Object.assign(base, doCalendario(n));
    var b = BANCO[(n - 1) % BANCO.length];
    return Object.assign(base, { tema: b[0], tecnica: b[1], caracteristicas: b[2].slice(), dicas: [], anos: [] });
  }
  /* Todos os dias que usam um elemento (para a Biblioteca de Conhecimento) */
  function comElemento(campo, valor) {
    if (!CAL) return [];
    var lista = { tecnica: CAL.tecnicas, enquadramento: CAL.enquadramentos, linguagem: CAL.linguagens, equipamento: CAL.equipamentos }[campo];
    var col = { tecnica: 3, enquadramento: 4, linguagem: 5, equipamento: 6 }[campo], k = lista.indexOf(valor), out = [];
    CAL.dias.forEach(function (r, i) { if (r[col] === k) out.push(Object.assign({ dia: i + 1, data: new Date(2025, 0, i + 1) }, doCalendario(i + 1))); });
    return out;
  }
  /* Desafio em que um instante cai */
  function noInstante(d) { return doDia(new Date(d)); }
  function status(ds, agora) {
    agora = agora || new Date();
    return agora < ds.inicio ? "agendado" : agora > ds.fim ? "encerrado" : "aberto";
  }
  /* Semana de domingo a sábado; desloc = 0 (esta semana), 1 (próxima) ... */
  function semana(desloc, ref) {
    var dom = domingoDe(ref || new Date());
    dom.setDate(dom.getDate() + 7 * (desloc || 0));
    var out = [];
    for (var i = 0; i < 7; i++) { var d = new Date(dom); d.setDate(dom.getDate() + i); out.push(doDia(d)); }
    return out;
  }
  function pontos(qtdCaracteristicas, noDia) {
    if (qtdCaracteristicas < MINIMO) return 0;
    return qtdCaracteristicas * PONTOS.porCaracteristica + (noDia ? PONTOS.noDia : 0);
  }
  function fmt(d) { return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }) + " " + d.toLocaleTimeString("pt-BR"); }
  function dataCurta(d) { return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }); }

  /* Preenche elementos marcados com data-desafio="dia|tema|tecnica|caracteristicas|nomeDia|diaSemana|prazo|contagem" */
  function preencher() {
    var d = doDia(new Date());
    document.querySelectorAll("[data-desafio]").forEach(function (el) {
      var k = el.getAttribute("data-desafio");
      if (k === "caracteristicas" || k === "dicas" || k === "anos") el.innerHTML = (d[k] || []).map(function (c, i) { return "<li>" + (k === "anos" ? "<strong>Ano " + (i + 1) + ":</strong> " : "") + c + "</li>"; }).join("");
      else if (k === "prazo") el.textContent = "23:59:59 de hoje";
      else if (k === "contagem") {
        var tick = function () { var ms = d.fim - new Date() + 1000; if (ms < 0) { location.reload(); return; } el.textContent = "encerra em " + Math.floor(ms / 36e5) + "h" + String(Math.floor(ms % 36e5 / 6e4)).padStart(2, "0"); };
        tick(); setInterval(tick, 30000);
      } else el.textContent = d[k];
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", preencher); else preencher();

  window.Desafios = {
    MINIMO: MINIMO, PONTOS: PONTOS, banco: BANCO, calendario: CAL, comElemento: comElemento, rotuloEquip: rotuloEquip,
    doDia: doDia, noInstante: noInstante, hoje: function () { return doDia(new Date()); },
    semana: semana, status: status, pontos: pontos, fmt: fmt, dataCurta: dataCurta
  };
})();
