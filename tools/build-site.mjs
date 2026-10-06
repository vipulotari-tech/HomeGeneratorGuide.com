import { spawnSync } from 'node:child_process';
import { readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const environment = process.argv[2] ?? 'production';
if (!['production', 'staging'].includes(environment)) {
  console.error('Usage: node tools/build-site.mjs <production|staging>');
  process.exit(2);
}

const evidence = spawnSync(process.execPath, ['tools/validate-evidence.mjs'], {stdio:'inherit'});
if(evidence.status!==0) process.exit(evidence.status??1);

const astroCli = resolve('node_modules/astro/bin/astro.mjs');
const result = spawnSync(process.execPath, [astroCli, 'build'], {
  stdio: 'inherit',
  env: { ...process.env, PUBLIC_SITE_ENV: environment },
});

if (result.error) {
  console.error(result.error);
  process.exit(1);
}
if (result.status !== 0) process.exit(result.status ?? 1);

// Staging should not publish a crawlable sitemap; production keeps Astro's
// generated sitemap index and child files for its indexable robots.txt.
if (environment === 'staging') {
  for (const file of readdirSync(resolve('dist'))) {
    if (/^sitemap(?:-.*)?\.xml$/i.test(file)) rmSync(resolve('dist', file));
  }
}

// Static host header files are deployment-specific. Add staging's response-
// level noindex directive to the existing global rule instead of creating a
// second wildcard rule that some static hosts may parse inconsistently.
const headersPath = resolve('dist/_headers');
const baseHeaders = readFileSync(resolve('public/_headers'), 'utf8').trimEnd();
let outputHeaders = baseHeaders;
if (environment === 'staging') {
  const globalRule = /^\/\*$/m;
  if (!globalRule.test(baseHeaders)) {
    throw new Error('Expected a global /* rule in public/_headers for the staging noindex header.');
  }
  outputHeaders = baseHeaders.replace(globalRule, '/*\n  X-Robots-Tag: noindex, nofollow');
}
writeFileSync(headersPath, `${outputHeaders.trimEnd()}\n`, 'utf8');
console.log(`Built ${environment} output; robots metadata and canonical origin are environment-specific.`);
