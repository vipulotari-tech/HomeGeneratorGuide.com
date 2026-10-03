# Spec: Launch 9.5 — Authorship, Sources, Safety, Staging SEO

**Status**: Active | **Date**: 2026-10-03

## Goal
Lift HomeGeneratorGuide from ~9.0 to genuine 9.5/10 via trust/transparency/accuracy work. No mass pages, no fake authority, no redesign without evidence.

## In scope (P1)
1. Real author system (Vipul Otari, Publisher & Research Editor; no invented credentials) + profile page + article bylines + Person schema.
2. Article trust row: researched-by, published, updated, specs-verified, source count, reading time.
3. MethodBox component (compact research methodology) on articles.
4. Typed sources UI (Manufacturer/Government/Safety/Manual + verified dates); fix claim mismatches (maintenance sources → brand docs; Generac deep support URLs).
5. Safety 4-tier framing verified on all safety pages; primary sources adjacent to claims.
6. 3 original SVG diagrams (load management, propane tank gauge, warranty timeline).
7. Central `src/config/site.ts` (SITE_URL, ADS_ENABLED); AdUnit hidden when ads off.
8. Publisher logo PNG; Organization/Article logo wiring.
9. Dynamic robots already live — verify; www→apex via dashboard rule (documented).
10. QA: coverage/inbound/granular/schema/links + transfer-size audit + Playwright smoke; attempt measured Lighthouse.

## Out of scope
New article pages, redesigns, video, backlink outreach (post-launch), FAQ/HowTo schema, calorie-style ratings.

## Acceptance
- Build + tsc + all QA green; 0 broken links; 0 weak pages; 0 granular issues.
- No workers.dev in production metadata; no fake persons/credentials/reviews.
- Competitor re-score honest; 9.5 only on evidence.
