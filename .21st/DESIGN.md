# Project design context

Initialized with the 21st CLI and updated from the publisher's 2026-10-03 brief.

- Project: HomeGeneratorGuide; independent homeowner education.
- Stack: existing Astro and Tailwind v4.
- Sources: src/styles/global.css, src/config/site.ts, DESIGN.md, EDITORIAL.md.
- Mode: light; density: readable editorial; font: system sans-serif.
- Colors: navy #1B3A6B, orange #F5821F, green #2D7D46, red #C0392B, slate #F8F9FA, ink #1A1A2E.
- Accessibility: ink on orange buttons; navy ordinary links and focus on light surfaces; white focus on navy.
- Components: existing Astro components, shared BrandLogo, Header, Footer, ArticleLayout.

## Constraints

Exact mission and promise on every HTML page. Transparent pending licensed-review status. Responsive logo, tagline, and navigation at 320px. No generator-brand, dealer, or installer advertising or payments. No invented experts, unsupported review badges, sales pressure, or added UI runtime dependencies.

## Publisher-selected decisions

Navy house-and-lightning identity, semi-bold HomeGeneratorGuide wordmark, and "Power When It Matters Most" tagline. Preserve existing guide routes and reusable Astro components. Catalog search was attempted and requires sign-in; an external component is unnecessary for this scope.

See ../DESIGN.md for visual rules and ../EDITORIAL.md for editorial requirements. Machine-readable decisions are recorded in design.json.
