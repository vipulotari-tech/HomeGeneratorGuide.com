jobs = [
    ('src/pages/guides/first-time-buyer-guide.astro', '<section',
     ('/images/home-evening-backup.webp', 'Suburban home glowing at dusk while the street goes dark — the standby promise', 1792, 1232,
      'Illustrative photo.')),
    ('src/pages/installation/generator-pad-and-placement.astro', '<section',
     ('/images/standby-on-pad.webp', 'Standby generator installed on a concrete pad beside a home', 1536, 1024,
      'Illustrative photo.')),
    ('src/pages/cost/transfer-switch-cost.astro', '<section',
     ('/images/standby-with-transfer-switch.webp', 'Standby generator with a wall-mounted transfer switch beside the meter', 1672, 941,
      'Illustrative photo.')),
    ('src/pages/comparisons/standby-vs-portable.astro', '<section',
     ('/images/portable-vs-standby.webp', 'Portable generator stored in a garage beside an outdoor standby unit', 1536, 1024,
      'Left side shows storage only — never operate a portable inside a garage. See safety notes below.')),
    ('src/pages/maintenance/generator-maintenance-checklist.astro', '<section',
     ('/images/standby-dusk-led.webp', 'Standby generator at dusk with its green status LED lit', 1536, 1024,
      'Illustrative photo.')),
    ('src/pages/guides/us-power-outage-statistics.astro', '<section',
     ('/images/suburban-dusk-wide.webp', 'Suburban street at dusk', 1536, 1024,
      'Illustrative photo.')),
    ('src/pages/guides/generator-safety-carbon-monoxide.astro', '<section',
     ('/images/standby-vents-closeup.webp', 'Close-up of standby generator vents and status LEDs', 1536, 1024,
      'Illustrative photo. Keep vents and clearances open.')),
]

for path, anchor, (src, alt, w, h, cap) in jobs:
    t = open(path, encoding='utf-8').read()
    fig = (f'  <figure class="not-prose my-6">\n'
           f'    <img src="{src}" alt="{alt}" width="{w}" height="{h}" loading="lazy" decoding="async" class="w-full rounded-xl border border-[#e5e7eb]" />\n'
           f'    <figcaption class="mt-2 text-sm text-gray-500">{cap}</figcaption>\n'
           f'  </figure>\n')
    i = t.index(anchor)
    t = t[:i] + fig + t[i:]
    open(path, 'w', encoding='utf-8').write(t)
    print('img added:', path)

# about page uses BaseLayout: insert before prose div
path = 'src/pages/about.astro'
t = open(path, encoding='utf-8').read()
fig = ('  <figure class="my-6">\n'
       '    <img src="/images/home-daytime.webp" alt="Suburban US home in daylight" width="1536" height="1024" loading="lazy" decoding="async" class="w-full rounded-xl border border-[#e5e7eb]" />\n'
       '    <figcaption class="mt-2 text-sm text-gray-500">Illustrative photo.</figcaption>\n'
       '  </figure>\n')
anchor = '<div class="prose-hgg'
i = t.index(anchor)
t = t[:i] + fig + t[i:]
open(path, 'w', encoding='utf-8').write(t)
print('img added:', path)
