export function initNavActive() {
  const navLinks = document.querySelectorAll(".links a:not(.btn)");
  const currentPath = window.location.pathname;

  navLinks.forEach((link) => {
    // Set active on page load
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }

    // Optional: also update on click (SPA-like behavior)
    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
}
