import json
import os
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
BASE_URL = os.environ.get("BASE_URL", "http://localhost:8321").rstrip("/")
errors = []

with sync_playwright() as p:
    browser = p.chromium.launch()

    # Smoke-test key templates at desktop and mobile widths for browser errors
    # and horizontal overflow.
    smoke_pages = [
        ("/", 320),
        ("/", 390),
        ("/", 768),
        ("/", 1440),
        ("/sizing/what-size-generator-do-i-need/", 320),
        ("/sizing/what-size-generator-do-i-need/", 390),
        ("/sizing/what-size-generator-do-i-need/", 1440),
        ("/sizing/what-size-for-2000-sq-ft/", 390),
        ("/brands/", 390),
    ]
    for path, width in smoke_pages:
        page = browser.new_page(viewport={"width": width, "height": 900})
        page.on(
            "console",
            lambda message, current_path=path: errors.append(
                (current_path, "console", message.text[:160])
            ) if message.type == "error" else None,
        )
        page.on(
            "pageerror",
            lambda error, current_path=path: errors.append(
                (current_path, "pageerror", str(error)[:160])
            ),
        )
        page.goto(f"{BASE_URL}{path}", wait_until="networkidle")
        overflow = page.evaluate("document.documentElement.scrollWidth > window.innerWidth")
        assert not overflow, f"horizontal overflow at {path} ({width}px)"
        page.close()

    # The sizing page is intentionally a static worksheet, not an estimator.
    sizing = browser.new_page(viewport={"width": 1280, "height": 900})
    sizing.goto(
        f"{BASE_URL}/sizing/what-size-generator-do-i-need/",
        wait_until="networkidle",
    )
    assert sizing.locator("form, input, select, textarea").count() == 0, (
        "sizing worksheet unexpectedly contains form controls"
    )
    assert sizing.locator("#r-running, #r-peak, #r-size, #reset").count() == 0, (
        "retired estimator output controls were found"
    )
    assert sizing.get_by_text("Static worksheet", exact=False).count() > 0, (
        "static worksheet disclosure is missing"
    )
    sizing.close()

    # Check that deployment redirects still retire both legacy calculator URLs.
    redirects = (ROOT / "public" / "_redirects").read_text(encoding="utf-8")
    destination = "/sizing/what-size-generator-do-i-need/"
    assert f"/sizing/calculator/ {destination} 301" in redirects
    assert f"/sizing/calculator {destination} 301" in redirects
    vercel = json.loads((ROOT / "vercel.json").read_text(encoding="utf-8"))
    vercel_redirects = vercel.get("redirects", [])
    assert any(
        entry.get("source") == "/sizing/calculator/"
        and entry.get("destination") == destination
        and entry.get("permanent") is True
        for entry in vercel_redirects
    ), "Vercel legacy calculator redirect is missing"
    assert any(
        entry.get("has", [{}])[0].get("type") == "host"
        and entry["has"][0].get("value") == "www.homegeneratorguide.com"
        and entry.get("destination", "").startswith("https://homegeneratorguide.com/")
        and entry.get("permanent") is True
        for entry in vercel_redirects
    ), "Vercel www-to-apex redirect is missing"
    netlify = (ROOT / "netlify.toml").read_text(encoding="utf-8")
    assert 'from = "https://www.homegeneratorguide.com/*"' in netlify
    assert 'to = "https://homegeneratorguide.com/:splat"' in netlify

    # Verify the mobile navigation opens and closes accessibly.
    mobile = browser.new_page(viewport={"width": 390, "height": 844})
    mobile.goto(f"{BASE_URL}/", wait_until="networkidle")
    mobile.click("#menu-btn")
    assert mobile.get_attribute("#menu-btn", "aria-expanded") == "true", (
        "mobile menu did not open"
    )
    assert mobile.locator("#mobile-nav").is_visible(), "mobile navigation is not visible"
    mobile.keyboard.press("Escape")
    assert mobile.get_attribute("#menu-btn", "aria-expanded") == "false", (
        "Escape did not close mobile menu"
    )
    print("static sizing worksheet, retired-route redirects, and mobile menu: OK")
    browser.close()

print("console/page errors:", errors or "NONE")
assert not errors, f"browser errors detected: {errors}"
