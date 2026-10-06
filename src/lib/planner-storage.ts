/** Validate the complete draft before changing any current fields. Blank drafts are valid. */
export const LOAD_KEYS = ['name','running','starting','quantity','priority','essential','managed'] as const;
export interface SavedPlan {version:1|2; controls:Record<string,string>; rows:Record<string,string>[]}
const record=(value:unknown):value is Record<string,unknown>=>value!==null&&typeof value==='object'&&!Array.isArray(value);
export function parseSavedPlan(raw:string,controlNames:string[],isLoadForm:boolean):SavedPlan {
 const saved:unknown=JSON.parse(raw);
 if(!record(saved)||(saved.version!==1&&saved.version!==2)||!record(saved.controls)||!Array.isArray(saved.rows)||saved.rows.length>40||(!isLoadForm&&saved.rows.length))throw new Error('Invalid saved plan.');
 const entries=Object.entries(saved.controls);
 if(entries.length!==controlNames.length||entries.some(([k,v])=>!controlNames.includes(k)||typeof v!=='string'||v.length>2000))throw new Error('Invalid saved controls.');
 for(const row of saved.rows){
  if(!record(row)||Object.keys(row).length!==LOAD_KEYS.length||LOAD_KEYS.some(k=>typeof row[k]!=='string'||(row[k] as string).length>100))throw new Error('Invalid saved load.');
  if(!['true','false'].includes(row.essential as string)||!['true','false'].includes(row.managed as string))throw new Error('Invalid load preference.');
 }
 return saved as unknown as SavedPlan;
}
