import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const requiredPages = {
  '/privacy-policy/': ['Google AdSense', 'policies.google.com/technologies/partner-sites', 'consent-management platform'],
  '/affiliate-disclosure/': ['Programmatic advertising', 'cannot pay to become our recommended option'],
  '/about/': ['HomeGeneratorGuide', 'Whose side we\'re on'],
  '/contact/': ['hello@homegeneratorguide.com'],
  '/terms-of-service/': ['Terms of Service'],
  '/disclaimer/': ['programmatic advertising', 'funding and advertising disclosure'],
  '/editorial-policy/': ['programmatic advertising', 'editorial process'],
};

for (const [route, needles] of Object.entries(requiredPages)) {
  const file = path.join('dist', route.slice(1), 'index.html');
  assert(fs.existsSync(file), 'Missing AdSense-readiness page: ' + route);
  const html = fs.readFileSync(file, 'utf8');
  assert(html.includes('content="index, follow"'), 'Policy/trust page is not indexable: ' + route);
  for (const needle of needles) {
    assert(html.toLowerCase().includes(needle.toLowerCase()), `Missing required disclosure text "${needle}" on ${route}`);
  }
}

const privacy = fs.readFileSync('dist/privacy-policy/index.html', 'utf8');
assert(!privacy.includes('We never accept advertising or payments from generator brands'), 'Old advertising prohibition still present in privacy policy');

const funding = fs.readFileSync('dist/affiliate-disclosure/index.html', 'utf8');
assert(!funding.includes('existing prohibition on generator-brand, dealer, and installer payments and advertising'), 'Old blanket advertising prohibition still present in funding disclosure');

const footerSample = fs.readFileSync('dist/index.html', 'utf8');
for (const href of ['/privacy-policy/','/terms-of-service/','/affiliate-disclosure/','/disclaimer/','/contact/','/about/']) {
  assert(footerSample.includes(`href="${href}"`), 'Important trust/legal page not linked from site navigation/footer: ' + href);
}

console.log('AdSense readiness disclosure QA PASS', { pagesChecked: Object.keys(requiredPages).length });
