export interface SwitchType {
  name: string;
  operation: 'manual' | 'automatic';
  partsCost: string;
  installedCost: string;
  laborHours: string;
  bestFor: string;
  exampleModels?: string;
}

export const switchTypes: SwitchType[] = [
  {
    name: 'Interlock Kit',
    operation: 'manual',
    partsCost: '$50–$150',
    installedCost: '$200–$600 total',
    laborHours: '2–4 hours',
    bestFor: 'Portable generators, whole-panel manual backup on a budget',
    exampleModels: 'Square D QOCGK2C (~$69); Siemens kits (~$80–$120)',
  },
  {
    name: 'Manual Transfer Switch (6–10 circuits)',
    operation: 'manual',
    partsCost: '$200–$800',
    installedCost: '$400–$1,300 total',
    laborHours: '3–5 hours',
    bestFor: 'Portable generators, essential circuits only',
    exampleModels: 'Reliance 31406CWK 6-circuit (~$314); Reliance 510C 10-circuit (~$430)',
  },
  {
    name: 'Manual Transfer Switch (whole-panel, service-rated)',
    operation: 'manual',
    partsCost: '$400–$1,200',
    installedCost: '$600–$1,200 labor + parts',
    laborHours: '4–6 hours',
    bestFor: 'Whole-panel manual transfer with portable or standby',
    exampleModels: 'Generac RXSW100A3 100 A (~$500); RXSW200A3 200 A (~$1,010)',
  },
  {
    name: 'Automatic Transfer Switch (100–200 A)',
    operation: 'automatic',
    partsCost: '$600–$2,500',
    installedCost: '$1,200–$2,500 total',
    laborHours: '4–8 hours',
    bestFor: 'Standby generators, essential or managed loads',
    exampleModels: 'Generac Symphony Plus (~$1,000–$1,500); Kohler RXT (~$800–$1,200)',
  },
  {
    name: 'Service-Rated ATS (whole-home, service entrance)',
    operation: 'automatic',
    partsCost: '$1,500–$3,500+',
    installedCost: '$1,500–$3,000+ labor + parts',
    laborHours: '6–10 hours',
    bestFor: 'Managed whole-home standby (20 kW+)',
    exampleModels: 'Generac 200 A service-rated (~$1,500–$2,000)',
  },
];

// NFPA 37 simplified minimums for outdoor standby placement.
// Local codes and the equipment manual govern — these are floors, not targets.
export interface Clearance {
  from: string;
  distance: string;
  basis: string;
}

export const clearances: Clearance[] = [
  { from: 'Combustible walls / fencing / sheds', distance: '18 in (1.5 ft)', basis: 'NFPA 37' },
  { from: 'Windows (operable)', distance: '60 in (5 ft)', basis: 'NFPA 37 — CO entry' },
  { from: 'Doors', distance: '60 in (5 ft)', basis: 'NFPA 37 — CO entry' },
  { from: 'Air intakes / soffits / vents', distance: '60 in (5 ft)', basis: 'NFPA 37 — exhaust recirculation' },
  { from: 'Property line', distance: '60 in (5 ft) typical', basis: 'Local zoning (often more)' },
  { from: 'Gas meter / regulator', distance: '36 in (3 ft) min', basis: 'NFPA 54 (verify utility)' },
  { from: 'Electric meter', distance: '36 in (3 ft)', basis: 'Utility + NEC 110.26 working space' },
  { from: 'AC condenser', distance: '36 in (3 ft)', basis: 'Manufacturer (5 ft best practice)' },
  { from: 'HVAC intake', distance: '120 in (10 ft)', basis: 'ICC Mechanical Code ref.' },
  { from: 'Service access (front/side)', distance: '36 in (3 ft)', basis: 'Manufacturer service' },
  { from: 'Overhead / lifting', distance: '72 in (6 ft)', basis: 'Service removal' },
];
