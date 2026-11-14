/* Everything that is not the phrase list: header text, language sheet, info sheet. */
import { state, hostData, loc, $, HOSTS, LOCALES, save } from './state.js';
import { build, refresh } from './render.js';

export function applyUi() {
  const ui = loc().ui;

  document.querySelectorAll('[data-pol-label]').forEach((el) => {
    el.textContent = el.closest('[data-pol="m"]') ? ui.male : ui.female;
  });

  $('btn-show-selected').textContent = ui.showSelected;
  $('btn-lang-close').textContent = ui.close;
  $('btn-cancel-select').textContent = ui.cancel;
  $('select-count-label').textContent = ui.selected;
  $('big-hint').textContent = ui.tapToClose;
  $('btn-lang').setAttribute('aria-label', ui.language);
  $('btn-info').setAttribute('aria-label', ui.infoTitle);
  $('btn-info-close').textContent = ui.close;
  $('btn-select').setAttribute('aria-label', ui.select);
  $('lbl-guest-lang').textContent = ui.guestLabel;
  $('lbl-host-lang').textContent = ui.hostLabel;
  // The header names the destination, not the guest's word for "phrase list".
  $('host-name').textContent = hostData().native;
  $('host-label').textContent = '· ' + hostData().name;

  // Script font is per destination (Thai, CJK, Vietnamese latin …).
  document.documentElement.style.setProperty('--script-font', hostData().font || '');

  // Not every language has a gendered politeness particle.
  document.querySelector('.pol').style.display = hostData().parts ? '' : 'none';

  document.documentElement.lang = state.guest;
  document.title = ui.appName || 'Fraslista';

  buildGuestOptions();
  buildHostOptions();
}

/* ---------- language sheet ---------- */
function buildGuestOptions() {
  const box = $('guest-options');
  box.innerHTML = '';
  Object.values(LOCALES).forEach((locale) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-pressed', String(locale.code === state.guest));
    b.innerHTML = '<span></span><span class="tick">✓</span>';
    b.firstChild.textContent = locale.name;
    b.onclick = () => setGuest(locale.code);
    box.appendChild(b);
  });
}

function buildHostOptions() {
  const box = $('host-options');
  box.innerHTML = '';
  Object.values(HOSTS).forEach((host) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-pressed', String(host.code === state.host));
    b.innerHTML = '<span></span><span class="tick">✓</span>';
    b.firstChild.textContent = host.native + ' · ' + host.name;
    b.onclick = () => setHost(host.code);
    box.appendChild(b);
  });
}

export function setGuest(code) {
  state.guest = code;
  save('phrases.guest', code);
  applyUi();
  build();
  refresh();
}

export function setHost(code) {
  if (state.host === code) return closeLang();
  state.host = code;
  save('phrases.host', code);
  applyUi();
  build();
  refresh();
  closeLang();
}

export function openLang() { $('lang-sheet').classList.add('open'); }
export function closeLang() { $('lang-sheet').classList.remove('open'); }
export function isLangOpen() { return $('lang-sheet').classList.contains('open'); }

/* ---------- how it works ---------- */
export function openInfo() {
  const ui = loc().ui;
  $('info-title').textContent = ui.infoTitle;

  const list = $('info-list');
  list.innerHTML = '';
  (ui.info || []).forEach((item, i) => {
    const li = document.createElement('li');

    const num = document.createElement('span');
    num.className = 'num';
    num.textContent = String(i + 1);

    const text = document.createElement('span');
    const bold = document.createElement('b');
    bold.textContent = item.t + ' ';
    text.appendChild(bold);
    text.appendChild(document.createTextNode(item.b));

    li.appendChild(num);
    li.appendChild(text);
    list.appendChild(li);
  });

  $('info-sheet').classList.add('open');
}

export function closeInfo() { $('info-sheet').classList.remove('open'); }
export function isInfoOpen() { return $('info-sheet').classList.contains('open'); }
