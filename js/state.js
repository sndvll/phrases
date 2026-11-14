/* ------------------------------------------------------------------------
   Persistent state and the two language axes.

     host  — the language of the country you are in (i18n/host.<code>.js)
     guest — your own language, used for the UI and phrase meanings
             (i18n/guest.<code>.js)

   Every choice the user makes is persisted, so a reload resumes where they were.
   Keys were `thai.*` before the app became multi-destination; the legacy values
   are read as a fallback once and rewritten under the new prefix.
   ------------------------------------------------------------------------ */
export const HOSTS = window.HOSTS || {};
export const LOCALES = window.LOCALES || {};

const read = (key, legacy) => {
  const value = localStorage.getItem(key);
  return value !== null ? value : (legacy ? localStorage.getItem(legacy) : null);
};

export const state = {
  host: read('phrases.host') || 'th',
  guest: read('phrases.guest', 'thai.guest') === 'en' ? 'en' : 'sv',
  pol: read('phrases.pol', 'thai.pol') === 'f' ? 'f' : 'm',
  eggOk: read('phrases.egg', 'thai.egg') !== '0',
  cat: read('phrases.cat'), // active category id; may not exist for every host
};

export const hostData = () => HOSTS[state.host] || HOSTS.th;
export const loc = () => LOCALES[state.guest] || LOCALES.sv;

export const $ = (id) => document.getElementById(id);

export const save = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode / quota — the app still works, it just forgets */
  }
};

/** Writes the normalised state under the current keys (migrates `thai.*`). */
export const persistAll = () => {
  save('phrases.host', state.host);
  save('phrases.guest', state.guest);
  save('phrases.pol', state.pol);
  save('phrases.egg', state.eggOk ? '1' : '0');
  if (state.cat) save('phrases.cat', state.cat);
};
