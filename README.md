# HomeGeneratorGuide.com

An independent, source-linked informational site for US homeowners researching standby generators. The site is built with Astro as static HTML; it does not provide an interactive sizing or cost estimator, product testing, or licensed electrical advice.

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
npm run build:staging      # noindex/nofollow; staging origin
npm run build:production   # indexable; production origin and sitemap
npm run build              # alias for the production build
```

Both targets write to `dist/`, so build them sequentially. Staging pages include `noindex,nofollow`, staging `robots.txt` disallows crawling, and the response header adds `X-Robots-Tag: noindex, nofollow`. Production pages use self-canonicals and an indexable `robots.txt` with the production sitemap.

## Cloudflare Workers

The Worker configs deliberately separate the pre-launch and production targets:

- `wrangler.staging.jsonc` deploys the staging build to the Worker named `homegeneratorguide` (`homegeneratorguide.tender-telescope.workers.dev`).
- `wrangler.jsonc` deploys the production build to `homegeneratorguide-production` and routes `homegeneratorguide.com/*` through the configured Cloudflare zone.

```sh
npm run preview:staging
npm run deploy:staging
npm run preview
npm run deploy
```

Deploy commands are explicit and are not part of the build or test scripts. Before production deployment, confirm the Cloudflare zone and custom-domain route are available and that any existing Worker serving the production hostname has been safely migrated. The `www`-to-apex redirect remains a Cloudflare dashboard rule for the Workers deployment; Netlify and Vercel redirects are defined in their config files.

Netlify and Vercel configs also publish the production static build from `dist/`. The current target-specific Worker separation applies to Cloudflare; configure a distinct non-indexable preview deployment separately if using another host for staging.

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
- Generator-brand, dealer, and installer advertising, sponsorships, payments, and referral fees are prohibited. No calculator or automated sizing recommendation is provided.
