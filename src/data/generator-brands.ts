export interface GeneratorModel {
  series: string;
  model?: string;
  capacityKw: string;
  fuel: string;
  msrp?: string;
  noiseDb?: string;
  notes?: string;
}

export interface GeneratorBrand {
  name: string;
  slug: string;
  founded?: string;
  headquarters?: string;
  description: string;
  priceRange?: string;
  warranty?: string;
  warrantyDetail?: string[];
  dealerNetwork?: string;
  marketShare?: string;
  models: GeneratorModel[];
  sourceUrls?: string[];
}

// Specified from manufacturer pages and support docs, researched Oct 2026.
// MSRP = manufacturer list, unit-only unless noted; street/installed prices vary.
// dB(A) at 23 ft / 7 m unless noted. Verify exact SKU spec sheets before purchase.
export const brands: GeneratorBrand[] = [
  {
    name: 'Generac',
    slug: 'generac',
    founded: '1959 (Robert Kern, Wales, Wisconsin)',
    headquarters: 'Waukesha, Wisconsin, USA. Plants in Berlin, Oshkosh, Jefferson, Eagle, Whitewater, WI.',
    description:
      'US residential standby volume leader; Next Generation air-cooled line plus Guardian (prior gen, still available) and liquid-cooled Protector range.',
    priceRange: 'Air-cooled MSRP $3,649–$9,509 (unit/ATS bundles); Protector liquid-cooled $21,099–$46,289.',
    warranty: '5-year limited, tiered (see detail). PowerPact 7.5 kW: 3-year. 7- and 10-year extended options.',
    warrantyDetail: [
      'Years 1–2: parts, labor, and limited travel.',
      'Year 3: parts only.',
      'Years 4–5: engine short block + alternator rotor/stator parts only.',
      'Extended 7-year and 10-year plans available.',
    ],
    dealerNetwork: '5,000+ authorized dealers US & Canada — largest residential network.',
    marketShare: 'Reported ~62–75% of US home standby (third-party estimate — treat as reported, not manufacturer-confirmed).',
    models: [
      { series: 'Next Generation 10 kW', capacityKw: '10 kW (LP & NG)', fuel: 'NG / LP', msrp: '$3,769 unit / $4,419–$4,619 w/ ATS', noiseDb: '61 dB', notes: '459cc engine.' },
      { series: 'Next Generation 14 kW', capacityKw: '14 kW (LP & NG)', fuel: 'NG / LP', msrp: '$4,889 unit / $5,709–$5,949 w/ ATS', noiseDb: '65 dB', notes: '817cc engine.' },
      { series: 'Next Generation 18 kW', capacityKw: '18 kW (LP & NG)', fuel: 'NG / LP', msrp: '$5,709 unit / $6,529–$6,769 w/ ATS', noiseDb: '65 dB', notes: '817cc engine.' },
      { series: 'Next Generation 22 kW', capacityKw: '22 LP / 21 NG', fuel: 'NG / LP', msrp: '$6,289–$6,309 unit / $7,129–$7,369 w/ ATS', noiseDb: '67 dB', notes: '997cc engine.' },
      { series: 'Next Generation 24 kW', capacityKw: '24 LP / 22.5 NG', fuel: 'NG / LP', msrp: '$6,729 unit / $7,569–$7,789 w/ ATS', noiseDb: '67 dB', notes: '997cc engine.' },
      { series: 'Next Generation 26 kW', capacityKw: '26 LP / 22.5 NG', fuel: 'NG / LP', msrp: '$7,159 unit / $7,999–$8,219 w/ ATS', noiseDb: '67 dB', notes: '997cc engine.' },
      { series: 'Next Generation 28 kW', capacityKw: '28 LP / 25 NG', fuel: 'NG / LP', msrp: '$8,159 unit / $9,349–$9,509 w/ ATS', noiseDb: '67 dB', notes: 'Largest air-cooled; 997cc.' },
      { series: 'PowerPact 7.5 kW', capacityKw: '7.5 kW', fuel: 'NG / LP', msrp: '$2,049 unit / $2,699–$2,899 w/ ATS', noiseDb: '69 dB', notes: 'Entry essentials; 3-year warranty.' },
      { series: 'Guardian (prior gen)', capacityKw: '10–26 kW', fuel: 'NG / LP', notes: 'Still available; 26 kW rated 68 dB. Mobile Link compatible (2018+ 9–28 kW).' },
      { series: 'Protector XG (liquid-cooled)', capacityKw: '32–80 kW', fuel: 'NG / LP', msrp: '$21,099–$35,599', notes: 'Large homes / light commercial; full continuous duty.' },
      { series: 'Protector RG (liquid-cooled)', capacityKw: '100–150 kW', fuel: 'Diesel / NG / LP', msrp: '$36,689–$46,289', notes: 'Estate / commercial crossover.' },
      { series: 'Diesel standby', capacityKw: '15–50 kW (1800 RPM)', fuel: 'Diesel', notes: 'Specialist quote path.' },
    ],
    sourceUrls: [
      'https://www.generac.com/residential-products/standby-generators/',
      'https://support.generac.com/s/article/What-Does-My-Home-Standby-Generator-Warranty-Cover',
      'https://support.generac.com/s/article/What-are-the-decibel-ratings-for-my-generator',
      'https://support.generac.com/mobilelink/s/',
    ],
  },
  {
    name: 'Kohler',
    slug: 'kohler',
    founded: '1873',
    headquarters: 'Kohler, Wisconsin, USA. Standby plant Mosel, WI (expanded 2022).',
    description:
      'Premium-leaning brand with commercial-generator heritage; PowerBoost starting tech, aluminum enclosures, OnCue Plus monitoring with voice integration.',
    priceRange: 'Air-cooled MSRP $3,946–$7,546; liquid-cooled RCL $17,900–$28,304.',
    warranty: '5-year / 2,000-hour comprehensive (parts, labor, travel). Costco models: 3-year / 2,000-hour. Up to 10-year extended.',
    dealerNetwork: 'Nationwide authorized distributors; thinner than Generac, rural gaps reported.',
    models: [
      { series: '10RESV', capacityKw: '10 LP / 9 NG', fuel: 'NG / LP', msrp: '$3,946', noiseDb: '67 dB' },
      { series: '12RESV', capacityKw: '12 LP / 11 NG', fuel: 'NG / LP', msrp: '$4,384', noiseDb: '71 dB' },
      { series: '14RCA', capacityKw: '14 LP / 12 NG', fuel: 'NG / LP', msrp: '$5,098', noiseDb: '63 dB', notes: 'PowerBoost standard.' },
      { series: '20RCA', capacityKw: '20 LP / 18 NG', fuel: 'NG / LP', msrp: '$6,016', noiseDb: '64 ex. / 69 full', notes: 'Quiet-Test exercise mode.' },
      { series: '26RCA', capacityKw: '26 LP / 24 NG', fuel: 'NG / LP', msrp: '$7,546', noiseDb: '56 dB' },
      { series: 'RCL liquid-cooled', capacityKw: '24–60 kW', fuel: 'NG / LP', msrp: '$17,900–$28,304', notes: '24RCLA / 38RCLC / 48RCLC / 60RCLB.' },
    ],
    sourceUrls: [
      'https://www.kohlerhomeenergy.rehlko.com/products/home-generators',
      'https://www.kohlerhomeenergy.rehlko.com/resource-center/warranty-promise',
    ],
  },
  {
    name: 'Briggs & Stratton',
    slug: 'briggs-stratton',
    founded: '1908 (Milwaukee, Wisconsin)',
    headquarters: 'Wauwatosa, Wisconsin, USA. Now Briggs & Stratton Energy Solutions (KPS Capital, since 2020).',
    description:
      'Historic US engine maker; standby line rebuilt as PowerProtect with Vanguard commercial engines and a class-leading standard warranty.',
    priceRange: 'PowerProtect air-cooled 13–26 kW; MSRP varies by dealer — get written quotes.',
    warranty: '6-year comprehensive standard; 10-year dealer-exclusive / PowerProtect+ DX.',
    dealerNetwork: 'Moderate; confirm standby-certified servicer locally before committing.',
    models: [
      { series: 'PowerProtect 13 kW', capacityKw: '13 LP / 11.5 NG', fuel: 'NG / LP', notes: 'Entry whole-home.' },
      { series: 'PowerProtect 18 kW', capacityKw: '18 kW', fuel: 'NG / LP', notes: 'Mid-size.' },
      { series: 'PowerProtect 22 kW', capacityKw: '22 kW', fuel: 'NG / LP', notes: 'Popular whole-home.' },
      { series: 'PowerProtect 26 kW', capacityKw: '26 LP / 24 NG', fuel: 'NG / LP', notes: 'Largest air-cooled. DX trim: 10-yr warranty.' },
    ],
    sourceUrls: [
      'https://energy.briggsandstratton.com/en-us/products/residential-standby-generators',
      'https://www.briggsandstratton.com/en-us/news-room/new-powerprotect-generators',
    ],
  },
  {
    name: 'Cummins',
    slug: 'cummins',
    founded: '1919 (Columbus, Indiana)',
    headquarters: 'Columbus, Indiana, USA.',
    description:
      'Industrial-engine giant (Onan heritage); QuietConnect residential line emphasizes low uniform noise and cold-weather performance.',
    priceRange: 'QuietConnect 13–20 kW; premium positioning — dealer quotes vary.',
    warranty: '2-year / 2,000-hour residential (parts, labor, travel); 5-year / 2,000-hour extended (parts only after yr 2).',
    dealerNetwork: 'Moderate; industrial-service DNA, fewer residential storefronts.',
    models: [
      { series: 'QuietConnect RS13A', capacityKw: '13 kW', fuel: 'NG / LP', noiseDb: '65 dB', notes: '54.2 A. Entry.' },
      { series: 'QuietConnect RS17A', capacityKw: '17 kW', fuel: 'NG / LP', noiseDb: '65 dB', notes: '70.8 A. Mid-size.' },
      { series: 'QuietConnect RS20A', capacityKw: '20 kW', fuel: 'NG / LP', noiseDb: '65 dB', notes: 'Popular whole-home.' },
      { series: 'QuietConnect RS20AC', capacityKw: '20 kW', fuel: 'NG / LP', noiseDb: '65 dB', notes: 'Includes ATS. Cold-rated to −40°F.' },
    ],
    sourceUrls: [
      'https://www.cummins.com/en-in/na/generators/home-standby/quietconnect-series',
    ],
  },
  {
    name: 'Champion',
    slug: 'champion',
    founded: '2003 (Santa Fe Springs, California)',
    headquarters: 'Santa Fe Springs, California, USA.',
    description:
      'Value-positioned brand; aXis standby line undercuts rivals 20–30% with a 10-year warranty and quiet small units.',
    priceRange: 'aXis MSRP ~$3,799 (8.5 kW) to ~$6,299 (22 kW). Typically 20–30% below comparable Generac.',
    warranty: '10-year limited — longest standard term in class.',
    dealerNetwork: 'Moderate and growing; confirm local standby service — not just retail availability.',
    models: [
      { series: 'aXis 8.5 kW (100177)', capacityKw: '8.5 LP / 7.5 NG', fuel: 'NG / LP', msrp: '~$3,799', noiseDb: '59.5 dB', notes: 'Select-circuit + 50 A switch. Quietest in class.' },
      { series: 'aXis 12.5 kW', capacityKw: '12.5 LP / 11 NG', fuel: 'NG / LP', noiseDb: '62–63 dB', notes: 'Mid essentials.' },
      { series: 'aXis 14 kW (100835)', capacityKw: '14 LP / 12.5 NG', fuel: 'NG / LP', msrp: '~$4,550', noiseDb: '62–63 dB', notes: 'Whole-house + 100 A switch.' },
      { series: 'aXis 22 kW (201221)', capacityKw: '22 LP / 19.8 NG', fuel: 'NG / LP', msrp: '~$6,299', noiseDb: '67 dB', notes: 'Whole-house + 200 A switch.' },
      { series: 'aXis 26 kW (201612)', capacityKw: '26 LP / 23.4 NG', fuel: 'NG / LP', noiseDb: '~67 dB', notes: 'Largest aXis.' },
    ],
    sourceUrls: [
      'https://www.championpowerequipment.com/products/generators/home-standby-generators/',
    ],
  },
  {
    name: 'Honeywell (by Generac)',
    slug: 'honeywell',
    description:
      'Generac-built units under Honeywell branding — same G-Force engines and components, different paint/logo/price. Supported by Generac.',
    priceRange: 'Mirrors comparable Generac (e.g., 22 kW, 26 kW w/ Mobile Link).',
    warranty: 'Same 5-year limited as Generac.',
    dealerNetwork: 'Limited — select dealers (e.g., Norwall); Generac dealers service them.',
    models: [
      { series: 'Honeywell 22 kW (7065)', capacityKw: '22 kW class', fuel: 'NG / LP', notes: '= Generac 22 kW + Mobile Link.' },
      { series: 'Honeywell 26 kW (7292)', capacityKw: '26 kW class', fuel: 'NG / LP', notes: '= Generac 26 kW + Mobile Link.' },
    ],
    sourceUrls: ['https://www.generac.com/honeywellsupport/'],
  },
];
