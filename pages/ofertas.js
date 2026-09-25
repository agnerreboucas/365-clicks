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
    "palestra-vender-fotos": {
      sigla: "PVF",
      tipo: "evento",
      titulo: "Como vender suas fotos",
      subtitulo: "Palestra online ao vivo",
      resumo: "Noventa minutos sobre preço, licença de uso, bancos de imagem e como responder quando alguém pede para comprar uma foto sua.",
      categoria: "Palestra online",
      dia: { d: "14", m: "out", w: "ter" },
      data: "Terça, 14 de outubro de 2026",
      dataCurta: "14/10/2026",
      horario: "20:00 às 21:30",
      local: "Online, ao vivo",
      endereco: "Link enviado por e-mail 1 hora antes",
      vagas: 300,
      restantes: 112,
      img: U + "photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&h=900&q=80",
      tone: "#26231f", tone2: "#6d6054",
      organizador: "365 Clicks · Rafael Borges (palestrante)",
      ingressos: [
        { id: "ao-vivo", nome: "Ao vivo + gravação", preco: 49, desc: "Assista ao vivo, faça perguntas e reveja por 30 dias" }
      ],
      parcelas: 1,
      descontoClube: 0.2,
      programacao: [
        ["20:00", "Quanto vale uma foto", "Três formas de chegar ao preço"],
        ["20:30", "Licença de uso", "O que você vende quando vende uma foto"],
        ["21:00", "Perguntas ao vivo", "Casos reais enviados pelo público"]
      ],
      inclui: ["Modelo de licença de uso", "Planilha de preços", "Gravação por 30 dias"],
      requisitos: ["Computador ou celular com internet"],
      termos: ["contrato", "participacao", "privacidade"]
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
    fotografo: {
      titulo: "Termo de Adesão do Fotógrafo",
      curto: "Termo do fotógrafo",
      versao: "1.0",
      secoes: [
        ["1. Autoria e direitos", "Você continua sendo o único autor e titular dos direitos autorais de todas as fotografias que publicar (Lei 9.610/98). O 365 Clicks recebe apenas uma licença gratuita, não exclusiva e revogável para exibir as fotos dentro da plataforma, com o seu crédito."],
        ["2. Proteção das fotos", "O 365 Clicks exibe as fotos em resolução limitada, com marca d'água e bloqueio de download, clique direito e impressão, e escurece a imagem quando detecta tentativa de captura de tela. Essas medidas dificultam cópias, mas nenhuma tecnologia impede totalmente uma captura de tela ou uma foto da tela."],
        ["3. Métricas e rastreio", "Registramos cada visualização das suas fotos, cada clique em “Falar com o fotógrafo” e cada contato enviado, com data e hora. Usamos esses dados para mostrar seu desempenho, montar rankings, entender o crescimento da plataforma e para gestão interna."],
        ["4. Contatos de interessados", "Quem quiser comprar, licenciar ou contratar você preenche nome, telefone e mensagem. Você recebe esses dados para responder. O 365 Clicks também guarda uma cópia do contato e tem acesso ao registro dessa negociação."],
        ["5. Negociação", "Preço, prazo, forma de entrega e licença de uso são combinados diretamente entre você e o interessado. O 365 Clicks não interfere na negociação e não é parte do acordo, mas pode apresentar o registro do contato para comprovar a sua autoria e o seu direito sobre a obra."],
        ["6. Uso indevido", "Se alguém usar uma foto sua sem autorização, avise pelo e-mail direitos@365clicks.com.br. Ajudamos com o registro de autoria, data de publicação e histórico de contatos."],
        ["7. Remoção", "Você pode apagar suas fotos a qualquer momento. A licença de exibição termina na remoção; as métricas já registradas continuam nos relatórios de forma agregada."]
      ]
    },
    autoria: {
      titulo: "Declaração de Autoria e Responsabilidade",
      curto: "Declaração de autoria",
      versao: "1.0",
      secoes: [
        ["1. Autoria", "Ao publicar, declaro que sou o autor ou coautor desta fotografia e que tenho todos os direitos para publicá-la. O meu perfil aparece como autor. Se houver coautores, eu os informo na publicação."],
        ["2. Responsabilidade", "Assumo toda a responsabilidade por essa declaração. Se a foto for de outra pessoa, respondo por qualquer dano causado ao verdadeiro autor e ao 365 Clicks, e a publicação pode ser removida e minha conta suspensa."],
        ["3. Pessoas na foto", "Se houver pessoas identificáveis, declaro ter a autorização delas para publicar a imagem, especialmente em caso de crianças e adolescentes."],
        ["4. Dados da foto", "Autorizo o 365 Clicks a ler e exibir os metadados da foto (câmera ou celular, lente, abertura, velocidade, ISO, data e local) para validar os desafios e mostrar as informações técnicas."],
        ["5. Direitos preservados", "Continuo titular dos direitos autorais. A publicação segue o Termo de Adesão do Fotógrafo."]
      ]
    },
    cessao: {
      titulo: "Termo de Cessão de Direitos · A foto que eu nunca tirei",
      curto: "Cessão de direitos do livro",
      versao: "1.0",
      secoes: [
        ["1. O projeto", "“A foto que eu nunca tirei” reúne histórias de fotos que fotógrafos viram, mas não fizeram. As histórias são publicadas no blog e nas redes sociais do 365 Clicks e depois reunidas num livro colaborativo, digital e impresso, que será vendido."],
        ["2. Cessão gratuita", "Ao enviar sua história, você cede ao 365 Clicks, sem ônus e sem exclusividade, os direitos patrimoniais sobre o texto para publicação no blog, em redes sociais, no livro (todas as edições, formatos e idiomas) e em materiais de divulgação, conforme os arts. 49 e 50 da Lei 9.610/98."],
        ["3. Crédito", "Você sempre será citado como autor da sua história, com nome e perfil. Os direitos morais de autoria continuam sendo seus."],
        ["4. Veracidade", "Você declara que a história é verdadeira, que foi vivida por você e que o texto é original. Se citar pessoas, não expõe dados que as identifiquem sem autorização."],
        ["5. Edição", "O texto pode passar por revisão e edição para caber no livro, sem mudar o sentido da história. Você pode ver a versão final antes da impressão."],
        ["6. Custos e receitas", "Todos os custos de revisão, diagramação, publicação, impressão e venda são do 365 Clicks. A receita das vendas é do 365 Clicks."],
        ["7. Benefícios para quem participa", "Quem tiver a história publicada no livro recebe o selo “Coautor do livro” no perfil, o e-book gratuito e desconto no livro impresso. Benefícios adicionais serão informados antes do lançamento."],
        ["8. Retirada", "Você pode pedir a retirada da sua história do blog a qualquer momento. Depois que o livro entra em produção, a história permanece naquela edição."]
      ]
    },
    contato: {
      titulo: "Termo de Contato e Direitos Autorais",
      curto: "Termo de contato",
      versao: "1.0",
      secoes: [
        ["1. Seu contato", "Seu nome, telefone, e-mail e mensagem são enviados para {FOTOGRAFO}, autor(a) da fotografia “{FOTO}”, para que vocês conversem diretamente."],
        ["2. Registro pelo 365 Clicks", "O 365 Clicks registra este contato (data, hora, fotografia e dados informados) e tem acesso ao processo de negociação, para fins de gestão, métricas e garantia dos direitos do fotógrafo."],
        ["3. Não intervenção", "O 365 Clicks não interfere no preço, nas condições nem na entrega. O acordo é feito somente entre você e o fotógrafo."],
        ["4. Direitos autorais", "A fotografia pertence ao seu autor (Lei 9.610/98). Nenhum uso é permitido sem licença por escrito do fotógrafo: download, captura de tela, reprodução, publicação, edição ou uso comercial sem autorização violam a lei e podem gerar indenização."],
        ["5. Privacidade", "Seus dados são tratados conforme a Política de Privacidade do 365 Clicks (LGPD) e não são vendidos a terceiros."]
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


  /* ---------- Narrativa StoryBrand (SB7) de cada página de oferta ----------
     1. Personagem: quem é o cliente e o que ele quer
     2. Problema: externo, interno e filosófico
     3. Guia: empatia + autoridade
     4. Plano: três passos simples
     5. Chamada para ação
     6. O que evitar (fracasso)
     7. Sucesso (transformação) */
  var HISTORIA = {
    "foto-na-paulista": {
      promessa: "Volte da Paulista com as melhores fotos de rua que você já fez.",
      apoio: "Uma manhã de prática guiada, com a luz certa e alguém do seu lado para ajustar o olhar e a câmera.",
      personagem: "Você gosta de fotografia de rua, já tentou sair para fotografar sozinho e voltou com um cartão cheio e nenhuma foto que te orgulhe.",
      problemas: [["Fora", "Muita gente, muito movimento e a luz mudando rápido."], ["Dentro", "Vergonha de apontar a câmera para desconhecidos e a sensação de estar sempre atrasado para a cena."], ["O que é justo", "Boa fotografia de rua não deveria depender de sorte. Dá para aprender a antecipar."]],
      empatia: "A Ana também travava na rua. Levou anos para perder o medo de fotografar pessoas e hoje ensina o caminho mais curto.",
      autoridade: [["312", "dias seguidos no 365"], ["1.200+", "alunos em saídas"], ["4,9", "nota média dos workshops"]],
      depoimentos: [["Em quatro horas aprendi mais do que em um ano de tentativa sozinho.", "Bruno Almeida"], ["Perdi a vergonha de fotografar gente. A revisão no final valeu o workshop.", "Lívia Martins"]],
      plano: [["Inscreva-se", "Escolha o ingresso e garanta sua vaga. São só 30."], ["Venha às 7h", "Traga qualquer câmera ou o celular. O resto a gente leva."], ["Saia com um portfólio", "Revisamos suas fotos juntos e as melhores vão para o seu perfil."]],
      sucesso: ["Fotos de rua com intenção, não por acaso", "Segurança para fotografar pessoas com respeito", "Três fotos escolhidas para o portfólio", "Uma turma para sair fotografando depois"],
      fracasso: ["Mais um cartão cheio de fotos parecidas", "Continuar esperando “o dia certo” para começar", "Ver a luz da manhã passar sem saber usar"],
      faq: [["Preciso de câmera profissional?", "Não. Celular funciona muito bem para fotografia de rua."], ["E se chover?", "Com chuva forte, o workshop muda de data e você escolhe entre a nova data, crédito ou reembolso integral."], ["Posso levar um acompanhante?", "Cada pessoa precisa da própria inscrição, porque a turma é pequena."]]
    },
    "foto-no-parque": {
      promessa: "Um domingo fotografando com gente que ama fotografia como você.",
      apoio: "Encontro gratuito, sem pressão e sem exigência de equipamento. Só apareça.",
      personagem: "Você fotografa sozinho e sente falta de trocar ideia, mostrar suas fotos e ver como outras pessoas enxergam o mesmo lugar.",
      problemas: [["Fora", "Pouco tempo e nenhuma turma para sair fotografando."], ["Dentro", "Medo de parecer iniciante no meio de fotógrafos."], ["O que é justo", "Aprender fotografia deveria ser acessível e coletivo."]],
      empatia: "A comunidade 365 Clicks nasceu exatamente disso: gente que queria fotografar junto.",
      autoridade: [["18", "encontros realizados"], ["900+", "participantes"], ["Grátis", "sempre"]],
      depoimentos: [["Fui sozinha e saí com cinco amigos fotógrafos.", "Rafaela Dias"], ["Clima leve, ninguém julga equipamento.", "João Pedro Lima"]],
      plano: [["Inscreva-se grátis", "Leva 2 minutos."], ["Encontre a turma", "Portão 3 do Ibirapuera, às 9h."], ["Fotografe e compartilhe", "Publique suas fotos no desafio do dia."]],
      sucesso: ["Novos amigos fotógrafos", "Fotos do desafio do dia feitas em grupo", "Dicas práticas de quem está no mesmo caminho"],
      fracasso: ["Continuar fotografando sozinho e sem retorno", "Guardar as fotos no celular sem mostrar para ninguém"],
      faq: [["É mesmo gratuito?", "Sim. Pedimos só que cancele se não puder ir, para liberar a vaga."], ["Menores podem participar?", "Sim, com autorização do responsável na inscrição."]]
    },
    "curso-fotografia-de-rua": {
      promessa: "Em 8 semanas, saia do clique solto para uma série autoral de fotografia de rua.",
      apoio: "Aulas online, exercícios semanais e duas saídas presenciais com revisão individual do seu portfólio.",
      personagem: "Você já fotografa a cidade, mas suas fotos ainda parecem soltas e você quer construir um trabalho com a sua cara.",
      problemas: [["Fora", "Conteúdo espalhado na internet e nenhum método."], ["Dentro", "A sensação de que suas fotos são “só bonitas” e não dizem nada."], ["O que é justo", "Todo fotógrafo merece desenvolver uma voz própria."]],
      empatia: "A Ana levou anos para transformar fotos avulsas em projetos. O curso é o atalho que ela queria ter tido.",
      autoridade: [["8", "semanas"], ["2", "saídas presenciais"], ["96%", "concluem o curso"]],
      depoimentos: [["Terminei com uma série de 12 fotos que virou minha primeira exposição.", "Theo Nunes"], ["A revisão individual mudou meu jeito de editar.", "Camila Rocha"]],
      plano: [["Inscreva-se", "Escolha completo ou só online."], ["Pratique toda semana", "Uma aula, um exercício, retorno da turma."], ["Apresente sua série", "Revisão individual e publicação como projeto no seu perfil."]],
      sucesso: ["Uma série autoral pronta para o portfólio", "Método para planejar saídas fotográficas", "Olhar mais atento para luz, pessoas e composição"],
      fracasso: ["Mais um ano de fotos soltas", "Um HD cheio e nenhum projeto"],
      faq: [["As aulas ficam gravadas?", "Sim, por 12 meses."], ["Moro fora de São Paulo.", "Escolha a opção somente online."]]
    },
    "curso-celular": {
      promessa: "Tire fotos melhores com o celular que você já tem.",
      apoio: "Cinco aulas curtas e gratuitas. Em menos de duas horas, você já vê a diferença.",
      personagem: "Você fotografa com o celular e as fotos não ficam como a cena que você viu.",
      problemas: [["Fora", "Foco errado, foto escura, horizonte torto."], ["Dentro", "A ideia de que só dá para fotografar bem com câmera cara."], ["O que é justo", "A melhor câmera é a que está com você."]],
      empatia: "Metade da comunidade 365 Clicks fotografa só com celular.",
      autoridade: [["5", "aulas curtas"], ["1h40", "no total"], ["Grátis", "para sempre"]],
      depoimentos: [["Aprendi a travar foco e exposição. Parece outro celular.", "Bia Castro"]],
      plano: [["Inscreva-se grátis", "Acesso na hora."], ["Assista no seu ritmo", "Aulas de 12 a 25 minutos."], ["Faça os exercícios", "E publique no desafio do dia."]],
      sucesso: ["Fotos nítidas e bem expostas", "Composição mais intencional", "Edição rápida no próprio celular"],
      fracasso: ["Continuar achando que o problema é o celular"],
      faq: [["Serve para Android e iPhone?", "Sim, as dicas valem para os dois."]]
    },
    "palestra-vender-fotos": {
      promessa: "Saiba quanto cobrar e o que responder quando alguém quiser comprar uma foto sua.",
      apoio: "Noventa minutos ao vivo sobre preço, licença de uso e negociação, com modelos prontos para usar.",
      personagem: "Suas fotos começaram a chamar atenção e já apareceu gente perguntando quanto custa.",
      problemas: [["Fora", "Ninguém ensina a precificar fotografia."], ["Dentro", "Medo de cobrar demais e perder a venda, ou de menos e se desvalorizar."], ["O que é justo", "Quem cria merece ser pago de forma justa."]],
      empatia: "O Rafael vendeu a primeira foto por um valor que hoje ele acha absurdo de tão baixo.",
      autoridade: [["10 anos", "vendendo fotografia"], ["300+", "licenças negociadas"], ["Ao vivo", "com perguntas"]],
      depoimentos: [["Fechei minha primeira licença comercial uma semana depois.", "Pedro Costa"]],
      plano: [["Garanta a vaga", "R$ 49, com gravação."], ["Assista ao vivo", "E mande suas perguntas."], ["Use os modelos", "Licença e planilha de preços."]],
      sucesso: ["Um preço justo e fácil de explicar", "Uma licença de uso pronta", "Segurança para negociar pelo 365 Clicks"],
      fracasso: ["Dar sua foto “pela divulgação”", "Perder vendas por não saber responder"],
      faq: [["Vai ter gravação?", "Sim, por 30 dias."]]
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

  /* ---------- Página da oferta: landing page com narrativa StoryBrand ---------- */
  function renderOferta(main, slug) {
    var o = OFERTAS[slug];
    if (!o) return;
    var h = HISTORIA[slug] || {};
    var I = window.C365 ? window.C365.icon : function () { return ""; };
    var gratis = isGratuito(o);
    var link = "inscricao.html#" + slug;
    var cta = gratis ? "Inscrever-se grátis" : "Garantir minha vaga";
    var preco = gratis ? "Gratuito" : "A partir de " + brl(menorPreco(o));
    var vagas = o.restantes != null ? o.restantes + " de " + o.vagas + " vagas" : "Vagas ilimitadas";
    var li = function (arr) { return arr.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join(""); };

    main.innerHTML =
      /* Hero: promessa + chamada direta */
      '<section class="hero lp-hero" style="--img:url(\'' + o.img + '\');--tone:' + o.tone + ";--tone2:" + o.tone2 + '"><div>' +
        '<div class="eyebrow">' + esc(o.categoria) + " · " + esc(o.dataCurta) + " · " + esc(o.local) + "</div>" +
        "<h1>" + esc(h.promessa || o.titulo) + "</h1><p>" + esc(h.apoio || o.resumo) + "</p>" +
        '<div class="cluster"><a class="btn btn-primary btn-lg" href="' + link + '">' + cta + '</a><a class="btn btn-lg lp-ghost" href="#detalhes">Ver detalhes</a></div>' +
        '<div class="lp-facts"><span><strong>' + esc(o.titulo) + "</strong></span><span>" + esc(o.data) + "</span><span>" + esc(o.horario) + "</span><span>" + preco + "</span><span>" + vagas + "</span></div>" +
      "</div></section>" +

      /* 1. Personagem + 2. Problema */
      (h.personagem ? '<section class="lp-sec"><span class="eyebrow">Para você</span><h2>' + esc(h.personagem) + '</h2>' +
        '<div class="lp-problems">' + h.problemas.map(function (p) { return '<div><span class="eyebrow">' + esc(p[0]) + "</span><p>" + esc(p[1]) + "</p></div>"; }).join("") + "</div></section>" : "") +

      /* 3. Guia: empatia + autoridade */
      (h.empatia ? '<section class="lp-sec lp-guide"><div><span class="eyebrow">Quem vai com você</span><h2>' + esc(o.organizador.split(" · ").pop()) + '</h2><p>' + esc(h.empatia) + '</p>' +
        '<div class="lp-stats">' + h.autoridade.map(function (a) { return '<div><div class="metric">' + esc(a[0]) + '</div><span class="small">' + esc(a[1]) + "</span></div>"; }).join("") + "</div></div>" +
        '<div class="stack">' + h.depoimentos.map(function (d) { return '<figure class="lp-quote"><blockquote>“' + esc(d[0]) + '”</blockquote><figcaption class="small">' + esc(d[1]) + "</figcaption></figure>"; }).join("") + "</div></section>" : "") +

      /* 4. Plano em 3 passos + 5. Chamada */
      (h.plano ? '<section class="lp-sec"><span class="eyebrow">Como funciona</span><h2>Três passos</h2><ol class="lp-plan">' +
        h.plano.map(function (p) { return "<li><strong>" + esc(p[0]) + "</strong><span>" + esc(p[1]) + "</span></li>"; }).join("") + '</ol><a class="btn btn-primary btn-lg" href="' + link + '">' + cta + "</a></section>" : "") +

      /* 6. Fracasso x 7. Sucesso */
      (h.sucesso ? '<section class="lp-sec lp-stakes"><div class="panel"><span class="eyebrow">Sem isso</span><ul>' + li(h.fracasso) + '</ul></div><div class="panel inverse"><span class="eyebrow" style="color:var(--accent)">Depois ' + (o.tipo === "curso" ? "do curso" : "do evento") + "</span><ul>" + li(h.sucesso) + "</ul></div></section>" : "") +

      /* Detalhes práticos + ingressos */
      '<section class="lp-sec split" id="detalhes" style="scroll-margin-top:90px">' +
        '<div class="stack" style="gap:28px">' +
          '<div><span class="eyebrow">Detalhes</span><h2>' + esc(o.titulo) + "</h2>" +
          '<dl class="kv" style="grid-template-columns:auto 1fr;max-width:560px">' +
            '<dt>Quando</dt><dd style="text-align:left">' + esc(o.data) + " · " + esc(o.horario) + "</dd>" +
            '<dt>Onde</dt><dd style="text-align:left">' + esc(o.local) + '<br><span class="small">' + esc(o.endereco) + "</span>" + (o.mapa ? ' · <a class="small" href="' + o.mapa + '" target="_blank" rel="noopener">Como chegar</a>' : "") + "</dd>" +
            '<dt>Vagas</dt><dd style="text-align:left"><span class="badge ' + (o.restantes != null && o.restantes < 10 ? "badge-warning" : "badge-success") + '">' + vagas + "</span></dd>" +
            '<dt>Organização</dt><dd style="text-align:left">' + esc(o.organizador) + "</dd></dl></div>" +
          "<div><h3>" + (o.tipo === "curso" ? "Conteúdo" : "Programação") + '</h3><ol class="timeline">' +
            o.programacao.map(function (p) { return '<li><span class="t">' + p[0] + "</span><div><strong>" + esc(p[1]) + '</strong><span class="small">' + esc(p[2]) + "</span></div></li>"; }).join("") + "</ol></div>" +
          '<div class="row" style="align-items:start"><div><h3>Está incluído</h3><ul class="small" style="padding-left:18px;margin:0">' + li(o.inclui) + '</ul></div><div><h3>Antes de se inscrever</h3><ul class="small" style="padding-left:18px;margin:0">' + li(o.requisitos) + "</ul></div></div>" +
          (h.faq ? '<div><h3>Perguntas frequentes</h3>' + h.faq.map(function (f, n) { return '<details class="doc"' + (n ? "" : " open") + '><summary><span class="grow">' + esc(f[0]) + "</span>" + I("chevron") + '</summary><div class="doc-body" style="max-height:none"><p style="margin-top:12px">' + esc(f[1]) + "</p></div></details>"; }).join('<div style="height:8px"></div>') + "</div>" : "") +
          '<div><h3>Termos desta inscrição</h3><div class="cluster">' + o.termos.map(function (t) { return '<a class="chip" href="termos.html#' + t + '">' + TERMOS[t].curto + "</a>"; }).join("") + "</div></div>" +
        "</div>" +
        '<aside class="panel stack sticky" id="ingressos" aria-label="Ingressos">' +
          '<span class="eyebrow">' + (gratis ? "Inscrição" : "Ingressos") + "</span>" +
          '<div class="options">' + o.ingressos.map(function (i) {
            return '<div class="option" style="cursor:default"><div class="grow"><strong>' + esc(i.nome) + '</strong><span class="small">' + esc(i.desc) + '</span></div><span class="price">' + brl(i.preco) + "</span></div>";
          }).join("") + "</div>" +
          (o.descontoClube ? '<div class="notice"><span>Assinantes do plano Clube têm <strong>' + Math.round(o.descontoClube * 100) + "% de desconto</strong>, aplicado no pagamento.</span></div>" : "") +
          (o.parcelas && !gratis ? '<span class="small">Pix, boleto ou cartão' + (o.parcelas > 1 ? " em até " + o.parcelas + "x sem juros" : "") + ".</span>" : "") +
          '<a class="btn btn-primary btn-lg btn-block" href="' + link + '">' + cta + "</a>" +
          '<span class="small" style="text-align:center">Leva cerca de 3 minutos.</span>' +
        "</aside>" +
      "</section>" +

      /* Chamada final */
      '<section class="lp-final"><h2>' + esc(h.promessa || o.titulo) + '</h2><p>' + esc(o.dataCurta) + " · " + esc(o.local) + " · " + vagas + '</p><a class="btn btn-primary btn-lg" href="' + link + '">' + cta + "</a></section>";

    var bar = document.createElement("div");
    bar.className = "buy-bar";
    bar.innerHTML = '<div class="grow"><strong>' + preco + '</strong><div class="small">' + esc(o.dataCurta) + (o.restantes != null ? " · " + o.restantes + " vagas" : "") + '</div></div><a class="btn btn-primary" href="' + link + '">Inscrever-se</a>';
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
    "curso-celular": "curso.html#curso-celular",
    "palestra-vender-fotos": "oferta.html#palestra-vender-fotos"
  };

  window.Ofertas = {
    lista: OFERTAS, termos: TERMOS, pagina: PAGINA, historia: HISTORIA,
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
