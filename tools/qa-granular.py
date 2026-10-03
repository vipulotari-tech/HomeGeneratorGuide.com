import re, glob, os
from collections import Counter

issues = []
for p in sorted(glob.glob('dist/**/*.html', recursive=True)):
    html = open(p, encoding='utf-8').read()
    rel = os.path.relpath(p, 'dist')
    # 1. duplicate ids
    ids = re.findall(r'id="([^"]+)"', html)
    dups = [k for k, c in Counter(ids).items() if c > 1]
    if dups:
        issues.append((rel, f'DUP IDS: {dups}'))
    # 2. heading order: first heading must be h1; no h3 before any h2
    heads = re.findall(r'<h([1-6])', html)
    if not heads or heads[0] != '1':
        issues.append((rel, f'FIRST HEADING NOT H1: {heads[:3]}'))
    seen = set()
    for h in heads:
        lvl = int(h)
        if lvl > 1 and not any(str(x) in seen for x in range(1, lvl)):
            issues.append((rel, f'SKIPPED HEADING LEVEL at h{lvl}'))
            break
        seen.add(h)
    # 3. img dimensions + alt
    for img in re.findall(r'<img[^>]*>', html):
        if 'alt=' not in img:
            issues.append((rel, 'IMG MISSING ALT'))
        if 'width=' not in img or 'height=' not in img:
            issues.append((rel, f'IMG MISSING DIMS: {img[:80]}'))
    # 4. canonical + og
    if '<link rel="canonical"' not in html:
        issues.append((rel, 'NO CANONICAL'))
    if 'og-image.svg' in html:
        issues.append((rel, 'STALE SVG OG REF'))
    # 5. empty links / buttons
    for a in re.findall(r'<a[^>]*>(.*?)</a>', html, re.S):
        if not a.strip() or a.strip() == '→':
            issues.append((rel, f'EMPTY LINK: {a[:40]}'))

print('granular issues:', len(issues))
for rel, msg in issues[:40]:
    print(f'  {rel}: {msg}')
