export function initSmoothScroll() {
    const header = document.querySelector('header');
    const menuToggle = document.getElementById('menu-toggle');
    
    const handleNavigation = (e, targetId) => {
        e.preventDefault();
        
        const targetElement = targetId === '#' ? document.body : document.querySelector(targetId);
        if (!targetElement) return;

        const headerHeight = header ? header.offsetHeight : 100;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        if (menuToggle && menuToggle.checked) menuToggle.checked = false;

        if (targetId !== '#') {
            history.pushState(null, null, targetId);
        }
    };

    document.querySelectorAll('.links a[href^="#"], .footer-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            handleNavigation(e, targetId);
        });
    });

    const logoLink = document.querySelector('.main-menu a[href="#"]');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => handleNavigation(e, '#'));
    }
}