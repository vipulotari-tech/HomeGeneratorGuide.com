# Spec: Editorial-director brand pass

**Status**: Active | **Date**: 2026-10-03

## Adopted (honest subset)
1. Logo: house silhouette + roofline bolt, navy; wordmark unchanged; tagline "Power When It Matters Most" in footer + About.
2. Favicon: minimal bolt-in-house-outline, legible at 16px.
3. Mission statement verbatim → About page mission block.
4. MethodBox upgrade: name NEC / NFPA / EPA / CPSC, cite-every-source, name the (single, real) researcher, corrections link.
5. DESIGN.md voice rules (neighbor tone) for future content.

## Explicitly refused (with reason, reported to user)
- R1. "Reviewed by a licensed electrician before publication" + "We name every expert": NO such reviewer exists. Publishing it would fabricate authority — violates the site's own honesty constraints and prior explicit orders. MethodBox instead states the true boundary (no pro review; hire one).
- R2. Full palette swap (#1e3a5f→#1B3A6B, #f97316→#F5821F): near-identical hues; swap would invalidate the measured a11y-100 contrast work for zero perceptible gain. Existing tokens retained; semantic alert tones already cover success/danger roles.

## Acceptance
- Build + tsc + QA green; header/footer screenshots at 390/1440; contrast re-check on new/edited text; no new JS; commit+push+deploy.
