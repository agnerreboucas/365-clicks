# 365 Clicks — do protótipo ao WordPress funcionando

**Data:** 26/09/2026
**Situação:** o protótipo HTML navegável (67 telas) está pronto para validar a experiência e o visual. Nada ainda grava em servidor: contas, fotos, contatos e pagamentos são simulados no navegador.

## 1. Diagnóstico das telas

### 1.1 Prontas como protótipo (interativas, conteúdo e regras definidos) — 65
Todas as telas do mapa, exceto as duas parciais abaixo. Na auditoria de 26/09 ganharam conteúdo real: Artigo, Calendário, Gerador criativo, Foto Criativa, Roteiros (com guias exclusivos para assinantes e compra avulsa), Roteiro, Meus ganhos, Meus downloads, Admin Banco de imagens, Perfil público (`perfil.html#@usuario`), Fotógrafos, Seguidores/Seguindo, Mensagens (com Interessados), Notificações, Configurações, Meus desafios, Ranking, Conquistas, Meus cursos, Aula, Planos, Checkout, Minha assinatura, Minhas compras, Sobre, Ajuda, Contato e os painéis Admin Dashboard, Cursos, Assinaturas, Conteúdo e Gamificação.

### 1.2 Parciais (visual pronto, conteúdo de exemplo) — 2
Coleções · Portfólio

### 1.3 Removidas por repetir outras telas — 8
| Tela | Para onde foi |
|---|---|
| Exercícios | O exercício diário é o desafio do dia; explicações na Biblioteca e nas aulas |
| Fotografias, Inspiração | Explorar |
| Equipamentos | Editar perfil (do fotógrafo) e Biblioteca (o que cada um faz) |
| E-books | Loja |
| Gerador de Desafio | Gerador criativo |
| Assinatura | Planos + Minha assinatura |
| Seguindo | Aba dentro de Seguidores |

### 1.4 Telas que ainda não existem — 14
| Tela | Para quê |
|---|---|
| Entrar / sair / recuperar senha | Login com e-mail e senha, Google e Apple |
| Onboarding (primeiro acesso) | Escolher ano no 365, especialidades, seguir fotógrafos, aceitar termos |
| Central do fotógrafo | Suas visualizações, cliques, contatos e compartilhamentos |
| Resultados de busca | Fotos, fotógrafos, desafios, temas e artigos |
| Página de tema / coleção individual | Explorar por tema; abrir uma coleção |
| Arquivo do Radar e edição individual | Edições anteriores da newsletter |
| Denunciar foto (o de comentário já existe) | Direito autoral, nudez, ofensa, spam |
| Admin Biblioteca e Referências | Cadastrar elementos, fotógrafos, livros, filmes |
| Admin Radar e Linha Editorial | Montar a edição semanal e o calendário de pautas |
| Admin Loja e Pedidos | Produtos, estoque, pedidos, frete |
| Pagamento da loja | O pedido já é criado; falta o passo de Pix, cartão e boleto |
| Termos de uso da plataforma e Política de cookies | Hoje há os termos de eventos, do fotógrafo e de contato |
| Página 404 e estados de erro | Página não encontrada, sem conexão, sem permissão |
| E-mails transacionais (modelos) | Boas-vindas, desafio do dia, menção, contato, ingresso, Radar |

## 2. O que falta para “funcionar de verdade”
O protótipo é só a camada visual. Para funcionar, precisa de:

1. **Contas e perfis:** cadastro, login, recuperação de senha, perfis salvos no banco, papéis (fotógrafo, curador, administrador).
2. **Fotos:** upload real, guarda do original em armazenamento privado, geração das versões WebP, remoção do GPS público, leitura do EXIF no servidor e CDN.
3. **Motor de desafios no servidor:** o calendário importado da planilha, a janela de 00:00–23:59:59 validada no servidor (não só no navegador), as características e a pontuação.
4. **Comunidade:** seguir, curtir, comentar, @menções, marcações, feed, ranking “Em alta” e notificações.
5. **E-mail:** envio transacional confiável (SMTP/API) e a newsletter Radar 365.
6. **Contatos e rastreio:** tabelas de visualizações, cliques, contatos, compartilhamentos e chegadas por UTM, com o painel administrativo.
7. **Pagamentos:** Pix, cartão e boleto por um gateway brasileiro, para inscrições, cursos, assinaturas e loja; nota fiscal.
8. **Conteúdo:** blog com editorias, Biblioteca, Radar e “A foto que eu nunca tirei” editáveis no painel.
9. **Jurídico e LGPD:** textos revisados, registro de aceite (versão, data, IP), exportação e exclusão de dados.
10. **Operação:** hospedagem, backups, segurança, monitoramento e desempenho.

## 3. Arquitetura recomendada no WordPress

**Recomendação:** separar **aparência** e **regras de negócio**.

| Peça | O que é | Conteúdo |
|---|---|---|
| **Tema `365clicks`** (block theme) | Só a aparência | `theme.json` gerado de `design-system/tokens.css`; templates e *patterns* para cada tela; os componentes viram blocos; `viewer.js`, `upload.js` e o shell reaproveitados |
| **Plugin `365clicks-core`** | As regras | Tipos de conteúdo, taxonomias, tabelas próprias, rotas da API REST, tarefas agendadas, importador da planilha e validações |
| **Plugins de apoio** | O que não vale reconstruir | Loja, pagamentos, cursos, e-mail, SEO, segurança, cache |

Trocar o tema um dia não apaga os dados; atualizar o plugin não quebra o visual.

### 3.1 Tipos de conteúdo e taxonomias (no plugin)
| Tipo | Campos principais |
|---|---|
| `foto` (autor = usuário) | original privado, versões WebP, EXIF, local, desafio, características cumpridas, ano no programa, coautores |
| `desafio` (365) | dia, data, ciclo, tema, objetivo, missão, 4 elementos, 3 dicas, variações de Ano 1–3, artigo-base, status de curadoria |
| `projeto`, `colecao` | nome, conceito, visibilidade, fotos, no portfólio (sim/não) |
| `oferta` (evento, curso, palestra) | datas, local, vagas, programação, StoryBrand, termos exigidos |
| `referencia` | fotógrafo, livro, filme, série, exposição, museu, prêmio |
| `historia` | “A foto que eu nunca tirei”, status de curadoria, aceite da cessão |
| `radar_edicao` | semana, itens por editoria |
| `post` (blog) | editoria, desafios e elementos relacionados |
| Taxonomias | `ciclo`, `tema`, `tecnica`, `enquadramento`, `linguagem`, `equipamento`, `editoria`, `especialidade` |

### 3.2 Tabelas próprias (volume alto, fora de `wp_postmeta`)
`c365_curtidas` · `c365_seguidores` · `c365_marcacoes` · `c365_eventos_foto` (visualização, clique, contato, compartilhamento, agregados por dia) · `c365_contatos` (leads) · `c365_chegadas_utm` · `c365_aceites` (termo, versão, data, IP) · `c365_inscricoes` · `c365_pontos`

### 3.3 Plugins de apoio sugeridos
| Necessidade | Opção sugerida | Observação |
|---|---|---|
| Loja, checkout, ingressos, assinaturas e mensalidade de anunciantes | WooCommerce (+ Subscriptions) | Inscrições de eventos como produto; o fluxo de 5 etapas vira um checkout personalizado |
| Pix, cartão, boleto e **split** da venda de fotos (80/20) | Asaas (recomendado), Pagar.me, Iugu ou Mercado Pago | Precisa de subconta/recebedor por fotógrafo, com verificação (KYC) e saque por Pix; escolher pelo custo, split automático e emissão de nota |
| Cursos | Tutor LMS ou LearnDash | Aulas, progresso e certificados |
| E-mail transacional | WP Mail SMTP + Amazon SES ou Brevo | Obrigatório para as notificações |
| Newsletter Radar | Brevo, Mailchimp ou MailPoet | Listas por assunto |
| SEO | Rank Math ou Yoast | Dados estruturados das fotos e dos eventos |
| Cache, CDN e imagens | Cloudflare + cache de objetos (Redis); armazenamento S3 ou similar | As versões WebP geradas no servidor (Imagick ou serviço sharp) |
| Segurança e backup | Wordfence, backups diários fora do servidor | |

**Comunidade:** recomendo construir no plugin (seguir, curtir, menções, feed), em vez de BuddyPress, para manter o visual e o desempenho sob controle.

### 3.4 Proteção das fotos no WordPress
- As fotos saem por uma rota do plugin (não pelo link direto do arquivo), sempre em versão de exibição com marca d’água.
- O original nunca fica público.
- O escurecimento no print do celular exige DRM (Widevine/FairPlay) ou app nativo; fica como fase futura.

### 3.5 Split de pagamento por API (venda de fotos, 80/20)

Todos os gateways abaixo fazem split e têm API REST documentada:

| Gateway | Como cada fotógrafo entra | Como a venda é dividida | Observação |
|---|---|---|---|
| **Asaas** (recomendado) | Subconta criada por API (`POST /v3/accounts`), retorna o `walletId` | Na criação da cobrança (`POST /v3/payments`), campo `split` com `walletId` + valor fixo ou percentual | O split é calculado sobre o valor líquido (após taxas); subconta fica dentro da plataforma |
| Pagar.me | Recebedor criado por API | Regras de split no pedido; a soma das regras precisa fechar o valor | Custos de gateway e antifraude ficam com o marketplace |
| Iugu | Subconta por API (`POST /v1/marketplace/create_account`) | Split por fatura, conta mestre + subcontas | Exige o Plano Marketplace |
| Mercado Pago | O fotógrafo conecta a própria conta Mercado Pago (OAuth) | `marketplace_fee` / `application_fee` no pagamento | Depende de cada fotógrafo ter conta Mercado Pago |

**Fluxo com Asaas no plugin `365clicks-core`:**
1. **Vincular conta** (Meus ganhos → Conta de recebimento): o plugin cria a subconta com CPF/CNPJ, nome, e-mail, celular e endereço, e guarda o `walletId` no usuário. O status da verificação chega por webhook.
2. **Venda:** o checkout cria a cobrança na conta principal com `split: [{ walletId: <fotógrafo>, fixedValue: preço × 0,80 }]`. Usar **valor fixo** garante os 80% do preço ao fotógrafo e deixa as taxas do gateway dentro dos 20% da plataforma; com percentual, a taxa seria dividida entre os dois (o split incide sobre o valor líquido).
3. **Webhooks:** pagamento confirmado → libera o download e registra a venda em `c365_vendas`; estorno ou chargeback → revoga o link e estorna o saldo.
4. **Saldo e saque:** o saldo fica na subconta do fotógrafo; o saque vai para a chave Pix dele (automático no dia 5 ou pedido na tela). A tela Meus ganhos lê saldo e extrato pela API.
5. **Prazo de 30 dias “a liberar”:** controlado pela plataforma (ou por retenção/antecipação do gateway), por causa do prazo de reembolso.

Antes de fechar: confirmar taxas, prazo de recebimento, contrato de marketplace e limites de subcontas com o gateway; validar o modelo fiscal com contador.

## 4. Fases sugeridas
| Fase | Entrega | Tamanho |
|---|---|---|
| **0 · Fundação** | Hospedagem, tema com design system, plugin core, contas, onboarding, perfil, publicar com EXIF e WebP, motor de desafios importado da planilha | Grande |
| **1 · Comunidade** | Feed, visualizador protegido, curtidas, comentários, menções, marcações, seguidores, notificações por e-mail, “Em alta” | Grande |
| **2 · Receita** | Eventos e inscrições com Pix/cartão/boleto, loja, planos e assinatura, cursos | Grande |
| **3 · Conteúdo** | Blog com editorias, Biblioteca, Radar 365 com newsletter, “A foto que eu nunca tirei” | Média |
| **4 · Gestão** | Contatos e métricas, UTM, moderação, admin de conteúdo e gamificação | Média |
| **5 · Futuro** | App, DRM, IA na Foto Criativa, marketplace | — |

## 5. Decisões e insumos que dependem de você
1. Hospedagem e domínio (ex.: 365clicks.com.br).
2. Gateway de pagamento com split (subconta por fotógrafo) e emissão de nota fiscal (razão social e CNPJ). Sugestão: Asaas; alternativas Pagar.me, Iugu, Mercado Pago.
3. Plataforma de cursos (Tutor LMS, LearnDash ou cursos em outra plataforma).
4. Provedor de e-mail e de newsletter.
5. Revisão jurídica de todos os termos.
6. Curadoria do calendário: dicas, variações de ano e referências (ver `PRD_EVOLUCAO_365.md`, seção 8).
7. Validar o conteúdo das telas reconstruídas na auditoria (preços dos planos, conquistas, regras do ranking).
