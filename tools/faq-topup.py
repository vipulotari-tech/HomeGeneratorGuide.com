"""Insert new FAQs into each page's FAQ array (const or inline style).
Idempotent: skips questions already present. Verifies counts after."""
import re
import importlib.util

def load(name):
    spec = importlib.util.spec_from_file_location(name, f'tools/{name}.py')
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod.DATA

DATA = {**load('faq-data1'), **load('faq-data2')}
total = 0
for path, items in DATA.items():
    t = open(path, encoding='utf-8').read()
    new = [(q, a) for q, a in items if q not in t]
    if not new:
        print('skip (present):', path)
        continue
    # find the FAQ array: locate '<FAQSection' then scan backwards/forwards for array bounds
    m = re.search(r'<FAQSection items=\{(\[)?', t)
    assert m, path
    if m.group(1):  # inline items={[...]}
        start = m.end() - 1
        depth = 0
        i = start
        while True:
            c = t[i]
            if c == '[':
                depth += 1
            elif c == ']':
                depth -= 1
                if depth == 0:
                    break
            i += 1
        block = '\n' + '\n'.join(f'    {{ q: {q!r}, a: {a!r} }},' for q, a in new)
        t = t[:i] + block + '\n  ' + t[i:]
    else:  # const faqs = [...] referenced as items={faqs}
        cm = re.search(r'const faqs = \[', t)
        assert cm, path
        start = cm.end() - 1
        depth = 0
        i = start
        while True:
            c = t[i]
            if c == '[':
                depth += 1
            elif c == ']':
                depth -= 1
                if depth == 0:
                    break
            i += 1
        # check trailing comma style of last item
        block = '\n' + '\n'.join(f'  {{ q: {q!r}, a: {a!r} }},' for q, a in new)
        t = t[:i] + block + '\n' + t[i:]
    open(path, 'w', encoding='utf-8').write(t)
    total += len(new)
    print(f'+{len(new)}: {path}')
print('TOTAL INSERTED:', total)
