/* Service worker guide from https://codelabs.developers.google.com/codelabs/offline/#0
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/
const version = "0.0.1";
const cacheName = `restaurant-reviews-${version}`;
self.addEventListener('install', e => {
  const timeStamp = Date.now();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/index.html?timestamp=${timeStamp}`,
        `/restaurant.html?timestamp=${timeStamp}`,
        `/css/styles.css?timestamp=${timeStamp}`,
        `/js/main.js?timestamp=${timeStamp}`,
        `/js/dbhelper.js?timestamp=${timeStamp}`,
        `/js/restaurant_info.js?timestamp=${timeStamp}`,
        `/img/1.jpg?timestamp=${timeStamp}`,
        `/img/2.jpg?timestamp=${timeStamp}`,
        `/img/3.jpg?timestamp=${timeStamp}`,
        `/img/4.jpg?timestamp=${timeStamp}`,
        `/img/5.jpg?timestamp=${timeStamp}`,
        `/img/6.jpg?timestamp=${timeStamp}`,
        `/img/7.jpg?timestamp=${timeStamp}`,
        `/img/8.jpg?timestamp=${timeStamp}`,
        `/img/9.jpg?timestamp=${timeStamp}`,
        `/img/10.jpg?timestamp=${timeStamp}`,
      ])
      .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
    .then(cache => cache.match(event.request, {ignoreSearch: true}))
    .then(response => {
      return response || fetch(event.request);
    })
  );
});
