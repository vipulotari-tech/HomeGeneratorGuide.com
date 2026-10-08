// Build-time import of ten user-supplied editorial photos.
// The fixed archive digest, asset names and per-asset digests prevent untrusted
// updates. Only explicitly listed .webp assets are extracted. No external code
// is executed, and no SEO metadata or article text is modified here.
import { createHash } from 'node:crypto';
import { inflateRawSync } from 'node:zlib';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const ARCHIVE_URL = 'https://d2ol7oe51mr4n9.cloudfront.net/user_3JDt3ENJNmd5MrgEG5WlwYgk8d4/62ff7e3c-54fe-4511-a9fd-478e5af6026a.zip';
const ARCHIVE_SHA256 = '174ddef3169282f42d2631fa0d6a7f2981c43760e3d7bd91c7013c37d050452a';
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
const sha = (bytes) => createHash('sha256').update(bytes).digest('hex');
const list = Object.entries(assets);
let existing = await Promise.all(list.map(async ([name, expected]) => {
  try { return sha(await readFile(resolve(DIR, name))) === expected; }
  catch { return false; }
}));
if (existing.every(Boolean)) {
  console.log('User editorial images: verified all ten existing files.');
  process.exit(0);
}
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 90000);
let zip;
try {
  const response = await fetch(ARCHIVE_URL, { signal: controller.signal });
  if (!response.ok) throw new Error('Image source HTTP ' + response.status);
  const announced = Number(response.headers.get('content-length') ?? 0);
  if (announced > 12_000_000) throw new Error('Image archive unexpectedly large');
  zip = Buffer.from(await response.arrayBuffer());
  if (zip.length > 12_000_000) throw new Error('Image archive exceeds expected size');
} finally { clearTimeout(timer); }
if (sha(zip) !== ARCHIVE_SHA256) throw new Error('Image archive failed SHA-256 integrity check');
const eocdSignature = 0x06054b50;
let eocd = -1;
for (let i = zip.length - 22; i >= Math.max(0, zip.length - 65557); --i) {
  if (zip.readUInt32LE(i) === eocdSignature) { eocd = i; break; }
}
if (eocd < 0) throw new Error('Invalid ZIP end-of-central-directory');
let cursor = zip.readUInt32LE(eocd + 16);
const count = zip.readUInt16LE(eocd + 10);
const found = new Map();
for (let i=0; i<count; i++) {
  if (zip.readUInt32LE(cursor) !== 0x02014b50) throw new Error('Invalid ZIP central directory');
  const method = zip.readUInt16LE(cursor+10);
  const compressedSize = zip.readUInt32LE(cursor+20);
  const uncompressedSize = zip.readUInt32LE(cursor+24);
  const nameLength = zip.readUInt16LE(cursor+28);
  const extraLength = zip.readUInt16LE(cursor+30);
  const commentLength = zip.readUInt16LE(cursor+32);
  const localOffset = zip.readUInt32LE(cursor+42);
  const name = zip.subarray(cursor+46, cursor+46+nameLength).toString('utf8');
  cursor += 46+nameLength+extraLength+commentLength;
  const prefix = DIR + '/';
  if (!name.startsWith(prefix)) continue;
  const basename = name.slice(prefix.length);
  if (!(basename in assets) || basename.includes('/')) throw new Error('Unexpected asset ' + name);
  if (found.has(basename)) throw new Error('Duplicate image ' + basename);
  if (zip.readUInt32LE(localOffset) !== 0x04034b50) throw new Error('Invalid local ZIP file header');
  const dataStart = localOffset + 30 + zip.readUInt16LE(localOffset+26) + zip.readUInt16LE(localOffset+28);
  const data = zip.subarray(dataStart, dataStart + compressedSize);
  if (data.length !== compressedSize) throw new Error('Truncated asset');
  const unpacked = method === 8 ? inflateRawSync(data) : method === 0 ? data : null;
  if (!unpacked || unpacked.length !== uncompressedSize) throw new Error('Unable to extract ' + basename);
  if (sha(unpacked) !== assets[basename]) throw new Error('Image hash mismatch ' + basename);
  if (unpacked.toString('ascii',0,4)!=='RIFF' || unpacked.toString('ascii',8,12)!=='WEBP') throw new Error('Expected WebP '+basename);
  found.set(basename, unpacked);
}
if (found.size !== list.length) throw new Error('Missing image assets: ' + (list.length - found.size));
await mkdir(resolve(DIR), { recursive: true });
for (const [name, contents] of found) await writeFile(resolve(DIR, name), contents);
console.log('User editorial images: installed ten SHA-verified optimized WebP assets.');
