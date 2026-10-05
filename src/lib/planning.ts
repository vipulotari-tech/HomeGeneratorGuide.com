export function numberIn(value: unknown, label: string, min=0, max=1e8): number {
  if ((typeof value === 'string' && value.trim() === '') || value === null || value === undefined) throw new Error(`${label}: enter a value (use 0 where none applies).`);
  const n=Number(value); if (!Number.isFinite(n)||n<min||n>max) throw new Error(`${label}: enter a number from ${min} to ${max}.`); return n;
}
export interface Load { name:string; running:number; starting:number; quantity:number; essential:boolean; managed:boolean; priority:number; }
export function sizeScenario(loads:Load[], reservePercent:number) {
  const reserve=numberIn(reservePercent,'Planning margin',0,50);
  const checked=loads.map(l=>{
    const running=numberIn(l.running,'Running watts',0,100000); const starting=numberIn(l.starting,'Total starting watts',0,500000);
    const quantity=numberIn(l.quantity,'Quantity',1,100);
    if (!Number.isInteger(quantity)) throw new Error('Quantity must be a whole number.');
    if(starting<running) throw new Error(`${l.name}: total starting watts must be at least running watts. Use the same value for a load with no extra startup requirement.`);
    return {...l,running,starting,quantity};
  });
  const sum=(ls:Load[])=>ls.reduce((s,l)=>s+l.running*l.quantity,0);
  // For quantity > 1, conservatively assume identical units can start together.
  const extra=(ls:Load[])=>Math.max(0,...ls.map(l=>(l.starting-l.running)*l.quantity));
  const running=sum(checked), surge=extra(checked), planning=running+surge;
  const essential=checked.filter(l=>l.essential), unmanaged=checked.filter(l=>!l.managed), managed=checked.filter(l=>l.managed);
  // This illustrative scenario permits ONE managed load row at a time, not every managed row.
  const managedPeak=Math.max(sum(unmanaged)+extra(unmanaged),...managed.map(l=>sum(unmanaged)+l.running*l.quantity+Math.max(extra(unmanaged),(l.starting-l.running)*l.quantity)));
  const low=Math.ceil(planning/1000), high=Math.ceil(planning*(1+reserve/100)/1000);
  return {running,surge,planning,low,high,managedPeak,essentialPeak:sum(essential)+extra(essential),contributors:[...checked].sort((a,b)=>b.running*b.quantity-a.running*a.quantity)};
}
export interface FuelInput { ngRate:number; lpRate:number; ngPrice:number; lpPrice:number; btuPerCf:number; annualHours:number; eventHours:number; tank:number; fillPercent:number; reservePercent:number; maintenance:number; }
export function fuelScenario(i:FuelInput) {
  for (const [key,value] of Object.entries(i)) numberIn(value,key,0,1e8);
  if(i.lpRate<=0||i.ngRate<=0||i.btuPerCf<=0||i.tank<=0) throw new Error('Consumption, heat content and tank capacity must be positive.');
  if(i.annualHours>8760||i.eventHours>8760||i.fillPercent>80||i.reservePercent>79) throw new Error('Hours or tank percentages exceed planning bounds.');
  const ngPerHour=i.ngRate*i.btuPerCf/100000*i.ngPrice, lpPerHour=i.lpRate*i.lpPrice;
  if(i.fillPercent<=i.reservePercent) throw new Error('Tank starting fill must be greater than the reserve level.');
  const usable=i.tank*(i.fillPercent-i.reservePercent)/100;
  return {ngPerHour,lpPerHour,ngEvent:ngPerHour*i.eventHours,lpEvent:lpPerHour*i.eventHours,ngAnnual:ngPerHour*i.annualHours,lpAnnual:lpPerHour*i.annualHours,runtime:usable/i.lpRate,usable,years:[5,10].map(years=>({years,ng:(ngPerHour*i.annualHours+i.maintenance)*years,lp:(lpPerHour*i.annualHours+i.maintenance)*years}))};
}
export interface OwnershipInput { equipment:number; installation:number; permits:number; ats:number; fuelSystem:number; maintenance:number; monitoring:number; battery:number; batteryInterval:number; consumables:number; warranty:number; repairs:number; annualHours:number; fuelRate:number; fuelPrice:number; }
export function ownershipScenario(i:OwnershipInput) {
  for (const [key,value] of Object.entries(i)) numberIn(value,key,0,1e8);
  if(i.batteryInterval<1||i.batteryInterval>30||!Number.isInteger(i.batteryInterval)||i.annualHours>8760) throw new Error('Enter a whole-year battery interval from 1 to 30 and no more than 8,760 annual hours.');
  const capital=i.equipment+i.installation+i.permits+i.ats+i.fuelSystem+i.warranty;
  return [5,10,15].map(years=>{
    const maintenance=i.maintenance*years, monitoring=i.monitoring*years, consumables=i.consumables*years;
    const battery=Math.floor(years/i.batteryInterval)*i.battery, repairs=i.repairs*years, fuel=i.annualHours*i.fuelRate*i.fuelPrice*years;
    const total=capital+maintenance+monitoring+consumables+battery+repairs+fuel;
    return {years,capital,maintenance,monitoring,consumables,battery,repairs,fuel,total,annualized:total/years};
  });
}
export function normalizeQuote(total:number|null, items:{status:string; adjustment:number|null}[]) {
  if(total!==null) numberIn(total,'Quote total');
  for(const item of items){if(!['unknown','included','excluded','allowance','na'].includes(item.status)) throw new Error('Unknown scope status.');if(item.adjustment!==null)numberIn(item.adjustment,'Adjustment');}
  const unresolved=items.filter(i=>i.status==='unknown'||i.status==='excluded'&&i.adjustment===null||i.status==='allowance'&&i.adjustment===null).length;
  const adjustment=items.reduce((s,i)=>s+(i.status==='excluded'||i.status==='allowance' ? i.adjustment??0:0),0);
  return {total:total===null?null:total+adjustment,adjustment,unresolved,comparable:total!==null&&unresolved===0};
}
