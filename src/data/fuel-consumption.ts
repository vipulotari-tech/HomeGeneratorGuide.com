// Fuel consumption planning figures, researched Oct 2026.
// NG: cubic feet/hour. Propane: gallons/hour. Ranges blend manufacturer
// spec-sheet points with third-party consumption charts; some rows are
// estimates — verify your exact model's spec sheet for purchase decisions.
export interface FuelRow {
  kw: string;
  half: string;
  full: string;
  verified: boolean;
}

export const naturalGasCFH: FuelRow[] = [
  { kw: '10 kW', half: '98–115', full: '127–195', verified: true },
  { kw: '14 kW', half: '150–189', full: '200–250', verified: true },
  { kw: '18 kW', half: '180–220', full: '250–290', verified: false },
  { kw: '20 kW', half: '200–250', full: '289–350', verified: true },
  { kw: '22 kW', half: '221–228', full: '311–385', verified: true },
  { kw: '24 kW', half: '240–260', full: '330–380', verified: false },
];

export const propaneGPH: FuelRow[] = [
  { kw: '10 kW', half: '0.97–1.4', full: '1.48–1.60', verified: true },
  { kw: '14 kW', half: '1.76–1.81', full: '2.92–3.07', verified: true },
  { kw: '18 kW', half: '1.7–2.0', full: '3.0–3.2', verified: true },
  { kw: '20 kW', half: '2.36–2.5', full: '3.56–3.74', verified: true },
  { kw: '22 kW', half: '2.45–2.53', full: '3.71–3.90', verified: true },
  { kw: '24 kW', half: '~2.53', full: '~3.90', verified: true },
];

export const energyContent = {
  naturalGasPerCF: '1,000–1,036 BTU/ft³',
  propanePerGallon: '91,500 BTU/gal (liquid)',
  propaneVaporPerCF: '~2,500 BTU/ft³',
  therm: '1 therm = 100,000 BTU ≈ 100 ft³ NG',
};

export const priceBands2026 = {
  naturalGasPerTherm: 'US $0.85–$2.00+ (Northeast/CA highest; South/Midwest lowest; EIA 2024–25)',
  propanePerGallon: 'US ~$1.87–$3.80 (Northeast highest; winter peaks; EIA/AFDC 2024–25)',
  ruleNG: 'Cost/hr = (CFH ÷ 1,000) × price per 1,000 ft³',
  rulePropane: 'Cost/hr = GPH × price per gallon',
};

export interface PropaneTank {
  size: string;
  usable: string;
  runtime20kwHalf: string;
  runtime20kwFull: string;
}

export const propaneTanks: PropaneTank[] = [
  { size: '100 gal', usable: '~80 gal', runtime20kwHalf: '~32–38 h', runtime20kwFull: '~16–19 h' },
  { size: '250 gal', usable: '~200 gal', runtime20kwHalf: '~67–80 h', runtime20kwFull: '~33–40 h' },
  { size: '500 gal', usable: '~400 gal', runtime20kwHalf: '~5.5–6.7 days', runtime20kwFull: '~2.8–3.3 days' },
  { size: '1,000 gal', usable: '~800 gal', runtime20kwHalf: '~11–13 days', runtime20kwFull: '~5.5–6.7 days' },
];
