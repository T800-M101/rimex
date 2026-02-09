// navigation.js
export function initSmoothScroll() {
    const header = document.querySelector('header');
    const menuToggle = document.getElementById('menu-toggle');
    
    // Get header height for offset (mobile/desktop)
    function getHeaderHeight() {
        return header ? header.offsetHeight : 100;
    }
    
    // Smooth scroll function with mobile support
    function smoothScrollTo(targetId) {
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        const headerHeight = getHeaderHeight();
        const targetPosition = targetElement.offsetTop - headerHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 3000; // ms
        let startTime = null;
        
        // Easing function for smooth animation
        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easeProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + (distance * easeProgress));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    // Handle all navigation link clicks
    document.querySelectorAll('.links a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            // Smooth scroll to section
            smoothScrollTo(targetId);
            
            // Close mobile menu if open
            if (menuToggle && menuToggle.checked) {
                menuToggle.checked = false;
            }
            
            // Update URL hash without page jump
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                window.location.hash = targetId;
            }
        });
    });
    
    // Handle logo click (scroll to top)
    const logoLink = document.querySelector('.main-menu a[href="#"]');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Close mobile menu
            if (menuToggle && menuToggle.checked) {
                menuToggle.checked = false;
            }
        });
    }
    
    // Handle initial page load with hash in URL
    if (window.location.hash) {
        setTimeout(() => {
            smoothScrollTo(window.location.hash);
        }, 100);
    }
}