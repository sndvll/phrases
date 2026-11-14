# AGENTS.md — Fraslista

> **Rotkontext:** [`../../AGENTS.md`](../../AGENTS.md) — infrastruktur, konventioner.
> **Live:** <https://sndvll.github.io/phrases/> (GitHub Pages, `main` → root).

## Vad det är

En frasapp för resande, byggd för att **visas upp**: användaren läser uttalet,
personen framför läser skriften på sitt eget språk. Därför är värdlandets skrift
alltid synlig i listan och kan förstoras till helskärm.

Värdländer: thailändska, japanska, vietnamesiska, kinesiska (förenklad). Inget i
koden är bundet till ett visst språk — allt språkspecifikt bor i `i18n/host.<code>.js`.

Ingen app-server, ingen databas, ingen container — statiska filer som GitHub Pages
serverar, plus en service worker som gör den offline-kapabel. Tidigare kördes den som
en nginx-container i homelabben; den vägen är riven.

## Stack

| Lager | Val |
|---|---|
| Frontend | Ren HTML + CSS + vanilla JS (Svelte används inte — en fil räcker) |
| Typsnitt | Outfit + Noto Sans Thai + Noto Sans (vi), **självhostade** i `fonts/`; CJK via systemtypsnitt |
| Offline | `sw.js` precachar app-skalet; `manifest.webmanifest` gör den installerbar |
| Hosting | GitHub Pages, repo `sndvll/phrases`, branch `main`, root |
| Domän | <https://sndvll.github.io/phrases/> (ingen egen domän, ingen Caddy) |

## Struktur

```
index.html               markup — inga inline-stilar, ingen inline-JS, inga onclick
styles.css               all CSS (teman som variabler)
js/app.js                entry point: DOM-wiring, init, statusrad, service worker
js/state.js              state + localStorage + hostData()/loc()
js/phrases.js            compose(), labelOf(), phrasesOf()
js/render.js             karusell, flikar, kort; build() + refresh()
js/ui.js                 applyUi(), språkmeny, info-sheet
js/show.js               helskärm, flermarkering, långtryck
i18n/host.th.js          thailändska     i18n/host.ja.js  japanska
i18n/host.vi.js          vietnamesiska   i18n/host.zh.js  kinesiska (förenklad)
i18n/guest.sv.js         gästspråk svenska (UI + betydelser)
i18n/guest.en.js         gästspråk engelska
sw.js                    service worker: precache + stale-while-revalidate
manifest.webmanifest
fonts/                   woff2 (Outfit latin + Noto Sans Thai thai-subset)
icons/                   icon-180.png (apple-touch), icon-512.png
.nojekyll                hindrar Jekyll från att processa sajten
```

`js/app.js` laddas som `type="module"`. Moduler är defererade som standard och
körs efter i18n-filerna (klassiska script, körs vid parse), så `window.HOSTS` och
`window.LOCALES` finns när modulerna importeras.

**Inga `onclick` i markupen** — moduler har egen scope, så all wiring sker i
`js/app.js` med `addEventListener`. Kortens klick hanteras via delegering på
karusellen, inte en closure per kort.

## Två språkaxlar

- **host** = språket i landet du är i. `i18n/host.<code>.js` äger skrift,
  uttal, artighetspartiklar, kategorier och ägg-varianter.
- **guest** = användarens språk. `i18n/guest.<code>.js` äger `ui` (flikar,
  knappar, fältetiketter) och `phrases` (betydelser per `id`).

Regler:

- **Allt som är värd-specifikt ska bo i host-filen.** `index.html` får inte
  anta att `parts.m` heter `ครับ`; den läser `hostData().parts`.
- **`parts`, `egg`, `latin` och kategorier är valfria per värd.** Saknar språket en
  könsbunden artighetsändelse göms Man/Kvinna-knappen; saknas ägg-varianter göms
  ägg-växlaren; är `latin` tom göms uttalsraden. Bygg aldrig in antaganden om att
  ett fält finns.
- **CJK-typsnitt hämtas aldrig** — de ligger i systemet (Hiragino/PingFang/Noto).
  Vietnamesiska har egna woff2 i `fonts/` eftersom Outfit saknar dess diakriter.
- `applyCardText()` i `render.js` är den enda platsen som skriver text i ett kort —
`build()` och `refresh()` använder båda den, så de kan inte glida isär.

`compose()` är den enda vägen från fras → visad text. Lägg aldrig in partikeln
  direkt i strängarna, då slutar krub/kha-växlaren fungera.
- Nya fraser kräver **samma `id`** i host- och gästfilerna. Saknad gäst-nyckel
  faller tillbaka på svenska, sedan på frasens eget `label`, sedan på id:t.
- **Kategorier är per värd.** Lägg bara in de flikar som är relevanta för landet —
  thai har `Uteliv` med bar fine, japanska har `Uteliv` med 乾杯 men inga bar-fine-fraser.
- Nytt språk = en ny fil + `<script>`-rad i `index.html` + post i `SHELL` i `sw.js`
  (och bumpad `CACHE`).

## Offline-regler

- **Typsnitt får aldrig hämtas externt.** Ingen `<link>` till Google Fonts — det
  bryter offline-läget. Nya vikter läggs i `fonts/` + `@font-face`.
- **Ändrar du innehåll i en cachad fil** (index.html, i18n, typsnitt) måste `CACHE`
  bumpas i `sw.js` (t.ex. `thai-v10` → `thai-v11`), annars ser befintliga klienter den
  gamla versionen på nästa laddning. Lägger du till en *ny* fil ska den dessutom med
  i `SHELL`.
- **Alla sökvägar är relativa.** Sajten ligger under `/phrases/`, inte på domänroten:
  `styles.css` (inte `/styles.css`), `url('fonts/…')` i CSS, och `./` i `SHELL` +
  `start_url`/`scope`/`icons` i manifestet. En absolut sökväg ger 404 på Pages.
- GitHub Pages skickar `Cache-Control: max-age=600` och kan inte konfigureras —
  räkna med upp till 10 min fördröjning för icke-installerade besökare efter deploy.
- Verifiering: ladda sidan, sätt DevTools i offline-läge (eller `docker`-oberoende:
  koppla ner nätet) och ladda om. 52 fraser + båda typsnitten ska renderas.

## Tema och färger

- Appen följer systemtemat. **Alla färger är CSS-variabler** i `:root` med en
  `@media (prefers-color-scheme: light)`-override — hårdkoda aldrig en hex i en regel.
- Kategorifärger är `--acc-<id>` (greet/food/spice/night) och sätts på elementet som
  `var(--acc-<id>, var(--acc-greet))`. **Färger hör inte hemma i host- eller
  gästfilerna** — en ny destination ska inte behöva tänka på presentation.
- Ljust läge kräver mörkare accenter för kontrast; de ligger i media-queryn.
- `apple-mobile-web-app-status-bar-style` sätts i JS (`syncStatusBar()`) eftersom
  iOS inte kan byta statusradens textfärg via CSS. Ändra den inte statiskt i `<head>`.
- Fullskärmsläget ("Visa stort") följer också temat — byt medvetet om du vill ha en
  alltid mörk presentationsyta.

## Domänmodell

Varje fras har `id`, `cat`, `script`, `latin` (host) plus en etikett per gästspråk.
Två valfria fält styr varianter:

- **`{p}`** — artighetsändelsen. Byts mot `krub`/`ครับ` eller `kha`/`ค่ะ`.
  `q: true` ger `คะ` istället för `ค่ะ` (thai skiljer påstående och fråga).
- **`egg: { scriptOn, scriptOff, latinOn, latinOff }`** — frasen har två **kompletta**
  varianter (med och utan ägg), inte suffix. Varje språk formulerar dem som det själv
  talar: thai bygger vidare på `มังสวิรัติ`, japanska skriver en hel mening. Saknas
  `egg` göms växlaren automatiskt.

`applyCardText()` i `render.js` är den enda platsen som skriver text i ett kort —
`build()` och `refresh()` använder båda den, så de kan inte glida isär.

`compose()` är den enda vägen från fras → visad text. Lägg aldrig in partikeln
direkt i strängarna, då slutar krub/kha-växlaren fungera.

## Persistens

`js/state.js` äger alla nycklar (`phrases.host|guest|pol|egg|cat`). `state.cat` är
ett **kategori-id**, inte ett index, eftersom resmålen har olika kategorimängder.
`build()` återställer kategorin utan animation (`scrollLeft`, inte `scrollTo`), och
`initGestures`-flödet sparar varje sidbyte. Ett okänt id faller tillbaka på första
fliken och skrivs över, så lagringen läker sig själv.

Nycklarna hette `thai.*` när appen bara var thailändsk; `persistAll()` läser dem en
gång och tar bort dem.

## Flermarkering

Listikonen i headern togglar `selectionMode`, och **långtryck (450 ms)** på ett kort
går in i läget med det kortet redan markerat. I det läget öppnar ett klick inte
detaljvyn utan togglar markering; bottenbjälken visar antal och "Visa".

Långtrycket avbryts av rörelse > 8 px, `pointercancel`, `pointerleave` eller scroll,
så det krockar inte med att bläddra. Klicket som webbläsaren skickar *efter* en
långpress ignoreras via `lastLongPress` — annars skulle markeringen slås av direkt
och detaljvyn öppnas.

`showSelected()` skickar listan till `openBig(phrases)`, som bygger en horisontell
scroll-snap-track. Ett tryck på ett kort anropar samma funktion med `[phrase]` —
det finns ingen mellanliggande detaljmodal, helskärmen *är* detaljvyn. Räknaren
(`1 / 3`) göms automatiskt när listan bara har ett element.

## Språkliga regler

- **Värdlandets skrift är sanningen**, latinet är bara ett uttal. Nya fraser ska ha
  verifierad skrift — kontrollera mot en språkkälla (för thai:
  [Wikivoyage Thai phrasebook](https://en.wikivoyage.org/wiki/Thai_phrasebook))
  eller en modersmålstalare innan de läggs in.
- Kända fällor som medvetet avviker från turistfraser: notan = `เก็บเงินด้วย`
  (inte `เช็คบิล`), ja/nej = `ใช่`/`ไม่ใช่` ("stämmer", inte "ja").
- Svenska etiketter får beskriva vad frasen *betyder*, inte bara översätta ordagrant.

## Konventioner

- **Sex moduler, inga fler utan skäl.** `state` (data/state), `phrases` (fras → text),
  `render` (listan), `ui` (header + sheets), `show` (helskärm/gester), `app` (wiring).
  Ingen build, inga beroenden — webbläsaren laddar modulerna direkt.
- **Beroenderiktningen är enkelriktad:** `state` ← `phrases` ← `render` ← `ui`/`show`
  ← `app`. `show.js` får läsa `carousel` från `render.js`, men `render.js` får aldrig
  importera `show.js` (det skulle ge en cykel).
- **Ingen inline-CSS eller inline-JS i markupen** — inte heller `onclick`.
- **Inga commits på eget bevåg** — commit/push bara på uttrycklig begäran.
- Ändringar slår igenom via `git push`; GitHub Pages bygger om på ~30–60 s.
