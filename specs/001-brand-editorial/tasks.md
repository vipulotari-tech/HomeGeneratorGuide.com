# Tasks: Brand and editorial foundation

## Phase 1: Setup

- [x] T001 Inspect existing routes, trust claims, author evidence, styles, and hooks in src/, .specify/, and .opencode/.
- [x] T002 Record validated requirements and research in specs/001-brand-editorial/spec.md and research.md.

## Phase 2: Foundation

- [x] T003 Centralize exact mission, promise, tagline, independence, and pending review in src/config/site.ts.
- [x] T004 Add the six exact colors and accessible semantic styles in src/styles/global.css; replace legacy color literals across src/.

## Phase 3: US1 - Homeowner mission

**Independent check**: Exact mission is visible; first-time buyers can reach guides without sales pressure.

- [x] T005 [US1] Update homeowner-first copy and starting links in src/pages/index.astro and src/pages/about.astro.
- [x] T006 [US1] Publish exact mission and promise in src/components/layout/Footer.astro and public/500.html.

## Phase 4: US2 - Honest editorial trust

**Independent check**: Every article names its author, retains sources, and labels pending licensed review.

- [x] T007 [US2] Publish review/sourcing/independence standards and official references in src/pages/editorial-policy.astro and EDITORIAL.md.
- [x] T008 [US2] Reconcile funding and privacy language in src/pages/affiliate-disclosure.astro, src/pages/privacy-policy.astro, README.md, and public/llms.txt.
- [x] T009 [US2] Add pending review status to src/layouts/ArticleLayout.astro and src/components/article/AuthorBox.astro; point publisher metadata to public/logo.svg.

## Phase 5: US3 - Brand identity

**Independent check**: Logo, tagline, and navigation fit at narrow widths; favicon reads at 16px.

- [x] T010 [P] [US3] Export navy house/bolt mark, full logo, and favicon in public/brand-mark.svg, public/logo.svg, and public/favicon.svg.
- [x] T011 [US3] Share logo markup in src/components/layout/BrandLogo.astro, Header.astro, and Footer.astro; preserve accessible menu behavior.
- [x] T012 [US3] Update theme metadata and design guidance in src/layouts/BaseLayout.astro, DESIGN.md, and .21st/.

## Phase 6: Validation

- [x] T013 Add one runnable exact-copy/review/asset/contrast contract check in tools/qa-brand.py.
- [x] T014 Run production build, TypeScript, brand contract, existing schema/link QA, 21st review, and responsive browser checks; record results in specs/001-brand-editorial/tasks.md. Build and typecheck passed; brand contract passed for 46 pages and 28 articles; link QA found no broken links or duplicate titles; browser smoke passed 12 page/viewports.

## Dependencies and execution

T001–T004 establish context and tokens. US1 and US2 use the shared configuration. T010 can be prepared independently of editorial copy; T011 follows T010 and T003. Validation follows all implementation tasks. Separate policy and logo assets could be worked on concurrently, but this implementation keeps edits sequential to avoid shared-layout conflicts. Ship the complete brand foundation, then validate all routes.
