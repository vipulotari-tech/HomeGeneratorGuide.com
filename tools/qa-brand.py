"""Verify core editorial disclosures and brand assets across the built site."""
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1]
MISSION = (
    "HomeGeneratorGuide is an independent informational publication helping US homeowners "
    "understand standby generator sizing, equipment, installation scope, costs, and maintenance "
    "before speaking with qualified local professionals."
)
PROMISE = (
    "We distinguish manufacturer specifications from manufacturer claims, estimates, and "
    "editorial interpretation. We link to source material where practical, do not claim "
    "hands-on testing or licensed review we have not performed, and update or correct "
    "material errors transparently."
)
REVIEW_NOTE = (
    "Our guides are editorial research, not hands-on product testing, licensed electrical "
    "advice, or a substitute for a local site assessment. Where a qualified professional "
    "has not reviewed a specific article, we say so."
)


class VisibleText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []
        self.hidden = 0

    def handle_starttag(self, tag, attrs):
        if tag in ("head", "script", "style"):
            self.hidden += 1

    def handle_endtag(self, tag):
        if tag in ("head", "script", "style"):
            self.hidden -= 1

    def handle_data(self, data):
        if not self.hidden:
            self.parts.append(data)


pages = sorted((ROOT / "dist").rglob("*.html"))
assert pages, "Run a production or staging build first"
articles = 0
for page in pages:
    html = page.read_text(encoding="utf-8")
    parser = VisibleText()
    parser.feed(html)
    text = " ".join(" ".join(parser.parts).split())
    assert MISSION in text, (page, "Missing independent-publication mission")
    assert PROMISE in text, (page, "Missing editorial transparency disclosure")
    assert REVIEW_NOTE in text, (page, "Missing current professional-review limitation")
    assert "Power When It Matters Most" in text, (page, "Missing brand tagline")
    assert not re.search(
        r'<script[^>]+src=["\'][^"\']*(?:googlesyndication|doubleclick)', html
    ), page
    for script in re.findall(
        r'<script[^>]+type="application/ld\+json"[^>]*>(.*?)</script>', html, re.S
    ):
        data = json.loads(script)
        for item in data if isinstance(data, list) else [data]:
            if item.get("@type") == "Article":
                articles += 1
                assert "reviewedBy" not in item, (page, "Unsupported review schema")
                assert item["publisher"]["logo"]["url"].endswith("/logo.svg"), page

assert not (ROOT / "src/pages/sizing/calculator.astro").exists(), (
    "the prohibited interactive estimator source still exists"
)
redirects = (ROOT / "public/_redirects").read_text(encoding="utf-8")
assert "/sizing/calculator/ /sizing/what-size-generator-do-i-need/ 301" in redirects

css = (ROOT / "src/styles/global.css").read_text(encoding="utf-8")
for token, value in {
    "primary": "#1B3A6B", "accent": "#F5821F", "success": "#2D7D46",
    "danger": "#C0392B", "surface": "#F8F9FA", "ink": "#1A1A2E",
}.items():
    assert f"--color-{token}: {value};" in css, token

for asset in ("brand-mark.svg", "logo.svg", "favicon.svg"):
    path = ROOT / "public" / asset
    root = ElementTree.parse(path).getroot()
    assert root.tag.endswith("svg"), path
    assert "#1B3A6B" in path.read_text(encoding="utf-8"), path
    if asset == "favicon.svg":
        assert root.attrib["viewBox"] == "0 0 16 16", path
    if asset == "logo.svg":
        assert "HomeGeneratorGuide" in "".join(root.itertext()), path
        assert "Power When It Matters Most" in "".join(root.itertext()), path


def luminance(hex_color):
    rgb = [int(hex_color[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    linear = [v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4 for v in rgb]
    return sum(v * w for v, w in zip(linear, (0.2126, 0.7152, 0.0722)))


orange, ink = luminance("#F5821F"), luminance("#1A1A2E")
contrast = (orange + 0.05) / (ink + 0.05)
assert contrast >= 4.5, contrast
assert articles > 0, "No article pages were checked"
print(
    f"Editorial/brand QA passed: {len(pages)} pages, {articles} articles, no estimator, "
    f"SVG assets, six colors; CTA contrast {contrast:.2f}:1."
)
