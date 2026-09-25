/* 365 Clicks — eventos e cursos com inscrição
   Fonte única para: vitrine de eventos e cursos, página da oferta, fluxo de inscrição,
   termos e contratos, meus ingressos e painel de inscritos.
   Na versão funcional estes dados vêm do banco; aqui são exemplos fixos. */
(function () {
  "use strict";

  var U = "https://images.unsplash.com/";

  var OFERTAS = {
    "foto-na-paulista": {
      sigla: "FNP",
      tipo: "evento",
      titulo: "Foto na Paulista",
      subtitulo: "Workshop de fotografia de rua",
      resumo: "Quatro horas de prática guiada pela Avenida Paulista, do nascer do sol ao movimento da manhã, com revisão das fotos ao final.",
      categoria: "Workshop presencial",
      dia: { d: "18", m: "out", w: "sáb" },
      data: "Sábado, 18 de outubro de 2026",
      dataCurta: "18/10/2026",
      horario: "07:00 às 11:00",
      local: "Em frente ao MASP",
      endereco: "Av. Paulista, 1578 — Bela Vista, São Paulo, SP",
      mapa: "https://www.google.com/maps/search/?api=1&query=MASP+Avenida+Paulista+1578",
      vagas: 30,
      restantes: 9,
      img: U + "photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&h=900&q=80",
      tone: "#4f4336", tone2: "#c09a6c",
      organizador: "365 Clicks · Ana Lima (instrutora)",
      ingressos: [
        { id: "workshop", nome: "Workshop", preco: 180, desc: "Prática guiada + revisão das fotos em grupo" },
        { id: "workshop-kit", nome: "Workshop + kit", preco: 240, desc: "Inclui camiseta 365 Clicks e cartão SD de 64 GB" }
      ],
      parcelas: 3,
      descontoClube: 0.2,
      programacao: [
        ["07:00", "Encontro e café", "Apresentação da turma e ajuste das câmeras"],
        ["07:30", "Luz da manhã", "Sombras longas, contraluz e silhuetas"],
        ["08:45", "Pessoas e movimento", "Velocidade do obturador e antecipação"],
        ["10:00", "Revisão em grupo", "Cada pessoa apresenta 3 fotos"],
        ["10:45", "Desafio do dia", "Envio das fotos para o 365 Challenge"]
      ],
      inclui: ["Certificado digital de participação", "Revisão das fotos pela instrutora", "Fotos publicadas no perfil do 365 Clicks (com crédito)"],
      requisitos: ["Qualquer câmera, inclusive celular", "Idade mínima de 16 anos (menores com autorização do responsável)", "Roupa e calçado confortáveis"],
      termos: ["imagem", "contrato", "participacao", "privacidade"]
    },
    "foto-no-parque": {
      sigla: "FPQ",
      tipo: "evento",
      titulo: "Foto no Parque",
      subtitulo: "Encontro gratuito da comunidade",
      resumo: "Caminhada fotográfica aberta pelo Ibirapuera. Traga sua câmera ou celular, conheça outros fotógrafos e cumpra o desafio do dia em grupo.",
      categoria: "Encontro gratuito",
      dia: { d: "26", m: "out", w: "dom" },
      data: "Domingo, 26 de outubro de 2026",
      dataCurta: "26/10/2026",
      horario: "09:00 às 11:30",
      local: "Parque Ibirapuera — Portão 3",
      endereco: "Av. Pedro Álvares Cabral, s/n — Vila Mariana, São Paulo, SP",
      mapa: "https://www.google.com/maps/search/?api=1&query=Parque+Ibirapuera+Portao+3",
      vagas: 60,
      restantes: 23,
      img: U + "photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&h=900&q=80",
      tone: "#304131", tone2: "#a2b298",
      organizador: "365 Clicks · Comunidade SP",
      ingressos: [
        { id: "gratuito", nome: "Inscrição gratuita", preco: 0, desc: "Vaga garantida até 09:15. Depois disso, a vaga pode ser liberada." }
      ],
      programacao: [
        ["09:00", "Encontro no Portão 3", "Boas-vindas e tema do dia"],
        ["09:20", "Caminhada fotográfica", "Três paradas com propostas diferentes"],
        ["11:00", "Roda de conversa", "Troca de fotos e dicas"]
      ],
      inclui: ["Participação no desafio do dia em grupo", "Fotos do encontro publicadas na comunidade"],
      requisitos: ["Qualquer câmera, inclusive celular", "Menores de 18 anos com autorização do responsável"],
      termos: ["imagem", "participacao", "privacidade"]
    },
    "curso-fotografia-de-rua": {
      sigla: "CFR",
      tipo: "curso",
      titulo: "Fotografia de Rua — do olhar à narrativa",
      subtitulo: "Curso online com 2 saídas presenciais",
      resumo: "Oito semanas para sair do clique solto e construir uma série autoral de fotografia de rua, com aulas gravadas, exercícios semanais e duas saídas em grupo.",
      categoria: "Curso · Online + presencial",
      dia: { d: "03", m: "nov", w: "seg" },
      data: "Início em 3 de novembro de 2026 · 8 semanas",
      dataCurta: "03/11/2026",
      horario: "Aulas ao vivo às segundas, 20:00",
      local: "Online + saídas no Centro de São Paulo",
      endereco: "Saídas presenciais: Praça da Sé e Rua 25 de Março",
      vagas: 40,
      restantes: 14,
      img: U + "photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&h=900&q=80",
      tone: "#26231f", tone2: "#6d6054",
      organizador: "365 Clicks · Educação",
      ingressos: [
        { id: "completo", nome: "Curso completo", preco: 297, desc: "8 módulos, 2 saídas presenciais, revisão de portfólio" },
        { id: "online", nome: "Somente online", preco: 197, desc: "8 módulos gravados + aulas ao vivo, sem as saídas" }
      ],
      parcelas: 6,
      descontoClube: 0.2,
      programacao: [
        ["Sem. 1", "O olhar", "Ver antes de fotografar"],
        ["Sem. 2", "Luz na cidade", "Horários, sombra e contraste"],
        ["Sem. 3", "Pessoas", "Aproximação, ética e consentimento"],
        ["Sem. 4", "Saída 1", "Praça da Sé (presencial)"],
        ["Sem. 5", "Composição", "Camadas, geometria e espera"],
        ["Sem. 6", "Série", "Tema, sequência e edição"],
        ["Sem. 7", "Saída 2", "Rua 25 de Março (presencial)"],
        ["Sem. 8", "Portfólio", "Revisão individual da série"]
      ],
      inclui: ["Certificado de conclusão", "Acesso às aulas por 12 meses", "Revisão individual do portfólio"],
      requisitos: ["Qualquer câmera, inclusive celular", "Conhecer o básico de exposição (recomendado)"],
      termos: ["imagem", "contrato", "participacao", "privacidade"]
    },
    "curso-celular": {
      sigla: "CCE",
      tipo: "curso",
      titulo: "Fotografia com celular: primeiros passos",
      subtitulo: "Curso online gratuito",
      resumo: "Cinco aulas curtas para tirar fotos melhores com o celular que você já tem: foco, exposição, composição e edição rápida.",
      categoria: "Curso gratuito · Online",
      dia: { d: "—", m: "já", w: "online" },
      data: "Acesso imediato · no seu ritmo",
      dataCurta: "Acesso imediato",
      horario: "5 aulas · 1h40 no total",
      local: "Online",
      endereco: "Plataforma 365 Clicks",
      vagas: null,
      restantes: null,
      img: U + "photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1600&h=900&q=80",
      tone: "#35402f", tone2: "#7f8c6c",
      organizador: "365 Clicks · Educação",
      ingressos: [
        { id: "gratuito", nome: "Inscrição gratuita", preco: 0, desc: "Acesso a todas as aulas e exercícios" }
      ],
      programacao: [
        ["Aula 1", "Limpe a lente e conheça a câmera", "12 min"],
        ["Aula 2", "Foco e exposição com um toque", "18 min"],
        ["Aula 3", "Composição: regra dos terços e além", "25 min"],
        ["Aula 4", "Luz natural em casa e na rua", "22 min"],
        ["Aula 5", "Edição rápida no próprio celular", "23 min"]
      ],
      inclui: ["Certificado de conclusão", "Exercícios com correção da comunidade"],
      requisitos: ["Um celular com câmera"],
      termos: ["participacao", "privacidade"]
    }
  };

  /* ---------- Documentos legais ----------
     Modelos para validação jurídica antes do uso real. {EVENTO}, {DATA}, {LOCAL}, {VALOR}
     e os dados do participante são preenchidos no momento da inscrição. */
  var TERMOS = {
    imagem: {
      titulo: "Termo de Autorização de Uso de Imagem e Voz",
      curto: "Termo de uso de imagem",
      versao: "1.0",
      secoes: [
        ["1. Autorização", "Eu, {NOME}, autorizo o 365 Clicks, a título gratuito, a captar e utilizar minha imagem e minha voz registradas em fotografias e vídeos durante {EVENTO}, em {DATA}, conforme o art. 20 do Código Civil e a Lei 9.610/98."],
        ["2. Finalidade e meios", "As imagens poderão ser usadas para divulgação institucional do 365 Clicks e de suas atividades, no site, no aplicativo, em redes sociais, em materiais impressos e em apresentações, sem finalidade de venda da imagem isolada."],
        ["3. Prazo e território", "A autorização vale por prazo indeterminado e em todo o território nacional e internacional, enquanto o conteúdo estiver em circulação."],
        ["4. Autoria das suas fotografias", "As fotografias que você fizer durante a atividade continuam sendo de sua autoria. O 365 Clicks só as republica quando você as publica na plataforma, sempre com o seu crédito."],
        ["5. Revogação", "Você pode revogar esta autorização a qualquer momento para usos futuros, pelo e-mail privacidade@365clicks.com.br. Materiais já impressos ou publicados antes do pedido não precisam ser recolhidos."],
        ["6. Menores de idade", "Para participantes com menos de 18 anos, esta autorização é concedida pelo responsável legal indicado na inscrição."]
      ]
    },
    contrato: {
      titulo: "Contrato de Prestação de Serviços",
      curto: "Contrato de contratação",
      versao: "1.0",
      secoes: [
        ["1. Partes", "CONTRATADA: 365 Clicks [razão social e CNPJ a definir], com sede em São Paulo, SP. CONTRATANTE: {NOME}, CPF {CPF}, com os dados informados na inscrição."],
        ["2. Objeto", "Prestação do serviço {EVENTO} ({TIPO}), em {DATA}, {LOCAL}, na modalidade {INGRESSO}, conforme a descrição publicada na página da oferta."],
        ["3. Valor e pagamento", "O valor total é de {VALOR}, pago no ato da inscrição por Pix, cartão de crédito ou boleto. A vaga só é confirmada após a aprovação do pagamento."],
        ["4. Obrigações da CONTRATADA", "Realizar a atividade na data, no horário e com o conteúdo divulgados; fornecer os itens incluídos na modalidade escolhida; emitir o certificado de participação."],
        ["5. Obrigações do CONTRATANTE", "Informar dados verdadeiros; chegar no horário; zelar pelo próprio equipamento, que fica sob sua responsabilidade; respeitar as pessoas fotografadas e as regras do local."],
        ["6. Cancelamento e reembolso", "Aplica-se a Política de Cancelamento destes termos, que faz parte deste contrato, incluindo o direito de arrependimento de 7 dias previsto no art. 49 do Código de Defesa do Consumidor."],
        ["7. Alterações e cancelamento pela CONTRATADA", "Se a atividade for adiada ou cancelada pela CONTRATADA, o CONTRATANTE pode escolher entre a nova data, crédito para outra atividade ou reembolso integral."],
        ["8. Foro", "Fica eleito o foro da Comarca de São Paulo, SP, sem prejuízo do foro do domicílio do consumidor."]
      ]
    },
    participacao: {
      titulo: "Termos de Participação e Política de Cancelamento",
      curto: "Termos de participação",
      versao: "1.0",
      secoes: [
        ["1. Inscrição", "A inscrição é pessoal. Os dados informados são usados para identificação no local, emissão de certificado e contato sobre a atividade."],
        ["2. Direito de arrependimento", "Você pode desistir em até 7 dias corridos após a compra, com reembolso integral, desde que a atividade ainda não tenha acontecido."],
        ["3. Cancelamento por você", "Até 7 dias antes da atividade: reembolso integral. De 6 dias até 48 horas antes: crédito integral para outra atividade do 365 Clicks. Com menos de 48 horas ou em caso de ausência: sem reembolso."],
        ["4. Transferência", "Você pode transferir a inscrição para outra pessoa até 48 horas antes, pela página Meus Ingressos. A nova pessoa precisa aceitar estes termos."],
        ["5. Atividades gratuitas", "Em atividades gratuitas, se não puder comparecer, cancele a inscrição para liberar a vaga. Três ausências sem aviso podem bloquear novas inscrições gratuitas por 60 dias."],
        ["6. Conduta", "Fotografar pessoas exige respeito e consentimento. Condutas de assédio, discriminação ou que coloquem outras pessoas em risco levam ao desligamento sem reembolso."],
        ["7. Clima e segurança", "Atividades ao ar livre podem ser adiadas por chuva forte ou risco à segurança. Nesses casos, vale o item 7 do contrato."]
      ]
    },
    privacidade: {
      titulo: "Política de Privacidade (LGPD)",
      curto: "Política de privacidade",
      versao: "1.0",
      secoes: [
        ["1. Dados coletados", "Nome, CPF, data de nascimento, e-mail, telefones, endereço e Instagram, além dos dados do responsável legal quando houver."],
        ["2. Para que usamos", "Executar a inscrição e o contrato (art. 7º, V, da LGPD), emitir nota fiscal e certificado, falar com você sobre a atividade e, se você autorizar, enviar novidades."],
        ["3. Telefone de recado", "O telefone de recado é usado apenas em emergências durante a atividade. Ao informá-lo, você confirma que a pessoa indicada está de acordo."],
        ["4. Compartilhamento", "Com o processador de pagamentos e com a instrutora da atividade (apenas nome e Instagram). Não vendemos seus dados."],
        ["5. Retenção", "Pelo tempo necessário para cumprir obrigações legais e fiscais, em geral 5 anos após a atividade."],
        ["6. Seus direitos", "Acessar, corrigir, excluir ou levar seus dados para outro serviço, pelo e-mail privacidade@365clicks.com.br."]
      ]
    }
  };

  function brl(v) {
    return v === 0 ? "Gratuito" : "R$ " + v.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  function isGratuito(o) { return o.ingressos.every(function (i) { return i.preco === 0; }); }
  function menorPreco(o) { return Math.min.apply(null, o.ingressos.map(function (i) { return i.preco; })); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* Preenche os campos {X} dos documentos. Sem dados, mostra o nome do campo entre colchetes. */
  function preencher(texto, ctx) {
    return texto.replace(/\{(\w+)\}/g, function (_, k) { return ctx && ctx[k] ? esc(ctx[k]) : "[" + k.toLowerCase() + "]"; });
  }
  function termoHTML(id, ctx) {
    var t = TERMOS[id];
    return t.secoes.map(function (s) { return "<h4>" + s[0] + "</h4><p>" + preencher(s[1], ctx) + "</p>"; }).join("") +
      '<p class="mono" style="margin-top:12px">Versão ' + t.versao + " · modelo sujeito a validação jurídica</p>";
  }

  /* ---------- Página da oferta (evento ou curso) ---------- */
  function renderOferta(main, slug) {
    var o = OFERTAS[slug];
    if (!o) return;
    var I = window.C365 ? window.C365.icon : function () { return ""; };
    var gratis = isGratuito(o);
    var link = "inscricao.html#" + slug;
    var restantes = o.restantes != null
      ? '<span class="badge ' + (o.restantes < 10 ? "badge-warning" : "badge-success") + '">' + o.restantes + " de " + o.vagas + " vagas</span>"
      : '<span class="badge badge-success">Vagas ilimitadas</span>';

    main.innerHTML =
      '<div class="cover" role="img" aria-label="Imagem de ' + esc(o.titulo) + '" style="--img:url(\'' + o.img + '\');--tone:' + o.tone + ";--tone2:" + o.tone2 + '"></div>' +
      '<div class="split">' +
        '<article class="stack" style="gap:28px">' +
          '<header class="cluster" style="align-items:flex-start;gap:16px">' +
            '<div class="date-block"><span class="m">' + o.dia.m + '</span><span class="d">' + o.dia.d + '</span><span class="w">' + o.dia.w + "</span></div>" +
            '<div style="flex:1;min-width:220px"><span class="eyebrow">' + esc(o.categoria) + "</span><h1 style=\"margin:4px 0 6px\">" + esc(o.titulo) + '</h1><p style="margin:0">' + esc(o.subtitulo) + "</p></div>" +
          "</header>" +
          '<dl class="kv" style="grid-template-columns:auto 1fr;max-width:560px">' +
            "<dt>Quando</dt><dd style=\"text-align:left\">" + esc(o.data) + " · " + esc(o.horario) + "</dd>" +
            "<dt>Onde</dt><dd style=\"text-align:left\">" + esc(o.local) + '<br><span class="small">' + esc(o.endereco) + "</span>" + (o.mapa ? ' · <a class="small" href="' + o.mapa + '" target="_blank" rel="noopener">Como chegar</a>' : "") + "</dd>" +
            "<dt>Vagas</dt><dd style=\"text-align:left\">" + restantes + "</dd>" +
            "<dt>Organização</dt><dd style=\"text-align:left\">" + esc(o.organizador) + "</dd>" +
          "</dl>" +
          "<section><h2 style=\"margin-top:0\">Sobre " + (o.tipo === "curso" ? "o curso" : "o evento") + "</h2><p>" + esc(o.resumo) + "</p></section>" +
          "<section><h2 style=\"margin-top:0\">" + (o.tipo === "curso" ? "Conteúdo" : "Programação") + '</h2><ol class="timeline">' +
            o.programacao.map(function (p) { return '<li><span class="t">' + p[0] + "</span><div><strong>" + esc(p[1]) + '</strong><span class="small">' + esc(p[2]) + "</span></div></li>"; }).join("") +
          "</ol></section>" +
          '<section class="row" style="align-items:start">' +
            '<div><h3>O que está incluído</h3><ul class="small" style="padding-left:18px;margin:0">' + o.inclui.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" +
            '<div><h3>Antes de se inscrever</h3><ul class="small" style="padding-left:18px;margin:0">' + o.requisitos.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" +
          "</section>" +
          "<section><h2 style=\"margin-top:0\">Termos desta inscrição</h2><p>Na inscrição você lê e aceita:</p><div class=\"cluster\">" +
            o.termos.map(function (t) { return '<a class="chip" href="termos.html#' + t + '">' + TERMOS[t].curto + "</a>"; }).join("") +
          "</div></section>" +
        "</article>" +
        '<aside class="panel stack sticky" id="ingressos" aria-label="Ingressos">' +
          '<span class="eyebrow">' + (gratis ? "Inscrição" : "Ingressos") + "</span>" +
          '<div class="options">' + o.ingressos.map(function (i) {
            return '<div class="option" style="cursor:default"><div class="grow"><strong>' + esc(i.nome) + '</strong><span class="small">' + esc(i.desc) + '</span></div><span class="price">' + brl(i.preco) + "</span></div>";
          }).join("") + "</div>" +
          (o.descontoClube ? '<div class="notice"><span>' + I("bookmark", "i-sm") + '</span><span>Assinantes do plano Clube têm <strong>' + Math.round(o.descontoClube * 100) + "% de desconto</strong>, aplicado no pagamento.</span></div>" : "") +
          (o.parcelas ? '<span class="small">Pix, boleto ou cartão em até ' + o.parcelas + "x sem juros.</span>" : "") +
          '<a class="btn btn-accent btn-lg btn-block" href="' + link + '">' + (gratis ? "Inscrever-se grátis" : "Inscrever-se") + "</a>" +
          '<span class="small" style="text-align:center">Leva cerca de 3 minutos.</span>' +
        "</aside>" +
      "</div>";

    var bar = document.createElement("div");
    bar.className = "buy-bar";
    bar.innerHTML = '<div class="grow"><strong>' + (gratis ? "Gratuito" : "A partir de " + brl(menorPreco(o))) + '</strong><div class="small">' + esc(o.dataCurta) + (o.restantes != null ? " · " + o.restantes + " vagas" : "") + '</div></div><a class="btn btn-accent" href="' + link + '">Inscrever-se</a>';
    document.body.appendChild(bar);
    document.body.classList.add("has-buy-bar");
  }

  /* ---------- Vitrine (eventos ou cursos) ---------- */
  function renderVitrine(host, tipo) {
    var itens = Object.keys(OFERTAS).filter(function (k) { return OFERTAS[k].tipo === tipo; });
    host.innerHTML = itens.map(function (k) {
      var o = OFERTAS[k], gratis = isGratuito(o);
      return '<a class="offer" href="' + (PAGINA[k] || "inscricao.html#" + k) + '">' +
        '<div class="cover" style="--img:url(\'' + o.img + '\');--tone:' + o.tone + ";--tone2:" + o.tone2 + '"><span class="badge ' + (gratis ? "badge-success" : "badge-accent") + ' plain">' + (gratis ? "Gratuito" : "Pago") + "</span></div>" +
        '<div class="body"><div class="date-block"><span class="m">' + o.dia.m + '</span><span class="d">' + o.dia.d + '</span><span class="w">' + o.dia.w + "</span></div>" +
        "<div><h3>" + esc(o.titulo) + '</h3><div class="small">' + esc(o.local) + " · " + esc(o.horario) + '</div><div class="price-line">' + (gratis ? "Gratuito" : "A partir de " + brl(menorPreco(o))) + "</div></div></div></a>";
    }).join("");
  }

  /* Página de cada oferta dentro do protótipo */
  var PAGINA = {
    "foto-na-paulista": "foto-na-paulista.html",
    "foto-no-parque": "foto-no-parque.html",
    "curso-fotografia-de-rua": "curso.html",
    "curso-celular": "curso.html#curso-celular"
  };

  window.Ofertas = {
    lista: OFERTAS, termos: TERMOS, pagina: PAGINA,
    brl: brl, isGratuito: isGratuito, esc: esc, termoHTML: termoHTML,
    renderOferta: renderOferta, renderVitrine: renderVitrine
  };

  document.addEventListener("DOMContentLoaded", function () {
    var m = document.querySelector("[data-oferta]");
    if (m) {
      var h = location.hash.slice(1);
      renderOferta(m, OFERTAS[h] ? h : m.getAttribute("data-oferta"));
      window.addEventListener("hashchange", function () { if (OFERTAS[location.hash.slice(1)]) location.reload(); });
    }
    document.querySelectorAll("[data-vitrine]").forEach(function (h) { renderVitrine(h, h.getAttribute("data-vitrine")); });
  });
})();
