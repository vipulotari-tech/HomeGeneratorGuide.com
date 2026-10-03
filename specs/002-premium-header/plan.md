# Implementation Plan: Premium integrated header

## Summary

Change only the shared header and design context. Use the existing navy primary token so the header meets the hero at its top edge. Use white/slate typography, a subtle white divider, and orange active navigation. Keep behavior unchanged.

## Technical context

- Astro 5 templates with Tailwind v4 theme tokens.
- Shared files: `src/components/layout/Header.astro`, `BrandLogo.astro`, `src/styles/global.css`, `DESIGN.md`, `.21st/design.json`.
- Validation: Astro build, TypeScript, Playwright smoke checks, 21st review.
- No new dependencies or client-side behavior.

## Design decision

Use `bg-primary` on the header, matching the hero's first navy color. Remove the light header surface and random-looking bottom treatment. Keep `border-b border-white/10` as a quiet boundary, with active links using an orange bottom border and hover links using `bg-white/10`.

## Accessibility

Keep the existing semantic header/nav/button, explicit menu label, focus-visible outline, reduced-motion behavior, keyboard Escape handler, and minimum 44px controls.
