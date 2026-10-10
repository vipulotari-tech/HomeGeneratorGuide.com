import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { inlineScriptHashes } from './security-policy.mjs';

const headers = fs.readFileSync('dist/_headers', 'utf8');
const policy = headers.match(/Content-Security-Policy: (.+)/)?.[1];
assert(policy, 'Missing CSP');
assert(!/script-src[^;]*'unsafe-(?:inline|eval)'/.test(policy), 'Unsafe executable script policy');
for (const required of ["base-uri 'none'", "object-src 'none'", "frame-ancestors 'none'", "form-action 'self' mailto:"]) assert(policy.includes(required), required);
assert.match(headers, /Strict-Transport-Security: max-age=31536000/);
assert.match(headers, /X-Frame-Options: DENY/);
assert(headers.split(/\r?\n/).every(line => line.length <= 2000), 'Cloudflare header line limit');

const files = fs.readdirSync('dist', { recursive: true }).filter(file => fs.statSync('dist/' + file).isFile());
let htmlPages = 0;
for (const file of files) {
  assert(!/(?:^|[\\/])(?:\.env(?:\..*)?|\.git|node_modules|\.dev\.vars.*)$|\.map$/i.test(file), 'Private artifact in build: ' + file);
  if (!file.endsWith('.html')) continue;
  htmlPages++;
  const html = fs.readFileSync('dist/' + file, 'utf8');
  for (const hash of inlineScriptHashes(html)) assert(policy.includes(hash), 'CSP blocks script in ' + file);
  assert(!/<[^>]+\son(?:click|load|error|submit)\s*=/i.test(html), 'Inline event handler in ' + file);
  assert(!/\b(?:href|src)="javascript:/i.test(html), 'Executable URL in ' + file);
}

// Report filenames only; never echo a matching secret value to CI logs.
const tracked = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{60,}|AKIA[A-Z0-9]{16})\b/,
  /\b(?:sk_live|rk_live)_[A-Za-z0-9]{20,}\b/,
];
let scanned = 0;
for (const file of tracked) {
  assert(!/^(?:\.env(?:\..*)?|\.dev\.vars.*)$/.test(file) || file.endsWith('.example'), 'Tracked environment secret file: ' + file);
  if (!fs.existsSync(file) || !/\.(?:astro|[cm]?[jt]s|jsonc?|ya?ml|md|txt|toml|html|css)$/.test(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  for (const pattern of secretPatterns) assert(!pattern.test(content), 'Potential credential in ' + file);
  scanned++;
}
fs.mkdirSync('.qa', { recursive: true });
const report = { result: 'PASS', htmlPages, trackedTextFilesScanned: scanned, note: 'Pattern scan of tracked working tree; not a guarantee against all secrets or a history scan.' };
fs.writeFileSync('.qa/security.json', JSON.stringify(report, null, 2));
console.log('Security assertions PASS', report);
