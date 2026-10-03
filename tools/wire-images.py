import re

mapping = {
    'src/pages/maintenance/generator-maintenance-checklist.astro': '/images/maintenance-technician-service.webp',
    'src/pages/installation/what-to-expect.astro': '/images/install-crew-setting-unit.webp',
    'src/pages/guides/natural-gas-vs-propane.astro': '/images/propane-tanks-home.webp',
    'src/pages/guides/first-time-buyer-guide.astro': '/images/home-evening-backup.webp',
    'src/pages/installation/generator-pad-and-placement.astro': '/images/gas-connection-pad.webp',
    'src/pages/comparisons/standby-vs-portable.astro': '/images/outage-dark-vs-powered.webp',
    'src/pages/cost/transfer-switch-cost.astro': '/images/transfer-switch-panel.webp',
    'src/pages/guides/generator-safety-carbon-monoxide.astro': '/images/co-detector-bedroom.webp',
    'src/pages/guides/us-power-outage-statistics.astro': '/images/storm-outage-suburb.webp',
}
for path, img in mapping.items():
    t = open(path, encoding='utf-8').read()
    if re.search(r'\n\s*image="', t):
        print('already wired, skip:', path)
        continue
    assert t.count('updated="2026-10-03"') == 1, path
    t = t.replace('updated="2026-10-03"', f'updated="2026-10-03" image="{img}"', 1)
    open(path, 'w', encoding='utf-8').write(t)
    print('wired:', path)
