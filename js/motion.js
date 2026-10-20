/*
 * Shunaya: motion layer (progressive enhancement; the site works without it).
 *
 *   - Ensō cursor (mouse/trackpad only): the hand-drawn zero of Zen, which
 *     closes around links, opens into a disc over media, ripples on click
 *   - Ensō graphics that paint themselves as they scroll into view
 *   - Hero intro, scroll reveals, gentle hero parallax
 *   - Magnetic buttons, drag-to-scroll rails, rail progress + counters
 *   - Ensō ripple on tap (touch devices)
 *
 * Everything respects prefers-reduced-motion. Self-contained: in WordPress it
 * can be added once as a site-wide code snippet together with the "Motion" and
 * "Ensō cursor" blocks from css/styles.css.
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  window.__motion = true;
  root.classList.add('js');

  /* ---------- The ensō (brush-stroke zero) ---------- */

  // Filled brush shape, 100x100 box; generated once (pressed start, dry tail, open gap)
  var ENSO_D = 'M70.4 11.7 L72.3 12.5 L74.1 13.5 L75.9 14.6 L77.6 15.9 L79.1 17.3 L80.5 18.8 L81.8 20.5 L83.0 22.2 L84.0 24.0 L84.9 25.9 L85.8 27.7 L86.6 29.6 L87.3 31.4 L88.1 33.3 L88.8 35.1 L89.6 36.9 L90.3 38.8 L91.0 40.7 L91.6 42.6 L92.2 44.6 L92.6 46.6 L92.9 48.6 L93.1 50.7 L93.1 52.7 L92.9 54.8 L92.6 56.8 L92.1 58.8 L91.5 60.8 L90.8 62.7 L90.0 64.6 L89.1 66.4 L88.1 68.2 L87.1 69.9 L86.1 71.6 L84.9 73.3 L83.8 74.9 L82.5 76.5 L81.2 78.0 L79.9 79.4 L78.4 80.8 L76.8 82.0 L75.2 83.2 L73.5 84.2 L71.7 85.0 L69.8 85.8 L68.0 86.4 L66.1 87.0 L64.2 87.5 L62.4 87.9 L60.5 88.2 L58.6 88.6 L56.8 88.9 L54.9 89.2 L53.0 89.5 L51.2 89.8 L49.3 90.0 L47.3 90.2 L45.4 90.2 L43.4 90.2 L41.5 90.0 L39.6 89.7 L37.6 89.3 L35.8 88.7 L33.9 88.0 L32.2 87.1 L30.4 86.2 L28.8 85.2 L27.1 84.1 L25.6 82.9 L24.0 81.7 L22.5 80.4 L21.1 79.1 L19.7 77.8 L18.3 76.4 L17.0 74.9 L15.8 73.3 L14.7 71.7 L13.7 70.0 L12.8 68.2 L12.1 66.3 L11.6 64.4 L11.2 62.5 L10.9 60.6 L10.8 58.6 L11.0 56.6 L11.0 54.7 L11.2 52.9 L11.3 51.0 L11.5 49.1 L11.7 47.3 L12.0 45.5 L12.2 43.7 L12.5 41.9 L12.9 40.1 L13.3 38.3 L13.8 36.5 L14.4 34.8 L15.1 33.1 L15.9 31.4 L16.8 29.8 L17.9 28.3 L19.0 26.8 L20.2 25.4 L21.5 24.1 L22.8 22.8 L24.1 21.5 L25.5 20.3 L26.9 19.2 L28.4 18.0 L29.8 16.9 L31.3 15.8 L32.9 14.7 L34.5 13.8 L36.2 12.9 L38.0 12.2 L39.8 11.6 L41.6 11.2 L43.5 10.9 L45.4 10.9 L47.3 11.2 L47.3 11.8 L45.5 12.1 L43.7 12.4 L42.0 12.8 L40.2 13.4 L38.6 14.1 L37.0 14.9 L35.4 15.8 L33.9 16.9 L32.5 17.9 L31.2 19.0 L29.8 20.2 L28.6 21.3 L27.3 22.5 L26.1 23.7 L24.9 24.9 L23.8 26.2 L22.7 27.5 L21.7 28.8 L20.7 30.2 L19.8 31.6 L19.1 33.1 L18.4 34.7 L17.8 36.3 L17.4 37.9 L17.0 39.5 L16.7 41.1 L16.5 42.7 L16.2 44.4 L16.1 46.0 L15.9 47.6 L15.7 49.2 L15.5 50.9 L15.4 52.5 L15.3 54.2 L15.2 55.9 L15.4 57.6 L15.5 59.3 L15.7 61.0 L16.1 62.7 L16.6 64.4 L17.3 66.0 L18.1 67.6 L19.0 69.0 L20.0 70.4 L21.1 71.8 L22.3 73.0 L23.6 74.2 L24.8 75.3 L26.2 76.4 L27.5 77.5 L28.9 78.5 L30.2 79.4 L31.7 80.4 L33.1 81.2 L34.6 82.0 L36.2 82.7 L37.8 83.2 L39.4 83.7 L41.1 84.0 L42.7 84.2 L44.4 84.3 L46.1 84.2 L47.7 84.1 L49.4 83.9 L51.0 83.6 L52.6 83.3 L54.1 83.0 L55.7 82.7 L57.2 82.3 L58.8 82.0 L60.3 81.7 L61.9 81.4 L63.5 81.0 L65.1 80.5 L66.6 80.0 L68.2 79.4 L69.6 78.6 L71.1 77.8 L72.4 76.8 L73.7 75.7 L74.9 74.6 L76.1 73.4 L77.1 72.1 L78.1 70.7 L79.1 69.4 L79.9 67.9 L80.8 66.5 L81.6 65.1 L82.4 63.6 L83.1 62.1 L83.8 60.5 L84.4 58.9 L84.9 57.3 L85.3 55.6 L85.5 53.9 L85.6 52.2 L85.5 50.5 L85.3 48.8 L84.9 47.2 L84.4 45.6 L83.8 44.0 L83.1 42.5 L82.4 41.0 L81.6 39.6 L80.7 38.2 L79.9 36.9 L79.0 35.6 L78.1 34.3 L77.2 33.0 L76.3 31.8 L75.4 30.6 L74.4 29.4 L73.4 28.3 L72.4 27.1 L71.3 26.1 L70.2 25.0 L69.0 24.0 L67.8 23.1 L66.5 22.2 L65.2 21.3 L64.1 20.5 L63.2 19.4 L62.6 18.1 L62.3 16.7 L62.5 15.3 L63.0 13.9 L63.8 12.8 L64.9 11.9 L66.2 11.3 L67.6 11.0 L69.0 11.2 Z';
  // Centre line used as a mask to "paint" the stroke in brush order
  var ENSO_ARC = 'M59.2 13.1 A38 38 0 1 1 51.3 12';
  // Heavier brush for use inside headings (the ensō letter in the retreat name)
  var ENSO_BOLD_D = 'M71.6 9.3 L73.7 10.2 L75.7 11.3 L77.6 12.4 L79.4 13.8 L81.1 15.2 L82.7 16.8 L84.2 18.6 L85.5 20.4 L86.6 22.3 L87.7 24.3 L88.6 26.3 L89.5 28.3 L90.3 30.3 L91.0 32.4 L91.7 34.4 L92.4 36.4 L93.0 38.5 L93.6 40.6 L94.1 42.7 L94.6 44.8 L94.9 46.9 L95.1 49.1 L95.1 51.3 L95.0 53.5 L94.8 55.6 L94.4 57.8 L93.9 59.9 L93.2 61.9 L92.4 64.0 L91.5 65.9 L90.6 67.9 L89.5 69.7 L88.4 71.6 L87.3 73.4 L86.1 75.1 L84.8 76.8 L83.4 78.4 L82.0 80.0 L80.5 81.4 L78.9 82.8 L77.2 84.1 L75.4 85.2 L73.5 86.2 L71.6 87.1 L69.7 87.9 L67.7 88.5 L65.8 89.1 L63.8 89.6 L61.8 90.0 L59.8 90.4 L57.9 90.8 L55.9 91.1 L53.9 91.4 L51.9 91.6 L49.9 91.8 L47.9 91.9 L45.8 92.0 L43.8 91.9 L41.7 91.7 L39.7 91.4 L37.7 91.0 L35.7 90.4 L33.7 89.6 L31.9 88.8 L30.0 87.8 L28.3 86.8 L26.5 85.6 L24.9 84.4 L23.3 83.1 L21.7 81.8 L20.2 80.4 L18.7 79.0 L17.3 77.5 L16.0 75.9 L14.7 74.2 L13.6 72.5 L12.6 70.7 L11.7 68.9 L11.0 66.9 L10.4 64.9 L9.9 62.9 L9.6 60.9 L9.5 58.9 L9.4 56.9 L9.5 54.9 L9.6 52.9 L9.8 50.9 L10.0 49.0 L10.2 47.1 L10.5 45.2 L10.9 43.3 L11.3 41.4 L11.7 39.5 L12.2 37.7 L12.8 35.8 L13.4 34.0 L14.2 32.3 L15.2 30.6 L16.2 28.9 L17.3 27.4 L18.5 25.9 L19.8 24.4 L21.1 23.1 L22.5 21.8 L23.9 20.5 L25.4 19.3 L26.9 18.1 L28.4 17.0 L30.0 15.9 L31.6 14.9 L33.2 13.9 L35.0 13.0 L36.7 12.3 L38.6 11.7 L40.4 11.2 L42.4 10.9 L44.3 10.8 L46.2 10.9 L48.1 11.3 L50.0 12.3 L50.0 14.8 L48.3 15.3 L46.7 15.5 L45.0 15.8 L43.4 16.2 L41.8 16.7 L40.3 17.4 L38.8 18.1 L37.4 19.0 L36.0 19.9 L34.7 20.9 L33.5 21.9 L32.3 22.9 L31.1 24.0 L30.0 25.1 L28.9 26.2 L27.9 27.3 L26.9 28.5 L25.9 29.7 L25.0 30.9 L24.2 32.2 L23.4 33.5 L22.8 34.8 L22.2 36.2 L21.7 37.6 L21.3 39.1 L20.9 40.5 L20.6 42.0 L20.4 43.4 L20.2 44.9 L20.1 46.3 L20.0 47.8 L19.9 49.2 L19.7 50.7 L19.6 52.2 L19.6 53.6 L19.6 55.1 L19.6 56.7 L19.7 58.2 L20.0 59.7 L20.3 61.2 L20.8 62.7 L21.4 64.1 L22.1 65.4 L22.9 66.7 L23.9 68.0 L24.9 69.1 L25.9 70.2 L27.0 71.3 L28.2 72.3 L29.3 73.2 L30.5 74.1 L31.8 75.0 L33.0 75.8 L34.3 76.6 L35.6 77.3 L36.9 77.9 L38.3 78.5 L39.7 78.9 L41.2 79.3 L42.6 79.5 L44.1 79.6 L45.6 79.6 L47.0 79.6 L48.5 79.4 L49.9 79.2 L51.3 78.9 L52.7 78.7 L54.1 78.4 L55.4 78.1 L56.8 77.8 L58.1 77.5 L59.5 77.2 L60.8 76.9 L62.2 76.5 L63.6 76.1 L64.9 75.5 L66.2 74.9 L67.5 74.3 L68.7 73.5 L69.9 72.6 L70.9 71.6 L72.0 70.6 L72.9 69.5 L73.8 68.3 L74.6 67.2 L75.4 65.9 L76.2 64.7 L76.9 63.4 L77.6 62.2 L78.2 60.8 L78.8 59.5 L79.3 58.1 L79.8 56.7 L80.1 55.3 L80.3 53.8 L80.4 52.3 L80.3 50.9 L80.1 49.4 L79.8 48.0 L79.3 46.6 L78.7 45.2 L78.1 43.9 L77.4 42.7 L76.6 41.5 L75.8 40.4 L75.0 39.3 L74.2 38.2 L73.4 37.2 L72.6 36.1 L71.8 35.1 L71.0 34.1 L70.2 33.2 L69.4 32.2 L68.5 31.2 L67.6 30.3 L66.7 29.4 L65.8 28.5 L64.8 27.7 L63.8 26.9 L62.7 26.1 L60.7 24.6 L59.1 22.7 L58.1 20.5 L57.7 18.0 L57.9 15.6 L58.8 13.2 L60.2 11.2 L62.1 9.6 L64.4 8.6 L66.8 8.2 L69.3 8.4 Z';
  var ENSO_BOLD_ARC = 'M58.7 15.1 A36 36 0 1 1 53.8 14.2';
  var uid = 0;

  function ensoSVG(draw, bold) {
    var D = bold ? ENSO_BOLD_D : ENSO_D, ARC = bold ? ENSO_BOLD_ARC : ENSO_ARC;
    if (!draw) return '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="' + D + '" fill="currentColor"/></svg>';
    var id = 'enso-mask-' + (++uid);
    return '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">' +
      '<defs><mask id="' + id + '" maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120">' +
      '<path class="enso-draw" d="' + ARC + '" pathLength="1" fill="none" stroke="#fff" stroke-width="' + (bold ? 30 : 20) + '"/></mask></defs>' +
      '<path d="' + D + '" fill="currentColor" mask="url(#' + id + ')"/></svg>';
  }

  // Inject into [data-enso] / [data-enso="draw"] placeholders under a root
  function mountEnso(scope) {
    (scope || document).querySelectorAll('[data-enso]:not([data-enso-ready])').forEach(function (el) {
      var mode = el.getAttribute('data-enso') || '';
      var draw = mode.indexOf('draw') === 0, bold = /bold/.test(mode);
      el.classList.add('enso');
      el.setAttribute('data-enso-ready', '');
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = ensoSVG(draw, bold);
      if (draw) {
        if (REDUCED) el.classList.add('is-drawn');
        else watch(el, function () { el.classList.add('is-drawn'); });
      }
    });
  }

  // Draws one letter of a heading as a painted ensō, e.g. the "o" in "The Undoing"
  // (data-enso-zero="o"; defaults to "0"). The real text is kept for screen readers.
  function ensoZero() {
    document.querySelectorAll('[data-enso-zero]').forEach(function (el) {
      var ch = el.getAttribute('data-enso-zero') || '0';
      var text = el.textContent;
      var at = text.indexOf(ch);
      if (at === -1 || el.querySelector('.enso-zero')) return;
      var cls = /[a-z]/.test(ch) ? 'enso-zero enso-zero--lower' : 'enso-zero';
      // keep the word that holds the ensō together so it never breaks mid-word
      var start = text.lastIndexOf(' ', at) + 1, end = text.indexOf(' ', at); if (end === -1) end = text.length;
      var visual = escapeHTML(text.slice(0, start)) + '<span class="enso-word">' + escapeHTML(text.slice(start, at)) +
        '<span class="' + cls + '" data-enso="draw-bold"></span>' + escapeHTML(text.slice(at + 1, end)) + '</span>' + escapeHTML(text.slice(end));
      el.innerHTML = '<span class="sr-only">' + escapeHTML(text) + '</span><span aria-hidden="true">' + visual + '</span>';
      mountEnso(el);
      el.querySelectorAll('.enso-zero').forEach(function (z) { z.style.setProperty('--enso-delay', '.55s'); });
    });
  }

  // Event target as an Element (events can target the document itself)
  function elOf(e) { var t = e.target; return t && t.closest ? t : document.documentElement; }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }

  /* ---------- Scroll reveals ---------- */

  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var cb = en.target.__onReveal;
      io.unobserve(en.target);
      if (cb) cb();
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }) : null;

  function watch(el, cb) {
    if (!io) { cb(); return; }
    el.__onReveal = cb;
    io.observe(el);
  }

  function initReveals() {
    // Stagger direct reveal-children of [data-stagger] containers
    document.querySelectorAll('[data-stagger]').forEach(function (group) {
      var i = 0;
      Array.prototype.forEach.call(group.children, function (child) {
        if (!child.hasAttribute('data-reveal')) child.setAttribute('data-reveal', '');
        child.style.setProperty('--d', (Math.min(i++, 6) * 0.09).toFixed(2) + 's');
      });
    });
    var pending = [];
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      if (REDUCED) { el.classList.add('is-in'); return; }
      pending.push(el);
      watch(el, function () { el.classList.add('is-in'); });
    });
    // Safety net for very fast scrolling: anything already scrolled past is revealed
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking || !pending.length) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        pending = pending.filter(function (el) {
          if (el.classList.contains('is-in')) return false;
          if (el.getBoundingClientRect().top < window.innerHeight * 0.9) { el.classList.add('is-in'); if (io) io.unobserve(el); return false; }
          return true;
        });
      });
    }, { passive: true });
  }

  /* ---------- Hero parallax ---------- */

  function initParallax() {
    var media = document.querySelector('.hero__media');
    var hero = document.querySelector('.hero');
    if (!media || !hero || REDUCED) return;
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY;
      if (y > hero.offsetHeight) return;
      media.style.transform = 'translate3d(0,' + (y * 0.28).toFixed(1) + 'px,0)';
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  }

  /* ---------- Rails: progress, counter, drag-to-scroll ---------- */

  function initRails() {
    document.querySelectorAll('.rail').forEach(function (rail) {
      var bar = rail.parentElement.querySelector('.rail-progress span');
      var count = rail.id ? document.querySelector('[data-rail-count="' + rail.id + '"]') : null;
      function update() {
        var max = rail.scrollWidth - rail.clientWidth;
        if (bar) bar.style.setProperty('--p', max > 0 ? Math.min(1, (rail.scrollLeft + rail.clientWidth) / rail.scrollWidth).toFixed(3) : 1);
        if (count && rail.children.length) {
          var step = rail.children[0].getBoundingClientRect().width + parseFloat(getComputedStyle(rail).columnGap || 0);
          var idx = max > 0 && rail.scrollLeft >= max - 2 ? rail.children.length : Math.round(rail.scrollLeft / step) + 1;
          count.textContent = pad(idx) + ' / ' + pad(rail.children.length);
        }
      }
      rail.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      update();
    });
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  // Mouse drag on [data-drag] scrollers (rails, gallery). Touch keeps native swipe.
  function initDrag() {
    var el = null, startX = 0, startScroll = 0, moved = false;
    document.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      var t = elOf(e).closest('[data-drag]');
      if (!t || elOf(e).closest('button:not(.retreat-card), a, input')) return;
      el = t; startX = e.clientX; startScroll = el.scrollLeft; moved = false;
    });
    document.addEventListener('pointermove', function (e) {
      if (!el) return;
      var dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) { moved = true; el.classList.add('is-dragging'); }
      if (moved) el.scrollLeft = startScroll - dx;
    });
    function end() {
      if (!el) return;
      var wasMoved = moved, target = el;
      el = null;
      if (wasMoved) {
        // glide to the next/previous item in the direction of the drag
        var first = target.children[0];
        var step = first ? first.getBoundingClientRect().width + (parseFloat(getComputedStyle(target).columnGap) || 0) : target.clientWidth;
        var delta = target.scrollLeft - startScroll;
        var idx = Math.abs(delta) < step * 0.12 ? Math.round(startScroll / step) : (delta > 0 ? Math.ceil(target.scrollLeft / step) : Math.floor(target.scrollLeft / step));
        target.scrollTo({ left: idx * step, behavior: REDUCED ? 'auto' : 'smooth' });
        setTimeout(function () { target.classList.remove('is-dragging'); }, REDUCED ? 0 : 450);
      } else {
        target.classList.remove('is-dragging');
      }
      if (wasMoved) {
        // swallow the click that ends a drag
        var stop = function (ev) { ev.stopPropagation(); ev.preventDefault(); };
        document.addEventListener('click', stop, { capture: true, once: true });
        setTimeout(function () { document.removeEventListener('click', stop, { capture: true }); }, 0);
      }
    }
    document.addEventListener('pointerup', end);
    document.addEventListener('pointercancel', end);
  }

  /* ---------- Magnetic buttons ---------- */

  function initMagnetic() {
    if (!FINE || REDUCED) return;
    var current = null;
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var m = elOf(e).closest('.btn, .icon-btn');
      if (m && m.closest('.countdown-bar')) m = null;
      if (current && current !== m) reset(current);
      current = m;
      if (!m) return;
      var r = m.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
      var dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
      m.style.setProperty('--mx', clamp(dx, -10, 10).toFixed(1) + 'px');
      m.style.setProperty('--my', clamp(dy, -7, 7).toFixed(1) + 'px');
    }, { passive: true });
    function reset(m) { m.style.setProperty('--mx', '0px'); m.style.setProperty('--my', '0px'); }
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* ---------- Ripple (click with mouse, tap on touch) ---------- */

  function isDarkAt(target) {
    return !!(target && target.closest && target.closest('[data-cursor-dark], .section--dark, .hero, .site-header, .site-footer, .countdown-bar, .gallery__track'));
  }

  function ripple(x, y, dark) {
    if (REDUCED) return;
    ['brush', 'line'].forEach(function (kind) {
      var r = document.createElement('div');
      r.className = 'enso-ripple enso-ripple--' + kind + (dark ? ' is-dark' : '');
      r.setAttribute('aria-hidden', 'true');
      r.style.left = x + 'px';
      r.style.top = y + 'px';
      r.innerHTML = kind === 'brush'
        ? ensoSVG(false)
        : '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
      if (kind === 'brush') r.firstChild.style.transform = 'rotate(' + Math.round(Math.random() * 360) + 'deg)';
      (document.querySelector('dialog[open]') || document.body).appendChild(r);
      r.addEventListener('animationend', function () { r.remove(); });
    });
  }

  function initTapRipple() {
    document.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse') return;
      var t = elOf(e).closest('a, button, summary, .room-option, [data-cursor]');
      if (t) ripple(e.clientX, e.clientY, isDarkAt(elOf(e)));
    }, { passive: true });
  }

  /* ---------- Ensō cursor ---------- */

  function initCursor() {
    if (!FINE) return;
    var c = document.createElement('div');
    c.className = 'cursor is-hidden';
    c.setAttribute('aria-hidden', 'true');
    c.innerHTML =
      '<div class="cursor__ring"><div class="cursor__body"><span class="cursor__disc"></span>' +
      '<div class="cursor__shape"><svg viewBox="0 0 100 100"><path d="' + ENSO_D + '" fill="currentColor"/>' +
      '<circle class="cursor__close" cx="50" cy="50" r="38" pathLength="1" transform="rotate(-90 50 50)"/></svg></div></div>' +
      '<span class="cursor__label"></span></div>' +
      '<div class="cursor__dot"><i></i></div>';
    document.body.appendChild(c);
    root.classList.add('has-cursor');

    var ring = c.querySelector('.cursor__ring');
    var dot = c.querySelector('.cursor__dot');
    var label = c.querySelector('.cursor__label');
    var mx = -100, my = -100, rx = -100, ry = -100, running = false, shown = false;
    var ease = REDUCED ? 1 : 0.2;

    function loop() {
      rx += (mx - rx) * ease;
      ry += (my - ry) * ease;
      ring.style.transform = 'translate3d(' + rx.toFixed(2) + 'px,' + ry.toFixed(2) + 'px,0)';
      if (Math.abs(mx - rx) + Math.abs(my - ry) > 0.1) requestAnimationFrame(loop);
      else running = false;
    }

    document.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
      if (!shown) { shown = true; rx = mx; ry = my; c.classList.remove('is-hidden'); }
      if (!running) { running = true; requestAnimationFrame(loop); }
    }, { passive: true });

    var LABELS = { look: 'Look', play: 'Play', drag: 'Drag' };
    document.addEventListener('pointerover', function (e) {
      if (e.pointerType !== 'mouse') return;
      var t = elOf(e);
      var hide = t.closest('input, textarea, select, iframe');
      var media = t.closest('[data-cursor]');
      var kind = media && media.getAttribute('data-cursor');
      var link = t.closest('a, button, summary, label, [role="button"], .room-option');
      c.classList.toggle('is-hidden', !!hide);
      c.classList.toggle('is-dark', isDarkAt(t));
      c.classList.toggle('is-media', !!(kind && LABELS[kind]));
      c.classList.toggle('is-link', !kind && !!link);
      if (kind && LABELS[kind]) label.textContent = LABELS[kind];
    });
    document.addEventListener('pointerout', function (e) {
      if (e.pointerType === 'mouse' && !e.relatedTarget) { c.classList.add('is-hidden'); shown = false; }
    });
    document.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      c.classList.add('is-press');
      ripple(e.clientX, e.clientY, isDarkAt(elOf(e)));
    });
    document.addEventListener('pointerup', function () { c.classList.remove('is-press'); });
    // Open dialogs sit in the top layer above the cursor; move the cursor into them
    var observer = new MutationObserver(function () {
      var open = document.querySelector('dialog[open]');
      var host = open || document.body;
      if (c.parentNode !== host) host.appendChild(c);
    });
    // watch every dialog, including ones added later (e.g. the full-story dialog)
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] });
  }

  /* ---------- Init ---------- */

  ensoZero();
  mountEnso(document);
  initReveals();
  initParallax();
  initRails();
  initDrag();
  initMagnetic();
  initTapRipple();
  initCursor();

  // Public hook for content rendered later (e.g. the booking thank-you state)
  window.ShunayaMotion = { mountEnso: mountEnso, ripple: ripple };
})();
