/* pillars, articles and front-page lines are injected at build time from src/data/site.js and src/articles */
const {P, ITEMS, PROOF} = /*__DATA__*/null;
const BY = Object.fromEntries(ITEMS.map(i => [i.id, i]));
const esc = s => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* links are read out of the article text itself */
ITEMS.forEach(i => { i.out = [...new Set([...i.html.matchAll(/data-open="([^"]+)"/g)].map(m => m[1]))]; });
ITEMS.forEach(i => { i.back = ITEMS.filter(o => o.out.includes(i.id)).map(o => o.id); });
const joined = i => [...new Set([...i.out, ...i.back])];

/* pillar sections */
const indexEl = document.getElementById('index');
indexEl.innerHTML = Object.keys(P).map(key => {
  const p = P[key];
  const rows = ITEMS.filter(i => i.p === key).map((i, k) =>
    `<button class="row" data-open="${i.id}" data-id="${i.id}"><span class="rn">${p.n}.${k + 1}</span><span class="rt">${esc(i.title)} <span class="linkmark">↔ linked</span>${PROOF[i.id] ? `<span class="rp">${esc(PROOF[i.id])}</span>` : ''}</span></button>`).join('');
  return `<section class="group" id="${key}">
    <div class="wordbox"><h2 class="word"><span class="n">${p.n}</span>${p.name}</h2><p class="sub">${esc(p.lead)}</p></div>
    <div>${rows}</div>
  </section>`;
}).join('');

/* hovering an article shows the ones its text links to and from */
function trace(id){
  const near = id ? joined(BY[id]) : [];
  indexEl.querySelectorAll('.row').forEach(el => {
    el.classList.toggle('is-src', el.dataset.id === id);
    el.classList.toggle('is-linked', near.includes(el.dataset.id));
  });
  indexEl.classList.toggle('tracing', !!id);
}
indexEl.addEventListener('mouseover', e => { const el = e.target.closest('.row'); trace(el ? el.dataset.id : null); });
indexEl.addEventListener('mouseleave', () => trace(null));
indexEl.addEventListener('focusin', e => { const el = e.target.closest('.row'); if (el) trace(el.dataset.id); });
indexEl.addEventListener('focusout', () => trace(null));

/* stacked panes: the front page is pane 0; each open article is a pane to its right */
let stack = [];
const deck = document.getElementById('deck');
/* every open article has its own address: /articles/<slug>. A trail of panes is kept in ?trail= */
const NUM = {}, FROMNUM = {}, SLUG = {}, FROMSLUG = {};
Object.keys(P).forEach(key => ITEMS.filter(i => i.p === key).forEach((i, k) => { NUM[i.id] = P[key].n + '.' + (k + 1); FROMNUM[NUM[i.id]] = i.id; }));
ITEMS.forEach(i => { SLUG[i.id] = i.slug; FROMSLUG[i.slug] = i.id; });
const BASE_TITLE = 'Sahan Perera-Merry | Writer, Builder, Operator';
function addressFor(ids){
  if (!ids.length) return '/';
  const trail = ids.slice(0, -1).map(id => SLUG[id]);
  return '/articles/' + SLUG[ids[ids.length - 1]] + (trail.length ? '?trail=' + trail.join(',') : '');
}
function readAddress(){
  const m = location.pathname.match(/^\/articles\/([^\/]+)\/?$/);
  if (m){
    const id = FROMSLUG[decodeURIComponent(m[1])];
    if (!id) return null;
    const trail = (new URLSearchParams(location.search).get('trail') || '').split(',').filter(Boolean).map(s => FROMSLUG[s]);
    return trail.every(Boolean) ? trail.concat(id) : [id];
  }
  /* links shared from the earlier prototype looked like #02.1 */
  const raw = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
  if (raw){
    const ids = raw.split(/[+,\s]/).filter(Boolean).map(s => FROMNUM[s]);
    if (ids.length && ids.every(Boolean)) return ids;
  }
  return location.pathname === '/' ? [] : null;
}
function remember(push){
  document.title = stack.length ? BY[stack[stack.length - 1]].title + ' · Sahan Perera-Merry' : BASE_TITLE;
  const want = addressFor(stack);
  const numbered = /^#\d\d\.\d/.test(location.hash);
  if (want === location.pathname + location.search && !numbered) return;
  const keep = !stack.length && !numbered ? location.hash : '';   /* #writer and friends stay on the front page */
  try { history[push ? 'pushState' : 'replaceState'](null, '', want + keep); } catch (err) {}
}
function fromAddress(){
  const ids = readAddress();
  if (ids === null || ids.join() === stack.join()) return;
  stack = ids; render(false); remember(false);
  requestAnimationFrame(() => goTo(stack.length, false));
}
function outward(root){ root.querySelectorAll('a[href^="http"]').forEach(a => { a.target = '_blank'; a.rel = 'noopener'; }); }
const SPINE = 44;
const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function panes(){ return [...deck.children]; }
function settle(){
  const ps = panes();
  ps.forEach((p, i) => {
    const n = ps[i + 1];
    p.classList.toggle('collapsed', !!n && (n.getBoundingClientRect().left - p.getBoundingClientRect().left) < SPINE + 60);
  });
}
function goTo(pos, smooth){
  const ps = panes();
  let left = 0;
  for (let i = 0; i < pos; i++) left += ps[i].offsetWidth;
  const narrow = window.innerWidth <= 760;
  deck.scrollTo({left: Math.max(0, left - (narrow ? 0 : pos * SPINE)), behavior: smooth && !calm ? 'smooth' : 'auto'});
}
function render(added){
  panes().slice(1).forEach(p => p.remove());
  deck.classList.toggle('open', stack.length > 0);
  stack.forEach((id, idx) => {
    const i = BY[id], p = P[i.p], pos = idx + 1;
    const crumbs = `<button data-trunc="0">Front page</button><span aria-hidden="true">›</span>` + stack.slice(0, idx).map((cid, ci) =>
      `<button data-trunc="${ci + 1}">${esc(BY[cid].title)}</button><span aria-hidden="true">›</span>`).join('');
    const back = i.back.map(b => `<button data-open="${b}"><small>${P[BY[b].p].name}</small><span>${esc(BY[b].title)}</span></button>`).join('');
    const el = document.createElement('article');
    el.className = 'pane note' + (added && idx === stack.length - 1 ? ' new' : '');
    el.style.setProperty('--i', pos);
    el.dataset.pos = pos;
    el.setAttribute('aria-label', i.title);
    el.innerHTML = `<button class="spine" data-goto="${pos}">${esc(i.title)}</button>
      <div class="pane-body" tabindex="-1">
      <div class="pane-top"><span>${p.name}</span><button class="close" data-trunc="${idx}">Close ✕</button></div>
      <nav class="crumbs" aria-label="Trail">${crumbs}</nav>
      <h3>${esc(i.title)}</h3>
      ${i.note ? `<p class="draftnote">${esc(i.note)}</p>` : ''}
      <div class="art">${i.html}</div>
      ${i.ext ? `<a class="more" target="_blank" rel="noopener" href="${i.ext}">Read the full article →</a>` : ''}
      ${back ? `<div class="back"><h5>Linked to from</h5>${back}</div>` : ''}
      </div>`;
    el.querySelectorAll('a.il').forEach(a => {
      a.classList.toggle('is-open', stack[idx + 1] === a.dataset.open);
      a.href = addressFor(stack.slice(0, idx + 1).concat(a.dataset.open));   /* a real address, so it can be copied or opened in a new tab */
    });
    outward(el);
    deck.appendChild(el);
  });
  indexEl.querySelectorAll('.row').forEach(r => r.classList.toggle('is-open', stack.includes(r.dataset.id)));
  settle();
}
document.addEventListener('click', e => {
  const o = e.target.closest('[data-open]'), t = e.target.closest('[data-trunc]'), g = e.target.closest('[data-goto]');
  if (o){
    e.preventDefault();
    const id = o.dataset.open, from = +o.closest('.pane').dataset.pos, at = stack.indexOf(id);
    if (at >= 0 && at < from){ goTo(at + 1, true); return; }
    stack = stack.slice(0, from).concat(id);   /* a link replaces everything to its right */
    render(true); remember(true);
    goTo(stack.length, true);
    const body = deck.lastElementChild.querySelector('.pane-body');
    if (body) body.focus({preventScroll:true});
  } else if (t){
    const keep = +t.dataset.trunc;
    stack = stack.slice(0, keep); render(false); remember(true); goTo(keep, false);
  } else if (g){
    goTo(+g.dataset.goto, true);
  }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && stack.length){ stack = stack.slice(0, -1); render(false); remember(true); goTo(stack.length, false); } });
deck.addEventListener('scroll', settle, {passive:true});
window.addEventListener('resize', settle);
window.addEventListener('popstate', fromAddress);
window.addEventListener('hashchange', fromAddress);
outward(document);
fromAddress();
