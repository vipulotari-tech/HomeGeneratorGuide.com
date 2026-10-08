import type {QuoteRecord} from '../data/research.ts';
/** Editorial suppression floor, not a guarantee of representativeness. */
export const MINIMUM_COHORT = 20;
export function quoteSummary(records:QuoteRecord[], filter:{kind:'quote'|'invoice';state:string;fuel:'LP'|'Natural gas';from:string;to:string}) {
 const seen=new Set<string>(), fingerprints=new Set<string>();
 const rows=records.filter(r=>{
  const p=r.privacy;
  if(r.verification!=='verified'||!r.verifiedOn||!p.publicationConsent||!p.redacted||!p.duplicateChecked||!p.documentFingerprint||r.missingScope.length||r.kind!==filter.kind||r.state!==filter.state||r.fuel!==filter.fuel||r.date<filter.from||r.date>filter.to)return false;
  const amount=r.kind==='quote'?r.quotedTotalUsd:r.invoiceTotalUsd;
  if(amount===null||!Number.isFinite(amount)||amount<=0||seen.has(r.projectId)||fingerprints.has(p.documentFingerprint))return false;
  seen.add(r.projectId);fingerprints.add(p.documentFingerprint);return true;
 });
 const n=rows.length;
 if(n<MINIMUM_COHORT)return {status:'suppressed' as const,n,minimum:MINIMUM_COHORT};
 const values=rows.map(r=>(r.kind==='quote'?r.quotedTotalUsd:r.invoiceTotalUsd)!).sort((a,b)=>a-b);
 const q=(p:number)=>{const x=(n-1)*p,i=Math.floor(x);return values[i]+(values[Math.ceil(x)]-values[i])*(x-i);};
 return {status:'eligible-for-editorial-review' as const,n,median:q(.5),q1:q(.25),q3:q(.75),min:values[0],max:values[n-1],filter,configurationMix:rows.reduce<Record<string,number>>((a,r)=>{const key=`${r.modelId} / ${r.ratedKw??'unknown'} kW / ${r.scope}`;a[key]=(a[key]??0)+1;return a;},{})};
}
