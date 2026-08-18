import {defaults} from './data.js';
const KEY='caddie-mvp-v1';
export function load(){
  try { const saved=JSON.parse(localStorage.getItem(KEY)); return saved?{...structuredClone(defaults),...saved}:structuredClone(defaults); }
  catch { return structuredClone(defaults); }
}
export function save(state){localStorage.setItem(KEY,JSON.stringify(state));}
export function reset(){localStorage.removeItem(KEY);}
