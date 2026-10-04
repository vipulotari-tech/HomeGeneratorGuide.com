export interface WattRange {
  minimum: number;
  maximum: number;
}

export interface ApplianceReference {
  name: string;
  category: 'Cooling' | 'Pumps' | 'Water' | 'Kitchen' | 'Heating' | 'Laundry' | 'Lighting and electronics' | 'Medical';
  runningWatts: WattRange;
  /** null means the cited chart does not list additional starting watts. */
  startingWatts: WattRange | null;
  sourceUrl: string;
}

/**
 * Curated residential values transcribed from Champion Power Equipment's
 * published wattage chart. These are manufacturer-published reference ranges,
 * not measurements of a specific appliance and not sizing recommendations.
 */
export const APPLIANCE_WATTAGE_SOURCE = {
  label: 'Champion Power Equipment, Generator Wattage Chart',
  url: 'https://www.championpowerequipment.com/generator-wattage-chart/',
  checkedOn: '2026-10-04',
} as const;

const sourceUrl = APPLIANCE_WATTAGE_SOURCE.url;
const range = (minimum: number, maximum: number): WattRange => ({ minimum, maximum });

export const appliances: ApplianceReference[] = [
  { name: 'Refrigerator', category: 'Kitchen', runningWatts: range(150, 400), startingWatts: range(800, 1200), sourceUrl },
  { name: 'Freezer', category: 'Kitchen', runningWatts: range(100, 500), startingWatts: range(500, 1000), sourceUrl },
  { name: 'Microwave', category: 'Kitchen', runningWatts: range(600, 1200), startingWatts: null, sourceUrl },
  { name: 'Dishwasher', category: 'Kitchen', runningWatts: range(1200, 2400), startingWatts: null, sourceUrl },
  { name: 'Electric range, one burner', category: 'Kitchen', runningWatts: range(1200, 2400), startingWatts: null, sourceUrl },
  { name: 'Electric water heater', category: 'Water', runningWatts: range(3000, 4500), startingWatts: null, sourceUrl },
  { name: 'Central air conditioner, 2 ton', category: 'Cooling', runningWatts: range(2000, 2500), startingWatts: range(3500, 4500), sourceUrl },
  { name: 'Central air conditioner, 3 ton', category: 'Cooling', runningWatts: range(3000, 3500), startingWatts: range(5000, 6000), sourceUrl },
  { name: 'Central air conditioner, 4 ton', category: 'Cooling', runningWatts: range(4000, 5000), startingWatts: range(6500, 8000), sourceUrl },
  { name: 'Window air conditioner, 5,000 BTU', category: 'Cooling', runningWatts: range(450, 600), startingWatts: range(900, 1200), sourceUrl },
  { name: 'Window air conditioner, 10,000 BTU', category: 'Cooling', runningWatts: range(900, 1200), startingWatts: range(1800, 2400), sourceUrl },
  { name: 'Furnace fan, 1/2 HP', category: 'Heating', runningWatts: range(300, 800), startingWatts: range(800, 1600), sourceUrl },
  { name: 'Well pump, 1/2 HP', category: 'Pumps', runningWatts: range(750, 1000), startingWatts: range(1500, 2000), sourceUrl },
  { name: 'Well pump, 1 HP', category: 'Pumps', runningWatts: range(1000, 2000), startingWatts: range(2000, 4000), sourceUrl },
  { name: 'Sump pump, 1/3 HP', category: 'Pumps', runningWatts: range(500, 800), startingWatts: range(1000, 1600), sourceUrl },
  { name: 'Sump pump, 1/2 HP', category: 'Pumps', runningWatts: range(800, 1050), startingWatts: range(1300, 2150), sourceUrl },
  { name: 'Washing machine', category: 'Laundry', runningWatts: range(500, 1000), startingWatts: range(1000, 2300), sourceUrl },
  { name: 'Electric dryer', category: 'Laundry', runningWatts: range(4000, 6000), startingWatts: null, sourceUrl },
  { name: 'Space heater', category: 'Heating', runningWatts: range(750, 1500), startingWatts: null, sourceUrl },
  { name: 'Ceiling fan', category: 'Lighting and electronics', runningWatts: range(15, 75), startingWatts: null, sourceUrl },
  { name: 'Television, 32–55 in', category: 'Lighting and electronics', runningWatts: range(80, 400), startingWatts: null, sourceUrl },
  { name: 'LED light bulb (each)', category: 'Lighting and electronics', runningWatts: range(8, 15), startingWatts: null, sourceUrl },
  { name: 'Phone or laptop charger', category: 'Lighting and electronics', runningWatts: range(20, 100), startingWatts: null, sourceUrl },
  { name: 'Window fan', category: 'Lighting and electronics', runningWatts: range(50, 200), startingWatts: null, sourceUrl },
  { name: 'Home security system', category: 'Lighting and electronics', runningWatts: range(15, 40), startingWatts: null, sourceUrl },
  { name: 'Internet router and modem', category: 'Lighting and electronics', runningWatts: range(10, 20), startingWatts: null, sourceUrl },
  { name: 'CPAP, without heated humidifier', category: 'Medical', runningWatts: range(30, 60), startingWatts: null, sourceUrl },
  { name: 'CPAP, with heated humidifier', category: 'Medical', runningWatts: range(60, 120), startingWatts: null, sourceUrl },
];
