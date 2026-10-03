"""Append genuine, page-grounded FAQs. Answers derive ONLY from each page's
own content/research — no new facts invented. Run once (idempotent guard)."""

DATA = {
'src/pages/sizing/what-size-generator-do-i-need.astro': [
 ("How do I add up watts for generator sizing?",
  "List everything running at once, sum the running watts, add the single largest motor surge, then add 10–25% headroom. One DOL motor starting matters more than ten LED bulbs."),
],
'src/pages/cost/standby-generator-cost.astro': [
 ("What does a $12,000 install get versus a $22,000 install?",
  "Roughly: $12,000 buys a mid-size air-cooled unit on a straightforward site; $22,000 buys a large or liquid-cooled unit with complex gas runs, panel work, trenching, or difficult access. Same kilowatts, very different sites."),
],
'src/pages/maintenance/generator-maintenance-checklist.astro': [
 ("How long does standby service take?",
  "A standard annual visit runs about an hour: oil and filter, air filter check, plug inspection, battery test, and a transfer test. Comprehensive 2-year visits add plugs and valve checks."),
],
'src/pages/brands/generac.astro': [
 ("Does Generac make its own engines?",
  "Yes — G-Force purpose-built standby engines (459cc through 997cc across the Next Generation line), plus 4.5L liquid-cooled blocks for Protector models."),
 ("What is the most popular Generac standby size?",
  "The 22–24 kW class is the most commonly quoted whole-home step: it covers a 3-ton AC plus typical loads with headroom on most gas-heat homes."),
],
'src/pages/installation/what-to-expect.astro': [
 ("What should I ask a prospective installer?",
  "License numbers, a written load calculation, permit plan, gas scope in linear feet, panel work details, transfer-test and startup inclusion, warranty registration, and storm-season response times."),
 ("How do I prepare my yard for install day?",
  "Clear crew access to the panel, meter, and pad site; keep kids and pets inside; photograph the pre-work state. The crew handles disconnection windows — get them in writing."),
],
'src/pages/comparisons/generac-vs-kohler.astro': [
 ("Which is quieter, Generac or Kohler?",
  "At comparable kilowatts both test in the same band — Generac 22–28 kW at 67 dB, Kohler flagships as low as 56 dB on select models. Placement and load matter more than badge; compare exact-model sheets."),
 ("Which warranty is better?",
  "Kohler covers parts, labor, and travel throughout its 5-year/2,000-hour term; Generac tiers down to parts-only, then engine/alternator-only. Read current PDFs — terms change."),
 ("Is Kohler worth the premium?",
  "When the spread buys corrosion resistance, diagnostic depth, a comprehensive warranty, or a standout local dealer — yes. When none of those apply to your site, take the value pick."),
],
'src/pages/brands/kohler.astro': [
 ("What sizes does Kohler offer?",
  "Air-cooled 10–26 kW (RESV/RCA) plus liquid-cooled RCL models from 24 to 60 kW for estates and long runtimes."),
 ("Does OnCue monitoring cost extra?",
  "The app is free; Wi-Fi monitoring carries no subscription, while cellular plans may. Confirm what your quote bundles before assuming."),
 ("Where are Kohler standby units built?",
  "Kohler, Wisconsin heritage with standby production in Mosel, Wisconsin (plant expanded 2022)."),
 ("How much does a Kohler standby cost installed?",
  "Equipment MSRP runs $3,946–$7,546 air-cooled ($17,900–$28,304 liquid-cooled); installed all-in tracks the national $9,000–$16,000+ band by site scope."),
],
'src/pages/guides/natural-gas-vs-propane.astro': [
 ("Can a standby switch fuels after install?",
  "Core standby models are NG/LP field-configurable, but conversion is installer work with pipe, regulator, and control adjustments — decide fuel before install day, not after."),
 ("Does cold weather hurt propane performance?",
  "Yes — vaporization drops in the cold, which is why underground tanks (ground warmth) outperform above-ground in sub-zero regions."),
 ("How do I know my gas meter is big enough?",
  "Standard 250-CFH meters cover roughly 10–14 kW plus appliances; 20 kW+ almost always needs an upgrade. The utility runs a free load calc — start it 1–3 weeks before install."),
],
'src/pages/guides/us-power-outage-statistics.astro': [
 ("What is SAIDI?",
  "System Average Interruption Duration Index — total outage hours per customer per year. The US ran 11.0 hours in 2024 against a 5.5–6 hour decade baseline."),
 ("Why are rural outages so much longer?",
  "Longer feeder lines, denser vegetation, lower hardening budgets per customer, and harder crew access — rural SAIDI runs 3–4× urban with 2–3× slower restoration."),
 ("Which weather causes the worst outages?",
  "Gulf hurricanes and Texas freeze events dominate the modern era: multi-day, multi-million-customer outages. Ice and tornado belts fill out the top-15 states."),
 ("Do brief blips matter for sizing?",
  "No — size for your worst realistic week, not the average 90-minute outage. Brief blips argue for a portable + inlet, not standby."),
],
'src/pages/guides/generator-safety-carbon-monoxide.astro': [
 ("How often must detectors be replaced?",
  "Every 5–7 years — check the printed date, not your memory. Test monthly, fresh batteries yearly."),
 ("Where exactly do detectors go?",
  "Every level plus outside each sleeping area, within 10–15 feet. Battery or hardwired-with-backup — outages kill power-only units."),
 ("Are children or pets affected differently?",
  "Children, infants, the elderly, and heart/lung patients are most vulnerable, and pets showing simultaneous symptoms are a classic multi-victim tell."),
 ("Alarm sounds but nobody feels sick — still leave?",
  "Yes — evacuate, call 911 from outside, and do not re-enter until cleared. Absent symptoms change nothing about the protocol."),
],
}
print('part 1 pages:', len(DATA))
