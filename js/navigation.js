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

export function initLogoClick() {
    // Select logo link (the <a> wrapping the logo)
    const logoLink = document.querySelector('.main-menu a[href="#"]');
    
    // Select home link in navigation (the one with data-i18n="home")
    const homeLink = document.querySelector('.links a[data-i18n="home"]');
    
    // Function to handle scrolling to top and closing menu
    function goToHome(e) {
        if (e) {
            e.preventDefault(); // Prevent default anchor behavior
        }
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle && menuToggle.checked) {
            menuToggle.checked = false;
        }
        
        // Optional: Update active class
        document.querySelectorAll('.links a').forEach(link => {
            link.classList.remove('active');
        });
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
    
    // Add click event to logo
    if (logoLink) {
        logoLink.addEventListener('click', goToHome);
    }
    
    // Add click event to home link (if it's not already a separate page)
    if (homeLink && homeLink.getAttribute('href') === '') {
        homeLink.addEventListener('click', goToHome);
    }
    
    // Optional: Make function available globally
    window.goToHome = goToHome;
}