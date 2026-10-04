document.addEventListener('DOMContentLoaded', () => {
    // Theme setup
    const toggleSwitch = document.getElementById('darkModeToggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    setTimeout(() => {
        document.body.classList.remove('preload');
    }, 50);

    toggleSwitch.addEventListener('change', function(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Startup Logo Animation Logic
    const overlay = document.getElementById('startup-overlay');
    if (overlay) {
        const startupContainer = document.querySelector('.startup-logo-container');
        const headerLogo = document.getElementById('main-logo');
        const spinner = document.getElementById('startup-spinner');
        
        // Hide header logo initially
        headerLogo.style.opacity = '0';
        
        // Wait for the SVG stroke drawing animation to finish (0.4s + 0.4s delay = 0.8s total)
        setTimeout(() => {
            // Start the spinning animation
            spinner.classList.add('spin-animation');
            
            // Wait for the spinning animation to finish (1s)
            setTimeout(() => {
                // Find the precise position of the header logo
                const rect = headerLogo.getBoundingClientRect();
                
                // Move the big startup logo directly to the header logo's position and shrink it
                startupContainer.style.top = `${rect.top + rect.height/2}px`;
                startupContainer.style.left = `${rect.left + rect.width/2}px`;
                
                // The startup container is 240x150. The header logo is 55x35. Scale factor is ~0.23
                startupContainer.style.transform = `translate(-50%, -50%) scale(0.23)`; 
                
                // After the move transition finishes (0.6s)
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    headerLogo.style.opacity = '1'; 
                    
                    // Remove the overlay from DOM flow
                    setTimeout(() => {
                        overlay.style.display = 'none';
                    }, 500);
                }, 600);
            }, 1000);
        }, 1000); // 1 second total allowance for drawing
    }
});

// Back to top button logic
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
