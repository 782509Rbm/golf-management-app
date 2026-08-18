import {holeNet,holeResult,totals} from './scoring.js';
const pay=(ledger,winners,losers,amount)=>{winners.forEach(w=>losers.forEach(l=>{ledger[w]=(ledger[w]||0)+amount/winners.length;ledger[l]=(ledger[l]||0)-amount/winners.length;}));};
export function calculateBets(round){
 const ledger=Object.fromEntries(round.playerIds.map(id=>[id,0])), breakdown={hole:{},nine:{},birdie:{},sandy:{},medal:{}};
 for(let n=1;n<=round.holes;n++){const result=holeResult(round,n);if(!result)continue;const ids=result.winners.map(w=>w.player.id),losers=round.playerIds.filter(id=>!ids.includes(id));
  if(!result.tied&&round.bets.hole){pay(ledger,ids,losers,+round.bets.hole);breakdown.hole[n]=ids;}
  const hole=round.course.holes[n-1];round.playerSnapshots.forEach(p=>{const e=round.scores[n]?.[p.id];if(!e)return;if(e.score<hole.par&&round.bets.birdie)pay(ledger,[p.id],round.playerIds.filter(x=>x!==p.id),+round.bets.birdie);if(e.sandy&&e.score<=hole.par&&round.bets.sandy)pay(ledger,[p.id],round.playerIds.filter(x=>x!==p.id),+round.bets.sandy);});
 }
 [[1,9,'front'],[10,18,'back']].forEach(([start,end,key])=>{if(end>round.holes||!round.bets[key]||!round.completedHoles.includes(end))return;const sums=round.playerSnapshots.map(p=>({id:p.id,n:round.course.holes.slice(start-1,end).reduce((s,h)=>{const e=round.scores[h.number]?.[p.id];return s+(e?holeNet(round,p,h,e).score:0)},0)}));const low=Math.min(...sums.map(x=>x.n)),wins=sums.filter(x=>x.n===low).map(x=>x.id);if(wins.length===1)pay(ledger,wins,round.playerIds.filter(x=>!wins.includes(x)),+round.bets[key]);breakdown.nine[key]=wins;});
 if(round.status==='complete'&&round.bets.medal){const vals=round.playerSnapshots.map(p=>({id:p.id,n:totals(round,p)[round.bets.medalMode||'net']})),low=Math.min(...vals.map(x=>x.n)),wins=vals.filter(x=>x.n===low).map(x=>x.id);if(wins.length===1)pay(ledger,wins,round.playerIds.filter(x=>!wins.includes(x)),+round.bets.medal);breakdown.medal.winners=wins;}
 Object.keys(ledger).forEach(k=>ledger[k]=Math.round(ledger[k]));return {ledger,breakdown,settlement:settle(ledger)};
}
export function settle(ledger){const debtors=Object.entries(ledger).filter(([,v])=>v<0).map(([id,v])=>({id,n:-v})),creditors=Object.entries(ledger).filter(([,v])=>v>0).map(([id,v])=>({id,n:v})),out=[];let i=0,j=0;while(i<debtors.length&&j<creditors.length){const n=Math.min(debtors[i].n,creditors[j].n);if(n)out.push({from:debtors[i].id,to:creditors[j].id,amount:n});debtors[i].n-=n;creditors[j].n-=n;if(!debtors[i].n)i++;if(!creditors[j].n)j++;}return out;}
