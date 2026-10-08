# Launch gates for real search traffic

- **Staging stays noindex.** Never change `PUBLIC_SITE_ENV=staging` or ship
  production robot directives to `*.workers.dev` merely to improve SEO scores.
- On a user-approved production domain launch, validate DNS and domain
  verification, actual HTTP response, self-referencing canonical, robots.txt,
  XML sitemap index, article link/JSON-LD consistency and asset URLs.
- Inspect real pages in desktop and mobile Chromium at 320px, 390px, 768px,
  1440px; verify navigation and all four browser-local planners.
- Run production builds, existing CI, `npm run qa:buyer-journey`, accessibility,
  cross-route browser and SEO validation.
- Measure real LCP, CLS and INP in Google Search Console/CrUX when traffic exists.
  Lighthouse lab scores do not equal field user experience; no made-up CWV.
- Verify Google Search Console property, upload sitemap and review URL
  inspections. Evaluate query-page mapping and CTR after data accumulates.
- Vendor the ten pinned WebP assets directly into Git (technical debt). Build
  currently verifies each asset digest but requires an external ZIP URL on
  clean CI/CD machines. Do not claim fully self-contained builds until solved.
- Review the external-authority and research data limits: no independent
  technical reviews or original homeowner sample exists yet.
