# Implementation Plan: Brand and editorial foundation

**Feature**: 001-brand-editorial | **Date**: 2026-10-03 | **Spec**: [spec.md](spec.md)

## Summary

Apply the publisher's exact mission, promise, independence policy, six colors, and visual identity to the existing Astro website. Use shared configuration and existing layouts. Label licensed review pending until article-specific evidence is verified.

## Technical Context

- Language: TypeScript and Astro templates; see `package.json` for the current declared version range.
- Dependencies: existing Astro and Tailwind v4 only; no new production packages.
- Storage: source files and static SVG assets; no database.
- Testing: production build, TypeScript, existing schema/link checks, one brand-contract check, browser checks at 320px/390px/1440px.
- Target: static website hosted through the existing Cloudflare configuration.
- Scope: all shared layouts, homepage, About/editorial/funding/privacy copy, static error page, logo/favicon, editorial documentation.
- Performance: SVG identity assets, no added client-side JavaScript or webfont request.

## Constitution Check

The existing constitution contains unfilled template placeholders, not adopted rules. Preserve repository constraints: real author identity, no fake badges, source attribution, accessible markup, and no live advertising. The user brief governs the brand. Both before and after design checks pass. No extension hook file exists.

## Research

See [research.md](research.md). Spec Kit's research agent calculated contrast and inspected mobile constraints. Reuse native Astro components rather than installing a React catalog component. The 21st search was attempted but requires authentication; the local design context was generated successfully. Tailwind's local documentation snapshot is absent; its license download was offered separately and is not assumed approved.

## Design

- Centralize mission, promise, tagline, independence wording, and pending-review wording in src/config/site.ts.
- Use the existing shared Footer for exact text on all normal/error routes; mirror it in public/500.html.
- Reuse the same BrandLogo in Header and Footer. Export public/brand-mark.svg, public/logo.svg, and a purpose-built 16px public/favicon.svg.
- Replace repeated legacy brand colors with semantic theme utilities and CSS variables. Use ink on orange buttons and navy links/focus on light surfaces.
- Update homepage and About copy around first-time homeowner questions. Do not convert the supplied spending profile into an unsourced price statistic.
- Publish editorial standards with links to official NFPA/NEC and EPA references. Keep local adoption and model-specific instructions distinct.
- Add clear pending licensed-review status next to article author/date metadata. Preserve author credentials and citations.
- Keep advertising disabled and remove conflicting future manufacturer/dealer affiliate or advertising promises.

## Project Structure

```text
specs/001-brand-editorial/{spec,plan,research,data-model,quickstart,tasks}.md
specs/001-brand-editorial/contracts/site-brand.md
src/config/site.ts
src/styles/global.css
src/components/layout/{BrandLogo,Header,Footer}.astro
src/layouts/{BaseLayout,ArticleLayout}.astro
src/pages/{index,about,editorial-policy,affiliate-disclosure,privacy-policy}.astro
public/{brand-mark,logo,favicon}.svg
public/{500.html,llms.txt}
DESIGN.md
EDITORIAL.md
.21st/{design.json,DESIGN.md}
tools/qa-brand.py
```

## Complexity Tracking

No new framework, runtime dependency, backend, reviewer database, or generalized advertising system is required.
