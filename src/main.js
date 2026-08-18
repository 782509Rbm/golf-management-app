
const icon = (name, size = 20) => {
  const paths = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10M9 20v-6h6v6"/>',
    flag: '<path d="M6 21V4m0 1c5-3 7 3 12 0v9c-5 3-7-3-12 0"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    chart: '<path d="M4 19V9m6 10V5m6 14v-7m6 7H2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1v.1h-4v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.6-1H3v-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.1h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.6 1h.1v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
    mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2m7 9v3m-4 0h8"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    more: '<circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/>',
    wallet: '<path d="M4 6h15a2 2 0 0 1 2 2v10H4a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h12v3M16 11h5v4h-5a2 2 0 0 1 0-4Z"/>',
    spark: '<path d="m12 3 1.2 4.1L17 9l-3.8 1.9L12 15l-1.2-4.1L7 9l3.8-1.9L12 3ZM5 15l.6 2.2L8 18.5l-2.4 1.3L5 22l-.6-2.2L2 18.5l2.4-1.3L5 15Z"/>',
    trend: '<path d="m3 17 6-6 4 4 8-9m-5 0h5v5"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>'
  };
  return `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
};

const players = [
  { name: 'Sir Dodong', initials: 'SD', color: '#d48c55', gross: 34, net: 31, thru: 8, toPar: -1, holes: 3, bet: 450, trend: [5,4,4,3,5,4,4,5] },
  { name: 'Attorney Santos', initials: 'AS', color: '#728fa1', gross: 36, net: 33, thru: 8, toPar: 1, holes: 2, bet: -150, trend: [4,5,4,4,5,5,4,5] },
  { name: 'Jun', initials: 'JN', color: '#9a7fb0', gross: 38, net: 34, thru: 8, toPar: 3, holes: 2, bet: 100, trend: [5,5,5,4,4,5,5,5] },
  { name: 'Mark', initials: 'MK', color: '#5e937f', gross: 39, net: 36, thru: 8, toPar: 4, holes: 1, bet: -400, trend: [5,4,6,5,4,5,5,5] }
];

const nav = [
  ['home','Overview'], ['flag','Live round'], ['users','Players'], ['chart','Analytics'], ['clock','History']
];

document.querySelector('#app').innerHTML = `
  <aside class="sidebar">
    <a class="brand" href="#"><span class="brand-mark">${icon('flag',25)}</span><span>Caddie</span></a>
    <nav>${nav.map(([i,l]) => `<button class="nav-item ${l === 'Live round' ? 'active' : ''}">${icon(i)}<span>${l}</span></button>`).join('')}</nav>
    <div class="side-bottom">
      <button class="nav-item">${icon('settings')}<span>Settings</span></button>
      <div class="profile"><div class="avatar small">JD</div><div><strong>Juan Dela Cruz</strong><span>Group admin</span></div><button>${icon('more')}</button></div>
    </div>
  </aside>
  <main>
    <header class="topbar">
      <div class="mobile-brand"><span class="brand-mark">${icon('flag',20)}</span><strong>Caddie</strong></div>
      <div class="round-status"><span class="live-dot"></span><strong>Round in progress</strong><span>•</span><span>Hole 9 of 18</span></div>
      <div class="top-actions"><button class="icon-btn" aria-label="Notifications">${icon('bell')}</button><button class="course-chip"><span class="course-thumb"></span><span><strong>Southwoods Golf Club</strong><small>Masters · Blue tees</small></span>${icon('chevron',16)}</button></div>
    </header>
    <section class="content">
      <div class="welcome-row"><div><p class="eyebrow">TUESDAY, AUGUST 18</p><h1>Good morning, Juan.</h1><p>You're playing the Masters course with your regular fourball.</p></div><button class="more-btn">${icon('more')}</button></div>
      <section class="hole-hero">
        <div class="hole-copy"><div class="hole-label">CURRENT HOLE</div><div class="hole-number">9</div><div class="hole-meta"><span>PAR <b>4</b></span><i></i><span>389 YDS</span><i></i><span>HCP <b>3</b></span></div></div>
        <div class="hole-art"><div class="fairway"><span class="pin">⚑</span><span class="tee-dot"></span></div></div>
        <div class="weather"><span>☀</span><div><strong>29°C</strong><small>Light breeze · 8 km/h</small></div></div>
      </section>
      <section class="voice-card">
        <div class="mic-wrap"><button id="micButton" class="mic-button" aria-label="Record score">${icon('mic',27)}</button><span class="pulse"></span></div>
        <div class="voice-text"><strong id="voiceTitle">Tap to record a score</strong><span id="voiceHint">Try “Sir Dodong made birdie” or “Mark five”</span></div>
        <div class="soundwave" aria-hidden="true">${[10,18,28,16,34,22,12,25,16,8].map(h=>`<i style="height:${h}px"></i>`).join('')}</div>
        <button id="manualScore" class="manual-btn">Enter manually</button>
      </section>
      <div class="grid">
        <section class="card leaderboard">
          <div class="card-head"><div><h2>Live leaderboard</h2><p>Net scores · Through Hole 8</p></div><button>${icon('more')}</button></div>
          <div class="table-head"><span>PLAYER</span><span>GROSS</span><span>NET</span><span>TO PAR</span><span>HOLES</span></div>
          ${players.map((p,i)=>`<div class="player-row"><span class="rank">${i+1}</span><span class="avatar" style="--avatar:${p.color}">${p.initials}</span><span class="player-name"><strong>${p.name}</strong><small>HCP ${i===2?'14':i===3?'12':'9'}</small></span><span>${p.gross}</span><span class="net">${p.net}</span><span class="topar ${p.toPar<0?'under':''}">${p.toPar>0?'+':''}${p.toPar}</span><span>${p.holes}</span></div>`).join('')}
          <button class="view-scorecard">View full scorecard ${icon('chevron',16)}</button>
        </section>
        <aside class="right-column">
          <section class="card hole-result"><div class="card-head"><div><h2>Last hole</h2><p>Hole 8 · Par 5</p></div><span class="winner-tag">WINNER</span></div><div class="winner"><div class="avatar" style="--avatar:#d48c55">SD</div><div><strong>Sir Dodong</strong><span>Birdie · Net 3</span></div><div class="winner-score">4</div></div><p class="result-note">${icon('spark',17)} Won the hole by 1 stroke after handicap.</p></section>
          <section class="card bets"><div class="card-head"><div><h2>Betting</h2><p>Running totals</p></div><span class="peso">₱100 / hole</span></div>${players.map(p=>`<div class="bet-row"><span><i style="background:${p.color}"></i>${p.name}</span><strong class="${p.bet>0?'positive':'negative'}">${p.bet>0?'+':''}₱${Math.abs(p.bet)}</strong></div>`).join('')}<button class="view-scorecard">View betting details ${icon('chevron',16)}</button></section>
        </aside>
      </div>
    </section>
  </main>
  <div class="mobile-nav">${nav.slice(0,4).map(([i,l])=>`<button class="${l==='Live round'?'active':''}">${icon(i,19)}<span>${l==='Live round'?'Round':l}</span></button>`).join('')}</div>
  <div id="modal" class="modal" aria-hidden="true"><div class="modal-card"><button class="modal-close">${icon('close')}</button><p class="eyebrow">HOLE 9</p><h2>Enter scores</h2><div class="score-inputs">${players.map(p=>`<label><span><i style="background:${p.color}"></i>${p.name}</span><div><button class="minus">−</button><input value="4" inputmode="numeric" aria-label="${p.name} score"><button class="plus">+</button></div></label>`).join('')}</div><button class="save-score">Save hole scores</button></div></div>
`;

const micButton = document.querySelector('#micButton');
micButton.addEventListener('click', () => {
  const listening = micButton.classList.toggle('listening');
  document.querySelector('#voiceTitle').textContent = listening ? 'Listening…' : 'Tap to record a score';
  document.querySelector('#voiceHint').textContent = listening ? 'Say a player name and score' : 'Try “Sir Dodong made birdie” or “Mark five”';
  document.querySelector('.soundwave').classList.toggle('moving', listening);
});

const modal = document.querySelector('#modal');
const setModal = open => { modal.classList.toggle('open', open); modal.setAttribute('aria-hidden', String(!open)); };
document.querySelector('#manualScore').addEventListener('click', () => setModal(true));
document.querySelector('.modal-close').addEventListener('click', () => setModal(false));
modal.addEventListener('click', e => { if (e.target === modal) setModal(false); });
document.querySelectorAll('.score-inputs label').forEach(label => {
  const input = label.querySelector('input');
  label.querySelector('.minus').onclick = () => input.value = Math.max(1, Number(input.value)-1);
  label.querySelector('.plus').onclick = () => input.value = Number(input.value)+1;
});
document.querySelector('.save-score').addEventListener('click', () => setModal(false));
