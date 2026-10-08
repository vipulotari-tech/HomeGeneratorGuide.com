/** Review records are empty until a documented, page-specific professional review exists. */
export type FactType = 'manufacturer' | 'government' | 'code' | 'industry' | 'interpretation' | 'estimate' | 'unknown';
export const FACT_LABELS: Record<FactType,string> = {
  manufacturer: 'Manufacturer-published fact', government: 'Government / safety guidance',
  code: 'Code / regulatory requirement', industry: 'Industry guidance', interpretation: 'Editorial interpretation',
  estimate: 'Planning estimate', unknown: 'Unknown / unverified',
};
export interface Reviewer {
  id: string; fullName: string; credential: string; state: string; licenseNumber?: string;
  profession: string; licenseType: string; licensePublicationConsent: boolean; headshotUrl?: string; compensationDisclosure: string; conflictsOfInterest: string[];
  credentialVerificationUrl: string; specialty: string; affiliations: string[];
}
export interface ProfessionalReview {
  reviewerId: string; reviewScope: string; reviewDate: string; reviewedPages: string[];
  reviewedCommit: string; evidenceUrl: string; limitations: string[]; status:'current'|'superseded'|'withdrawn';
}
export const REVIEWERS: Reviewer[] = [];
export const PROFESSIONAL_REVIEWS: ProfessionalReview[] = [];
export const reviewForPage = (path: string) => PROFESSIONAL_REVIEWS.find(r => r.status==='current' && r.reviewedPages.includes(path));
export const EDITORIAL_STATUSES = ['Research reviewed','Manufacturer source verified','Technical professional review pending','Technical professional reviewed','Safety-sensitive content','Pricing estimate','Model-specific specification'] as const;
