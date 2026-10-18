// Smart Digital Studio interactions — no framework required.
// document.addEventListener("DOMContentLoaded", () => {
//   const menuButton = document.querySelector(".menu-toggle");
//   const nav = document.querySelector(".main-nav");
//   if (menuButton && nav) {
//     menuButton.addEventListener("click", () => {
//       const open = nav.classList.toggle("open");
//       menuButton.setAttribute("aria-expanded", String(open));
//     });
//     nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
//       nav.classList.remove("open");
//       menuButton.setAttribute("aria-expanded", "false");
//     }));
//   }

//   document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

//   const revealItems = document.querySelectorAll(".reveal");
//   if ("IntersectionObserver" in window) {
//     const observer = new IntersectionObserver(entries => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("is-visible");
//           observer.unobserve(entry.target);
//         }
//       });
//     }, { threshold: 0.12 });
//     revealItems.forEach(el => observer.observe(el));
//   } else {
//     revealItems.forEach(el => el.classList.add("is-visible"));
//   }

//   const filterButtons = document.querySelectorAll(".filter-btn");
//   const portfolioItems = document.querySelectorAll(".portfolio-item");
//   filterButtons.forEach(button => button.addEventListener("click", () => {
//     const filter = button.dataset.filter;
//     filterButtons.forEach(btn => btn.classList.toggle("active", btn === button));
//     portfolioItems.forEach(item => {
//       item.classList.toggle("hidden", filter !== "all" && item.dataset.category !== filter);
//     });
//   }));

//   const form = document.querySelector("#enquiry-form");
//   if (form) {
//     form.addEventListener("submit", event => {
//       event.preventDefault();
//       if (!form.reportValidity()) return;
//       const data = new FormData(form);
//       const subject = encodeURIComponent("Wedding Enquiry — " + (data.get("name") || "Smart Digital Studio"));
//       const body = encodeURIComponent(
//         "Hello Smart Digital Studio,\n\nI'd love to enquire about your services.\n\n" +
//         "Name: " + (data.get("name") || "") + "\n" +
//         "Email: " + (data.get("email") || "") + "\n" +
//         "Wedding date: " + (data.get("date") || "Not decided") + "\n" +
//         "Location: " + (data.get("location") || "Not decided") + "\n" +
//         "Service: " + (data.get("service") || "") + "\n\n" +
//         "Message:\n" + (data.get("message") || "I'd love to discuss the details.") + "\n\nThank you!"
//       );
//       const status = form.querySelector(".form-status");
//       status.textContent = "Opening your email app with the enquiry details…";
//       // Replace the sample address with the studio's real inbox before publishing.
//       window.location.href = "mailto:hello@smartdigitalstudio.example?subject=" + subject + "&body=" + body;
//     });
//   }
// });



document.addEventListener("DOMContentLoaded", () => {
  // ==============================
  // 1. MOBILE NAVIGATION
  // ==============================
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach(link =>
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      })
    );
  }

  // ==============================
  // 2. CURRENT YEAR IN FOOTER
  // ==============================
  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // ==============================
  // 3. SCROLL REVEAL ANIMATIONS
  // ==============================
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add("is-visible"));
  }

  // ==============================
  // 4. PORTFOLIO FILTERS
  // ==============================
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach(btn => {
        btn.classList.toggle("active", btn === button);
      });

      portfolioItems.forEach(item => {
        item.classList.toggle(
          "hidden",
          filter !== "all" && item.dataset.category !== filter
        );
      });
    });
  });

  // ==============================
  // 5. CONTACT SETTINGS
  // Add your real details here
  // ==============================
  const WHATSAPP_NUMBER = "91XXXXXXXXXX";
  const BUSINESS_EMAIL = "YOUR_EMAIL@example.com";

  // ==============================
  // 6. WEDDING ENQUIRY FORM
  // ==============================
  const form = document.querySelector("#enquiry-form");

  if (form) {
    const status = form.querySelector(".form-status");
    const emailButton = document.querySelector("#email-enquiry");

    // Build the customer's enquiry message
    function getEnquiryMessage() {
      const data = new FormData(form);

      return (
        "Hello Smart Digital Studio!\n\n" +
        "I'd love to enquire about your wedding services.\n\n" +
        "Name: " + (data.get("name") || "") + "\n" +
        "Email: " + (data.get("email") || "") + "\n" +
        "Wedding date: " + (data.get("date") || "Not decided") + "\n" +
        "Location: " + (data.get("location") || "Not decided") + "\n" +
        "Service: " + (data.get("service") || "") + "\n\n" +
        "Message:\n" +
        (data.get("message") || "I'd love to discuss the details.") +
        "\n\nThank you!"
      );
    }

    // EMAIL ENQUIRY
    function sendEmailEnquiry() {
      if (!form.reportValidity()) return;

      if (BUSINESS_EMAIL.includes("YOUR_EMAIL")) {
        status.textContent =
          "Please add your real business email in assets/script.js first.";
        return;
      }

      const data = new FormData(form);
      const subject = encodeURIComponent(
        "Wedding Enquiry — " + (data.get("name") || "Smart Digital Studio")
      );
      const body = encodeURIComponent(getEnquiryMessage());

      status.textContent = "Opening your email app with the enquiry details…";

      window.location.href =
        "mailto:" + BUSINESS_EMAIL +
        "?subject=" + subject +
        "&body=" + body;
    }

    // WHATSAPP ENQUIRY
    function sendWhatsAppEnquiry() {
      if (!form.reportValidity()) return;

      if (WHATSAPP_NUMBER.includes("X")) {
        status.textContent =
          "Please add your real WhatsApp number in assets/script.js first.";
        return;
      }

      const message = encodeURIComponent(getEnquiryMessage());
      const whatsappURL =
        "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + message;

      status.textContent =
        "Opening WhatsApp. Please review your enquiry and press Send.";

      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    }

    // Form submit = WhatsApp
    form.addEventListener("submit", event => {
      event.preventDefault();
      sendWhatsAppEnquiry();
    });

    // Email button = email draft
    if (emailButton) {
      emailButton.addEventListener("click", sendEmailEnquiry);
    }
  }
});
