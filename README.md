# Shunaya: website prototype

A clickable prototype of the reworked Shunaya Retreats site, built for client approval before the WordPress (Elementor + Astra) build.

- `index.html`: homepage
- `bir.html`: Bir 2.0 landing page for Meta/Instagram ads

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
| Bir 2.0 dates, seats left, prices, booking amount, inclusions, countdown target | `upcoming` |
| "What we do" partners and founders' note | `about` |
| Pillars | `pillars` |
| Past retreats (cards, galleries, itineraries) | `pastRetreats` |
| Testimonials, YouTube videos, Instagram post | `testimonials`, `videos`, `instagramPost` |
| Brand logos | `brands` |
| Bir page: experiences, day-by-day, hosts, stay, FAQ | `bir` |

Every price, date, seat count and countdown on both pages reads from `data.js`, so change a value once and it updates everywhere. The `<meta>` / Open Graph tags in the HTML `<head>` are the exception: they're static, so update them by hand if the dates change.

**Seats:** set `upcoming.seatsLeft`. While it equals `seatsTotal` the site shows "15 seats"; after that it shows "N seats left", and "Sold out" at 0.

**Form:** set `config.formEndpoint` to a URL that accepts a JSON POST (Formspree, Make/n8n webhook, etc.). While it's empty, submissions are logged to the browser console. Either way the visitor sees a thank-you screen and a "Continue on WhatsApp" button with their details prefilled.

**Meta Pixel:** set `config.metaPixelId`. The pixel loads with a PageView, and every form submit fires `fbq('track', 'Lead')`.

## Share a preview

`source-raw/` (67 MB of scraped originals) and `content/` don't need to go online.

**Netlify Drop:** make a clean copy, then drag that folder onto https://app.netlify.com/drop:

```bash
rsync -a --exclude source-raw --exclude content --exclude .claude ./ ../shunaya-preview/
```

**Vercel:** from this folder (`.vercelignore` already excludes the source files):

```bash
npx vercel
```

After deploying, replace `https://theshunaya.in` in the `og:url` / `og:image` tags of both HTML files with the preview URL, so link previews on WhatsApp and Instagram show the Bir photo.

## Folder map

```
index.html, bir.html     the two pages
data.js                  all content and business config
css/styles.css           styles (mobile-first; brand tokens at the top)
js/main.js               countdown, booking form, glimpse modal, carousels, video thumbnails, review mode
assets/fonts/            Playfair Display + Jost (self-hosted, from the current site's fonts)
assets/icons/icons.svg   Phosphor icon sprite (light weight, MIT)
assets/img/              web-sized photos (name.webp ≤2000px, name-sm.webp ≤900px), brand logos, OG image, video thumbnails
assets/logo/             logo sizes, favicons, iOS home-screen icon
content/, source-raw/, ASSUMPTIONS.md   working files (scraped content, originals, open items) — kept locally, not in this repo
```

## Motion and the ensō cursor (`js/motion.js`)

The brand's zero, *Shunya*, is drawn as an **ensō**, the Zen circle painted in a single brushstroke whose empty centre stands for emptiness. It appears in four places:

- **Cursor (mouse/trackpad only).** A dot inside an open brushed ensō that follows on a spring and slowly turns.
  - Over links and buttons, the ensō closes into a full circle and buttons pull slightly toward the pointer.
  - Over photos, videos and carousels, it opens into an ink disc reading *Look*, *Play* or *Drag*.
  - A click sends out an ensō ripple, like a drop on still water.
  - Over dark sections it turns sand-coloured so it stays visible. Over form fields the normal text cursor returns.
- **Headings and graphics.**
  - The zero in "Bir 2.0" is a painted ensō.
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

## Notes for the WordPress build

- Each page section is a flat `<section>` → `.container` → heading → content, so each maps to one Elementor container.
- Components and their Elementor equivalents:
  - Countdown bar: Countdown widget (Essential Addons is already installed).
  - Retreat glimpse: Popup with an image carousel.
  - Testimonial rail: Testimonial or Loop carousel.
  - FAQ: Accordion.
  - Booking form: Elementor Form with a webhook action and a redirect to `wa.me`.
- Brand: Playfair Display (headings) and Jost (body), the same fonts the current sites load. Colors: sand `#F5F1EA`, charcoal `#1E1E1E`, sage `#7A8F7C`, forest `#2B3A2C`, and navy `#071B38` (taken from the logo). Buttons are pill-shaped.
- Motion and cursor: add `js/motion.js` plus the "Motion" and "Ensō cursor" blocks from `css/styles.css` once, as a site-wide code snippet. The hooks are plain attributes, which you can set with Elementor's custom attributes and CSS classes:
  - `data-reveal` and `data-stagger`: scroll reveals.
  - `data-enso` / `data-enso="draw"`: an ensō graphic, static or painted on scroll.
  - `data-enso-zero` on a heading: draws its "0" as an ensō.
  - `data-cursor="look|play|drag"`: the cursor label.
  - `data-drag`: mouse drag on a carousel.
  - `.section--dark`: the light cursor colour.

## Local preview with no caching

`.claude/serve.py` is a tiny static server that disables browser caching, so CSS/JS edits show on a normal reload:

```bash
python3 .claude/serve.py 4174
```
