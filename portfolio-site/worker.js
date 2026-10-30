// Cloudflare Worker: serves the site, stores your edits (KV) and, optionally, uploaded media (R2).
// Bindings (see wrangler.toml): ASSETS (static files), SITE (KV), MEDIA (R2, optional), secret ADMIN_TOKEN.

const JSON_HEADERS = { 'content-type': 'application/json', 'cache-control': 'no-store' };
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: JSON_HEADERS });

const MIME = {
  mp4: 'video/mp4', m4v: 'video/x-m4v', webm: 'video/webm', mov: 'video/quicktime',
  mkv: 'video/x-matroska', ogv: 'video/ogg',
  gif: 'image/gif', webp: 'image/webp', jpg: 'image/jpeg', jpeg: 'image/jpeg',
  png: 'image/png', avif: 'image/avif', svg: 'image/svg+xml',
};
const MAX_UPLOAD = 100 * 1024 * 1024;   // Workers request body limit on Free/Pro plans
const MAX_DATA = 24 * 1024 * 1024;      // KV value limit is 25 MiB

async function isAdmin(request, env) {
  const got = request.headers.get('authorization') || '';
  const want = 'Bearer ' + (env.ADMIN_TOKEN || '');
  if (!env.ADMIN_TOKEN || got.length !== want.length) return false;
  const enc = new TextEncoder();
  const a = enc.encode(got), b = enc.encode(want);
  return crypto.subtle.timingSafeEqual ? crypto.subtle.timingSafeEqual(a, b) : got === want;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // www.yourdomain.com -> yourdomain.com
    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.slice(4);
      return Response.redirect(url.toString(), 301);
    }

    // ---- site content (public read, admin write) ----
    if (path === '/api/site-data') {
      if (request.method === 'GET') {
        return new Response((await env.SITE.get('data')) || '{}', { headers: JSON_HEADERS });
      }
      if (request.method === 'PUT') {
        if (!(await isAdmin(request, env))) return json({ error: 'unauthorized' }, 401);
        const body = await request.text();
        if (body.length > MAX_DATA) return json({ error: 'too large' }, 413);
        try { JSON.parse(body); } catch { return json({ error: 'invalid json' }, 400); }
        await env.SITE.put('data', body);
        return json({ ok: true });
      }
      return json({ error: 'method not allowed' }, 405);
    }

    // ---- media upload (admin only) ----
    if (path === '/api/upload' && request.method === 'PUT') {
      if (!(await isAdmin(request, env))) return json({ error: 'unauthorized' }, 401);
      if (!env.MEDIA) return json({ error: 'Video storage (R2) is not turned on yet. See the README, "Videos" section.' }, 501);
      const name = (url.searchParams.get('name') || '').replace(/[^\w.\-]+/g, '_').slice(0, 120);
      const ext = (name.split('.').pop() || '').toLowerCase();
      if (!name || !MIME[ext]) return json({ error: 'unsupported file type' }, 400);
      const len = Number(request.headers.get('content-length') || 0);
      if (len > MAX_UPLOAD) return json({ error: 'file too large (100 MB max)' }, 413);
      await env.MEDIA.put(name, request.body, { httpMetadata: { contentType: MIME[ext] } });
      return json({ ok: true, url: '/media/' + name });
    }

    // ---- media playback (public, supports Range so videos can seek) ----
    if (path.startsWith('/media/') && (request.method === 'GET' || request.method === 'HEAD')) {
      if (!env.MEDIA) return new Response('Not found', { status: 404 });
      const key = decodeURIComponent(path.slice('/media/'.length));
      const obj = await env.MEDIA.get(key, { range: request.headers });
      if (!obj) return new Response('Not found', { status: 404 });
      const headers = new Headers();
      obj.writeHttpMetadata(headers);
      headers.set('etag', obj.httpEtag);
      headers.set('accept-ranges', 'bytes');
      headers.set('cache-control', 'public, max-age=31536000, immutable');
      let status = 200;
      if (obj.range && request.headers.has('range')) {
        const { offset = 0, length = obj.size - offset } = obj.range;
        headers.set('content-range', `bytes ${offset}-${offset + length - 1}/${obj.size}`);
        status = 206;
      }
      return new Response(request.method === 'HEAD' ? null : obj.body, { status, headers });
    }

    return env.ASSETS.fetch(request);
  },
};
