
// // // call Install event
// // window.addEventListener('install', e => {
// //   console.log('Service Worker: Installed');

// //   e.waitUntil(
// //     caches
// //       .open('v1')
// //       .then(cache => {
// //         console.log('Service Worker: Caching files');
// //         cache.addAll('index.html', '/css/style.css', '/js/main.js');
// //       })
// //       .then(() => window.skipWating())
// //   )
// // })

// // //call Activate Event
// // window.addEventListener('activate', e => {
// //   console.log('Service Worker: Activated')
// // })

// // In production, we register a service worker to serve assets from local cache.

// // This lets the app load faster on subsequent visits in production, and gives
// // it offline capabilities. However, it also means that developers (and users)
// // will only see deployed updates on the "N+1" visit to a page, since previously
// // cached resources are updated in the background.

// // To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// // This link also includes instructions on opting out of this behavior.

// const isLocalhost = Boolean(
//   window.location.hostname === 'localhost' ||
//   // [::1] is the IPv6 localhost address.
//   window.location.hostname === '[::1]' ||
//   // 127.0.0.1/8 is considered localhost for IPv4.
//   window.location.hostname.match(
//     /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
//   )
// );

// export default function register() {
//   if ( 'serviceWorker' in navigator) {
//     // The URL constructor is available in all browsers that support SW.
//     const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
//     if (publicUrl.origin !== window.location.origin) {
//       // Our service worker won't work if PUBLIC_URL is on a different origin
//       // from what our page is served on. This might happen if a CDN is used to
//       // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
//       return;
//     }

//     window.addEventListener('load', () => {
//       const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

//       if (!isLocalhost) {
//         // Is not local host. Just register service worker
//         registerValidSW(swUrl);
//       } else {
//         // This is running on localhost. Lets check if a service worker still exists or not.
//         checkValidServiceWorker(swUrl);
//       }
//     });
//   }
// }

// function registerValidSW(swUrl) {
//   navigator.serviceWorker
//     .register(swUrl)
//     .then(registration => {
//       registration.onupdatefound = () => {
//         const installingWorker = registration.installing;
//         installingWorker.onstatechange = () => {
//           if (installingWorker.state === 'installed') {
//             if (navigator.serviceWorker.controller) {
//               // At this point, the old content will have been purged and
//               // the fresh content will have been added to the cache.
//               // It's the perfect time to display a "New content is
//               // available; please refresh." message in your web app.
//               console.log('New content is available; please refresh.');
//             } else {
             
//                     caches
//                       .open('v1')
//                       .then(cache => {
//                         console.log('Service Worker: Caching files');
//                         cache.addAll('index.html', '/css/style.css', '/js/main.js');
//                       })
//                       .then(() => window.skipWating())
//               // At this point, everything has been precached.
//               // It's the perfect time to display a
//               // "Content is cached for offline use." message.
//               console.log('Content is cached for offline use.');
//             }
//           }
//         };
//       };
//     })
//     .catch(error => {
//       console.error('Error during service worker registration:', error);
//     });
// }

// function checkValidServiceWorker(swUrl) {
//   // Check if the service worker can be found. If it can't reload the page.
//   fetch(swUrl)
//     .then(response => {
//       // Ensure service worker exists, and that we really are getting a JS file.
//       if (
//         response.status === 404 ||
//         response.headers.get('content-type').indexOf('javascript') === -1
//       ) {
//         // No service worker found. Probably a different app. Reload the page.
//         navigator.serviceWorker.ready.then(registration => {
//           registration.unregister().then(() => {
//             window.location.reload();
//           });
//         });
//       } else {
//         // Service worker found. Proceed as normal.
//         registerValidSW(swUrl);
//       }
//     })
//     .catch(() => {
//       console.log(
//         'No internet connection found. App is running in offline mode.'
//       );
//     });
// }

// export function unregister() {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.ready.then(registration => {
//       registration.unregister();
//     });
//   }
// }
var doCache = true;

// Name our cache
var CACHE_NAME = 'my-pwa-cache-v1';

// Delete old caches that are not our current one!
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log('Deleting cache: ' + key)
            return caches.delete(key);
          }
        }))
      )
  );
});

// The first time the user starts up the PWA, 'install' is triggered.
self.addEventListener('install', function(event) {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          // Get the assets manifest so we can see what our js file is named
          // This is because webpack hashes it
          fetch("asset-manifest.json")
            .then(response => {
              response.json()
            })
            .then(assets => {
              // Open a cache and cache our files
              // We want to cache the page and the main.js generated by webpack
              // We could also cache any static assets like CSS or images
              const urlsToCache = [
                "/",
                assets["main.js"]
              ]
              cache.addAll(urlsToCache)
              console.log('cached');
            })
        })
    );
  }
});

// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them
self.addEventListener('fetch', function(event) {
    if (doCache) {
      event.respondWith(
          caches.match(event.request).then(function(response) {
              return response || fetch(event.request);
          })
      );
    }
});