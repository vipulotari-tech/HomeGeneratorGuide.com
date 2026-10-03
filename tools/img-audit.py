import hashlib, os
from PIL import Image

d = 'images'
files = sorted(os.listdir(d))
print(f"{'file':45} {'MB':>6} {'dims':>12} sha1-8")
seen = {}
for f in files:
    p = os.path.join(d, f)
    h = hashlib.sha1(open(p, 'rb').read()).hexdigest()[:8]
    try:
        im = Image.open(p); dims = f'{im.width}x{im.height}'
    except Exception as e:
        dims = 'ERR'
    size = os.path.getsize(p) / 1e6
    dup = '  DUP of ' + seen[h] if h in seen else ''
    seen.setdefault(h, f)
    print(f'{f:45} {size:6.1f} {dims:>12} {h}{dup}')
