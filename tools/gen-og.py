from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
img = Image.new('RGB', (W, H), '#1e3a5f')
d = ImageDraw.Draw(img)
try:
    title = ImageFont.load_default(size=84)
    sub = ImageFont.load_default(size=40)
except TypeError:
    title = ImageFont.load_default()
    sub = ImageFont.load_default()

# orange bolt
d.polygon([(950, 110), (830, 330), (905, 330), (880, 520), (1020, 280), (940, 280)], fill='#f97316')
# house outline
d.rectangle([90, 250, 470, 520], outline='#ffffff', width=6)
d.polygon([(60, 260), (280, 110), (500, 260)], outline='#ffffff', width=6)
d.text((90, 545 - 130), 'Standby Generator Guide', font=title, fill='#ffffff')
d.text((90, 545 - 40), 'Independent sizing, cost & ownership guides', font=sub, fill='#cbd5e1')
img.save('public/og-image.png')
print('og-image.png written')
