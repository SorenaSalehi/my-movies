const VERSION = "v1.0.1";
const CACHE = `app-${VERSION}`;
const PRECACHE_ASSETS = ["/", "/offline.html", "/manifest.json", "/icon.png"];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => cache.addAll(PRECACHE_ASSETS))
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            const keys = await caches.keys();
            await Promise.all(keys.map((k) => k !== CACHE && caches.delete(k)));
            await self.clients.claim();
        })()
    );
});

// cashing helper
async function networkFirst(request, { timeoutMs = 6000 } = {}) {
    const cache = await caches.open(CACHE);
    try {
        const ctrl = new AbortController();
        const id = setTimeout(() => ctrl.abort(), timeoutMs);
        const fresh = await fetch(request, { signal: ctrl.signal });
        clearTimeout(id);
        cache.put(request, fresh.clone());
        return fresh;
    } catch {
        const cached = await cache.match(request);
        if (cached) return cached;
        if (request.mode === "navigate") return caches.match("/offline.html");
        throw new Error("Network and cache both failed");
    }
}
// static helper
async function staleWhileRevalidate(request) {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(request);
    const networkPromise = fetch(request)
        .then((res) => {
            cache.put(request, res.clone());
            return res;
        })
        .catch(() => undefined);
    return cached || networkPromise || fetch(request);
}

self.addEventListener("fetch", (event) => {
    const req = event.request;
    if (req.method !== "GET") return;

    const url = new URL(req.url);
    const isSameOrigin = url.origin === self.location.origin;

    if (req.mode === "navigate") {
        event.respondWith(networkFirst(req, { timeoutMs: 6000 }));
        return;
    }

    if (isSameOrigin && /\.(?:js|css|woff2?|ttf|ico)$/.test(url.pathname)) {
        event.respondWith(staleWhileRevalidate(req));
        return;
    }

    if (
        isSameOrigin &&
        /\.(?:png|jpg|jpeg|svg|webp|avif)$/.test(url.pathname)
    ) {
        event.respondWith(
            (async () => {
                const cache = await caches.open(CACHE);
                const cached = await cache.match(req);
                const fetchPromise = fetch(req)
                    .then((res) => {
                        cache.put(req, res.clone());
                        return res;
                    })
                    .catch(() => undefined);
                return cached || fetchPromise || caches.match("/offline.html");
            })()
        );
        return;
    }

    // API
    if (/\/api\//.test(url.pathname)) {
        event.respondWith(networkFirst(req, { timeoutMs: 5000 }));
        return;
    }

    event.respondWith(fetch(req).catch(() => caches.match(req)));
});

//receive message from client to update
self.addEventListener("message", (event) => {
    if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});
