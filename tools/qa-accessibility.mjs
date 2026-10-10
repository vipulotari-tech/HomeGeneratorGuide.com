import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const base = process.env.BASE_URL ?? 'http://127.0.0.1:8321';
const routes = fs.readdirSync('dist', { recursive: true }).filter(f => f.endsWith('index.html'))
  .map(f => '/' + f.replaceAll('\\', '/').replace(/index\.html$/, '')).sort();
const browser = await chromium.launch({ headless: true });
const results = [];
fs.mkdirSync('.qa', { recursive: true });
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: 'networkidle' });
    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    results.push({ route, width: 390, violations: violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) })) });
    if (results.length % 20 === 0) console.log(`Accessibility ${results.length}/${routes.length} mobile routes`);
  }
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: `.qa/home-${width}.png`, fullPage: true });
    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    results.push({ route: '/', width, violations: violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) })) });
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches), true);
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 900 } });
  const fallback = await noJs.newPage();
  await fallback.goto(base + '/');
  assert(await fallback.locator('#mobile-nav').isVisible(), 'No-JS mobile navigation');
  assert.equal(await fallback.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'No-JS overflow');
  await noJs.close();
} finally {
  await browser.close();
  fs.writeFileSync('.qa/accessibility-all.json', JSON.stringify(results, null, 2));
}
const failures = results.filter(r => r.violations.length);
assert.equal(failures.length, 0, JSON.stringify(failures));
console.log(`Accessibility PASS: ${routes.length} mobile routes, 320/1440px homepage, no-JS navigation; automated axe checks only.`);
