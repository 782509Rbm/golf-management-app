export const strokesOnHole=(handicap,index)=>Math.floor(handicap/18)+(index<=handicap%18?1:0);
export function customAllowance(round,playerId,holeNumber){
  const values=Object.entries(round.customStrokes||{}).filter(([key])=>key.endsWith(`>${playerId}`)).map(([,v])=>+v||0);
  const perNine=Math.max(0,...values); if(!perNine)return 0;
  const rank=((holeNumber-1)%9)+1; return rank<=perNine?1:0;
}
export function holeNet(round,player,hole,entry){
  if(!entry?.score)return null;
  const strokes=round.handicapMode==='official'?strokesOnHole(+player.handicap,hole.index):customAllowance(round,player.id,hole.number);
  return {score:entry.score-strokes,strokes};
}
export function holeResult(round,holeNo){
  const hole=round.course.holes[holeNo-1], entries=round.scores[holeNo]||{};
  if(round.playerSnapshots.some(p=>!entries[p.id]?.score))return null;
  const results=round.playerSnapshots.map(p=>({player:p,gross:+entries[p.id].score,...holeNet(round,p,hole,entries[p.id])}));
  const low=Math.min(...results.map(r=>r.score)),winners=results.filter(r=>r.score===low);
  return {results,winners,tied:winners.length>1};
}
export function totals(round,player){
  let gross=0,net=0,par=0,thru=0;
  round.course.holes.slice(0,round.holes).forEach(h=>{const e=round.scores[h.number]?.[player.id];if(e?.score){gross+=+e.score;net+=holeNet(round,player,h,e).score;par+=h.par;thru++;}});
  return {gross,net,par,thru,toPar:net-par};
}
export function standings(round){return round.playerSnapshots.map(p=>({player:p,...totals(round,p)})).sort((a,b)=>(a.toPar-b.toPar)||(a.net-b.net));}
