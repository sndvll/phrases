/* Entry point: wires the DOM to the modules and boots the app. */
import { state, $, persistAll } from './state.js';
import { build, refresh } from './render.js';
import { applyUi, openLang, closeLang, openInfo, closeInfo, isLangOpen, isInfoOpen } from './ui.js';
import { initGestures, toggleSelect, exitSelect, showSelected, closeBig, isBigOpen, isSelecting } from './show.js';

/* ---------- header ---------- */
$('btn-select').addEventListener('click', toggleSelect);
$('btn-lang').addEventListener('click', openLang);
$('btn-info').addEventListener('click', openInfo);

document.querySelectorAll('.pol button').forEach((btn) => {
  btn.addEventListener('click', () => {
    state.pol = btn.dataset.pol;
    persistAll();
    document.querySelectorAll('.pol button').forEach((b) =>
      b.setAttribute('aria-pressed', String(b === btn))
    );
    refresh();
  });
});

/* ---------- sheets ---------- */
$('lang-sheet').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeLang();
});
$('btn-lang-close').addEventListener('click', closeLang);

$('info-sheet').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeInfo();
});
$('btn-info-close').addEventListener('click', closeInfo);

/* ---------- select bar ---------- */
$('btn-cancel-select').addEventListener('click', exitSelect);
$('btn-show-selected').addEventListener('click', showSelected);

/* ---------- fullscreen ---------- */
$('big').addEventListener('click', closeBig);

/* ---------- keyboard ---------- */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (isBigOpen()) return closeBig();
  if (isInfoOpen()) return closeInfo();
  if (isLangOpen()) return closeLang();
  if (isSelecting()) return exitSelect();
});

/* ---------- status bar (iOS standalone) ---------- */
const statusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

function syncStatusBar() {
  if (statusBarMeta) {
    statusBarMeta.setAttribute('content', darkQuery.matches ? 'black-translucent' : 'default');
  }
}
syncStatusBar();
if (darkQuery.addEventListener) darkQuery.addEventListener('change', syncStatusBar);

/* ---------- boot ---------- */
persistAll(); // migrate anything stored under the old `thai.*` keys
applyUi();
build();
refresh();
initGestures();

document.querySelectorAll('.pol button').forEach((b) =>
  b.setAttribute('aria-pressed', String(b.dataset.pol === state.pol))
);
$('select-count').textContent = '0';
$('btn-show-selected').disabled = true;

/* ---------- offline ---------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js', { updateViaCache: 'none' })
      .then((reg) => reg.update().catch(() => {}))
      .catch(() => {});
  });
}
