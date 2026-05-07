const CACHE='laundry-presets-v3';
const CORE=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-512-maskable.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>(k===CACHE)?null:caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;event.respondWith(caches.match(req).then(cached=>{if(cached)return cached;return fetch(req).then(res=>{try{const url=new URL(req.url);if(url.origin===self.location.origin&&res&&res.status===200&&res.type==='basic'){caches.open(CACHE).then(cache=>cache.put(req,res.clone()))}}catch(e){}return res}).catch(()=>caches.match('./index.html'))}))});
