import fs from 'node:fs';import assert from 'node:assert/strict';
const models=JSON.parse(fs.readFileSync('src/data/models.json','utf8'));
const ids=new Set(),slugs=new Set();let missing=0,conflicts=0;
for(const m of models){
 assert(!ids.has(m.modelId),'Duplicate model ID '+m.modelId);ids.add(m.modelId);assert(!slugs.has(m.slug),'Duplicate slug');slugs.add(m.slug);
 assert(m.sources.length>0&&m.productUrl.startsWith('https://'),'Missing sources '+m.modelId);
 for(const s of m.sources){assert(/^\d{4}-\d{2}-\d{2}$/.test(s.checkedOn));assert(s.checkedOn<=new Date().toISOString().slice(0,10),'Future check date');}
 for(const [field,url] of Object.entries(m.fieldSources??{})){assert(m[field],`Source mapped to absent ${m.modelId}.${field}`);assert(/^https:\/\//.test(url));}
 for(const [fuel,kw] of Object.entries(m.ratingsKw)){assert(['LP','Natural gas'].includes(fuel));assert(Number.isFinite(kw)&&kw>0&&kw<1000);assert(m.fieldSources.ratingsKw);}
 if(m.ats?.amps){assert(m.ats.amps>0);assert(m.fieldSources.ats);}
 const points=new Set();for(const f of m.fuelConsumption??[]){assert(f.amount>0&&Number.isFinite(f.amount));assert([25,50,75,100].includes(f.loadPercent));assert(['gal/hr','ft³/hr','BTU/hr'].includes(f.unit));const k=f.fuel+f.loadPercent+f.unit;assert(!points.has(k),'Conflicting duplicate fuel point');points.add(k);assert(m.fieldSources.fuelConsumption);}
 if(m.startingMsrpUsd!==undefined){assert(m.startingMsrpUsd>0);assert(m.startingMsrpNote);assert(m.fieldSources.startingMsrpUsd);}
 missing+=m.missingFields?.length??0;conflicts+=(m.evidenceNotes??[]).filter(n=>/conflict|inconsisten|ambiguous|mislabel/i.test(n)).length;
}
assert(models.length>=30);assert(new Set(models.map(m=>m.brand)).size===5);
for(const s of JSON.parse(fs.readFileSync('src/data/maintenance.json','utf8'))){assert(s.source.startsWith('https://'));assert(s.pages&&s.scope&&s.checkedOn);for(const row of s.rows)assert(row.length===2&&row.every(Boolean));}
console.log(`Evidence structure PASS: ${models.length} distinct configurations / 5 manufacturers; ${missing} explicit field gaps; ${conflicts} conflict notes. Structure checks do not certify source truth.`);
