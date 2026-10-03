# Feature Specification: Brand and editorial foundation

**Created**: 2026-10-03
**Status**: Ready for implementation
**Input**: Apply the homeowner-focused mission, independent editorial personality, exact publication promise, six brand colors, house-and-lightning logo, wordmark, tagline, and small-format favicon supplied by the publisher.

## User Scenarios & Testing

### User Story 1 - Understand who the site serves (Priority: P1)

A first-time American homeowner can understand the mission, find a starting guide, and research a major home investment without sales pressure.

**Independent Test**: Visit the homepage and About page; find the exact mission, clear first-time-buyer path, and independence commitment.

**Acceptance Scenarios**:
1. Given a first-time visitor, when they open the homepage, then the copy addresses their uncertainty in plain language and offers buying, sizing, and cost guides.
2. Given any page, when the visitor reaches the footer, then the verbatim mission and publication promise are visible.

### User Story 2 - Assess editorial trust honestly (Priority: P1)

A reader can distinguish the publication standard from review work that has actually happened, identify the research author, and check the source and independence policies.

**Independent Test**: Inspect an article and editorial policy; the real author is named, professional review status is explicit, and there is no invented expert or review badge.

**Acceptance Scenarios**:
1. Given no documented licensed reviewer, when an article is displayed, then electrician review is labeled pending and the exact promise is explicitly framed as the standard the site is working toward.
2. Given the independence policy, when a reader checks funding, then it excludes payments, advertising, sponsorship, and referral fees from generator brands, dealers, and installers.
3. Given technical source guidance, when the reader follows a reference, then it points to official manufacturer, NFPA/NEC, or EPA material relevant to the claim.

### User Story 3 - Recognize a consistent accessible brand (Priority: P2)

Readers see the same navy house-and-lightning identity, semi-bold wordmark, tagline, and color system across desktop, mobile, articles, and error pages.

**Independent Test**: Inspect the homepage and an article at 320px, 390px, and 1440px; inspect the favicon at 16px.

**Acceptance Scenarios**:
1. Given any viewport, when the header appears, then the house/bolt identity and navigation fit without horizontal overflow.
2. Given a call to action, when it is rendered, then the orange background has readable text and visible keyboard focus.
3. Given a browser tab, when its favicon appears, then a navy bolt inside a navy house outline remains recognizable on white at 16px.

### Edge Cases

- Reviewer identity or credentials are missing: show pending status; never invent a person, license, review date, or completion badge.
- The reader opens a static server-error page: the brand, mission, and promise still appear.
- Orange does not provide sufficient contrast with white for small text: use the near-black foreground or navy link text.
- A page has no technical claims: the shared publication standard applies to articles and is not represented as review of a contact or policy page.
- Advertising flags or old affiliate copy conflict with independence: retain the disabled state and reconcile the copy.

## Requirements

### Functional Requirements

- **FR-001**: Publish verbatim: "HomeGeneratorGuide exists to give every American homeowner the same quality of advice they would get from a trusted licensed electrician friend — honest, complete, technically accurate, and completely free of brand bias or dealer influence."
- **FR-002**: Publish on every page verbatim: "Every article on HomeGeneratorGuide is written using manufacturer specifications, NEC code requirements, NFPA standards, and EPA regulations — then reviewed by a licensed electrician before publication. We cite every source. We name every expert. We never accept payment from generator brands."
- **FR-003**: Frame FR-002 as the publication standard being worked toward until documented reviews exist; display current article review status separately and prominently.
- **FR-004**: State no affiliation with generator brands, dealers, or installers, and never accept their advertising or payments.
- **FR-005**: Use a knowledgeable-neighbor voice: direct, honest, reassuring, and free of sales pressure or unsupported superlatives.
- **FR-006**: Address American homeowners aged 35–65 researching a substantial standby-generator purchase; support sizing, cost, installation, and maintenance research.
- **FR-007**: Use navy #1B3A6B, orange #F5821F, green #2D7D46, safety red #C0392B, slate background #F8F9FA, and near-black text #1A1A2E consistently.
- **FR-008**: Provide a house silhouette with a lightning bolt integrated into the roofline, semi-bold HomeGeneratorGuide wordmark, and exact tagline "Power When It Matters Most".
- **FR-009**: Provide a square navy-on-white house-outline and lightning favicon readable at 16px.
- **FR-010**: Preserve article sources, author attribution, responsive navigation, keyboard access, reduced-motion support, and readable contrast.
- **FR-011**: Document editorial sourcing, review requirements, independence, corrections, voice, and reader profile for future editors.

### Key Entities

- Brand identity: site name, exact mission, exact promise, tagline, colors, logo, and favicon.
- Editorial standard: source requirements, independence restrictions, author and reviewer evidence, corrections policy.
- Review status: pending until a named licensed reviewer and article-specific review evidence are verified.

## Success Criteria

- **SC-001**: Every generated public HTML page contains the exact mission and promise, including error pages.
- **SC-002**: Every article clearly labels pending licensed review; no new expert credentials or completed-review claims are fabricated.
- **SC-003**: All six supplied colors are documented and used in the site's visual system.
- **SC-004**: Desktop and mobile navigation work at 320px, 390px, and 1440px without horizontal overflow.
- **SC-005**: Orange call-to-action text meets a 4.5:1 contrast ratio and all pages retain visible keyboard focus.
- **SC-006**: The browser icon is recognizable at 16px and the logo includes the exact site name and tagline.

## Assumptions

- Apply this foundation to the existing website and retain its homeowner-guide content and route structure.
- The existing publisher identity is real; no licensed reviewer has been documented in the workspace.
- A request for reviewer details is pending. The safe default is transparent pending status, not a fabricated endorsement.
- The user's $8,000–$25,000 describes the reader's intended spend, not a verified national cost statistic.
- "Most authoritative" is an editorial ambition, not a substantiated ranking claim for publication.
- This work prepares local changes; it does not publish a deployment or claim to have completed professional technical review.
