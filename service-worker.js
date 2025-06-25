
const CACHE_NAME = "toko-cache-v1";
const urlsToCache = [
  "/toko-sederhana-pwa/",
  "/toko-sederhana-pwa/index.html",
  "/toko-sederhana-pwa/icon-192.png",
  "/toko-sederhana-pwa/icon-512.png",
  "/toko-sederhana-pwa/manifest.json",
  "/toko-sederhana-pwa/service-worker.js",
  // Tambahkan file HTML lainnya jika diperlukan
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
