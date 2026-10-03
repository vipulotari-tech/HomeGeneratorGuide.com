from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.launch()
    for w, name in [(390, 'foot-390'), (768, 'foot-768'), (1440, 'foot-1440')]:
        pg = b.new_page(viewport={'width': w, 'height': 900})
        pg.goto('http://localhost:8321/', wait_until='networkidle')
        pg.locator('footer').screenshot(path=f'C:/Users/vipul/AppData/Local/Temp/opencode/{name}.png')
        pg.close()
    b.close()
print('footer shots saved')
