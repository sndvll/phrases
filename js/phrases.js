/* Phrase data access and the one function that turns a phrase into text. */
import { state, hostData, loc, LOCALES } from './state.js';

export const phrasesOf = (catId) => (hostData().phrases || []).filter((p) => p.cat === catId);

export const phraseById = (id) => (hostData().phrases || []).find((p) => p.id === id);

/** Guest-language label for a phrase: guest -> Swedish -> host label -> id. */
export const labelOf = (p) => {
  const guest = loc().phrases || {};
  if (guest[p.id] != null) return guest[p.id];

  const sv = (LOCALES.sv && LOCALES.sv.phrases) || {};
  if (sv[p.id] != null) return sv[p.id];

  // Host-only concepts may carry their own label instead of being added to
  // every guest locale.
  return p.label || p.id;
};

/**
 * Single source of truth for rendered phrase text.
 *
 * `{p}` is the politeness particle, which only some languages have. An `egg`
 * phrase ships two complete sentences rather than a suffix, so each language
 * can phrase the variant the way it actually speaks.
 */
export const compose = (p) => {
  const parts = hostData().parts;
  const part = parts ? (state.pol === 'm' ? parts.m : (p.q ? parts.fq : parts.f)) : null;

  const scriptTpl = p.egg ? (state.eggOk ? p.egg.scriptOn : p.egg.scriptOff) : p.script;
  const latinTpl = p.egg ? (state.eggOk ? p.egg.latinOn : p.egg.latinOff) : p.latin;

  const script = scriptTpl.replace('{p}', part ? part.script : '').trim();
  const latin = latinTpl.replace('{p}', part ? part.latin : '').replace(/\s+/g, ' ').trim();

  const suffix = p.egg ? (state.eggOk ? loc().egg.on : loc().egg.off) : '';
  return { script, latin, guest: labelOf(p) + suffix };
};
