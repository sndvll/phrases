# AGENTS.md — Thai Fraslista

> **Rotkontext:** [`../../AGENTS.md`](../../AGENTS.md) — infrastruktur, konventioner.

## Vad det är

En fraslista för svenskar i Thailand, byggd för att **visas upp**: svensken läser
uttalet, thailändaren läser thai-skriften. Därför är thai-skriften alltid synlig i
listan och kan förstoras till helskärm.

Ingen app-server, ingen databas — en statisk HTML-fil som serveras av nginx, plus en
service worker som gör den offline-kapabel.

## Stack

| Lager | Val |
|---|---|
| Frontend | Ren HTML + CSS + vanilla JS (Svelte används inte — en fil räcker) |
| Typsnitt | Outfit (latin) + Noto Sans Thai, **självhostade** i `site/fonts/` |
| Offline | `sw.js` precachar app-skalet; `manifest.webmanifest` gör den installerbar |
| Server | `nginx:alpine`, nätet `homelab`, konfig i `nginx.conf` |
| Proxy | Caddy: `thai-phrases.sndvll.dev` → `thai-phrases:80` |

## Struktur

```
site/index.html          markup — inga inline-stilar, ingen inline-JS
site/styles.css          all CSS (teman som variabler)
site/app.js              all logik; laddas med defer efter i18n-filerna
site/i18n/host.th.js     värdlandets fraser (thai-skrift + latin)
site/i18n/guest.sv.js    gästspråk svenska (UI + betydelser)
site/i18n/guest.en.js    gästspråk engelska
site/sw.js               service worker: precache + stale-while-revalidate
site/manifest.webmanifest
site/fonts/              woff2 (Outfit latin + Noto Sans Thai thai-subset)
site/icons/              icon-180.png (apple-touch), icon-512.png
nginx.conf               MIME-typer + no-cache på sw.js
docker-compose.yml       nginx, bind-mount av site/ read-only
```

`app.js` är en klassisk script-fil (inte en modul) eftersom markupen anropar
funktioner via `onclick` — de måste ligga på `window`. Ordningen är: i18n-filerna
först (klassiska, körs vid parse), sedan `app.js` med `defer`.

## Två språkaxlar

- **host** = språket i landet du är i. `site/i18n/host.<code>.js` äger skrift,
  uttal, artighetspartiklar, kategorier och ägg-varianter.
- **guest** = användarens språk. `site/i18n/guest.<code>.js` äger `ui` (flikar,
  knappar, fältetiketter) och `phrases` (betydelser per `id`).

Regler:

- **Allt som är thai-specifikt ska bo i host-filen.** `index.html` får inte
  anta att `parts.m` heter `ครับ`; den läser `hostData().parts`.
- `compose()` är den enda vägen från fras → visad text. Lägg aldrig in partikeln
  direkt i strängarna, då slutar krub/kha-växlaren fungera.
- Nya fraser kräver **samma `id`** i host- och gästfilerna. Saknad gäst-nyckel
  faller tillbaka på svenska, sedan på id:t.
- Nytt språk = en ny fil + `<script>`-rad i `index.html` + post i `SHELL` i `sw.js`
  (och bumpad `CACHE`).

## Offline-regler

- **Typsnitt får aldrig hämtas externt.** Ingen `<link>` till Google Fonts — det
  bryter offline-läget. Nya vikter läggs i `site/fonts/` + `@font-face`.
- **Ändrar du innehåll i en cachad fil** (index.html, i18n, typsnitt) måste `CACHE`
  bumpas i `sw.js` (t.ex. `thai-v3` → `thai-v4`), annars ser befintliga klienter den
  gamla versionen på nästa laddning. Lägger du till en *ny* fil ska den dessutom med
  i `SHELL`.
- `sw.js` serveras med `Cache-Control: no-cache` (se `nginx.conf`) — annars pinnar
  webbläsaren en gammal shell.
- Verifiering: `docker compose stop` och ladda om sidan. Fungerar den är offline ok.

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
- **`egg: {...}`** — frasen har en ägg-variant. Används av "Vegetariskt" eftersom
  `มังสวิรัติ` (ägg okej) och `เจ` (strikt veganskt) inte är samma sak.

`compose()` är den enda vägen från fras → visad text. Lägg aldrig in partikeln
direkt i strängarna, då slutar krub/kha-växlaren fungera.

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

- **Thai-skriften är sanningen**, latinet är bara ett uttal. Nya fraser ska ha
  verifierad thai-skrift — kontrollera mot [Wikivoyage Thai phrasebook](https://en.wikivoyage.org/wiki/Thai_phrasebook)
  eller en thailändsk talare innan de läggs in.
- Kända fällor som medvetet avviker från turistfraser: notan = `เก็บเงินด้วย`
  (inte `เช็คบิล`), ja/nej = `ใช่`/`ไม่ใช่` ("stämmer", inte "ja").
- Svenska etiketter får beskriva vad frasen *betyder*, inte bara översätta ordagrant.

## Konventioner

- **Tre filer, inte fler.** `index.html` (markup), `styles.css` (all CSS),
  `app.js` (all logik). Dela inte upp i moduler eller komponenter förrän det
  finns ett konkret behov — appen är liten nog att överskåda.
- **Ingen inline-CSS eller inline-JS i markupen.** Undantaget är `onclick` på
  knappar som anropar globala funktioner i `app.js`.
- **Inga commits på eget bevåg** — commit/push bara på uttrycklig begäran.
- Ändringar i `site/` slår igenom direkt (bind-mount); ingen omstart behövs.
