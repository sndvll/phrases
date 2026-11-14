/* Fullscreen presentation, multi-select and the long-press gesture. */
import { $, hostData } from './state.js';
import { compose, phraseById } from './phrases.js';
import { carousel } from './render.js';

const selectionMode = { active: false, ids: new Set() };
const LONG_PRESS_MS = 450;

let pressTimer = 0;
let pressStart = null;
let lastLongPress = 0;
let longPressId = null;

let bigItems = [];
let bigIndex = 0;

/* ---------- fullscreen queue ---------- */
export function openBig(phrases) {
  bigItems = Array.isArray(phrases) ? phrases : [];
  if (!bigItems.length) return;

  const track = $('big-track');
  track.innerHTML = '';

  bigItems.forEach((phrase) => {
    const c = compose(phrase);
    const slide = document.createElement('div');
    slide.className = 'big-slide';
    slide.innerHTML =
      '<div class="script"></div><div class="latin"></div><div class="en"></div>';
    slide.querySelector('.script').textContent = c.script;

    const latin = slide.querySelector('.latin');
    latin.textContent = c.latin;
    latin.hidden = !c.latin;

    slide.querySelector('.en').textContent = c.guest;
    track.appendChild(slide);
  });

  bigIndex = 0;
  track.scrollLeft = 0;
  updateBigCounter();
  $('big').classList.add('open');

  // Must run while the overlay is laid out; the slides are invisible before.
  requestAnimationFrame(fitSlides);
}

/**
 * Keeps the phrase readable for the person across the table: shrink the type
 * until the (balanced) lines fit the height budget, instead of letting a long
 * phrase spill into a cramped extra line.
 */
function fitSlides() {
  const track = $('big-track');
  if (!track.clientWidth) return;

  [...track.children].forEach((slide) => {
    const script = slide.querySelector('.script');
    if (!script) return;

    script.style.fontSize = '';
    const availH = slide.clientHeight * 0.5;
    const availW = slide.clientWidth - 56;
    if (!availH || !availW) return;

    let lo = 20;
    let hi = Math.min(96, availW * 0.55);

    for (let i = 0; i < 10; i += 1) {
      const mid = (lo + hi) / 2;
      script.style.fontSize = mid + 'px';
      if (script.scrollHeight <= availH) lo = mid;
      else hi = mid;
    }

    script.style.fontSize = lo.toFixed(1) + 'px';
  });
}

window.addEventListener('resize', () => {
  if (isBigOpen()) requestAnimationFrame(fitSlides);
}, { passive: true });

export function closeBig() {
  $('big').classList.remove('open');
}

export function isBigOpen() {
  return $('big').classList.contains('open');
}

function updateBigCounter() {
  const counter = $('big-counter');
  if (bigItems.length > 1) {
    counter.textContent = (bigIndex + 1) + ' / ' + bigItems.length;
    counter.hidden = false;
  } else {
    counter.hidden = true;
  }
}

$('big-track').addEventListener('scroll', () => {
  const track = $('big-track');
  const i = Math.round(track.scrollLeft / track.clientWidth);
  if (i !== bigIndex) {
    bigIndex = i;
    updateBigCounter();
  }
}, { passive: true });

/* ---------- multi-select ---------- */
export function enterSelect() {
  if (selectionMode.active) return;
  selectionMode.active = true;
  document.body.classList.add('selecting');
  renderSelection();
}

export function toggleSelect() {
  if (selectionMode.active) exitSelect();
  else enterSelect();
}

export function exitSelect() {
  selectionMode.active = false;
  selectionMode.ids.clear();
  document.body.classList.remove('selecting');
  document.querySelectorAll('.card.selected').forEach((c) => c.classList.remove('selected'));
  renderSelection();
}

export function isSelecting() {
  return selectionMode.active;
}

function selectPhrase(phrase, card) {
  selectionMode.ids.add(phrase.id);
  if (card) card.classList.add('selected');
  renderSelection();
}

function selectedPhrases() {
  return (hostData().phrases || []).filter((p) => selectionMode.ids.has(p.id));
}

function renderSelection() {
  const n = selectionMode.ids.size;
  $('select-bar').classList.toggle('open', selectionMode.active);
  $('select-count').textContent = String(n);
  $('btn-show-selected').disabled = n === 0;
}

export function showSelected() {
  const list = selectedPhrases();
  if (!list.length) return;
  openBig(list);
}

export function onCardClick(phrase, card) {
  if (!phrase) return;

  // The click the browser fires right after a long press must not toggle the
  // same card off again. Taps on *other* cards stay unaffected.
  if (Date.now() - lastLongPress < 700 && card.dataset.id === longPressId) return;

  if (!selectionMode.active) return openBig([phrase]);

  if (selectionMode.ids.has(phrase.id)) selectionMode.ids.delete(phrase.id);
  else selectionMode.ids.add(phrase.id);
  card.classList.toggle('selected', selectionMode.ids.has(phrase.id));
  renderSelection();
}

/* ---------- gestures ---------- */
function startLongPress(e) {
  if (selectionMode.active) return;
  const card = e.target.closest('.card');
  if (!card) return;

  pressStart = { x: e.clientX, y: e.clientY };
  clearTimeout(pressTimer);
  pressTimer = setTimeout(() => {
    pressTimer = 0;
    lastLongPress = Date.now();
    longPressId = card.dataset.id;
    if (navigator.vibrate) navigator.vibrate(12);
    enterSelect();
    const phrase = phraseById(card.dataset.id);
    if (phrase) selectPhrase(phrase, card);
  }, LONG_PRESS_MS);
}

function cancelLongPress() {
  if (!pressTimer) return;
  clearTimeout(pressTimer);
  pressTimer = 0;
}

/** Wires the carousel gestures; called once from app.js. */
export function initGestures() {
  carousel.addEventListener('pointerdown', startLongPress);
  carousel.addEventListener('pointerup', cancelLongPress);
  carousel.addEventListener('pointercancel', cancelLongPress);
  carousel.addEventListener('pointerleave', cancelLongPress);
  carousel.addEventListener('pointermove', (e) => {
    if (!pressStart) return;
    if (Math.abs(e.clientX - pressStart.x) > 8 || Math.abs(e.clientY - pressStart.y) > 8) {
      cancelLongPress();
    }
  }, { passive: true });
  carousel.addEventListener('scroll', cancelLongPress, { passive: true });

  // One delegated click handler instead of a closure per card.
  carousel.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    onCardClick(phraseById(card.dataset.id), card);
  });
}
