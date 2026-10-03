import re, glob, os
print(f"{'page':50} {'main-words':>10}")
rows = []
for p in sorted(glob.glob('dist/**/*.html', recursive=True)):
    html = open(p, encoding='utf-8').read()
    m = re.search(r'<main.*?</main>', html, re.S)
    main = m.group(0) if m else html
    main = re.sub(r'<script.*?</script>', ' ', main, flags=re.S)
    text = re.sub(r'<[^>]+>', ' ', main)
    w = len(re.findall(r'\b[\w’\']+\b', text))
    rel = os.path.relpath(p, 'dist')
    rows.append((rel, w))
    print(f'{rel:50} {w:>10}')
tot = sum(w for _, w in rows)
print(f'\nTOTAL main-content words: {tot:,}')
print(f'Average per page: {tot//len(rows):,}')
