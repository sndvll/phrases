/* Carousel, tabs and phrase cards. `build()` creates the structure, `refresh()`
   only rewrites text — both go through applyCardText so they cannot drift. */
import { state, hostData, loc, $, save } from './state.js';
import { compose, labelOf, phrasesOf } from './phrases.js';

export const carousel = $('carousel');
export const tabs = $('tabs');
export const dots = $('dots');

let raf = 0;
let lastPage = -1;
let navTimer = 0;

/** Writes a phrase into an existing card. The only place card text is set. */
export function applyCardText(card, phrase) {
  const c = compose(phrase);
  card.querySelector('.label').textContent = labelOf(phrase);
  card.querySelector('.script').textContent = c.script;

  const latin = card.querySelector('.latin');
  latin.textContent = c.latin;
  latin.hidden = !c.latin;
}

/** Index of the remembered category, or 0 when this host does not have it. */
function rememberedIndex() {
  const i = hostData().categories.findIndex((c) => c.id === state.cat);
  return i >= 0 ? i : 0;
}

/** Paints tab, dot and accent state for a page index. */
function syncPage(i) {
  [...tabs.children].forEach((t, j) => t.setAttribute('aria-selected', String(j === i)));
  [...dots.children].forEach((d, j) => d.setAttribute('aria-current', String(j === i)));

  const cats = hostData().categories;
  document.documentElement.style.setProperty(
    '--accent',
    cats[i] ? 'var(--acc-' + cats[i].id + ', var(--acc-greet))' : 'var(--acc-greet)'
  );
}

export function build() {
  const ui = loc().ui;
  tabs.innerHTML = '';
  dots.innerHTML = '';
  carousel.innerHTML = '';
  lastPage = 0; // rebuilding resets the carousel to the first page

  hostData().categories.forEach((cat, i) => {
    const tabLabel = (ui.tabs && ui.tabs[cat.id]) || cat.id;

    const tab = document.createElement('button');
    tab.type = 'button';
    tab.role = 'tab';
    tab.textContent = tabLabel;
    tab.setAttribute('aria-selected', String(i === 0));
    tab.onclick = () => goTo(i);
    tabs.appendChild(tab);

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', tabLabel);
    dot.setAttribute('aria-current', String(i === 0));
    dot.onclick = () => goTo(i);
    dots.appendChild(dot);

    const page = document.createElement('section');
    page.className = 'page';
    page.style.setProperty('--accent', 'var(--acc-' + cat.id + ', var(--acc-greet))');
    page.dataset.index = i;

    // Only destinations whose kitchen distinguishes the variants get the switch.
    if (cat.id === 'spice' && phrasesOf(cat.id).some((p) => p.egg)) {
      const hints = hostData().hints || {};
      const row = document.createElement('div');
      row.className = 'mode-row';
      row.innerHTML =
        '<span class="mode-label"></span>' +
        '<div class="seg">' +
          '<button type="button" data-egg="1"><span></span><small>' + (hints.eggOn || '') + '</small></button>' +
          '<button type="button" data-egg="0"><span></span><small>' + (hints.eggOff || '') + '</small></button>' +
        '</div>';
      row.querySelector('.mode-label').textContent = ui.egg;
      row.querySelector('[data-egg="1"] span').textContent = ui.eggOn;
      row.querySelector('[data-egg="0"] span').textContent = ui.eggOff;
      row.querySelectorAll('button').forEach((b) => {
        b.onclick = () => setEgg(b.dataset.egg === '1');
      });
      page.appendChild(row);
    }

    phrasesOf(cat.id).forEach((phrase) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'card';
      card.dataset.id = phrase.id;
      card.innerHTML =
        '<span class="check"></span>' +
        '<div class="card-main">' +
          '<div class="card-top"><span class="label"></span><span class="script"></span></div>' +
          '<span class="latin"></span>' +
        '</div>';
      applyCardText(card, phrase);
      page.appendChild(card);
    });

    carousel.appendChild(page);
  });

  // Resume where the user was; the carousel must not animate on first paint.
  const start = rememberedIndex();
  lastPage = start;
  carousel.scrollLeft = start * carousel.clientWidth;
  syncPage(start);
  state.cat = hostData().categories[start] ? hostData().categories[start].id : null;
  requestAnimationFrame(revealActiveTab);
}

export function refresh() {
  hostData().categories.forEach((cat, i) => {
    const page = carousel.children[i];
    const list = phrasesOf(cat.id);
    [...page.querySelectorAll('.card')].forEach((card, j) => {
      if (list[j]) applyCardText(card, list[j]);
    });
  });

  [...carousel.querySelectorAll('.seg button')].forEach((b) =>
    b.setAttribute('aria-pressed', String((b.dataset.egg === '1') === state.eggOk))
  );
}

function setEgg(ok) {
  state.eggOk = ok;
  save('phrases.egg', ok ? '1' : '0');
  refresh();
}

/* ---------- navigation ---------- */
export function goTo(i) {
  carousel.scrollTo({ left: i * carousel.clientWidth, behavior: 'smooth' });
}

/** Scroll only as far as needed to bring the active tab fully into view. */
function revealActiveTab() {
  const active = tabs.querySelector('[aria-selected="true"]');
  if (!active || tabs.scrollWidth <= tabs.clientWidth) return;

  const navRect = tabs.getBoundingClientRect();
  const tabRect = active.getBoundingClientRect();
  const pad = 14;

  let delta = 0;
  if (tabRect.left < navRect.left + pad) delta = tabRect.left - navRect.left - pad;
  else if (tabRect.right > navRect.right - pad) delta = tabRect.right - navRect.right + pad;
  if (Math.abs(delta) < 1) return;

  tabs.scrollBy({ left: delta, behavior: 'smooth' });
}

/**
 * Runs on every scroll frame, but only touches the DOM when the page index
 * actually changes. Writing --accent on <html> invalidates styles for every
 * card, and moving the tab row mid-gesture fights the swipe.
 */
carousel.addEventListener('scroll', () => {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    const i = Math.round(carousel.scrollLeft / carousel.clientWidth);
    if (i === lastPage) return;
    lastPage = i;

    syncPage(i);

    const cat = hostData().categories[i];
    if (cat && state.cat !== cat.id) {
      state.cat = cat.id;
      save('phrases.cat', cat.id);
    }

    clearTimeout(navTimer);
    navTimer = setTimeout(revealActiveTab, 130);
  });
}, { passive: true });
