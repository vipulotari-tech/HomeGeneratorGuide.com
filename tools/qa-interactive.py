from playwright.sync_api import sync_playwright

errors = []
with sync_playwright() as p:
    b = p.chromium.launch()
    # 1. console errors on key pages (mobile + desktop)
    for url, w in [('http://localhost:8321/', 390),
                   ('http://localhost:8321/', 1440),
                   ('http://localhost:8321/sizing/what-size-generator-do-i-need/', 1440),
                   ('http://localhost:8321/404.html', 390)]:
        pg = b.new_page(viewport={'width': w, 'height': 900})
        pg.on('console', lambda m: errors.append((url, m.type, m.text[:120])) if m.type == 'error' else None)
        pg.on('pageerror', lambda e: errors.append((url, 'pageerror', str(e)[:120])))
        pg.goto(url, wait_until='networkidle')
        pg.close()
    # 2. calculator interaction
    pg = b.new_page(viewport={'width': 1280, 'height': 900})
    pg.on('pageerror', lambda e: errors.append(('calc', 'pageerror', str(e)[:120])))
    pg.goto('http://localhost:8321/sizing/calculator/', wait_until='networkidle')
    pg.check('input[type="checkbox"] >> nth=5')   # 3-ton AC
    pg.check('input[type="checkbox"] >> nth=6')   # fridge
    run = pg.text_content('#r-running')
    peak = pg.text_content('#r-peak')
    size = pg.text_content('#r-size')
    print('calc result:', run, '|', peak, '|', size)
    assert 'W' in run and 'kW' in size, 'calculator did not compute'
    pg.click('#reset')
    assert pg.text_content('#r-size').strip() == '—', 'reset failed'
    print('calc reset OK')
    # 3. mobile menu toggle
    pg2 = b.new_page(viewport={'width': 390, 'height': 844})
    pg2.goto('http://localhost:8321/', wait_until='networkidle')
    pg2.click('#menu-btn')
    assert pg2.get_attribute('#menu-btn', 'aria-expanded') == 'true', 'menu did not open'
    assert pg2.locator('#mobile-nav').is_visible(), 'mobile nav not visible'
    pg2.keyboard.press('Escape')
    assert pg2.get_attribute('#menu-btn', 'aria-expanded') == 'false', 'escape did not close'
    print('mobile menu OK')
    b.close()
print('console/page errors:', errors or 'NONE')
