# PRD v2 — Evolução 365 Clicks

**Tipo:** adendo ao `PRD_365_CLICKS.md` (v2.0)
**Data:** 25/09/2026
**Fonte do conteúdo:** `conteudo/365_Clicks_Calendario_Editorial_365_Dias.xlsx` (abas *365 Desafios*, *Ciclos* e *Linha Editorial*)

> **Regra deste adendo:** não alterar funcionalidades existentes. Adicionar as estruturas, regras e relacionamentos abaixo ao sistema atual. Quando uma regra daqui toca uma regra já existente, a seção **Encaixe** diz exatamente como as duas convivem.

O 365 Clicks não é uma agenda de 365 posts. É um sistema em que desafios, técnicas, referências, artigos, fotógrafos, eventos e comunidade estão relacionados.

---

## 1. Motor dos 365 Desafios

### Regras de negócio
- Existe **um desafio por dia do calendário** (01/01 a 31/12), identificado pelo dia do ano (1–365).
- Cada desafio tem:

| Campo | Exemplo (dia 1) | Origem |
|---|---|---|
| Dia do ano / data | 1 · 01/01 | planilha |
| Ciclo | 01 — Olhar | planilha (24 ciclos: 23 de 15 dias e o último de 20) |
| Tema | Água | planilha (354 temas únicos) |
| Objetivo | Desenvolver a observação. | planilha (8 objetivos) |
| Missão do dia | Crie uma fotografia a partir do tema 'Água', buscando uma interpretação autoral. | modelo + tema |
| Técnica | Macro | Matriz Criativa |
| Enquadramento | Vista superior | Matriz Criativa |
| Linguagem | Narrativa | Matriz Criativa |
| Equipamento | Celular | Matriz Criativa |
| Combinação criativa | Água + Macro + Vista superior + Narrativa + Celular | derivada |
| 3 dicas de inspiração | ver seção 3 | modelo + tema |
| Variações Ano 1, 2 e 3 | ver abaixo | modelo + tema |
| Artigo-base, referências, radar | ver seções 4 a 7 | relacionamentos |

- **Variações por ano:** a mesma data tem uma proposta diferente para quem está no Ano 1 (observação e técnica), no Ano 2 (reinterpretar) e no Ano 3 (narrativa ou conceito autoral). O ano vem do perfil do usuário (Editar perfil → *Ano no 365*) ou da data de entrada no programa.
- **29 de fevereiro:** repete o desafio de 28/02 (o calendário tem 365 dias).
- **Livre:** quando um elemento da combinação é “Livre”, a característica correspondente é de livre escolha do fotógrafo.

### Encaixe com as regras existentes (PRD v2.0, seção 8)
- As **4 características** do desafio passam a ser os **4 elementos da combinação**: técnica, enquadramento, linguagem e equipamento. Continua valendo: a foto precisa cumprir **pelo menos 2**; 2 pontos por característica + 2 por publicar no mesmo dia (até 10).
- Continuam valendo a janela de **00:00:00 a 23:59:59**, a semana de **domingo (dia 1) a sábado** e o agendamento da semana atual e da próxima.
- O número exibido como “Dia N/365” passa a ser o dia do calendário editorial.

### Modelo de dados
- `desafio` (id, dia_do_ano, data_mm_dd, ciclo_id, tema_id, objetivo_id, missao, tecnica_id, enquadramento_id, linguagem_id, equipamento_id, dicas[3], variacao_ano1, variacao_ano2, variacao_ano3, artigo_base_id, status_curadoria)
- `ciclo` (id, numero, nome, dia_inicio, dia_fim)
- `objetivo` (id, texto)
- Fotos publicadas ganham `desafio_id`, `ano_programa` e `caracteristicas_cumpridas[]`.

### Experiência
- **Desafio do Dia:** ciclo, tema, missão, objetivo, a combinação criativa (cada elemento leva à Biblioteca), as 4 características, as 3 dicas marcadas como inspiração, a variação do ano da pessoa (abas Ano 1/2/3), contagem regressiva e “Para estudar”.
- **Publicar:** as caixas de característica são os 4 elementos do dia.

---

## 2. Matriz Criativa

### Regras de negócio
- Os elementos ficam cadastrados **separadamente** e podem ser combinados:
  **Tema × Técnica × Enquadramento × Linguagem × Equipamento × Elemento**
- Cadastro atual (vindo da planilha):
  - **Técnicas (6):** Macro, Panning, Silhueta, Minimalismo, Dupla exposição, Livre
  - **Enquadramentos (8):** Vista superior, Plano médio, Enquadramento fechado, Close ou plano detalhe, Plano geral, Vista inferior, Plano detalhe, Livre
  - **Linguagens (10):** Narrativa, Experimental, Documental, Street, Poética, Abstrata, Conceitual, Fotojornalística, Minimalista, Livre
  - **Equipamentos e recursos (11):** Celular, Câmera, Grande angular, Lente normal, Teleobjetiva, Macro, Tripé, Flash, Luz natural, Foco e desfoque (recurso), Livre
  - **Elemento (livre):** reservado para um sexto eixo (ex.: cor, hora do dia, clima). Ainda sem valores na planilha.
- **Regras de compatibilidade** (aplicadas pelo importador; a lista completa de dias alterados fica em `conteudo/ajustes_calendario.md`):
  - **Close → “Close ou plano detalhe”:** close quando o assunto é uma pessoa, plano detalhe quando é um objeto (46 dias).
  - **Fotojornalismo não usa flash:** quando a linguagem é Fotojornalística, o equipamento Flash é trocado pelo recurso **Foco e desfoque** (36 dias). “Recurso” ocupa o lugar do equipamento e conta como característica.
  - **Para revisar:** Documental + Dupla exposição (12 dias). A dupla exposição altera a cena, e o documental pede registro fiel. Aguarda decisão da curadoria.
  - Novas regras entram na lista `REGRAS` de `tools/importar_calendario.py`.
- A combinação é uma **proposta**, não uma receita: o sistema pode gerar combinações novas (Gerador de Desafio, Foto Criativa) sem mudar o desafio oficial do dia.
- Cada elemento pode aparecer em muitos desafios; a distribuição atual é equilibrada (ex.: cada técnica aparece cerca de 61 vezes no ano).

### Modelo de dados
- `elemento` (id, tipo: `tema | tecnica | enquadramento | linguagem | equipamento | elemento`, nome, slug, definicao, nivel)
- `combinacao` (id, tema_id, tecnica_id, enquadramento_id, linguagem_id, equipamento_id, elemento_id, origem: `calendario | gerador | usuario`)

---

## 3. Regra das dicas
- Cada desafio tem **3 dicas de inspiração**.
- **As dicas são inspiração, não requisitos.** Não contam pontos, não bloqueiam publicação e não entram na validação.
- A interface deixa isso explícito: título “3 dicas de inspiração” e o aviso “As dicas são inspiração, não regras. O que vale são as características”.
- **Curadoria pendente:** na planilha, a dica 1 é gerada a partir do tema, e as dicas 2 e 3 são iguais em todos os dias. O conteúdo precisa ser reescrito por dia.

---

## 4. Biblioteca de Conhecimento

### Regras de negócio
- Cada técnica, enquadramento, linguagem, equipamento (e, no futuro, cada tema e elemento) tem uma **página própria**.
- A página reúne: definição, artigo, exemplos da comunidade, fotógrafo de referência, livro ou fotolivro, filme ou documentário, exercício e **todos os desafios do ano que usam o elemento** (com o próximo destacado).
- Exemplo: **Macro** → artigo “O que é macrofotografia” → exemplos → fotógrafo → livro → filme → desafios que usam Macro.

### Modelo de dados
- `referencia` (id, tipo: `fotografo | livro | filme | serie | exposicao | museu | premio`, titulo, autor, ano, link, descricao)
- `elemento_referencia` (elemento_id, referencia_id, ordem)
- `elemento_conteudo` (elemento_id, conteudo_id)

---

## 5. Linha Editorial
Separada dos desafios, mas relacionada a eles. As 13 editorias da planilha:

| Editoria | Função |
|---|---|
| Fotografia na prática | Dicas curtas de técnica, composição, luz, edição e equipamento |
| Fotógrafo em foco | Biografias, obras, processos e leitura do trabalho de fotógrafos |
| A fotografia | Análise de fotografias específicas: contexto, composição, luz e narrativa |
| Livros e fotolivros | Clássicos, lançamentos, autores e recomendações |
| Cinema e séries | Filmes, documentários e direção de fotografia |
| Equipamentos | Câmeras, lentes, celulares, acessórios e tecnologia |
| Eventos e exposições | Agenda de fotografia no Brasil e no mundo |
| Prêmios e concursos | Resultados, chamadas, concursos e grandes premiações |
| Museus e instituições | Programação e iniciativas ligadas à fotografia e imagem |
| Agências e mercado | Agências, coletivos, mercado editorial e profissional |
| Editais, bolsas e residências | Oportunidades para fotógrafos e artistas visuais |
| Guias | Onde fotografar, estudar, expor, imprimir e encontrar referências |
| Radar 365 | Panorama semanal das principais notícias da fotografia |

- Todo conteúdo tem **uma editoria** e pode ter **vários elementos e desafios relacionados**.
- Cada desafio aponta para um **artigo-base** (“Como fotografar {tema}”), publicado na editoria *Fotografia na prática*.
- A editoria *Guias* também atende “onde fotografar”, e *Eventos e exposições* se conecta ao módulo de Eventos do PRD v2.0 (seção 13).

### Modelo de dados
- `conteudo` (id, tipo: `artigo | analise | resenha | guia | noticia | radar`, editoria_id, titulo, corpo, autor_id, status, publicado_em)
- `editoria` (id, nome, funcao)
- `conteudo_desafio` (conteudo_id, desafio_id) e `conteudo_elemento` (conteudo_id, elemento_id)

---

## 6. Radar 365
- Área dinâmica e **newsletter semanal** (segunda-feira) com o que está acontecendo na fotografia no Brasil e no mundo.
- Seções fixas: eventos e exposições, prêmios e concursos, editais/bolsas/residências, museus e instituições, livros e fotolivros, equipamentos, agências e mercado, cinema e séries, e os **desafios da semana**.
- A pessoa assina escolhendo os assuntos que quer receber.
- Cada edição tem uma página pública arquivada.
- **Modelo:** `radar_edicao` (id, semana, data, status) e `radar_item` (id, edicao_id, editoria_id, titulo, onde, quando, link, fonte).

---

## 7. Relacionamento entre conteúdo e desafio

```
Desafio (dia 1 · Água)
 └─ Técnica: Macro ──────────► Biblioteca: Macro
                                 ├─ Artigo: O que é macrofotografia?
                                 ├─ Fotógrafos de referência
                                 ├─ Livro / fotolivro
                                 ├─ Filme / documentário
                                 └─ Outros desafios que usam Macro (61 no ano)
 ├─ Enquadramento, Linguagem, Equipamento ► suas páginas na Biblioteca
 ├─ Artigo-base: Como fotografar “água” (Fotografia na prática)
 ├─ Radar da semana
 └─ Fotos da comunidade publicadas no desafio
```

- As ligações são **n:n** e navegáveis nos dois sentidos: do desafio para o conteúdo e do conteúdo para os desafios.
- Nenhuma página fica isolada: todo artigo, referência ou item do Radar mostra os desafios e elementos relacionados.

---

## 8. Curadoria pendente (achados na planilha)
- **Com texto próprio em cada dia:** tema e combinação criativa.
- **Com o mesmo modelo de texto em todos os dias, trocando só o tema:** missão, dica 1, variações de Ano 1, 2 e 3, artigo-base, referências e radar editorial.
- **Iguais em todos os dias:** dicas 2 e 3.
- **Prioridade de curadoria:** as 3 dicas e as variações de ano do primeiro ciclo (dias 1–15), depois um ciclo por vez.

## 9. Status no protótipo
- Motor, Matriz, dicas e variações: `pages/calendario-365.js` (gerado por `tools/importar_calendario.py`) + `pages/desafios.js`.
- Desafio do Dia, Desafios (semana), Publicar, Home e Admin Desafios usam o motor.
- Biblioteca de Conhecimento: `pages/biblioteca.html` (4 grupos de elementos, desafios relacionados e espaços de curadoria).
- Linha editorial: `pages/blog.html`. Radar 365: `pages/radar.html`.
