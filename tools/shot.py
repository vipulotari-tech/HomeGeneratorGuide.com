from playwright.sync_api import sync_playwright

shots = [
    ('http://localhost:8321/', 390, 844, 'home-mobile'),
    ('http://localhost:8321/', 1440, 900, 'home-desktop'),
    ('http://localhost:8321/sizing/what-size-generator-do-i-need/', 390, 844, 'article-mobile'),
    ('http://localhost:8321/sizing/what-size-generator-do-i-need/', 1440, 900, 'article-desktop'),
]
with sync_playwright() as p:
    b = p.chromium.launch()
    for url, w, h, name in shots:
        pg = b.new_page(viewport={'width': w, 'height': h})
        pg.goto(url, wait_until='networkidle')
        pg.screenshot(path=f'C:/Users/vipul/AppData/Local/Temp/opencode/{name}.png')
        pg.close()
    b.close()
print('4 screenshots saved')
