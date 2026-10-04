from playwright.sync_api import sync_playwright

URL = 'http://localhost:8321/sizing/what-size-generator-do-i-need/'

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 1440, 'height': 900})
    pg.goto(URL, wait_until='networkidle')

    # 1. synthetic mousedown (as a real click starts) -> mouse-nav engages
    pg.locator('a[href*="hvac-generator"]').first.dispatch_event('mousedown')
    cls = pg.evaluate('document.documentElement.className')
    assert 'mouse-nav' in cls, 'mouse-nav class missing after mousedown'
    print('mouse-nav engages on mousedown: OK')

    # 2. focused element while mouse-nav present -> no VISIBLE outline (style none)
    pg.locator('a[href*="hvac-generator"]').first.focus()
    style = pg.evaluate('getComputedStyle(document.activeElement).outlineStyle')
    print('focused outline-style with mouse-nav:', style)
    assert style == 'none', 'RING SHOWS FOR MOUSE PATH'

    # 3. fresh keyboard path: Tab -> outline MUST appear
    pg.goto(URL, wait_until='networkidle')
    pg.keyboard.press('Tab')
    found = None
    for _ in range(14):
        tag = pg.evaluate('document.activeElement.tagName')
        style = pg.evaluate('getComputedStyle(document.activeElement).outlineStyle')
        width = pg.evaluate('getComputedStyle(document.activeElement).outlineWidth')
        if style != 'none' and width != '0px':
            found = (tag, style, width)
            break
        pg.keyboard.press('Tab')
    assert found, 'NO KEYBOARD RING FOUND'
    print('keyboard focus ring OK on:', found[0], found[1])
    pg.screenshot(path='C:/Users/vipul/AppData/Local/Temp/opencode/focus-kb.png')
    b.close()
print('FOCUS BEHAVIOR VERIFIED')
