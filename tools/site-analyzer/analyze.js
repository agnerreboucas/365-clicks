#!/usr/bin/env node
// Site Analyzer — extrai design system, estrutura e métricas de um ou mais sites.
// Uso: node analyze.js <url> [url2 url3 ...] [--out ./reports/nome]
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const outDir = path.resolve(outIdx >= 0 ? args[outIdx + 1] : `./reports/${new Date().toISOString().slice(0, 10)}`);
const urls = args.filter((a, i) => a.startsWith('http') && i !== outIdx + 1);

if (!urls.length) {
  console.error('Uso: node analyze.js <url> [url2 ...] [--out ./reports/nome]');
  process.exit(1);
}

const slug = (u) => new URL(u).hostname.replace(/^www\./, '').replace(/[^a-z0-9]+/gi, '-') +
  (new URL(u).pathname.replace(/[^a-z0-9]+/gi, '-').replace(/-+$/, '') || '');

// Roda dentro da página: coleta os estilos computados de todos os elementos visíveis.
function extractInPage() {
  const toHex = (c) => {
    const m = c && c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    if (a < 0.1) return null;
    return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
  };
  const luminance = (hex) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const contrast = (a, b) => {
    const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (l1 + 0.05) / (l2 + 0.05);
  };
  const bump = (map, key, w = 1) => { if (key != null && key !== '') map[key] = (map[key] || 0) + w; };
  const top = (map, n = 12) => Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, n)
    .map(([value, weight]) => ({ value, weight: Math.round(weight) }));

  // Fundo real atrás do texto; null quando há imagem (não dá para medir contraste com segurança)
  const effectiveBg = (el) => {
    for (let n = el; n; n = n.parentElement) {
      const ns = getComputedStyle(n);
      if (ns.backgroundImage !== 'none' || n.querySelector(':scope > img, :scope > picture, :scope > video')) return null;
      const hex = toHex(ns.backgroundColor);
      if (hex) return hex;
    }
    return '#ffffff';
  };

  const textColors = {}, bgColors = {}, borderColors = {}, fonts = {}, sizes = {}, weights = {},
    lineHeights = {}, spacing = {}, radii = {}, shadows = {}, maxWidths = {};
  const lowContrast = [];
  let textEls = 0;

  const els = [...document.querySelectorAll('body *')];
  for (const el of els) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const s = getComputedStyle(el);
    if (s.visibility === 'hidden' || s.display === 'none' || +s.opacity === 0) continue;
    const area = Math.min(r.width * r.height, 1e6);

    bump(bgColors, toHex(s.backgroundColor), area / 1000);
    if (parseFloat(s.borderTopWidth) > 0) bump(borderColors, toHex(s.borderTopColor));
    for (const p of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginBottom', 'rowGap', 'columnGap']) {
      const v = parseFloat(s[p]);
      if (v > 0 && v < 400) bump(spacing, Math.round(v));
    }
    if (parseFloat(s.borderTopLeftRadius) > 0) bump(radii, s.borderTopLeftRadius);
    if (s.boxShadow && s.boxShadow !== 'none') bump(shadows, s.boxShadow);
    if (s.maxWidth && s.maxWidth.endsWith('px') && parseFloat(s.maxWidth) >= 600) bump(maxWidths, s.maxWidth);

    const ownText = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ');
    if (ownText.length > 1) {
      textEls++;
      const w = ownText.length;
      const color = toHex(s.color);
      bump(textColors, color, w);
      bump(fonts, s.fontFamily.split(',')[0].replace(/["']/g, '').trim(), w);
      bump(sizes, s.fontSize, w);
      bump(weights, s.fontWeight, w);
      if (s.lineHeight !== 'normal') bump(lineHeights, (parseFloat(s.lineHeight) / parseFloat(s.fontSize)).toFixed(2), w);
      if (color && lowContrast.length < 15) {
        const bg = effectiveBg(el);
        if (!bg) continue;
        const ratio = contrast(color, bg);
        const large = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.66 && +s.fontWeight >= 700);
        if (ratio < (large ? 3 : 4.5)) lowContrast.push({ text: ownText.slice(0, 60), color, bg, ratio: +ratio.toFixed(2) });
      }
    }
  }

  const headingStyles = {};
  for (const tag of ['h1', 'h2', 'h3', 'h4', 'p', 'a', 'button']) {
    const el = [...document.querySelectorAll(tag)].find((e) => e.getBoundingClientRect().height > 0 && e.textContent.trim());
    if (!el) continue;
    const s = getComputedStyle(el);
    headingStyles[tag] = { fontFamily: s.fontFamily, fontSize: s.fontSize, fontWeight: s.fontWeight, lineHeight: s.lineHeight,
      letterSpacing: s.letterSpacing, textTransform: s.textTransform, color: toHex(s.color) };
  }

  // Botões / CTAs principais
  const ctas = [...document.querySelectorAll('button, a[role=button], a[class*=btn], a[class*=button], input[type=submit]')]
    .filter((e) => e.getBoundingClientRect().height > 0)
    .slice(0, 25)
    .map((e) => {
      const s = getComputedStyle(e);
      return { text: (e.innerText || e.value || e.getAttribute('aria-label') || '').trim().slice(0, 50), bg: toHex(s.backgroundColor),
        color: toHex(s.color), radius: s.borderTopLeftRadius, padding: s.padding, fontSize: s.fontSize, fontWeight: s.fontWeight };
    });

  // Variáveis CSS declaradas no :root
  const cssVars = {};
  const rootStyle = getComputedStyle(document.documentElement);
  for (let i = 0; i < rootStyle.length; i++) {
    const p = rootStyle[i];
    if (p.startsWith('--')) cssVars[p] = rootStyle.getPropertyValue(p).trim();
  }

  const q = (s) => document.querySelectorAll(s);
  const meta = (n) => document.querySelector(`meta[name="${n}"], meta[property="${n}"]`)?.content || null;
  const imgs = [...q('img')];

  return {
    title: document.title,
    meta: { description: meta('description'), ogTitle: meta('og:title'), ogImage: meta('og:image'), viewport: meta('viewport'),
      lang: document.documentElement.lang || null, canonical: document.querySelector('link[rel=canonical]')?.href || null },
    tokens: {
      colors: { text: top(textColors), background: top(bgColors), border: top(borderColors, 6) },
      typography: { families: top(fonts, 6), sizes: top(sizes, 14), weights: top(weights, 6), lineHeights: top(lineHeights, 6), elements: headingStyles },
      spacing: top(spacing, 16),
      radii: top(radii, 8),
      shadows: top(shadows, 5),
      containerWidths: top(maxWidths, 5),
      cssVariables: Object.fromEntries(Object.entries(cssVars).slice(0, 150)),
    },
    structure: {
      headings: [...q('h1, h2, h3')].filter((e) => e.textContent.trim()).slice(0, 40)
        .map((e) => ({ tag: e.tagName.toLowerCase(), text: e.textContent.trim().replace(/\s+/g, ' ').slice(0, 100) })),
      landmarks: [...q('header, nav, main, section, footer, aside')].length,
      sections: [...q('main > *, section, body > div > *')].filter((e) => e.getBoundingClientRect().height > 120).length,
      navLinks: [...q('header a, nav a')].map((a) => a.textContent.trim()).filter(Boolean).slice(0, 30),
      ctas,
      forms: q('form').length,
      searchInputs: q('input[type=search], input[name*=search i], input[placeholder*=pesquis i], input[placeholder*=search i], input[placeholder*=busc i]').length,
      images: imgs.length,
      imagesWithoutAlt: imgs.filter((i) => !i.hasAttribute('alt')).length,
      lazyImages: imgs.filter((i) => i.loading === 'lazy').length,
      links: q('a[href]').length,
      pageHeight: document.documentElement.scrollHeight,
    },
    accessibility: { textElements: textEls, lowContrastSamples: lowContrast },
  };
}

async function perfMetrics(page) {
  return page.evaluate(() => new Promise((resolve) => {
    let lcp = null;
    try {
      new PerformanceObserver((l) => { const e = l.getEntries(); lcp = e[e.length - 1]?.startTime ?? lcp; })
        .observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {}
    setTimeout(() => {
      const nav = performance.getEntriesByType('navigation')[0] || {};
      const res = performance.getEntriesByType('resource');
      const bytes = res.reduce((s, r) => s + (r.transferSize || 0), 0) + (nav.transferSize || 0);
      const byType = {};
      for (const r of res) byType[r.initiatorType] = (byType[r.initiatorType] || 0) + 1;
      resolve({
        ttfbMs: Math.round(nav.responseStart || 0),
        domContentLoadedMs: Math.round(nav.domContentLoadedEventEnd || 0),
        loadMs: Math.round(nav.loadEventEnd || 0),
        lcpMs: lcp ? Math.round(lcp) : null,
        requests: res.length + 1,
        transferKB: Math.round(bytes / 1024),
        requestsByType: byType,
      });
    }, 1500);
  }));
}

async function analyze(browser, url, dir) {
  const id = slug(url);
  console.log(`→ ${url}`);
  const result = { url, id, analyzedAt: new Date().toISOString(), screenshots: {} };

  // Desktop
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'pt-BR',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36' });
  const page = await ctx.newPage();
  try {
    const resp = await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    result.status = resp?.status() ?? null;
    if (result.status >= 400) throw new Error(`HTTP ${result.status} (site bloqueou o acesso ou página não existe)`);
    await page.waitForTimeout(2000);
    result.performance = await perfMetrics(page);
    result.screenshots.desktop = `${id}-desktop.png`;
    await page.screenshot({ path: path.join(dir, result.screenshots.desktop) });
    // Rola a página para carregar conteúdo lazy e capturar a dobra seguinte
    for (let y = 900; y <= 2700; y += 900) { await page.mouse.wheel(0, 900); await page.waitForTimeout(600); }
    result.screenshots.desktopScroll = `${id}-desktop-scroll.png`;
    await page.screenshot({ path: path.join(dir, result.screenshots.desktopScroll) });
    await page.evaluate(() => window.scrollTo(0, 0));
    Object.assign(result, await page.evaluate(extractInPage));
  } catch (e) {
    const msg = e.message.split('\n')[0];
    result.error = /TUNNEL_CONNECTION_FAILED|ERR_PROXY/.test(msg)
      ? 'acesso bloqueado pela rede/proxy deste ambiente' : msg;
  } finally {
    await ctx.close();
  }

  // Mobile
  if (!result.error) {
    const m = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'pt-BR' });
    const mp = await m.newPage();
    try {
      await mp.goto(url, { waitUntil: 'load', timeout: 60000 });
      await mp.waitForTimeout(1500);
      result.screenshots.mobile = `${id}-mobile.png`;
      await mp.screenshot({ path: path.join(dir, result.screenshots.mobile) });
      result.mobile = await mp.evaluate(() => ({
        horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        bodyFontSize: getComputedStyle(document.body).fontSize,
        smallTapTargets: [...document.querySelectorAll('a, button')].filter((e) => {
          const r = e.getBoundingClientRect(); return r.width > 0 && r.top < 844 && (r.height < 32 || r.width < 32);
        }).length,
      }));
    } catch (e) {
      result.mobile = { error: e.message.split('\n')[0] };
    } finally {
      await m.close();
    }
  }
  console.log(result.error ? `  ✗ ${result.error}` : `  ✓ ${result.title}`);
  return result;
}

await fs.mkdir(outDir, { recursive: true });
const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: '<-loopback>,localhost,127.0.0.1' } : undefined;
const browser = await chromium.launch({ proxy });
const results = [];
for (const url of urls) results.push(await analyze(browser, url, outDir));
await browser.close();

await fs.writeFile(path.join(outDir, 'analysis.json'), JSON.stringify(results, null, 2));
console.log(`\nRelatório salvo em ${path.relative(process.cwd(), outDir)}/analysis.json`);
