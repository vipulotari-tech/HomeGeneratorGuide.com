import assert from 'node:assert/strict';
import { test } from 'node:test';
import redirect from '../workers/www-redirect.mjs';
import { inlineScriptHashes, securityPolicy } from './security-policy.mjs';

test('www redirects HTTP and HTTPS to fixed HTTPS apex preserving path and query', () => {
  for (const origin of ['http://www.homegeneratorguide.com', 'https://www.homegeneratorguide.com', 'http://localhost:8322']) {
    const response = redirect.fetch(new Request(origin + '/cost/standby-generator-cost/?utm_source=mail&x=%2F'));
    assert.equal(response.status, 301);
    assert.equal(response.headers.get('location'), 'https://homegeneratorguide.com/cost/standby-generator-cost/?utm_source=mail&x=%2F');
  }
});
test('redirect cannot use a user-controlled destination', () => {
  const response = redirect.fetch(new Request('https://www.homegeneratorguide.com//evil.example/path?next=https://evil.example'));
  assert.equal(new URL(response.headers.get('location')).origin, 'https://homegeneratorguide.com');
});
test('CSP permits only exact executable inline content and deduplicates hashes', () => {
  const html = '<script type="module">console.log("trusted")</script><script type="application/ld+json">{"name":"Site"}</script>';
  const [hash] = inlineScriptHashes(html);
  const policy = securityPolicy([html, html]);
  assert.equal(policy.split(hash).length - 1, 1);
  assert.notEqual(inlineScriptHashes('<script>console.log("changed")</script>')[0], hash);
  assert.equal(inlineScriptHashes('<script src="/app.js"></script>').length, 0);
  assert(!policy.match(/script-src[^;]*unsafe-/));
  assert(policy.includes("frame-ancestors 'none'"));
});
