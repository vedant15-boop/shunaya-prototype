/*
 * Shunaya: shared behaviour for index.html and bir.html.
 * Reads everything from window.SHUNAYA (data.js). No dependencies.
 */
(function () {
  'use strict';

  var D = window.SHUNAYA;
  var C = D.config;
  var U = D.upcoming;
  var ICONS = 'assets/icons/icons.svg';
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var REVIEW = new URLSearchParams(location.search).get('review') === '1';

  /* ---------- Helpers ---------- */

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function icon(name, cls) {
    return '<svg class="icon ' + (cls || '') + '" aria-hidden="true"><use href="' + ICONS + '#i-' + name + '"></use></svg>';
  }

  function inr(n) { return '₹' + Number(n).toLocaleString('en-IN'); }

  // 'YYYY-MM-DD' → {y, m, d} without timezone shifts
  function parts(iso) { var p = iso.split('-').map(Number); return { y: p[0], m: p[1] - 1, d: p[2] }; }

  // formatRange('2026-12-24', '2026-12-27', true, true) → '24–27 December 2026'
  function formatRange(start, end, longMonth, withYear) {
    var a = parts(start), b = parts(end);
    var mon = function (m) { return longMonth ? MONTHS[m] : MONTHS[m].slice(0, 3); };
    var out;
    if (a.y === b.y && a.m === b.m) out = a.d + '–' + b.d + ' ' + mon(b.m);
    else if (a.y === b.y) out = a.d + ' ' + mon(a.m) + ' – ' + b.d + ' ' + mon(b.m);
    else return a.d + ' ' + mon(a.m) + ' ' + a.y + ' – ' + b.d + ' ' + mon(b.m) + ' ' + b.y;
    return withYear ? out + ' ' + b.y : out;
  }

  // Returns the TBC note for a field of an item (or for the whole item), else ''
  function tbcOf(item, field) {
    if (!item || !item.tbc) return '';
    if (typeof item.tbc === 'string') return field ? '' : item.tbc;
    return field ? (item.tbc[field] || '') : '';
  }
  function tbcAttr(note) { return note ? ' data-tbc="' + esc(note) + '" title="TBC: ' + esc(note) + '"' : ''; }

  function priceFrom() { return Math.min.apply(null, U.rooms.map(function (r) { return r.price; })); }

  function seatsText() {
    if (U.seatsLeft <= 0) return 'Sold out';
    return U.seatsLeft === U.seatsTotal ? U.seatsTotal + ' seats' : U.seatsLeft + ' seats left';
  }

  function waLink(text) { return 'https://wa.me/' + C.whatsappNumber + (text ? '?text=' + encodeURIComponent(text) : ''); }

  /* ---------- Data bindings: [data-bind], [data-href] ---------- */

  var BIND = {
    'upcoming.name': [U.name],
    'upcoming.place': [U.place],
    'upcoming.region': [U.region],
    'upcoming.datesShort': [formatRange(U.startDate, U.endDate, false, false)],
    'upcoming.datesLong': [formatRange(U.startDate, U.endDate, true, true)],
    'upcoming.length': [U.days + ' days · ' + U.nights + ' nights'],
    'upcoming.seats': [seatsText()],
    'upcoming.promise': [U.promise],
    'upcoming.priceFrom': [inr(priceFrom())],
    'upcoming.bookingAmount': [inr(U.bookingAmount)],
    'about.title': [D.about.title],
    'config.whatsappDisplay': [C.whatsappDisplay, tbcOf(C, 'whatsappNumber')],
    'config.contactEmail': [C.contactEmail],
    'config.instagramHandle': [C.instagramHandle],
    'stay.name': [D.bir.stay.name],
    'stay.kind': [D.bir.stay.kind],
    'stay.text': [D.bir.stay.text, tbcOf(D.bir.stay, 'text')],
    'year': [String(new Date().getFullYear())]
  };

  var HREF = {
    whatsapp: waLink(''),
    email: 'mailto:' + C.contactEmail,
    instagram: C.instagramUrl
  };

  // "*word*" in data.js → <em>word</em> (used for italic accents in headings)
  function rich(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>'); }

  function applyBindings() {
    $$('[data-bind]').forEach(function (el) {
      var b = BIND[el.getAttribute('data-bind')];
      if (!b) return;
      if (el.hasAttribute('data-rich')) el.innerHTML = rich(b[0]);
      else el.textContent = b[0];
      if (b[1]) { el.setAttribute('data-tbc', b[1]); el.title = 'TBC: ' + b[1]; }
    });
    $$('[data-enso-zero]').forEach(function (el) { el.setAttribute('data-enso-zero', U.ensoLetter || '0'); });
    $$('[data-href]').forEach(function (el) {
      var h = HREF[el.getAttribute('data-href')];
      if (!h) return;
      el.href = h;
      if (/^https?:/.test(h)) { el.target = '_blank'; el.rel = 'noopener'; }
    });
    $$('[data-tbc-from]').forEach(function (el) {
      var path = el.getAttribute('data-tbc-from').split('.');
      var note = path[0] === 'bir' ? D.bir[path[1]] : tbcOf(D[path[0]], path[1]);
      if (note) { el.setAttribute('data-tbc', note); el.title = 'TBC: ' + note; }
    });
  }

  /* ---------- Countdown ---------- */

  function tickCountdown() {
    var els = $$('[data-countdown]');
    if (!els.length) return;
    var start = Date.parse(U.countdownTo);
    var end = Date.parse(U.endDate + 'T23:59:59+05:30');
    var now = Date.now();
    var text, label = 'starts in';
    if (now >= end) { text = 'has ended'; label = ''; }
    else if (now >= start) { text = 'happening now'; label = ''; }
    else {
      var mins = Math.floor((start - now) / 60000);
      var d = Math.floor(mins / 1440), h = Math.floor((mins % 1440) / 60), m = mins % 60;
      text = d + 'd ' + h + 'h ' + m + 'm';
    }
    els.forEach(function (el) { el.textContent = text; });
    $$('[data-countdown-label]').forEach(function (el) { el.textContent = label; });
  }

  /* ---------- Homepage: What we do (approved copy) ---------- */

  function renderAbout() {
    var el = $('#about-copy');
    if (!el) return;
    var A = D.about;
    el.innerHTML =
      '<p class="about-copy__intro">' + esc(A.intro) + '</p>' +
      '<ul class="about-copy__lines">' + A.lines.map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ul>' +
      A.outro.map(function (p, i) { return '<p' + (i === 0 ? ' class="about-copy__turn"' : '') + '>' + esc(p) + '</p>'; }).join('');
  }

  /* ---------- Homepage: pillars ---------- */

  function renderPillars() {
    var el = $('#pillars');
    if (!el) return;
    el.innerHTML = D.pillars.map(function (p) {
      return '<article class="pillar">' +
        '<div class="pillar__img"><img src="' + esc(p.image) + '" alt="' + esc(p.imageAlt) + '" loading="lazy" width="900" height="600"></div>' +
        '<div class="pillar__body">' +
          '<p class="pillar__num">' + esc(p.number) + '</p>' +
          '<h3>' + esc(p.name) + '</h3>' +
          '<p>' + esc(p.lead) + '</p>' +
          '<p class="pillar__exp"><span class="pillar__exp-label">What you’ll experience:</span> ' + rich(p.experience) + '</p>' +
        '</div></article>';
    }).join('');
  }

  /* ---------- Homepage: past retreats + glimpse modal ---------- */

  function renderPastRetreats() {
    var el = $('#past-retreats');
    if (!el) return;
    el.innerHTML = D.pastRetreats.map(function (r, i) {
      return '<button type="button" class="retreat-card" data-glimpse="' + i + '" data-cursor="look" aria-haspopup="dialog">' +
        '<div class="retreat-card__img"' + tbcAttr(tbcOf(r, 'gallery')) + '>' +
          '<img src="' + esc(r.cardImage) + '" alt="" loading="lazy" width="600" height="750">' +
          '<span class="chip">' + esc(r.region) + '</span>' +
          '<span class="retreat-card__idx" aria-hidden="true">' + (i < 9 ? '0' : '') + (i + 1) + '</span>' +
        '</div>' +
        '<div class="retreat-card__body">' +
          '<h3 class="retreat-card__name">' + esc(r.name) + '</h3>' +
          '<p class="retreat-card__dates"><span' + tbcAttr(tbcOf(r, 'dates')) + '>' + esc(formatRange(r.startDate, r.endDate, false, true)) + '</span></p>' +
          '<p class="retreat-card__desc">' + esc(r.description) + '</p>' +
          '<span class="retreat-card__more">Take a look ' + icon('arrow-right') + '</span>' +
        '</div></button>';
    }).join('');
    el.addEventListener('click', function (e) {
      var card = e.target.closest('[data-glimpse]');
      if (card) openGlimpse(D.pastRetreats[+card.getAttribute('data-glimpse')]);
    });
  }

  function openGlimpse(r) {
    var dlg = $('#glimpse-dialog');
    if (!dlg) return;
    $('.dialog__title', dlg).textContent = r.name;
    var slides = r.gallery.map(function (g, i) {
      return '<div class="gallery__slide"><img src="' + esc(g[0]) + '-sm.webp" srcset="' + esc(g[0]) + '-sm.webp 900w, ' + esc(g[0]) + '.webp 2000w" sizes="(min-width: 768px) 760px, 100vw" alt="' + esc(g[1]) + '"' + (i > 1 ? ' loading="lazy"' : '') + '></div>';
    }).join('');
    $('.dialog__body', dlg).innerHTML =
      '<div class="gallery"' + tbcAttr(tbcOf(r, 'gallery')) + '><div class="gallery__stage">' +
        '<div class="gallery__track" tabindex="0" data-drag data-cursor="drag" aria-label="Photos from ' + esc(r.name) + '">' + slides + '</div>' +
        '<div class="gallery__nav"><button type="button" class="icon-btn" data-gal="-1" aria-label="Previous photo">' + icon('caret-left') + '</button>' +
        '<button type="button" class="icon-btn" data-gal="1" aria-label="Next photo">' + icon('caret-right') + '</button></div>' +
        '<span class="gallery__count" aria-live="polite">1 / ' + r.gallery.length + '</span></div>' +
        '<div class="gallery__thumbs" aria-label="Choose a photo">' + r.gallery.map(function (g, i) {
          return '<button type="button" class="gallery__thumb' + (i === 0 ? ' is-active' : '') + '" data-thumb="' + i + '" aria-label="Photo ' + (i + 1) + ': ' + esc(g[1]) + '">' +
            '<img src="' + esc(g[0]) + '-th.webp" alt="" loading="lazy" width="120" height="90"></button>';
        }).join('') + '</div>' +
      '</div>' +
      '<div class="glimpse__meta"><span class="chip">' + esc(r.region) + '</span>' +
        '<span' + tbcAttr(tbcOf(r, 'dates')) + '>' + esc(formatRange(r.startDate, r.endDate, true, true)) + '</span>' +
        '<span' + tbcAttr(tbcOf(r, 'length')) + '>' + esc(r.length) + '</span><span>' + esc(r.place) + '</span></div>' +
      '<p class="glimpse__desc">' + esc(r.description) + '</p>' +
      '<ol class="glimpse__days"' + tbcAttr(tbcOf(r, 'itinerary')) + '>' + r.itinerary.map(function (d) {
        return '<li><b>' + esc(d[0]) + '</b><span>' + esc(d[1]) + '</span></li>';
      }).join('') + '</ol>' +
      '<p class="glimpse__past">This retreat has already taken place.</p>';

    var track = $('.gallery__track', dlg);
    var count = $('.gallery__count', dlg);
    var thumbs = $$('.gallery__thumb', dlg);
    var current = 0;
    track.addEventListener('scroll', function () {
      var i = Math.round(track.scrollLeft / track.clientWidth);
      if (i === current) return;
      current = i;
      count.textContent = (i + 1) + ' / ' + r.gallery.length;
      thumbs.forEach(function (t, j) { t.classList.toggle('is-active', j === i); });
      var strip = thumbs[i] && thumbs[i].parentElement;
      if (strip) strip.scrollTo({ left: thumbs[i].offsetLeft - strip.clientWidth / 2 + thumbs[i].clientWidth / 2, behavior: 'smooth' });
    }, { passive: true });
    thumbs.forEach(function (t, j) {
      t.addEventListener('click', function () { track.scrollTo({ left: j * track.clientWidth, behavior: 'smooth' }); });
    });
    $$('[data-gal]', dlg).forEach(function (b) {
      b.addEventListener('click', function () {
        track.scrollBy({ left: track.clientWidth * +b.getAttribute('data-gal'), behavior: 'smooth' });
      });
    });
    openDialog(dlg);
  }

  /* ---------- Dialog helpers ---------- */

  function openDialog(dlg) {
    if (!dlg.open) dlg.showModal();
    document.documentElement.style.overflow = 'hidden';
    updateStickyCta();
  }
  function wireDialog(dlg) {
    dlg.addEventListener('close', function () {
      document.documentElement.style.overflow = '';
      updateStickyCta();
    });
    // click on backdrop closes
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    $$('[data-close]', dlg).forEach(function (b) { b.addEventListener('click', function () { dlg.close(); }); });
  }
  function wireDialogs() { $$('dialog').forEach(wireDialog); }

  /* ---------- Testimonials ---------- */

  function quoteParas(t) { return t.quote.split(/\n\n+/).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join(''); }
  function quoteWho(t) {
    var name = t.name || 'Guest name';
    return '<span class="avatar" aria-hidden="true">' + esc(name.charAt(0).toUpperCase()) + '</span>' +
      '<span><span class="quote-card__name"' + tbcAttr(t.name ? '' : 'Guest name not in source.') + '>' + esc(name) + '</span><br>' +
      '<span class="quote-card__retreat"' + tbcAttr(tbcOf(t, 'retreat')) + '>' + esc(t.retreat) + '</span></span>';
  }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  function renderTestimonials() {
    $$('[data-testimonials]').forEach(function (el) {
      el.innerHTML = D.testimonials.map(function (t, i) {
        return '<figure class="quote-card">' +
          '<svg class="quote-card__mark" aria-hidden="true"><use href="' + ICONS + '#i-quotes"></use></svg>' +
          '<blockquote>' + quoteParas(t) + '</blockquote>' +
          '<button type="button" class="quote-card__more" data-quote="' + i + '" hidden>Read the full story</button>' +
          '<figcaption class="quote-card__who">' + quoteWho(t) + '</figcaption></figure>';
      }).join('');
    });
    // All cards are the same size: long quotes are cut off and open in full in a dialog
    $$('.quote-card').forEach(function (card) {
      var bq = $('blockquote', card);
      if (bq.scrollHeight > bq.clientHeight + 2) { card.classList.add('is-clamped'); $('.quote-card__more', card).hidden = false; }
    });
    var qd = null;
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-quote]');
      if (!b) return;
      var t = D.testimonials[+b.getAttribute('data-quote')];
      if (!qd) {
        qd = document.createElement('dialog');
        qd.className = 'dialog dialog--narrow';
        qd.setAttribute('aria-labelledby', 'quote-dialog-title');
        qd.innerHTML = '<div class="dialog__bar"><p class="dialog__title" id="quote-dialog-title">In their words</p>' +
          '<button type="button" class="icon-btn" data-close aria-label="Close">' + icon('x') + '</button></div><div class="dialog__body"></div>';
        document.body.appendChild(qd);
        wireDialog(qd);
      }
      $('.dialog__body', qd).innerHTML = '<figure class="quote-full">' +
        '<svg class="quote-card__mark" aria-hidden="true"><use href="' + ICONS + '#i-quotes"></use></svg>' +
        '<blockquote>' + quoteParas(t) + '</blockquote><figcaption class="quote-card__who">' + quoteWho(t) + '</figcaption></figure>';
      openDialog(qd);
    });
    // Arrows move one card at a time
    $$('[data-rail-prev], [data-rail-next]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var track = document.getElementById(btn.getAttribute('aria-controls'));
        var first = track.children[0];
        var step = first ? first.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0) : track.clientWidth;
        var dir = btn.hasAttribute('data-rail-next') ? 1 : -1;
        track.scrollBy({ left: dir * step, behavior: 'smooth' });
      });
    });
  }

  /* ---------- Watch: inline video player + playlist ---------- */

  var PLAY_SVG = '<svg aria-hidden="true"><use href="' + ICONS + '#i-play-fill"></use></svg>';

  function posterHTML(v, i) {
    return '<button type="button" class="watch__poster" data-play data-cursor="play" aria-label="Play video: ' + esc(v.title) + '">' +
      '<img src="' + esc(v.poster) + '" alt="" loading="lazy" width="1280" height="720">' +
      '<span class="watch__play">' + PLAY_SVG + '</span>' +
      '<span class="watch__caption"><span class="watch__kicker">' + pad2((i || 0) + 1) + ' / ' + pad2(D.videos.length) + '</span><span class="watch__name">' + esc(v.title) + '</span></span></button>';
  }

  function playIn(player, i) {
    var v = D.videos[i];
    player.setAttribute('data-current', i);
    player.classList.add('is-playing');
    // YouTube is only contacted from here, after the visitor presses play
    player.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.id) +
      '?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="' + esc(v.title) + '" ' +
      'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>';
  }

  function renderWatch() {
    $$('[data-watch]').forEach(function (el) {
      var ig = D.instagramPost;
      el.innerHTML =
        '<div class="watch__player" data-player data-current="0">' + posterHTML(D.videos[0], 0) + '</div>' +
        '<div class="watch__side">' +
          '<p class="watch__label">' + D.videos.length + ' videos from our retreats</p>' +
          '<ol class="watch__list">' + D.videos.map(function (v, i) {
            return '<li><button type="button" class="watch__item' + (i === 0 ? ' is-active' : '') + '" data-video="' + i + '" aria-label="Play video: ' + esc(v.title) + '">' +
              '<span class="watch__thumb"><img src="' + esc(v.thumb) + '" alt="" loading="lazy" width="480" height="270"><span class="watch__mini">' + PLAY_SVG + '</span></span>' +
              '<span class="watch__meta"><span class="watch__num">' + pad2(i + 1) + '</span><span class="watch__title">' + esc(v.title) + '</span></span></button></li>';
          }).join('') + '</ol>' +
          '<a class="ig-slot" data-href="instagram"' + tbcAttr(tbcOf(ig)) + '>' + icon('instagram-logo') +
            '<span><strong>' + esc(C.instagramHandle) + '</strong><span>Instagram post</span></span></a>' +
        '</div>';
    });
    document.addEventListener('click', function (e) {
      var play = e.target.closest('[data-play]');
      var item = e.target.closest('[data-video]');
      if (!play && !item) return;
      var watch = (play || item).closest('[data-watch]');
      var player = $('[data-player]', watch);
      var i = item ? +item.getAttribute('data-video') : +player.getAttribute('data-current');
      $$('.watch__item', watch).forEach(function (b, j) { b.classList.toggle('is-active', j === i); });
      playIn(player, i);
    });
  }

  /* ---------- Brands ---------- */

  function renderBrands() {
    var el = $('#brands');
    if (!el) return;
    el.innerHTML = D.brands.map(function (b) {
      if (!b.logo) return '<li class="brand-slot brand-slot--empty"' + tbcAttr(tbcOf(b)) + '>' + esc(b.name) + '</li>';
      return '<li class="brand-slot"><img src="' + esc(b.logo) + '" alt="' + esc(b.name) + '" loading="lazy"' + (b.height ? ' style="--h:' + (+b.height) + 'px"' : '') + '></li>';
    }).join('');
  }

  /* ---------- Bir page ---------- */

  function placeholder(label) {
    return '<div class="ph"><span data-enso></span><span>' + esc(label) + '</span></div>';
  }

  function renderBir() {
    var exp = $('#bir-experiences');
    if (exp) {
      exp.innerHTML = D.bir.experiences.map(function (x) {
        var img = x.image
          ? '<img src="' + esc(x.image) + '" alt="' + esc(x.imageAlt) + '" loading="lazy" width="900" height="600">'
          : placeholder('Bir nature photo');
        return '<article class="exp-card"><div class="exp-card__img"' + tbcAttr(tbcOf(x, 'image')) + '>' + img + '</div>' +
          '<div class="exp-card__body"><h3>' + esc(x.name) + '</h3><p>' + esc(x.text) + '</p></div></article>';
      }).join('');
    }

    var days = $('#bir-days');
    if (days) {
      days.innerHTML = D.bir.itinerary.map(function (d) {
        var n = d.day.replace(/\D/g, '');
        return '<li class="day"><div class="day__top"><span class="day__num"><span class="sr-only">' + esc(d.day) + '</span><span aria-hidden="true">' + (n.length < 2 ? '0' : '') + esc(n) + '</span></span>' +
          '<span class="day__date">' + esc(d.date) + '</span></div>' +
          '<h3>' + esc(d.title) + '</h3><ul>' + d.items.map(function (it) { return '<li>' + esc(it) + '</li>'; }).join('') + '</ul></li>';
      }).join('');
    }

    var hosts = $('#bir-hosts');
    if (hosts) {
      hosts.innerHTML = D.bir.hosts.map(function (h, i) {
        return '<article class="host"><div class="host__photo"' + tbcAttr(tbcOf(h, 'photo')) + '><img src="' + esc(h.photo) + '" alt="' + esc(h.name) + '" loading="lazy">' +
          '<span class="host__ring" data-enso="draw" style="transform: rotate(' + (i * 137 + 20) + 'deg)"></span></div>' +
          '<div><h3' + tbcAttr(tbcOf(h, 'name')) + '>' + esc(h.name) + '</h3>' +
          (h.handle ? '<p class="host__handle">' + esc(h.handle) + '</p>' : '') +
          '<p class="host__role">' + esc(h.role) + '</p></div></article>';
      }).join('');
    }

    var stay = $('#bir-stay-gallery');
    if (stay) {
      var note = tbcOf(D.bir.stay, 'photos');
      stay.innerHTML = D.bir.stay.photos.map(function (src, i) {
        return '<div' + tbcAttr(src ? '' : note) + '>' + (src ? '<img src="' + esc(src) + '" alt="' + esc(D.bir.stay.name) + '" loading="lazy">' : placeholder(i === 0 ? D.bir.stay.name + ' photo' : 'Photo')) + '</div>';
      }).join('');
    }

    var rooms = $('#bir-rooms');
    if (rooms) {
      rooms.innerHTML = U.rooms.map(function (r) {
        return '<article class="room"><p class="room__name">' + esc(r.name) + '</p><p class="room__note">' + esc(r.note) + '</p>' +
          '<p class="room__price">' + inr(r.price) + '<small>per person</small></p>' +
          '<button type="button" class="btn btn--primary" data-reserve data-room="' + esc(r.id) + '">Reserve ' + esc(r.name.toLowerCase()) + '</button></article>';
      }).join('');
    }
    var inc = $('#bir-included');
    if (inc) inc.innerHTML = U.included.map(function (x) { return '<li>' + icon('check') + '<span>' + esc(x) + '</span></li>'; }).join('');
    var exc = $('#bir-excluded');
    if (exc) exc.innerHTML = U.notIncluded.map(function (x) { return '<li>' + icon('x') + '<span>' + esc(x) + '</span></li>'; }).join('');

    var faq = $('#bir-faq');
    if (faq) {
      faq.innerHTML = D.bir.faq.map(function (f) {
        return '<details><summary><span' + tbcAttr(tbcOf(f)) + '>' + esc(f.q) + '</span>' + icon('plus') + '</summary><div class="faq__a"><p>' + esc(f.a) + '</p></div></details>';
      }).join('');
      // one open at a time (like an Elementor accordion)
      faq.addEventListener('toggle', function (e) {
        if (!e.target.open) return;
        $$('details', faq).forEach(function (d) { if (d !== e.target) d.open = false; });
      }, true);
    }
  }

  /* ---------- Booking form (shared component) ---------- */

  function bookingFormHTML(withRoom, uid) {
    var rooms = withRoom ? (
      '<fieldset class="field" data-field="room"><legend>Room type</legend><div class="room-options">' +
      U.rooms.map(function (r, i) {
        return '<label class="room-option"><input type="radio" name="room" value="' + esc(r.id) + '"' + (i === 0 ? ' checked' : '') + '>' +
          '<span class="room-option__box"><span><strong>' + esc(r.name) + '</strong><small>' + esc(r.note) + '</small></span>' +
          '<span class="room-option__price">' + inr(r.price) + '</span></span></label>';
      }).join('') + '</div></fieldset>') : '';

    return '<form class="booking" novalidate>' +
      '<div class="booking__summary"><img src="' + esc(U.heroImageSm) + '" alt="" width="56" height="56">' +
        '<div><strong>' + esc(U.name) + '</strong><span>' + esc(formatRange(U.startDate, U.endDate, true, true)) + ' · ' + esc(U.place) + '</span></div></div>' +
      '<input type="hidden" name="retreat" value="' + esc(U.id) + '">' +
      '<div class="field" data-field="name"><label for="' + uid + '-name">Full name</label>' +
        '<div class="input-wrap"><input id="' + uid + '-name" name="name" type="text" autocomplete="name" autocapitalize="words" enterkeyhint="next" required></div>' +
        '<p class="field__error" id="' + uid + '-name-err">Please enter your full name.</p></div>' +
      '<div class="field-row">' +
        '<div class="field" data-field="email"><label for="' + uid + '-email">Email</label>' +
          '<div class="input-wrap"><input id="' + uid + '-email" name="email" type="email" autocomplete="email" inputmode="email" enterkeyhint="next" required></div>' +
          '<p class="field__error" id="' + uid + '-email-err">Please enter a valid email address.</p></div>' +
        '<div class="field" data-field="phone"><label for="' + uid + '-phone">WhatsApp number</label>' +
          '<div class="input-wrap"><span class="input-wrap__prefix" aria-hidden="true">+91</span>' +
          '<input id="' + uid + '-phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel-national" maxlength="14" placeholder="98765 43210" enterkeyhint="next" required aria-describedby="' + uid + '-phone-err"></div>' +
          '<p class="field__error" id="' + uid + '-phone-err">Please enter a 10-digit Indian mobile number.</p></div>' +
      '</div>' +
      '<div class="field-row">' +
        '<div class="field" data-field="city"><label for="' + uid + '-city">Travelling from <small>(optional)</small></label>' +
          '<div class="input-wrap"><input id="' + uid + '-city" name="city" type="text" autocomplete="address-level2" autocapitalize="words" placeholder="e.g. Delhi" enterkeyhint="next" maxlength="60"></div></div>' +
        '<div class="field" data-field="seats"><label for="' + uid + '-seats">Seats</label>' +
          '<div class="input-wrap input-wrap--select"><select id="' + uid + '-seats" name="seats">' + seatOptions() + '</select>' + icon('caret-right', 'select-caret') + '</div></div>' +
      '</div>' +
      rooms +
      '<div class="field" data-field="notes"><label for="' + uid + '-notes">Anything we should know? <small>(optional)</small></label>' +
        '<div class="input-wrap"><textarea id="' + uid + '-notes" name="notes" rows="3" maxlength="400" placeholder="Dietary needs, injuries, or questions about the retreat"></textarea></div></div>' +
      '<button type="submit" class="btn btn--primary btn--block">Reserve my seat ' + icon('arrow-right', 'btn__arrow') + '</button>' +
      '<p class="booking__fine">' + esc(inr(U.bookingAmount)) + ' reserves your seat. We’ll confirm on WhatsApp.</p>' +
      '</form>';
  }

  // Seats dropdown: 1 … min(maxSeatsPerBooking, seatsLeft)
  function seatOptions() {
    var max = Math.max(1, Math.min(U.maxSeatsPerBooking || 4, U.seatsLeft));
    var out = '';
    for (var n = 1; n <= max; n++) out += '<option value="' + n + '">' + n + (n === 1 ? ' seat' : ' seats') + '</option>';
    return out;
  }

  var VALID = {
    name: function (v) { return v.trim().replace(/\s+/g, ' ').length >= 2; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
    phone: function (v) { var d = v.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, ''); return /^[6-9]\d{9}$/.test(d); }
  };

  function validateField(form, name) {
    var input = form.elements[name];
    var wrap = form.querySelector('[data-field="' + name + '"]');
    var ok = VALID[name](input.value);
    wrap.classList.toggle('is-invalid', !ok);
    input.setAttribute('aria-invalid', String(!ok));
    return ok;
  }

  function mountBooking(container, withRoom, uid) {
    container.innerHTML = bookingFormHTML(withRoom, uid);
    var form = $('form', container);
    ['name', 'email', 'phone'].forEach(function (n) {
      var input = form.elements[n];
      input.setAttribute('aria-describedby', uid + '-' + n + '-err');
      input.addEventListener('blur', function () { if (input.value) validateField(form, n); });
      input.addEventListener('input', function () {
        if (form.querySelector('[data-field="' + n + '"]').classList.contains('is-invalid')) validateField(form, n);
      });
    });
    // format phone as "98765 43210"
    form.elements.phone.addEventListener('input', function (e) {
      var d = e.target.value.replace(/\D/g, '').slice(0, 12);
      if (d.length > 10 && /^(91|0)/.test(d)) d = d.replace(/^(91|0)/, '');
      e.target.value = d.length > 5 ? d.slice(0, 5) + ' ' + d.slice(5, 10) : d;
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = ['name', 'email', 'phone'].filter(function (n) { return !validateField(form, n); });
      if (bad.length) { form.elements[bad[0]].focus(); return; }
      submitBooking(form, container, withRoom, uid);
    });
  }

  function submitBooking(form, container, withRoom, uid) {
    var room = withRoom ? U.rooms.filter(function (r) { return r.id === form.elements.room.value; })[0] : null;
    var phoneDigits = form.elements.phone.value.replace(/\D/g, '').slice(-10);
    var payload = {
      retreat: U.name,
      retreatId: U.id,
      dates: formatRange(U.startDate, U.endDate, true, true),
      name: form.elements.name.value.trim().replace(/\s+/g, ' '),
      email: form.elements.email.value.trim(),
      whatsapp: '+91' + phoneDigits,
      room: room ? room.name : '',
      roomPrice: room ? room.price : '',
      seats: +form.elements.seats.value || 1,
      travellingFrom: form.elements.city.value.trim(),
      notes: form.elements.notes.value.trim(),
      page: location.pathname.split('/').pop() || 'index.html',
      submittedAt: new Date().toISOString(),
      notify: C.notificationEmail
    };

    // (1) POST to the form endpoint, or log the payload if none is configured
    var btn = form.querySelector('[type="submit"]');
    btn.disabled = true; btn.textContent = 'Sending…';
    var send = C.formEndpoint
      ? fetch(C.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(function (err) { console.warn('[Shunaya] Form endpoint failed; continuing to WhatsApp.', err); })
      : Promise.resolve(console.log('[Shunaya] No formEndpoint set in data.js. Booking payload:', payload));

    send.then(function () {
      // (2) Meta Pixel lead event
      if (typeof window.fbq === 'function') window.fbq('track', 'Lead', { content_name: U.name });

      // (3) Thank-you state + (4) WhatsApp hand-off
      var msg = 'Hi Shunaya, I’d like to reserve ' + (payload.seats > 1 ? payload.seats + ' seats' : 'a seat') + ' for ' + U.name + ' (' + (U.placeShort ? U.placeShort + ', ' : '') + formatRange(U.startDate, U.endDate, false, false) + '). Name: ' + payload.name + (room ? '. Room: ' + room.name : '') + '.';
      var first = payload.name.split(' ')[0];
      container.innerHTML =
        '<div class="booking__done" role="status" tabindex="-1">' +
          '<div class="booking__done-icon"><span data-enso="draw"></span></div>' +
          '<h3>Thank you, ' + esc(first) + '.</h3>' +
          '<p>Your request for ' + esc(U.name) + ' (' + esc(formatRange(U.startDate, U.endDate, false, false)) + ') is in. We’ll reach out on WhatsApp to confirm your seat and share how to pay the ' + esc(inr(U.bookingAmount)) + ' booking amount. Want to talk sooner? Message us now.</p>' +
          '<a class="btn btn--whatsapp btn--block" href="' + esc(waLink(msg)) + '" target="_blank" rel="noopener">' + icon('whatsapp-logo') + ' Continue on WhatsApp</a>' +
          '<button type="button" class="text-link" data-edit>Edit my details</button>' +
        '</div>';
      if (window.ShunayaMotion) window.ShunayaMotion.mountEnso(container);
      $('.booking__done', container).focus();
      $('[data-edit]', container).addEventListener('click', function () {
        mountBooking(container, withRoom, uid);
        var f = $('form', container);
        f.elements.name.value = payload.name; f.elements.email.value = payload.email;
        f.elements.phone.value = phoneDigits.slice(0, 5) + ' ' + phoneDigits.slice(5);
        f.elements.city.value = payload.travellingFrom; f.elements.seats.value = String(payload.seats); f.elements.notes.value = payload.notes;
        if (room) f.elements.room.value = room.id;
      });
    });
  }

  function wireBooking() {
    var inline = $('[data-booking-inline]');
    var modalHost = $('[data-booking-modal]');
    if (inline) mountBooking(inline, true, 'lp');
    if (modalHost) mountBooking(modalHost, false, 'm');
    var dlg = $('#booking-dialog');

    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-reserve]');
      if (!t) return;
      e.preventDefault();
      var room = t.getAttribute('data-room');
      if (inline) {
        // Landing page: bring the inline form into view, pre-set the room
        var form = $('form', inline);
        if (!form) { mountBooking(inline, true, 'lp'); form = $('form', inline); }
        if (room && form.elements.room) form.elements.room.value = room;
        $('#reserve').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        setTimeout(function () { form.elements.name.focus({ preventScroll: true }); }, 450);
      } else if (dlg) {
        if (!$('form', modalHost)) mountBooking(modalHost, false, 'm');
        openDialog(dlg);
        setTimeout(function () { var f = $('form', modalHost); if (f) f.elements.name.focus(); }, 60);
      }
    });
  }

  /* ---------- Sticky mobile CTA ---------- */

  var heroVisible = true;
  function updateStickyCta() {
    var cta = $('.sticky-cta');
    if (!cta) return;
    var anyOpen = $$('dialog').some(function (d) { return d.open; });
    cta.classList.toggle('is-visible', !heroVisible && !anyOpen);
  }
  function wireStickyCta() {
    var hero = $('.hero');
    if (!hero || !$('.sticky-cta') || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
      updateStickyCta();
    }, { threshold: 0.05 }).observe(hero);
  }

  /* ---------- Meta Pixel (only if an ID is set) ---------- */

  function loadPixel() {
    if (!C.metaPixelId) return;
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', C.metaPixelId);
    window.fbq('track', 'PageView');
  }

  /* ---------- Review mode ---------- */

  function reviewMode() {
    if (!REVIEW) return;
    document.documentElement.classList.add('review');
    // keep review mode on when moving between the two pages
    $$('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (/^(index|bir)\.html/.test(href)) {
        var parts = href.split('#');
        a.setAttribute('href', parts[0] + (parts[0].indexOf('?') > -1 ? '&' : '?') + 'review=1' + (parts[1] ? '#' + parts[1] : ''));
      }
    });
    var n = $$('[data-tbc]').length;
    var badge = document.createElement('div');
    badge.className = 'review-badge';
    badge.textContent = 'Review mode · ' + n + ' items to confirm';
    document.body.appendChild(badge);
  }

  /* ---------- Init ---------- */

  applyBindings();
  tickCountdown();
  setInterval(tickCountdown, 15000);
  renderAbout();
  renderPillars();
  renderPastRetreats();
  renderTestimonials();
  renderWatch();
  renderBrands();
  renderBir();
  applyBindings(); // second pass for links rendered above (e.g. Instagram slot)
  wireDialogs();
  wireBooking();
  wireStickyCta();
  loadPixel();
  reviewMode();
})();
