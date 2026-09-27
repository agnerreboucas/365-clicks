/* 365 Clicks — catálogo de fotografias e fotógrafos do protótipo
   Fonte única para: cards das galerias, visualizador (lightbox), feed horizontal e métricas.
   Na versão funcional estes dados vêm do banco; as imagens se repetem de propósito. */
(function () {
  "use strict";

  var IMG = {
    estrelas: ["photo-1519681393784-d120267933ba", "#18233a", "#4b5f88"],
    lago: ["photo-1470770841072-f978cf4d019e", "#2c464e", "#a3bab2"],
    vale: ["photo-1500534623283-312aade485b7", "#4f4336", "#c09a6c"],
    rio: ["photo-1500530855697-b586d89ba3ee", "#304131", "#a2b298"],
    serra: ["photo-1493246507139-91e8fad9978e", "#37433a", "#8b9a84"],
    campo: ["photo-1492724441997-5dc865305da7", "#35402f", "#7f8c6c"],
    camera: ["photo-1516035069371-29a1b244cc32", "#26231f", "#6d6054"],
    retrato: ["photo-1517841905240-472988babdf9", "#382c28", "#8e7061"]
  };

  var FOTOGRAFOS = [
    { id: "analima", nome: "Ana Lima", cidade: "São Paulo, SP", foco: "Fotografia de rua", av: "#d9e3f2", bio: "Fotografo a cidade antes das 8 da manhã. 312 dias seguidos no 365.", clicks: 312 },
    { id: "rafaborges", nome: "Rafael Borges", cidade: "Belo Horizonte, MG", foco: "Retrato", av: "#f2e1cf", bio: "Retratos com luz natural. Atendo ensaios e trabalhos editoriais.", clicks: 204 },
    { id: "juliasantos", nome: "Júlia Santos", cidade: "Florianópolis, SC", foco: "Natureza", av: "#dcefe2", bio: "Paisagem e céu noturno. Completei o ano inteiro do 365 em 2025.", clicks: 365 },
    { id: "pedrocosta", nome: "Pedro Costa", cidade: "Curitiba, PR", foco: "Arquitetura e noite", av: "#ece0f2", bio: "Linhas, sombras e longas exposições.", clicks: 141 },
    { id: "marinafaria", nome: "Marina Faria", cidade: "Rio de Janeiro, RJ", foco: "Viagem", av: "#f2dada", bio: "Viajo para fotografar e fotografo para lembrar.", clicks: 188 },
    { id: "marcosandrade", nome: "Marcos Andrade", cidade: "São Paulo, SP", foco: "Rua e arquitetura", av: "#fbefd6", bio: "Aprendendo a ver um dia de cada vez.", clicks: 127 }
  ];

  /* [imagem, proporção, título, descrição do fotógrafo, EXIF, local, data, dia do desafio] */
  var OBRAS = {
    analima: [
      ["vale", "4/5", "Antes do trânsito", "Saí às 5h40 para pegar a luz rasante antes de o movimento começar. Esperei uns quinze minutos até a névoa baixar o suficiente para aparecer o desenho do terreno.", "35mm · f/5.6 · 1/250s · ISO 200", "São Paulo, SP", "12/05/2026", 132],
      ["camera", "1/1", "Ferramenta de trabalho", "A câmera que me acompanha há seis anos. Fotografei com luz de janela, só com um rebatedor branco do lado direito.", "50mm · f/2 · 1/125s · ISO 400", "São Paulo, SP", "02/04/2026", 92],
      ["rio", "3/2", "Curva do rio", "Subi a trilha só para esta vista. O rio desenha um S perfeito quando você se posiciona uns dez metros à esquerda do mirante.", "24mm · f/8 · 1/200s · ISO 100", "Serra da Mantiqueira, MG", "21/03/2026", 80],
      ["lago", "3/4", "Casa do lago ao amanhecer", "Esperei o vento parar por quase vinte minutos. O reflexo só fechou por alguns segundos e foi nesse intervalo que consegui a foto.", "16mm · f/8 · 1/125s · ISO 160", "Campos do Jordão, SP", "07/05/2026", 127]
    ],
    rafaborges: [
      ["retrato", "2/3", "Luz de fim de tarde", "Retrato da Laura no último raio de sol do dia. Sem rebatedor: só a parede clara do prédio da frente devolvendo a luz.", "85mm · f/1.4 · 1/1000s · ISO 100", "Belo Horizonte, MG", "18/06/2026", 169],
      ["retrato", "4/5", "Olhar lateral", "Pedi para ela olhar para a janela e esquecer que eu estava ali. A segunda foto da sequência foi a escolhida.", "85mm · f/1.8 · 1/500s · ISO 200", "Belo Horizonte, MG", "19/06/2026", 170],
      ["camera", "3/2", "Bastidores", "O set antes do ensaio. Gosto de registrar o equipamento do jeito que ele fica depois de um dia de trabalho.", "35mm · f/2.8 · 1/60s · ISO 800", "Belo Horizonte, MG", "30/04/2026", 120],
      ["campo", "4/5", "Campo aberto", "Fotografei entre um ensaio e outro. Às vezes a paisagem pede para ser vista sem ninguém na frente.", "50mm · f/4 · 1/320s · ISO 100", "Brumadinho, MG", "11/03/2026", 70]
    ],
    juliasantos: [
      ["estrelas", "3/2", "Via Láctea sobre a serra", "Noite sem lua, céu limpo depois de três dias de chuva. Vinte segundos de exposição com a câmera no tripé e o foco ajustado manualmente numa estrela.", "16mm · f/2.8 · 20s · ISO 3200", "Urubici, SC", "14/04/2026", 104],
      ["estrelas", "4/5", "Montanha e céu", "Mesma noite, outro enquadramento. Deixei mais céu para mostrar a densidade das estrelas.", "14mm · f/2.8 · 25s · ISO 3200", "Urubici, SC", "14/04/2026", 104],
      ["serra", "3/2", "Serra ao entardecer", "O vento trouxe as nuvens para o vale e em dez minutos tudo mudou. Fotografei em sequência para escolher depois.", "70mm · f/8 · 1/250s · ISO 100", "Serra do Rio do Rastro, SC", "02/06/2026", 153],
      ["rio", "1/1", "Verde depois da chuva", "Tudo fica mais saturado depois de uma chuva forte. Usei filtro polarizador para tirar o brilho das folhas.", "24mm · f/11 · 1/60s · ISO 100", "Florianópolis, SC", "08/02/2026", 39]
    ],
    pedrocosta: [
      ["estrelas", "2/3", "Céu vertical", "Queria a montanha pequena e o céu enorme. A foto só funciona na vertical.", "20mm · f/2 · 15s · ISO 2500", "Morretes, PR", "25/07/2026", 206],
      ["lago", "3/2", "Espelho", "Composição simétrica pensada antes de chegar. Marquei o ponto no mapa e voltei três vezes até o vento colaborar.", "24mm · f/11 · 1/60s · ISO 100", "Lago Azul, PR", "09/08/2026", 221],
      ["vale", "3/2", "Camadas", "Teleobjetiva para comprimir as camadas das montanhas. A luz lateral separa cada plano.", "200mm · f/8 · 1/500s · ISO 200", "Serra do Mar, PR", "15/08/2026", 227],
      ["camera", "4/5", "Objeto", "Estudo de forma e sombra com uma única fonte de luz dura.", "90mm · f/5.6 · 1/125s · ISO 100", "Curitiba, PR", "01/09/2026", 244]
    ],
    marinafaria: [
      ["lago", "4/5", "Chalé no lago", "Primeiro dia da viagem. Acordei antes de todo mundo para ter o lago só para mim.", "28mm · f/5.6 · 1/320s · ISO 160", "Bariloche, Argentina", "20/07/2026", 201],
      ["serra", "3/4", "Estrada da serra", "Paramos o carro no acostamento e eu corri para fotografar antes de a nuvem cobrir o pico.", "35mm · f/4 · 1/800s · ISO 100", "Serra da Canastra, MG", "05/05/2026", 125],
      ["campo", "3/2", "Horizonte baixo", "Deixei o horizonte bem embaixo para o céu contar a história.", "24mm · f/8 · 1/400s · ISO 100", "Chapada dos Veadeiros, GO", "28/05/2026", 148],
      ["retrato", "1/1", "Companheira de viagem", "A Bia rindo de uma piada que não entendi. Melhor retrato da viagem.", "50mm · f/1.8 · 1/640s · ISO 200", "Ouro Preto, MG", "03/06/2026", 154]
    ],
    marcosandrade: [
      ["rio", "4/5", "Primeiro click do mês", "Comecei setembro com uma caminhada longa. Ainda estou aprendendo a esperar a luz certa.", "35mm · f/5.6 · 1/250s · ISO 200", "São Paulo, SP", "01/09/2026", 244],
      ["vale", "1/1", "Quadrado", "Exercício do curso: compor em formato quadrado.", "35mm · f/8 · 1/200s · ISO 100", "São Paulo, SP", "10/09/2026", 253]
    ]
  };

  function src(key, ratio, w) {
    var p = ratio.split("/"), h = Math.round(w * +p[1] / +p[0]);
    return "https://images.unsplash.com/" + IMG[key][0] + "?auto=format&fit=crop&w=" + w + "&h=" + h + "&q=80";
  }

  var byId = {}, lista = [], porFotografo = {};
  FOTOGRAFOS.forEach(function (f) {
    byId["@" + f.id] = f;
    porFotografo[f.id] = [];
    (OBRAS[f.id] || []).forEach(function (o, n) {
      var foto = {
        id: f.id + "-" + (n + 1),
        fotografo: f.id,
        img: o[0], ratio: o[1], titulo: o[2], descricao: o[3], exif: o[4], local: o[5], data: o[6], dia: o[7],
        tone: IMG[o[0]][1], tone2: IMG[o[0]][2],
        thumb: src(o[0], o[1], 800),
        grande: src(o[0], o[1], 1600),
        curtidas: 80 + ((n + 3) * 97 + f.clicks) % 520
      };
      lista.push(foto);
      porFotografo[f.id].push(foto);
    });
  });

  /* Ordem de exibição intercalada entre fotógrafos (as galerias não mostram o mesmo autor em sequência) */
  var intercalada = [];
  for (var i = 0; i < 4; i++) FOTOGRAFOS.forEach(function (f) { if (porFotografo[f.id][i]) intercalada.push(porFotografo[f.id][i]); });

  var fotoPorId = {};
  lista.forEach(function (f) { fotoPorId[f.id] = f; });

  /* Pessoas que podem ser marcadas ou citadas (@) além dos fotógrafos com fotos */
  var PESSOAS = FOTOGRAFOS.map(function (f) { return { id: f.id, nome: f.nome, av: f.av }; }).concat([
    { id: "wesleyoliveira", nome: "Wesley Oliveira", av: "#e1eafb" },
    { id: "lauramendes", nome: "Laura Mendes", av: "#fcebd0" },
    { id: "biacastro", nome: "Bia Castro", av: "#dff3e8" },
    { id: "thiagorocha", nome: "Thiago Rocha", av: "#ece0f2" }
  ]);

  /* Comentários de exemplo, gerados a partir do catálogo */
  var FRASES = ["A luz ficou perfeita.", "Que composição! Quanto tempo esperou?", "Salvei para estudar depois.", "Isso é o 365 funcionando: dá para ver a evolução.", "O enquadramento vertical fez toda a diferença."];
  function comentariosExemplo(foto) {
    var n = foto.id.length % 3 + 1, out = [];
    for (var i = 0; i < n; i++) {
      var p = PESSOAS[(foto.id.charCodeAt(0) + i * 3) % PESSOAS.length];
      if (p.id === foto.fotografo) p = PESSOAS[(PESSOAS.indexOf(p) + 1) % PESSOAS.length];
      out.push({ autor: p.id, texto: FRASES[(foto.id.charCodeAt(1) + i) % FRASES.length], quando: "há " + (i * 3 + 2) + " h" });
    }
    return out;
  }

  /* ---------- Ordem "Em alta" ----------
     pontos = curtidas + 2×comentários + 3×compartilhamentos + 5×contatos + 0,1×visualizações
     peso de recência = 1 / (horas desde a publicação + 2)^1,2
     bônus de frequência = 1 + 0,05 × publicações do autor nos últimos 7 dias (máx. 7)
     em alta = pontos × peso de recência × bônus de frequência */
  var POSTS_7D = { analima: 7, rafaborges: 4, juliasantos: 6, pedrocosta: 3, marinafaria: 5, marcosandrade: 2 };
  function horasDesde(data) { var p = data.split("/"); return Math.max(1, (Date.now() - new Date(+p[2], +p[1] - 1, +p[0], 12).getTime()) / 36e5); }
  lista.forEach(function (f, k) {
    f.comentarios = 2 + (f.curtidas * 7) % 23;
    f.compartilhamentos = 1 + (f.curtidas * 13 + k * 5) % 41;
    f.visualizacoes = f.curtidas * 9 + (k * 37) % 400;
    f.contatos = (f.curtidas + k) % 6;
    f.curtidasHoje = (f.curtidas * 3 + k * 11) % 48;
    f.compartilhamentosSemana = (f.compartilhamentos * 2 + k) % 57;
  });
  function emAlta(f) {
    var pontos = f.curtidas + 2 * f.comentarios + 3 * f.compartilhamentos + 5 * f.contatos + 0.1 * f.visualizacoes;
    var recencia = 1 / Math.pow(horasDesde(f.data) + 2, 1.2);
    var freq = 1 + 0.05 * Math.min(7, POSTS_7D[f.fotografo] || 0);
    return pontos * recencia * freq * 1000;
  }
  function ordenar(modo) {
    var chave = { alta: emAlta, recentes: function (f) { return -horasDesde(f.data); }, curtidas: function (f) { return f.curtidas; }, compartilhadas: function (f) { return f.compartilhamentos; } }[modo] || emAlta;
    return lista.slice().sort(function (a, b) { return chave(b) - chave(a); });
  }

  /* Venda e licenças definidas pelo fotógrafo ao publicar. Toda venda passa pela plataforma (sem negociação por fora).
     cc: libera download gratuito da versão web (Creative Commons BY-NC: sem uso comercial, com crédito).
     preco: licença comercial com o arquivo original em alta resolução (null = foto não está à venda).
     modelos: pessoas identificáveis cadastradas pelo fotógrafo; cada uma recebe no mínimo MIN_MODELO% da parte do fotógrafo
     e a foto só vai à venda depois que todas aceitarem a autorização de uso de imagem.
     A plataforma fica com TAXA de cada venda. */
  var TAXA = 0.20, MIN_MODELO = 30, MAX_MODELOS = 70;
  var PRECOS = [180, 250, 320, 450, 150, 600, 290, 390];
  var MODELOS = {
    "rafaborges-1": [{ nome: "Laura Mendes", email: "laura@email.com", pct: 30, status: "aceito" }],
    "rafaborges-2": [{ nome: "Laura Mendes", email: "laura@email.com", pct: 35, status: "aceito" }],
    "marinafaria-4": [{ nome: "Bia Castro", email: "bia@email.com", pct: 30, status: "aceito" }]
  };
  lista.forEach(function (f, k) {
    f.venda = { cc: k % 3 !== 1, preco: PRECOS[k % PRECOS.length], modelos: MODELOS[f.id] || [] };
  });
  function venda(foto) {
    var extra = null;
    try { extra = JSON.parse(localStorage.getItem("c365-venda-" + foto.id) || "null"); } catch (e) {}
    var v = Object.assign({}, foto.venda || { cc: false, preco: null, modelos: [] }, extra || {});
    v.modelos = v.modelos || [];
    v.pendente = v.modelos.some(function (m) { return m.status !== "aceito"; });
    return v;
  }
  /* Divisão de uma venda: plataforma 20%; do restante, cada modelo recebe o percentual combinado (mínimo 30%) */
  function split(preco, modelos) {
    var plat = Math.round(preco * TAXA * 100) / 100, resto = preco - plat, ms = (modelos || []).map(function (m) { return { nome: m.nome, pct: m.pct, valor: Math.round(resto * m.pct) / 100 }; });
    var fot = Math.round((resto - ms.reduce(function (a, m) { return a + m.valor; }, 0)) * 100) / 100;
    return { plataforma: plat, fotografo: fot, modelos: ms };
  }

  /* Tratamento de imagem: lido do XMP/EXIF ao publicar e completado pelo fotógrafo */
  var TRAT = {
    "analima-1": { software: "Adobe Lightroom Classic 13.4", tipos: ["Luz e cor", "Recorte e alinhamento"], ajustes: [["Exposição", "+0.30"], ["Realces", "-35"], ["Sombras", "+22"], ["Remover névoa", "+12"], ["Temperatura (K)", "5600"]], notas: "Tirei um pouco da névoa para aparecer o desenho do terreno." },
    "juliasantos-1": { software: "Adobe Lightroom Classic 13.2", tipos: ["Luz e cor", "Redução de ruído", "HDR, panorama ou empilhamento das minhas fotos"], ajustes: [["Exposição", "+0.65"], ["Contraste", "+18"], ["Claridade", "+25"], ["Temperatura (K)", "4100"], ["Redução de ruído", "35"]], notas: "Empilhamento de 8 fotos do céu para reduzir o ruído." },
    "rafaborges-1": { software: "Capture One 23", tipos: ["Luz e cor"], ajustes: [["Exposição", "+0.15"], ["Realces", "-20"], ["Saturação", "-6"]], notas: "Tratamento leve de pele, sem mudar traços." },
    "pedrocosta-4": { software: "Sem edição", tipos: ["Sem tratamento (direto da câmera)"], ajustes: [], notas: "" },
    "marinafaria-2": { software: "Snapseed 2.21", tipos: ["Luz e cor", "Recorte e alinhamento"], ajustes: [["Estrutura", "+15"], ["Brilho", "+10"]], notas: "" }
  };
  function tratamentoDe(foto) {
    var extra = null; try { extra = JSON.parse(localStorage.getItem("c365-trat-" + foto.id) || "null"); } catch (e) {}
    return extra || TRAT[foto.id] || null;
  }

  /* Hashtags de cada foto (quem publica escreve; as mais usadas viram categorias na curadoria) */
  var TAGS = {
    "analima-1": ["saopaulo", "cidade", "amanhecer", "nevoa", "paisagemurbana"],
    "analima-2": ["retrato", "equipamento", "luznatural", "stilllife"],
    "analima-3": ["mantiqueira", "rio", "natureza", "minasgerais", "paisagem"],
    "analima-4": ["lago", "amanhecer", "reflexo", "serra", "saopaulo"],
    "rafaborges-1": ["retrato", "luznatural", "pordosol", "pessoas", "belohorizonte"],
    "rafaborges-2": ["retrato", "pessoas", "janela", "luznatural"],
    "rafaborges-3": ["bastidores", "equipamento", "estudio", "belohorizonte"],
    "rafaborges-4": ["campo", "paisagem", "minasgerais", "natureza"],
    "juliasantos-1": ["vialactea", "estrelas", "noite", "serra", "santacatarina"],
    "juliasantos-2": ["estrelas", "noite", "montanha", "santacatarina"],
    "juliasantos-3": ["serra", "pordosol", "nuvens", "santacatarina", "paisagem"],
    "juliasantos-4": ["natureza", "verde", "chuva", "florianopolis"],
    "pedrocosta-1": ["estrelas", "noite", "montanha", "parana", "vertical"],
    "pedrocosta-2": ["lago", "reflexo", "simetria", "parana"],
    "pedrocosta-3": ["serradomar", "montanha", "paisagem", "parana"],
    "pedrocosta-4": ["stilllife", "sombra", "estudio", "curitiba"],
    "marinafaria-1": ["lago", "viagem", "amanhecer"],
    "marinafaria-2": ["estrada", "serra", "viagem", "minasgerais"],
    "marinafaria-3": ["chapada", "cerrado", "goias", "horizonte", "viagem"],
    "marinafaria-4": ["retrato", "pessoas", "viagem", "ouropreto", "minasgerais"],
    "marcosandrade-1": ["saopaulo", "rio", "caminhada"],
    "marcosandrade-2": ["saopaulo", "quadrado", "paisagem"]
  };
  lista.forEach(function (f) { f.tags = (TAGS[f.id] || []).map(function (t) { return t.toLowerCase(); }); });
  function tagsDe(foto) {
    var extra = null; try { extra = JSON.parse(localStorage.getItem("c365-tags-foto-" + foto.id) || "null"); } catch (e) {}
    return extra || foto.tags || [];
  }
  /* Categorias: hashtags promovidas pela curadoria (padrão + as promovidas no admin) */
  var CATEGORIAS = [
    { id: "paisagem", nome: "Paisagem", tags: ["paisagem", "serra", "montanha", "campo", "horizonte", "chapada", "cerrado"] },
    { id: "cidade", nome: "Cidade", tags: ["cidade", "paisagemurbana", "saopaulo", "belohorizonte", "curitiba", "caminhada"] },
    { id: "pessoas", nome: "Pessoas e retratos", tags: ["retrato", "pessoas"] },
    { id: "noite", nome: "Noite e estrelas", tags: ["noite", "estrelas", "vialactea"] },
    { id: "agua", nome: "Água e reflexos", tags: ["lago", "rio", "reflexo", "chuva"] },
    { id: "natureza", nome: "Natureza", tags: ["natureza", "verde", "nevoa", "nuvens"] },
    { id: "viagem", nome: "Viagem e estrada", tags: ["viagem", "estrada"] },
    { id: "objetos", nome: "Objetos e estúdio", tags: ["stilllife", "equipamento", "estudio", "bastidores", "sombra"] }
  ];
  function categorias() {
    var extra = [], junta = {};
    try { extra = JSON.parse(localStorage.getItem("c365-categorias") || "[]"); junta = JSON.parse(localStorage.getItem("c365-cat-tags") || "{}"); } catch (e) {}
    return CATEGORIAS.concat(extra).map(function (c) { return { id: c.id, nome: c.nome, tags: c.tags.concat(junta[c.id] || []) }; });
  }
  function contagemTags() {
    var c = {};
    lista.forEach(function (f) { tagsDe(f).forEach(function (t) { c[t] = (c[t] || 0) + 1; }); });
    return Object.keys(c).map(function (t) { return { tag: t, n: c[t] }; }).sort(function (a, b) { return b.n - a.n || a.tag.localeCompare(b.tag); });
  }
  function buscar(q) {
    q = (q || "").toLowerCase().trim();
    var cat = null, tag = null;
    if (q.indexOf("cat:") === 0) cat = categorias().filter(function (c) { return c.id === q.slice(4); })[0];
    else if (q.charAt(0) === "#") tag = q.slice(1);
    return lista.filter(function (f) {
      var tg = tagsDe(f), ph = fotografoPorId(f.fotografo);
      if (cat) return tg.some(function (t) { return cat.tags.indexOf(t) > -1; });
      if (tag) return tg.indexOf(tag) > -1;
      if (!q) return true;
      return (f.titulo + " " + f.descricao + " " + f.local + " " + ph.nome + " " + tg.join(" ")).toLowerCase().indexOf(q.replace(/^#/, "")) > -1;
    });
  }
  function fotografoPorId(id) { return FOTOGRAFOS.filter(function (f) { return f.id === id; })[0]; }

  /* Projetos e coletivos convidados para compor o banco na fase de lançamento */
  var PROJETOS = [
    { id: "olhares-da-serra", nome: "Olhares da Serra", tipo: "Coletivo", cidade: "Sul do Brasil", av: "#dcefe2", descricao: "Fotógrafos de natureza que documentam as serras catarinense e paranaense.", membros: ["juliasantos", "pedrocosta"] },
    { id: "cidade-acordando", nome: "Cidade Acordando", tipo: "Projeto", cidade: "São Paulo, SP", av: "#d9e3f2", descricao: "O centro de São Paulo antes das 8 da manhã, um dia de cada vez.", membros: ["analima", "marcosandrade"] },
    { id: "estrada-de-minas", nome: "Estrada de Minas", tipo: "Projeto", cidade: "Minas Gerais", av: "#f2dada", descricao: "Retratos e paisagens de quem vive entre as cidades históricas e o cerrado mineiro.", membros: ["marinafaria", "rafaborges"] }
  ];

  window.Fotos = {
    tratamentoDe: tratamentoDe, tagsDe: tagsDe, categorias: categorias, contagemTags: contagemTags, buscar: buscar, projetos: PROJETOS,
    TAXA: TAXA, MIN_MODELO: MIN_MODELO, MAX_MODELOS: MAX_MODELOS, venda: venda, split: split,
    ordenar: ordenar, emAlta: emAlta, posts7d: POSTS_7D,
    pessoas: PESSOAS,
    pessoa: function (id) { return PESSOAS.filter(function (p) { return p.id === id; })[0]; },
    comentariosExemplo: comentariosExemplo,
    lista: intercalada,
    foto: function (id) { return fotoPorId[id]; },
    fotografo: function (id) { return FOTOGRAFOS.filter(function (f) { return f.id === id; })[0]; },
    fotografos: FOTOGRAFOS,
    doFotografo: function (id) { return porFotografo[id] || []; },
    iniciais: function (nome) { return nome.split(" ").map(function (p) { return p[0]; }).slice(0, 2).join("").toUpperCase(); }
  };
})();
