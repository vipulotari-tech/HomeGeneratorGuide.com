import type { APIRoute } from 'astro';

// Server-rendered (the site's only dynamic route) so Astro bundles the
// edge middleware. Apex + www: crawlable with sitemap reference.
// Everywhere else (staging, previews, localhost): fully disallowed.
export const prerender = false;

const APEX = 'homegeneratorguide.com';

export const GET: APIRoute = ({ url }) => {
  const production =
    url.hostname === APEX || url.hostname === `www.${APEX}`;
  const body = production
    ? `User-agent: *\nAllow: /\n\nSitemap: https://${APEX}/sitemap-index.xml\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
