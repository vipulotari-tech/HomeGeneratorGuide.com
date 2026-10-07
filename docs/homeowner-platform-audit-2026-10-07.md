# Homeowner platform audit and implementation — 2026-10-07

Base: `3cb4b676d6548cce07df0dc2efd584386f6cb194`. Changes extend existing Astro routes, registry, planners and QA. No replacement site or duplicated calculator.

## Evidence-based gap matrix (before this change)

| Feature | Generators.guide observed | HGG baseline | Better / why | Change |
|---|---|---|---|---|
| Beginner journey | Four entry paths and staged guide hub | Seven-step journey with technical planner entry | Competitor for initial choice clarity | Ten decisions, guided intake and progressive disclosure |
| Exact configurations | Brand summaries and selected model references | 31 distinct registry configurations with field sources and conflict notes | HGG for model-level traceability | Add distinct Champion 201016 only from its manufacturer record |
| Verdicts | Prominent fit, avoid and alternative sections | Cautious summaries and comparison tables | Competitor for decisiveness | Conditional exact-model verdicts on five comparisons |
| Quote help | Prominent personal quote review and document submission | Private three-quote normalization; no collection | Different strengths; competitor offers human service, HGG preserves local privacy | Improve existing quote project; do not imply human review service exists |
| Original quote data | Quote-review offering does not establish a public verified dataset | Zero verified submissions disclosed | Neither has established comparable national statistics in inspected evidence | Private data types, verification/redaction gates, cohort suppression and distribution function |
| Weakness evidence | Visible sourced negatives and owner-friction method | General evidence policies; no typed claim ledger | Competitor for available issue coverage | Five-class claim model and visible evidence method; no inferred failure rates |
| State information | Dedicated Florida/Texas guides with local examples; hub lists more states | General permit guide and one local authority record | Competitor for depth | Eight narrow official-source profiles; full state-guide research remains incomplete |
| Review transparency | Editorial review labels on sampled guides | Professional review explicitly pending | HGG is clearer about absence of licensed signoff; no verified trade-review superiority established | Compensation, conflict, version, limitations and review-status fields |
| Service support | Decisive network claims and locality caveats | Local service questions without scores | No measured local dataset established for either | Dated observation schema and homeowner verification worksheet |
| Guided sizing | Linked sizing tool; BackupSizer offers much easier appliance intake | Strong manual load scenarios and reference examples | BackupSizer for beginner convenience | Explicit guided/advanced modes; unknown loads block calculation |
| Warranty interpretation | Prominent coverage limitations on brand and ownership pages | Model-specific summaries and caveats | Competitor for prominence; accuracy requires contract-by-contract checking | Verdicts direct buyers to applicable contracts; no copied warranty terms |
| Privacy | Quote upload/email path | Browser-local saved plans | HGG for minimizing disclosure in self-service comparison | Preserve local save and add source notes with legacy migration |
| SEO / AI citation | Buyer-stage links, dated articles, bylines and source lists | Canonicals, Article/WebPage schemas, source panels, indexing tests | No search-performance winner established | Preserve existing SEO; add linked research routes without fake ratings |
| Mobile | Navigation and content structure inspected in cloud browser; no complete mobile competitor QA | Existing responsive/axe test suite | No comparative mobile score claimed | Expand automated HGG responsive and accessibility coverage |

## Inspected source set

- https://generators.guide/ — home and conversion paths.
- https://generators.guide/methodology — owner reports, weaknesses and verdict process.
- https://generators.guide/guides — content clusters and state guide inventory.
- https://generators.guide/brands/generac
- https://generators.guide/brands/kohler
- https://generators.guide/brands/champion
- https://generators.guide/brands/cummins
- https://generators.guide/quote-review — inspected only; no form submitted.
- https://generators.guide/guides/best-home-standby-generators
- https://generators.guide/guides/generac-vs-kohler
- https://generators.guide/guides/real-cost-of-a-whole-house-generator
- https://generators.guide/guides/standby-generator-10-year-cost-of-ownership
- https://generators.guide/guides/standby-generator-quote-checklist
- https://generators.guide/guides/generator-install-cost-florida
- https://generators.guide/guides/generator-install-cost-texas
- https://generators.guide/about and /editorial-policy — retrieved, but follow-up extraction failed; no claim of credential verification.
- https://backupsizer.com/ — guided input benchmark; its formulas are not copied or endorsed.
- https://wholehousegeneratorguide.com/ and https://www.powerupgen.com/ — secondary homepage benchmarks only.
- https://generatorgrid.com/ — retrieval failed; not scored.

Staging home inspected through a cloud browser and HTTP headers: 200, `X-Robots-Tag: noindex, nofollow`. No production-domain launch requested or performed.

## Important differences, not claims of overall victory

Generators.guide remains ahead on published state-guide depth and owner-friction coverage. HGG's stronger model structure does not establish better reliability research. The competitor's Champion page combines portable and standby context and makes broad dealer claims; HGG instead treats local authorization as a separately documented question. An independent controlled reliability comparison is unavailable here.

## Implementation boundaries

- No research collection service, public upload, participant recruitment or national statistics activated.
- Quote schema is a future private contract, not a secure backend. Production intake still needs server validation, private storage, authenticated review, consent/withdrawal, malware checks and retention controls.
- Twenty independent projects is an editorial suppression floor, not a statistical sample-size justification. Eligible distributions require editorial review and are not automatically published.
- Eight state profiles verify official starting points only. Full state guides need fuel-trade authorities, code adoption, local examples, utility documents and hazard evidence. No state price claims added.
- No licensed reviewer invented. No independent testing, service coverage score or model reliability winner claimed.
- One exact model added. Missing manufacturer fields stay missing. Existing registry is preserved.
- Advanced volts/amps are recorded, not converted to motor watts. User evidence labels are self-declarations. Managed scenarios remain illustrative.

## QA strategy

Existing CI retains Astro/TypeScript checks, planning math, evidence validation, both environment builds/indexing, responsive browser crawl, planner interactions, full functional audit, AdSense disclosures and production SEO. Added tests cover research cohort separation/privacy/deduplication/quartiles, legacy saved-plan migration, guided missing inputs, evidence attribution, overwrite protection, saved notes and research-route accessibility.

Local browser execution was attempted but initially blocked by missing Chromium; its download returned invalid archives. Wrangler local preview failed with `uv_interface_addresses`. These environment failures are not passes. GitHub CI remains the required browser and Cloudflare-preview gate.
