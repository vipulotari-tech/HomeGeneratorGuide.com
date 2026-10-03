# Feature Specification: Premium integrated header

**Created**: 2026-10-03
**Status**: Ready for implementation

## User scenarios

### User Story 1 — Read the header as part of the hero (P1)

An American homeowner sees one coherent navy authority surface from the site header into the homepage hero, with no arbitrary blue strip or color jump.

**Independent test**: Open the homepage at desktop and mobile widths and compare the header/hero boundary; the transition is intentional and the header remains legible.

### User Story 2 — Navigate confidently (P1)

A reader can identify navigation, hover and active states, and use the mobile menu with keyboard focus and Escape.

**Independent test**: Use keyboard and pointer interactions at 320px, 390px, and desktop widths; active route remains visible and no horizontal overflow occurs.

### User Story 3 — Keep the brand lockup balanced (P2)

The navy house/lightning mark, white wordmark, and tagline share one visual system with the navy hero and orange action color.

**Independent test**: Inspect the header on the homepage and an article; logo, tagline, nav, and menu button align without crowding.

## Requirements

- **FR-001**: Header MUST use the same primary navy family as the homepage hero.
- **FR-002**: Header MUST remove the random blue strip; the remaining divider MUST be a restrained navy-surface boundary.
- **FR-003**: Navigation MUST use high-contrast white/slate text, a subtle white hover surface, and an orange active indicator.
- **FR-004**: Header MUST preserve the existing BrandLogo, sticky behavior, skip link, mobile toggle, Escape handling, and 44px targets.
- **FR-005**: Header MUST avoid gradients, glassmorphism, excessive shadows, new dependencies, and arbitrary colors.
- **FR-006**: Header MUST remain readable and overflow-free at 320px, 390px, and 1440px.

## Success criteria

- **SC-001**: Header and hero share a continuous navy visual field on the homepage.
- **SC-002**: Active navigation has a visible orange indicator and sufficient contrast.
- **SC-003**: Browser checks pass at 320px, 390px, and 1440px with no horizontal overflow.
- **SC-004**: Mobile menu opens, exposes links, closes on Escape, and returns focus to its button.

## Assumptions

- The current Astro/Tailwind primitives and BrandLogo remain the source of truth.
- The existing homepage hero is retained; this task adjusts the header to meet it.
