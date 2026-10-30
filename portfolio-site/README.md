# luislopezcreates.com on Cloudflare

Everything is configured for **luislopezcreates.com**. Your KV storage (for saved edits) is already created in
your Cloudflare account and its ID is already in `wrangler.toml`.

## What's in this folder
```
wrangler.toml      Cloudflare config (domain, storage)
worker.js          small backend: saves your edits, redirects www, plays uploaded videos
public/
  index.html  styles.css  app.js  editor.js   the website
  assets/                                     images and animations
  robots.txt  sitemap.xml  _headers           search engines, security headers, caching
```

## Step 1: Put your domain on Cloudflare (skip if it already shows "Active")
1. Cloudflare dashboard, **Domains** (or "Websites"), **Onboard a domain**, enter `luislopezcreates.com`, pick the **Free** plan.
2. Cloudflare shows two nameservers (like `xxx.ns.cloudflare.com`). Log in where you bought the domain
   (GoDaddy, Namecheap, Google/Squarespace Domains, etc.) and replace its nameservers with those two.
   If you bought the domain through Cloudflare Registrar, there is nothing to change.
3. Wait until the domain shows **Active** (usually minutes, up to a few hours).
4. **Delete old records** for the root domain and `www` in Cloudflare, DNS, Records (for example a leftover
   `A` or `CNAME` pointing to an old website builder). Cloudflare can't attach your site to a name that already
   has one of these.
5. SSL/TLS, Edge Certificates: turn on **Always Use HTTPS**.

## Step 2: Deploy (about 5 minutes)
Install Node.js from nodejs.org. Open a terminal in this folder and run:

```
npx wrangler login
npx wrangler secret put ADMIN_TOKEN
npx wrangler deploy
```

- `secret put` asks you to type a password. Make it long and random and **save it in a password manager**.
  This is your admin token. It's what lets you publish edits.
- `deploy` uploads the site and connects `luislopezcreates.com` and `www.luislopezcreates.com`. Cloudflare creates the DNS
  records and HTTPS certificate on its own. `www` forwards to the main address.
- It also stays reachable at `https://luis-portfolio.<your-account>.workers.dev`. Test there first if you like.

If deploy says the domain isn't on your account or has an existing record, finish Step 1 (items 3 and 4) and run `npx wrangler deploy` again.

## Editing your live site
1. Visit **https://luislopezcreates.com/?edit**. Visitors never see the editor buttons.
2. Click **Edit site** (content) or **Colors**. Changes show instantly for you as a draft in your browser.
3. Open the **Data** tab, paste your admin token under *Publish to your live site*, press **Publish changes**.
   Everyone sees the update. (Your token is remembered in that browser.)

Data tab, **Download data (.json)**, makes a backup. **Import** restores it.

## Videos (optional)
The editor accepts **MP4, WebM, MOV and MKV** wherever you can add media (Motion items, project thumbnails,
project galleries). Videos autoplay muted and loop like GIFs. Tick "Show video player controls" to let visitors
pause and unmute.

- **Without R2:** videos up to about 2.5 MB can be added directly, or paste a link to a video hosted elsewhere.
- **With R2 (recommended for real videos, up to 100 MB each):** turn on R2 in the Cloudflare dashboard (needs a
  payment method; the free 10 GB allowance is plenty), run `npx wrangler r2 bucket create portfolio-media`,
  remove the `#` from the three `r2_buckets` lines in `wrangler.toml`, and run `npx wrangler deploy` again.
  Then enter your admin token (Data tab) and upload videos in the editor. They play from your own site.
- **Best compatibility: MP4 with H.264 video and AAC audio.** WebM works in all modern browsers. MOV works when
  it contains H.264 (most iPhone and Mac exports do). Most browsers can't play MKV, so convert it first:
  `ffmpeg -i in.mkv -c:v libx264 -c:a aac out.mp4` (or use the free HandBrake app).

## Troubleshooting
- **"Could not publish: wrong token"**: the token must match the one you typed in `secret put`. Run that command again to change it.
- **Domain shows an error page / not found**: the domain isn't Active yet, or an old DNS record is in the way (Step 1).
- **Edits don't show for visitors**: you saved a draft but didn't press Publish in the Data tab.
- **Old content after a redeploy**: do a hard refresh (Cmd/Ctrl + Shift + R).
