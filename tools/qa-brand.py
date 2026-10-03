"""Verify the publisher's brand contract against the complete built website."""
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1]
MISSION = "HomeGeneratorGuide exists to give every American homeowner the same quality of advice they would get from a trusted licensed electrician friend — honest, complete, technically accurate, and completely free of brand bias or dealer influence."
PROMISE = "Every article on HomeGeneratorGuide is written using manufacturer specifications, NEC code requirements, NFPA standards, and EPA regulations — then reviewed by a licensed electrician before publication. We cite every source. We name every expert. We never accept payment from generator brands."
STATUS = "Licensed electrician review pending"


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
assert pages, "Run npm run build first"
articles = 0
for page in pages:
    html = page.read_text(encoding="utf-8")
    parser = VisibleText()
    parser.feed(html)
    text = " ".join(" ".join(parser.parts).split())
    assert MISSION in text, (page, "Missing verbatim mission")
    assert PROMISE in text, (page, "Missing verbatim promise")
    assert "The publication standard we are working toward:" in text, page
    assert "have not yet completed documented review by a licensed electrician" in text, page
    assert "Power When It Matters Most" in text, page
    assert not re.search(r'<script[^>]+src=["\'][^"\']*(?:googlesyndication|doubleclick)', html), page
    for script in re.findall(r'<script[^>]+type="application/ld\+json"[^>]*>(.*?)</script>', html, re.S):
        data = json.loads(script)
        for item in data if isinstance(data, list) else [data]:
            if item.get("@type") == "Article":
                articles += 1
                assert STATUS in text, (page, "Missing article review status")
                assert "reviewedBy" not in item, (page, "Unsupported review schema")
                assert item["publisher"]["logo"]["url"].endswith("/logo.svg"), page

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
print(f"Brand contract passed: {len(pages)} pages, {articles} articles, SVG assets, six colors; CTA contrast {contrast:.2f}:1.")
