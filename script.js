// Mobile-Menü
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  function close() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
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
