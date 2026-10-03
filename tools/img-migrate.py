import os
from PIL import Image

src = 'images'
dst = 'public/images'
os.makedirs(dst, exist_ok=True)

# exact duplicates + rejected near-identical variants
drop = [
    'Max_a_Photorealistic_close (2).png',
    'Max_a_Photorealistic_wide- (1).png',
    'Max_a_Split-screen_photore (1).png',
    'Max_a_Photorealistic_image (1).png',
    'Max_a_Photorealistic_image (2).png',
    'Max_a_Photorealistic_close.png',
]
for f in drop:
    p = os.path.join(src, f)
    if os.path.exists(p):
        os.remove(p)
        print('deleted:', f)

keep = {
    'b_Photorealistic_image.webp': 'home-evening-backup.webp',
    'Max_a_Clean_professional_t.png': 'home-daytime.webp',
    'Max_a_Photorealistic_close (1).png': 'standby-on-pad.webp',
    'Max_a_Photorealistic_image.png': 'standby-dusk-led.webp',
    'Max_a_Photorealistic_close (3).png': 'standby-vents-closeup.webp',
    'Max_a_Photorealistic_side-.png': 'standby-with-transfer-switch.webp',
    'Max_a_Photorealistic_wide-.png': 'suburban-dusk-wide.webp',
    'Max_a_Split-screen_photore.png': 'portable-vs-standby.webp',
}
for old, new in keep.items():
    im = Image.open(os.path.join(src, old)).convert('RGB')
    out = os.path.join(dst, new)
    im.save(out, 'WebP', quality=80, method=6)
    kb = os.path.getsize(out) / 1024
    print(f'{new}: {im.width}x{im.height}, {kb:.0f} KB')
