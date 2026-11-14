/* ------------------------------------------------------------------------
   GUEST LANGUAGE — your own language: UI strings and phrase meanings.
   To add a language, copy this file, change `name`, `ui` and `phrases`,
   then add a <script> tag for it in index.html.
   Missing phrase keys fall back to Swedish.
   ------------------------------------------------------------------------ */
window.LOCALES = window.LOCALES || {};

window.LOCALES.sv = {
  code: 'sv',
  name: 'Svenska',

  ui: {
    subtitle: 'fraslista',
    tabs: {
      greet: 'Hälsningar',
      food: 'Mat & nota',
      spice: 'Smak & specialkost',
      night: 'Uteliv',
    },
    male: 'Man',
    female: 'Kvinna',
    egg: 'Ägg',
    eggOn: 'Okej',
    eggOff: 'Inte okej',
    close: 'Stäng',
    tapToClose: 'tryck för att stänga',
    select: 'Markera fraser',
    selected: 'valda',
    showSelected: 'Visa',
    cancel: 'Avbryt',
    language: 'Språk',
    guestLabel: 'Ditt språk',
    hostLabel: 'Resmålsspråk',
  },

  egg: {
    on: ' (ägg går bra)',
    off: ' (utan ägg)',
  },

  phrases: {
    hello: 'God dag / Hej',
    morning: 'God morgon',
    evening: 'God kväll',
    thanks: 'Tack så mycket',
    excuse: 'Ursäkta',
    welcome: 'Ingen orsak',
    goodluck: 'Lycka till / ha det bra',
    howareyou: 'Hur mår du?',
    imfine: 'Jag mår bra',
    dontunderstand: 'Jag förstår inte',
    speakenglish: 'Talar du engelska?',
    isright: 'Det stämmer (ja)',
    iswrong: 'Det stämmer inte (nej)',

    order: 'Jag vill beställa',
    bill: 'Notan, tack',
    howmuch: 'Hur mycket kostar det?',
    water: 'Vatten, tack',
    morerice: 'Mer ris, tack',
    beer: 'En öl, tack',
    noice: 'Ingen is',
    takeaway: 'Ta med (take away)',
    delicious: 'Gott!',
    imfull: 'Jag är mätt',

    notspicy: 'Inte starkt',
    littlespicy: 'Lagom starkt',
    spicy: 'Starkt',
    veryspicy: 'Mycket starkt',
    vegetarian: 'Vegetariskt',
    vegan: 'Veganskt (jeh)',
    nofishsauce: 'Ingen fisksås',
    nomeat: 'Inget kött',
    nopork: 'Ingen fläsk',
    nomsg: 'Ingen MSG',
    peanutallergy: 'Jordnötsallergi',

    cheers: 'Skål!',
    onemore: 'En öl till, tack',
    glasswater: 'Ett glas vatten',
    recommend: 'Vad rekommenderar du?',
    noalcohol: 'Jag dricker inte alkohol',
    toilet: 'Var är toaletten?',
    separatebill: 'Separata notor',
    paycard: 'Kan jag betala med kort?',
    closing: 'När stänger ni?',
    goinghome: 'Jag går hem nu',

    justlooking: 'Jag bara tittar',
    nothanks: 'Nej tack',
    justdrinking: 'Jag sitter bara och dricker',
    havepartner: 'Jag har partner',
    justchat: 'Jag vill bara prata',
    buydrink: 'Kan jag bjuda på en drink?',
    yourname: 'Vad heter du?',
    barfine: 'Vad kostar bar fine?',
  },
};
