/* Service worker do Bolso-16: abre offline. Troque VERSION para forçar atualização. */
const VERSION='bolso16-v7';
const SHELL=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  const url=new URL(req.url);
  const own=url.origin===location.origin,font=url.hostname==='fonts.googleapis.com'||url.hostname==='fonts.gstatic.com';
  if(!own&&!font)return;
  // abre do cache e atualiza em segundo plano (a versão nova vale na próxima abertura)
  e.respondWith(caches.open(VERSION).then(async c=>{
    const hit=await c.match(req,{ignoreSearch:true});
    const net=fetch(req).then(r=>{if(r&&(r.ok||r.type==='opaque'))c.put(req,r.clone());return r}).catch(()=>null);
    if(hit){e.waitUntil(net);return hit}
    const r=await net;
    return r||(req.mode==='navigate'?c.match('./index.html'):Response.error());
  }));
});
