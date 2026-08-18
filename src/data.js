export const demoPlayers = [
  ['p1','Dodong Reyes','Sir Dodong','Sir Dodong',52,9,'#d48c55'],
  ['p2','Antonio Santos','Attorney Santos','Attorney Santos',47,11,'#728fa1'],
  ['p3','Jun Villanueva','Jun','Jun',43,14,'#9a7fb0'],
  ['p4','Mark Lim','Mark','Mark',39,12,'#5e937f']
].map(([id,fullName,displayName,nickname,age,handicap,color])=>({id,fullName,displayName,nickname,age,handicap,color,image:'',active:true}));

const pars=[4,4,3,5,4,4,5,3,4,4,5,4,3,4,5,3,4,4];
const indexes=[3,11,17,1,9,7,5,15,13,4,2,10,18,8,6,16,12,14];
export const demoCourse={id:'c1',name:'Southwoods Golf Club',location:'Carmona, Cavite',tee:'Blue',holeCount:18,holes:pars.map((par,i)=>({number:i+1,par,index:indexes[i]}))};

export const defaults={players:demoPlayers,courses:[demoCourse],history:[],activeRound:null,agreements:{},settings:{speech:true}};
export const uid=prefix=>`${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
