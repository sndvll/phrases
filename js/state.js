/* ------------------------------------------------------------------------
   Persistent state and the two language axes.

     host  — the language of the country you are in (i18n/host.<code>.js)
     guest — your own language, used for the UI and phrase meanings
             (i18n/guest.<code>.js)

   The i18n files are classic scripts and run before this module.
   ------------------------------------------------------------------------ */
export const HOSTS = window.HOSTS || {};
export const LOCALES = window.LOCALES || {};

export const state = {
  host: localStorage.getItem('phrases.host') || 'th',
  guest: localStorage.getItem('thai.guest') === 'en' ? 'en' : 'sv',
  pol: localStorage.getItem('thai.pol') === 'f' ? 'f' : 'm',
  eggOk: localStorage.getItem('thai.egg') !== '0',
};

export const hostData = () => HOSTS[state.host] || HOSTS.th;
export const loc = () => LOCALES[state.guest] || LOCALES.sv;

export const $ = (id) => document.getElementById(id);

export const save = (key, value) => localStorage.setItem(key, value);
