import re, glob, os

# coverage: every built page must be in sitemap (except 404/500), and every
# sitemap URL must resolve to a built file. No staging host may leak in.
sm = open('dist/sitemap-0.xml', encoding='utf-8').read()
urls = re.findall(r'<loc>(.*?)</loc>', sm)
print('sitemap urls:', len(urls))
if any('workers.dev' in u or 'localhost' in u for u in urls):
    raise SystemExit('STAGING LEAK IN SITEMAP')

built = set()
for p in glob.glob('dist/**/*.html', recursive=True):
    rel = os.path.relpath(p, 'dist').replace('\\', '/')
    if rel in ('404.html', '500.html'):
        continue
    u = 'https://homegeneratorguide.com/' + ('' if rel == 'index.html' else rel[:-len('index.html')])
    built.add(u)

missing = sorted(built - set(urls))
extra = sorted(set(urls) - built)
print('built pages:', len(built))
print('in sitemap but not built:', extra or 'NONE')
print('built but not in sitemap:', missing or 'NONE')
if missing or extra:
    raise SystemExit('COVERAGE MISMATCH')
print('COVERAGE OK')
