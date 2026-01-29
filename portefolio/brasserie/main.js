document.addEventListener('DOMContentLoaded', () => {
    // Back to Alpstone Button
    const backBtn = document.createElement('a');
    backBtn.href = '../../index.html#portfolio';
    backBtn.className = 'alpstone-back-btn';
    // Using simple white styling for logo if it's an image, or just keeping the pill effect.
    // Assuming the path is correct relative to current location.
    backBtn.innerHTML = `
        <img src="../../Logos/Alpstone-studio-vertical/White-vertical.png" alt="AS" class="alpstone-btn-logo" onerror="this.style.display='none';this.parentElement.innerHTML='<span style=\'font-size:20px;\'>🔙</span>' + this.parentElement.innerHTML.split('</span>')[1]">
        <span class="alpstone-btn-text">Retour à Alpstone</span>
    `;
    // Fallback logic in onerror just in case image path is slightly off, though logically it should be White-vertical based on footer usage in index.html

    document.body.appendChild(backBtn);

    // Auto Collapse Logic
    const collapseBtn = () => {
        backBtn.classList.add('collapsed');
    };

    let idleTimer = setTimeout(collapseBtn, 3000); // Collapse after 3s initial idle

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            collapseBtn();
        }
        // Reset timer on hover (optional, handled by CSS :hover mostly for expanding)
    });

    backBtn.addEventListener('mouseenter', () => {
        clearTimeout(idleTimer);
        backBtn.classList.remove('collapsed');
    });

    backBtn.addEventListener('mouseleave', () => {
        idleTimer = setTimeout(collapseBtn, 2000);
    });

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const icon = navLinks.classList.contains('open') ? '✕' : '☰';
            mobileToggle.textContent = icon;
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                mobileToggle.textContent = '☰';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
                navLinks.classList.remove('open');
                mobileToggle.textContent = '☰';
            }
        });
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
            navbar.style.background = 'rgba(18, 18, 18, 0.98)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(18, 18, 18, 0.95)';
        }
    });
});
