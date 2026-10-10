# Standby Generator Guide launch audit

**Audit date:** 2026-10-04 (Asia/Calcutta)  
**Production target:** https://standbygeneratorguide.com/  
**Pre-launch staging target:** https://homegeneratorguide.tender-telescope.workers.dev/  
**Verdict:** **NOT READY for production launch yet.** Code and generated builds pass the checks below, but no remote deployment was performed; the supplied staging hostname, production route/DNS, and external `www` redirect have not been verified live. Independent licensed review also remains incomplete and is disclosed on-site.

## Executive summary

The site was rebuilt as a source-linked informational publication: the interactive estimator was removed, source-scoped model data replaced generic tables, safety and installation material was tightened, staging/production SEO outputs were separated, and the Cloudflare Worker configs now target different Workers. A local Cloudflare Worker test caught and fixed an invalid redirect syntax before the final build. No production or staging deployment was attempted.

Scores below are editorial judgments on a 0–10 rubric. They are not search rankings, Lighthouse scores, field performance data, or professional signoff.

## Baseline and post-implementation scores

| Area | Baseline | After implementation | Basis and remaining limit |
| --- | ---: | ---: | --- |
| Technical SEO and deployment safety | 3/10 | 8/10 | Separate build origins and Worker configs; production sitemap and canonical checks pass; stage is noindex/nofollow and omits its sitemap. Remote host, DNS, Cloudflare zone/route, and dashboard redirect remain unverified. |
| Evidence quality and model/spec accuracy | 2/10 | 7/10 | Selected exact-model records cite manufacturer pages/sheets; fuel, price-bundle, sound, and source limitations are explicit. This is desk research, not independent testing or licensed review; one secondary cost source contradicts itself. |
| Sizing and cost decision usefulness | 4/10 | 8/10 | Static load worksheet, manufacturer-chart ranges, cautious arithmetic, and source-scoped costs replace an automatic estimator, floor-area sizing, and unsupported formulas. No home-specific answer or quote is produced. |
| Information architecture and topical coverage | 7/10 | 8/10 | 48 indexable production routes remain, with focused category hubs, model pages, comparisons, installation, safety, maintenance, and cross-links. Search demand and ranking performance are not measured. |
| Trust and editorial disclosures | 7/10 | 8/10 | Current editorial promise, author scope, source types, corrections, funding, and absent professional review are stated without invented credentials or signoff. External review is still absent. |
| Mobile accessibility and interaction quality | 6/10 | 7/10 | Browser checks at 320, 390, 768, and 1440 px found no horizontal overflow; menu/Escape and keyboard-focus behavior passed. Screen-reader, assistive-tech, and full manual WCAG review were not performed. |
| Performance and security posture | 5/10 | 8/10 | Static output, security/cache headers, and a clean dependency audit. No real-user Core Web Vitals or independent performance audit is available. |
| Monetization readiness | 6/10 | 8/10 | No ads, affiliate links, sponsored rankings, brand/dealer/installer payments, or referral fees are enabled. Legal/privacy review by counsel was not performed. |
| **Unweighted average** | **5.0/10** | **7.8/10** | Internal rubric only. A passing code audit does not by itself authorize launch. |

## Competitor and source research

Competitor pages were used to understand homeowner questions and content patterns, not as proof of technical specifications.

| Reference | Finding used | Editorial response |
| --- | --- | --- |
| [Generac sizing guide](https://www.generac.com/resources/home-management/what-size-generator-do-i-need/) | Starts with simultaneous loads, distinguishes running and starting demand, and directs complex cases to an in-home assessment. Its chart is approximate. | Keep a static, load-based method; do not offer a calculator or square-footage formula. |
| [Champion wattage chart](https://www.championpowerequipment.com/generator-wattage-chart/) | Publishes generic ranges and tells readers to check their own equipment. | Use the chart as a clearly labeled manufacturer-published planning reference, not as measurements or a home-specific sizing answer. |
| [HomeGuide generator cost guide](https://homeguide.com/costs/generator-cost) | Separates cost scopes, but its gas-line estimates conflict: $12–$25/ft in a table and $15–$50+/linear ft in a later bullet. | Both cost articles disclose the discrepancy; neither figure is silently presented as settled local pricing. |
| [Angi generator cost guide](https://www.angi.com/articles/how-much-does-it-cost-install-generator.htm) | Provides an installation average with a distinct displayed scope. | Do not compare it directly with an all-in standby-system price. |
| Manufacturer product pages and comparison guides | Common comparison errors include mixing LP and NG output, ATS and non-ATS packages, unit MSRP and installed project totals, or exercise-mode and full-load noise. | Compare exact model/fuel/package or omit the field; identify each published claim and measurement condition. |

## Material source checks and editorial treatment

- [Champion wattage chart](https://www.championpowerequipment.com/generator-wattage-chart/): the static appliance table now contains 28 selected generic chart entries. Examples include a 1/2 HP well pump at 750–1,000 W running / 1,500–2,000 W starting, a 1 HP well pump at 1,000–2,000 W running / 2,000–4,000 W starting, a window fan at 50–200 W, and a home security system at 15–40 W. These are chart ranges—not actual measurements of a reader’s appliance.
- [Generac G0072600 product page](https://www.generac.com/residential-products/standby-generators/gaseous/standby-generator-22kw-7260/) and [official 22–28 kW sheet](https://manfilemode-generacsoa.generac.com/api/manualfiles/G0072600/A0005151077/0): 22 kW LP / 21 kW NG; page-listed starting MSRP $6,309. MSRP is not an installed quote or proof of included transfer equipment.
- [Generac G0073270 product page](https://www.generac.com/residential-products/standby-generators/gaseous/standby-generator-26kw-7327/) and [official specification sheet](https://productmanuals.generac.com/api/manualfiles/G0073270/A0005151077/0): 26 kW LP / 24 kW NG; starting MSRP $7,159. Manufacturer test points are NG 182 ft³/hr at 50% load and 316 ft³/hr at full load; LP 2.05 gal/hr at 50% and 3.95 gal/hr at full load. The sheet lists 67 dB(A) at 23 ft at normal load and 55 dB(A) in Quiet-Test exercise mode. These are exact-model test points/conditions, not a household fuel forecast or guaranteed noise result.
- [Briggs & Stratton PowerProtect 040786](https://energy.briggsandstratton.com/en-us/products/powerprotect-22kw-standby-generator): published $6,037 MSRP, 22 kW on either listed fuel, 45 kVA motor-starting capability, seven-year comprehensive limited warranty, and 68 dB(A) published sound with no measurement distance stated on the page. No distance-based comparison is inferred.
- [Champion aXis 201222](https://www.championpowerequipment.com/product/201222-22-kw-whole-house-home-standby-generator-and-200a-switch-with-axis-technology/): 22 kW LP / 19.8 kW NG, bundled 200 A aXis ATS, approximate 67 dB(A) product-page figure at about 23 ft (test load not stated), and separate 10-year generator / two-year ATS limited warranties.
- [KOHLER 26RCA page](https://www.kohlerhomeenergy.rehlko.com/products/home-generators/26rca) and [manufacturer G4-315 sheet](https://techcomm.rehlko.com/techcomm/pdf/g4315.pdf): 26 kW LP / 24 kW NG, 39 kVA starting capability, 56 dB(A) exercise / 67 dB(A) full speed, 625 lb listed weight, and five-year/2,000-hour limited coverage in the manufacturer sheet. Current page-listed starting prices are $7,546 for the 26RCA no-ATS configuration and $8,515 for the 26RCAL ATS-inclusive package; final dealer pricing and installation are separate.
- [Cummins QuietConnect residential series page](https://www.cummins.com/en-na/generators/products/quietconnecttm-series?application=Residential%20Home%20Standby&v=3151#tab-navigation), exact model pages, and warranty FAQ: accessible model-page standby values used are RS13A 13 kW/13 kVA, RS17A 17/17, and RS20A 20/18. Cummins’ “65 dB or lower” is retained only as a series-level manufacturer claim without a common test condition. The currently accessible series page does not establish a series-wide starting price; none is claimed.
- [EIA 2024 outage summary](https://www.eia.gov/todayinenergy/detail.php?id=66744): U.S. customers averaged 11 interruption hours in 2024; major events accounted for 80% of hours without electricity. The article explains that the national average is not a household forecast and does not publish state rankings or invented outage-cause/ownership claims.
- [CPSC 2026 hurricane-season generator warning](https://www.cpsc.gov/Newsroom/News-Releases/2026/CPSC-Warns-of-Generator-Carbon-Monoxide-and-Fire-Hazards-Ahead-of-Hurricane-Season), [CPSC CO fact sheet](https://www.cpsc.gov/safety-education/safety-guides/carbon-monoxide/carbon-monoxide-fact-sheet), [CDC CO guidance](https://www.cdc.gov/carbon-monoxide/about/index.html), [CPSC portable-generator safety alert](https://www.cpsc.gov/s3fs-public/5123_SafetyAlert_PortableGenerators_102021_0.pdf?VersionId=PK4zcSnKUJE8ovzbCGV09MM5.RBIG_E5), and [ESFI generator safety](https://www.esfi.org/generator-safety/): used for placement, alarms, wet-weather/electrical hazards, backfeeding, and fuel-leak response. Site guidance remains general and defers to exact manuals and local authorities.
- [Generac installation guidance](https://www.generac.com/resources/home-management/backup-generator-installation/): its $8,000–$16,000 average includes the generator, system equipment/materials, and installation; preparation and timing vary. It is manufacturer guidance, not a local quote or a guaranteed schedule.

## Implementation completed

- Removed `src/pages/sizing/calculator.astro`; the legacy slash and slashless routes return permanent redirects to the static sizing guide. No interactive estimator or automated size recommendation remains.
- Reworked the sizing hub, appliance chart, load-based guide, 2,000-sq-ft page, HVAC/pump/rating guides, and whole-home/essential-load content. The central example is explicitly arithmetic using generic chart maxima, not a measurement or purchase recommendation.
- Replaced broad brand/fuel/state-price data files with a centralized exact-model record and reusable rendering. Updated the selected-brand pages and the Generac-vs-KOHLER comparison; documented inaccessible or ambiguous source fields instead of guessing.
- Reworked cost, ROI, installation, transfer-equipment, fuel, runtime, maintenance, safety, outage-statistic, and first-time-buyer guides with current source and scope notes. Disclosed HomeGuide’s contradictory gas-line figures.
- Removed the homepage explainer video and its poster/captions because it claimed a universal ~10-second transfer, uninterrupted loads, weekly/yearly service intervals, and unsupported failure causes. Replaced it with a static, qualified power-path explanation.
- Replaced misleading future-facing expert-review copy with an accurate current status: no independent licensed professional review is complete. Updated About, author, policy, footer, error page, `llms.txt`, README, and editorial specifications accordingly.
- Added target-specific builds: staging has page-level `noindex,nofollow`, a disallow-all `robots.txt`, `X-Robots-Tag`, no canonical, and no sitemap files; production has self-canonicals, indexable robots, and a production sitemap. `public/500.html` and generated 404 output are also non-indexable and lack canonicals.
- Split Cloudflare Worker configs: staging Worker name `homegeneratorguide`; production Worker name `homegeneratorguide-production` with the `standbygeneratorguide.com/*` route. Added a documented Playwright browser QA command and corrected a forced-redirect suffix incompatibility caught by Wrangler.

## Second-audit checks and results

| Check | Result |
| --- | --- |
| `npm ci` | Passed; 456 packages installed, 0 vulnerabilities reported by install audit. |
| `npm run check` | Passed: 79 Astro/TypeScript files, 0 errors, 0 warnings, 0 hints. |
| `npm run typecheck` | Passed (`tsc --noEmit`). |
| `npm run build:production` | Passed: 49 Astro pages generated; 48 indexable site routes in production sitemap. Repeated after clean install. |
| `npm run build:staging` | Passed: 49 Astro pages generated; all 50 HTML documents, including error pages, are noindex/nofollow; no sitemap is shipped. |
| `npm audit` | Passed: 0 vulnerabilities after the dependency update. |
| `tools/qa-brand.py` | Passed: 50 HTML files, 30 Article schema instances, no estimator source, current disclosures and brand assets; orange CTA contrast 6.58:1. |
| `tools/qa-links.py` | Passed: 51 unique internal hrefs, no broken internal targets, no duplicate page titles. |
| `tools/qa-schema.py` | Passed: 32 JSON-LD blocks parsed with Schema.org context and `@type`; all HTML pages have exactly one H1 and every image has an `alt` attribute. |
| `tools/qa-coverage.py` | Passed for both targets: production has 48 matching sitemap URLs/self-canonicals; staging is noindex/nofollow, disallows crawl, and has no sitemap. |
| `npm run qa:browser` | Passed: 9 page/viewport cases at 320, 390, 768, and 1440 px; no horizontal overflow; worksheet has no form controls; mobile menu opens/closes with Escape; pointer/keyboard focus behavior passes; no browser console/page errors. |
| Wrangler production/staging `deploy --dry-run` | Both configs validated as assets-only Workers; no deployment was performed. |
| Local Wrangler staging runtime check | Both legacy calculator URLs returned 301 to the static guide; home response carried `X-Robots-Tag: noindex, nofollow`; `robots.txt` disallowed crawling; sitemap request returned 404. Wrangler parsed both redirect rules after removing unsupported `!` suffixes. |

The browser check used local Chromium and the Astro dev server; it is not a remote staging or real-device certification. Static source/image accessibility and the specified focus behavior were checked, but assistive-technology review was not.

## Changed routes and key files

- **Sizing:** `/sizing/`, `/sizing/appliance-wattage-chart/`, `/sizing/what-size-generator-do-i-need/`, `/sizing/what-size-for-2000-sq-ft/`, `/sizing/hvac-generator-sizing/`, `/sizing/well-pump-generator-sizing/`, `/sizing/understanding-generator-ratings/`, `/sizing/whole-home-vs-essential-loads/`; `/sizing/calculator/` retired and redirected.
- **Brands and comparisons:** `/brands/`, `/brands/generac/`, `/brands/kohler/`, `/brands/cummins/`, `/brands/champion/`, `/brands/briggs-stratton/`, `/comparisons/generac-vs-kohler/`, `/comparisons/standby-vs-portable/`, `/comparisons/transfer-switch-vs-interlock/`.
- **Cost:** `/cost/standby-generator-cost/`, `/cost/installation-cost-breakdown/`, `/cost/transfer-switch-cost/`, `/cost/generator-roi-outage-costs/`.
- **Guides, safety, ownership:** `/guides/first-time-buyer-guide/`, `/guides/generator-glossary/`, `/guides/generator-safety-carbon-monoxide/`, `/guides/generator-safety-overview/`, `/guides/how-long-can-generator-run/`, `/guides/natural-gas-vs-propane/`, `/guides/power-quality-thd-surge-protection/`, `/guides/us-power-outage-statistics/`, `/installation/generator-pad-and-placement/`, `/installation/what-to-expect/`, `/maintenance/generator-maintenance-checklist/`.
- **Trust and navigation:** homepage, About, publisher page, editorial policy, review-status page, footer, 404/500, `robots.txt`, `llms.txt`, sizing/brand/cost category hubs, README, DESIGN, EDITORIAL, and brand-editorial specifications.
- **Technical:** environment-specific site metadata/build script, `src/env.d.ts`, `ArticleLayout` source types, model data/rendering components, redirect/header rules, Vercel/Netlify config, Cloudflare Worker configs, and QA scripts.

## Outstanding external launch checklist

1. **Deploy staging only after confirming the Cloudflare account/Worker mapping.** Confirm `homegeneratorguide.tender-telescope.workers.dev` is served by the `homegeneratorguide` staging Worker; do not deploy the staging build to the production Worker.
2. On the remote staging hostname, verify page meta robots and `X-Robots-Tag: noindex, nofollow`, `robots.txt` disallow, absence of canonicals/sitemaps, 301s for both old calculator paths, 404/500 behavior, source links, and mobile interactions.
3. Confirm the Cloudflare zone, DNS, certificate, custom-domain route, and any existing Worker serving production can be migrated safely to `homegeneratorguide-production`. The exact account/zone ownership was not available in this audit.
4. Verify the Cloudflare dashboard `www`-to-apex Redirect Rule. Netlify and Vercel configs include their own host redirects; Cloudflare’s host-level rule is external to this repository.
5. After the production route is confirmed, test live canonical and robots metadata, `robots.txt`, the 48-URL sitemap, headers, old-route redirects, `www` consolidation, and representative 404/500 responses on `https://standbygeneratorguide.com/`.
6. Decide whether to commission independent licensed review before launch. None has been completed; site copy explicitly discloses that fact. If review is commissioned, publish only article-specific, verifiable reviewer/scope/date details.
7. Run a manual screen-reader/keyboard pass on representative templates and a field or lab performance audit; no Core Web Vitals or real-user analytics data is available here.
8. Recheck current manufacturer specs, local installation pricing, permits, and utility requirements at quote time. The published MSRPs and third-party cost examples are not installed offers or local bids.

## Final verdict

**NOT READY for production launch today.** No known critical source-code issue remains in the repository build: both environments compile, target SEO checks pass, the legacy calculator redirect works in local Worker runtime, and dependency/build/link/schema/browser checks passed. The remaining launch blockers are operational and external: the provided remote staging URL and production domain have not been deployed or verified, Cloudflare routing and the dashboard `www` rule need owner confirmation, and independent professional review remains absent. Do not treat the local audit or dry-run as a live launch approval.
