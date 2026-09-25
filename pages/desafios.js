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

  /* Desafio de um dia do calendário */
  function doDia(data) {
    var inicio = meiaNoite(data), fim = new Date(inicio.getTime() + 864e5 - 1000);
    var n = diaDoAno(inicio), b = BANCO[(n - 1) % BANCO.length];
    return {
      id: inicio.getFullYear() + "-" + String(inicio.getMonth() + 1).padStart(2, "0") + "-" + String(inicio.getDate()).padStart(2, "0"),
      dia: n, semana: semanaDoAno(inicio), diaSemana: inicio.getDay() + 1, nomeDia: NOMES_DIA[inicio.getDay()],
      tema: b[0], tecnica: b[1], caracteristicas: b[2].slice(),
      inicio: inicio, fim: fim
    };
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
      if (k === "caracteristicas") el.innerHTML = d.caracteristicas.map(function (c) { return "<li>" + c + "</li>"; }).join("");
      else if (k === "prazo") el.textContent = "23:59:59 de hoje";
      else if (k === "contagem") {
        var tick = function () { var ms = d.fim - new Date() + 1000; if (ms < 0) { location.reload(); return; } el.textContent = "encerra em " + Math.floor(ms / 36e5) + "h" + String(Math.floor(ms % 36e5 / 6e4)).padStart(2, "0"); };
        tick(); setInterval(tick, 30000);
      } else el.textContent = d[k];
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", preencher); else preencher();

  window.Desafios = {
    MINIMO: MINIMO, PONTOS: PONTOS, banco: BANCO,
    doDia: doDia, noInstante: noInstante, hoje: function () { return doDia(new Date()); },
    semana: semana, status: status, pontos: pontos, fmt: fmt, dataCurta: dataCurta
  };
})();
