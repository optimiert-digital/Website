// Mobile-Menü
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  var desktop = window.matchMedia('(min-width: 861px)');

  function setOpen(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    document.body.classList.toggle('menu-open', open);
  }

  toggle.addEventListener('click', function () {
    setOpen(!nav.classList.contains('open'));
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Beim Wechsel auf Desktop-Breite Menü zurücksetzen
  var reset = function (e) { if (e.matches) setOpen(false); };
  if (desktop.addEventListener) desktop.addEventListener('change', reset);
  else if (desktop.addListener) desktop.addListener(reset);
})();

// Hover-Effekt am Handy: Das Element, das gerade mittig im Bild steht, wird hervorgehoben
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (!window.matchMedia('(hover: none)').matches) return;

  var targets = document.querySelectorAll(
    '.usp li, .principles li, .process li, .tier, .partner, .cta'
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
