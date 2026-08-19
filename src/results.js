import {totals} from './scoring.js';

export function roundResult(round, mode=round.bets?.medalMode||'net'){
  const rows=round.playerSnapshots.map(player=>({player,...totals(round,player)}));
  const complete=rows.filter(row=>row.thru===round.holes);
  if(!complete.length)return null;
  const best=Math.min(...complete.map(row=>row[mode]));
  const winners=complete.filter(row=>row[mode]===best);
  const next=Math.min(...complete.filter(row=>row[mode]>best).map(row=>row[mode]));
  return {mode,winners,margin:Number.isFinite(next)?next-best:0,tied:winners.length>1,rows};
}

export function resultAnnouncement(round){
  const result=roundResult(round);
  if(!result)return '';
  const names=result.winners.map(row=>row.player.displayName).join(' and ');
  if(result.tied)return `We have a tie! ${names} finish level!`;
  const margin=result.margin||1;
  return `That's the ${result.mode} match! ${names} wins by ${margin} ${margin===1?'stroke':'strokes'}!`;
}

export function playerRoundSummary(round,playerId){
  const player=round.playerSnapshots.find(p=>p.id===playerId); if(!player)return null;
  const score=totals(round,player),result=roundResult(round);
  const won=result?.winners.some(row=>row.player.id===playerId);
  return {...score,status:won?(result.tied?'Tied':'Winner'):'Did not win'};
}
