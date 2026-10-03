export interface Appliance {
  name: string;
  category: string;
  runningWatts: number;
  startingWatts: number;
  notes?: string;
  source?: string;
}

// Conservative planning figures compiled from manufacturer spec sheets and
// US DOE / EnergyStar appliance references. Ranges vary by model — always
// confirm against the nameplate of your own equipment and a licensed
// electrician's load calculation.
export const appliances: Appliance[] = [
  { name: 'Refrigerator (18–22 cu ft)', category: 'Kitchen', runningWatts: 700, startingWatts: 2200, notes: 'Compressor surge ~3x running', source: 'Manufacturer spec sheets (range)' },
  { name: 'Deep freezer', category: 'Kitchen', runningWatts: 500, startingWatts: 1500, source: 'Manufacturer spec sheets (range)' },
  { name: 'Microwave (1000 W output)', category: 'Kitchen', runningWatts: 1200, startingWatts: 1200, notes: 'Resistive — no surge', source: 'Nameplate convention' },
  { name: 'Electric range (one element)', category: 'Kitchen', runningWatts: 2500, startingWatts: 2500, notes: 'Full range up to 12,000 W — stagger use', source: 'Nameplate convention' },
  { name: 'Dishwasher (heated dry)', category: 'Kitchen', runningWatts: 1500, startingWatts: 1500, source: 'EnergyStar references' },
  { name: 'Coffee maker', category: 'Kitchen', runningWatts: 1000, startingWatts: 1000, source: 'Nameplate convention' },
  { name: 'Central AC — 2 ton', category: 'HVAC', runningWatts: 2500, startingWatts: 7500, notes: 'LRA surge; soft-start kits reduce surge', source: 'HVAC nameplate / LRA data' },
  { name: 'Central AC — 3 ton', category: 'HVAC', runningWatts: 3500, startingWatts: 11000, notes: 'Largest single residential surge', source: 'HVAC nameplate / LRA data' },
  { name: 'Central AC — 4 ton', category: 'HVAC', runningWatts: 5000, startingWatts: 15000, notes: 'Often needs load management', source: 'HVAC nameplate / LRA data' },
  { name: 'Window AC (10,000 BTU)', category: 'HVAC', runningWatts: 1200, startingWatts: 3600, source: 'Manufacturer spec sheets (range)' },
  { name: 'Furnace blower (gas furnace)', category: 'HVAC', runningWatts: 800, startingWatts: 2300, notes: 'Gas heat still needs electricity', source: 'Furnace spec sheets' },
  { name: 'Heat pump (3 ton)', category: 'HVAC', runningWatts: 4000, startingWatts: 12000, notes: 'Aux heat strips add 5,000–10,000 W', source: 'Heat-pump nameplates' },
  { name: 'Portable space heater', category: 'HVAC', runningWatts: 1500, startingWatts: 1500, source: 'Nameplate convention' },
  { name: 'Well pump — 1/2 HP', category: 'Water', runningWatts: 1000, startingWatts: 3000, notes: 'Deep wells surge hard', source: 'Pump motor charts' },
  { name: 'Well pump — 1 HP', category: 'Water', runningWatts: 2000, startingWatts: 6000, source: 'Pump motor charts' },
  { name: 'Sump pump (1/3 HP)', category: 'Water', runningWatts: 800, startingWatts: 2400, source: 'Pump motor charts' },
  { name: 'Sewage ejector pump', category: 'Water', runningWatts: 1000, startingWatts: 3000, source: 'Pump motor charts' },
  { name: 'Electric water heater (50 gal)', category: 'Water', runningWatts: 4500, startingWatts: 4500, notes: 'Consider load-shed module', source: 'Nameplate convention' },
  { name: 'Tankless electric water heater', category: 'Water', runningWatts: 18000, startingWatts: 18000, notes: 'Usually excluded from backup panel', source: 'Nameplate convention' },
  { name: 'Clothes washer', category: 'Laundry', runningWatts: 500, startingWatts: 1500, notes: 'Motor surge on agitation', source: 'Manufacturer spec sheets (range)' },
  { name: 'Electric dryer', category: 'Laundry', runningWatts: 5400, startingWatts: 5400, notes: 'Usually excluded from essential panel', source: 'Nameplate convention' },
  { name: 'TV (55 in LED)', category: 'Electronics', runningWatts: 150, startingWatts: 150, source: 'EnergyStar references' },
  { name: 'Desktop computer + monitor', category: 'Electronics', runningWatts: 300, startingWatts: 300, source: 'Nameplate convention' },
  { name: 'Wi-Fi router + modem', category: 'Electronics', runningWatts: 30, startingWatts: 30, source: 'Nameplate convention' },
  { name: 'LED lighting (whole home, 20 bulbs)', category: 'Lighting', runningWatts: 200, startingWatts: 200, source: 'DOE lighting data' },
  { name: 'Garage door opener', category: 'Other', runningWatts: 600, startingWatts: 1800, source: 'Opener spec sheets' },
  { name: 'EV charger (Level 2, 32 A)', category: 'Other', runningWatts: 7700, startingWatts: 7700, notes: 'Usually excluded; charge scheduling helps', source: 'EVSE nameplates' },
  { name: 'CPAP machine', category: 'Medical', runningWatts: 60, startingWatts: 60, notes: 'Verify with device label; keep on UPS + backup', source: 'Device labels' },
];
