# Thai Fraslista

En liten fraslista för svenskar i Thailand, byggd för att **visas upp**. Svensken
läser uttalet, thailändaren läser thai-skriften. Därför är thai-skriften alltid
synlig i listan och kan förstoras till helskärm.

Sajten är **en enda HTML-fil** med all data, CSS och JS — ingen build, inga
tredjepartsberoenden, och den fungerar helt offline (se nedan).

## Funktioner

| Funktion | Beskrivning |
|---|---|
| Karusell | Tre sidor (Hälsningar / Mat & nota / Smak & specialkost), swipe + tabs + prickar |
| Fraslista | Gästspråkets etikett + thai-skrift i listan, uttal under |
| Tryck på en fras | Går **direkt** till helskärm: thai-skrift i `15vw`, uttal och betydelse under |
| Flera fraser | **Långtryck** på ett kort (eller listikonen) startar markeringsläget → swipebar helskärmsserie med räknare |
| Man / Kvinna | Byter artighetsändelse i alla fraser: ครับ/krub eller ค่ะ/kha (คะ i frågor) |
| Ägg-läge | Växlar den vegetariska frasen mellan มังสวิรัติ (ägg okej) och ไม่ใส่ไข่ |
| Språk | Välj gästspråk (svenska/engelska) i språkmenyn (jordgloben) |

Inställningarna sparas i `localStorage`.

## Tema

Appen följer systemtemat via `prefers-color-scheme` — mörkt (OLED-svart) eller ljust.
Alla färger är CSS-variabler i `:root` med en ljus override; kategorifärgerna är
`--acc-greet` / `--acc-food` / `--acc-spice` / `--acc-night` och har egna, mörkare
värden i ljust läge för att behålla kontrast.

I installerat läge (PWA) byter appen även `apple-mobile-web-app-status-bar-style`
mellan `black-translucent` (mörkt) och `default` (ljust), eftersom iOS inte låter
statusradens text färg följa en CSS-mediafråga.

## Två språkaxlar

| Axel | Betydelse | Fil |
|---|---|---|
| **Värd** | Språket i landet du är i — thai-skrift + uttal | `site/i18n/host.th.js` |
| **Gäst** | Ditt eget språk: UI, flikar, knappar och frasbetydelser | `site/i18n/guest.<code>.js` |

Att lägga till ett **gästspråk** (t.ex. tyska): kopiera `guest.en.js`, byt `code`,
`name`, `ui` och `phrases`, lägg till en `<script>`-rad i `index.html`. Saknade
fraser faller tillbaka på svenska.

Att lägga till ett **resmål** (t.ex. Japan): kopiera `host.th.js`, byt `name`,
`native`, `parts`, `hints` och `phrases` (samma `id` som gästfilerna), registrera
filen och sätt `state.host`. Inget i `index.html` är thai-specifikt utanför
host-filen.

## Offline

Appen är en PWA. Vid första besöket precachas skalet (HTML, manifest, ikoner och
båda typsnitten) av `sw.js`, varefter den startar utan nät alls — testat genom att
stoppa containern och ladda om, vilket gav full funktionalitet med lokal font.

Typsnitten är **självhostade** i `site/fonts/` just därför. Lägg aldrig tillbaka en
`fonts.googleapis.com`-länk; det är den enda detalj som bryter offline-läget.

På iPhone: dela-menyn → **Lägg till på hemskärmen**. Då startar den i standalone-läge
utan webbläsar-chrome, vilket är snabbare och ser ut som en app.

## Struktur

```
thai-phrases/
├── docker-compose.yml   nginx:alpine, nätet homelab
├── nginx.conf           MIME-typer för .webmanifest/.woff2, no-cache på sw.js
└── site/
    ├── index.html       markup (91 rader), inga inline-stilar eller inline-JS
    ├── styles.css       all CSS, teman som variabler
    ├── app.js           all logik (state, rendering, gesthantering)
    ├── i18n/
    │   ├── host.th.js   värdlandets fraser (thai-skrift + uttal)
    │   ├── guest.sv.js  gästspråk: svenska
    │   └── guest.en.js  gästspråk: engelska
    ├── sw.js            service worker, precache av app-skalet
    ├── manifest.webmanifest
    ├── fonts/           Outfit + Noto Sans Thai (woff2, självhostade)
    └── icons/           180 px (apple-touch) + 512 px (manifest)
```

## Redigera fraser

Fraserna bor i `site/i18n/host.th.js`:

```js
{ id: 'thanks', cat: 'greet', script: 'ขอบคุณมาก{p}', latin: 'Khop khun mak {p}' }
```

och etiketterna för respektive gästspråk i `guest.*.js` under samma `id`:

```js
phrases: { thanks: 'Tack så mycket' }
```

- `{p}` = artighetsändelsen, byts ut av krub/kha-växlaren.
- `q: true` = fråga (ger คะ istället för ค่ะ för kvinnor).
- `egg: {...}` = frasen har en ägg-variant (se den vegetariska).

## Källa till fraserna

Thai-skriften är kontrollerad mot [Wikivoyage Thai phrasebook](https://en.wikivoyage.org/wiki/Thai_phrasebook)
och vedertagen användning. Två saker som ofta lärs ut fel och som därför medvetet
avviker från turistfraser:

- **Notan** = `เก็บเงินด้วย` (*kep ngern duai*), inte `เช็คบิล` (engelsk import).
- **Ja/nej** = `ใช่` / `ไม่ใช่` betyder "stämmer/stämmer inte". Thai svarar genom att
  upprepa verbet, så etiketten är "Det stämmer" och inte "Ja".

## Deploy

```bash
cd ~/projects/thai-phrases
docker compose up -d
```

Caddy proxar `thai-phrases.sndvll.dev` → `thai-phrases:80` (se `~/homelab/proxy/Caddyfile`).
Ingen build behövs — `site/` är bind-mountad read-only, så en filändring slår igenom direkt.
`nginx.conf` mountas också in (MIME-typer + cache-headers).
