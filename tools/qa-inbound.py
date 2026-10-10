import re, glob, os
from collections import defaultdict

# inbound internal link audit: which pages receive few contextual links
pages = {}
for p in glob.glob('dist/**/*.html', recursive=True):
    rel = os.path.relpath(p, 'dist').replace('\\', '/')
    url = '/' + rel[:-len('index.html')].rstrip('/') + '/' if rel != 'index.html' else '/'
    if rel == 'index.html':
        url = '/'
    pages[rel] = (url, open(p, encoding='utf-8').read())

inbound = defaultdict(list)
for rel, (url, html) in pages.items():
    for m in set(re.findall(r'href="((?:https://standbygeneratorguide\.com)?/[^"#?]*)"', html)):
        m = re.sub(r'^https://standbygeneratorguide\.com', '', m)
        target = m if m == '/' else m.rstrip('/') + '/'
        inbound[target].append(url)

print(f"{'url':55} {'inbound':>7}")
for target in sorted(inbound):
    print(f'{target:55} {len(inbound[target]):>7}')
print('\nweak (<3 inbound, excl 404/500):',
      [t for t in inbound if len(inbound[t]) < 3 and '404' not in t and '500' not in t] or 'NONE')
