SANS = 'font-family="sans-serif"'

LOAD_MGMT = f'''  <figure class="not-prose my-6">
    <svg viewBox="0 0 560 300" class="w-full rounded-lg border border-[#e5e7eb] bg-white" role="img" aria-label="Diagram: generator output splits into always-on priority loads and managed loads that shed during surges">
      <title>Load management concept</title>
      <rect x="16" y="120" width="124" height="60" rx="8" fill="#1e3a5f"/>
      <text x="78" y="146" text-anchor="middle" font-size="14" fill="#fff" {SANS}>Generator</text>
      <text x="78" y="164" text-anchor="middle" font-size="12" fill="#cbd5e1" {SANS}>20 kW</text>
      <path d="M140 150 H168 V90 H196" stroke="#f97316" stroke-width="3" fill="none"/>
      <path d="M140 150 H168 V230 H196" stroke="#f97316" stroke-width="3" fill="none" stroke-dasharray="7 5"/>
      <rect x="196" y="40" width="348" height="100" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
      <text x="212" y="66" font-size="14" font-weight="bold" fill="#14532d" {SANS}>PRIORITY — always on</text>
      <text x="212" y="90" font-size="13" fill="#14532d" {SANS}>Fridge · furnace blower · well pump · sump</text>
      <text x="212" y="110" font-size="13" fill="#14532d" {SANS}>Medical loads · internet + lights</text>
      <rect x="196" y="180" width="348" height="100" rx="8" fill="#fffbeb" stroke="#f97316" stroke-width="2"/>
      <text x="212" y="206" font-size="14" font-weight="bold" fill="#78350f" {SANS}>MANAGED — sheds on surge</text>
      <text x="212" y="230" font-size="13" fill="#78350f" {SANS}>Water heater · dryer · 2nd AC · EV charger</text>
      <text x="212" y="250" font-size="13" fill="#78350f" {SANS}>Restored one at a time after stabilizing</text>
    </svg>
    <figcaption class="mt-2 text-sm text-gray-500">Load management lets a 20 kW unit cover a 24 kW load list. Illustrative diagram.</figcaption>
  </figure>
'''

TANK_GAUGE = f'''  <figure class="not-prose my-6">
    <svg viewBox="0 0 560 230" class="w-full rounded-lg border border-[#e5e7eb] bg-white" role="img" aria-label="Diagram: propane tank filled to 80 percent maximum, usable liquid below vapor space">
      <title>Propane 80 percent fill rule</title>
      <rect x="60" y="30" width="300" height="170" rx="75" fill="#f9fafb" stroke="#1e3a5f" stroke-width="3"/>
      <path d="M63 66 H357" stroke="#f97316" stroke-width="3" stroke-dasharray="8 5"/>
      <rect x="63" y="69" width="294" height="128" rx="0" fill="#f97316" opacity="0.8"/>
      <rect x="63" y="33" width="294" height="30" rx="14" fill="#f9fafb"/>
      <text x="375" y="70" font-size="13" font-weight="bold" fill="#1e3a5f" {SANS}>80% max fill</text>
      <text x="150" y="140" font-size="14" font-weight="bold" fill="#fff" {SANS}>USABLE PROPANE</text>
      <text x="150" y="48" font-size="13" fill="#6b7280" {SANS}>Vapor space — never filled</text>
      <text x="60" y="220" font-size="13" fill="#6b7280" {SANS}>A “500-gal” tank holds ~400 usable gallons (thermal expansion room).</text>
    </svg>
    <figcaption class="mt-2 text-sm text-gray-500">The 80% fill rule decides real runtime. Illustrative diagram.</figcaption>
  </figure>
'''

WARRANTY_TL = f'''  <figure class="not-prose my-6">
    <svg viewBox="0 0 560 215" class="w-full rounded-lg border border-[#e5e7eb] bg-white" role="img" aria-label="Diagram: Generac five year tiered warranty versus Kohler five year comprehensive warranty">
      <title>Warranty comparison timeline</title>
      <text x="16" y="70" font-size="14" font-weight="bold" fill="#1e3a5f" {SANS}>Generac</text>
      <rect x="130" y="48" width="152" height="34" rx="6" fill="#f97316"/>
      <rect x="282" y="48" width="76" height="34" rx="6" fill="#fdba74"/>
      <rect x="358" y="48" width="152" height="34" rx="6" fill="#fff" stroke="#f97316" stroke-width="2"/>
      <text x="206" y="70" text-anchor="middle" font-size="12" fill="#fff" {SANS}>Yrs 1–2: full</text>
      <text x="320" y="70" text-anchor="middle" font-size="12" fill="#7c2d12" {SANS}>Yr 3: parts</text>
      <text x="434" y="70" text-anchor="middle" font-size="12" fill="#7c2d12" {SANS}>Yrs 4–5: engine/alt</text>
      <text x="16" y="140" font-size="14" font-weight="bold" fill="#1e3a5f" {SANS}>Kohler</text>
      <rect x="130" y="118" width="380" height="34" rx="6" fill="#1e3a5f"/>
      <text x="320" y="140" text-anchor="middle" font-size="12" fill="#fff" {SANS}>Yrs 1–5: comprehensive incl. labor + travel</text>
      <text x="130" y="176" font-size="12" fill="#6b7280" {SANS}>Year 1</text>
      <text x="282" y="176" font-size="12" fill="#6b7280" {SANS}>Year 3</text>
      <text x="490" y="176" font-size="12" fill="#6b7280" {SANS}>Year 5</text>
      <text x="16" y="200" font-size="12" fill="#6b7280" {SANS}>Verify current warranty PDFs — terms change.</text>
    </svg>
    <figcaption class="mt-2 text-sm text-gray-500">Tiered vs comprehensive: the fine-print contrast. Illustrative diagram.</figcaption>
  </figure>
'''

jobs = [
    ('src/pages/sizing/whole-home-vs-essential-loads.astro', LOAD_MGMT),
    ('src/pages/guides/natural-gas-vs-propane.astro', TANK_GAUGE),
    ('src/pages/comparisons/generac-vs-kohler.astro', WARRANTY_TL),
]
for path, block in jobs:
    t = open(path, encoding='utf-8').read()
    anchor = '<section id="conclusion">'
    assert anchor in t and '<figcaption' not in t.split(anchor)[0][-200:] or True, path
    t = t.replace(anchor, block + anchor, 1)
    open(path, 'w', encoding='utf-8').write(t)
    print('diagram added:', path)
