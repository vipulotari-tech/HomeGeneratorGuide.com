import { createHash } from 'node:crypto';

export function inlineScriptHashes(html) {
  return [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(([, attributes, body]) => body.trim() && !/\bsrc\s*=|application\/(?:ld\+json|json)/i.test(attributes))
    .map(([, , body]) => `'sha256-${createHash('sha256').update(body).digest('base64')}'`);
}

export function securityPolicy(htmlPages) {
  const hashes = [...new Set(htmlPages.flatMap(inlineScriptHashes))].sort();
  // Style attributes support existing editorial diagrams; executable scripts
  // require a same-origin URL or an exact build-generated hash (no unsafe-inline).
  return [
    "default-src 'self'",
    `script-src 'self' ${hashes.join(' ')}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "base-uri 'none'",
    "object-src 'none'",
    "frame-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self' mailto:",
  ].join('; ');
}
