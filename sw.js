/* App-shell cache. Everything the app needs is local, so a stale-while-revalidate
   strategy is safe: serve from cache instantly, refresh in the background. */
const CACHE = 'phrases-v15';
const SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './i18n/host.th.js',
  './i18n/guest.sv.js',
  './i18n/guest.en.js',
  './fonts/outfit-latin.woff2',
  './fonts/noto-sans-thai-thai.woff2',
  './icons/icon-180.png',
  './icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      // GitHub Pages sends max-age=600, so a plain addAll can pin the browser's
      // stale copy into a brand-new cache. `cache: 'reload'` bypasses that.
      .then((cache) => cache.addAll(SHELL.map((url) => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached); // offline and not cached: keep whatever we had

      return cached || network;
    })
  );
});
