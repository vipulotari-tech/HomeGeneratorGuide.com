import fs from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';

// Ahrefs screenshots provided October 8, 2026: buckets, not exact traffic totals.
// Each intent has exactly one primary landing page; related variants share that page.
const primary = [
  { intent: 'whole house generator', route: '/', inTitle: 'whole house generator', inH1: 'whole house generator' },
  { intent: 'whole house generator cost', route: '/cost/standby-generator-cost/', inTitle: 'whole house generator cost', inH1: 'whole house generator cost' },
  { intent: 'whole house generator sizing', route: '/sizing/what-size-generator-do-i-need/', inTitle: 'whole house generator sizing', inH1: 'whole house generator sizing' },
  { intent: 'whole house generator installation', route: '/installation/what-to-expect/', inTitle: 'whole house generator installation', inH1: 'whole house generator installation' },
  { intent: 'best whole house generator', route: '/comparisons/five-brand-standby-generator-comparison/', inTitle: 'best whole house generator', inH1: 'best whole house generator' },
  { intent: 'kohler whole house generator', route: '/brands/kohler/', inTitle: 'kohler whole house generator', inH1: 'kohler whole house generator' },
  { intent: 'generac vs kohler whole house generator', route: '/comparisons/generac-vs-kohler/', inTitle: 'generac vs kohler', inH1: 'generac vs kohler' },
];
const dist = 'dist';
const read = (route) => {
  const file = path.join(dist, route.replace(/^\//, ''), 'index.html');
  return fs.readFileSync(file, 'utf8');
};
const homepage = read('/');
const cleaned = (s) => s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').toLowerCase();
for (const { intent, route, inTitle, inH1 } of primary) {
  const html = read(route);
  const title = cleaned(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  assert.equal(h1s.length, 1, 'Expected exactly one H1 for '+route);
  assert(title.includes(inTitle), 'Keyword not in title for '+intent);
  assert(cleaned(h1s[0][1]).includes(inH1), 'Keyword not in H1 for '+intent);
  assert(html.includes('content="index, follow"'), 'Non-indexable production landing page '+route);
  if (route !== '/') assert(homepage.includes('href="'+route+'"') || read('/comparisons/').includes('href="'+route+'"'), 'No homepage/comparison-hub discovery link to '+route);
}
for (const route of ['/cost/', '/sizing/', '/installation/', '/brands/', '/comparisons/', '/guides/']) {
  const html = read(route);
  assert(html.includes('BreadcrumbList'), 'Missing breadcrumb structured data for '+route);
  assert(html.includes('CollectionPage'), 'Missing collection structured data for '+route);
}
assert(read('/cost/').includes('href="/cost/installation-cost-breakdown/"'), 'Cost hub must connect installation cost.');
assert(read('/guides/').includes('href="/comparisons/five-brand-standby-generator-comparison/"'), 'Buying guides must link to best comparison.');
assert(!homepage.includes('best whole house generator 2025'), 'Do not target stale best-of intent.');
const report = { result: 'PASS', landingPages: primary.length, collectionHubs: 6, keywordData: 'Ahrefs user-provided screenshots 2026-10-08', searchVolumes: 'thresholds only' };
fs.mkdirSync('.qa', { recursive: true });
fs.writeFileSync('.qa/keyword-clusters.json', JSON.stringify(report, null, 2));
console.log('Keyword intent mapping QA PASS', report);
