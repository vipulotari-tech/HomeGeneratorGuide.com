// Verify the ten original user-supplied WebP assets vendored inside Git.
// Builds are offline/reproducible: never fetch images from an external host.
import {createHash} from 'node:crypto';
import {readFile, stat} from 'node:fs/promises';
import {resolve} from 'node:path';

const DIR = 'public/images/user-editorial';
const assets = {
  'premium-home-at-dusk.webp': '13f369167098cba5b2cb0b7c6b2eba305888c72b9c8315b26e2fc13b01cb58a8',
  'generator-pad-site-assessment.webp': '491b96bf53f31fc8dca159942152aae0a4da4adcd45dc3d2a067b7e1193ee8b6',
  'residential-standby-generator-installed.webp': '05fabdb8ec9725ab3f652520dfbff4096a0861b4cd235db0e13838e999c1546a',
  'selective-power-during-outage.webp': 'fdf5ccc8c139a8fdf11624a80efb015563eba65baa3080743afc73c8b7dc0506',
  'rural-residential-backup-context.webp': '316c5970b4f1e0e3dee1d99e8d31eceddcf7d0048a77080c7e77b14096582288',
  'hvac-nameplate-assessment.webp': '05891466f1fd694e00ae69644fb65ed9c24f6c890a136e11060dfdf9118c47ef',
  'electric-panel-load-review.webp': 'a1239d8b0b4728e9b10b218290cde26529b2ea1d214ec34e34611df860f43716',
  'landscaped-generator-placement.webp': '2945041fa4ce7e80602a454c1c9537851553af1cabe6c3301063df2d6ca0614e',
  'generator-quote-review-at-home.webp': 'fc1680c19a84f7ee9d24777a6612bf7fdc393b3ef7170791a9979d326be3e240',
  'neighborhood-power-outage-at-dusk.webp': '601b83eab8c46b1c735aee516163fb42f32d5fe4b383f6b1e61871ae4a72ad24',
};
const digest = b => createHash('sha256').update(b).digest('hex');
for (const [name, expected] of Object.entries(assets)) {
  const file = resolve(DIR, name);
  let bytes;
  try { bytes = await readFile(file); }
  catch { throw new Error('Required vendored user editorial image missing: ' + name); }
  if (bytes.toString('ascii',0,4) !== 'RIFF' || bytes.toString('ascii',8,12) !== 'WEBP')
    throw new Error('Invalid WebP header for ' + name);
  if (digest(bytes) !== expected) throw new Error('User editorial WebP digest mismatch: ' + name);
  if ((await stat(file)).size > 500_000) throw new Error('Image exceeds 500 KB budget: ' + name);
}
console.log('Verified ten vendored editorial WebP images, offline, with exact SHA-256 digests.');
