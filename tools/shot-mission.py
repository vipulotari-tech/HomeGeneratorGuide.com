from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.launch()
    for w, name in [(1440, 'mission-desk'), (390, 'mission-mob')]:
        pg = b.new_page(viewport={'width': w, 'height': 900})
        pg.goto('http://localhost:8321/', wait_until='networkidle')
        pg.get_by_label('Our reason for being here', exact=False)
        el = pg.locator('section').filter(has_text='Our reason for being here')
        el.screenshot(path=f'C:/Users/vipul/AppData/Local/Temp/opencode/{name}.png')
        pg.close()
    b.close()
print('shots saved')
