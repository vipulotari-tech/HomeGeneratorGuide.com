import type { APIRoute } from 'astro';
import { SITE_URL } from '../config/site';

// Server-rendered (the site's only dynamic route) so Astro bundles the
// edge middleware. Apex + www: crawlable with sitemap reference.
// Everywhere else (staging, previews, localhost): fully disallowed.
export const prerender = false;

const APEX_HOST = 'homegeneratorguide.com';

export const GET: APIRoute = ({ url }) => {
  const production =
    url.hostname === APEX_HOST || url.hostname === `www.${APEX_HOST}`;
  const body = production
    ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap-index.xml\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
