# Research decisions

## Exact language and review evidence

Decision: preserve the supplied mission and promise verbatim; explicitly label the promise as a publication standard being worked toward. All articles show licensed review pending.

Rationale: the existing author page explicitly states the publisher is not a licensed electrician, and no reviewer record exists. User-supplied aspirations are not evidence of completed review. An asynchronous reviewer-details question remains pending.

## Visual accessibility

Decision: near-black #1A1A2E text on orange #F5821F CTAs, navy links on white/slate, navy focus outline on light surfaces, and a white outline on navy surfaces. Let mobile header height grow and use an icon-only menu button.

Rationale: Spec Kit research agent calculated ink/orange 6.5755:1, white/orange 2.5941:1, navy/white 11.2653:1, green/white 5.0805:1, red/white 5.4384:1. Orange focus on white is below 3:1. [W3C text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

## Source boundaries

Decision: reference [NFPA 70 / NEC](https://www.nfpa.org/codes-and-standards/nfpa-70-standard-development/70), [NFPA 37](https://www.nfpa.org/codes-and-standards/nfpa-37-standard-development/37), and [EPA stationary engine rules](https://www.epa.gov/stationary-engines/understanding-stationary-engines-rules). Code guidance must name the relevant edition and local adoption when making a specific compliance claim; emissions guidance must identify the relevant engine category.

Rationale: NFPA 70 addresses electrical installation; NFPA 37 addresses stationary-engine installation/fire hazards; EPA stationary-engine rules concern emissions and operational applicability. These official links were checked on 2026-10-03. No new article-level technical review is claimed.

## Project reuse

Decision: use existing Astro layouts and semantic CSS tokens with vector logos. No raster-generation tool or new component library is needed.

Rationale: these are precise geometric brand assets; the existing framework already provides every required primitive. The 21st CLI initialized design context; catalog search could not proceed without sign-in. Tailwind's snapshot requires a separate license acceptance, so no download is performed without permission.
