var cacheName = 'FoosBoardCache'

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install')
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell')

      return cache.addAll(__precacheManifest)
    })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (resp) {
      return (
        resp ||
        fetch(event.request).then(function (response) {
          return caches.open(cacheName).then(function (cache) {
            cache.put(event.request, response.clone())
            return response
          })
        })
      )
    })
  )
})
