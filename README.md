# HomeGeneratorGuide.com

Independent educational resource for US homeowners researching standby generators. Astro 5 + Tailwind v4 + TypeScript, fully static.

## Commands

- `npm install` — dependencies
- `npm run dev` — local dev
- `npm run build` — production build (`dist/`)
- `npm run preview` — preview build
- `npm run typecheck` — `tsc --noEmit`

## Project

- Spec: `.specify/specs/homegeneratorguide/` (spec, plan, tasks)
- Design: `DESIGN.md`
- Data: `src/data/` (no fabricated state pricing — methodology only)
- QA tooling: `tools/` (`qa-links.py`, `qa-schema.py`, `qa-hero.py`, `shot.py` Playwright screenshots, `gen-og.py`)
- Deploy: static `dist/` → Netlify (`netlify.toml`: www→apex 301, security headers) or Vercel (`vercel.json`).
- This directory is not a git repo yet — `git init`, commit, and push before connecting a host. DNS currently has no A/AAAA record; add one at deploy time.
- AI citations: `public/llms.txt` ships a machine-readable summary.
- Monetization: AdSense placeholders only (no live publisher ID); affiliate disclosure pre-written, no live links.
