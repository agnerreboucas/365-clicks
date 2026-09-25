#!/usr/bin/env node
// Gera um relatório HTML comparativo a partir do analysis.json.
// Uso: node report.js ./reports/nome   (gera ./reports/nome/report.html)
import fs from 'node:fs/promises';
import path from 'node:path';

const dir = path.resolve(process.argv[2] || '.');
const sites = JSON.parse(await fs.readFile(path.join(dir, 'analysis.json'), 'utf8'));
const ok = sites.filter((s) => !s.error);

const esc = (v) => String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const hostOnly = (u) => new URL(u).hostname.replace(/^www\./, '');
// Usa o caminho junto do domínio quando dois sites têm o mesmo domínio
const host = (s) => sites.filter((x) => hostOnly(x.url) === hostOnly(s.url)).length > 1
  ? hostOnly(s.url) + new URL(s.url).pathname.replace(/\/$/, '') : hostOnly(s.url);
const ms = (v) => (v == null ? '—' : v >= 1000 ? `${(v / 1000).toFixed(1)} s` : `${v} ms`);

const swatches = (list) => list.slice(0, 8).map((c) =>
  `<div class="sw"><span style="background:${esc(c.value)}"></span><code>${esc(c.value)}</code></div>`).join('');

// Arredonda os espaçamentos para detectar a grade base (4px ou 8px)
const gridBase = (spacing) => {
  const vals = spacing.map((s) => +s.value);
  const total = spacing.reduce((a, s) => a + s.weight, 0) || 1;
  const on = (n) => spacing.filter((s) => +s.value % n === 0).reduce((a, s) => a + s.weight, 0) / total;
  const p8 = on(8), p4 = on(4);
  return { base: p8 >= 0.6 ? 8 : p4 >= 0.6 ? 4 : null, p4: Math.round(p4 * 100), p8: Math.round(p8 * 100), scale: [...new Set(vals)].sort((a, b) => a - b).slice(0, 12) };
};

// Métricas comparáveis — destaca o melhor valor de cada linha
const rows = [
  ['Tempo até o primeiro byte', (s) => s.performance?.ttfbMs, 'min', ms],
  ['Maior elemento visível (LCP)', (s) => s.performance?.lcpMs, 'min', ms],
  ['Carregamento completo', (s) => s.performance?.loadMs, 'min', ms],
  ['Requisições', (s) => s.performance?.requests, 'min'],
  ['Peso transferido', (s) => s.performance?.transferKB, 'min', (v) => (v == null ? '—' : `${v} KB`)],
  ['Imagens na página', (s) => s.structure?.images, null],
  ['Imagens sem texto alternativo', (s) => s.structure?.imagesWithoutAlt, 'min'],
  ['Textos com contraste baixo', (s) => s.accessibility?.lowContrastSamples.length, 'min'],
  ['Alvos de toque pequenos (mobile)', (s) => s.mobile?.smallTapTargets, 'min'],
  ['Rolagem horizontal no mobile', (s) => (s.mobile?.horizontalOverflow ? 1 : 0), 'min', (v) => (v ? 'Sim' : 'Não')],
  ['Campo de busca', (s) => s.structure?.searchInputs, 'max', (v) => (v ? 'Sim' : 'Não')],
  ['Variáveis CSS (design tokens)', (s) => Object.keys(s.tokens?.cssVariables || {}).length, 'max'],
];

const metricTable = `<table><thead><tr><th></th>${ok.map((s) => `<th>${esc(host(s))}</th>`).join('')}</tr></thead><tbody>${rows.map(([label, get, best, fmt = (v) => v ?? '—']) => {
  const vals = ok.map(get);
  const nums = vals.filter((v) => typeof v === 'number');
  const target = best === 'min' ? Math.min(...nums) : best === 'max' ? Math.max(...nums) : null;
  return `<tr><th>${label}</th>${vals.map((v) => `<td class="${best && nums.length > 1 && new Set(nums).size > 1 && v === target ? 'best' : ''}">${esc(fmt(v))}</td>`).join('')}</tr>`;
}).join('')}</tbody></table>`;

const siteCard = (s) => {
  if (s.error) return `<section class="card"><h2>${esc(host(s))}</h2><p class="err">Não foi possível analisar: ${esc(s.error)}</p></section>`;
  const t = s.tokens, ty = t.typography, g = gridBase(t.spacing);
  const el = ty.elements;
  const typeRow = (tag, sample) => el[tag] ? `<div class="type"><span class="tag">${tag}</span><span style="font-family:${esc(el[tag].fontFamily)};font-size:min(${esc(el[tag].fontSize)},40px);font-weight:${esc(el[tag].fontWeight)};letter-spacing:${esc(el[tag].letterSpacing)}">${sample}</span><code>${esc(el[tag].fontSize)} / ${esc(el[tag].fontWeight)} / ${esc(el[tag].lineHeight)}</code></div>` : '';
  const cta = s.structure.ctas.find((c) => c.bg && c.bg !== '#ffffff') || s.structure.ctas[0];
  return `<section class="card">
  <header class="card-h"><h2>${esc(host(s))}</h2><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a></header>
  <div class="shots">
    ${s.screenshots.desktop ? `<figure><img src="${esc(s.screenshots.desktop)}" alt="Primeira dobra, desktop"><figcaption>Desktop</figcaption></figure>` : ''}
    ${s.screenshots.desktopScroll ? `<figure><img src="${esc(s.screenshots.desktopScroll)}" alt="Após rolar, desktop"><figcaption>Após rolar</figcaption></figure>` : ''}
    ${s.screenshots.mobile ? `<figure class="m"><img src="${esc(s.screenshots.mobile)}" alt="Mobile"><figcaption>Mobile</figcaption></figure>` : ''}
  </div>
  <h3>Cores</h3>
  <p class="lbl">Texto</p><div class="sws">${swatches(t.colors.text)}</div>
  <p class="lbl">Fundos</p><div class="sws">${swatches(t.colors.background)}</div>
  ${t.colors.border.length ? `<p class="lbl">Bordas</p><div class="sws">${swatches(t.colors.border)}</div>` : ''}
  <h3>Tipografia</h3>
  <p>${ty.families.map((f) => `<b>${esc(f.value)}</b>`).join(' · ')}</p>
  ${typeRow('h1', 'Título principal')}${typeRow('h2', 'Título de seção')}${typeRow('h3', 'Subtítulo')}${typeRow('p', 'Texto de parágrafo')}
  <p class="lbl">Escala de tamanhos</p><p class="chips">${ty.sizes.map((x) => `<span>${esc(x.value)}</span>`).join('')}</p>
  <p class="lbl">Pesos</p><p class="chips">${ty.weights.map((x) => `<span>${esc(x.value)}</span>`).join('')}</p>
  <h3>Espaçamento e forma</h3>
  <p>Grade base: <b>${g.base ? `${g.base}px` : 'sem padrão claro'}</b> <span class="muted">(${g.p4}% múltiplos de 4 · ${g.p8}% múltiplos de 8)</span></p>
  <p class="chips">${g.scale.map((v) => `<span><i style="width:${Math.min(v, 64)}px"></i>${v}</span>`).join('')}</p>
  <p class="lbl">Raios de borda</p><p class="chips">${t.radii.map((r) => `<span><i class="r" style="border-radius:${esc(r.value)}"></i>${esc(r.value)}</span>`).join('') || '<span>nenhum</span>'}</p>
  ${t.containerWidths.length ? `<p class="lbl">Largura máxima do conteúdo</p><p class="chips">${t.containerWidths.map((w) => `<span>${esc(w.value)}</span>`).join('')}</p>` : ''}
  ${cta ? `<h3>Botão principal</h3><p><span class="cta" style="background:${esc(cta.bg)};color:${esc(cta.color)};border-radius:${esc(cta.radius)};padding:${esc(cta.padding)};font-size:${esc(cta.fontSize)};font-weight:${esc(cta.fontWeight)}">${esc(cta.text || 'Botão')}</span></p>` : ''}
  <h3>Estrutura</h3>
  <ol class="outline">${s.structure.headings.slice(0, 14).map((h) => `<li class="${h.tag}">${esc(h.text)}</li>`).join('')}</ol>
  ${s.structure.navLinks.length ? `<p class="lbl">Menu</p><p class="chips">${s.structure.navLinks.slice(0, 14).map((l) => `<span>${esc(l)}</span>`).join('')}</p>` : ''}
</section>`;
};

const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Benchmark de Sites</title>
<style>
:root{--bg:#f6f6f4;--card:#fff;--ink:#151515;--muted:#6b6b6b;--line:#e4e4e0;--best:#e7f6ec;--bestInk:#1b6b3a;--err:#b42318}
@media (prefers-color-scheme:dark){:root:not([data-theme=light]){--bg:#111;--card:#1a1a1a;--ink:#eee;--muted:#9a9a9a;--line:#2c2c2c;--best:#12301e;--bestInk:#7ad39b;--err:#ff8a80}}
:root[data-theme=dark]{--bg:#111;--card:#1a1a1a;--ink:#eee;--muted:#9a9a9a;--line:#2c2c2c;--best:#12301e;--bestInk:#7ad39b;--err:#ff8a80}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.55 Inter,system-ui,sans-serif}
main{max-width:1280px;margin:0 auto;padding:32px 16px 64px}h1{font-size:28px;margin:0 0 4px}h2{margin:0;font-size:20px}h3{margin:28px 0 10px;font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}
.muted{color:var(--muted)}.sub{color:var(--muted);margin:0 0 28px}
.table-wrap{overflow-x:auto;background:var(--card);border:1px solid var(--line);border-radius:12px;margin-bottom:32px}
table{border-collapse:collapse;width:100%;min-width:560px}th,td{padding:10px 14px;border-bottom:1px solid var(--line);text-align:left;font-size:14px}thead th{font-weight:600}tbody th{font-weight:500;color:var(--muted)}td.best{background:var(--best);color:var(--bestInk);font-weight:600}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:20px}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:20px;min-width:0}.card-h a{color:var(--muted);font-size:13px;word-break:break-word}
.shots{display:flex;gap:8px;margin-top:14px;overflow-x:auto}.shots figure{margin:0;flex:0 0 46%}.shots figure.m{flex:0 0 22%}.shots img{width:100%;border:1px solid var(--line);border-radius:8px;display:block}figcaption{font-size:12px;color:var(--muted)}
.sws{display:flex;flex-wrap:wrap;gap:8px}.sw{display:flex;flex-direction:column;align-items:center;gap:4px}.sw span{width:44px;height:44px;border-radius:8px;border:1px solid var(--line)}.sw code{font-size:11px}
.lbl{font-size:12px;color:var(--muted);margin:12px 0 6px}
.chips{display:flex;flex-wrap:wrap;gap:6px;margin:0}.chips span{border:1px solid var(--line);border-radius:6px;padding:2px 8px;font-size:12px;display:inline-flex;align-items:center;gap:6px}.chips i{display:inline-block;height:8px;background:var(--ink);opacity:.5}.chips i.r{width:18px;height:18px;background:none;border:2px solid var(--ink)}
.type{display:grid;grid-template-columns:32px 1fr;gap:2px 10px;padding:8px 0;border-bottom:1px dashed var(--line)}.type .tag{color:var(--muted);font-size:12px}.type code{grid-column:2;font-size:11px;color:var(--muted)}
.cta{display:inline-block}.outline{padding-left:18px;margin:0;font-size:13px}.outline .h1{font-weight:700}.outline .h3{color:var(--muted);margin-left:14px}
.err{color:var(--err)}
</style></head><body><main>
<h1>Benchmark de Sites</h1>
<p class="sub">${ok.length} de ${sites.length} sites analisados · ${new Date(sites[0]?.analyzedAt || Date.now()).toLocaleDateString('pt-BR')}. Em verde, o melhor resultado de cada linha.</p>
${ok.length ? `<div class="table-wrap">${metricTable}</div>` : ''}
<div class="grid">${sites.map(siteCard).join('')}</div>
</main></body></html>`;

await fs.writeFile(path.join(dir, 'report.html'), html);
console.log(`Relatório: ${path.join(dir, 'report.html')}`);
