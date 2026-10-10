import fs from 'node:fs';

// Availability only, not a certification that each source substantiates a claim.
const links = new Map();
for (const file of fs.readdirSync('dist', { recursive: true }).filter(f => f.endsWith('.html'))) {
  const html = fs.readFileSync('dist/' + file, 'utf8');
  for (const [, href] of html.matchAll(/<a\b[^>]*href="(https?:\/\/[^\"]+)"/g)) {
    const url = href.replaceAll('&amp;', '&').split('#')[0];
    if (/^https:\/\/(?:www\.)?(?:standbygeneratorguide|homegeneratorguide)\.com(?:\/|$)/.test(url)) continue;
    if (!links.has(url)) links.set(url, []);
    links.get(url).push(file.replaceAll('\\', '/'));
  }
}
const entries = [...links];
const results = [];
let next = 0;
async function check(url) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(20000), headers: { 'User-Agent': 'StandbyGeneratorGuide-LinkAudit/1.0' } });
    await response.body?.cancel();
    return { status: response.status, finalUrl: response.url, classification: response.ok ? 'available' : [404, 410].includes(response.status) ? 'broken' : 'unverified' };
  } catch (error) { return { status: null, classification: 'unverified', error: error.cause?.code ?? error.name }; }
}
await Promise.all(Array.from({ length: 6 }, async () => {
  while (next < entries.length) {
    const [url, pages] = entries[next++];
    let result = await check(url);
    if (result.classification === 'broken') result = await check(url);
    results.push({ url, pages: [...new Set(pages)], ...result });
    if (results.length % 20 === 0) console.log(`External URLs checked: ${results.length}/${entries.length}`);
  }
}));
const summary = results.reduce((counts, r) => ({ ...counts, [r.classification]: (counts[r.classification] ?? 0) + 1 }), {});
fs.mkdirSync('.qa', { recursive: true });
fs.writeFileSync('.qa/external-links.json', JSON.stringify({ checkedAt: new Date().toISOString(), summary, results }, null, 2));
console.log('External availability', summary);
for (const result of results.filter(r => r.classification === 'broken')) console.log('Broken citation', result.url, result.status);
if (summary.broken) process.exitCode = 1;
