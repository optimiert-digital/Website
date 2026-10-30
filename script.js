// Hover-Effekt am Handy: Das Element, das gerade mittig im Bild steht, wird hervorgehoben
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (!window.matchMedia('(hover: none)').matches) return;

  var targets = document.querySelectorAll(
    '.usp li, .principles li, .process li, .core, .module, .flow li, .card, .cta'
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

  var VIRTUAL_WIDTH = 1040; // Breite, in der die Referenzseite gerendert wird (lesbar, aber noch Desktop-Ansicht)

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

  // Umschalten zwischen den Referenzprojekten (die zweite Seite wird erst auf Klick geladen)
  var tabs = document.querySelectorAll('.ref-tab');
  var host = document.getElementById('ref-host');
  var open1 = document.getElementById('ref-open');
  var open2 = document.getElementById('ref-open2');
  var title = document.getElementById('ref-title');
  Array.prototype.forEach.call(tabs, function (tab) {
    tab.addEventListener('click', function () {
      if (tab.getAttribute('aria-pressed') === 'true') return;
      Array.prototype.forEach.call(tabs, function (t) {
        t.setAttribute('aria-pressed', t === tab ? 'true' : 'false');
      });
      var url = tab.getAttribute('data-url');
      var name = tab.getAttribute('data-name');
      frame.src = url;
      frame.title = 'Referenzprojekt: Website von ' + name;
      if (host) host.textContent = tab.getAttribute('data-host');
      if (open1) open1.href = url;
      if (open2) open2.href = url;
      if (title) title.textContent = 'Referenzprojekt: ' + name + ', ' + tab.getAttribute('data-place') + '.';
    });
  });

  // Verlässt das Fenster den Bildschirm, wird es wieder "gesperrt"
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) body.classList.remove('is-live');
    }, { threshold: 0 }).observe(body);
  }
})();

// Leistungen: Verlaufslinie durch die Punkte der Erweiterungs-Karten (aus den echten Positionen berechnet)
(function () {
  var box = document.querySelector('.modules');
  var svg = box && box.querySelector('.modules-line');
  var path = document.getElementById('modules-path');
  var dots = box ? box.querySelectorAll('.module-dot') : [];
  if (!box || !svg || !path || dots.length < 2) return;

  function draw() {
    if (window.getComputedStyle(svg).display === 'none') return;
    var b = box.getBoundingClientRect();
    var pts = [];
    for (var i = 0; i < dots.length; i++) {
      var r = dots[i].getBoundingClientRect();
      pts.push({ x: r.left + r.width / 2 - b.left, y: r.top + r.height / 2 - b.top });
    }
    svg.setAttribute('viewBox', '0 0 ' + b.width + ' ' + b.height);
    var d = 'M0 ' + (pts[0].y + 28) + ' C' + (pts[0].x * 0.4) + ' ' + (pts[0].y + 28) + ' ' + (pts[0].x * 0.65) + ' ' + pts[0].y + ' ' + pts[0].x + ' ' + pts[0].y;
    for (var k = 1; k < pts.length; k++) {
      var a = pts[k - 1], c = pts[k], m = (c.x - a.x) * 0.45;
      d += ' C' + (a.x + m) + ' ' + a.y + ' ' + (c.x - m) + ' ' + c.y + ' ' + c.x + ' ' + c.y;
    }
    path.setAttribute('d', d);
  }

  draw();
  window.addEventListener('load', draw);
  window.addEventListener('resize', draw);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
  if ('ResizeObserver' in window) new ResizeObserver(draw).observe(box);
})();
