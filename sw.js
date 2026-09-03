const CACHE_NAME = 'klimat-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/app.js',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  // No cachear llamadas a la API o Supabase
  if (event.request.url.includes('/api/') || event.request.url.includes('supabase.co')) {
    return fetch(event.request);
  }
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
