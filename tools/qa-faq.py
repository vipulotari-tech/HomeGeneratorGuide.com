import re, glob, os
print('page | faqs')
for p in sorted(glob.glob('src/pages/**/*.astro', recursive=True)):
    t = open(p, encoding='utf-8').read()
    if 'FAQSection' not in t:
        continue
    n = len(re.findall(r'\{\s*q:', t))
    print(os.path.relpath(p, 'src/pages'), '|', n)
