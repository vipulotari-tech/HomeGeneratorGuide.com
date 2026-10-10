# StandbyGeneratorGuide.com

An independent, source-linked informational site for US homeowners researching standby generators. The site is built with Astro as static HTML; four optional browser tools support planning scenarios. It does not provide final engineering sizing, product testing, or licensed electrical advice.

## Local development and checks

```sh
npm ci
npm run dev
npm run check
npm run typecheck
```

`npm run dev` uses the non-indexable staging origin by default. The site uses current source notes to distinguish manufacturer specifications, manufacturer claims, estimates, and editorial interpretation.

## Build targets

```sh
npm run build              # pre-launch default: staging, noindex/nofollow
npm run build:staging      # noindex/nofollow; staging origin
npm run build:production   # indexable; production origin and sitemap
```

Both targets write to `dist/`, so build them sequentially. Staging pages include `noindex,nofollow`, staging `robots.txt` disallows crawling, and the response header adds `X-Robots-Tag: noindex, nofollow`. Production pages use self-canonicals and an indexable `robots.txt` with the production sitemap.

## Cloudflare Workers

The Worker configs deliberately separate the pre-launch and production targets. While the real domain is not launched, the repository defaults to the staging Worker so generic Cloudflare/Git deploy commands cannot accidentally publish the production route.

- `wrangler.jsonc` is the pre-launch default and deploys to the Worker named `homegeneratorguide` (`homegeneratorguide.tender-telescope.workers.dev`).
- `wrangler.staging.jsonc` is the explicit staging config for the same Worker.
- `wrangler.production.jsonc` deploys to `homegeneratorguide-production` and routes `standbygeneratorguide.com/*` through the configured Cloudflare zone.

```sh
npm run preview
npm run preview:staging
npm run deploy
npm run deploy:staging

# Only when the production domain is intentionally ready to launch:
npm run preview:production
npm run deploy:production
```

Before production deployment, confirm the Cloudflare zone and custom-domain route are available and that any existing Worker serving the production hostname has been safely migrated. The `www`-to-apex redirect remains a Cloudflare dashboard rule for the Workers deployment; Netlify and Vercel redirects are defined in their config files.

Netlify and Vercel configs publish the production static build from `dist/`; the pre-launch default described above is specifically for Cloudflare Worker/Git deployment safety.

## Quality assurance

After the relevant build, the repository checks validate the built site:

```sh
python tools/qa-brand.py
python tools/qa-links.py
python tools/qa-schema.py
python tools/qa-coverage.py
```

For browser checks, install the Playwright Chromium binary once with `npx playwright install chromium`, run Astro on port `8321` (`npm run dev -- --host 0.0.0.0 --port 8321`), then run `npm run qa:browser`. The browser suite checks mobile/tablet/desktop widths, key routes, overflow, the static worksheet, mobile-menu/Escape behavior, keyboard focus, console errors, and redirect configuration. It does not submit or generate a sizing recommendation. `BASE_URL` can point the suite at another local or preview host.

## Editorial limits and assets

- `LAUNCH_AUDIT.md` records the audit, checks, and unresolved launch conditions.
- `EDITORIAL.md` and `/editorial-policy/` describe source, independence, and correction standards.
- No independent licensed professional review has been completed; the site does not claim professional signoff or hands-on testing.
- Generator-brand, dealer, and installer advertising, sponsorships, payments, and referral fees are prohibited. Planning tools use explicit assumptions and never automatically recommend a model.

## Evidence and planning platform

- `src/data/models.json`: exact configurations and field-level source references. Shared views must consume this registry.
- `src/data/editorial.ts`: reviewer and page-review records. Both registries remain empty until an evidenced professional review occurs.
- `src/data/maintenance.json`: selected manual-scoped intervals, not universal maintenance instructions.
- `src/data/quote-submissions.schema.json`: inactive future intake contract. Server must own verification status and private evidence.
- `src/lib/planning.ts`: pure, validated calculations; client files only handle forms and browser storage.

Run `npm run test:planning`, `npm run validate:evidence`, `npm run qa:planners`, and `npm run qa:seo` (last command requires a production build). Evidence validation runs before every build. Browser suites require a running preview; `node tools/run-local-qa.mjs tools/qa-browser.mjs tools/qa-planners.mjs` can start a temporary Python static server for local output checks. Cloudflare headers/redirects need the Wrangler preview or deployed staging site.

Source validation catches malformed/duplicate records and missing provenance; it cannot independently establish that a manufacturer document is true. The publication launch remains separate from the noindex staging deployment.
