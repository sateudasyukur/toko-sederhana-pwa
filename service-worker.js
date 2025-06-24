const CACHE_NAME = 'toko-cache-v1';
const urlsToCache = [
    './toko.html',
    './manifest.json',
    './service-worker.js',
    './icon-192.png',
    './icon-512.png'
];
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});