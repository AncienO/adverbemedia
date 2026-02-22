const CACHE_NAME = 'hero-cache-v1';
const HERO_IMAGE_URL = '/hero-bg.png';

// Install event - precache the hero image
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Pre-caching hero image');
            return cache.add(HERO_IMAGE_URL);
        })
    );
    // Force the waiting service worker to become the active service worker.
    self.skipWaiting();
});

// Activate event - clean up old caches if any
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Become the active service worker for all clients.
    self.clients.claim();
});

// Fetch event - Cache First strategy for the hero image
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Only intercept requests for the hero image
    if (url.pathname === HERO_IMAGE_URL) {
        event.respondWith(
            caches.match(event.request).then((response) => {
                if (response) {
                    console.log('[SW] Serving hero image from cache:', HERO_IMAGE_URL);
                    return response;
                }
                console.log('[SW] Hero image not in cache, fetching from network:', HERO_IMAGE_URL);
                return fetch(event.request);
            })
        );
    }
});
