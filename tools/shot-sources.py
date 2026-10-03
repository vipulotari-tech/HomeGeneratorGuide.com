from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 1440, 'height': 900})
    pg.goto('http://localhost:8321/brands/kohler/', wait_until='networkidle')
    h = pg.get_by_role('heading', name='Sources & further reading')
    h.scroll_into_view_if_needed()
    pg.wait_for_timeout(400)
    pg.screenshot(path='C:/Users/vipul/AppData/Local/Temp/opencode/src-check.png')
    b.close()
print('shot saved')
