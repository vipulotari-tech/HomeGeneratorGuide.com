import assert from 'node:assert/strict';
import {readFileSync, existsSync, readdirSync} from 'node:fs';
import {join} from 'node:path';
const read=(p)=>readFileSync(join('dist',p,'index.html'),'utf8');
const home=read('');
for(const x of [
  'Three questions before you choose a generator',
  '/sizing/what-size-generator-do-i-need/',
  '/cost/standby-generator-cost/',
  '/comparisons/five-brand-standby-generator-comparison/',
  '/planning/quotes/',
]) assert(home.includes(x), 'Missing first-time-buyer fast path: '+x);
for(const brand of ['generac','kohler','champion','briggs-stratton','cummins']){
  const page=read('brands/'+brand);
  assert(page.includes('id="buyer-verdict"'),brand+' conditional verdict missing');
  assert(page.includes('Conditional editorial interpretation'),brand+' limitations missing');
  assert(page.includes('/research/local-service/'),brand+' service question missing');
}
const modelFiles=readdirSync('dist/models/',{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>x.name);
assert(modelFiles.length>=20,'Too few model pages to exercise shared verdict');
for(const slug of modelFiles){
  const f=join('dist','models',slug,'index.html');
  if(!existsSync(f))continue;
  const html=read('models/'+slug);
  assert(html.includes('id="purchase-checks"'),slug+' purchase checks missing');
  assert(html.includes('Do not buy yet if:'),slug+' professional verification missing');
}
const service=read('research/local-service');
for(const host of ['generac.com','rehlko.com','championpowerequipment.com','briggsandstratton.com','cummins.com']){
  assert(service.includes(host),'Missing official manufacturer locator: '+host);
}
const quote=read('cost/homeowner-quote-database');
assert(quote.includes('zero verified homeowner submissions'),'Must disclose no verified homeowner data');
assert(quote.includes('/templates/standby-quote-pilot-blank.csv'),'Missing private-use pilot worksheet');
const review=read('review-process');
assert(review.includes('No independent professional reviews completed'),'Missing independent-review limitation');
assert(existsSync('dist/templates/standby-quote-pilot-blank.csv'),'Missing blank template');
assert(!home.includes('Award-winning independent testing'),'Misleading authority claim');
console.log('Buyer journey and research readiness QA PASS: homepage, five brand verdicts, model guides, official service locators and zero-data disclosure.');
