
// Cache Google Fonts
// registerRoute(
//   /^https:\/\/fonts\.gstatic\.com/,
//   new CacheFirst({
//     cacheName: 'google-fonts-webfonts',
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//       new ExpirationPlugin({
//         maxAgeSeconds: 60 * 60 * 24 * 365, // 365 Days
//       }),
//     ],
//   }),
// );

// // Cache JavaScript and CSS
// registerRoute(/\.(?:js|css)$/, new StaleWhileRevalidate());

// registerRoute(
//   /\.(?:png|gif|jpg|jpeg|svg)$/,
//   new CacheFirst({
//     cacheName: 'images',
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 10,
//         maxAgeSeconds: 60 * 60 * 24 * 7, // 7 Days
//       }),
//     ],
//   }),
// );


self.addEventListener('fetch', (event) => {
  console.log("Start Service Worker");
  // 서비스 워커 로직을 여기에 작성합니다.
});