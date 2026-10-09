// Hover-Effekt am Handy: Das Element, das gerade mittig im Bild steht, wird hervorgehoben
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (!window.matchMedia('(hover: none)').matches) return;

  var targets = document.querySelectorAll(
    '.usp li, .principles li, .process li, .tier, .card, .cta'
  );

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      entry.target.classList.toggle('is-active', entry.isIntersecting);
    });
  }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });

  targets.forEach(function (el) { observer.observe(el); });
})();

// Schnellzugriff (Anrufen / E-Mail) am Handy: erst nach dem Hero, nicht im Kontaktbereich
(function () {
  var dock = document.getElementById('dock');
  var hero = document.getElementById('top');
  var contact = document.getElementById('kontakt');
  var footer = document.querySelector('.site-footer');
  if (!dock || !hero || !contact || !('IntersectionObserver' in window)) return;

  var state = { heroGone: false, contactVisible: false, footerVisible: false };

  function update() {
    dock.classList.toggle('show', state.heroGone && !state.contactVisible && !state.footerVisible);
  }

  new IntersectionObserver(function (entries) {
    state.heroGone = !entries[0].isIntersecting;
    update();
  }, { rootMargin: '-50% 0px 0px 0px' }).observe(hero);

  new IntersectionObserver(function (entries) {
    state.contactVisible = entries[0].isIntersecting;
    update();
  }).observe(contact);

  if (footer) {
    new IntersectionObserver(function (entries) {
      state.footerVisible = entries[0].isIntersecting;
      update();
    }).observe(footer);
  }
})();

// Referenz-Fenster: Desktop-Ansicht der Website verkleinert darstellen, Handy: erst nach Tippen scrollbar
(function () {
  var body = document.getElementById('frame-wrap');
  var frame = document.getElementById('frame');
  if (!body || !frame) return;

  var VIRTUAL_WIDTH = 1280; // Breite, in der die Referenzseite gerendert wird

  function fit() {
    var w = body.clientWidth;
    var h = body.clientHeight;
    if (w >= 760) {
      var scale = Math.min(1, w / VIRTUAL_WIDTH);
      frame.style.width = VIRTUAL_WIDTH + 'px';
      frame.style.height = (h / scale) + 'px';
      frame.style.transform = 'scale(' + scale + ')';
    } else {
      frame.style.width = '';
      frame.style.height = '';
      frame.style.transform = '';
    }
  }

  fit();
  if ('ResizeObserver' in window) {
    new ResizeObserver(fit).observe(body);
  } else {
    window.addEventListener('resize', fit);
  }

  var activate = body.querySelector('.activate');
  if (activate) {
    activate.addEventListener('click', function () {
      body.classList.add('is-live');
    });
  }

  // Verlässt das Fenster den Bildschirm, wird es wieder "gesperrt"
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) body.classList.remove('is-live');
    }, { threshold: 0 }).observe(body);
  }
})();
