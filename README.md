# Fraslista

En frasapp för resande, byggd för att **visas upp**. Du läser uttalet, personen
framför dig läser skriften på sitt eget språk. Därför är värdlandets skrift alltid
synlig i listan och kan förstoras till helskärm.

Appen är statisk — ingen build, inga tredjepartsberoenden — och publiceras på
**GitHub Pages**: <https://sndvll.github.io/phrases/>. Den fungerar helt offline.

**Resmål i dag:** thailändska, japanska, vietnamesiska och kinesiska (förenklad).
Fler värdländer läggs till som egna filer (se [Två språkaxlar](#två-språkaxlar)) —
inget i koden är bundet till ett visst språk.

## Funktioner

| Funktion | Beskrivning |
|---|---|
| Karusell | Kategorier som swipeas igenom, med flikar och prickar |
| Fraslista | Gästspråkets etikett + värdlandets skrift i listan, uttal under |
| Tryck på en fras | Går **direkt** till helskärm: skriften i `15vw`, uttal och betydelse under |
| Flera fraser | **Långtryck** på ett kort (eller listikonen) startar markeringsläget → swipebar helskärmsserie med räknare |
| Man / Kvinna | Byter artighetsändelse i alla fraser när språket har en (thai: ครับ/krub eller ค่ะ/kha, คะ i frågor) |
| Ägg-läge | Växlar fraser som har en variant, t.ex. vegetariskt med och utan ägg |
| Språk | Välj gästspråk (svenska/engelska) i språkmenyn (jordgloben) |
| Så funkar det | Info-knappen i headern förklarar tryck, långtryck, Man/Kvinna, språk och offline |

Inställningarna sparas i `localStorage`.

## Två språkaxlar

| Axel | Betydelse | Fil |
|---|---|---|
| **Värd** | Språket i landet du är i — skrift + uttal | `i18n/host.<code>.js` |
| **Gäst** | Ditt eget språk: UI, flikar, knappar och frasbetydelser | `i18n/guest.<code>.js` |

Värdar: `host.th.js`, `host.ja.js`, `host.vi.js`, `host.zh.js`.
Gäster: `guest.sv.js`, `guest.en.js`.

Båda väljs i språkmenyn (jordgloben) och sparas i `localStorage`.

Att lägga till ett **gästspråk** (t.ex. tyska): kopiera `guest.en.js`, byt `code`,
`name`, `ui` och `phrases`, lägg till en `<script>`-rad i `index.html`. Saknade
fraser faller tillbaka på svenska.

Att lägga till ett **resmål**: kopiera närmaste host-fil, byt `code`, `name`,
`native`, `font`, `categories` och `phrases` (samma `id` som gästfilerna), lägg till
en `<script>`-rad i `index.html` och posten i `sw.js` → `SHELL`.

Fälten är valfria där språket inte har företeelsen:

| Fält | Betydelse | Exempel |
|---|---|---|
| `parts` | Könsbunden artighetsändelse. **Saknas** → Man/Kvinna-knappen göms | thai har, japanska/kinesiska har inte |
| `egg` per fras | Två **kompletta** fraser (med/utan ägg). Saknas → ägg-växlaren göms | alla fyra värdarna |
| `latin` | Uttal. **Tom sträng** → uttalsraden göms | vietnamesiska (skriften är redan latin) |
| `font` | Typsnittsstack för skriften | thai: Noto Sans Thai, ja/zh: system-CJK |

**Kategorier och fraser är per värd.** Varje host-fil bestämmer själv vilka flikar som
finns och vilka fraser som ingår — thai har 79 fraser och sju flikar, de andra 70 och
sju. Thailands `barfine`, `buydrink` och `justlooking` finns bara där; japanska,
vietnamesiska och kinesiska har egen uteliv (乾杯 / Cạn ly! / 干杯) men inga bar-fine-fraser.

En fras `id` är kontraktet mot gästspråken: finns id:t i `guest.*.js` får den en
betydelse. En helt värd-specifik fras kan i stället sätta `label` direkt i host-filen.

## Tema

Appen följer systemtemat via `prefers-color-scheme` — mörkt (OLED-svart) eller ljust.
Alla färger är CSS-variabler i `:root` med en ljus override; kategorifärgerna är
`--acc-<id>` och har egna, mörkare värden i ljust läge för att behålla kontrast.

I installerat läge (PWA) byter appen även `apple-mobile-web-app-status-bar-style`
mellan `black-translucent` (mörkt) och `default` (ljust), eftersom iOS inte låter
statusradens text färg följa en CSS-mediafråga.

## Offline

Appen är en PWA. Vid första besöket precachas skalet (HTML, CSS, JS, i18n, manifest,
ikoner och typsnitten) av `sw.js`, varefter den startar utan nät alls.

Typsnitten är **självhostade** i `fonts/` just därför. Lägg aldrig tillbaka en
`fonts.googleapis.com`-länk; det är den enda detalj som bryter offline-läget.

CJK använder **systemtypsnitt** (Hiragino/PingFang på iOS, Noto på Android) — att
bädda in japanska eller kinesiska hade kostat flera megabyte, och systemens egna
CJK-typsnitt är bättre än något vi kan paketera. Vietnamesiska har egna vikter i
`fonts/noto-sans-*.woff2` eftersom Outfit saknar tecken som ế och ộ.

På iPhone: dela-menyn → **Lägg till på hemskärmen**. Då startar den i standalone-läge
utan webbläsar-chrome, vilket är snabbare och ser ut som en app.

## Struktur

Repo-roten **är** sajten — GitHub Pages serverar `main` direkt, ingen build och inga
arbetsflöden.

```
phrases/
├── index.html       markup, inga inline-stilar eller inline-JS
├── styles.css       all CSS, teman som variabler
├── app.js           all logik (state, rendering, gesthantering)
├── i18n/
│   ├── host.th.js   thailändska
│   ├── host.ja.js   japanska
│   ├── host.vi.js   vietnamesiska
│   ├── host.zh.js   kinesiska (förenklad)
│   ├── guest.sv.js  gästspråk: svenska
│   └── guest.en.js  gästspråk: engelska
├── sw.js            service worker, precache av app-skalet
├── manifest.webmanifest
├── fonts/           Outfit + Noto Sans Thai + Noto Sans (vietnamesiska)
├── icons/           180 px (apple-touch) + 512 px (manifest)
└── .nojekyll        hindrar GitHub från att Jekyll-processa sajten
```

## Redigera fraser

Fraserna bor i `i18n/host.<code>.js`:

```js
{ id: 'thanks', cat: 'greet', script: 'ขอบคุณมาก{p}', latin: 'Khop khun mak {p}' }
```

och etiketterna för respektive gästspråk i `guest.*.js` under samma `id`:

```js
phrases: { thanks: 'Tack så mycket' }
```

Fälten är generiska — `script` är värdlandets skrift, `latin` är uttalet:

- `{p}` = artighetsändelsen för språket, byts ut av Man/Kvinna-växlaren.
- `q: true` = fråga (thai: คะ istället för ค่ะ för kvinnor).
- `egg: {...}` = frasen har en variant, t.ex. vegetariskt med och utan ägg.

## Källa till det thailändska innehållet

Den thailändska skriften är kontrollerad mot
[Wikivoyage Thai phrasebook](https://en.wikivoyage.org/wiki/Thai_phrasebook) och
vedertagen användning. Två saker som ofta lärs ut fel och som därför medvetet
avviker från turistfraser:

- **Notan** = `เก็บเงินด้วย` (*kep ngern duai*), inte `เช็คบิล` (engelsk import).
- **Ja/nej** = `ใช่` / `ไม่ใช่` betyder "stämmer/stämmer inte". Thai svarar genom att
  upprepa verbet, så etiketten är "Det stämmer" och inte "Ja".

Nya värdländer bör kontrolleras på samma sätt — mot en språkkälla eller en
modersmålstalare — innan de läggs in.

## Deploy

```bash
git push origin main      # GitHub Pages bygger automatiskt från main
```

Ingen build och inget CI-steg: repo-roten publiceras som den är. Efter en push tar
det 30–60 s innan sidan är uppdaterad.

**Viktigt vid ändringar:** GitHub Pages skickar `Cache-Control: max-age=600` på
tillgångar, och service workern serverar cache först. Bumpa `CACHE` i `sw.js` när du
ändrar en fil i `SHELL` — annars ligger den gamla versionen kvar hos besökare.

**Sökvägar måste vara relativa** (`styles.css`, `fonts/…`, `./` i `SHELL`), eftersom
sajten ligger under `/phrases/` och inte på domänroten.
