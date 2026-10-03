"""Add claim-matched sources to article pages lacking them. Only uses URLs
the project has verified before. Skips pages that already define sources."""
import re

EIA = ('U.S. EIA — Electricity Data Browser', 'https://www.eia.gov/electricity/')
EIA_NG = ('U.S. EIA — Natural Gas Monthly', 'https://www.eia.gov/naturalgas/monthly/')
DSIRE = ('DSIRE — State Incentive Database', 'https://www.dsireusa.org/')
ESAVER = ('DOE Energy Saver', 'https://www.energy.gov/energysaver')
GEN_LIN = ('Generac — Residential Standby Lineup', 'https://www.generac.com/residential-products/standby-generators/')
GEN_SUP = ('Generac Support — Owner Resources', 'https://support.generac.com/')
GEN_DLR = ('Generac — Find a Dealer', 'https://www.generac.com/dealers-installers/')
KOHLER = ('Kohler Home Energy — Home Generators', 'https://www.kohlerhomeenergy.rehlko.com/products/home-generators')
KOHLER_W = ('Kohler — Warranty Promise', 'https://www.kohlerhomeenergy.rehlko.com/resource-center/warranty-promise')
CUMMINS = ('Cummins — QuietConnect Series', 'https://www.cummins.com/en-in/na/generators/home-standby/quietconnect-series')
BRIGGS = ('Briggs & Stratton — Residential Standby', 'https://energy.briggsandstratton.com/en-us/products/residential-standby-generators')
CHAMP = ('Champion — Home Standby Generators', 'https://www.championpowerequipment.com/products/generators/home-standby-generators/')
CPSC = ('CPSC — Carbon Monoxide Information Center', 'https://www.cpsc.gov/Safety-Education/Safety-Education-Centers/Carbon-Monoxide-Information-Center')
CDC = ('CDC — Carbon Monoxide Poisoning', 'https://www.cdc.gov/carbon-monoxide/about/index.html')
EPA = ('EPA — Indoor Air Quality and CO', 'https://www.epa.gov/indoor-air-quality-iaq')
CPSC_REC = ('CPSC — Recall Search', 'https://www.cpsc.gov/Recalls')
NFPA70 = ('NFPA 70 — National Electrical Code', 'https://www.nfpa.org/codes-and-standards/nfpa-70-standard-development/70')
NFPA37 = ('NFPA 37 — Stationary Combustion Engines', 'https://www.nfpa.org/codes-and-standards/nfpa-37-standard-development/37')

T = 'Manufacturer'
G = 'Government'
S = 'Safety authority'
M = 'Technical manual'
I = 'Industry'
V = 'Oct 2026'

def src(label_url, typ):
    (label, href) = label_url
    return (label, href, typ)

PAGES = {
 'src/pages/sizing/hvac-generator-sizing.astro': [src(GEN_LIN, T), src(ESAVER, G), src(KOHLER, T)],
 'src/pages/sizing/well-pump-generator-sizing.astro': [src(GEN_LIN, T), src(EIA, G), src(ESAVER, G)],
 'src/pages/sizing/whole-home-vs-essential-loads.astro': [src(GEN_LIN, T), src(KOHLER, T), src(EIA, G)],
 'src/pages/sizing/what-size-for-2000-sq-ft.astro': [src(GEN_LIN, T), src(ESAVER, G), src(EIA, G)],
 'src/pages/sizing/appliance-wattage-chart.astro': [src(ESAVER, G), src(EIA, G), src(GEN_LIN, T)],
 'src/pages/sizing/understanding-generator-ratings.astro': [src(GEN_LIN, T), src(KOHLER, T), src(EIA, G)],
 'src/pages/cost/installation-cost-breakdown.astro': [src(GEN_LIN, T), src(GEN_DLR, T), src(EIA_NG, G)],
 'src/pages/cost/generator-roi-outage-costs.astro': [src(EIA, G), src(DSIRE, G), src(GEN_LIN, T)],
 'src/pages/cost/transfer-switch-cost.astro': [src(GEN_LIN, T), src(KOHLER, T), src(NFPA70, G)],
 'src/pages/brands/briggs-stratton.astro': [src(BRIGGS, T), src(GEN_LIN, T), src(EIA, G)],
 'src/pages/brands/champion.astro': [src(CHAMP, T), src(GEN_LIN, T), src(EIA, G)],
 'src/pages/brands/cummins.astro': [src(CUMMINS, T), src(GEN_LIN, T), src(EIA, G)],
 'src/pages/brands/kohler.astro': [src(KOHLER, T), src(KOHLER_W, T), src(GEN_LIN, T)],
 'src/pages/comparisons/standby-vs-portable.astro': [src(GEN_LIN, T), src(CPSC, S), src(EIA, G)],
 'src/pages/comparisons/transfer-switch-vs-interlock.astro': [src(GEN_LIN, T), src(KOHLER, T), src(NFPA70, G)],
 'src/pages/installation/generator-pad-and-placement.astro': [src(GEN_SUP, M), src(NFPA37, G), src(CPSC, S)],
 'src/pages/installation/what-to-expect.astro': [src(GEN_SUP, M), src(GEN_DLR, T), src(NFPA70, G)],
 'src/pages/guides/first-time-buyer-guide.astro': [src(GEN_LIN, T), src(KOHLER, T), src(EIA, G)],
 'src/pages/guides/generator-glossary.astro': [src(NFPA70, G), src(EIA, G), src(GEN_LIN, T)],
 'src/pages/guides/generator-safety-overview.astro': [src(CPSC, S), src(CDC, S), src(EPA, S), src(NFPA37, G)],
 'src/pages/guides/how-long-can-generator-run.astro': [src(EIA_NG, G), src(GEN_LIN, T), src(EIA, G)],
 'src/pages/guides/power-quality-thd-surge-protection.astro': [src(GEN_SUP, M), src(EIA, G), src(KOHLER, T)],
 'src/pages/guides/us-power-outage-statistics.astro': [src(EIA, G), src(ESAVER, G)],
 'src/pages/guides/natural-gas-vs-propane.astro': [src(EIA_NG, G), src(GEN_LIN, T), src(DSIRE, G)],
}

done = skipped = 0
for path, items in PAGES.items():
    t = open(path, encoding='utf-8').read()
    if re.search(r'\nsources=\{', t) or '\n  sources={[' in t or 'sources={[' in t:
        print('skip (has sources):', path)
        skipped += 1
        continue
    m = re.search(r'<ArticleLayout\b', t)
    assert m, path
    # anchor on the related prop, present on its own line in every usage
    assert '\n  related={[' in t, path
    block = '  sources={[\n' + '\n'.join(
        f'    {{ label: {label!r}, href: {href!r}, type: {typ!r}, verified: {V!r} }},'
        for label, href, typ in items) + '\n  ]}\n'
    t = t.replace('\n  related={[', '\n' + block.rstrip('\n') + '\n  related={[', 1)
    open(path, 'w', encoding='utf-8').write(t)
    done += 1
    print(f'+{len(items)} sources: {path}')
print(f'DONE: {done} pages, {skipped} skipped')
