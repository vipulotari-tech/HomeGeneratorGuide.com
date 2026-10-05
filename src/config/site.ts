// Canonical hosts are selected once at build time. Preview/development builds
// default to the non-indexable staging origin; production must be explicit.
export const SITE_ENV: 'production' | 'staging' =
  import.meta.env.PUBLIC_SITE_ENV === 'production' ? 'production' : 'staging';
export const SITE_URL = SITE_ENV === 'production'
  ? 'https://homegeneratorguide.com'
  : 'https://homegeneratorguide.tender-telescope.workers.dev';
export const IS_INDEXABLE = SITE_ENV === 'production';
export const SITE_NAME = 'HomeGeneratorGuide';

export const TAGLINE = 'Power When It Matters Most';
export const MISSION = 'HomeGeneratorGuide is an independent informational publication helping US homeowners understand standby generator sizing, equipment, installation scope, costs, and maintenance before speaking with qualified local professionals.';
export const EDITORIAL_PROMISE = 'We distinguish manufacturer specifications from manufacturer claims, estimates, and editorial interpretation. We link to source material where practical, do not claim hands-on testing or licensed review we have not performed, and update or correct material errors transparently.';
export const INDEPENDENCE = 'Independent of generator brands, dealers, and installers. We do not accept their advertising, sponsorships, payments, or referral fees.';
export const REVIEW_STATUS = 'Licensed professional review has not been completed';
export const REVIEW_NOTE = 'Our guides are editorial research, not hands-on product testing, licensed electrical advice, or a substitute for a local site assessment. Where a qualified professional has not reviewed a specific article, we say so.';

// Advertising stays off. Generator-brand, dealer, and installer advertising
// and payments are prohibited by the editorial independence policy.
export const ADS_ENABLED = false;

// Editorial identity. We intentionally use an organization-level research desk
// rather than inventing individual people or credentials.
export const AUTHOR = {
  name: 'HomeGeneratorGuide Editorial Team',
  role: 'Independent Research Desk',
  url: `${SITE_URL}/editorial-team/`,
};
