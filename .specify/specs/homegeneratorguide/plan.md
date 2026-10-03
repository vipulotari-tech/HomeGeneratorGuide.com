# Implementation Plan: HomeGeneratorGuide.com

**Date**: 2026-10-03 | **Spec**: `.specify/specs/homegeneratorguide/spec.md`
**Stack**: Astro 5.x, @tailwindcss/vite 4.x, @astrojs/sitemap, @astrojs/mdx, TypeScript strict, static output.

## Technical Context (verified 2026-10-03 via Astro Docs MCP)
- Tailwind v4: `npm i tailwindcss @tailwindcss/vite`, vite plugin `tailwindcss()`, CSS `@import "tailwindcss"`, tokens via `@theme`. No `tailwind.config.js`, no `@astrojs/tailwind`.
- Sitemap: `@astrojs/sitemap`, requires `site: https://homegeneratorguide.com/` in astro.config.
- MDX: `@astrojs/mdx` integration for content flexibility (articles as .astro for full component control in MVP).
- Static: `output: 'static'`, no adapter (Netlify/Vercel static compatible).
- Fonts: system stack (no render-blocking Google Fonts) for performance.

## Architecture
- `src/layouts/BaseLayout.astro` — head/meta/canonical/OG/Twitter/sitemap link/GA4 placeholder/WebSite schema.
- `src/layouts/ArticleLayout.astro` — wraps Base, Article+Breadcrumb JSON-LD, header meta, 70/30 grid, TOC sidebar, AdUnits, AuthorBox, Related, prev/next.
- `src/layouts/CategoryLayout.astro` — wraps Base, hub header + card grid.
- Components: Header (sticky, mobile details/menu button minimal JS), Footer (3-col), Breadcrumbs (ol + schema hook), ArticleCard, TOC (anchor list), AuthorBox (editorial team, no fake person), RelatedArticles, ComparisonTable (div scroll wrapper + table), FAQSection (details/summary, no FAQ schema by default), AlertBox (4 tones), ProConBox, StatBox, AdUnit (placeholder with reserved min-height).
- Data: `appliance-wattage.ts` (Appliance[] ~28 rows, conservative ranges, source labels), `generator-brands.ts` (4 brands, models only where verifiable generically, sourceUrls), `state-costs.ts` (no fabricated numbers — methodology + cost-factor modifiers + quote guidance type).
- Pages: index, about, contact, privacy-policy, disclaimer, editorial-policy, affiliate-disclosure, 404 + 7 hubs + 5 priority articles + 6 supporting concise guides (sizing HVAC/well-pump/whole-home, cost installation/transfer-switch, brands kohler) marked substantial (>600 words) to avoid thin-indexable risk.

## SEO decisions (BeyondSEO + Claude SEO applied)
- Intent: sizing=cost=commercial-investigation+informational; comparison=neutral decision; brand=overview; maintenance=procedural (no HowTo schema — safety/eligibility risk, plain Article only).
- Schema: WebSite on home, Article+Breadcrumb on articles, no FAQPage/HowTo (Google restricts FAQ rich results; HowTo requires strict eligibility — omit).
- Canonical: `https://homegeneratorguide.com` non-www consistent; sitemap-index linked in head + robots.txt.
- Internal linking: contextual links per article (3-8), hubs interlink clusters.
- Titles/descriptions unique, ~50-60 / 150-160 chars, year only where verified-2026 (sizing/cost updated 2026 methodology — use "2026" in title only for cost page which states estimates methodology; others avoid year to prevent stale-year risk).

## AdSense readiness (auditor requirements applied)
- Placeholders labeled "Advertisement", neutral, reserved heights (280/300px article, 250px sidebar), no ads near nav controls, no sticky/disruptive, density max 3/article.
- Trust pages real, privacy discloses Google cookies/ads, disclaimer covers safety/estimates/affiliate, contact has form (mailto + form labels, no backend — mailto + disclosure).

## Ponytail + Web Design Guidelines + DESIGN.md
- Tokens: navy #1e3a5f primary, orange #f97316 accent, bg #fff, text #1f2937, muted #f9fafb, border #e5e7eb; Inter fallback system stack.
- Mobile-first, 70/30 article grid collapsing to single, tables horizontally scrollable, focus-visible rings, 44px targets, reduced-motion media query.
- Review gates after build: Ponytail UI audit, WDG semantic/a11y pass, Claude SEO technical pass, BeyondSEO topical pass, AdSense checklist pass.

## Tasks (see tasks.md)
1. Foundation (config, styles, DESIGN.md)
2. Components (13)
3. Layouts (3)
4. Data (3)
5. Trust pages (8 incl 404)
6. Hubs (7)
7. Priority articles (5)
8. Supporting articles (6 concise)
9. Technical SEO (robots, sitemap verify, canonicals)
10. QA (build, tsc, link check, a11y/responsive spot, reviews)
