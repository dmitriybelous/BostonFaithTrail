const CACHE_NAME = 'boston-faith-trail-v2';
const getBasePath = () => {
  try {
    const scopePath = new URL(self.registration.scope).pathname;
    return scopePath === '/' ? '' : scopePath.replace(/\/$/, '');
  } catch {
    return '';
  }
};

const CORE_ASSETS = () => {
  const basePath = getBasePath();
  return [
    `${basePath}/`,
    `${basePath}/map/`,
    `${basePath}/stops/`,
  ];
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS()).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Use network-first for HTML navigation requests to ensure fresh CSS references are always loaded.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone)).catch(() => {});
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for immutable static assets (content-hashed CSS/JS).
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
