# Feature Specification: Brand and editorial foundation

**Created**: 2026-10-03
**Status**: Implemented; current editorial copy supersedes earlier draft wording.
**Input**: Keep the site independent and homeowner-focused; use the approved identity, transparent editorial language, six brand colors, house-and-lightning logo, wordmark, tagline, and small-format favicon.

## User Scenarios & Testing

### User Story 1 — Understand who the site serves (Priority: P1)

A homeowner can understand the site's informational scope, find a sensible starting guide, and research standby-generator decisions without sales pressure.

**Independent Test**: Visit the homepage and About page; find the current mission, buyer-guide path, and independence commitment.

**Acceptance Scenarios**:
1. Given a first-time visitor, when they open the homepage, then the copy explains what the site can help with and links to buying, sizing, and cost guides.
2. Given any site page, when the visitor reaches the footer, then the current mission and editorial promise are visible.

### User Story 2 — Assess editorial trust honestly (Priority: P1)

A reader can distinguish desk research and source citations from professional review, identify the research author, and check the sourcing and independence policies.

**Independent Test**: Inspect an article, review-status page, and editorial policy; the publisher is named, professional-review limits are explicit, and no invented expert or review badge appears.

**Acceptance Scenarios**:
1. Given no documented licensed reviewer, when an article is displayed, then it does not claim professional signoff and clearly identifies the current review status.
2. Given the funding disclosure, when a reader checks monetization, then the site does not claim payments, advertising, sponsorship, or referral fees from generator brands, dealers, or installers.
3. Given technical source guidance, when the reader follows a reference, then it points to source material relevant to the stated claim and scope.

### User Story 3 — Recognize a consistent accessible brand (Priority: P2)

Readers see the same navy house-and-lightning identity, wordmark, tagline, and color system across desktop, mobile, articles, and error pages.

**Independent Test**: Inspect the homepage and an article at 320px, 390px, and 1440px; inspect the favicon at 16px.

**Acceptance Scenarios**:
1. Given a supported viewport, when the header appears, then the identity and navigation fit without horizontal overflow.
2. Given a call to action, when it is rendered, then the orange background has readable text and visible keyboard focus.
3. Given a browser tab, when its favicon appears, then a navy bolt inside a navy house outline remains recognizable at 16px.

## Edge Cases

- Reviewer identity or credentials are missing: state that no independent licensed review has been completed; never invent a person, license, review date, or completion badge.
- The reader opens a static server-error page: the brand, mission, and editorial limits still appear without a stale review claim.
- Orange does not provide sufficient contrast with white for small text: use the near-black foreground or navy link text.
- A page has no technical claims: shared disclosures are not represented as review of a contact or policy page.
- Advertising flags or old affiliate copy conflict with independence: retain the disabled state and reconcile the copy.

## Requirements

### Functional Requirements

- **FR-001**: Publish the current mission verbatim: "Standby Generator Guide is an independent informational publication helping US homeowners understand standby generator sizing, equipment, installation scope, costs, and maintenance before speaking with qualified local professionals."
- **FR-002**: Publish the current editorial promise verbatim: "We distinguish manufacturer specifications from manufacturer claims, estimates, and editorial interpretation. We link to source material where practical, do not claim hands-on testing or licensed review we have not performed, and update or correct material errors transparently."
- **FR-003**: State that no independent licensed professional has reviewed the current articles; distinguish source checking and research authorship from professional review.
- **FR-004**: State independence from generator brands, dealers, and installers, and prohibit their advertising, sponsorships, payments, paid placement, and referral fees.
- **FR-005**: Use a plain, direct, helpful voice without sales pressure, unsupported superlatives, or implied expertise.
- **FR-006**: Address US homeowners researching backup power without assuming a reader's age, budget, or product choice.
- **FR-007**: Use navy #1B3A6B, orange #F5821F, green #2D7D46, safety red #C0392B, slate background #F8F9FA, and near-black text #1A1A2E consistently.
- **FR-008**: Provide a house silhouette with a lightning bolt integrated into the roofline, Standby Generator Guide wordmark, and exact tagline "Power When It Matters Most".
- **FR-009**: Provide a square navy-on-white house-outline and lightning favicon readable at 16px.
- **FR-010**: Preserve article sources, author attribution, responsive navigation, keyboard access, reduced-motion support, and readable contrast.
- **FR-011**: Document editorial sourcing, review-status disclosure, independence, corrections, and technical limits for future editors.

### Key Entities

- Brand identity: site name, current mission, editorial promise, tagline, colors, logo, and favicon.
- Editorial approach: source requirements, independence restrictions, author attribution, and corrections.
- Review status: no independent licensed review completed; any later review must be documented for the specific article and scope.

## Success Criteria

- **SC-001**: Every generated public HTML page contains the current mission and editorial promise, including the static error page.
- **SC-002**: Article pages clearly disclose review limits; no expert credentials or completed-review claims are fabricated.
- **SC-003**: All six brand colors are documented and used in the site's visual system.
- **SC-004**: Desktop and mobile navigation work at 320px, 390px, and 1440px without horizontal overflow.
- **SC-005**: Orange call-to-action text meets a 4.5:1 contrast ratio and pages retain visible keyboard focus.
- **SC-006**: The browser icon is recognizable at 16px and the logo includes the exact site name and tagline.

## Assumptions

- Apply the foundation to the existing website and retain its homeowner-guide content and route structure.
- The publisher identity is supplied by the site owner; no trade license, product-testing role, or licensed reviewer is inferred.
- This specification prepares local changes; it does not publish a deployment or claim completed professional review.
