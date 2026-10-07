/** Empty registries are intentional. Never seed production with example participants. */
export type Verification = 'pending' | 'verified' | 'rejected' | 'withdrawn';
export const COST_ITEMS = ['generator','ats','electricalLabor','fuelLine','gasMeter','propaneTank','trenching','pad','permits','inspection','utilityCoordination','coldWeather','monitoring','commissioning','maintenancePlan','travel','taxes','miscellaneous'] as const;
export interface QuoteRecord {
 id:string; projectId:string; kind:'quote'|'invoice'; date:string; state:string; metro:string|null; zipPrefix:string|null;
 projectType:'new-install'|'replacement'|'upgrade'; brand:string; modelId:string; ratedKw:number|null; fuel:'LP'|'Natural gas'; atsModel:string|null;
 serviceAmps:number|null; scope:'essential'|'broad'|'unknown'; loadManagement:string|null;
 costs:Partial<Record<typeof COST_ITEMS[number],{amountUsd:number|null;status:'included'|'excluded'|'allowance'|'unknown';recurring:boolean}>>;
 exclusions:string[]; quotedTotalUsd:number|null; invoiceTotalUsd:number|null; missingScope:string[];
 verification:Verification; verifiedOn:string|null;
 privacy:{publicationConsent:boolean;redacted:boolean;duplicateChecked:boolean;documentFingerprint:string;retentionUntil:string;sourceType:'document';};
}
export interface EvidenceClaim {
 id:string; brand:string; models:string[]; family:string|null; affectedYears:string|null;
 level:1|2|3|4|5; label:string; claim:string; independentReportCount:number|null;
 sources:{url:string;label:string;independenceGroup:string}[]; firstChecked:string; lastChecked:string;
 confidence:'high'|'moderate'|'low'|'insufficient'; manufacturerAcknowledged:boolean|null;
 fix:string|null; installationRelated:boolean|null; limitations:string[];
}
export interface ServiceObservation {
 id:string;brand:string;modelId:string;metro:string;zipPrefix:string|null;radiusMiles:number;checkedOn:string;
 sourceUrl:string;locationId:string;authorized:boolean|null;installer:boolean|null;
 emergencyService:boolean|null;warrantyService:boolean|null;commissioning:boolean|null;limitations:string[];
}
export interface StudyProtocol {
 id:string;title:string;version:string;status:'planning'|'collecting'|'published';question:string;
 recruitment:string;inclusion:string[];exclusion:string[];deduplication:string;privacy:string;
 minimumSample:number;samplingLimitations:string[];publicationCriteria:string[];correctionsUrl:string;
}
export const QUOTE_RECORDS:QuoteRecord[]=[];
export const EVIDENCE_CLAIMS:EvidenceClaim[]=[];
export const SERVICE_OBSERVATIONS:ServiceObservation[]=[];
export const EVIDENCE_LEVELS = [
 ['Government recall / regulatory record','Applies only to the models, serial numbers and dates named in the official notice.'],
 ['Manufacturer-documented issue','Link the original bulletin, warranty or technical document and distinguish a limitation from a defect.'],
 ['Repeated owner-reported pattern','Count distinct reports and independent sources after deduplication. This is not a failure rate or a known defect.'],
 ['Service professional observation','Document identity, relevant scope, commercial interests and whether the observation is independently corroborated.'],
 ['Single unverified report','A lead for investigation, not a general claim about the model or brand.'],
] as const;
export const STUDY_TOPICS=['Standby Generator Quote Study','Generator Ownership Cost Study','Year-3 Reliability Survey','Generator Warranty Experience Study','Installation Scope Study','Maintenance Spend Study','Outage Experience Study'];
