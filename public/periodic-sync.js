const SYNC_TAG = 'daily-quote';

const WINDOW_START_HOUR = 8;
const WINDOW_END_HOUR = 21;

const ENFORCE_WINDOW = true;

   const QUOTE_URL =
     self.location.hostname === 'localhost'
       ? 'http://localhost:8000/api/v1/quotes/today'
       : 'https://api.qotdia.com/api/v1/quotes/today';
const FETCH_TIMEOUT_MS = 8000;

const FALLBACK_TITLE = 'Qotdia';
const FALLBACK_BODY = 'Your daily inspiration is waiting for you ✨';
const ICON = '/logo.png'; 

self.addEventListener('periodicsync', (event) => {
  if (event.tag === SYNC_TAG) {
    event.waitUntil(showReminder());
  }
});

function inAllowedWindow() {
  if (!ENFORCE_WINDOW) return true;
  const hour = new Date().getHours();
  return hour >= WINDOW_START_HOUR && hour < WINDOW_END_HOUR;
}

async function fetchQuote() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(QUOTE_URL, { signal: controller.signal });
    if (!res.ok) return null;
    const data = await res.json();
    const text = data.data.content ?? null;
    const author = data.data.author ?? '';
    if (!text) return null;
    return { text, author };
  } catch {
    return null; 
  } finally {
    clearTimeout(timer);
  }
}

async function showReminder() {
  if (!inAllowedWindow()) return;

  if (self.Notification && self.Notification.permission !== 'granted') return;

  const quote = await fetchQuote();
  const body = quote
    ? quote.author
      ? `" ${quote.text} " — ${quote.author}`
      : `« ${quote.text} »`
    : FALLBACK_BODY;

  await self.registration.showNotification(FALLBACK_TITLE, {
    body,
    icon: ICON,
    badge: ICON,
    tag: 'qotdia-daily', 
    data: { url: '/' },
  });
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || '/';

  event.waitUntil(
    (async () => {
      const windows = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });
      for (const client of windows) {
        if ('focus' in client) return client.focus();
      }
      return self.clients.openWindow(target);
    })()
  );
});
