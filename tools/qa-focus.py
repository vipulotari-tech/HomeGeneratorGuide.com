import os
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE_URL = os.environ.get("BASE_URL", "http://localhost:8321").rstrip("/")
SCREENSHOT = os.environ.get("QA_SCREENSHOT", "/tmp/homegeneratorguide-focus-kb.png")
URL = f"{BASE_URL}/sizing/what-size-generator-do-i-need/"

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(URL, wait_until="networkidle")

    # A pointer interaction may suppress the focus outline, but keyboard use
    # must restore it immediately.
    target = page.locator('a[href*="appliance-wattage-chart"]').first
    target.dispatch_event("mousedown")
    root_class = page.evaluate("document.documentElement.className")
    assert "mouse-nav" in root_class, "mouse-nav class missing after mousedown"
    target.focus()
    style = page.evaluate("getComputedStyle(document.activeElement).outlineStyle")
    assert style == "none", f"pointer focus unexpectedly displays an outline: {style}"

    page.goto(URL, wait_until="networkidle")
    page.keyboard.press("Tab")
    found = None
    for _ in range(14):
        style = page.evaluate("getComputedStyle(document.activeElement).outlineStyle")
        width = page.evaluate("getComputedStyle(document.activeElement).outlineWidth")
        if style != "none" and width != "0px":
            found = (page.evaluate("document.activeElement.tagName"), style, width)
            break
        page.keyboard.press("Tab")
    assert found, "no visible keyboard focus indicator found"
    Path(SCREENSHOT).parent.mkdir(parents=True, exist_ok=True)
    page.screenshot(path=SCREENSHOT)
    print(f"Keyboard focus indicator OK on {found[0]} ({found[1]}, {found[2]}).")
    print(f"Screenshot: {SCREENSHOT}")
    browser.close()
