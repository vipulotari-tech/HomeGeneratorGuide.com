import re, json, glob

files = glob.glob('dist/**/*.html', recursive=True)
checked = 0
for p in files:
    html = open(p, encoding='utf-8').read()
    for m in re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S):
        data = json.loads(m)
        items = data if isinstance(data, list) else [data]
        for item in items:
            assert item.get('@context') == 'https://schema.org', p
            assert '@type' in item, p
        checked += 1
print('pages with JSON-LD blocks:', checked, '/', len(files))
print('all JSON-LD valid, schema.org context, has @type')

# heading order + h1 count + img alt check
for p in files:
    html = open(p, encoding='utf-8').read()
    h1s = len(re.findall(r'<h1', html))
    assert h1s == 1, (p, h1s)
    for img in re.findall(r'<img[^>]*>', html):
        assert 'alt=' in img, (p, img)
print('all pages: exactly 1 h1; all img have alt')
