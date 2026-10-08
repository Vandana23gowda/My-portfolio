const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const year = document.querySelector("#year");
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const certificateDialog = document.querySelector("#certificateDialog");
const certificateImage = document.querySelector("#certificateImage");
const certificateTitle = document.querySelector("#certificateTitle");
const certificateClose = document.querySelector(".dialog-close");
const revealItems = document.querySelectorAll(".reveal");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (navToggle && navMenu) {
  const closeMenu = () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("motion-ready");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

if (certificateDialog && certificateImage && certificateTitle) {
  document.querySelectorAll(".certificate-card").forEach((card) => {
    card.addEventListener("click", () => {
      const imagePath = card.getAttribute("data-certificate");
      const title = card.getAttribute("data-title");
      const thumbnail = card.querySelector("img");

      if (!imagePath || !title || !thumbnail) {
        return;
      }

      certificateImage.src = imagePath;
      certificateImage.alt = thumbnail.alt;
      certificateTitle.textContent = title;
      certificateDialog.showModal();
    });
  });

  certificateClose?.addEventListener("click", () => {
    certificateDialog.close();
  });

  certificateDialog.addEventListener("click", (event) => {
    if (event.target === certificateDialog) {
      certificateDialog.close();
    }
  });
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent =
      "This form is not connected yet. Please use the email contact link instead.";
  });
}
