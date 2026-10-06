/* =====================================================
   REDI PORTFOLIO
   INTERACTION & UX
===================================================== */

$(document).ready(function () {
  /* ===================================================
     CURRENT YEAR
  =================================================== */

  $("#currentYear").text(new Date().getFullYear());

  /* ===================================================
     NAVBAR SCROLL EFFECT
  =================================================== */

  function handleNavbar() {
    if ($(window).scrollTop() > 50) {
      $("#mainNavbar").addClass("scrolled");
    } else {
      $("#mainNavbar").removeClass("scrolled");
    }
  }

  handleNavbar();

  $(window).on("scroll", function () {
    handleNavbar();
  });

  /* ===================================================
     SMOOTH SCROLL
  =================================================== */

  $('a[href^="#"]').on("click", function (e) {
    const target = $(this).attr("href");

    if (target === "#" || !$(target).length) {
      return;
    }

    e.preventDefault();

    const navbarHeight = $("#mainNavbar").outerHeight() || 0;

    const targetPosition = $(target).offset().top - navbarHeight + 1;

    $("html, body").animate(
      {
        scrollTop: targetPosition,
      },
      700,
    );

    /*
      Close mobile navbar after click
    */
    const navbarCollapse = $("#navbarNav");

    if (navbarCollapse.hasClass("show")) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse[0]);

      if (bsCollapse) {
        bsCollapse.hide();
      }
    }
  });

  /* ===================================================
     ACTIVE NAVIGATION
  =================================================== */

  const sections = $("main section[id]");

  function updateActiveNavigation() {
    const scrollPosition =
      $(window).scrollTop() + $("#mainNavbar").outerHeight() + 100;

    sections.each(function () {
      const section = $(this);

      const sectionTop = section.offset().top;

      const sectionBottom = sectionTop + section.outerHeight();

      const sectionId = section.attr("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        $(".nav-link").removeClass("active");

        $('.nav-link[href="#' + sectionId + '"]').addClass("active");
      }
    });
  }

  updateActiveNavigation();

  $(window).on("scroll", updateActiveNavigation);

  /* ===================================================
     SCROLL REVEAL
  =================================================== */

  function revealElements() {
    $(".reveal").each(function () {
      const element = $(this);

      const elementTop = element.offset().top;

      const windowBottom = $(window).scrollTop() + $(window).height();

      if (windowBottom > elementTop + 60) {
        element.addClass("active");
      }
    });
  }

  revealElements();

  $(window).on("scroll", revealElements);

  /* ===================================================
     STAGGER SKILLS
  =================================================== */

  $(".skill-card").each(function (index) {
    $(this).css("transition-delay", `${index * 80}ms`);
  });

  /* ===================================================
     STAGGER PROJECTS
  =================================================== */

  $(".project-card").each(function (index) {
    $(this).css("transition-delay", `${index * 100}ms`);
  });

  /* ===================================================
     PROJECT HOVER
  =================================================== */

  $(".project-card").on("mouseenter", function () {
    $(this).find(".project-link i").css("transform", "translate(3px, -3px)");
  });

  $(".project-card").on("mouseleave", function () {
    $(this).find(".project-link i").css("transform", "translate(0, 0)");
  });

  /* ===================================================
     FORM VALIDATION
  =================================================== */

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    const form = $(this)[0];

    const formMessage = $("#formMessage");

    /*
        Reset previous validation
      */
    $(form).find(".form-control").removeClass("is-invalid");

    /*
        Validate required fields
      */
    let isValid = true;

    $(form)
      .find("[required]")
      .each(function () {
        const input = $(this);

        const value = input.val().trim();

        if (!value) {
          input.addClass("is-invalid");

          isValid = false;
        }
      });

    /*
        Validate email
      */
    const email = $("#email").val().trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailPattern.test(email)) {
      $("#email").addClass("is-invalid");

      isValid = false;
    }

    /*
        Show error
      */
    if (!isValid) {
      formMessage
        .removeClass("d-none alert-success")
        .addClass("alert-danger")
        .text("Please check kembali data yang kamu masukkan.")
        .hide()
        .fadeIn(300);

      return;
    }

    /*
        Demo success message
      */
    formMessage
      .removeClass("d-none alert-danger")
      .addClass("alert-success")
      .text(
        "Pesan berhasil disiapkan. Untuk mengirim pesan secara nyata, hubungkan form ini ke backend atau layanan form.",
      )
      .hide()
      .fadeIn(300);

    /*
        Reset form
      */
    form.reset();

    $(form).find(".form-control").removeClass("is-valid");

    /*
        Hide message after a few seconds
      */
    setTimeout(function () {
      formMessage.fadeOut(500, function () {
        $(this).addClass("d-none").removeClass("alert-success alert-danger");
      });
    }, 6000);
  });

  /* ===================================================
     INPUT FOCUS EFFECT
  =================================================== */

  $(".form-control").on("focus", function () {
    $(this).closest(".col-12, .col-md-6").addClass("input-focused");
  });

  $(".form-control").on("blur", function () {
    $(this).closest(".col-12, .col-md-6").removeClass("input-focused");
  });

  /* ===================================================
     CONSOLE MESSAGE
  =================================================== */

  console.log(
    "%c REDI. ",
    "background:#681f2b;color:#fff;padding:8px 12px;border-radius:5px;font-weight:bold;",
  );

  console.log("Thanks for checking out my portfolio.");
});
