/* 365 Clicks — planos de assinatura (fonte única para Planos, Checkout, Minha assinatura e Configurações) */
(function () {
  "use strict";
  var PLANOS = {
    free: { nome: "Free", mensal: 0, anual: 0, resumo: "Para começar a fotografar todo dia.",
      itens: ["Desafio do dia e calendário dos 365", "Publicar 1 foto por dia", "Perfil público e diretório de Fotógrafos", "Comentários, marcações e mensagens", "Biblioteca de Conhecimento (visualização)"] },
    "365": { nome: "365", mensal: 14.9, anual: 119.9, resumo: "Para quem leva o ano inteiro a sério.", destaque: true,
      itens: ["Tudo do Free", "App 365 Clicks no celular", "Portfólio, Projetos e Coleções ilimitados", "Variações de Ano 2 e Ano 3 dos desafios", "Estatísticas das suas fotos (visualizações, cliques, contatos)", "Gerador criativo sem limite"] },
    clube: { nome: "Clube", mensal: 39.9, anual: 399, resumo: "Para quem quer aprender junto e ir aos encontros.",
      itens: ["Tudo do 365", "20% de desconto na Loja, cursos, palestras e eventos", "1 curso online por trimestre incluso", "Encontro mensal do Clube (online)", "Prioridade nas vagas dos eventos presenciais", "Selo Clube no perfil"] }
  };
  function brl(v) { return "R$ " + v.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
  function atual() { try { return JSON.parse(localStorage.getItem("c365-assinatura") || "null") || { plano: "365", ciclo: "mensal", desde: "12/03/2026", pagamento: "Cartão final 4242", status: "ativa" }; } catch (e) { return { plano: "365", ciclo: "mensal", status: "ativa" }; } }
  window.Planos = { lista: PLANOS, brl: brl, atual: atual };
})();
