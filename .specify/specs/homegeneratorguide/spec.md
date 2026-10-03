# Feature Specification: HomeGeneratorGuide.com Production Build

**Created**: 2026-10-03
**Status**: Active
**Input**: Master production build prompt

## User Scenarios

### US1 - Homeowner researches generator size (P1)
Homeowner with frequent outages wants to know what size standby generator they need.
**Test**: Visit /sizing/what-size-generator-do-i-need/, find running vs starting watts explanation, worked example, appliance table, FAQ.
**Acceptance**: 2000+ useful words intent coverage, no square-footage-only advice, licensed-pro recommendation, internal links.

### US2 - Homeowner researches cost (P1)
Homeowner wants total installed cost before calling installers.
**Test**: Visit /cost/standby-generator-cost/, find equipment/install/permit/fuel/maintenance breakdown + disclaimer + quote-comparison checklist.
**Acceptance**: Mandatory price disclaimer present, ranges labeled estimates, no fabricated state costs.

### US3 - Homeowner compares brands (P1)
Homeowner narrows to Generac vs Kohler.
**Test**: Visit /comparisons/generac-vs-kohler/, find neutral criteria table, no invented universal winner.
**Acceptance**: Situation-based conclusion, warranty/noise/fuel/monitoring/dealer coverage.

### US4 - Trust verification (P1)
Cautious buyer checks independence before trusting content.
**Test**: Visit About, Editorial Policy, Disclaimer, Privacy, Affiliate Disclosure, Contact from footer.
**Acceptance**: All pages real, no fake authors/credentials/testimonials, independence statement in footer.

### US5 - Mobile navigation + performance (P2)
Mobile user on 360px navigates all hubs with keyboard/touch.
**Test**: Header menu, breadcrumbs, TOC, tables scroll, focus visible.
**Acceptance**: Touch targets >=44px, semantic landmarks, 90+ Lighthouse target architecture (static, minimal JS).

## Functional Requirements
- FR1: Astro static output, sitemap, canonical https://homegeneratorguide.com/, robots.txt with sitemap ref.
- FR2: Header/Footer/Breadcrumbs/ArticleCard/TOC/AuthorBox/RelatedArticles/ComparisonTable/FAQSection/AlertBox/ProConBox/StatBox/AdUnit components.
- FR3: BaseLayout (SEO meta, OG/Twitter, WebSite schema), ArticleLayout (Article+Breadcrumb schema, dates, TOC, related), CategoryLayout.
- FR4: Homepage hero + value bar + popular guides + why + categories + latest guides.
- FR5: 5 priority articles (sizing, cost, generac-vs-kohler, generac brand, maintenance checklist).
- FR6: 7 category hubs (sizing, cost, brands, comparisons, installation, maintenance, guides) with no thin indexable placeholders.
- FR7: Typed data files appliance-wattage, generator-brands, state-costs (no fabricated state data).
- FR8: No DB/auth/backend; GA4 placeholder only; AdUnit placeholders only, no live publisher ID.
- FR9: DESIGN.md tokens applied; Tailwind v4 `@import "tailwindcss"` + `@theme`.
- FR10: Safety: no DIY electrical/gas instructions; licensed-pro CTAs; disclaimers.

## Non-functional
- Static, minimal JS (only menu + FAQ disclosure), images with alt+dims, lazy below fold.
- A11y: landmarks, headings order, focus states, table headers, alt, labels.
- SEO: unique titles/descriptions, canonicals, breadcrumbs, internal linking, valid schema only.

## Acceptance (Definition of Done subset)
- `npm run build` succeeds, no TS errors.
- No lorem ipsum, no fake reviews/credentials/stats.
- robots.txt + sitemap correct; thin pages noindex or unpublished.
