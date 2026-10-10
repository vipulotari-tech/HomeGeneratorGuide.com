// Cloudflare Pages Functions middleware (part of the Pages project, not a separate Worker).
//
// - https://standbygeneratorguide.pages.dev/* -> 301 to https://standbygeneratorguide.com/*
//   (same path + query). Prevents duplicate-content indexing of the Pages default domain
//   while keeping the custom production domain fully indexable.
// - Preview deployments (*.standbygeneratorguide.pages.dev, e.g. <hash>--) keep serving
//   with `X-Robots-Tag: noindex, nofollow` so deployment QA still works without indexing.
// - Custom domains (apex + www) pass through untouched: no global noindex, no redirect here
//   (www -> apex lives as a zone Redirect Rule, not in Pages).
//
// NOTE: `_headers` is path-only and cannot vary by hostname, so a global
// `X-Robots-Tag: noindex` there would wrongly deindex production. Hostname logic must live here.

const PRODUCTION_HOST = 'standbygeneratorguide.com';
const PAGES_DEFAULT_HOST = 'standbygeneratorguide.pages.dev';

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const hostname = url.hostname.toLowerCase();

  // Permanent redirect: Pages default domain -> production apex (preserve path + query).
  if (hostname === PAGES_DEFAULT_HOST) {
    url.protocol = 'https:';
    url.hostname = PRODUCTION_HOST;
    return Response.redirect(url.toString(), 301);
  }

  // Preview deployments: never index, never redirect (keeps hash-URL QA usable).
  // Cloudflare already adds noindex to preview URLs; set it explicitly as well.
  if (hostname.endsWith('.pages.dev')) {
    const response = await context.next();
    const headers = new Headers(response.headers);
    headers.set('X-Robots-Tag', 'noindex, nofollow');
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return context.next();
}
