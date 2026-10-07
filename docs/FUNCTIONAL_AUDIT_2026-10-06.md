# HomeGeneratorGuide functional audit — October 6, 2026

Baseline: `86e9f7eb70d6c65c046031b6f654cf11689d11ba`, deployed to the existing Workers staging URL. This audit covers functional behavior and presentation; it is not a fresh professional review of generator engineering or every external manufacturer document.

## Confirmed defects and repairs

1. **Collapsed quote validation:** an invalid amount inside a closed installation-scope disclosure blocked Compare and produced an “invalid form control is not focusable” browser error. Invalid sections now open before native validation focuses the field. Print uses the same validation.
2. **Saved-plan data loss:** malformed saved load rows could erase the current unsaved list and partially replace controls before the error appeared. The complete draft is now validated before any current fields change. Failed recovery retains current work.
3. **Fuel save inconsistency:** changing the scenario size to 40 kW, saving and loading a selected preset restored 22 kW. Size edits now detach preset attribution, and loading never reapplies preset values over saved inputs. Presets use stable model/load keys instead of array positions. Legacy index-based fuel drafts keep their input numbers as custom rates requiring source confirmation.
4. **No-JavaScript submission:** without JavaScript, the quote form submitted entered values as URL query parameters. Calculate and storage/print actions now remain disabled until their browser handlers initialize. The static worksheet and checklist remain linked as fallbacks.
5. **Keyboard continuity:** adding a load left focus on Add; removing a row could lose the user's position. Add focuses the new name; Remove focuses an adjacent row or Add. Load legends are numbered, and Remove controls identify their load.
6. **Fuel unit changes:** ownership unit changes retained the old numeric rate and price under a different unit. Those two fields now clear on unit changes with an explanation, requiring values in the new unit.
7. **Print and long text:** full fuel/ownership input records are available under an expandable summary and expand for printing. Long source text wraps, fixed input-record columns prevent squeezed labels, and printed results replace duplicate editable controls. Sizing results retain quantity and per-unit running/starting inputs. The maintenance print action now has a visible button surface and a 48px target.
8. **Anchor visibility:** headings and the main-content skip target receive sticky-header scroll clearance.

No manufacturer specification, professional-review status, pricing claim or calculation formula was changed.

## Test coverage

The new `tools/qa-functional.mjs` audit exercised 104 generated content routes, inventoried 131 button instances, opened/closed 172 disclosures and checked 210 rendered images. Counts include shared navigation repeated across pages, not 131 distinct functions. Every distinct scripted button family is covered: navigation, add/remove load, calculation, save/load/delete/reset, planner print and maintenance print.

Additional checks include:

- Short-screen navigation at 320, 360, 390, 430, 768 and 1024px; menu open, Escape and returned keyboard focus.
- All 36 available manufacturer fuel test-point presets.
- Four planners with realistic scenarios, incomplete/invalid values, three-quote allowance adjustments, multiple loads, the 40-row limit and managed-load scenarios.
- All four save/load/delete flows, custom fuel round trips, malformed drafts and storage-denied behavior.
- Long unbroken source text, safe text rendering and populated mobile results.
- All planner print handlers and generated Letter PDFs; source assumptions included in the exported result.
- No-JavaScript controls disabled and Enter prevented from adding form data to the URL.
- Expanded/populated quote form automated accessibility audit: zero reported WCAG A/AA violations.
- Existing route, responsive, calculation, evidence, production HTML/SEO and seven-page accessibility regression suites retained.

The functional audit is now a GitHub Actions gate. Its local JSON result is retained as `docs/FUNCTIONAL_QA_RESULTS_2026-10-06.json`.

## Boundaries

- Contact form action and required fields were inspected; no email was sent. Mail-client compatibility, mailbox ownership and delivery cannot be certified by this audit.
- Browser Print / Save as PDF was tested; physical printers and every operating-system print dialog were not.
- Responsive Chromium checks and automated accessibility audits do not certify every physical device, browser, assistive technology or full WCAG conformance.
- This run checks internal destinations and rendered site assets. It does not claim every external manufacturer's server or PDF will always be available.
- The public custom-domain launch, Google indexing, licensed technical review and unresolved evidence fields remain separate work.

See the associated pull request and final delivery message for the observed merge, CI and Cloudflare deployment result. “Tested with no failures in this coverage” does not mean a guarantee of zero possible bugs.
