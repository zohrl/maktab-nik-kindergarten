const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = [...document.querySelectorAll("main section[id]")];
const modal = document.querySelector(".gallery-modal");
const modalTitle = document.querySelector("#modal-title");
const galleryButtons = document.querySelectorAll(".gallery-item");
const closeModalButtons = document.querySelectorAll("[data-close-modal]");

menuButton?.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const highlightActiveLink = () => {
  const current = sections.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 130 && rect.bottom >= 130;
  });

  navLinks.forEach((link) => {
    const isActive = current && link.getAttribute("href") === `#${current.id}`;
    link.classList.toggle("is-active", Boolean(isActive));
  });
};

window.addEventListener("scroll", highlightActiveLink, { passive: true });
highlightActiveLink();

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modalTitle.textContent = button.dataset.title || "گالری تصاویر";
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  });
});

const closeModal = () => {
  modal.hidden = true;
  document.body.style.overflow = "";
};

closeModalButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeModal();
  }
});
