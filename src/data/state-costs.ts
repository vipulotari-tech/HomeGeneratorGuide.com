// No fabricated 50-state price table. State costs vary by labor rates, permits,
// fuel-trenching distance, and site work — no credible national dataset publishes
// per-state standby installed prices. This module encodes the honest methodology.
export interface CostFactor {
  factor: string;
  impact: 'low' | 'medium' | 'high';
  guidance: string;
}

export const nationalInstalledRange2026 = {
  // Labeled estimates, not quotes. Methodology: 2024–2026 installer-published
  // ranges + retail equipment pricing; adjusted for inflation-free framing.
  typicalRange: '$9,000–$16,000 installed',
  equipmentOnly: '$2,000–$7,500',
  installLaborAndMaterials: '$4,000–$9,000+',
  annualMaintenance: '$300–$600',
  disclaimer:
    'Prices are estimates based on available market information and national-level ranges. Actual costs vary significantly by location, labor rates, generator size, permitting requirements, fuel setup, and site conditions. Get multiple quotes from qualified local installers.',
};

export const costFactors: CostFactor[] = [
  { factor: 'Labor rates (metro vs rural)', impact: 'high', guidance: 'Northeast, West Coast metros, and remote sites trend above the national range; Southeast/Midwest often below. Get 3 local quotes.' },
  { factor: 'Gas line distance / trenching', impact: 'high', guidance: 'Every extra foot of gas pipe or trench adds cost. Long runs to propane tanks are a top surprise line-item.' },
  { factor: 'Electrical distance / panel work', impact: 'high', guidance: 'Long wire runs, panel upgrades, or service changes add $500–$3,000+.' },
  { factor: 'Permits and inspections', impact: 'medium', guidance: '$100–$600+ depending on jurisdiction; HOA approvals add time.' },
  { factor: 'Pad, grading, and clearance work', impact: 'medium', guidance: 'Concrete pad, gravel bed, or retaining work: $200–$1,500+.' },
  { factor: 'Transfer switch / load management', impact: 'medium', guidance: 'Service-entrance ATS vs subpanel + load-shed modules shift cost by $500–$2,000.' },
  { factor: 'Winter / storm-season scheduling', impact: 'low', guidance: 'Peak outage season can extend lead times more than price.' },
];

export function quoteChecklist(): string[] {
  return [
    'Generator model + kW + fuel in writing',
    'Transfer switch type and included load-management modules',
    'Gas scope: pipe length, trenching, pressure test, propane tank size if any',
    'Electrical scope: wire runs, panel work, grounding, permits',
    'Pad/site prep and restoration included?',
    'Permit fees and inspection scheduling — who handles?',
    'Startup, programming, and homeowner walkthrough included?',
    'Warranty registration + first maintenance date',
  ];
}
