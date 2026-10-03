import os, glob
from PIL import Image

mapping = {
    'sizing-elec': 'sizing-electrician-panel',
    'cost-instal': 'cost-install-quote',
    'standby-fro': 'standby-front-neutral',
    'maintenance': 'maintenance-technician-service',
    'install-cre': 'install-crew-setting-unit',
    'co-detector': 'co-detector-bedroom',
    'propane-tan': 'propane-tanks-home',
    'transfer-sw': 'transfer-switch-panel',
    'storm-outag': 'storm-outage-suburb',
    'two-standb': 'two-standby-units',
}
os.makedirs('public/images', exist_ok=True)
for f in sorted(glob.glob('images/Max_a_*.png')):
    base = os.path.basename(f)
    key = next((k for k in mapping if k in base), None)
    if not key:
        print('NO MAP:', base)
        continue
    im = Image.open(f).convert('RGB')
    out = f'public/images/{mapping[key]}.webp'
    im.save(out, 'WebP', quality=80, method=6)
    print(f'{mapping[key]}.webp: {im.width}x{im.height}, {os.path.getsize(out)//1024} KB')
