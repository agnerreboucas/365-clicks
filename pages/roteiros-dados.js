/* 365 Clicks — Roteiros fotográficos (guias exclusivos)
   Acesso: assinantes dos planos 365 e Clube leem todos; quem está no Free compra cada roteiro avulso (acesso permanente).
   Na versão funcional: tipo de conteúdo `roteiro` + regra de acesso no plugin (assinatura ativa OU compra registrada). */
(function () {
  "use strict";
  var U = "https://images.unsplash.com/";
  var ROTEIROS = {
    "centro-sp-amanhecer": {
      titulo: "Centro de São Paulo ao amanhecer", cidade: "São Paulo, SP", tipo: "Rua e arquitetura", duracao: "3h a pé · 2,8 km", nivel: "Iniciante",
      preco: 19.9, autor: "Ana Lima", autorId: "analima",
      img: U + "photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&h=900&q=80", tone: "#4f4336", tone2: "#c09a6c",
      resumo: "Do Pátio do Colégio ao Viaduto do Chá antes do movimento: luz rasante nas fachadas, ruas vazias e os primeiros trabalhadores da cidade.",
      horario: "Chegue 30 minutos antes do nascer do sol. Termine até as 8h30, quando o comércio abre.",
      paradas: [
        ["Pátio do Colégio", "Nascer do sol", "Fachada branca recebendo a primeira luz lateral; reflexos nas poças depois da limpeza da praça.", "Fique no canto da Rua Boa Vista para usar a torre como diagonal."],
        ["Rua XV de Novembro", "+30 min", "Corredor de prédios antigos com sombras longas; pessoas atravessando a faixa de luz.", "Espere alguém entrar na luz: exposição para as altas luzes, sombras bem pretas."],
        ["Mosteiro de São Bento", "+60 min", "Geometria da escadaria e revoada de pombos no largo.", "Velocidade de 1/1000s para congelar as asas."],
        ["Viaduto Santa Ifigênia", "+90 min", "Estrutura metálica em ferro art nouveau; vista do Vale do Anhangabaú.", "Enquadre pelas grades para criar moldura natural."],
        ["Viaduto do Chá", "+120 min", "Fluxo de pedestres de cima; linhas de fuga do viaduto.", "Longa exposição (1/4s) apoiada no guarda-corpo para borrar a multidão."]
      ],
      levar: ["Lente de 24–35mm", "Bateria extra", "Roupa discreta e mochila fechada"],
      seguranca: "Vá acompanhado, evite exibir o equipamento entre uma parada e outra e guarde a câmera na mochila no trecho da Rua Líbero Badaró.",
      elementos: ["Luz lateral", "Linhas de fuga", "Moldura natural", "Longa exposição"]
    },
    "ibirapuera-luz": {
      titulo: "Ibirapuera: luz, água e pessoas", cidade: "São Paulo, SP", tipo: "Parque e natureza", duracao: "2h30 · 3,5 km", nivel: "Iniciante",
      preco: 14.9, autor: "Júlia Santos", autorId: "juliasantos",
      img: U + "photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&h=900&q=80", tone: "#2c464e", tone2: "#a3bab2",
      resumo: "Um percurso de fim de tarde pelo lago, a marquise e o obelisco, com reflexos, silhuetas e retratos espontâneos.",
      horario: "Comece 2 horas antes do pôr do sol e termine na hora azul, no lago.",
      paradas: [
        ["Marquise", "Início", "Curvas de concreto, skatistas e sombras duras.", "Use a marquise como teto: céu estourado some e o foco fica nas pessoas."],
        ["Lago e ponte de ferro", "+40 min", "Reflexos das árvores e dos prédios.", "Abaixe a câmera quase na água para dobrar o reflexo."],
        ["Obelisco", "Pôr do sol", "Silhuetas contra o céu alaranjado.", "Meça a luz no céu e deixe as pessoas virarem silhueta."],
        ["Fonte do lago", "Hora azul", "Água iluminada e céu azul profundo.", "Tripé e 2 a 4 segundos para a água virar véu."]
      ],
      levar: ["Tele 70–200mm para retratos à distância", "Tripé leve", "Filtro polarizador"],
      seguranca: "O parque fecha às 22h. Evite as áreas escuras perto do portão 10 depois do pôr do sol.",
      elementos: ["Reflexo", "Silhueta", "Hora azul", "Retrato espontâneo"]
    },
    "santa-teresa-rio": {
      titulo: "Santa Teresa e Lapa, Rio", cidade: "Rio de Janeiro, RJ", tipo: "Rua e cores", duracao: "4h · 3 km (ladeiras)", nivel: "Intermediário",
      preco: 24.9, autor: "Marina Faria", autorId: "marinafaria",
      img: U + "photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1600&h=900&q=80", tone: "#37433a", tone2: "#8b9a84",
      resumo: "Do bonde às escadarias: casarões coloridos, janelas, texturas e o movimento da Lapa no fim da tarde.",
      horario: "Das 14h ao pôr do sol. A luz entra entre os casarões depois das 15h.",
      paradas: [
        ["Largo do Guimarães", "Início", "Bonde amarelo, fachadas e moradores.", "Panning no bonde a 1/30s."],
        ["Parque das Ruínas", "+60 min", "Vista da baía e texturas de tijolo.", "Enquadre a cidade pelas janelas sem vidro."],
        ["Escadaria Selarón", "+2h", "Cor e padrão dos azulejos.", "Chegue cedo à escadaria ou use a multidão como padrão."],
        ["Arcos da Lapa", "Pôr do sol", "Arquitetura e silhuetas de quem passa.", "Contraluz com os arcos como moldura."]
      ],
      levar: ["Lente zoom 24–70mm", "Tênis confortável (ladeiras)", "Água"],
      seguranca: "Prefira ir em grupo; os encontros do Clube fazem este roteiro uma vez por trimestre.",
      elementos: ["Panning", "Cor", "Padrão e repetição", "Contraluz"]
    },
    "noite-paulista": {
      titulo: "Paulista à noite", cidade: "São Paulo, SP", tipo: "Cidade à noite", duracao: "2h · 2,5 km", nivel: "Intermediário",
      preco: 19.9, autor: "Pedro Costa", autorId: "pedrocosta",
      img: U + "photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&h=900&q=80", tone: "#18233a", tone2: "#4b5f88",
      resumo: "Rastros de luz dos carros, reflexos nas fachadas espelhadas e as luzes do MASP: o roteiro para praticar longa exposição.",
      horario: "Comece na hora azul (cerca de 20 minutos depois do pôr do sol) e siga até as 21h.",
      paradas: [
        ["MASP (vão livre)", "Hora azul", "Estrutura vermelha contra o céu azul.", "Bracketing de 3 exposições para segurar o céu."],
        ["Passarela da Consolação", "+30 min", "Rastros de luz da avenida.", "Tripé, f/11, 15 a 20 segundos."],
        ["Fachadas espelhadas", "+60 min", "Reflexos e composição abstrata.", "Aproxime-se e deixe o reflexo ocupar o quadro."],
        ["Parque Trianon", "+90 min", "Contraste entre a mata escura e a cidade acesa.", "ISO alto (3200) na mão, sem tripé, para retratos com bokeh."]
      ],
      levar: ["Tripé", "Disparador ou temporizador de 2 s", "Lanterna pequena"],
      seguranca: "Fique nas calçadas movimentadas e não deixe o tripé montado sem ninguém por perto.",
      elementos: ["Longa exposição", "Rastros de luz", "Reflexo", "Bokeh"]
    }
  };
  function brl(v) { return "R$ " + v.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
  function ler(k, d) { try { return JSON.parse(localStorage.getItem(k) || "null") || d; } catch (e) { return d; } }
  /* "Ver como" do protótipo: permite simular um visitante do plano Free sem mexer na assinatura salva */
  function modo() { try { return sessionStorage.getItem("c365-ver-como") || ""; } catch (e) { return ""; } }
  function assinante() {
    if (modo() === "free") return false;
    var a = window.Planos ? Planos.atual() : { plano: "365", status: "ativa" };
    return (a.plano === "365" || a.plano === "clube") && a.status !== "cancelada";
  }
  function comprados() { return ler("c365-roteiros-comprados", []); }
  function acesso(id) { return assinante() ? "assinatura" : comprados().indexOf(id) > -1 ? "compra" : ""; }
  function comprar(id) {
    var r = ROTEIROS[id]; if (!r) return;
    var c = comprados(); if (c.indexOf(id) < 0) c.push(id);
    try { localStorage.setItem("c365-roteiros-comprados", JSON.stringify(c)); } catch (e) {}
    var ped = ler("c365-pedidos", []);
    ped.unshift({ codigo: "RT-" + String(Date.now()).slice(-6), itens: [{ nome: "Roteiro: " + r.titulo, q: 1, preco: r.preco }], total: r.preco, em: Date.now(), status: "pago", acao: ["Abrir roteiro", "roteiro.html#" + id] });
    try { localStorage.setItem("c365-pedidos", JSON.stringify(ped.slice(0, 30))); } catch (e) {}
  }
  window.Roteiros = { lista: ROTEIROS, brl: brl, assinante: assinante, acesso: acesso, comprados: comprados, comprar: comprar, modo: modo };
})();
