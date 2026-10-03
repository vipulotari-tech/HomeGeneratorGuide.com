# DESIGN.md — HomeGeneratorGuide.com

Spec: `google-labs-code/design.md` compatible. Machine-readable design tokens for AI generation + human reference.

## Brand
- Name: HomeGeneratorGuide
- Voice: independent, editorial, safety-conscious. No sales hype, no fake badges.
- Logo: text wordmark + lightweight SVG bolt-in-house mark (navy #1e3a5f + orange #f97316).

## Tokens (`src/styles/global.css` `@theme`)
```css
--color-primary: #1e3a5f;        /* navy — header, headings, footer */
--color-primary-dark: #152a45;
--color-accent: #f97316;          /* orange — CTAs, highlights */
--color-accent-dark: #ea580c;
--color-ink: #1f2937;             /* body text */
--color-muted: #6b7280;           /* secondary text */
--color-surface: #f9fafb;          /* card bg */
--color-border: #e5e7eb;
--color-info-bg: #eff6ff; --color-info-border: #bfdbfe;
--color-warn-bg: #fffbeb; --color-warn-border: #fde68a;
--color-danger-bg: #fef2f2; --color-danger-border: #fecaca;
--color-success-bg: #f0fdf4; --color-success-border: #bbf7d0;
--font-sans: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
--radius-card: 0.75rem;
--radius-control: 0.5rem;
--container-max: 72rem;
```

## Type scale
- H1 2.5rem/700, H2 2rem/600, H3 1.5rem/600, body 1rem/1.7, small 0.875rem.
- Max measure: article prose `max-w-[68ch]`.
- System font stack (no webfont request) for performance.

## Layout
- Container: `max-w-6xl mx-auto px-4 sm:px-6`.
- Article: desktop grid `lg:grid-cols-[minmax(0,1fr)_300px] gap-10` (~70/30); mobile single col, TOC first.
- Header: sticky `sticky top-0 z-50`, navy bg, white text, 44px+ targets.
- Footer: navy bg, 3 cols → stack mobile.
- Cards: white/surface bg, 1px border, rounded-xl, hover border-accent, no shadow spam.
- Tables: wrapper `overflow-x-auto`, `th` navy-tinted, zebra rows, sticky first col only on wide comparison.
- Alerts: left border 4px + tinted bg per tone, icon + text, `role="note"` (warning/danger `role="alert"` sparingly).
- CTAs: primary = orange solid white text; secondary = navy outline. Min height 44px. No manipulative copy.
- Focus: `:focus-visible { outline: 3px solid #f97316; outline-offset: 2px; }`.
- Reduced motion: `@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }`.

## Component rules
- Header nav: Sizing Guide, Cost Guide, Brands, Comparisons, Installation, Maintenance. `aria-current="page"` on active. Mobile: `<button aria-expanded>` toggling `<nav>` (progressive, ~20 lines JS inline).
- Breadcrumbs: `nav[aria-label=Breadcrumb] > ol`, separators aria-hidden.
- FAQ: native `<details><summary>` — keyboard free, minimal JS (none).
- AdUnit: dashed border placeholder labeled "Advertisement", reserved `min-h` to avoid CLS, never adjacent to nav buttons.
- Prose: scoped `.prose-hgg` styles (headings, links underline-offset, table, hr) — never global element resets beyond Tailwind preflight.
- Diagrams: inline SVG, `role="img"` + `<title>`, currentColor/navy/orange palette, no external assets.

## Accessibility / performance
- Landmarks: header/nav/main/footer. One H1 per page. Heading order strict.
- Contrast: navy-on-white 12.6:1, orange (#ea580c dark variant) for text-on-white; bright #f97316 only for large/bold or button bg with white text (3.9:1 → use dark text? decision: buttons use white on #c2410c hover-safe; base #ea580c 4.5:1 approx — verified choice: CTA bg `bg-orange-600` (#ea580c)).
- Images: width/height + alt + loading lazy below fold.
- JS budget: menu toggle + (optional) TOC scrollspy off by default. No frameworks.

## Page patterns
- Hero (home): navy gradient panel, H1 + sub + 2 CTAs + SVG illustration (house + generator + bolt).
- Value bar: 4 items with SVG icons, no fake stats.
- Card grids: `grid sm:grid-cols-2 lg:grid-cols-3 gap-5`.
- Article header: category eyebrow, H1, dek, meta (updated date, reading time), AlertBox safety note.
