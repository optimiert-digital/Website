/* =========================================================
   OPTIMIERT.DIGITAL
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
     ======================================================= */

  const body = document.body;

  const header =
    document.querySelector(".od-header");

  const menuButton =
    document.querySelector(".od-menu-button");

  const mobileMenu =
    document.querySelector(".od-mobile-menu");

  const mobileLinks =
    document.querySelectorAll(".od-mobile-menu a");

  const currentYear =
    document.querySelector("#current-year");


  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear();
  }


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  function openMenu() {

    if (!menuButton || !mobileMenu) {
      return;
    }

    menuButton.classList.add("is-open");
    mobileMenu.classList.add("is-open");

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );

    menuButton.setAttribute(
      "aria-label",
      "Menü schließen"
    );

    body.classList.add("menu-open");
  }


  function closeMenu() {

    if (!menuButton || !mobileMenu) {
      return;
    }

    menuButton.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Menü öffnen"
    );

    body.classList.remove("menu-open");
  }


  function toggleMenu() {

    if (!menuButton || !mobileMenu) {
      return;
    }

    const isOpen =
      mobileMenu.classList.contains(
        "is-open"
      );

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }


  if (menuButton && mobileMenu) {

    menuButton.addEventListener(
      "click",
      toggleMenu
    );

  }


  /* =======================================================
     CLOSE MOBILE MENU AFTER LINK CLICK
     ======================================================= */

  mobileLinks.forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        closeMenu();

      }
    );

  });


  /* =======================================================
     CLOSE MOBILE MENU WITH ESC
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {
        closeMenu();
      }

    }
  );


  /* =======================================================
     CLOSE MENU WHEN SWITCHING TO DESKTOP
     ======================================================= */

  window.addEventListener(
    "resize",
    () => {

      if (window.innerWidth > 1100) {
        closeMenu();
      }

    }
  );


  /* =======================================================
     HEADER SCROLL STATE
     ======================================================= */

  function updateHeader() {

    if (!header) {
      return;
    }

    if (window.scrollY > 20) {

      header.classList.add(
        "is-scrolled"
      );

    } else {

      header.classList.remove(
        "is-scrolled"
      );

    }

  }


  updateHeader();


  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );


  /* =======================================================
     SMOOTH ANCHOR LINKS
     ======================================================= */

  const anchorLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  anchorLinks.forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) {
          return;
        }


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(
      [
        ".od-section-header",
        ".od-intro__grid",
        ".od-service-card",
        ".od-project-card",
        ".od-approach__main",
        ".od-principle",
        ".od-process-step",
        ".od-contact__inner"
      ].join(",")
    );


  revealElements.forEach(
    (element) => {

      element.classList.add(
        "od-reveal"
      );

    }
  );


  /* =======================================================
     INTERSECTION OBSERVER
     ======================================================= */

  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(

        (entries, observer) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "is-visible"
                );

                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },

        {
          threshold: 0.12,

          rootMargin:
            "0px 0px -40px 0px"
        }

      );


    revealElements.forEach(
      (element) => {

        revealObserver.observe(
          element
        );

      }
    );


  } else {

    /* Fallback for older browsers */

    revealElements.forEach(
      (element) => {

        element.classList.add(
          "is-visible"
        );

      }
    );

  }


  /* =======================================================
     STAGGER SERVICE CARDS
     ======================================================= */

  const serviceCards =
    document.querySelectorAll(
      ".od-service-card"
    );


  serviceCards.forEach(
    (card, index) => {

      card.style.setProperty(
        "--reveal-delay",
        `${index * 90}ms`
      );

    }
  );


  /* =======================================================
     STAGGER PRINCIPLES
     ======================================================= */

  const principles =
    document.querySelectorAll(
      ".od-principle"
    );


  principles.forEach(
    (principle, index) => {

      principle.style.setProperty(
        "--reveal-delay",
        `${index * 90}ms`
      );

    }
  );


  /* =======================================================
     STAGGER PROJECTS
     ======================================================= */

  const projects =
    document.querySelectorAll(
      ".od-project-card"
    );


  projects.forEach(
    (project, index) => {

      project.style.setProperty(
        "--reveal-delay",
        `${index * 110}ms`
      );

    }
  );


  /* =======================================================
     PAGE READY
     ======================================================= */

  document.documentElement.classList.add(
    "od-ready"
  );

});
