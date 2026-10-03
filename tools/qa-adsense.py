import re, glob, os

rows = []
for p in sorted(glob.glob('dist/**/*.html', recursive=True)):
    html = open(p, encoding='utf-8').read()
    rel = os.path.relpath(p, 'dist')
    text = re.sub(r'<script.*?</script>', ' ', html, flags=re.S)
    text = re.sub(r'<style.*?</style>', ' ', text,flags=re.S) if False else text
    text = re.sub(r'<[^>]+>', ' ', text)
    words = len(re.findall(r'\b[\w’\']+\b', text))
    ads = len(re.findall(r'ADSENSE:', html))
    ext = sorted(set(re.findall(r'href="(https?://[^"]+)"', html)))
    rows.append((rel, words, ads, ext))

print(f"{'page':55} {'words':>6} {'ads':>3} ext-links")
thin = []
for rel, w, a, e in rows:
    flag = '  <-- THIN' if w < 300 and rel != '404.html' else ''
    if w < 300 and rel != '404.html':
        thin.append(rel)
    print(f'{rel:55} {w:>6} {a:>3} {len(e):>3}{flag}')
print('\nthin pages:', thin or 'NONE')
print('\nexternal domains used:')
doms = sorted({re.sub(r'https?://([^/]+).*', r'\1', u) for _, _, _, e in rows for u in e})
print('\n'.join(doms) or '(none)')
print('\nprivacy checks:')
priv = open('dist/privacy-policy/index.html', encoding='utf-8').read().lower()
for kw in ['cookies', 'google', 'adsense', 'third parties', 'opt out', 'aboutads', 'affiliate']:
    print(f'  {kw}: {"YES" if kw in priv else "NO"}')
print('\nrobots.txt:'); print(open('dist/robots.txt').read())
print('ads.txt exists:', os.path.exists('dist/ads.txt'))
