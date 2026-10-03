// 2024-snapshot US outage statistics. EIA Electric Power Annual tables are
// the primary source; per-state SAIFI bands and tracker figures are labeled.
// Storm years swing rankings hard — treat as a snapshot, not a permanent order.
export interface StateOutage {
  state: string;
  saidiHours: number;
  saifiBand: string;
  causes: string;
}

export const worstStates2024: StateOutage[] = [
  { state: 'South Carolina', saidiHours: 52.6, saifiBand: '1.8–2.2', causes: 'Helene, Beryl' },
  { state: 'Maine', saidiHours: 29.1, saifiBand: '2.3–3.3', causes: "Tree canopy, nor'easters" },
  { state: 'North Carolina', saidiHours: 24.0, saifiBand: '2.0–2.5', causes: 'Helene, Florence' },
  { state: 'Louisiana', saidiHours: 22.5, saifiBand: '2.7–2.9', causes: 'Francine, Ida' },
  { state: 'West Virginia', saidiHours: 19.4, saifiBand: '2.4–2.6', causes: 'Rural terrain, ice' },
  { state: 'Arkansas', saidiHours: 17.8, saifiBand: '2.1–2.3', causes: 'Tornadoes, storms' },
  { state: 'Michigan', saidiHours: 16.2, saifiBand: '1.8–2.1', causes: 'Ice, wind' },
  { state: 'Mississippi', saidiHours: 15.5, saifiBand: '2.0–2.2', causes: 'Hurricanes, storms' },
  { state: 'Florida', saidiHours: 14.8, saifiBand: '1.8–2.0', causes: 'Milton, Helene, Ian' },
  { state: 'Kentucky', saidiHours: 13.6, saifiBand: '1.9–2.1', causes: 'Ice, tornadoes' },
  { state: 'Tennessee', saidiHours: 12.9, saifiBand: '1.7–1.9', causes: 'Severe storms' },
  { state: 'Alabama', saidiHours: 12.2, saifiBand: '1.7–1.9', causes: 'Hurricanes, tornadoes' },
  { state: 'Georgia', saidiHours: 11.8, saifiBand: '1.8–2.0', causes: 'Helene' },
  { state: 'Texas', saidiHours: 10.5, saifiBand: '1.6–1.9', causes: 'Beryl, Uri legacy' },
  { state: 'Oklahoma', saidiHours: 9.8, saifiBand: '1.8–2.0', causes: 'Tornadoes, storms' },
];

export const bestStates2024: StateOutage[] = [
  { state: 'North Dakota', saidiHours: 1.5, saifiBand: '0.9–1.1', causes: 'Best reliability' },
  { state: 'South Dakota', saidiHours: 1.4, saifiBand: '0.9–1.1', causes: 'Best reliability' },
  { state: 'Arizona', saidiHours: 1.4, saifiBand: '0.9–1.1', causes: 'Best reliability' },
  { state: 'Massachusetts', saidiHours: 1.6, saifiBand: '0.9–1.1', causes: 'Good reliability' },
  { state: 'Connecticut', saidiHours: 1.8, saifiBand: '0.9–1.1', causes: 'Good reliability' },
  { state: 'New Hampshire', saidiHours: 2.0, saifiBand: '0.9–1.1', causes: 'Good reliability' },
  { state: 'New Jersey', saidiHours: 2.3, saifiBand: '1.0–1.2', causes: 'Good reliability' },
  { state: 'Maryland', saidiHours: 2.7, saifiBand: '1.0–1.2', causes: 'Good reliability' },
  { state: 'California', saidiHours: 3.0, saifiBand: '1.0–1.2', causes: 'PSPS fire shutoffs' },
  { state: 'Hawaii', saidiHours: 3.2, saifiBand: '1.1–1.3', causes: 'Island grid' },
];

export const nationalTrend = [
  { year: '2024', saidi: '11.0 h', saifi: '1.531', events: 'Helene, Milton, Beryl, Francine' },
  { year: '2023', saidi: '7.8 h', saifi: '1.431', events: 'Moderate hurricane season' },
  { year: '2022', saidi: '6.5 h', saifi: '~1.35', events: 'Hurricane Ian' },
  { year: '2021', saidi: '8.5 h', saifi: '~1.42', events: 'Winter Storm Uri, Ida' },
  { year: '2020', saidi: '5.8 h', saifi: '~1.28', events: 'Laura, Sally' },
  { year: '10-yr avg', saidi: '5.5–6.0 h', saifi: '1.2–1.4', events: 'Baseline' },
];

export const outageCauses = [
  { cause: 'Severe weather', shareOutages: '40–50%', shareHours: '~80%', notes: 'Drives the big years' },
  { cause: 'Vegetation / trees', shareOutages: '20–25%', shareHours: '15–20%', notes: '#1 distribution cause (~21%)' },
  { cause: 'Equipment failure', shareOutages: '15–20%', shareHours: '10–15%', notes: 'Grid averages 40+ years old' },
  { cause: 'Wildlife', shareOutages: '5–10%', shareHours: '3–5%', notes: 'Squirrels beat hackers' },
  { cause: 'Planned maintenance', shareOutages: '5–8%', shareHours: '3–5%', notes: 'Scheduled, notified' },
  { cause: 'Vehicles / construction', shareOutages: '3–5%', shareHours: '2–3%', notes: 'Pole strikes' },
  { cause: 'Overload / demand', shareOutages: '3–5%', shareHours: '2–3%', notes: 'Peak heat/cold events' },
];
