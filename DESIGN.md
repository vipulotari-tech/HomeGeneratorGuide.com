# HomeGeneratorGuide design system

## Identity
- Name: HomeGeneratorGuide
- Tagline: Power When It Matters Most
- Voice: knowledgeable neighbor; direct, honest, reassuring, never salesy.
- Reader: US homeowner researching standby backup power; age, purchase history, and budget are not assumed.
- Logo: navy house silhouette with lightning integrated into the roofline; semi-bold sans-serif wordmark. Shared component: src/components/layout/BrandLogo.astro.
- Exports: public/brand-mark.svg, public/logo.svg, public/favicon.svg. The favicon uses a purpose-built 16px coordinate system, navy house outline and bolt, white square.

## Brand colors
| Token | Name | Hex | Role |
| --- | --- | --- | --- |
| primary | Deep Green | #203b34 | Current editorial headings, links and UI; the logo retains navy #1B3A6B |
| accent | Power Orange | #F5821F | Actions and decorative highlights |
| success | Generator Green | #2D7D46 | Approval, safety, confirmed states |
| danger | Safety Red | #C0392B | Warnings and safety notices |
| surface | Slate Gray | #F8F9FA | Backgrounds |
| ink | Near-Black | #1A1A2E | Body text and orange-button text |

Theme tokens live in src/styles/global.css. primary-dark #142b25 and accent-dark #E87517 are supporting hover/dark-surface shades. The October product-showcase redesign changed the UI primary; exported navy logo assets are intentionally retained.

## Accessibility
- Orange buttons use ink text: 6.58:1 contrast. White text on brand orange is insufficient for ordinary text.
- Navy links on white: 11.27:1. Underline prose links.
- Focus: 3px navy outline on light surfaces; white on navy surfaces.
- Navigation and buttons: at least 44px targets; native button toggles mobile navigation, announces expanded state, supports Escape.
- At 320px: adaptive wordmark size, icon-only menu, flexible header height, no overflow.
- One H1, orderly headings, header/nav/main/footer landmarks, skip link, meaningful alt text.
- Reduced-motion preference disables optional animation.
- SVG decorative instances have empty alt text; standalone exports contain accessible titles/descriptions.

## Typography and layout
- System sans-serif stack; no remote font dependency.
- Wordmark: semi-bold. H1: bold, responsive; body: 1rem/1.7.
- Containers: max-w-6xl; page padding px-4 sm:px-6.
- Article measure: 68ch; desktop content/sidebar grid; one column on mobile.
- Cards: existing project components, light borders, restrained rounded corners.
- Header: primary navy (#1B3A6B) with the hero's navy field, white/slate navigation, orange active underline, and a quiet white divider; no separate blue strip.
- Native details/summary for FAQs. Tables scroll in a wrapper.

## Editorial surfaces
- Mission and editorial promise are exact strings from src/config/site.ts and visible in the shared footer on site pages; the static 500 page mirrors them.
- No independent licensed professional has reviewed the current articles. Source citations and publisher research are not professional signoff.
- Never use green verification marks to imply uncompleted review or invent credentials.
- All brand/dealer/installer advertising, payments, sponsorships, and referral fees are prohibited; advertising stays disabled.
- Full editorial instructions: EDITORIAL.md.
