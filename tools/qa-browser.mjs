import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';

const baseUrl = (process.env.BASE_URL ?? 'http://localhost:8321').replace(/\/$/, '');
const launchOptions = { headless: true };
if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH) {
  launchOptions.executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  launchOptions.args = process.env.PLAYWRIGHT_CHROMIUM_ARGS
    ? JSON.parse(process.env.PLAYWRIGHT_CHROMIUM_ARGS)
    : ['--no-sandbox', '--no-zygote', '--single-process', '--disable-dev-shm-usage'];
}

let browser;
try {
  browser = await chromium.launch(launchOptions);
} catch (error) {
  console.error('Chromium could not start. Install it with `npx playwright install chromium`.');
  throw error;
}

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text().slice(0, 160));
  });
  page.on('pageerror', (error) => errors.push(String(error).slice(0, 160)));

  const smokeCases = [
    ['/', 320],
    ['/', 390],
    ['/', 768],
    ['/', 1440],
    ['/sizing/what-size-generator-do-i-need/', 320],
    ['/sizing/what-size-generator-do-i-need/', 390],
    ['/sizing/what-size-generator-do-i-need/', 1440],
    ['/sizing/what-size-for-2000-sq-ft/', 390],
    ['/brands/', 390],
  ];

  for (const [path, width] of smokeCases) {
    await page.setViewportSize({ width, height: 900 });
    const response = await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' });
    assert(response && response.ok(), `page failed to load: ${path}`);
    await page.locator('#main h1').waitFor({ state: 'attached' });
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth),
      false,
      `horizontal overflow at ${path} (${width}px)`,
    );
    assert.equal(await page.locator('#main h1').count(), 1, `expected one content H1 at ${path}`);
  }

  // Full generated-route crawl: every static index page gets a mobile load,
  // one-H1, and horizontal-overflow check. This catches new content routes,
  // not just the hand-picked smoke cases above.
  const generatedRoutes = fs.readdirSync('dist', { recursive: true })
    .filter((entry) => typeof entry === 'string' && entry.endsWith('index.html'))
    .map((entry) => entry === 'index.html' ? '/' : '/' + entry.replace(/\\/g, '/').replace(/index\.html$/, ''))
    .sort();

  const knownRoutes = new Set(generatedRoutes);
  const internalLinks = new Set();

  await page.setViewportSize({ width: 390, height: 900 });
  for (const path of generatedRoutes) {
    const response = await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' });
    assert(response && response.ok(), `generated page failed to load: ${path}`);
    assert.equal(await page.locator('#main h1').count(), 1, `expected one content H1 at ${path}`);
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth),
      false,
      `horizontal overflow at generated route ${path}`,
    );
    const scrollingContainers = await page.evaluate(() =>
      Array.from(document.querySelectorAll('#main .overflow-x-auto'))
        .filter((element) => {
          const node = element;
          const style = window.getComputedStyle(node);
          return style.display !== 'none' && node.getBoundingClientRect().height > 0 && node.scrollWidth > node.clientWidth + 2;
        })
        .map((element) => ({
          tag: element.tagName,
          text: (element.textContent ?? '').trim().slice(0, 90),
          scrollWidth: element.scrollWidth,
          clientWidth: element.clientWidth,
        }))
    );
    assert.equal(
      scrollingContainers.length,
      0,
      `scrolling content container on mobile at ${path}: ${JSON.stringify(scrollingContainers)}`,
    );
    const links = await page.locator('#main a[href^="/"]').evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute('href')).filter(Boolean)
    );
    for (const href of links) internalLinks.add(href);
  }

  for (const href of internalLinks) {
    const pathname = new URL(href, baseUrl).pathname;
    const normalized = pathname.endsWith('/') ? pathname : pathname + '/';
    if (knownRoutes.has(pathname) || knownRoutes.has(normalized)) continue;
    // Internal downloadable files are static resources rather than HTML routes.
    // Validate their physical presence AND that the preview server serves them;
    // do not skip link QA for missing or malformed assets.
    const relativeFile = decodeURIComponent(pathname).slice(1);
    assert(relativeFile && !relativeFile.split('/').includes('..'), `Unsafe internal asset href: ${href}`);
    const assetPath = 'dist/' + relativeFile;
    assert(fs.existsSync(assetPath) && fs.statSync(assetPath).isFile(), `internal link points to a non-generated route or file: ${href}`);
    const assetResponse = await page.request.get(baseUrl + pathname);
    assert(assetResponse.ok(), `internal asset is not served by preview: ${href} (${assetResponse.status()})`);
  }

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseUrl}/sizing/what-size-generator-do-i-need/`, { waitUntil: 'networkidle' });
  assert.equal(
    await page.locator('#main form, #main input, #main select, #main textarea').count(),
    0,
    'static worksheet unexpectedly contains estimator controls',
  );
  assert.equal(
    await page.locator('#r-running, #r-peak, #r-size, #reset').count(),
    0,
    'retired estimator outputs were found',
  );
  assert(
    (await page.locator('#main').innerText()).toLowerCase().includes('static worksheet'),
    'static worksheet disclosure is missing',
  );


  // Regression for the five-column blank worksheet that previously squeezed into mobile/tablet.
  for (const width of [320, 390, 768, 1024, 1199]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${baseUrl}/sizing/what-size-generator-do-i-need/`, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.static-load-table').isVisible(), false, `desktop worksheet visible at ${width}px`);
    const mobileNotes = page.locator('.static-load-mobile');
    assert.equal(await mobileNotes.isVisible(), true, `compact worksheet missing at ${width}px`);
    assert.equal(await mobileNotes.getAttribute('open'), null, `worksheet should start collapsed at ${width}px`);
    await mobileNotes.locator('summary').click();
    assert.equal(await mobileNotes.locator('.static-load-card').count(), 7, `expected seven worksheet note cards at ${width}px`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `worksheet overflows at ${width}px`);
  }
  for (const width of [1200, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${baseUrl}/sizing/what-size-generator-do-i-need/`, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.static-load-mobile').isVisible(), false, `compact worksheet visible on desktop at ${width}px`);
    assert.equal(await page.locator('.static-load-table').isVisible(), true, `printable desktop table missing at ${width}px`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `desktop worksheet overflows at ${width}px`);
  }
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto(`${baseUrl}/sizing/what-size-generator-do-i-need/`, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  assert.equal(await page.locator('.static-load-table').isVisible(), true, 'printable worksheet table missing on print');
  assert.equal(await page.locator('.static-load-mobile').isVisible(), false, 'mobile notes should be hidden on print');
  await page.emulateMedia({ media: 'screen' });

  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  await page.click('#menu-btn');
  assert.equal(await page.getAttribute('#menu-btn', 'aria-expanded'), 'true', 'mobile menu did not open');
  assert.equal(await page.locator('#mobile-nav').isVisible(), true, 'mobile navigation is not visible');
  assert(
    await page.evaluate(() => {
      const nav = document.querySelector('#mobile-nav');
      return nav ? nav.getBoundingClientRect().bottom <= window.innerHeight + 1 : false;
    }),
    'mobile menu exceeds viewport instead of becoming internally scrollable',
  );
  await page.keyboard.press('Escape');
  assert.equal(await page.getAttribute('#menu-btn', 'aria-expanded'), 'false', 'Escape did not close the menu');

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/sizing/what-size-generator-do-i-need/`, { waitUntil: 'networkidle' });
  const focusTarget = page.locator('#main a[href*="appliance-wattage-chart"]').first();
  assert(await focusTarget.count(), 'focus-test link is missing');
  await focusTarget.dispatchEvent('mousedown');
  assert(
    (await page.evaluate(() => document.documentElement.className)).includes('mouse-nav'),
    'pointer interaction state was not set',
  );
  await focusTarget.focus();
  assert.equal(
    await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle),
    'none',
    'pointer focus style did not match the site focus policy',
  );

  await page.goto(`${baseUrl}/sizing/what-size-generator-do-i-need/`, { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  let keyboardRing = false;
  for (let i = 0; i < 14; i += 1) {
    keyboardRing = await page.evaluate(() => {
      const style = getComputedStyle(document.activeElement);
      return style.outlineStyle !== 'none' && style.outlineWidth !== '0px';
    });
    if (keyboardRing) break;
    await page.keyboard.press('Tab');
  }
  assert(keyboardRing, 'visible keyboard focus indicator was not found');

  const redirects = fs.readFileSync(new URL('../public/_redirects', import.meta.url), 'utf8');
  const target = '/sizing/what-size-generator-do-i-need/';
  assert(redirects.includes(`/sizing/calculator/ ${target} 301`), 'legacy calculator redirect is missing');
  assert(redirects.includes(`/sizing/calculator ${target} 301`), 'slashless legacy redirect is missing');

  const vercel = JSON.parse(fs.readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
  assert(
    vercel.redirects.some((rule) =>
      rule.has?.[0]?.value === 'www.homegeneratorguide.com' &&
      rule.destination?.startsWith('https://homegeneratorguide.com/') &&
      rule.permanent === true,
    ),
    'Vercel www-to-apex redirect is missing',
  );
  const netlify = fs.readFileSync(new URL('../netlify.toml', import.meta.url), 'utf8');
  assert(netlify.includes('from = "https://www.homegeneratorguide.com/*"'), 'Netlify www redirect is missing');
  assert(netlify.includes('to = "https://homegeneratorguide.com/:splat"'), 'Netlify apex destination is missing');

  assert.deepEqual(errors, [], `browser console/page errors: ${JSON.stringify(errors)}`);
  console.log(
    `Browser QA passed: ${smokeCases.length} targeted page/viewport combinations plus ${generatedRoutes.length} generated routes, ` +
      `${internalLinks.size} internal links checked, no horizontal overflow, static worksheet, mobile navigation, keyboard focus, and redirect configuration.`,
  );
} finally {
  await browser.close();
}
