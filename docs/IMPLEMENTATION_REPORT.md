# HomeGeneratorGuide implementation and launch review

Implementation: October 5, 2026. This is an editorial and engineering report, not licensed professional approval. See the repository history for the exact tested and merged revision.

## Baseline audit

The initial checkout was `0f8f6b4`. It built 65 pages, contained nine model records and exposed seven exact-model pages. The homepage, navigation, footer, route inventory, layouts, model registry, article dates/sources, static guides, policy pages, build configuration and CI were inspected before edits. Live homepage inspection showed the older author identity. The latest baseline CI failure was mobile overflow on the editorial-team heading.

Strengths preserved: exact-model comparison, manufacturer versus independent-evidence distinction, fuel-specific output, quote normalization, maintenance/manual scope, safety disclaimers, noise conditions, warranty limitations and source dates. Existing articles and routes were retained rather than replaced by generic SEO copy. No database, external paid runtime API, account system or hands-on testing claim was added.

During implementation, `main` advanced to `923f780`, adding Champion research, the 201614 configuration and mobile fixes (ten records/eight model routes). Those updates were merged. The expanded registry retains the same Champion package but records the product page's conflicting 67/68 dB(A) statements instead of selecting one number. Family warranty material remains identified as context where exact-package applicability has not been established.

## What changed

- Repositioned homepage around seven homeowner decisions; added prominent sizing, quotes, installed-cost, brand and model entry points.
- Replaced the repeated footer mission blocks with four useful editorial navigation groups. Restrained dark-green/neutral palette, serif display type, locally available fonts and clear data surfaces.
- Added a static planning hub and four optional browser tools: load scenarios, three quotes, natural gas/propane, and ownership costs.
- Expanded to **31 exact configurations and 31 public model pages**, spanning Generac, KOHLER/Rehlko, Champion, Briggs & Stratton and Cummins. Configuration count includes documented ATS bundles; it is not 31 independently engineered generator platforms.
- Shared JSON registry serves models, brand tables, comparisons and fuel presets. Field-source maps, missing fields, dated sources and conflict notes remain visible.
- Six trust components: ExpertReviewBadge, TechnicalReviewPanel, SourceVerificationPanel, LastReviewed, FactTypeBadge and EditorialStatus. Reviewer and review registries remain empty. No person, credential, license or completed review was invented.
- Added ATS/load-management guide; selective and whole-panel system diagrams; sizing, fuel-path and ownership diagrams; selected manual-specific maintenance matrices and printable log.
- Added four pair comparisons: Generac/Champion, KOHLER/Champion, Briggs/Generac and Cummins/Generac. Preserved and corrected existing Generac/KOHLER, five-brand, noise and warranty research.
- Added source policy, dated research updates, one official Fairfax County permit starting point, local-authority data architecture and future quote-intake schema. **Zero genuine homeowner quotes are claimed.** No upload endpoint is active.
- Fixed stale contact attribution/link and narrow-screen overflow; collapsed repeated methodology details while keeping review-pending status visible.

## Tool behavior and limitations

| Tool | Implemented | Important limits |
|---|---|---|
| Load planning | 23 common/custom load categories; user/nameplate watts, total start watts, quantity, essential/optional, managed flag, priority; all-load, essential and managed scenarios; contributors and rounded range | No square-foot sizing or automatic model recommendation. The managed scenario permits one managed row at a time. Priority is a recorded preference, not controller simulation. Starting kVA, power factor, voltage dip, site derating and simultaneous different motor starts need professional assessment. |
| Three quotes | Three equipment/term columns, 20 scope lines, unknown/included/excluded/allowance/not-applicable states, incremental adjustments, missing-scope warnings, comparison results and print | Cannot verify equivalence, installer skill or warranty enforceability. No automatic cheapest-is-best result. Allowance adjustments are incremental top-ups, not the full allowance counted twice. |
| Fuel | Exact supported manufacturer test points or documented custom rates; local $/therm and $/gallon; hours, maintenance, tank inventory and reserve; event, annual, 5/10-year and inventory runtime | No interpolation or automatic scaling by generator size. Test conditions remain visible. Inventory runtime is not a vaporization or supply-capacity guarantee; exercise and new fixed fees are excluded. |
| Ownership | Itemized capital, annual and periodic inputs; 5/10/15-year nominal totals and annualized costs | Constant prices, no financing or discounted value. Repair reserve is an assumption; battery events include an event exactly at the horizon. Bundled scope must only be counted once. |

All four tools support optional browser-only save/load/delete, reset, print/PDF, native validation and escaped text rendering. Browser storage is neither private on a shared device nor a submission to the planned quote database.

## Evidence decisions

See [MODEL_EVIDENCE_GAPS.md](MODEL_EVIDENCE_GAPS.md) for all 31 records and [SOURCE_CHECK_MANIFEST.json](SOURCE_CHECK_MANIFEST.json) for retrieved source URLs/hashes.

- Generac 10 kW natural-gas rating, weight and disputed engine naming were withheld where the official product page conflicts with its specification sheet.
- Champion 26 kW packages have no single asserted sound number because their product descriptions and tables disagree.
- KOHLER 26RCA ATS inclusion remains unresolved; both 26RCA/26RCAL weights are withheld because current product pages and G4-315 disagree.
- Cummins RS13A/RS17A/RS20A retain generic standby ratings and explicit missing fuel-specific specifications. Related-product cards were not treated as the selected model's specifications.
- Full warranty contracts, exclusions, hour limits for many models, accessory/monitoring terms and package details remain incompletely verified. No certification is presented as independently validated.
- Maintenance coverage is limited to the reviewed Generac manual and KOHLER 14/20/26RCA(L) schedules. Champion, Briggs and Cummins interval matrices were intentionally not published without verified applicable manuals.
- No universal local setbacks, nationwide permit rules, invented installed-cost submissions, reliability rankings or field-test results were published.

## Professional review still needed

A real qualified reviewer should assess the load/start methodology, ATS/disconnect explanations, control failure and sequencing behavior, electrical/fuel safety, placement and carbon monoxide guidance, cold-weather fuel limitations and manual-specific maintenance interpretation. Verify identity, credential/license where applicable, state, verification URL, specialty, affiliations, reviewed pages, scope, review date and exact revision before changing any pending status. A general credential does not approve all articles or site-specific designs.

## SEO, access and performance

Static Astro HTML remains the crawlable source. Production uses self-canonicals and an indexable sitemap; staging retains noindex/nofollow, disallow robots and no public sitemap. Existing Article, Organization and breadcrumb schema were retained; no Review/AggregateRating schema was added. HTML auditing checks metadata uniqueness, canonical origin, internal links and anchors, sitemap membership, image alt attributes and parsable JSON-LD.

Mobile results use labeled table rows; forms use native labels, fieldsets and 46-pixel controls. The header switches to the mobile menu below the wider desktop breakpoint. Diagrams have text alternatives and mobile presentations. Automated accessibility results are not a full WCAG conformance certification or a substitute for assistive-technology user testing.

Astro only sends planner JavaScript where interactive planners are present; no framework hydration or animation dependency was added. Performance observations are local lab results, not field Core Web Vitals. See the final test results below.

## Remaining launch conditions and candid evaluation

The public production-domain launch is deliberately separate from updating the existing noindex staging Worker. Before claiming the 9.5+ target: complete professional review of safety-sensitive material and calculations, resolve or keep visible manufacturer conflicts, expand manual/warranty evidence, and test with actual US homeowners and real proposals. Verified quote collection also needs a private secure backend, consent/retention process, redaction and staff-owned verification state before activation.

Provisional editorial assessment, not an independently measured score: trust 9.0/10, buying usefulness 9.0, technical clarity 8.9, quote comparison 9.1, design 9.0, mobile 9.2, source transparency 9.3; overall approximately **9.0/10**. The platform is materially more useful, but the evidence and professional-review gaps do not justify claiming the requested 9.5+ level yet.

## Test results

- Astro check: 0 errors / 0 warnings (unused-variable hints only); TypeScript check passed.
- Production and staging builds passed: 105 generated HTML pages including the 404; 104 indexable content routes in production.
- Production HTML audit: 6,642 internal link/anchor occurrences, 210 image elements with alt attributes, 92 parsable JSON-LD blocks, unique titles/descriptions, self-canonicals, sitemap coverage and robots checks passed.
- Browser crawl: all 104 content routes at 390 px, plus nine targeted viewport checks; no page overflow, broken generated-route links, console errors, or navigation/focus failures.
- Planner suite: 84 page/viewport combinations across 320, 360, 390, 430, 768, 1024 and 1440 px; all four calculation flows, blank/invalid values, save/reload/delete/reset, corrupted storage, text-injection safety and print behavior passed.
- Seven axe WCAG A/AA automated audits: zero violations on the tested homepage, four planners, model page and ATS guide. This does not establish full-site WCAG conformance.
- Hand-calculated load, fuel, ownership and quote-normalization cases passed, including invalid values and incomplete scope.
- Print PDF was rendered and visually inspected. White-on-white table headings were corrected and a print-color assertion added. Browser-generated PDF is not certified PDF/UA.
- Local unthrottled performance samples: CLS 0.000 on homepage, quote planner, fuel planner and model page. About 16 KB total gzip for generated JS/CSS assets; this excludes HTML and images. These are lab observations, not public-network or field Core Web Vitals.
- Evidence structure checks passed: 31 configurations across five manufacturers, with 204 explicit field-gap flags and eight conflict notes. Structural validation does not certify every claim or resolve manufacturer conflicts.
- Staging retains noindex/nofollow, Disallow robots, no sitemap and no production canonical. Production remains a separately selected build.

Deployment handoff: changes are prepared for the existing staging workflow via the GitHub branch/PR. The production-domain launch is not performed by this change. Consult the PR and final delivery message for the observed merge and staging status.
