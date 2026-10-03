import re, os

def fig(src, alt, w, h, cap):
    return (f'  <figure class="not-prose my-6">\n'
            f'    <img src="{src}" alt="{alt}" width="{w}" height="{h}" loading="lazy" decoding="async" class="w-full rounded-xl border border-[#e5e7eb]" />\n'
            f'    <figcaption class="mt-2 text-sm text-gray-500">{cap}</figcaption>\n'
            f'  </figure>\n')

def insert_before_first_section(path, block):
    t = open(path, encoding='utf-8').read()
    i = t.index('<section')
    t = t[:i] + block + t[i:]
    open(path, 'w', encoding='utf-8').write(t)

def replace_figure_src(path, old_src, block):
    t = open(path, encoding='utf-8').read()
    pat = re.compile(r'  <figure class="not-prose my-6">.*?</figure>\n', re.S)
    ms = list(pat.finditer(t))
    hit = [m for m in ms if old_src in m.group(0)]
    assert len(hit) == 1, (path, len(hit))
    t = t[:hit[0].start()] + block + t[hit[0].end():]
    open(path, 'w', encoding='utf-8').write(t)

W = H = (1536, 1024)
new_figures = [
    ('src/pages/sizing/what-size-generator-do-i-need.astro',
     fig('/images/sizing-electrician-panel.webp', 'Licensed electrician testing a residential breaker panel with a clamp meter', 1536, 1024, 'Illustrative photo.')),
    ('src/pages/cost/standby-generator-cost.astro',
     fig('/images/cost-install-quote.webp', 'Contractor reviewing an installation quote with homeowners beside their new standby generator', 1536, 1024, 'Illustrative photo.')),
    ('src/pages/brands/generac.astro',
     fig('/images/standby-front-neutral.webp', 'Generic beige standby generator on a concrete pad', 1536, 1024, 'Generic unit shown — see the lineup table for actual models.')),
    ('src/pages/installation/what-to-expect.astro',
     fig('/images/install-crew-setting-unit.webp', 'Installers lowering a standby generator onto a concrete pad', 1536, 1024, 'Illustrative photo.')),
    ('src/pages/guides/natural-gas-vs-propane.astro',
     fig('/images/propane-tanks-home.webp', 'Two above-ground propane tanks on concrete pads beside a home', 1536, 1024, 'Illustrative photo.')),
    ('src/pages/comparisons/generac-vs-kohler.astro',
     fig('/images/two-standby-units.webp', 'Two unbranded standby generators side by side (illustrative comparison, not specific brands)', 1536, 1024, 'Generic units shown.')),
]
for path, block in new_figures:
    insert_before_first_section(path, block)
    print('inserted:', path)

replace_figure_src('src/pages/maintenance/generator-maintenance-checklist.astro', '/images/standby-dusk-led.webp',
    fig('/images/maintenance-technician-service.webp', 'Service technician testing a standby generator with a multimeter', 1536, 1024, 'Illustrative photo.'))
print('replaced: maintenance')
replace_figure_src('src/pages/guides/generator-safety-carbon-monoxide.astro', '/images/standby-vents-closeup.webp',
    fig('/images/co-detector-bedroom.webp', 'Carbon monoxide detector mounted on a bedroom hallway wall', 1536, 1024, 'Illustrative photo.'))
print('replaced: co-safety')
replace_figure_src('src/pages/cost/transfer-switch-cost.astro', '/images/standby-with-transfer-switch.webp',
    fig('/images/transfer-switch-panel.webp', 'Outdoor transfer switch enclosure beside the electric meter', 1536, 1024, 'Illustrative photo.'))
print('replaced: switch')
replace_figure_src('src/pages/guides/us-power-outage-statistics.astro', '/images/suburban-dusk-wide.webp',
    fig('/images/storm-outage-suburb.webp', 'Storm clouds over a suburban street with one home lit during an outage', 1536, 1024, 'Illustrative photo.'))
print('replaced: outage-stats')

for f in ['standby-dusk-led.webp', 'standby-vents-closeup.webp',
          'standby-with-transfer-switch.webp', 'suburban-dusk-wide.webp']:
    os.remove(f'public/images/{f}')
    print('deleted unused:', f)
