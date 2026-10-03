import re
h = open('dist/index.html', encoding='utf-8').read()
m = re.search(r'<svg viewBox="0 0 480 320".*?</svg>', h, re.S)
assert m, 'hero svg missing'
svg = m.group(0)
# collect text anchors (x, y, size, content)
texts = re.findall(r'<text x="([\d.]+)" y="([\d.]+)".*?font-size="(\d+)".*?>(.*?)</text>', svg)
print('texts:', [(t[3][:28].replace('→', '->'), t[0], t[1]) for t in texts])
# flow lines at y=219, x 210-348; label rows must stay clear (y<=200 or y>=232 for that x span)
for content, x, y, size in texts:
    x, y = float(x), int(float(y))
    if 200 <= x <= 470 and 200 <= y <= 232:
        raise SystemExit(f'OVERLAP RISK: {content!r} at ({x},{y}) crosses flow line y=219')
# bolt path y range 78-146; 'Standby generator' label at y=152 -> clear
assert 'animation' in svg or 'flow' in svg
print('no text/flow-line overlaps; bolt above label; OK')
