# Shunaya Retreats website

The Shunaya Retreats website. This static build is the final site: there's no WordPress rebuild. It goes live on the client's domain (see "Going live" below).

- `index.html`: homepage
- `bir.html`: landing page for the upcoming retreat, *The Undoing* (Bir, 24–27 Dec 2026), for Meta/Instagram ads

It's plain HTML, CSS and vanilla JS. There's no build step and nothing loads from a CDN: fonts, icons and images are all local.

## Run it locally

```bash
npx serve .
```

Then open the URL it prints (usually http://localhost:3000). Any static server works, e.g. `python3 -m http.server`. Opening the HTML files directly via `file://` mostly works, but the icon sprite needs a server.

**Review mode:** add `?review=1` to either URL (e.g. `http://localhost:3000/?review=1`). Every placeholder, draft and unconfirmed item gets a yellow highlight and a "TBC" tag; hover one to read its note. Links between the two pages keep review mode on. The full list is in `ASSUMPTIONS.md` (kept locally, not in this repo).

## Where to edit things

Everything editable is in **`data.js`**:

| What | Where in `data.js` |
|---|---|
| WhatsApp number, emails, Instagram, Meta Pixel ID, form endpoint | `config` |
| Upcoming retreat (*The Undoing*): name, which letter becomes the ensō, dates, seats left, prices, booking amount, inclusions, hero photo, countdown target | `upcoming` |
| "What we do" partners and founders' note | `about` |
| Pillars | `pillars` |
| Past retreats (cards, galleries, itineraries) | `pastRetreats` |
| Testimonials, YouTube videos, Instagram card text | `testimonials`, `videos`, `instagramCta` |
| Brand logos | `brands` |
| Bir page: experiences, day-by-day, hosts, stay, FAQ | `bir` |

Every price, date, seat count and countdown on both pages reads from `data.js`, so change a value once and it updates everywhere. The `<meta>` / Open Graph tags in the HTML `<head>` are the exception: they're static, so update them by hand if the dates change.

**Seats:** set `upcoming.seatsLeft`. While it equals `seatsTotal` the site shows "18 seats"; after that it shows "N seats left", and "Sold out" at 0.

**Form:** each booking becomes a row in the Google Sheet "Shunaya – Booking leads" (Vedant's Drive). The columns match the form: submitted at, retreat, full name, email, WhatsApp number, travelling from, seats, room type and notes.
- `config.formEndpoint` is the web-app URL of the Apps Script attached to that sheet. Its source is in `integrations/google-sheet-form.gs`.
- The form posts JSON as `text/plain`, which avoids a CORS preflight that Apps Script can't answer.
- Each booking also emails an alert to theshunayaretreats@gmail.com (`ALERT_EMAIL` in the script, sent from the script owner's Gmail). Replying to an alert goes to the guest. The address is set in the script, not on the site, so the endpoint can't be used to email anyone else.
- A hidden `website` field catches spam bots.
- **WhatsApp number:** a 10-digit Indian mobile (the form shows a fixed +91), or any number typed with `+` and its country code.
- If `formEndpoint` is empty, submissions are logged to the browser console instead.
- **What the visitor sees:** "Thank you, {name}. Your request for The Undoing is in…".
- **Fallback:** a "Continue on WhatsApp" button, with their details prefilled, appears only if the booking didn't reach the sheet. That covers an error, no answer within 10 seconds, or no `formEndpoint` set.
- **To change the columns:** edit the script, then use Deploy → Manage deployments → edit → New version. That keeps the same URL.
- **If the sheet moves to another owner:** the new owner must create a new deployment (it runs as whoever deployed it), and `formEndpoint` must be updated to the new URL.

**Meta Pixel:** set `config.metaPixelId` (still empty; the client is sending the ID). The pixel loads with a PageView, and every form submit fires `fbq('track', 'Lead')`.

## Preview (GitHub Pages)

- Site: https://vedant15-boop.github.io/shunaya-prototype/ (homepage) and https://vedant15-boop.github.io/shunaya-prototype/bir.html (The Undoing page)
- Review mode: add `?review=1`, e.g. https://vedant15-boop.github.io/shunaya-prototype/?review=1
- This preview rebuilds on every push too, so it's a handy staging copy. The live site is https://theshunaya.in.
- Code: https://github.com/vedant15-boop/shunaya-prototype

To publish an update, commit and push; GitHub rebuilds the site in a minute or two:

```bash
git add -A && git commit -m "Describe the change" && git push
```

`.gitignore` keeps `source-raw/`, `content/`, `ASSUMPTIONS.md` and the internal brief/plan files out of the repo.

## Going live (GoDaddy, theshunaya.in)

The site is hosted on the client's GoDaddy cPanel hosting. This GitHub repo is the master copy: **every push to `main` that changes a site file uploads the changed files to GoDaddy automatically** (`.github/workflows/deploy.yml`). Never edit files on the server directly, because the next deploy overwrites them.

**What goes online:** `index.html`, `bir.html`, `data.js`, `.htaccess`, `css/`, `js/` and `assets/` (198 files, about 24 MB). Nothing else in this repo is uploaded.

**One-time setup:**
1. **GoDaddy, done by the client:**
   - Back up the current WordPress site, then move it out of `public_html`.
   - Create a dedicated FTP account (cPanel → FTP Accounts) whose directory is `public_html`.
   - Make sure SSL is active for theshunaya.in.
2. **GitHub, done by Vedant:** add three repository secrets under Settings → Secrets and variables → Actions: `FTP_SERVER`, `FTP_USERNAME` and `FTP_PASSWORD`. Until they exist, the deploy skips with a notice instead of failing.
3. **First upload:** Actions → "Deploy to GoDaddy" → Run workflow. This uploads everything once; after that, only changed files go up.
4. **After the first upload:**
   - Send one test booking on https://theshunaya.in, check the sheet row and the alert email, then delete the row.
   - Once https opens with a padlock, turn on the https redirect at the bottom of `.htaccess`.

**`.htaccess`:**
- Serves `index.html` as the homepage, even if old `index.php` files are still in the folder.
- Compresses text files and sets browser caching: pages always fresh, CSS/JS for 1 hour, photos for 7 days.
- Blocks the deploy's state file from the web.
- Every rule is guarded, so a missing server module can't take the site down. It was tested on Apache 2.4, with and without the optional modules.

**Fallback (no FTP access):** upload a zip of the site files into `public_html` by hand. Build it with:

```bash
mkdir -p release && rsync -a --exclude .DS_Store index.html bir.html data.js .htaccess css js assets /tmp/shunaya-site/ && (cd /tmp/shunaya-site && zip -qrX - .) > release/shunaya-website.zip
```

**Search and sharing:**
- Both pages have a canonical tag pointing to theshunaya.in, so the GitHub Pages preview copy doesn't compete with the live site in Google.
- The link-preview image (`og:image`) also points at theshunaya.in, so previews only show it once the site is live there.

**Still to add:** the Meta Pixel ID (`config.metaPixelId`), once the client sends it. Push the change and it deploys.

## Folder map

```
index.html, bir.html     the two pages
data.js                  all content and business config
css/styles.css           styles (mobile-first; brand tokens at the top)
js/main.js               countdown, booking form, glimpse modal, carousels, video thumbnails, review mode
assets/fonts/            Playfair Display + Jost (self-hosted, from the current site's fonts)
assets/icons/icons.svg   Phosphor icon sprite (light weight, MIT)
assets/img/              web-sized photos (name.webp ≤2000px, name-sm.webp ≤900px), brand logos, OG image, video thumbnails
assets/img/gallery/      client-supplied retreat galleries, one folder per retreat (+ hero/); each photo has -sm and -th (thumbnail) sizes
assets/logo/             logo sizes, favicons, iOS home-screen icon
content/, source-raw/, ASSUMPTIONS.md, release/   working files (scraped content, originals, open items, upload zips) — kept locally, not in this repo
.htaccess                server settings for GoDaddy (homepage, caching, compression)
.github/workflows/       automatic upload to GoDaddy on every push to main
```

## Motion and the ensō cursor (`js/motion.js`)

The brand's zero, *Shunya*, is drawn as an **ensō**, the Zen circle painted in a single brushstroke whose empty centre stands for emptiness. It appears in four places:

- **Cursor (mouse/trackpad only).** A dot inside an open brushed ensō that follows on a spring and slowly turns.
  - Over links and buttons, the ensō closes into a full circle and buttons pull slightly toward the pointer.
  - Over photos, videos and carousels, it opens into an ink disc reading *Look*, *Play* or *Drag*.
  - A click sends out an ensō ripple, like a drop on still water.
  - Over dark sections it turns sand-coloured so it stays visible. Over form fields the normal text cursor returns.
- **Headings and graphics.**
  - The "o" in "The Undoing" is a painted ensō (set by `upcoming.ensoLetter`).
  - Large ensōs paint themselves as you scroll to "Everything begins at zero" and to the closing line, "From zero".
  - Brushed rings wrap the host portraits.
  - The photo placeholders carry an ensō mark.
- **Touch.** Tapping a button or card on a phone sends out the same ensō ripple.
- **Everything else.**
  - The hero eases in, and sections rise into view as you scroll.
  - The hero photo has a slight parallax.
  - Carousels can be dragged with a mouse and have a progress line and an "01 / 05" counter.
  - A very light paper-grain texture sits over the page.

Notes:
- **Reduced motion:** visitors with "reduce motion" turned on see everything immediately, without animation, lag or ripples.
- **No dependencies:** there are no libraries and no smooth-scroll hijacking. If `motion.js` fails to load, content still shows (a 3-second fallback removes the hidden-until-revealed state).
- **The brush shape** is generated once and inlined as SVG path data at the top of `motion.js` (`ENSO_D`, plus a heavier `ENSO_BOLD_D` for headings).

## Notes

- **Hero text lives in two places.** The hero's dates, place, seats, tagline and price are in `data.js` and also written into both HTML files, so nothing jumps while the script loads. If you change any of them in `data.js`, change the hero text in `index.html` and `bir.html` too. Otherwise the old value shows for a split second.
- **Brand:**
  - Fonts: Playfair Display (headings) and Jost (body), the same as the old site.
  - Colours: sand `#F5F1EA`, charcoal `#1E1E1E`, sage `#7A8F7C`, sage-deep `#566A58` (small labels), forest `#2B3A2C`, and navy `#071B38` (taken from the logo).
  - Buttons are pill-shaped.
- **Motion hooks** (plain attributes):
  - `data-reveal` and `data-stagger`: scroll reveals.
  - `data-enso` / `data-enso="draw"`: an ensō graphic, static or painted on scroll.
  - `data-enso-zero` on a heading: draws its "o" as an ensō.
  - `data-cursor="look|play|drag"`: the cursor label.
  - `data-drag`: mouse drag on a carousel.
  - `.section--dark`: the light cursor colour.

## Local preview with no caching

`.claude/serve.py` is a tiny static server that disables browser caching, so CSS/JS edits show on a normal reload:

```bash
python3 .claude/serve.py 4174
```
