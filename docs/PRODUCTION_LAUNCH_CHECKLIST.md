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
- All ten pinned WebP assets are vendored under `public/images/user-editorial/`
  and verified offline against SHA-256 digests during the build. Maintain
  provenance and retest asset budgets whenever replacing images.
- Review the external-authority and research data limits: no independent
  technical reviews or original homeowner sample exists yet.
