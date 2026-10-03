// Central site configuration. Canonical production values live here —
// do not scatter domain strings across layouts/components.
export const SITE_URL = 'https://homegeneratorguide.com';
export const SITE_NAME = 'HomeGeneratorGuide';

// Monetization flags. Placeholders render ONLY when enabled, so the
// pre-launch site never looks unfinished. Enabling reserves space to
// prevent CLS from day one of live ads.
export const ADS_ENABLED = false;

// Canonical author (real publisher identity — no invented credentials).
export const AUTHOR = {
  name: 'Vipul Otari',
  role: 'Publisher & Research Editor',
  url: `${SITE_URL}/author/vipul-otari/`,
};
