self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('my-cache').then(cache => {
        return cache.addAll(['/', '/index.js', '/manifest.json']); // Adicione outros arquivos que deseja em cache
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });