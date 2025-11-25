self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
});

self.addEventListener('fetch', (event) => {
  // For now, do nothing. Later you can add caching.
});
