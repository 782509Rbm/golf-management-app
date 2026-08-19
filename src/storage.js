import {defaults} from './data.js';
const KEY='caddie-mvp-v1';
export function load(){
  try { const saved=JSON.parse(localStorage.getItem(KEY)); if(!saved)return structuredClone(defaults);
    const state={...structuredClone(defaults),...saved};
    state.history=Array.isArray(state.history)?state.history:[];
    state.agreements=state.agreements&&typeof state.agreements==='object'?state.agreements:{};
    state.settings={...defaults.settings,...state.settings};
    return state;
  }
  catch { return structuredClone(defaults); }
}
export function save(state){localStorage.setItem(KEY,JSON.stringify(state));}
export function reset(){localStorage.removeItem(KEY);}
