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
