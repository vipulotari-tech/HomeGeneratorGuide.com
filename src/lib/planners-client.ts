import {numberIn,sizeScenario,fuelScenario,ownershipScenario,normalizeQuote,type Load,type FuelInput,type OwnershipInput} from './planning';
import {QUOTE_IDENTITY,QUOTE_SCOPE} from '../data/quote-fields';
import {LOAD_KEYS,parseSavedPlan} from './planner-storage';
const form=document.querySelector<HTMLFormElement>('.planner-form');
const money=(n:number)=>n.toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
const kw=(n:number)=>(n/1000).toLocaleString('en-US',{maximumFractionDigits:1})+' kW';
function el(tag:string,text?:string){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;}
function table(parent:Element,headers:string[],rows:(string|number)[][],caption:string){
 const wrap=el('div');wrap.className='result-table-wrap';const t=el('table');t.className='results-table';t.append(el('caption',caption));
 const head=el('thead'),tr=el('tr');headers.forEach(h=>{const th=el('th',h);th.setAttribute('scope','col');tr.append(th);});head.append(tr);t.append(head);
 const body=el('tbody');rows.forEach(row=>{const tr=el('tr');row.forEach((v,i)=>{const td=el(i===0?'th':'td',String(v));if(i===0)td.setAttribute('scope','row');td.setAttribute('data-label',headers[i]);tr.append(td);});body.append(tr);});t.append(body);wrap.append(t);parent.append(wrap);
}
function message(parent:Element,text:string){parent.append(el('p',text));}
function inputRecord(parent:Element){
 const details=el('details');details.className='input-record';details.append(el('summary','Inputs used in this estimate'));
 const controls=[...form!.querySelectorAll<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>('[name]')];
 table(details,['Input','Entered value'],controls.map(control=>{
  const label=[...(control.closest('label')?.childNodes??[])].filter(n=>n.nodeType===Node.TEXT_NODE).map(n=>n.textContent).join('').trim()||control.name;
  return [label,control instanceof HTMLSelectElement?control.selectedOptions[0]?.textContent??control.value:control.value||'Not supplied'];
 }),'Your entered assumptions');parent.append(details);
}
function val(name:string){return (form!.elements.namedItem(name) as HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement)?.value??'';}
function num(name:string,min=0,max=1e8){return numberIn(val(name),name.replace(/([A-Z])/g,' $1'),min,max);}
function result(id:string){const target=document.getElementById(id)!;target.replaceChildren();return target;}
function loads():Load[]{return [...document.querySelectorAll<HTMLElement>('.load-row')].map(row=>{
 const get=(key:string)=>(row.querySelector(`[data-key="${key}"]`) as HTMLInputElement).value;
 return {name:get('name'),running:numberIn(get('running'),'Running watts',0,100000),starting:numberIn(get('starting'),'Starting watts',0,500000),quantity:numberIn(get('quantity'),'Quantity',1,100),priority:numberIn(get('priority'),'Priority',1,10),essential:get('essential')==='true',managed:get('managed')==='true'};
});}
function labelLoads(){document.querySelectorAll<HTMLElement>('.load-row').forEach((row,i)=>{row.querySelector('legend')!.textContent=`Backup load ${i+1}`;const name=(row.querySelector('[data-key="name"]') as HTMLInputElement).value.trim()||`load ${i+1}`;row.querySelector('button')!.setAttribute('aria-label',`Remove ${name}`);});}
function addLoad(name:string,data?:Record<string,string>,focus=false){
 const rows=document.getElementById('load-rows')!; if(rows.children.length>=40) throw new Error('Limit 40 load rows. Group identical units with quantity.');
 const template=document.getElementById('load-template') as HTMLTemplateElement;const row=template.content.firstElementChild!.cloneNode(true) as HTMLElement;
 row.querySelector('legend')!.textContent='Backup load';(row.querySelector('[data-key="name"]') as HTMLInputElement).value=name;
 if(data)LOAD_KEYS.forEach(k=>{(row.querySelector(`[data-key="${k}"]`) as HTMLInputElement).value=data[k];});
 row.querySelector('[data-key="name"]')!.addEventListener('input',labelLoads);
 row.querySelector('button')!.addEventListener('click',()=>{const next=(row.nextElementSibling??row.previousElementSibling)?.querySelector<HTMLInputElement>('[data-key="name"]');row.remove();labelLoads();invalidate();(next??document.getElementById('add-load'))?.focus();});rows.append(row);labelLoads();if(focus)row.querySelector<HTMLInputElement>('[data-key="name"]')!.focus();
}
function invalidate(){document.querySelectorAll('.planner-results').forEach(e=>{e.replaceChildren();const p=el('p','Inputs changed. Recalculate to update the result.');p.className='help';e.append(p);});}
const presets=JSON.parse(document.getElementById('fuel-data')?.textContent??'[]');
function applyPreset(setValues=true){const key=(document.getElementById('fuel-preset') as HTMLSelectElement)?.value;
 const p=presets.find((p:{key:string})=>p.key===key);const source=document.getElementById('fuel-source');if(!source)return;
 source.replaceChildren();if(!p){source.textContent='Custom rates require a source and test conditions below.';return;}
 if(setValues){(form!.elements.namedItem('ngRate') as HTMLInputElement).value=String(p.ng);(form!.elements.namedItem('lpRate') as HTMLInputElement).value=String(p.lp);(form!.elements.namedItem('size') as HTMLInputElement).value=String(p.kw.LP??p.kw['Natural gas']);}
 const a=el('a',`${p.brand} ${p.model} manufacturer source`);a.setAttribute('href',p.source);source.append(a,document.createTextNode(` · checked ${p.date} · ${p.load}% load; ${p.kw.LP??'unknown'} kW LP / ${p.kw['Natural gas']??'unknown'} kW NG. Changing size or rates creates a custom scenario.`));
}
let quotePrint:HTMLElement|null=null;
function calculate(){if(!form)return false;const error=form.querySelector('.form-error')!;error.textContent='';
 if(!form.reportValidity())return false;
 try {
 if(form.id==='load-form'){
  const ls=loads();if(!ls.length)throw new Error('Add at least one load and its equipment values.');
  const r=sizeScenario(ls,num('margin',0,50));if(r.running===0)throw new Error('Enter a positive running load.');const out=result('load-results');
  out.append(el('h2','Your load-planning scenarios'));
  table(out,['Scenario','Planning demand'],[['All loads — running',kw(r.running)],['Largest extra starting contribution',kw(r.surge)],['All loads + largest extra start',kw(r.planning)],['Essential loads + largest extra start',kw(r.essentialPeak)],['One managed row at a time',kw(r.managedPeak)]],'Demand under the stated assumptions');
  message(out,`Illustrative all-load discussion range: ${r.low}–${r.high} kW, rounded up to whole kW using your ${val('margin')}% margin. This is not a generator recommendation or a motor-start capability check.`);
  message(out,'Fuel warning: compare the selected fuel’s rated output, not the model’s headline kW. Starting capability and site derating still require manufacturer and installer assessment.');
  table(out,['Load','Quantity','Running W / unit','Total starting W / unit','Running contribution','Preference','Priority'],r.contributors.map(l=>[l.name,l.quantity,l.running,l.starting,kw(l.running*l.quantity),`${l.essential?'Essential':'Optional'} / ${l.managed?'Managed candidate':'Unmanaged'}`,l.priority]),'Loads contributing most to running demand');
  message(out,'Discuss managing the largest optional loads with the installer. Verify whether starting overlaps can occur and which loads can safely wait. No load is automatically declared safe to shed.');
 }else if(form.id==='fuel-form'){
  if(val('preset')===''&&!val('customSource').trim())throw new Error('Describe the source and test conditions for custom fuel rates.');
  const i:FuelInput={ngRate:num('ngRate',0.01,100000),lpRate:num('lpRate',0.01,1000),ngPrice:num('ngPrice',0,100),lpPrice:num('lpPrice',0,100),btuPerCf:num('btuPerCf',500,2000),annualHours:num('annualHours',0,8760),eventHours:num('eventHours',0,8760),tank:num('tank',1,10000),fillPercent:num('fillPercent',1,80),reservePercent:num('reservePercent',0,79),maintenance:num('maintenance',0,100000)};
  num('size',0.1,200);const r=fuelScenario(i),out=result('fuel-results');out.append(el('h2','Fuel & maintenance planning estimate'));
  table(out,['Budget item','Natural gas','Propane'],[['Fuel per operating hour',money(r.ngPerHour),money(r.lpPerHour)],[`${i.eventHours}-hour outage fuel`,money(r.ngEvent),money(r.lpEvent)],['Annual outage fuel',money(r.ngAnnual),money(r.lpAnnual)],...r.years.map(y=>[`${y.years} years: outage fuel + maintenance`,money(y.ng),money(y.lp)])],'Nominal fuel scenarios — no installation cost');
  message(out,`Stored-propane inventory: about ${Math.floor(r.runtime)} operating hours from ${Math.round(r.usable)} usable gallons at the entered constant rate. Not a guaranteed runtime. Refill reserve, weather and vaporization can limit operation sooner.`);
  message(out,`Scenario size: ${val('size')} kW. Source/conditions: ${document.getElementById('fuel-source')!.textContent} ${val('customSource')}`);
  message(out,`NG: ft³/hour × ${i.btuPerCf} BTU/ft³ ÷ 100,000 × $/therm. LP: gallons/hour × $/gallon. Annual hours and single-event hours are separate scenarios.`);
  inputRecord(out);
 }else if(form.id==='ownership-form'){
  const keys=['equipment','installation','permits','ats','fuelSystem','maintenance','monitoring','battery','batteryInterval','consumables','warranty','repairs','annualHours','fuelRate','fuelPrice'] as const;
  const i=Object.fromEntries(keys.map(k=>[k,num(k,k==='batteryInterval'?1:0,k==='annualHours'?8760:k==='batteryInterval'?30:1000000)])) as unknown as OwnershipInput;
  const r=ownershipScenario(i),out=result('ownership-results');out.append(el('h2','Your long-term ownership budget'));
  const fields=[['capital','Initial capital (incl. extended warranty)'],['maintenance','Maintenance'],['consumables','Additional consumables'],['battery','Battery replacements'],['fuel','Outage fuel'],['monitoring','Monitoring'],['repairs','Repair reserve'],['total','Total nominal cost'],['annualized','Annualized cost']] as const;
  table(out,['Budget component',...r.map(y=>`${y.years} years`)],fields.map(([key,label])=>[label,...r.map(y=>money(y[key]))]),'Nominal ownership budget — constant prices');
  message(out,`Fuel unit: ${val('fuelUnit')}. Battery replacement interval: ${i.batteryInterval} years. All values are your assumptions; zero entries omit that cost. Extended warranty is in initial capital, not counted again.`);
  inputRecord(out);
 }else if(form.id==='quote-form'){
  const out=result('quote-results');out.append(el('h2','Three-quote comparison'));
  const summaries=['A','B','C'].map(letter=>{
   const total=val(`${letter}-total`)===''?null:num(`${letter}-total`,0,1000000);
   const items=QUOTE_SCOPE.map(([key])=>({status:val(`${letter}-${key}-status`),adjustment:val(`${letter}-${key}-adjustment`)===''?null:num(`${letter}-${key}-adjustment`,0,1000000)}));
   const r=normalizeQuote(total,items);const missing=QUOTE_IDENTITY.filter(([key])=>key!=='notes'&&!val(`${letter}-${key}`).trim()).map(([,label])=>label);
   return {...r,total,letter,missing};
  });
  table(out,['Comparison','Quote A','Quote B','Quote C'],[
   ['Quoted total',...summaries.map(s=>s.total===null?'Not supplied':money(s.total))],
   ['Known incremental adjustments',...summaries.map(s=>money(s.adjustment))],
   ['Planning subtotal',...summaries.map(s=>s.total===null?'Not available':money(s.total+s.adjustment))],
   ['Unresolved scope lines',...summaries.map(s=>s.unresolved)],
   ['Status',...summaries.map(s=>s.comparable&&s.missing.length===0?'All fields recorded — confirm equivalence':'Incomplete — not a like-for-like price')]
  ],'Scope normalization — no automatic winner');
  summaries.forEach(s=>message(out,`Quote ${s.letter}: ${s.unresolved} unresolved scope lines. Missing equipment/terms: ${s.missing.length?s.missing.join(', '):'none blank; verify the content in writing'}.`));
  message(out,'A subtotal with open scope is incomplete. Even if every field is filled, different fuel ratings, ATS arrangements or backed-up loads may prevent a valid comparison.');
  table(out,['Equipment / terms','Quote A','Quote B','Quote C'],QUOTE_IDENTITY.map(([key,label])=>[label,...['A','B','C'].map(l=>val(`${l}-${key}`)||'Not specified')]),'Written proposal details');
  table(out,['Scope line','Quote A','Quote B','Quote C'],QUOTE_SCOPE.map(([key,label])=>[label,...['A','B','C'].map(l=>{const status=val(`${l}-${key}-status`),add=val(`${l}-${key}-adjustment`);return `${status}${(status==='excluded'||status==='allowance')?add===''?' — unpriced':` + ${money(Number(add))}`:''}`;})]),'Installation scope and known top-ups');
  quotePrint=out as HTMLElement;
 }
 return true;
 }catch(e){error.textContent=e instanceof Error?e.message:'Could not calculate. Check inputs.';(error as HTMLElement).focus();document.querySelectorAll('.planner-results').forEach(r=>r.replaceChildren());return false;}
}
if(form){
 form.querySelectorAll<HTMLButtonElement>('button').forEach(b=>b.disabled=false);
 document.querySelectorAll<HTMLButtonElement>('.planner-actions button').forEach(b=>b.disabled=false);
 const error=form.querySelector<HTMLElement>('.form-error')!;error.tabIndex=-1;
 // Native validation happens before submit. Reveal invalid controls before the browser focuses them.
 form.addEventListener('invalid',e=>{const control=e.target as HTMLInputElement;let details=control.closest('details');while(details){details.open=true;details=details.parentElement?.closest('details')??null;}error.textContent='Check the highlighted field: '+control.validationMessage;},true);
 form.addEventListener('submit',e=>{e.preventDefault();calculate();});form.addEventListener('input',invalidate);
 document.getElementById('add-load')?.addEventListener('click',()=>{try{addLoad((document.getElementById('load-type') as HTMLSelectElement).value,undefined,true);invalidate();}catch(e){error.textContent=e instanceof Error?e.message:String(e);error.focus();}});
 document.getElementById('fuel-preset')?.addEventListener('change',()=>{applyPreset();invalidate();});
 // Edited manufacturer rates must not retain the manufacturer-preset attribution.
 ['ngRate','lpRate','size'].forEach(key=>(form.elements.namedItem(key) as HTMLInputElement|null)?.addEventListener('input',()=>{(document.getElementById('fuel-preset') as HTMLSelectElement).value='';applyPreset();}));
 const status=document.getElementById('save-status')!;
 (form.elements.namedItem('fuelUnit') as HTMLSelectElement|null)?.addEventListener('change',()=>{
  for(const name of ['fuelRate','fuelPrice'])(form.elements.namedItem(name) as HTMLInputElement).value='';
  status.textContent='Fuel unit changed. Enter consumption and price in the new unit; values are not automatically converted.';invalidate();
 });
 document.getElementById('save-plan')?.addEventListener('click',()=>{try{
  const controls=Object.fromEntries([...form.querySelectorAll<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>('[name]')].map(e=>[e.name,e.value]));
  const rows=[...document.querySelectorAll('.load-row')].map(row=>Object.fromEntries([...row.querySelectorAll<HTMLInputElement>('[data-key]')].map(e=>[e.dataset.key,e.value])));
  localStorage.setItem(form.dataset.save!,JSON.stringify({version:2,controls,rows}));status.textContent='Saved in this browser. No data sent to HomeGeneratorGuide.';
 }catch{status.textContent='Browser storage is unavailable or full. Use Print / Save as PDF instead.';}});
 document.getElementById('load-plan')?.addEventListener('click',()=>{try{
  const raw=localStorage.getItem(form.dataset.save!);if(!raw){status.textContent='No saved plan in this browser.';return;}
  const controls=[...form.querySelectorAll<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>('[name]')];
  const saved=parseSavedPlan(raw,controls.map(c=>c.name),form.id==='load-form');
  // Legacy fuel saves used array positions, which cannot safely identify a model after a data update.
  if(form.id==='fuel-form'&&saved.version===1)saved.controls.preset='';
  for(const control of controls)if(control instanceof HTMLSelectElement&&control.name!=='preset'&&![...control.options].some(o=>o.value===saved.controls[control.name]))throw new Error();
  for(const control of controls)control.value=saved.controls[control.name];
  if(form.id==='load-form'){document.getElementById('load-rows')!.replaceChildren();saved.rows.forEach(r=>addLoad(r.name,r));}
  // Keep saved rates; selecting a preset afresh is required to reapply its data.
  if(form.id==='fuel-form'){const p=presets.find((p:{key:string})=>p.key===val('preset'));if(!p||Number(val('ngRate'))!==p.ng||Number(val('lpRate'))!==p.lp||Number(val('size'))!==(p.kw.LP??p.kw['Natural gas']))(document.getElementById('fuel-preset') as HTMLSelectElement).value='';applyPreset(false);}
  invalidate();status.textContent='Saved fields loaded. Recalculate to refresh results.';
 }catch{status.textContent='Saved data could not be read. Your current fields have been kept. You can delete the saved plan.';}});
 document.getElementById('clear-plan')?.addEventListener('click',()=>{try{localStorage.removeItem(form.dataset.save!);status.textContent='Saved plan deleted. Current fields remain.';}catch{status.textContent='Browser storage is unavailable.';}});
 document.getElementById('reset-plan')?.addEventListener('click',()=>{form.reset();document.getElementById('load-rows')?.replaceChildren();document.querySelectorAll('.planner-results').forEach(r=>r.replaceChildren());form.querySelector('.form-error')!.textContent='';applyPreset();status.textContent='Fields reset. Saved plan remains until deleted.';});
 document.getElementById('print-plan')?.addEventListener('click',()=>{if(calculate()){quotePrint?.setAttribute('data-print','true');window.print();}});
 // Browser printing and the print button both expand the complete input record, then restore it.
 let printDetails:HTMLDetailsElement[]=[];
 window.addEventListener('beforeprint',()=>{printDetails=[...document.querySelectorAll<HTMLDetailsElement>('.input-record:not([open])')];printDetails.forEach(d=>d.open=true);});
 window.addEventListener('afterprint',()=>{printDetails.forEach(d=>d.open=false);printDetails=[];});
}
