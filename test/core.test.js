import test from 'node:test';
import assert from 'node:assert/strict';
import {demoPlayers,demoCourse} from '../src/data.js';
import {holeNet,holeResult,standings} from '../src/scoring.js';
import {calculateBets,settle} from '../src/betting.js';
import {parseVoice} from '../src/voice.js';

const round=()=>({course:structuredClone(demoCourse),holes:18,playerIds:demoPlayers.map(p=>p.id),playerSnapshots:structuredClone(demoPlayers),handicapMode:'official',customStrokes:{},scores:{},completedHoles:[],status:'active',bets:{hole:100,front:500,back:0,medal:0,birdie:50,sandy:50,medalMode:'net'}});
test('voice parses multiple names and golf terms',()=>{const out=parseVoice('Sir Dodong made birdie, Attorney Santos five, Jun double bogey, Mark four',demoPlayers,4);assert.deepEqual(out.entries.map(x=>x.score),[3,5,6,4]);});
test('official handicap produces gross, net and winner',()=>{const r=round();r.scores[1]=Object.fromEntries(demoPlayers.map((p,i)=>[p.id,{score:4+i}]));r.completedHoles=[1];assert.equal(holeNet(r,demoPlayers[0],demoCourse.holes[0],r.scores[1].p1).score,3);assert.equal(holeResult(r,1).winners[0].player.id,'p1');assert.equal(standings(r)[0].player.id,'p1');});
test('bet ledger balances and settlement minimizes simple debts',()=>{const r=round();r.scores[1]=Object.fromEntries(demoPlayers.map((p,i)=>[p.id,{score:4+i,sandy:i===0}]));r.completedHoles=[1];const result=calculateBets(r);assert.equal(Object.values(result.ledger).reduce((a,b)=>a+b,0),0);assert.ok(result.settlement.length);assert.deepEqual(settle({a:800,b:-500,c:-300}),[{from:'b',to:'a',amount:500},{from:'c',to:'a',amount:300}]);});
