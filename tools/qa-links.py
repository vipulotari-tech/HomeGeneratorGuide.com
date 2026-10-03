import re, os, glob

dist = 'dist'
hrefs = {}
for root, _, files in os.walk(dist):
    for f in files:
        if f.endswith('.html'):
            p = os.path.join(root, f)
            html = open(p, encoding='utf-8').read()
            page = os.path.relpath(p, dist).replace('\\', '/')
            for m in re.findall(r'href="(/[^"#?]*)"', html):
                hrefs.setdefault(m, set()).add(page)

broken = []
for h, pages in sorted(hrefs.items()):
    if h in ('/og-image.svg', '/favicon.svg'):
        continue
    cand = 'index.html' if h == '/' else h.strip('/') + '/index.html'
    if not os.path.exists(os.path.join(dist, cand)):
        broken.append((h, sorted(pages)[:3]))

print('total distinct internal hrefs:', len(hrefs))
print('BROKEN:', broken if broken else 'none')
print()
seen_titles = {}
for p in sorted(glob.glob('dist/**/*.html', recursive=True)):
    html = open(p, encoding='utf-8').read()
    t = re.search(r'<title>(.*?)</title>', html)
    c = re.search(r'canonical" href="([^"]+)"', html)
    d = re.search(r'name="description" content="([^"]+)"', html)
    r = re.search(r'name="robots" content="([^"]+)"', html)
    rel = os.path.relpath(p, dist)
    title = t.group(1) if t else 'NO TITLE'
    seen_titles.setdefault(title, []).append(rel)
    print(rel, '|', title[:72], '| canon:', c.group(1) if c else 'NONE',
          '| desc:', len(d.group(1)) if d else 0, 'chars',
          '| robots:', r.group(1) if r else '?')
print()
print('DUP TITLES:', {k: v for k, v in seen_titles.items() if len(v) > 1} or 'none')
print()
print('robots.txt:')
print(open('public/robots.txt').read())
