/**
 * Exact, model-scoped manufacturer data reviewed 2026-10-04.
 *
 * Model ratings and details carry official manufacturer sources; a family-level
 * FAQ is identified as such when it supports policy or warranty context.
 * Missing fields are deliberately omitted rather than inferred from a brand
 * family, a different fuel, or an unverified reseller document.
 */
export type GeneratorFuel = 'LP' | 'Natural gas';

export interface ModelSource {
  label: string;
  url: string;
  checkedOn: string;
}

export interface ModelSpec {
  brand: string;
  modelId: string;
  displayName: string;
  configuration?: string;
  productUrl: string;
  ratingsKw: Partial<Record<GeneratorFuel, number>>;
  /** Exact generic standby rating when the accessible model page does not list fuel-specific output. */
  standbyRatingKw?: number;
  standbyRatingKva?: number;
  dimensionsIn?: { length: number; width: number; height: number };
  weightLb?: number;
  engine?: { maker?: string; model?: string; displacementCc?: number };
  sound?: {
    decibelsA: number;
    condition: string;
    distanceFt?: number;
    direction?: string;
  }[];
  fuelConsumption?: {
    fuel: GeneratorFuel;
    loadPercent: number;
    amount: number;
    unit: 'gal/hr' | 'ft³/hr' | 'BTU/hr';
  }[];
  startingMsrpUsd?: number;
  startingMsrpNote?: string;
  transferSwitch?: string;
  warranty?: string;
  sources: ModelSource[];
}

const checkedOn = '2026-10-04';

export const MODEL_SPECS: ModelSpec[] = [
  {
    brand: 'Generac',
    modelId: 'G0072600',
    displayName: '22 kW Cellular Standby Generator',
    configuration: '60 Hz, single-phase; 22 kW on LP and 21 kW on natural gas.',
    productUrl: 'https://www.generac.com/residential-products/standby-generators/gaseous/standby-generator-22kw-7260/',
    ratingsKw: { LP: 22, 'Natural gas': 21 },
    dimensionsIn: { length: 46.4, width: 26.3, height: 30.7 },
    weightLb: 451,
    engine: { maker: 'Generac', model: 'G-Force 1000', displacementCc: 997 },
    sound: [
      { decibelsA: 67, condition: 'normal load', distanceFt: 23, direction: 'measured from the front' },
      { decibelsA: 55, condition: 'Quiet-Test low-speed exercise', distanceFt: 23, direction: 'measured from the front' },
    ],
    fuelConsumption: [
      { fuel: 'Natural gas', loadPercent: 50, amount: 221, unit: 'ft³/hr' },
      { fuel: 'Natural gas', loadPercent: 100, amount: 311, unit: 'ft³/hr' },
      { fuel: 'LP', loadPercent: 50, amount: 2.45, unit: 'gal/hr' },
      { fuel: 'LP', loadPercent: 100, amount: 3.71, unit: 'gal/hr' },
    ],
    startingMsrpUsd: 6309,
    startingMsrpNote: 'Manufacturer-listed starting MSRP; this product page does not establish an installed project price or an included transfer-switch bundle.',
    transferSwitch: 'The family spec sheet describes a 200 A service-rated transfer switch in bundled models; the cited G0072600 product page does not identify a switch bundle.',
    warranty: 'Generac states a 5-year limited warranty for this standby generator. See the model warranty statement for full terms.',
    sources: [
      { label: 'Generac G0072600 product page', url: 'https://www.generac.com/residential-products/standby-generators/gaseous/standby-generator-22kw-7260/', checkedOn },
      { label: 'Generac G0072600 official 22–28 kW specification sheet', url: 'https://productmanuals.generac.com/api/manualfiles/G0072600/A0005151077/0', checkedOn },
    ],
  },
  {
    brand: 'Generac',
    modelId: 'G0073270',
    displayName: '26 kW Cellular Standby Generator',
    configuration: '60 Hz, single-phase; 26 kW on LP and 24 kW on natural gas.',
    productUrl: 'https://www.generac.com/residential-products/standby-generators/gaseous/standby-generator-26kw-7327/',
    ratingsKw: { LP: 26, 'Natural gas': 24 },
    dimensionsIn: { length: 46.4, width: 26.3, height: 30.7 },
    weightLb: 524,
    engine: { maker: 'Generac', model: 'G-Force 1000', displacementCc: 997 },
    sound: [
      { decibelsA: 67, condition: 'normal load', distanceFt: 23, direction: 'measured from the front' },
      { decibelsA: 55, condition: 'Quiet-Test low-speed exercise', distanceFt: 23, direction: 'measured from the front' },
    ],
    fuelConsumption: [
      { fuel: 'Natural gas', loadPercent: 50, amount: 182, unit: 'ft³/hr' },
      { fuel: 'Natural gas', loadPercent: 100, amount: 316, unit: 'ft³/hr' },
      { fuel: 'LP', loadPercent: 50, amount: 2.05, unit: 'gal/hr' },
      { fuel: 'LP', loadPercent: 100, amount: 3.95, unit: 'gal/hr' },
    ],
    startingMsrpUsd: 7159,
    startingMsrpNote: 'Manufacturer-listed starting MSRP; the product page does not establish an installed project price or an included transfer-switch bundle.',
    transferSwitch: 'The family spec sheet describes a 200 A service-rated transfer switch in bundled models; the cited G0073270 product page does not identify a switch bundle.',
    warranty: 'Generac states a 5-year limited warranty for this standby generator. See the model warranty statement for full terms.',
    sources: [
      { label: 'Generac G0073270 product page', url: 'https://www.generac.com/residential-products/standby-generators/gaseous/standby-generator-26kw-7327/', checkedOn },
      { label: 'Generac G0073270 official 22–28 kW specification sheet', url: 'https://productmanuals.generac.com/api/manualfiles/G0073270/A0005151077/0', checkedOn },
    ],
  },
  {
    brand: 'KOHLER / Rehlko',
    modelId: '26RCA',
    displayName: '26 kW Home Generator',
    configuration: 'Single-phase 120/240 V configuration; 26 kW on LP and 24 kW on natural gas. The manufacturer sheet also lists different three-phase configurations under the 26RCA family; those ratings are not shown here.',
    productUrl: 'https://www.kohlerhomeenergy.rehlko.com/products/home-generators/26rca',
    ratingsKw: { LP: 26, 'Natural gas': 24 },
    dimensionsIn: { length: 47, width: 26, height: 32.3 },
    weightLb: 625,
    engine: { maker: 'KOHLER', model: 'CH1006', displacementCc: 999 },
    sound: [
      { decibelsA: 67, condition: 'full-speed generator diagnostics and normal operation', distanceFt: 23 },
      { decibelsA: 56, condition: 'engine exercise', distanceFt: 23 },
    ],
    fuelConsumption: [
      { fuel: 'Natural gas', loadPercent: 50, amount: 180, unit: 'ft³/hr' },
      { fuel: 'LP', loadPercent: 50, amount: 85, unit: 'ft³/hr' },
    ],
    startingMsrpUsd: 7546,
    startingMsrpNote: 'The 26RCA product page lists this starting MSRP for the no-ATS configuration; its separate 26RCAL page lists an ATS-inclusive package starting at $8,515. Final pricing is dealer-determined; neither is an installed quote.',
    transferSwitch: 'The official spec sheet says the 26RCAL package includes a 200 A service-entrance-rated RXT automatic transfer switch; the 26RCA generator set is also listed separately.',
    warranty: 'The current official spec sheet states a premium 5-year/2,000-hour limited warranty covering parts, labor, and travel for the full warranty period.',
    sources: [
      { label: 'KOHLER 26RCA product page', url: 'https://www.kohlerhomeenergy.rehlko.com/products/home-generators/26rca', checkedOn },
      { label: 'Official 26RCA/26RCAL specification sheet (G4-315, 2026)', url: 'https://techcomm.rehlko.com/techcomm/pdf/g4315.pdf', checkedOn },
    ],
  },
  {
    brand: 'KOHLER / Rehlko',
    modelId: '26RCAL',
    displayName: '26 kW Home Generator Package with ATS',
    configuration: 'Single-phase 120/240 V configuration; 26 kW on LP and 24 kW on natural gas. The manufacturer identifies 26RCAL as the ATS-inclusive package.',
    productUrl: 'https://www.kohlerhomeenergy.rehlko.com/products/home-generators/26rcal',
    ratingsKw: { LP: 26, 'Natural gas': 24 },
    dimensionsIn: { length: 47, width: 26, height: 32.3 },
    weightLb: 670,
    engine: { maker: 'KOHLER', model: 'CH1006', displacementCc: 999 },
    sound: [
      { decibelsA: 67, condition: 'full-speed generator diagnostics and normal operation; manufacturer says this is the lowest of eight measurement points and other points may differ with installation', distanceFt: 23 },
      { decibelsA: 56, condition: '90-second EcoExercise mode; manufacturer says this is the lowest of eight measurement points and other points may differ with installation', distanceFt: 23 },
    ],
    fuelConsumption: [
      { fuel: 'Natural gas', loadPercent: 50, amount: 180, unit: 'ft³/hr' },
      { fuel: 'LP', loadPercent: 50, amount: 85, unit: 'ft³/hr' },
    ],
    startingMsrpUsd: 8515,
    startingMsrpNote: 'Manufacturer-listed starting MSRP for the 26RCAL ATS-inclusive package; the product page says final dealer pricing depends on customization and installation. This is not an installed quote.',
    transferSwitch: 'The 26RCAL product page says an automatic transfer switch is included; the official G4-315 specification sheet identifies the Model RXT as a 200 A service-entrance-rated ATS.',
    warranty: 'The current official G4-315 specification sheet states a premium 5-year/2,000-hour limited warranty covering parts, labor, and travel for the full warranty period.',
    sources: [
      { label: 'KOHLER 26RCAL product page', url: 'https://www.kohlerhomeenergy.rehlko.com/products/home-generators/26rcal', checkedOn },
      { label: 'Official 26RCA/26RCAL specification sheet (G4-315, 2026)', url: 'https://techcomm.rehlko.com/techcomm/pdf/g4315.pdf', checkedOn },
    ],
  },
  {
    brand: 'Champion',
    modelId: '201614',
    displayName: '26 kW fleX Home Standby Generator System',
    configuration: '26 kW on LP and 23.4 kW on natural gas; 60 Hz, single-phase, 120/240 V. Product is sold as a system with a 200 A service-entrance-rated fleX automatic transfer switch.',
    productUrl: 'https://www.championpowerequipment.com/product/201614-26-kw-whole-house-home-standby-generator-and-200a-switch-with-flex-technology/',
    ratingsKw: { LP: 26, 'Natural gas': 23.4 },
    dimensionsIn: { length: 57.4, width: 29.5, height: 43.9 },
    weightLb: 642.7,
    engine: { maker: 'Champion', displacementCc: 999 },
    sound: [
      { decibelsA: 68, condition: 'manufacturer-listed operational volume; Champion says the measurement is approximate, measured at 23 ft, and installation-site conditions may vary', distanceFt: 23 },
    ],
    fuelConsumption: [
      { fuel: 'LP', loadPercent: 50, amount: 2.39, unit: 'gal/hr' },
      { fuel: 'LP', loadPercent: 100, amount: 3.95, unit: 'gal/hr' },
      { fuel: 'Natural gas', loadPercent: 50, amount: 197.8, unit: 'ft³/hr' },
      { fuel: 'Natural gas', loadPercent: 100, amount: 321.1, unit: 'ft³/hr' },
    ],
    transferSwitch: 'The 201614 system includes a 200 A, 120/240 V, service-entrance fleX automatic transfer switch with NEMA 3R enclosure. Champion states that the fleX controller supports load management; quote scope should identify any required load-management modules and controlled loads.',
    warranty: 'Champion lists a 10-year limited generator warranty and a separate 2-year limited transfer-switch warranty. Champion’s air-cooled HSB warranty terms also state a 10-year/2,000-hour limit, with mileage/labor/parts coverage in years 1–2 and parts-only coverage in years 3–10, subject to activation, maintenance, service, and other warranty conditions.',
    sources: [
      { label: 'Champion model 201614 product page and specifications', url: 'https://www.championpowerequipment.com/product/201614-26-kw-whole-house-home-standby-generator-and-200a-switch-with-flex-technology/', checkedOn: '2026-10-05' },
      { label: 'Champion air-cooled home standby 10-year limited warranty (official manual)', url: 'https://www.championpowerequipment.com/wp-content/uploads/2025/09/201202-OM-english.pdf', checkedOn: '2026-10-05' },
    ],
  },
  {
    brand: 'Champion',
    modelId: '201222',
    displayName: '22 kW aXis Home Standby Generator System',
    configuration: '22 kW on LP and 19.8 kW on natural gas; 60 Hz, single-phase, 120/240 V. Product is sold as a system with a 200 A aXis automatic transfer switch.',
    productUrl: 'https://www.championpowerequipment.com/product/201222-22-kw-whole-house-home-standby-generator-and-200a-switch-with-axis-technology/',
    ratingsKw: { LP: 22, 'Natural gas': 19.8 },
    engine: { maker: 'Champion', displacementCc: 999 },
    sound: [
      { decibelsA: 67, condition: 'manufacturer says the measurement is approximate; load is not stated and installation-site sound is not represented', distanceFt: 23 },
    ],
    fuelConsumption: [
      { fuel: 'LP', loadPercent: 50, amount: 2, unit: 'gal/hr' },
      { fuel: 'LP', loadPercent: 100, amount: 3.6, unit: 'gal/hr' },
      { fuel: 'Natural gas', loadPercent: 50, amount: 173.4, unit: 'ft³/hr' },
      { fuel: 'Natural gas', loadPercent: 100, amount: 270.2, unit: 'ft³/hr' },
    ],
    transferSwitch: 'The 201222 system includes a 200 A aXis automatic transfer switch; load-management modules are listed as sold separately.',
    warranty: 'Manufacturer states a 10-year limited warranty on the generator and a separate 2-year limited warranty on the ATS. Read the current warranty document for year-by-year labor/travel/parts terms and maintenance obligations.',
    sources: [
      { label: 'Champion model 201222 product page and specifications', url: 'https://www.championpowerequipment.com/product/201222-22-kw-whole-house-home-standby-generator-and-200a-switch-with-axis-technology/', checkedOn },
      { label: 'Champion home standby generator warranty summary', url: 'https://help.championpowerequipment.com/article/e9pbt6pk36-home-standby-generator-warranty', checkedOn: '2026-10-05' },
    ],
  },
  {
    brand: 'Briggs & Stratton',
    modelId: '040786',
    displayName: 'PowerProtect 22 kW Standby Generator',
    configuration: '22 kW on LP and natural gas; 120/240 V.',
    productUrl: 'https://energy.briggsandstratton.com/en-us/products/powerprotect-22kw-standby-generator',
    ratingsKw: { LP: 22, 'Natural gas': 22 },
    engine: { maker: 'Briggs & Stratton Vanguard', displacementCc: 993 },
    sound: [
      { decibelsA: 68, condition: 'manufacturer-listed normal operating sound; measurement distance and test load are not stated on the cited page' },
    ],
    dimensionsIn: { length: 46.5, width: 26.8, height: 28.4 },
    weightLb: 465,
    fuelConsumption: [
      { fuel: 'Natural gas', loadPercent: 50, amount: 194000, unit: 'BTU/hr' },
      { fuel: 'LP', loadPercent: 50, amount: 217000, unit: 'BTU/hr' },
    ],
    startingMsrpUsd: 6037,
    startingMsrpNote: 'Manufacturer-listed starting MSRP; not an installed quote. The product page does not establish an included transfer-switch bundle.',
    transferSwitch: 'The cited generator product page does not state that a transfer switch is included; confirm the exact package in any dealer quote.',
    warranty: 'Manufacturer lists a 7-year comprehensive limited warranty and says labor, parts, and service are included; check the warranty document for conditions and exclusions.',
    sources: [
      { label: 'Briggs & Stratton PowerProtect model 040786 product page and specifications', url: 'https://energy.briggsandstratton.com/en-us/products/powerprotect-22kw-standby-generator', checkedOn },
      { label: 'Briggs & Stratton model 040786 specification sheet', url: 'https://briggs.widen.net/s/vxr2wjzrkp/16395_pp22_spec-sheet_10', checkedOn },
    ],
  },
  {
    brand: 'Cummins',
    modelId: 'RS13A',
    displayName: 'QuietConnect RS13A',
    configuration: 'Cummins lists this 13 kW standby rating on its model page. The accessible summary does not show separate LP/NG output or complete model specifications; verify the model sheet for the exact configuration.',
    productUrl: 'https://www.cummins.com/en-na/generators/products/rs13a',
    ratingsKw: {},
    standbyRatingKw: 13,
    standbyRatingKva: 13,
    warranty: 'Cummins’ home-generator FAQ lists 13, 17, and 20 kW models with a 5-year/2,000-hour limited warranty. Confirm the exact warranty terms and exclusions for the purchased unit.',
    sources: [
      { label: 'Cummins RS13A model page', url: 'https://www.cummins.com/en-na/generators/products/rs13a', checkedOn },
      { label: 'Cummins specification-sheet viewer (NAS-6254; interactive consent required)', url: 'https://liveshareeast3.seismic.com/i/QkthrmWPLUSSIGNCiBD658___O4ux6BrNhRNEI2IUHkO0gghv9myOO9SM8mhHOJtTeV3D3rhT7h44z7YwRvuIzvFUnPg4ifI6GoJlFiMNExZlVQoTwFNaj2QM8fSe6k5Ht9F3Fens', checkedOn },
      { label: 'Cummins home generator FAQ and warranty summary', url: 'https://www.cummins.com/en-na/na/generators/home-standby/home-generator-faq', checkedOn },
    ],
  },
  {
    brand: 'Cummins',
    modelId: 'RS17A',
    displayName: 'QuietConnect RS17A',
    configuration: 'Cummins lists this 17 kW standby rating on its model page. The accessible summary does not show separate LP/NG output or complete model specifications; verify the model sheet for the exact configuration.',
    productUrl: 'https://www.cummins.com/en-na/generators/products/rs17a',
    ratingsKw: {},
    standbyRatingKw: 17,
    standbyRatingKva: 17,
    warranty: 'Cummins’ home-generator FAQ lists 13, 17, and 20 kW models with a 5-year/2,000-hour limited warranty. Confirm the exact warranty terms and exclusions for the purchased unit.',
    sources: [
      { label: 'Cummins RS17A model page', url: 'https://www.cummins.com/en-na/generators/products/rs17a', checkedOn },
      { label: 'Cummins specification-sheet viewer (NAS-6254; interactive consent required)', url: 'https://liveshareeast3.seismic.com/i/QkthrmWPLUSSIGNCiBD658___O4ux6BrNhRNEI2IUHkO0gghv9myOO9SM8mhHOJtTeV3D3rhT7h44z7YwRvuIzvFUnPg4ifI6GoJlFiMNExZlVQoTwFNaj2QM8fSe6k5Ht9F3Fens', checkedOn },
      { label: 'Cummins home generator FAQ and warranty summary', url: 'https://www.cummins.com/en-na/na/generators/home-standby/home-generator-faq', checkedOn },
    ],
  },
  {
    brand: 'Cummins',
    modelId: 'RS20A',
    displayName: 'QuietConnect RS20A',
    configuration: 'Cummins lists this 20 kW standby rating on its model page. The accessible summary does not show separate LP/NG output or complete model specifications; verify the model sheet for the exact configuration.',
    productUrl: 'https://www.cummins.com/en-na/generators/products/rs20a',
    ratingsKw: {},
    standbyRatingKw: 20,
    standbyRatingKva: 18,
    warranty: 'Cummins’ home-generator FAQ lists 13, 17, and 20 kW models with a 5-year/2,000-hour limited warranty. Confirm the exact warranty terms and exclusions for the purchased unit.',
    sources: [
      { label: 'Cummins RS20A model page', url: 'https://www.cummins.com/en-na/generators/products/rs20a', checkedOn },
      { label: 'Cummins specification-sheet viewer (NAS-6254; interactive consent required)', url: 'https://eng2e.seismic.com/i/QkthrmWPLUSSIGNCiBD658___O4ux6BrNhRNEI2IUHkO0gghv9myO7SDb1DlKFUTwfiOR1FyPLUSSIGNlLRcbyrRtD8gMUsaCB8Wv2hjof2AqOY___eReSe36508aZXodVtPLUSSIGNqK5E78dKWk8qZ3', checkedOn },
      { label: 'Cummins home generator FAQ and warranty summary', url: 'https://www.cummins.com/en-na/na/generators/home-standby/home-generator-faq', checkedOn },
    ],
  },
];

export const getModelSpecs = (brand: string) =>
  MODEL_SPECS.filter((model) => model.brand.toLowerCase() === brand.toLowerCase());
