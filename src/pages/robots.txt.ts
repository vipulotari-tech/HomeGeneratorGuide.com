import type { APIRoute } from 'astro';
import { IS_INDEXABLE, SITE_URL } from '../config/site';

// A separate static build is produced for production and staging. Staging is
// explicitly blocked and carries noindex/nofollow metadata on every HTML page;
// production is crawlable and advertises its own sitemap only.
export const prerender = true;

const robotsText = IS_INDEXABLE
  ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap-index.xml\n`
  : 'User-agent: *\nDisallow: /\n';

export const GET: APIRoute = () => new Response(robotsText, {
  headers: { 'Content-Type': 'text/plain; charset=utf-8' },
});
