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
  slug: string;
  publishedOn?: string;
  family?: string;
  lastSourceCheck?: string;
  evidenceNotes?: string[];
  fieldSources?: Record<string,string>;
  missingFields?: string[];
  documents?: Record<string,string>;
  electrical?: {voltage?: string; frequencyHz?: number; phase?: string};
  enclosure?: string;
  ats?: {included?: boolean; amps?: number; model?: string; serviceEntranceRated?: boolean};
  monitoring?: string;
  coldWeather?: string;
  loadManagement?: string;
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

import records from './models.json';

export const MODEL_SPECS: ModelSpec[] = records as unknown as ModelSpec[];

export const getModelSpecs = (brand: string) =>
  MODEL_SPECS.filter((model) => model.brand.toLowerCase() === brand.toLowerCase());
