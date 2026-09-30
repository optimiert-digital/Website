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

// Paket aus der Preisübersicht im Formular vorauswählen
(function () {
  var select = document.getElementById('paket');
  if (!select) return;

  document.querySelectorAll('[data-paket]').forEach(function (link) {
    link.addEventListener('click', function () {
      select.value = link.getAttribute('data-paket');
    });
  });
})();

// Kontaktformular (Formspree) ohne Seitenwechsel absenden
(function () {
  var form = document.getElementById('kontaktformular');
  var status = document.getElementById('formstatus');
  if (!form || !status) return;

  function show(message, type) {
    status.textContent = message;
    status.className = 'form-status ' + type;
  }

  form.addEventListener('submit', function (e) {
    if (form.action.indexOf('DEINE_FORM_ID') !== -1) {
      e.preventDefault();
      show('Das Formular ist noch nicht verbunden. Bitte schreib uns direkt an alex@optimiert.digital.', 'error');
      return;
    }

    if (!window.fetch) return; // Fallback: normales Absenden

    e.preventDefault();
    var button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    show('Wird gesendet …', '');

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          show('Danke, deine Anfrage ist angekommen. Wir melden uns bei dir.', 'ok');
        } else {
          throw new Error('Serverfehler');
        }
      })
      .catch(function () {
        show('Das Senden hat nicht geklappt. Bitte versuch es erneut oder schreib an alex@optimiert.digital.', 'error');
      })
      .finally(function () {
        button.disabled = false;
      });
  });
})();
